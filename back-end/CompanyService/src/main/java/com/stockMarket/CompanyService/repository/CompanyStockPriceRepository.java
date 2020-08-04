package com.stockMarket.CompanyService.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stockMarket.CompanyService.model.Company;
import com.stockMarket.CompanyService.model.CompanyStockPrice;


public interface CompanyStockPriceRepository extends JpaRepository<CompanyStockPrice, Long> {

	List<CompanyStockPrice> findAllByCompany(Company company);
}