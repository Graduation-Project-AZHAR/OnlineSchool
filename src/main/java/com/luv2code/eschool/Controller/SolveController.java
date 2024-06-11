package com.luv2code.eschool.Controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.luv2code.eschool.Entity.Exercise;
import com.luv2code.eschool.Entity.Student;
import com.luv2code.eschool.Entity.solve;
import com.luv2code.eschool.compositekeys.SolveKey;
import com.luv2code.eschool.service.ExerciseService;
import com.luv2code.eschool.service.SolveService;
import com.luv2code.eschool.service.StudentService;
import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/exerciseSolve")
public class SolveController {

	private SolveService    solveService ;
	private StudentService  studentService;
	private ExerciseService exerciseService;
	
	
	public SolveController (SolveService solveService,StudentService studentService,ExerciseService exerciseService) {
		this.solveService    = solveService;
		this.studentService  = studentService;
		this.exerciseService = exerciseService;
	}
	
	@PostMapping("/addGrade/{exerciseNumber}/{student_id}")
	@Operation(summary = "Add Grade for a specific Student in a specific Exercise")
	public void AddGrade(@PathVariable("exerciseNumber") int exerciseNumber,
						 @PathVariable("student_id") int studentId,
						 @RequestParam("grade")		 int grade) {
		
		Student  theStudent  = studentService.findStudentById(studentId);
		Exercise theExercise = exerciseService.findById(exerciseNumber);
		
		SolveKey theKey = new SolveKey(theStudent,theExercise);
		
		solve theSolve = new solve (theKey,grade);
		solveService.save(theSolve);
		
	}
	
	
}
