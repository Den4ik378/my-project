package com.example.web.controllers;

import com.example.web.models.Product;
import com.example.web.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @GetMapping("/api/products")
    public List<Product> getProducts() {
        return (List<Product>) productRepository.findAll();
    }

    @PostMapping("/api/createProduct")
    public ResponseEntity<String> createProduct(@RequestBody Product product) {
        try {
           
            if (product.getName() == null || product.getDescription() == null || product.getPrice() <= 0) {
                return new ResponseEntity<>("Помилка: не всі обов'язкові поля заповнені коректно", HttpStatus.BAD_REQUEST);
            }

            
            productRepository.save(product);

            return new ResponseEntity<>("Продукт успішно створений", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Помилка при створенні продукту", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/api/products/{productId}")
    public ResponseEntity<Product> getProductById(@PathVariable Long productId) {
        
        Product product = productRepository.findById(productId).orElse(null);

        if (product != null) {
            return new ResponseEntity<>(product, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/api/products/{productId}")
    public ResponseEntity<String> updateProduct(@PathVariable Long productId, @RequestBody Product updatedProduct) {
        try {
            
            if (updatedProduct.getName() == null || updatedProduct.getDescription() == null || updatedProduct.getPrice() <= 0) {
                return new ResponseEntity<>("Помилка: не всі обов'язкові поля заповнені коректно", HttpStatus.BAD_REQUEST);
            }

            
            Product existingProduct = productRepository.findById(productId).orElse(null);

            if (existingProduct != null) {
                
                existingProduct.setName(updatedProduct.getName());
                existingProduct.setDescription(updatedProduct.getDescription());
                existingProduct.setPrice(updatedProduct.getPrice());
                

                
                productRepository.save(existingProduct);

                return new ResponseEntity<>("Продукт успішно оновлений", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Продукт не знайдений", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Помилка при оновленні продукту", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/api/products/{productId}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long productId) {
        try {
           
            if (!productRepository.existsById(productId)) {
                return new ResponseEntity<>("Продукту з ID " + productId + " не знайдено", HttpStatus.NOT_FOUND);
            }

            productRepository.deleteById(productId);

            return new ResponseEntity<>("Продукт успішно видалений", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Помилка при видаленні продукту", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
