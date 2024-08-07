package com.luv2code.eschool.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.luv2code.eschool.Controller.auth.*;
import com.luv2code.eschool.Entity.*;
import com.luv2code.eschool.service.UserService;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {
	
	private UserService    userService;
	
	
	public UserController (UserService userService) {
		
		this.userService    = userService;
	}
	
	@PostMapping("/api/authenticate")
	@Operation(summary = "login and return a token ")
	public ResponseEntity<Object> authenticate(@RequestBody AuthenticateRequest request){
		
		return ResponseEntity.ok(userService.authenticate(request));
	}
	

	
	
	@PostMapping("/api/isEmailUsed")
	@Operation(summary = "check if the Email is used or not")
	public boolean isEmailUsed (@RequestParam("email")String theEmail) {
		return userService.checkUsedEmails(theEmail);
	}
	
	
	@PostMapping("/api/StudentSignUp")
	@Operation(summary = "Add new Student")
	public ResponseEntity<AuthenticationResponse> StudentSignUp(  
								@RequestParam("email")String theEmail,
								@RequestParam("name")String name,
							 	@RequestParam("password")String password,
							   	@RequestParam("parent_email")String parentEmail) {
		if(userService.checkUsedEmails(theEmail)) {
			UserRequest request = new UserRequest(name,theEmail,password,parentEmail);
		return ResponseEntity.ok(userService.StudentRequest(request));
		}else {
			throw new RuntimeException("this Email is Already used :-( ");
		}
	}
	
	
	@PostMapping("/api/ParentSignUp")
	@Operation(summary = "Add new Parent")
	public ResponseEntity<AuthenticationResponse> ParentSignUp(   @RequestParam("email")String theEmail,
								@RequestParam("name")String name,
							 	@RequestParam("password")String password) {
		
		if(userService.checkUsedEmails(theEmail)) {
		UserRequest request = new UserRequest(name,theEmail,password,null);
		return ResponseEntity.ok(userService.ParentRequest(request));
		}else {
			throw new RuntimeException("this Email is Already used :-( ");
		}
	}
	
	
	
	@PostMapping("/addTeacher")
	@Operation(summary = "Add new teacher by ADMIN")
	public ResponseEntity<AuthenticationResponse> AddTeacher(@RequestParam("name")String name,
						   @RequestParam("email")String Email,
						   @RequestParam("password")String password ) {
		
		if(userService.checkUsedEmails(Email)) {
			UserRequest request = new UserRequest(name,Email,password,null);
			return ResponseEntity.ok(userService.TeacherRequest(request));
		}else {
			throw new RuntimeException("this Email is Already used :-( ");
		}
		
	}
	
	
	
	@PostMapping("/getUserByEmail")
	@Operation(summary = "get a data of a Specific User by his email")
	public User getUserByEmail (@RequestParam("email")String theEmail) {
		
		return userService.getUserByEmail(theEmail);
	}
	
	@PostMapping("/deleteUserByEmail")
	@Operation(summary = "delete a Specific User by his email")
	public void deleteUserByEmail (@RequestParam("email")String theEmail) {
		
		 userService.deleteUser(theEmail);
	}
	
	
	 
	@PutMapping("/updateUser")
	@Operation(summary = "update User data")
	public void updateUser(@RequestParam("email")String theEmail,
						   @RequestParam("password")String password,
						   @RequestParam(value="name",required = false)String name,
					 	   @RequestParam(value="newPassword",required = false)String newPassword,
					   	   @RequestParam(value="personalPhoto",required = false)String personalPhoto){

		userService.update(theEmail,password,name,newPassword,personalPhoto);
	}
	
	
	
}
