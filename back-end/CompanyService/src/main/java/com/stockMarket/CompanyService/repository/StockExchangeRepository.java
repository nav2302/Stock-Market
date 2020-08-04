package com.stockMarket.CompanyService.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.stockMarket.CompanyService.model.StockExchange;



@Repository
@Transactional
public interface StockExchangeRepository extends JpaRepository<StockExchange, Long> {

	StockExchange findByName(String stockExchangeName);

}
