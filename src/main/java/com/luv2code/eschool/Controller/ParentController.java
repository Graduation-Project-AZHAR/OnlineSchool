package com.luv2code.eschool.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.luv2code.eschool.Entity.Parent;
import com.luv2code.eschool.service.ParentService;

import io.swagger.v3.oas.annotations.Operation;

@RestController
@RequestMapping("/parent")
public class ParentController {

	private ParentService parentService;
	
	public  ParentController(ParentService parentService) {
		
		this.parentService = parentService;
	}
	
	@GetMapping("/getOneParent/{parent_id}")
	@Operation(summary = "Get data of a specific Parent")
	public Parent GetOneParent(@PathVariable(value="parent_id") int  parentId) {
		
		return parentService.getParentById(parentId);
	}
	
	
}
