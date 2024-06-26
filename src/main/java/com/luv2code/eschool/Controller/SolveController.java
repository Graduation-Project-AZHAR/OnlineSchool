package com.luv2code.eschool.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.luv2code.eschool.Entity.solve;
import com.luv2code.eschool.compositekeys.SolveKey;
import com.luv2code.eschool.service.SolveService;
import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/solve")
@CrossOrigin(origins = "*")
public class SolveController {

	private SolveService    solveService ;
	
	
	public SolveController (SolveService solveService) {
		this.solveService    = solveService;
	}
	
	@PostMapping("/addGrade/{exerciseNumber}/{student_id}")
	@Operation(summary = "Add Grade for a specific Student in a specific Exercise")
	public void AddGrade(@PathVariable("exerciseNumber") int exerciseNumber,
						 @PathVariable("student_id") int studentId,
						 @RequestParam("grade")		 int grade) {
		
		
		SolveKey theKey = solveService.getSolveKey(studentId, exerciseNumber);
		
		solve theSolve = new solve (theKey,grade);
		solveService.save(theSolve);
		
	}
	
	@GetMapping("/getLessonsGrades/{student_id}/{Subject_id}/{unite_number}")
	@Operation(summary = "get Grades for Lessons in specific Unite")
	public List<Object> LessonsGrades (@PathVariable("Subject_id") int subjectId,
									  @PathVariable("unite_number") int uniteNumber,
								   	  @PathVariable("student_id") int studentId){
		
		return solveService.LessonsGrades(subjectId, uniteNumber, studentId);
	}
	
	@GetMapping("/getUnitesGrades/{student_id}/{Subject_id}")
	@Operation(summary = "get Grades for Units in specific Subject")
	public List<Object> UnitesGrades ( @PathVariable("Subject_id") int subjectId,
								   	  @PathVariable("student_id") int studentId){
		
		return solveService.UnitesGrades(subjectId, studentId);
	}
	
	
	
	@GetMapping("/getLessonsFlags/{student_id}/{Subject_id}/{unite_number}")
	@Operation(summary = "get Flags for Lessons in specific Unite")
	public List<Object> LessonsFlags (@PathVariable("Subject_id") int subjectId,
									  @PathVariable("unite_number") int uniteNumber,
								   	  @PathVariable("student_id") int studentId){
		
		return solveService.LessonsFlags(subjectId, uniteNumber, studentId);
	}
	
	@GetMapping("/getUnitesFlags/{student_id}/{Subject_id}")
	@Operation(summary = "get Flags for Units in specific Subject")
	public List<Object> UnitesFlags ( @PathVariable("Subject_id") int subjectId,
								   	  @PathVariable("student_id") int studentId){
		
		return solveService.UnitesFlags(subjectId, studentId);
	}
}
