package com.hesabbook.repository;

import com.hesabbook.entity.party.Transactions;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface TransactionsRepository extends JpaRepository<Transactions, Integer> {

}