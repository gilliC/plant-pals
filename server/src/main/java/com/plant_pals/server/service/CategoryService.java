package com.plant_pals.server.service;

import org.springframework.stereotype.Service;

import com.plant_pals.server.entity.Category;
import com.plant_pals.server.repository.CategoryRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public Iterable<Category> getCategories() {
        return categoryRepository.findAll();
    }
}
