package com.learn.ecommerce;

import com.learn.ecommerce.auth.AuthenticationService;
import com.learn.ecommerce.auth.RegisterRequest;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import static com.learn.ecommerce.user.Role.ADMIN;
import static com.learn.ecommerce.user.Role.MANAGER;

@SpringBootApplication
public class EcommerceApplication {

	public static void main(String[] args) {
		SpringApplication.run(EcommerceApplication.class, args);
	}

	@Bean
	public CommandLineRunner commandLineRunner(
			AuthenticationService service
	) {
		return args -> {
			var admin = RegisterRequest.builder()
					.username("username")
					.email("admin@mail.com")
					.password("username")
					.role(ADMIN)
					.build();
			System.out.println("Admin token: " + service.register(admin).getAccessToken());

			var manager = RegisterRequest.builder()
					.username("manager")
					.email("admin@mail.com")
					.password("manager")
					.role(MANAGER)
					.build();
			System.out.println("Manager token: " + service.register(manager).getAccessToken());

		};


	}
}
