package com.luv2code.eschool.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.luv2code.eschool.Entity.Lesson;

public interface LessonRepository extends JpaRepository<Lesson, Integer> {
	
	
	@Query("SELECT l.title, l.number FROM Lesson l WHERE l.id = :lessonId")
    List<Object> findTitleAndNumberById(int lessonId);

}
