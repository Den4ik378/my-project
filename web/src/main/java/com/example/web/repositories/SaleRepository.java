package com.example.web.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.web.models.Sale;

@Repository
public interface SaleRepository extends CrudRepository<Sale, Long>{
    
}
