package com.luv2code.eschool.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.luv2code.eschool.Demo.DAO;
import com.luv2code.eschool.Entity.Unite;
import com.luv2code.eschool.repository.UniteRepository;

@Service
public class UniteService {
	
	private UniteRepository uniteRepository;
	private DAO dao;
	
	@Autowired
	public UniteService(UniteRepository uniteRepository,DAO dao) {
		this.uniteRepository = uniteRepository;
		this.dao=dao;
	}
	
	public Unite findByNumberAndSubjectId(int Number,int SubjectId) {
		
		return dao.findByNumberAndSubjectId(Number, SubjectId);
		
	}
	
	public void save(Unite theUnite) {
		
		uniteRepository.save(theUnite);
	}
	

}
