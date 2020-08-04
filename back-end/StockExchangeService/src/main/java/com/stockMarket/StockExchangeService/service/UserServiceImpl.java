package com.stockMarket.StockExchangeService.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stockMarket.StockExchangeService.model.User;
import com.stockMarket.StockExchangeService.repository.UserRepository;


@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Override
	public User findByEmailAndUsertype(String email, String userCustRole) {
		return userRepository.findByEmailAndUsertype(email, userCustRole);
	}

}
