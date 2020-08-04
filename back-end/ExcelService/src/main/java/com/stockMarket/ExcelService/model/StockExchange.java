package com.stockMarket.ExcelService.model;

import java.util.Set;
import java.util.HashSet;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
public class StockExchange {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String name;
	
	private String brief;
	
	private String contactAddress;
	
	private String remarks;
	
	@JsonBackReference
	@ManyToMany(mappedBy = "stockExchanges")
    private Set<Company> companies = new HashSet<>();
	
	public StockExchange() {}

	public StockExchange(String name, String brief, String contactAddress, String remarks) {
		super();
		this.name = name;
		this.brief = brief;
		this.contactAddress = contactAddress;
		this.remarks = remarks;
	}

	public Long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getBrief() {
		return brief;
	}

	public void setBrief(String brief) {
		this.brief = brief;
	}

	public String getContactAddress() {
		return contactAddress;
	}

	public void setContactAddress(String contactAddress) {
		this.contactAddress = contactAddress;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public Set<Company> getCompanies() {
		return companies;
	}

	public void setCompanies(Set<Company> companies) {
		this.companies = companies;
	}

	@Override
	public String toString() {
		return "StockExchange [id=" + id + ", name=" + name + ", brief=" + brief + ", contactAddress=" + contactAddress
				+ ", remarks=" + remarks + ", companies=" + companies + "]";
	}

}
