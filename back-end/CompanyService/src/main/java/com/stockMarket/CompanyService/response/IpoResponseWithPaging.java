package com.stockMarket.CompanyService.response;


import org.springframework.data.domain.Page;

import com.stockMarket.CompanyService.model.Ipo;


public class IpoResponseWithPaging {
	
	private String status;
	private String message;
	private String AUTH_TOKEN;
	private Page<Ipo> ipos;
	private boolean hasNext;
	private boolean hasPrevious;

	public IpoResponseWithPaging() {
		super();
	}
	
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

	public Page<Ipo> getIpos() {
		return ipos;
	}

	public void setIpos(Page<Ipo> ipos) {
		this.ipos = ipos;
	}

	public boolean isHasNext() {
		return hasNext;
	}

	public void setHasNext(boolean hasNext) {
		this.hasNext = hasNext;
	}

	public boolean isHasPrevious() {
		return hasPrevious;
	}

	public void setHasPrevious(boolean hasPrevious) {
		this.hasPrevious = hasPrevious;
	}
	

}
