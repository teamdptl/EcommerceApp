package com.learn.ecommerce;

import com.learn.ecommerce.Entity.Role;
import com.learn.ecommerce.Entity.User;
import com.learn.ecommerce.Repository.UserRepository;
import com.learn.ecommerce.Request.RegisterRequest;
import com.learn.ecommerce.Service.Implementation.ProductImp;
import com.learn.ecommerce.Service.Implementation.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static com.learn.ecommerce.Entity.Permission.ADMIN;

@SpringBootApplication
public class EcommerceApplication {
	@Autowired
	private ProductImp productService;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private UserRepository repo;
	public static void main(String[] args) {
		SpringApplication.run(EcommerceApplication.class, args);
	}

    @Bean
    CommandLineRunner commandLineRunner(
             AuthenticationService service
             ) {
		return args -> {

//			var admin = RegisterRequest.builder()
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
//			product.setThongSoKiThuat("ABC");
//			product.setPrice(12345);
//			product.setOldPrice(123123);
//			product.setWarrantyMonths(12);
//			product.setQuantity(10);
//			product.setOrigin("NB");
//			product.setAttributes("{\"Val1\":\"37\", \"Val2\":\"25\"}");
//			product.setBrand(null);
//			product.setCategory(null);
//
//			productService.save(product);

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

			Optional<User> admin = repo.findByEmail("admin@gmail.com");
			if (admin.isEmpty()){
				User user = new User();
				user.setEmail("admin@gmail.com");
				user.setFullname("Admin");
				user.setLocate("vn");
				user.setRole(Role.ADMIN);
				user.setPassword(passwordEncoder.encode("admin"));
				user.setUsername("admin@gmail.com");
				repo.save(user);
			}
		};


	}
}
