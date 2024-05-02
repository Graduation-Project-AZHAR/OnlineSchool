package com.luv2code.eschool.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
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
	
}
