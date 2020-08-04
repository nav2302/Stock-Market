package com.stockMarket.ExcelService.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.stockMarket.ExcelService.model.Company;
import com.stockMarket.ExcelService.model.CompanyStockPrice;
import com.stockMarket.ExcelService.repository.CompanyStockPriceRepository;
import com.stockMarket.ExcelService.util.ExcelHelper;


@Service
public class ExcelFileService {

	@Autowired
	CompanyStockPriceRepository companyStockPriceRepository;

	public String save(MultipartFile file, Company company) {
		try {
			Map<String, List<CompanyStockPrice>> companyStockPricesMap = ExcelHelper.excelToTutorials(file.getInputStream(), company);
			for(Map.Entry m : companyStockPricesMap.entrySet()){    
			    if(m.getKey().toString().equalsIgnoreCase("Invalid Fields")) {
			    	return "Invalid Fields";
			    }
			    else if(m.getKey().toString().equalsIgnoreCase("Invalid Date Provided")) {
			    	return "Invalid Date Provided";
			    }
			    else if(m.getKey().toString().equalsIgnoreCase("Date Column is Empty")) {
			    	return "Date Column is Empty for some Data";
			    }
			    @SuppressWarnings("unchecked")
				List<CompanyStockPrice> companyStockPrices = (List<CompanyStockPrice>) m.getValue();
			    companyStockPriceRepository.saveAll(companyStockPrices);
			   }  
			return "Data Uploaded SuccessFully";
		} catch (Exception e) {
			throw new RuntimeException(e.getMessage());
		}
	}

	public List<CompanyStockPrice> getAllStockPrices(Company company) {
		return companyStockPriceRepository.findAllByCompany(company);
	}
}