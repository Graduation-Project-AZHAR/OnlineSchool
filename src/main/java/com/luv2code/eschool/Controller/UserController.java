package com.luv2code.eschool.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.luv2code.eschool.Entity.*;
import com.luv2code.eschool.service.ParentService;
import com.luv2code.eschool.service.StudentService;
import com.luv2code.eschool.service.TeacherService;
import com.luv2code.eschool.service.UserService;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/user")
public class UserController {
	
	private UserService    userService;
	private StudentService studentService;
	private ParentService  parentService;
	private TeacherService teacherService;
	
	
	public UserController (UserService userService,StudentService studentService,
						   ParentService parentService,TeacherService teacherService) {
		
		this.userService    = userService;
		this.studentService = studentService;
		this.parentService  = parentService;
		this.teacherService = teacherService;
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
		theStudent.setTimeSpent(0);
		studentService.save(theStudent);
		
		}else {
			throw new RuntimeException("this Email is Already used :-( ");
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
		}else {
			throw new RuntimeException("this Email is Already used :-( ");
		}
	}
	@PostMapping("/addTeacher")
	@Operation(summary = "Add new teacher by Manger")
	public void AddTeacher(@RequestParam("name")String name,
						   @RequestParam("email")String Email,
						   @RequestParam("password")String password ) {
		
		if(userService.checkUsedEmails(Email)) {
			Teacher theTeacher = new Teacher(name,"",Email,password);
			teacherService.save(theTeacher);
		}else {
			throw new RuntimeException("this Email is Already used :-( ");
		}
		
	}
	
	
	@PostMapping("/login")
	@Operation(summary = "login and return User type(student,teacher,parent ....) or return false if the Email or password is incorrect")
	public String login(@RequestParam("email")String theEmail,
						@RequestParam("password")String password) {
		User theUser =userService.login(theEmail, password);
		if (theUser==null) {
			return "false";
		}else {
		String UserType = theUser.getUserType();
		return UserType;
		}
		
	}
	
	
	@PostMapping("/getUserByEmail")
	@Operation(summary = "get a data of a Specific User by his user")
	public User getUserByEmail (@RequestParam("email")String theEmail) {
		
		return userService.getUserByEmail(theEmail);
	}
	
}
