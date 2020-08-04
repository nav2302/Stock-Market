package com.stockMarket.CompanyService.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.stockMarket.CompanyService.model.Ipo;

import org.springframework.data.domain.Pageable;


@Repository
@Transactional
public interface IpoRepository extends JpaRepository<Ipo, Long> {

	List<Ipo> findTop20ByCompanyNameOrderByModifyDateDesc(String name);

	Page<Ipo> findAllByCompanyNameOrderByModifyDateDesc(String companyName, Pageable pageable);

}
