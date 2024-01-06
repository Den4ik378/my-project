package com.example.web.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.web.models.Employee;
import com.example.web.repositories.EmployeeRepository;

import java.util.List;

@RestController
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @GetMapping("/api/employees")
    public List<Employee> getEmployees() {
        return (List<Employee>) employeeRepository.findAll();
    }

    @PostMapping("/api/createEmployee")
    public ResponseEntity<String> createEmployee(@RequestBody Employee employee) {
        try {

            employeeRepository.save(employee);

            return new ResponseEntity<>("Працівник успішно створений", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Помилка при створенні працівника", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/api/employees/{employeeId}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long employeeId) {
        // Отримати працівника за ідентифікатором
        Employee employee = employeeRepository.findById(employeeId).orElse(null);

        if (employee != null) {
            return new ResponseEntity<>(employee, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/api/employees/{employeeId}")
    public ResponseEntity<String> updateEmployee(@PathVariable Long employeeId, @RequestBody Employee updatedEmployee) {
        try {
            
            Employee existingEmployee = employeeRepository.findById(employeeId).orElse(null);

            if (existingEmployee != null) {
                
                existingEmployee.setName(updatedEmployee.getName());
                existingEmployee.setPosition(updatedEmployee.getPosition());
                existingEmployee.setEmail(updatedEmployee.getEmail());
                
                employeeRepository.save(existingEmployee);

                return new ResponseEntity<>("Працівник успішно оновлений", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Працівник не знайдений", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Помилка при оновленні працівника", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/api/employees/{employeeId}")
    public ResponseEntity<String> deleteEmployee(@PathVariable Long employeeId) {
        try {
            
            if (!employeeRepository.existsById(employeeId)) {
                return new ResponseEntity<>("Працівника з ID " + employeeId + " не знайдено", HttpStatus.NOT_FOUND);
            }

            employeeRepository.deleteById(employeeId);

            return new ResponseEntity<>("Працівник успішно видалений", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Помилка при видаленні працівника", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
