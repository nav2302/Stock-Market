package com.stockMarket.StockExchangeService.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.stockMarket.StockExchangeService.model.StockExchange;



@Repository
@Transactional
public interface StockExchangeRepository extends JpaRepository<StockExchange, Long> {

	StockExchange findByName(String stockExchangeName);

}
