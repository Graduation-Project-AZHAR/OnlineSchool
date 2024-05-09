package com.luv2code.eschool.Controller;

import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.luv2code.eschool.Entity.Parent;
import com.luv2code.eschool.Entity.Student;
import com.luv2code.eschool.Entity.User;
import com.luv2code.eschool.service.ParentService;
import com.luv2code.eschool.service.StudentService;
import com.luv2code.eschool.service.UserService;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/user")
public class UserController {
	
	private UserService userService;
	private StudentService studentService;
	private ParentService parentService;
	
	public UserController (UserService userService,StudentService studentService,ParentService parentService) {
		
		this.userService=userService;
		this.studentService=studentService;
		this.parentService=parentService;
	}
	

	@PostMapping("isEmailUsed")
	@Operation(summary = "check if the Email is used or not")
	public boolean isEmailUsed (@RequestParam("email")String theEmail) {
		return userService.checkUsedEmails(theEmail);
	}
	
	
	@PostMapping("/StudentSignUp")
	@Operation(summary = "Add new Student")
	public void StudentSignUp(  @RequestParam("email")String theEmail,
								@RequestParam("name")String name,
							 	@RequestParam("password")String password,
							   	@RequestParam("parent_email")String parentEmail) {
		
		if(userService.checkUsedEmails(theEmail)) {
		Parent theParent = new Parent();
		int parentId = userService.getUserByEmail(parentEmail).getId();
		theParent = parentService.getParentById(parentId);
		Student theStudent= new Student(name,"", theEmail,password);
		theStudent.setParent(theParent);
		theStudent.setTimeSpent(96);
		studentService.save(theStudent);
		}	
	}
	
	@PostMapping("/ParentSignUp")
	@Operation(summary = "Add new Parent")
	public void ParentSignUp(   @RequestParam("email")String theEmail,
								@RequestParam("name")String name,
							 	@RequestParam("password")String password) {
		
		if(userService.checkUsedEmails(theEmail)) {
		Parent theParent = new Parent(name,"", theEmail,password);
		parentService.save(theParent);
		}
	}
	
	@PostMapping("/login")
	@Operation(summary = "login and return User type(student,teacher,parent ....) or return false if the Email or password is incorrect")
	public String login(      @RequestParam("email")String theEmail,
						 	@RequestParam("password")String password) {
		User theUser =userService.login(theEmail, password);
		if (theUser==null) {
			return "false";
		}else {
		String UserType = theUser.getUserType();
		return UserType;
		}
		
	}
	
	
	
}
