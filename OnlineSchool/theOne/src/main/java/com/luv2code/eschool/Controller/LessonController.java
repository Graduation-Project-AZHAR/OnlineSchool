package com.luv2code.eschool.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.luv2code.eschool.Entity.Lesson;
import com.luv2code.eschool.service.LessonService;
import ch.qos.logback.core.model.Model;
import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/lesson")
public class LessonController {

	private LessonService   lessonService;
	
	public LessonController(LessonService   lessonService) {
		this.lessonService   = lessonService;
	}
	
	@GetMapping("/lessons")
	@Operation(summary = "Get Lessons data")
	public List<Lesson> LessonList(Model theModel){
		List<Lesson> All = lessonService.findAll();
		return All;
	}
	
	@GetMapping("/subjectUniteLessons/{Subject_id}/{unite_number}")
	@Operation(summary = "Get All lessons in a specific unit in a specific subject.")
	public List<Object> subjectUniteLessons(@PathVariable(value="Subject_id") int subjectId
										   ,@PathVariable(value="unite_number") int uniteNumber,Model theModel){
		
		return lessonService.getSubjectUnitLessons(subjectId, uniteNumber);
	}
	
	@GetMapping("/getOneLesson/{Subject_id}/{unite_number}/{Lesson_number}")
	@Operation(summary = "Get one lesson data in a specific unit in a specific subject.")
	public Lesson getOneLesson(@PathVariable(value="Subject_id") int subjectId
							  ,@PathVariable(value="unite_number") int uniteNumber
							  ,@PathVariable(value="Lesson_number") int LessonNumber,Model theModel){
		
		return lessonService.getOneLesson(subjectId, uniteNumber,LessonNumber);
	}
	
	
}
