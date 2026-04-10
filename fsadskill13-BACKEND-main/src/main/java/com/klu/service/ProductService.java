package com.klu.service;

import com.klu.model.Product;
import com.klu.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository repo;

    public ProductService(ProductRepository repo) {
        this.repo = repo;
    }

    public List<Product> getAllProducts() {
        return repo.findAll();
    }

    public Product addProduct(Product product) {
        return repo.save(product);
    }

    public void deleteProduct(Long id) {
        if (repo.existsById(id)) {
            repo.deleteById(id);
        }
    }

    public boolean productExists(Long id) {
        return repo.existsById(id);
    }
}