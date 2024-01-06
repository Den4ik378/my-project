package com.example.web.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MyController {
    @GetMapping("/")
    public String home() {
        return "index.html";
    }
    @GetMapping("/chat")
    public String chat() {
        return "chat.html";
    }
    @GetMapping("/clients")
    public String clients() {
        return "clients.html";
    }
    @GetMapping("/sales")
    public String sales() {
        return "sales.html";
    }
    @GetMapping("/products")
    public String products() {
        return "products.html";
    }
    @GetMapping("/emp")
    public String employees() {
        return "employees.html";
    }
}
