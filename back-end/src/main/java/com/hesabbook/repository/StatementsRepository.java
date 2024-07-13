package com.hesabbook.repository;

import com.hesabbook.entity.party.Statements;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StatementsRepository extends JpaRepository<Statements, Integer> {

}