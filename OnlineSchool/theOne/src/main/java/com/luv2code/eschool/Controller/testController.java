package com.luv2code.eschool.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.web.util.UriComponentsBuilder;

import ch.qos.logback.core.model.Model;

@Controller
public class testController {
	
	@GetMapping("/")
	public String showHome() {
		
		return "home";
	}
	
	@GetMapping("/showMyLoginPage")
	public String showMyLoginPage () {
		
		return "login-page";
	}

	@GetMapping("/leaders")
	public String showLeader() {
		
		return "leaders";
	}
	
	@GetMapping("/systems")
	public String showSystems() {
		
		return "systems";
	}
	
	@GetMapping("/access-denied")
	public String showaccessDenied () {
		
		return "access-denied";
	}

	
	
	
	
	
	
//	@GetMapping("/ggg/{number}")
//	public ResponseEntity<?> test (@PathVariable(value="number") int number,Model theModel) {
//		if(number==0) {
//	        UriComponentsBuilder builder = ServletUriComponentsBuilder.fromCurrentContextPath()
//	        .path("/subject/subjects");
//	        String uriString = builder.toUriString();
//	        System.out.println();
//	        System.out.println(uriString);
//			return ResponseEntity.ok(uriString);
//		}else {
//			return ResponseEntity.ok("/subject/subjectNames");
//		}
//	}
}
