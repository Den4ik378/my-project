package com.example.web.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.web.models.Employee;

@Repository
public interface EmployeeRepository extends CrudRepository<Employee, Long>{

    
}