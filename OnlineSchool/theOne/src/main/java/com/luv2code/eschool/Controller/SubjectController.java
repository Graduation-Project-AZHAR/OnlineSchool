package com.luv2code.eschool.Controller;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.luv2code.eschool.Entity.Lesson;
import com.luv2code.eschool.Entity.Subject;
import com.luv2code.eschool.Entity.Unite;
import com.luv2code.eschool.service.SubjectService;
import ch.qos.logback.core.model.Model;
import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/subject")
public class SubjectController {
	
	private SubjectService  subjectService;
	
	public SubjectController(SubjectService subjectService) {
		this.subjectService  = subjectService;
	}
	

	@GetMapping("/subjects")
	@Operation(summary = "Get Subjects data")
	public List<Subject> SubjectList(Model theModel){
		List<Subject> All = subjectService.findAll();
		return All;
	}

	@GetMapping("/subjectNames")
	@Operation(summary = "Get Subjects Names")
	public List<String> SubjectNames(Model theModel){
		List<String> names = subjectService.getSubjectNames();
		return names;
	}
	
	@GetMapping("/subjectUnites/{Subject_id}")
	@Operation(summary = "Get Subjects Unites")
	public List<Unite> SubjectUnites(@PathVariable(value="Subject_id") int subjectid,Model theModel){
		
		return subjectService.getSubjectUnits(subjectid);
	}
	
	

	
}
