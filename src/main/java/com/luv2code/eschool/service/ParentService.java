package com.luv2code.eschool.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.luv2code.eschool.Entity.Parent;
import com.luv2code.eschool.repository.ParentRepository;

@Service
public class ParentService {

	
	private ParentRepository parentRepository;
	
	@Autowired
	public ParentService(ParentRepository parentRepository) {
		this.parentRepository = parentRepository;
	}
	
	public Parent getParentById (int theId) {
		Optional<Parent> result = parentRepository.findById(theId);
		Parent theParent = new Parent();
		if(result.isPresent()) {
			
			theParent=result.get();
		}else {
			throw new RuntimeException("Did not find this parent id - " + theId);
		}
		return theParent;
	}
	
	public void save (Parent theParent) {
		
		parentRepository.save(theParent);
		
	}
	
	
}
