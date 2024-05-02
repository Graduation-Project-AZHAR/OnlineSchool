package com.luv2code.eschool.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.luv2code.eschool.Entity.Student;
import com.luv2code.eschool.repository.StudentRepostiory;

@Service
public class StudentService  {
	
	private StudentRepostiory studentRepostiory;
	
	@Autowired
	public StudentService(StudentRepostiory studentRepostiory) {
		this.studentRepostiory=studentRepostiory;
		
	}

	
	public List<Student> findAll() {
		return studentRepostiory.findAll();
	}
	
	
	
}
