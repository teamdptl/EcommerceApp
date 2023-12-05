package com.learn.ecommerce.Response;

import java.util.List;

public class PageResponse<T> {

    private List<T> content;
    private int totalPages;
    private long totalElements;
    private int number;
    private int size;

    public PageResponse(List<T> content, int totalPages, long totalElements, int number, int size) {
        this.content = content;
        this.totalPages = totalPages;
        this.totalElements = totalElements;
        this.number = number;
        this.size = size;
    }

    public List<T> getContent() {
        return content;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public long getTotalElements() {
        return totalElements;
    }

    public int getNumber() {
        return number;
    }

    public int getSize() {
        return size;
    }

    public void setContent(List<T> content) {
        this.content = content;
    }

    public void setTotalPages(int totalPages) {
        this.totalPages = totalPages;
    }

    public void setTotalElements(long totalElements) {
        this.totalElements = totalElements;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public void setSize(int size) {
        this.size = size;
    }
}