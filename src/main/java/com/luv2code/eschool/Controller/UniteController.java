package com.luv2code.eschool.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.luv2code.eschool.Entity.Subject;
import com.luv2code.eschool.Entity.Unite;
import com.luv2code.eschool.service.SubjectService;
import com.luv2code.eschool.service.UniteService;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/unite")
public class UniteController {
	
	private UniteService uniteService;
	private SubjectService subjectService;
	
	public UniteController (UniteService uniteService,SubjectService subjectService) {
		this.uniteService   = uniteService;
		this.subjectService = subjectService;
	}
	
	@PostMapping("addUnite/{Subject_id}")
	@Operation(summary="Add a new unite to a specific Subject")
	public void addUnite(@PathVariable("Subject_id") int subjectId,
						@RequestParam("title")String title,
						@RequestParam("description")String description) {
		
		
		int UniteNumber= subjectService.lastUnitNumber(subjectId)+1;
		Unite theUnit = new Unite(title,UniteNumber,description);
		Subject theSubject= subjectService.getSubjectById(subjectId);
		theSubject.AddUnite(theUnit);
		subjectService.save(theSubject);
	}
	@GetMapping("/getOneUnite/{Subject_id}/{unite_number}")
	@Operation(summary="get data of a specific unite")
	public Unite getOneUnite (@PathVariable("Subject_id") int subjectId,
							  @PathVariable("unite_number") int uniteNumber) {
		
		return subjectService.getOneUnite(subjectId, uniteNumber);
		
	}
	
}
