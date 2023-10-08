package com.learn.ecommerce.Service;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public interface RootService<T> {
    public Optional<T> FindByID(int id);
    public Optional<T> FindByUserName(String userName);
    public List<T> GetAll();
    public void Save(T T);
    public void Create();
    public void Delete();
}

