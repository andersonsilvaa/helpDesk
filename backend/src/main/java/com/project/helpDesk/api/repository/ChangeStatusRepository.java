package com.project.helpDesk.api.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.project.helpDesk.api.entity.ChangeStatus;

public interface ChangeStatusRepository extends MongoRepository<ChangeStatus, String> {

	Iterable<ChangeStatus> findByTicketIdOrderByDateChangeStatusDesc(String ticketId);
}
