package com.luv2code.eschool;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class TheOneApplication {

	public static void main(String[] args) {
		SpringApplication.run(TheOneApplication.class, args);
		
	}

	@Bean
	public WebMvcConfigurer configure() {
		return new WebMvcConfigurer () {
			@Override
			public void addCorsMappings(CorsRegistry reg) {
				reg.addMapping("/**").allowedOrigins("*");
			}
		};
		
	}
	
}
