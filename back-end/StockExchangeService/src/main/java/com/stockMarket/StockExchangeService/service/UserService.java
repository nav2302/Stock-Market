package com.stockMarket.StockExchangeService.service;

import com.stockMarket.StockExchangeService.model.User;



public interface UserService {

	User findByEmailAndUsertype(String email, String userCustRole);


}
