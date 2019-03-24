package com.project.helpDesk.api.security.model;

import com.project.helpDesk.api.entity.User;

public class CurrentUser {

	private String token;
	private User user;
	
	/*************************************************************
	 * CONSTRUTORES
	 ************************************************************/
	
	public CurrentUser() {
		super();
	}
	
	public CurrentUser(String token, User user) {
		this.token = token;
		this.user = user;
	}
	
	/*************************************************************
	 * METODOS ACESSORES
	 ************************************************************/

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
}
