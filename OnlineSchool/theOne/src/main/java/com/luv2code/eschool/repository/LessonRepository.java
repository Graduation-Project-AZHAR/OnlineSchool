package com.luv2code.eschool.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.luv2code.eschool.Entity.Lesson;

public interface LessonRepository extends JpaRepository<Lesson, Integer> {
	
	
	//public List<Lesson> findByUniteId(int UniteId);

}
