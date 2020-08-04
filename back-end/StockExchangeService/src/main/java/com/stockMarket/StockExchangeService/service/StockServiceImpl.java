package com.stockMarket.StockExchangeService.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stockMarket.StockExchangeService.model.StockExchange;
import com.stockMarket.StockExchangeService.repository.StockExchangeRepository;


@Service
public class StockServiceImpl implements StockService{

	@Autowired
	private StockExchangeRepository stockExchangeRepository;
	
	@Override
	public List<StockExchange> findAll() {
		return stockExchangeRepository.findAll();
	}

	@Override
	public StockExchange save(StockExchange newStock) {
		return stockExchangeRepository.save(newStock);
	}

	@Override
	public StockExchange findById(Long stockExchangeId) {
		return stockExchangeRepository.findById(stockExchangeId).orElse(null);
	}

	@Override
	public StockExchange findByName(String stockExchangeName) {
		return stockExchangeRepository.findByName(stockExchangeName);
	}

}
