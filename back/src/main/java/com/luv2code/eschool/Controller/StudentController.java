package com.luv2code.eschool.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.luv2code.eschool.Entity.Student;
import com.luv2code.eschool.service.StudentService;

import ch.qos.logback.core.model.Model;
import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/student")
@CrossOrigin(origins = "*")
public class StudentController {

	private StudentService  studentService;
	
	public StudentController(StudentService studentService) {
		this.studentService  = studentService;
	} 
	
	
	@GetMapping("/students")
	@Operation(summary = "Get students data")
	public List<Student> studentList(Model theModel){
		List<Student> All = studentService.findAll();
		return All;
	}
}
