package com.luv2code.eschool.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.luv2code.eschool.Entity.Subject;
import com.luv2code.eschool.Entity.Unite;
import com.luv2code.eschool.service.SubjectService;
import ch.qos.logback.core.model.Model;
import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/subject")
@CrossOrigin(origins = "*")
public class SubjectController {
	
	private SubjectService  subjectService;
	
	public SubjectController(SubjectService subjectService) {
		this.subjectService  = subjectService;
	}
	

	@GetMapping("/subjects")
	@Operation(summary = "Get All Subjects data")
	public List<Subject> SubjectList(Model theModel){
		List<Subject> All = subjectService.findAll();
		return All;
	}

	@GetMapping("/getOneSubject/{Subject_id}")
	@Operation(summary = "Get data of a specific subject")
	public Subject getOneSubject (@PathVariable(value="Subject_id") int SubjectId,Model theModel) {
		
		return subjectService.getSubjectById(SubjectId);
		
	}
	
	
	@GetMapping("/subjectNames")
	@Operation(summary = "Get Subjects Names")
	public List<Object> SubjectNames(Model theModel){
		
		return subjectService.getSubjectNames();
	}
	
	@GetMapping("/subjectUnites/{Subject_id}")
	@Operation(summary = "Get Subject Unites")
	public List<Unite> SubjectUnites(@PathVariable(value="Subject_id") int subjectid,Model theModel){
		
		return subjectService.getSubjectUnits(subjectid);
	}
	
	@PutMapping("/updateSubject/{subjectId}")
	@Operation(summary = "edit a specific Subject")
	public void UpdateSubject(@PathVariable("subjectId")int subjectId,
							  @RequestParam(value="title",required = false)String title,
							  @RequestParam(value="description",required = false) String description,
							  @RequestParam(value="teacherId",required = false) Integer teacherId,
							  @RequestParam(value="pictureURL",required = false) String pictureURL,
							  @RequestParam(value="contentOfFirstTerm",required = false)String contentOfFirstTerm,
							  @RequestParam(value="contentOfSecondTeam",required = false)String contentOfSecondTeam) {
		
		subjectService.save(subjectId, title, description, teacherId,pictureURL,contentOfFirstTerm,contentOfSecondTeam);
		
	}
	
	@PostMapping("/AddFinalQuestionAnswer/{subjectId}")
	@Operation(summary = "Add new Finel Question and Answer for a specific subject")
	public void AddFinalQuestionAnswer(@PathVariable("subjectId") int subjectId,
							           @RequestParam("Question") String question,
						               @RequestParam("Answer") String Answer,
						               @RequestParam("options") List<String> options) {
		
		subjectService.AddSubjectFinelTest(subjectId, question, Answer, options);
	}
	
	@PostMapping("/addSubject")
	@Operation(summary = "add a new Subject")
	public void addSubject(	  @RequestParam("title")String title,
							  @RequestParam("description") String description,
							  @RequestParam("teacherId") Integer teacherId,
							  @RequestParam("pictureURL") String pictureURL,
							  @RequestParam(value="contentOfFirstTerm",required = false)String contentOfFirstTerm,
							  @RequestParam(value="contentOfSecondTeam",required = false)String contentOfSecondTeam) {
		
		subjectService.save( title, description, teacherId,pictureURL,contentOfFirstTerm,contentOfSecondTeam);
		
	}
	
}
