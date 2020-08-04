package com.stockMarket.ExcelService.model;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;


@Entity
public class CompanyStockPrice{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String date;
	
	private Double dayOpen;
	
	private Double dayClose;
	
	private Double dayHigh;
	
	private Double dayLow;
	
	private Double volumeTraded;
	
	@ManyToOne(fetch = FetchType.LAZY)
	private Company company = null;
	
	public CompanyStockPrice() {}

	public CompanyStockPrice(String date, Double dayOpen, Double dayClose, Double dayHigh, Double dayLow,
			Double volumeTraded) {
		super();
		this.date = date;
		this.dayOpen = dayOpen;
		this.dayClose = dayClose;
		this.dayHigh = dayHigh;
		this.dayLow = dayLow;
		this.volumeTraded = volumeTraded;
	}

	public Long getId() {
		return id;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public Double getDayOpen() {
		return dayOpen;
	}

	public void setDayOpen(Double dayOpen) {
		this.dayOpen = dayOpen;
	}

	public Double getDayClose() {
		return dayClose;
	}

	public void setDayClose(Double dayClose) {
		this.dayClose = dayClose;
	}

	public Double getDayHigh() {
		return dayHigh;
	}

	public void setDayHigh(Double dayHigh) {
		this.dayHigh = dayHigh;
	}

	public Double getDayLow() {
		return dayLow;
	}

	public void setDayLow(Double dayLow) {
		this.dayLow = dayLow;
	}

	public Double getVolumeTraded() {
		return volumeTraded;
	}

	public void setVolumeTraded(Double volumeTraded) {
		this.volumeTraded = volumeTraded;
	}

	public Company getCompany() {
		return company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}
	
	
}
