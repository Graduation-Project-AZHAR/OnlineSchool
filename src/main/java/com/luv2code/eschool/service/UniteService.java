package com.luv2code.eschool.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.luv2code.eschool.Entity.Unite;
import com.luv2code.eschool.repository.UniteRepository;

@Service
public class UniteService {
	
	private UniteRepository uniteRepository;
	
	@Autowired
	public UniteService(UniteRepository uniteRepository) {
		this.uniteRepository = uniteRepository;
		
	}
	
	public void save(Unite theUnite) {
		
		uniteRepository.save(theUnite);
	}
	

}
