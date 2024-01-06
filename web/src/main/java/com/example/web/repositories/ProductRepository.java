package com.example.web.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.web.models.Product;

@Repository
public interface ProductRepository extends CrudRepository<Product, Long>{
    
}
