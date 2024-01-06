package com.example.web.controllers;

import com.example.web.models.Sale;
import com.example.web.repositories.SaleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class SaleController {

    @Autowired
    private SaleRepository saleRepository;

    @GetMapping("/api/sales")
    public List<Sale> getSales() {
        return (List<Sale>) saleRepository.findAll();
    }

    @PostMapping("/api/createSale")
    public ResponseEntity<String> createSale(@RequestBody Sale sale) {
        try {
            
            if (sale.getProductName() == null || sale.getQuantity() <= 0 || sale.getSum() <= 0) {
                return new ResponseEntity<>("Помилка: не всі обов'язкові поля заповнені коректно", HttpStatus.BAD_REQUEST);
            }

            
            saleRepository.save(sale);

            return new ResponseEntity<>("Продаж успішно створений", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Помилка при створенні продажу", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/api/sales/{saleId}")
    public ResponseEntity<Sale> getSaleById(@PathVariable Long saleId) {
        
        Sale sale = saleRepository.findById(saleId).orElse(null);

        if (sale != null) {
            return new ResponseEntity<>(sale, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/api/sales/{saleId}")
    public ResponseEntity<String> updateSale(@PathVariable Long saleId, @RequestBody Sale updatedSale) {
        try {
            if (updatedSale.getProductName() == null || updatedSale.getQuantity() <= 0 || updatedSale.getSum() <= 0) {
                return new ResponseEntity<>("Помилка: не всі обов'язкові поля заповнені коректно", HttpStatus.BAD_REQUEST);
            }

            Sale existingSale = saleRepository.findById(saleId).orElse(null);

            if (existingSale != null) {
                existingSale.setProductName(updatedSale.getProductName());
                existingSale.setQuantity(updatedSale.getQuantity());
                existingSale.setSum(updatedSale.getSum());
                
                saleRepository.save(existingSale);

                return new ResponseEntity<>("Продаж успішно оновлений", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Продаж не знайдений", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Помилка при оновленні продажу", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/api/sales/{saleId}")
    public ResponseEntity<String> deleteSale(@PathVariable Long saleId) {
        try {
            if (!saleRepository.existsById(saleId)) {
                return new ResponseEntity<>("Продажу з ID " + saleId + " не знайдено", HttpStatus.NOT_FOUND);
            }

            saleRepository.deleteById(saleId);

            return new ResponseEntity<>("Продаж успішно видалений", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Помилка при видаленні продажу", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

