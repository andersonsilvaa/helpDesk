package com.project.helpDesk.api.security.jwt;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import com.project.helpDesk.api.entity.User;
import com.project.helpDesk.api.enums.ProfileEnum;

public class JwtUserFactory {
	
	/*********************************************
	 * CONSTRUTOR
	 *********************************************/
	private JwtUserFactory() {
	}
	
	/**********************************************************************************************************************
	 * MÉTODO RESPONSÁVEL POR CONVERTER UM USUARIO JWTUSER COM BASE DOS DADOS DE UM USUARIO LOGADO
	 *********************************************************************************************************************/
	public static JwtUser create(User user) {
	    return new JwtUser(
	            user.getId(),
	            user.getEmail(),
	            user.getPassword(),
	            mapToGrantedAuthorities(user.getProfile())
	    );
	}
	
	/*********************************************************************************************************************
	 * MÉTODO RESPONSÁVEL POR CONVERTER PERFIL DO USUARIO PARA UM FORMATO UTILIZADO PELO SPRING SECURITY
	 ********************************************************************************************************************/
	private static List<GrantedAuthority> mapToGrantedAuthorities(ProfileEnum profileEnum) {
			List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>(); 
			authorities.add(new SimpleGrantedAuthority(profileEnum.toString())); 
			return   authorities ;
	}
}
