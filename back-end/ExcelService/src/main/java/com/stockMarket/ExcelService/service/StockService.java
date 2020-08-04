package com.stockMarket.ExcelService.service;

import java.util.List;

import com.stockMarket.ExcelService.model.StockExchange;


public interface StockService {
	
	List<StockExchange> findAll();

	StockExchange save(StockExchange newStock);

	StockExchange findById(Long stockExchangeId);

	StockExchange findByName(String name);
}
