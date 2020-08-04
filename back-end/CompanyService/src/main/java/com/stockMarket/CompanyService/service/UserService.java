package com.stockMarket.CompanyService.service;

import com.stockMarket.CompanyService.model.User;




public interface UserService {

	User findByEmailAndUsertype(String email, String userCustRole);


}
