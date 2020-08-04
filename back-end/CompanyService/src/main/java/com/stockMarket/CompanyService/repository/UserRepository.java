package com.stockMarket.CompanyService.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.stockMarket.CompanyService.model.User;




@Repository
@Transactional
public interface UserRepository extends JpaRepository<User, Long> {
	
	User findByEmailAndUsertype(String email, String userCustRole);

}
