package com.stockMarket.CompanyService.response;


import java.io.Serializable;
import java.util.List;

import com.stockMarket.CompanyService.model.Company;
import com.stockMarket.CompanyService.model.Ipo;


public class CompanyResponse implements Serializable {

	private static final long serialVersionUID = 4744643015194204171L;
	
	private String status;
	private String message;
	private String AUTH_TOKEN;
	private Company company;
	private List<Ipo> ipos;
	private List<Company> companies;

	public String getAUTH_TOKEN() {
		return AUTH_TOKEN;
	}

	public void setAUTH_TOKEN(String aUTH_TOKEN) {
		this.AUTH_TOKEN = aUTH_TOKEN;
	}

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

	public Company getCompany() {
		return company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}

	public List<Ipo> getIpos() {
		return ipos;
	}

	public void setIpos(List<Ipo> ipos) {
		this.ipos = ipos;
	}

	public List<Company> getCompanies(){
		return companies;
	}

	public void setCompanies(List<Company> companies){
		this.companies = companies;
	}
}