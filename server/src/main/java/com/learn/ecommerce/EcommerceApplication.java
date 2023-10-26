package com.learn.ecommerce;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.learn.ecommerce.Entity.Product;
import com.learn.ecommerce.Entity.TestDTO;
import com.learn.ecommerce.Repository.ProductReponsitory;
import com.learn.ecommerce.auth.AuthenticationService;
import com.learn.ecommerce.auth.RegisterRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Optional;

import static com.learn.ecommerce.user.Role.ADMIN;
import static com.learn.ecommerce.user.Role.MANAGER;

@SpringBootApplication
public class EcommerceApplication {
//	@Autowired
//	private ProductReponsitory reponsitory;
	public static void main(String[] args) {
		SpringApplication.run(EcommerceApplication.class, args);
	}

	@Bean
	public CommandLineRunner commandLineRunner(
			AuthenticationService service
	) {
		return args -> {
//			var admin = RegisterRequest.builder()
//					.username("username")
//					.email("admin@mail.com")
//					.password("username")
//					.role(ADMIN)
//					.build();
//			System.out.println("Admin token: " + service.register(admin).getAccessToken());
//
//			var manager = RegisterRequest.builder()
//					.username("manager")
//					.email("admin@mail.com")
//					.password("manager")
//					.role(MANAGER)
//					.build();
//			System.out.println("Manager token: " + service.register(manager).getAccessToken());

			// Tạo product của duy
//			Product product = new Product();
//			product.setName("Hello duy");
//			product.setDescription("ABC");
//			product.setThongSoKyThuat("ABC");
//			product.setPrice(12345);
//			product.setOldPrice(123123);
//			product.setWarrantyMonths(12);
//			product.setQuantity(10);
//			product.setOrigin("NB");
//			product.setAttributes("{\"Val1\":\"37\", \"Val2\":\"25\"}");
//			product.setBranch(null);
//			product.setCategory(null);
//
//			reponsitory.save(product);

//			Optional<Product> product = reponsitory.findById(1);
//			String json = product.get().getAttributes();
//			ObjectMapper obj = new ObjectMapper();
//			TestDTO dto = obj.readValue(json, TestDTO.class);
//			System.out.println(dto.Val1);
//			System.out.println(dto.Val2);

//			public class TestDTO {
//				public String Val1;
//				public String Val2;
//			}


		};


	}
}
