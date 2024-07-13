package com.hesabbook.repository;

import com.hesabbook.entity.party.ItemWiseReport;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemWiseReportRepository extends JpaRepository<ItemWiseReport, Integer> {

}