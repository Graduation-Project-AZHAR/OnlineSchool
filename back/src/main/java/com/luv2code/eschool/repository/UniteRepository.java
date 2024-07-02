package com.luv2code.eschool.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.luv2code.eschool.Entity.Unite;

public interface UniteRepository extends JpaRepository<Unite, Integer> {
	
	//Unite findByNumberAndSubject_id(int Number, int SubjectId);


}
