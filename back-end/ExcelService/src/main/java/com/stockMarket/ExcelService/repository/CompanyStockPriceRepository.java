package com.stockMarket.ExcelService.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.stockMarket.ExcelService.model.Company;
import com.stockMarket.ExcelService.model.CompanyStockPrice;


public interface CompanyStockPriceRepository extends JpaRepository<CompanyStockPrice, Long> {

	List<CompanyStockPrice> findAllByCompany(Company company);
}