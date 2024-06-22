package com.luv2code.eschool.Controller.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserRequest {

	private String name;
	
	private String email;
	
	private String password;
	
	private String parentEmail;
}
