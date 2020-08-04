package com.stockMarket.LoginService.service;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.stockMarket.LoginService.model.User;
import com.stockMarket.LoginService.repository.UserRepository;


@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	@Override
	public User saveUser(@Valid User registration) {
		User user = new User();
		user.setAge(registration.getAge());
		user.setEmail(registration.getEmail());
		user.setPassword(passwordEncoder.encode(registration.getPassword()));
		user.setPhone(registration.getPhone());
		user.setUsername(registration.getUsername());
		user.setUsertype(registration.getUsertype());
		return userRepository.save(user);
	}

	@Override
	public User findByEmailAndUsertype(String email, String userCustRole) {
		return userRepository.findByEmailAndUsertype(email, userCustRole);
	}

}
