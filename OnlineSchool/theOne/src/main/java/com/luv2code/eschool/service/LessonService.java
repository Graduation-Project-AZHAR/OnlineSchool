package com.luv2code.eschool.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.luv2code.eschool.Entity.Lesson;
import com.luv2code.eschool.Entity.Unite;
import com.luv2code.eschool.repository.LessonRepository;

@Service
public class LessonService {
	
	private LessonRepository lessonRepository;
	

	@Autowired
	public LessonService(LessonRepository lessonRepository) {
		this.lessonRepository = lessonRepository;
	}
	
	public List<Lesson> findAll (){
		
	 	return lessonRepository.findAll();
	}

}
