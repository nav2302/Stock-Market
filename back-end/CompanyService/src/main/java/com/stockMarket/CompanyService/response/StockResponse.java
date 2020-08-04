package com.stockMarket.CompanyService.response;

import java.io.Serializable;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.stockMarket.CompanyService.model.Company;



public class StockResponse implements Serializable{
	/**
	 * author ~Navdeep Singh
	 */
	private static final long serialVersionUID = 1928909901056236719L;
	private String status;
	private String message;
	private String AUTH_TOKEN;
	private Map<String, List<Company>> stockCompanyMap = new HashMap<>();

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getAUTH_TOKEN() {
		return AUTH_TOKEN;
	}

	public void setAUTH_TOKEN(String aUTH_TOKEN) {
		AUTH_TOKEN = aUTH_TOKEN;
	}

	public Map<String, List<Company>> getStockCompanyMap() {
		return stockCompanyMap;
	}

	public void setStockCompanyMap(Map<String, List<Company>> stockCompanyMap) {
		this.stockCompanyMap = stockCompanyMap;
	}

}