package com.luv2code.eschool.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.luv2code.eschool.Entity.Student;

public interface StudentRepostiory extends JpaRepository<Student,Integer> {

	
	
}