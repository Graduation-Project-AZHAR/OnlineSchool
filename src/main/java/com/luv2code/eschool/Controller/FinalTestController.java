package com.luv2code.eschool.Controller;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.luv2code.eschool.Entity.FinalTest;
import com.luv2code.eschool.Entity.Student;
import com.luv2code.eschool.Entity.Subject;
import com.luv2code.eschool.compositekeys.FinalTestKey;
import com.luv2code.eschool.service.FinalTestService;
import com.luv2code.eschool.service.StudentService;
import com.luv2code.eschool.service.SubjectService;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/FinalTest")
public class FinalTestController {
	
	
	private FinalTestService finalTestService;
	private StudentService studentService;
	private SubjectService subjectService;
	
	public FinalTestController (FinalTestService finalTestService,StudentService studentService,
								SubjectService subjectService) {
		this.studentService   = studentService;
		this.finalTestService = finalTestService;
		this.subjectService   = subjectService;
	}
	
	@PostMapping("/addGrade/{subject_id}/{student_id}")
	@Operation(summary = "Add Grade for a specific Student in a specific subject")
	public void AddGrade(@PathVariable("subject_id") int subjectId,
						 @PathVariable("student_id") int studentId,
						 @RequestParam("grade")		 int grade) {
		
		Student theStudent =studentService.findStudentById(studentId);
		Subject theSubject =subjectService.getSubjectById(subjectId);
		
		FinalTestKey theKey=new FinalTestKey(theStudent,theSubject);
		FinalTest finalTest = new FinalTest(theKey,grade);
		finalTestService.save(finalTest);
	}
	
	@GetMapping("/getStudentTestGrads/{student_id}")
	@Operation(summary = "get Final Test grades for a specific Student")
	public List<FinalTest> getStudentTestGrads (@PathVariable("student_id") int studentId){
		
		return finalTestService.getStudentTestGrads(studentId);
		
	}
	
	
}
