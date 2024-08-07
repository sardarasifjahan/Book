package com.hesabbook.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.hesabbook.entity.ProductKeyValuePair;
import com.hesabbook.repository.ProductKeyValuesRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class ProductKeyValueService {
    @Autowired
    private ProductKeyValuesRepository productKeyValuesRepository;

    public ProductKeyValuePair save(ProductKeyValuePair accountDetails) {
        return productKeyValuesRepository.save(accountDetails);
    }
    public void saveAll(List<ProductKeyValuePair> productKeyValuePairs) {
        try {
            // Filter out entities with empty value field
            List<ProductKeyValuePair> validProductKeyValuePairs = productKeyValuePairs.stream()
                    .filter(pk -> pk.getValue() != null && !pk.getValue().trim().isEmpty())
                    .collect(Collectors.toList());

            // Save valid entities
            productKeyValuesRepository.saveAll(validProductKeyValuePairs);
        }catch (Exception exception){
            System.out.println("Exception "+exception);
        }
    }



    public void delete(ProductKeyValuePair entity) {
        productKeyValuesRepository.delete(entity);
    }

    public void delete(Integer id) {
        productKeyValuesRepository.deleteById(id);
    }

    public ProductKeyValuePair find(Integer id) {
        Optional<ProductKeyValuePair> AccountDetailsOptional = productKeyValuesRepository.findById(id);
        return AccountDetailsOptional.orElse(null);
    }

    public List<ProductKeyValuePair> findAll() {
        return productKeyValuesRepository.findAll();
    }

    public List<ProductKeyValuePair> getPrimaryUserId(String id) {
        return productKeyValuesRepository.findByPrimaryUserId(id);
    }

    public List<String> getCategory(String id) {
        return productKeyValuesRepository.findByKeyCategory(id);
    }

    public List<String> getCompany(String id) {
        return productKeyValuesRepository.findByKeyCompany(id);
    }

    public List<String> getRackKey(String id) {
        return productKeyValuesRepository.findByRackKey(id);
    }

    public List<String> getWareHouse(String id) {
        return productKeyValuesRepository.findByKeyWareHouse(id);
    }

    public List<String> getBusinessName(String id) {
        return productKeyValuesRepository.findByBusinessName(id);
    }

}
