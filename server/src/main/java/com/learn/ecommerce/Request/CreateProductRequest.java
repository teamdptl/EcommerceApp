package com.learn.ecommerce.Request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
public class CreateProductRequest{
    @NotEmpty
    private List<Integer> fileIds;
    @NotEmpty
    private String name;
    @NotEmpty
    private String description;
    private String thongSoKiThuat;
    @Min(0)
    private long price;
    @Min(0)
    private long oldPrice;
    @Min(0)
    private int warrantyMonths;
    @Min(0)
    private int quantity;
    @NotEmpty
    private String origin;
    private String attributes;
    @Min(1)
    private int brandId;
    @Min(1)
    private int categoryId;
    private int primaryImageIndex = 0;
}
