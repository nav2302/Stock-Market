package com.stockMarket.StockExchangeService.service;

import java.util.List;

import com.stockMarket.StockExchangeService.model.StockExchange;


public interface StockService {
	
	List<StockExchange> findAll();

	StockExchange save(StockExchange newStock);

	StockExchange findById(Long stockExchangeId);

	StockExchange findByName(String name);
}
