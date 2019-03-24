package com.project.helpDesk.api.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.project.helpDesk.api.entity.User;

public interface UserRepository extends MongoRepository<User, String> {

	User findByEmail(String email);

}
