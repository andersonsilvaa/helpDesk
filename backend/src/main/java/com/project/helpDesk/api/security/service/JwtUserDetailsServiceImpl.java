package com.project.helpDesk.api.security.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.project.helpDesk.api.entity.User;
import com.project.helpDesk.api.security.jwt.JwtUserFactory;
import com.project.helpDesk.api.service.UserService;

@Service
public class JwtUserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	private UserService userService;
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		User user = this.userService.findByEmail(email);
		
		if(user!=null) {
			return JwtUserFactory.create(user);
		}else {
			throw new UsernameNotFoundException(String.format("Não tem nenhum usuário com esse email '%s'.", email));
		}
	}

	
}
