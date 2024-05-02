package com.luv2code.eschool.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.luv2code.eschool.Entity.Exercise;
import com.luv2code.eschool.service.ExerciseService;
import ch.qos.logback.core.model.Model;
import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/exercise")
public class ExerciseController {


	private ExerciseService exerciseService;
	
	public ExerciseController(ExerciseService exerciseService) {
		this.exerciseService = exerciseService;
	}
	

	@GetMapping("/exercises")
	@Operation(summary = "Get Exercises data")
	public List<Exercise> exerciseList(Model theModel){
		List<Exercise> All = exerciseService.findAll();
		return All;
	}
	
	
	
}
