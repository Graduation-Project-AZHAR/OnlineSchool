package com.luv2code.eschool.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.luv2code.eschool.Entity.Lesson;
import com.luv2code.eschool.Entity.Unite;
import com.luv2code.eschool.repository.LessonRepository;

@Service
public class LessonService {
	
	private LessonRepository lessonRepository;
	private SubjectService  subjectService;
	private UniteService uniteService ;

	@Autowired
	public LessonService(LessonRepository lessonRepository,SubjectService  subjectService
						,UniteService uniteService) {
		this.lessonRepository = lessonRepository;
		this.subjectService=subjectService;
		this.uniteService=uniteService;
	}
	
	public List<Lesson> findAll (){
		
	 	return lessonRepository.findAll();
	}

	public List<Object> getUnitLessons(int subjectId,int uniteNumber){
		List<Lesson> lessons =  subjectService.getUnitLessons(subjectId, uniteNumber);
		
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
		List<Lesson> lessons =  subjectService.getUnitLessons(subjectId, uniteNumber);
		
		for (Lesson tempLesson:lessons) {
			if(tempLesson.getNumber()==LessonNumber) {
				return tempLesson;
			}
		}
		throw new RuntimeException("\n////////////////////////////\nDid not find this Lesson :-( \n////////////////////////////\n");
	}
	
	
	
	public void AddLesson(Lesson theLesson,int SupjectId,int UniteNumber) {
		
		theLesson.setNumber(subjectService.LastLessonNumber(SupjectId,UniteNumber)+1);
		Unite tempUnite =subjectService.getOneUnite(SupjectId, UniteNumber);
		tempUnite.AddLesson(theLesson);
		uniteService.save(tempUnite);
		
	}
	
	public void updateLesson(Lesson theLesson) {
		
		lessonRepository.save(theLesson);
	}
	
	public void updateLesson(int SupjectId,int UniteNumber,int LessonNumber,String title,
								String videoUrl,List<String> explantions,List<String> pictureUrl
								,Integer newLessonNumber) {
		
		Lesson theLesson= getOneLesson(SupjectId,UniteNumber,LessonNumber);
		
		if(title!=null) {
			theLesson.setTitle(title);}
		if(videoUrl!=null) {
			theLesson.setVideo_url(videoUrl);}
		if(explantions!=null) {
			theLesson.setExplantions(explantions);}
		if(pictureUrl!=null) {
			theLesson.setPictureUrl(pictureUrl);}
		if(newLessonNumber!=null) {
			theLesson.setNumber(newLessonNumber);}
		lessonRepository.save(theLesson);
	}
	
	
	
}
