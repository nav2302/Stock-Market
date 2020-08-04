package com.stockMarket.StockExchangeService.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stockMarket.StockExchangeService.constants.ResponseCode;
import com.stockMarket.StockExchangeService.constants.WebConstants;
import com.stockMarket.StockExchangeService.model.Company;
import com.stockMarket.StockExchangeService.model.StockExchange;
import com.stockMarket.StockExchangeService.repository.CompanyRepository;
import com.stockMarket.StockExchangeService.response.StockResponse;
import com.stockMarket.StockExchangeService.response.serverResponse;
import com.stockMarket.StockExchangeService.service.StockService;
import com.stockMarket.StockExchangeService.util.jwtUtil;



@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/exchange")
public class ExchangeController {
	
	@Autowired
	private jwtUtil jwtutil;
	
	@Autowired
	private StockService stockService;

	@Autowired
	private CompanyRepository companyRepository;


	@PostMapping("/getStockExchanges")
	public ResponseEntity<StockResponse> getProducts(
			@RequestHeader(name = WebConstants.USER_AUTH_TOKEN) String AUTH_TOKEN) throws IOException {

		StockResponse resp = new StockResponse();
		if ((AUTH_TOKEN == null || AUTH_TOKEN.equalsIgnoreCase("")) && jwtutil.checkToken(AUTH_TOKEN) == null) {
			resp.setStatus(ResponseCode.FAILURE_CODE);
			resp.setMessage(ResponseCode.FAILURE_MESSAGE);
		} else {
			try {
				List<StockExchange> stockExchanges = stockService.findAll();

				Map<String, List<Company>> stockCompanyMap = new HashMap<>();

				for (StockExchange stockExchange : stockExchanges) {
					stockCompanyMap.put(stockExchange.getName(),
							companyRepository.findAllByStockExchanges(stockExchange));
				}
				resp.setStatus(ResponseCode.SUCCESS_CODE);
				resp.setMessage("LIST_STOCKS");
				resp.setAUTH_TOKEN(AUTH_TOKEN);
				resp.setStockCompanyMap(stockCompanyMap);

			} catch (Exception e) {
				resp.setStatus(ResponseCode.FAILURE_CODE);
				resp.setMessage(e.getMessage());
				resp.setAUTH_TOKEN(AUTH_TOKEN);
			}
		}
		return new ResponseEntity<StockResponse>(resp, HttpStatus.ACCEPTED);
	}
	
	@PostMapping("/addStockExchange")
	public ResponseEntity<serverResponse> addStockExchange(
			@RequestHeader(name = WebConstants.USER_AUTH_TOKEN) String AUTH_TOKEN,
			@Valid @RequestBody StockExchange stockExchange) {

		serverResponse resp = new serverResponse();

		if ((AUTH_TOKEN == null || AUTH_TOKEN.equalsIgnoreCase("")) && jwtutil.checkToken(AUTH_TOKEN) == null) {
			resp.setStatus(ResponseCode.FAILURE_CODE);
			resp.setMessage(ResponseCode.FAILURE_MESSAGE);
		}

		else {
			if (stockService.findByName(stockExchange.getName()) == null) {
				resp.setStatus("600");
				resp.setMessage("Stock Exchange already Exists");
			} else {
				try {
					stockService.save(stockExchange);
					resp.setAUTH_TOKEN(AUTH_TOKEN);
					resp.setObject(stockExchange);
					resp.setStatus(ResponseCode.SUCCESS_CODE);
					resp.setMessage("STOCK EXCHANGE ADDED");
				} catch (Exception e) {
					resp.setStatus(ResponseCode.FAILURE_CODE);
					resp.setAUTH_TOKEN(AUTH_TOKEN);
					resp.setMessage(e.getMessage());
				}
			}
		}
		return new ResponseEntity<serverResponse>(resp, HttpStatus.ACCEPTED);
	}

}
