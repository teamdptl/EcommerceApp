package com.learn.ecommerce.Response;

import java.sql.Date;
import lombok.Data;

@Data
public class ReviewListResponse {
    private int reviewId;
    private int rate;
    private String description;
    private Date createAt;
    private String userFullname;

}
