package com.stockMarket.LoginService.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.stockMarket.LoginService.model.VerificationToken;


@Repository
public interface VerificationTokenRepository extends CrudRepository<VerificationToken, String> {
	VerificationToken findByConfirmationToken(String confirmationToken);
}
