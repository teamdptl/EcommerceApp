package com.learn.ecommerce.Response;

import lombok.Data;

@Data
public class MediaResponse {
    private int imageId;
    private String imageUrl;
    private boolean isPrimary;
    private boolean isExternalImage;
}
