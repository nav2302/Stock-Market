package com.stockMarket.ExcelService.response;
import java.io.Serializable;

public class serverResponse implements Serializable{

	private static final long serialVersionUID = 1928909901056236718L;
	
	private String status;
	private String message;
	private String AUTH_TOKEN;
	private Object object;

	public serverResponse() {
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

	public Object getObject() {
		return object;
	}

	public void setObject(Object object) {
		this.object = object;
	}

}
