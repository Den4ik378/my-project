package com.example.web.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.web.models.Client;

@Repository
public interface ClientRepository extends CrudRepository<Client, Long>{

} 
