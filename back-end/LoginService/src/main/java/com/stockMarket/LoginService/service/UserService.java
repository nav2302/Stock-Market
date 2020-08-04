package com.stockMarket.LoginService.service;

import javax.validation.Valid;

import com.stockMarket.LoginService.model.User;



public interface UserService {

	User saveUser(@Valid User user);

	User findByEmailAndUsertype(String email, String userCustRole);


}
