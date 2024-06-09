package com.luv2code.eschool.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.luv2code.eschool.Entity.Exercise;
import com.luv2code.eschool.Entity.Lesson;
import com.luv2code.eschool.Entity.QuestionAndAnswer;
import com.luv2code.eschool.repository.ExerciseRepository;

@Service
public class ExerciseService {

	
	private ExerciseRepository exerciseRepository;
	private LessonService lessonService;
	@Autowired
	public ExerciseService(ExerciseRepository exerciseRepository,LessonService lessonService) {
		this.exerciseRepository = exerciseRepository;
		this.lessonService = lessonService;
	}
	
	public List<Exercise> findAll() {
		return exerciseRepository.findAll();
	}
	public Exercise findById(int exerciseId) {
		
		Optional<Exercise> result = exerciseRepository.findById(exerciseId);
		Exercise theExercise = null;
		
		if(result.isPresent()) {
			theExercise=result.get();
		}else {
			throw new RuntimeException("Did not find employee id - ");
		}
		return theExercise;
	}

	public void AddLessonExercise (int subjectId,int uniteNumber,int lessonNumber,
								   String question, String Answer,List<String> options) {
		
		Exercise newExercise =new Exercise ();
		QuestionAndAnswer questionAndAnswer = new QuestionAndAnswer(question,options,Answer,1);
		newExercise.addQuestionAndAnswer(questionAndAnswer);
		exerciseRepository.save(newExercise);
		
		Lesson theLesson = lessonService.getOneLesson(subjectId, uniteNumber, lessonNumber);
		theLesson.setExercise(newExercise);
		lessonService.updateLesson(theLesson);
		
	}
	
	
}
