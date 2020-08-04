package com.stockMarket.StockExchangeService.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Set;
import java.util.HashSet;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonBackReference;


@Entity
public class Company implements Serializable{
	

	/**
	 * ~ Navdeep Singh
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;
	private BigDecimal turnOver;
	private String ceo;
	private String boardOfDirector;
	private boolean isActive;

	@ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
	@JoinTable(name = "company_stock", joinColumns = @JoinColumn(name = "company_id"), inverseJoinColumns = @JoinColumn(name = "stockExchange_id"))
	private Set<StockExchange> stockExchanges = new HashSet<>();
	

	@ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
	@JoinTable(name = "company_sector", joinColumns = @JoinColumn(name = "company_id"), inverseJoinColumns = @JoinColumn(name = "sector_id"))
	private Set<Sector> sectors = new HashSet<>();
	
	private String breif;
	private String companyCode;
	
	@JsonBackReference
	@OneToMany(mappedBy="company", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<CompanyStockPrice> companyStockPrice;
	
	public Company() {}

	public Company(String name, BigDecimal turnOver, String ceo, String boardOfDirector,
			Set<StockExchange> stockExchanges, Set<Sector> sectors, String breif, String companyCode, boolean isActive) {
		super();
		this.name = name;
		this.turnOver = turnOver;
		this.ceo = ceo;
		this.boardOfDirector = boardOfDirector;
		this.stockExchanges = stockExchanges;
		this.sectors = sectors;
		this.breif = breif;
		this.companyCode = companyCode;
		this.isActive = isActive;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public BigDecimal getTurnOver() {
		return turnOver;
	}

	public void setTurnOver(BigDecimal turnOver) {
		this.turnOver = turnOver;
	}

	public String getCeo() {
		return ceo;
	}

	public void setCeo(String ceo) {
		this.ceo = ceo;
	}

	public String getBoardOfDirector() {
		return boardOfDirector;
	}

	public void setBoardOfDirector(String boardOfDirector) {
		this.boardOfDirector = boardOfDirector;
	}

	public Set<StockExchange> getStockExchanges() {
		return stockExchanges;
	}

	public void setStockExchanges(Set<StockExchange> stockExchanges) {
		this.stockExchanges = stockExchanges;
	}
	
	public void addStockExchange(StockExchange stockExchange) {
		stockExchanges.add(stockExchange);
		stockExchange.getCompanies().add(this);
	}
	
	public void removeStockExchange(StockExchange stockExchange) {
		stockExchanges.remove(stockExchange);
		stockExchange.getCompanies().remove(this);
	}

	public Set<Sector> getSectors() {
		return sectors;
	}

	public void setSectors(Set<Sector> sectors) {
		this.sectors = sectors;
	}
	
	public void addSector(Sector sector) {
		sectors.add(sector);
		sector.getCompanies().add(this);
	}
	
	public void removeSector(Sector sector) {
		sectors.remove(sector);
		sector.getCompanies().remove(this);
	}

	public String getBreif() {
		return breif;
	}

	public void setBreif(String breif) {
		this.breif = breif;
	}

	public String getCompanyCode() {
		return companyCode;
	}

	public void setCompanyCode(String companyCode) {
		this.companyCode = companyCode;
	}

	public boolean isActive() {
		return isActive;
	}

	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}

	public List<CompanyStockPrice> getCompanyStockPrice() {
		return companyStockPrice;
	}

	public void setCompanyStockPrice(List<CompanyStockPrice> companyStockPrice) {
		this.companyStockPrice = companyStockPrice;
	}
	
}
