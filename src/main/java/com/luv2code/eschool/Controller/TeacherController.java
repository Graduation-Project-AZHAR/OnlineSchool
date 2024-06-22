package com.luv2code.eschool.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.luv2code.eschool.Entity.*;
import com.luv2code.eschool.service.*;
import ch.qos.logback.core.model.Model;
import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/teacher")
@CrossOrigin(origins = "*")
public class TeacherController {

	
	private TeacherService  teacherService;
	
	
	public TeacherController(TeacherService teacherService) {
		this.teacherService  = teacherService;
	} 
	

	@GetMapping("/teachers")
	@Operation(summary = "Get Teachers data")
	public List<Teacher> TeacherList(Model theModel){
		List<Teacher> All = teacherService.findAll();
		return All;
	}

}
