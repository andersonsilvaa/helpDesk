package com.project.helpDesk;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.project.helpDesk.api.entity.User;
import com.project.helpDesk.api.enums.ProfileEnum;
import com.project.helpDesk.api.repository.UserRepository;

@SpringBootApplication
public class HelpDeskApplication {

	public static void main(String[] args) {
		SpringApplication.run(HelpDeskApplication.class, args);
	}
	
	@Bean
	CommandLineRunner init(UserRepository userRepository, PasswordEncoder passwordEncoder){
		return args -> {
			this.initUsers(userRepository, passwordEncoder);
		};
	}
	
	private void initUsers(UserRepository userRepository, PasswordEncoder passwordEncoder){
		User administrador = new User();
		administrador.setEmail("andersonsilva0692@gmail.com");
		administrador.setPassword(passwordEncoder.encode("123456"));
		administrador.setProfile(ProfileEnum.ROLE_ADMIN);
		
		User find = userRepository.findByEmail("andersonsilva0692@gmail.com");
		if(find==null){
			userRepository.save(administrador);
		}
	}

}
