package com.learn.ecommerce.Service;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface RootService<T, K> {
    public Optional<T> findById(K id);
    public List<T> getAll();
    public void save(T T);
    public void delete(K id);
}

