package com.learn.ecommerce.DTO;

import lombok.Data;

@Data
public class BrandDTO {

    private Integer brandid;
    private String name;
    private boolean isdeleted;

    public BrandDTO() {
    }

    public BrandDTO(Integer brandid, String name, boolean isdeleted) {
        this.brandid = brandid;
        this.name = name;
        this.isdeleted = isdeleted;
    }

    public Integer getBrandid() {
        return brandid;
    }

    public void setbrandid(Integer brandid) {
        this.brandid = brandid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isdeleted() {
        return isdeleted;
    }

    public void setIsdeleted(boolean isdeleted) {
        this.isdeleted = isdeleted;
    }

}
