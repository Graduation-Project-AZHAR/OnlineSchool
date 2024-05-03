package com.luv2code.eschool.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.luv2code.eschool.Entity.Lesson;
import com.luv2code.eschool.repository.LessonRepository;

@Service
public class LessonService {
	
	private LessonRepository lessonRepository;
	private SubjectService  subjectService;

	@Autowired
	public LessonService(LessonRepository lessonRepository,SubjectService  subjectService) {
		this.lessonRepository = lessonRepository;
		this.subjectService=subjectService;
	}
	
	public List<Lesson> findAll (){
		
	 	return lessonRepository.findAll();
	}

	public List<Object> getSubjectUnitLessons(int subjectId,int uniteNumber){
		List<Lesson> lessons =  subjectService.getSubjectUnitLessons(subjectId, uniteNumber);
		
		return lessons.stream()
                .map(lesson -> {
                    // Create a map or JSON object with title and number
                    return Map.of("title", lesson.getTitle(), "number", lesson.getNumber());
                })
                .collect(Collectors.toList());
		
	}
	
	public Lesson findLessonById (int theId){
		
		Optional<Lesson> result = lessonRepository.findById(theId);
		Lesson theLesson = null;
		if (result.isPresent()) {
			theLesson = result.get();
		}else {
			throw new RuntimeException("Did not find Lesson id - " + theId);
		}
		return theLesson;
	}
	
	
	public Lesson getOneLesson (int subjectId,int uniteNumber,int LessonNumber) {
		List<Lesson> lessons =  subjectService.getSubjectUnitLessons(subjectId, uniteNumber);
		Lesson theLesson = null;
		
		for (Lesson tempLesson:lessons) {
			if(tempLesson.getNumber()==LessonNumber) {
				theLesson=tempLesson;
			}
		}
		return theLesson;
	}
	
}
