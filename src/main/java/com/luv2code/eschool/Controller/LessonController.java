package com.luv2code.eschool.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
	
	@GetMapping("/uniteLessons/{Subject_id}/{unite_number}")
	@Operation(summary = "Get All lessons in a specific unit in a specific subject.")
	public List<Object> uniteLessons(@PathVariable(value="Subject_id") int subjectId
									,@PathVariable(value="unite_number") int uniteNumber,Model theModel){
		
		return lessonService.getUnitLessons(subjectId, uniteNumber);
	}
	
	@GetMapping("/getOneLesson/{Subject_id}/{unite_number}/{Lesson_number}")
	@Operation(summary = "Get one lesson data in a specific unit in a specific subject.")
	public Lesson getOneLesson(@PathVariable(value="Subject_id") int subjectId
							  ,@PathVariable(value="unite_number") int uniteNumber
							  ,@PathVariable(value="Lesson_number") int LessonNumber,Model theModel){
		
		return lessonService.getOneLesson(subjectId, uniteNumber,LessonNumber);
	}
	
	
	@PostMapping("/AddNewLesson/{subjectId}/{uniteNumber}")
	@Operation(summary = "Add new Lesson")
	public void AddLesson(@PathVariable("subjectId") int subjectId,
            			  @PathVariable("uniteNumber") int uniteNumber,
					   	  @RequestParam("title")String title,
						  @RequestParam("video_url")String videoUrl,
						  @RequestParam("explantions")List<String> explantions,
						  @RequestParam("picture_url")List<String> pictureUrl) {
		Lesson newLesson = new Lesson (title,0,videoUrl,explantions,pictureUrl);
		lessonService.AddLesson(newLesson,subjectId,uniteNumber);
		
	}
	@PutMapping("/UpdateLesson/{subjectId}/{uniteNumber}/{lessonNumber}")
	@Operation(summary = "Update a specific Lesson")
	public void updateLesson(@PathVariable("subjectId") int subjectId,
	                         @PathVariable("uniteNumber") int uniteNumber,
	                         @PathVariable("lessonNumber") int lessonNumber,
	                         @RequestParam(value = "title", required = false) String title,
	                         @RequestParam(value = "video_url", required = false) String videoUrl,
	                         @RequestParam(value = "explantions", required = false) List<String> explantions,
	                         @RequestParam(value = "picture_url", required = false) List<String> pictureUrl,
	                         @RequestParam(value = "NewLessonNumber", required = false) Integer newLessonNumber) {
		
		  lessonService.updateLesson(subjectId, uniteNumber, lessonNumber,title,videoUrl,explantions,pictureUrl,newLessonNumber);
	}


	
	
}
