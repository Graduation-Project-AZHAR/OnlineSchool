package com.luv2code.eschool.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
	

	@GetMapping("/AllExercises")
	@Operation(summary = "Get All Exercises data")
	public List<Exercise> exerciseList(Model theModel){
		List<Exercise> All = exerciseService.findAll();
		return All;
	}
	
	@GetMapping("/getOneExercise/{exercise_id}")
	@Operation(summary = "Get one Exercise data")
	public Exercise getOneExercise(@PathVariable(value="exercise_id") int exerciseId,Model theModel){
		Exercise theExercise = exerciseService.findById(exerciseId);
		return theExercise;
	}
	@PostMapping("/AddLessonExercise/{subjectId}/{uniteNumber}/{lessonNumber}")
	@Operation(summary="Add new Exercise for a specific Lesson")
	public void AddLessonExercise (@PathVariable("subjectId") int subjectId,
						           @PathVariable("uniteNumber") int uniteNumber,
						           @PathVariable("lessonNumber") int lessonNumber, 
						           @RequestParam("Question") String question,
			                       @RequestParam("Answer") String Answer,
			                       @RequestParam("options") List<String> options) {
		
		exerciseService.AddLessonExercise(subjectId, uniteNumber, lessonNumber, question, Answer, options);
		
	}
	
	
	
	
}
