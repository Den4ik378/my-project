package com.example.web.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.web.models.Client;
import com.example.web.repositories.ClientRepository;

@RestController
public class ClientController {
    @Autowired
    private ClientRepository clientRepository;

    @GetMapping("/api/clients")
    public List<Client> getClients() {
        return (List<Client>) clientRepository.findAll();
    }

    @PostMapping("/api/createClient")
    public ResponseEntity<String> createClient(@RequestBody Client client) {
        try {
            
            if (client.getName() == null || client.getEmail() == null) {
                return new ResponseEntity<>("Помилка: не всі обов'язкові поля заповнені", HttpStatus.BAD_REQUEST);
            }

            
            clientRepository.save(client);

            return new ResponseEntity<>("Клієнт успішно створений", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Помилка при створенні клієнта", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/api/clients/{clientId}")
    public ResponseEntity<Client> getClientById(@PathVariable Long clientId) {
        
        Client client = clientRepository.findById(clientId).orElse(null);

        if (client != null) {
            return new ResponseEntity<>(client, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/api/clients/{clientId}")
    public ResponseEntity<String> updateClient(@PathVariable Long clientId, @RequestBody Client updatedClient) {
        try {
            
            if (updatedClient.getName() == null || updatedClient.getEmail() == null) {
                return new ResponseEntity<>("Помилка: не всі обов'язкові поля заповнені", HttpStatus.BAD_REQUEST);
            }

            
            Client existingClient = clientRepository.findById(clientId).orElse(null);

            if (existingClient != null) {
                
                existingClient.setName(updatedClient.getName());
                existingClient.setEmail(updatedClient.getEmail());
                
                clientRepository.save(existingClient);

                return new ResponseEntity<>("Клієнт успішно оновлений", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Клієнт не знайдений", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Помилка при оновленні клієнта", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/api/clients/{clientId}")
    public ResponseEntity<String> deleteClient(@PathVariable Long clientId) {
        try {
            
            if (!clientRepository.existsById(clientId)) {
                return new ResponseEntity<>("Клієнта з ID " + clientId + " не знайдено", HttpStatus.NOT_FOUND);
            }

           
            clientRepository.deleteById(clientId);

            return new ResponseEntity<>("Клієнт успішно видалений", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Помилка при видаленні клієнта", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
