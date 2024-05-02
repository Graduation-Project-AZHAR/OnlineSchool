package com.luv2code.eschool.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.luv2code.eschool.Entity.Teacher;

public interface TeacherRepository extends JpaRepository<Teacher, Integer> {

	//@Query("SELECT id,name,personal_Photo,email,password FROM teacher")
	//List<Teacher> SELECTAll();
	
}
