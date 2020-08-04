package com.stockMarket.LoginService.controller;


import java.util.Map;
import java.util.logging.Logger;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.stockMarket.LoginService.constants.ResponseCode;
import com.stockMarket.LoginService.constants.WebConstants;
import com.stockMarket.LoginService.model.User;
import com.stockMarket.LoginService.model.VerificationToken;
import com.stockMarket.LoginService.repository.UserRepository;
import com.stockMarket.LoginService.repository.VerificationTokenRepository;
import com.stockMarket.LoginService.response.serverResponse;
import com.stockMarket.LoginService.service.UserService;
import com.stockMarket.LoginService.utils.EmailService;
import com.stockMarket.LoginService.utils.jwtUtil;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/user")
public class LoginController {

	private static Logger logger = Logger.getLogger(LoginController.class.getName());

	@Autowired
	private UserService userService;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	@Autowired
	private jwtUtil jwtutil;
	
	@Autowired
	private VerificationTokenRepository verificationTokenRepository;
	
	@Autowired
    private EmailService emailSenderService;
	
	@Autowired
	private UserRepository userRepository;

	@PostMapping("/signup")
	public ResponseEntity<serverResponse> addUser(@Valid @RequestBody User user) {
		serverResponse resp = new serverResponse();
		try {
			if(userService.findByEmailAndUsertype(user.getEmail(), user.getUsertype()) != null) {
				resp.setStatus("600");
				resp.setMessage("Email already Exists");
				logger.info("Email exists already");
			}
			else {
				resp.setStatus(ResponseCode.SUCCESS_CODE);
				resp.setMessage(ResponseCode.CUST_REG);
				
				User reg = userService.saveUser(user);
				
				VerificationToken verificationToken = new VerificationToken(reg);
				verificationTokenRepository.save(verificationToken);
				
				SimpleMailMessage mailMessage = new SimpleMailMessage();
	            mailMessage.setTo(user.getEmail());
	            mailMessage.setSubject("Complete Registration!");
	            mailMessage.setFrom("abcd21242@gmail.com");
	            mailMessage.setText("To confirm your account, please click here : "
	            +"http://localhost:8081/user/confirm-account?token="+verificationToken.getConfirmationToken());
	
	            emailSenderService.sendEmail(mailMessage);
	            logger.info("Mail has been sent for confirmation");
	
				resp.setObject(reg);
			}
		} catch (Exception e) {
			resp.setStatus(ResponseCode.FAILURE_CODE);
			resp.setMessage(e.getMessage());
			e.printStackTrace();
		}
		return new ResponseEntity<serverResponse>(resp, HttpStatus.ACCEPTED);
	}
	
	
	@GetMapping("/confirm-account")
	public void confirmUser(@RequestParam("token")String confirmationToken, HttpServletResponse response)
	throws Exception{
		
		
		VerificationToken token = verificationTokenRepository.findByConfirmationToken(confirmationToken);
		serverResponse resp = new serverResponse();
		if(token != null)
        {
            User user = userService.findByEmailAndUsertype(token.getUser().getEmail(), WebConstants.USER_CUST_ROLE);
            user.setEnabled(true);
            resp.setStatus(ResponseCode.SUCCESS_CODE);
			resp.setMessage("USER CONFIRMED");
            userRepository.save(user);  
            logger.info("User has been saved to database --->" + user.getEmail());
        }
		response.sendRedirect("http://localhost:4200/login");
	}

	@PostMapping("/verify")
	public ResponseEntity<serverResponse> verifyUser(@Valid @RequestBody Map<String, String> credential) {

		String email = "";
		String password = "";
		if (credential.containsKey(WebConstants.USER_EMAIL)) {
			email = credential.get(WebConstants.USER_EMAIL);
		}
		if (credential.containsKey(WebConstants.USER_PASSWORD)) {
			password = credential.get(WebConstants.USER_PASSWORD);
		}
		User loggedUser;
		try {
			loggedUser = userService.findByEmailAndUsertype(email, WebConstants.USER_CUST_ROLE);
			
		
		} catch (NullPointerException noe) {
			loggedUser = null;
		}
		serverResponse resp = new serverResponse();
		if (loggedUser != null && passwordEncoder.matches(password, loggedUser.getPassword())) {
			if(loggedUser.isEnabled()) {
				String jwtToken = jwtutil.createToken(email, password, WebConstants.USER_CUST_ROLE);
				resp.setStatus(ResponseCode.SUCCESS_CODE);
				resp.setMessage(ResponseCode.SUCCESS_MESSAGE);
				logger.info("Login Successful");
				resp.setAUTH_TOKEN(jwtToken);
			}
			else {
				resp.setStatus("600");
			}
		} else {
			resp.setStatus(ResponseCode.FAILURE_CODE);
			resp.setMessage(ResponseCode.FAILURE_MESSAGE);
		}
		return new ResponseEntity<serverResponse>(resp, HttpStatus.OK);
	}
}
