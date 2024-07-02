package com.luv2code.eschool.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.luv2code.eschool.Entity.FinalTest;
import com.luv2code.eschool.compositekeys.FinalTestKey;

public interface FinalTestRepository extends JpaRepository<FinalTest, FinalTestKey> {
	
	@Query(value = "SELECT * FROM final_test where student_id =:studentId", nativeQuery = true)
	List<FinalTest> findAllByStudentId(int studentId);
	
}

