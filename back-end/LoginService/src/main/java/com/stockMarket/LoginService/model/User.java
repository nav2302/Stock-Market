package com.stockMarket.LoginService.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class User implements Serializable {

	private static final long serialVersionUID = -8850740904859933967L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long userid;
	private String email;
	private String username;
	private String password;
	private String usertype;
	private String phone;
	private int age;
	private boolean isEnabled;

	public User() {
		super();
		this.isEnabled = false;
	}

	public User(String email, String username, String password, int age, String phone) {
		super();
		this.email = email;
		this.username = username;
		this.password = password;
		this.age = age;
		this.phone = phone;
	}
	
	public Long getUserid() {
		return userid;
	}

	public void setUserid(Long userid) {
		this.userid = userid;
	}

	public String getUsertype() {
		return usertype;
	}

	public void setUsertype(String usertype) {
		this.usertype = usertype;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public boolean isEnabled() {
		return isEnabled;
	}

	public void setEnabled(boolean isEnabled) {
		this.isEnabled = isEnabled;
	}

	@Override
	public String toString() {
		return "User [userid=" + userid + ", email=" + email + ", username=" + username + ", password=" + password
				+ ", usertype=" + usertype + ", phone=" + phone + ", age=" + age + "]";
	}

}