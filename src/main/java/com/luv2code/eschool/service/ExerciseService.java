package com.luv2code.eschool.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.luv2code.eschool.Entity.Exercise;
import com.luv2code.eschool.Entity.Lesson;
import com.luv2code.eschool.Entity.QuestionAndAnswer;
import com.luv2code.eschool.Entity.Unite;
import com.luv2code.eschool.repository.ExerciseRepository;

@Service
public class ExerciseService {

	
	private ExerciseRepository exerciseRepository;
	private LessonService lessonService;
	private SubjectService subjectService;
	private UniteService uniteService;
	
	@Autowired
	public ExerciseService(ExerciseRepository exerciseRepository,LessonService lessonService,
						   SubjectService subjectService,UniteService uniteService) {
		this.exerciseRepository = exerciseRepository;
		this.lessonService      = lessonService;
		this.subjectService     = subjectService;
		this.uniteService       = uniteService;
	}
	
	public List<Exercise> findAll() {
		return exerciseRepository.findAll();
	}
	public Exercise findById(int exerciseNimber) {
		
		Optional<Exercise> result = exerciseRepository.findById(exerciseNimber);
		Exercise theExercise = null;
		
		if(result.isPresent()) {
			theExercise=result.get();
		}else {
			throw new RuntimeException("Did not find exercise Nimber :-( ");
		}
		return theExercise;
	}
	
	public void AddLessonExercise (int subjectId,int uniteNumber,int lessonNumber,
								   String question, String Answer,List<String> options) {
		
		Lesson theLesson = lessonService.getOneLesson(subjectId, uniteNumber, lessonNumber);
		
		if(theLesson.getExercise()==null) {
			
		Exercise theExercise =new Exercise ();
		QuestionAndAnswer questionAndAnswer = new QuestionAndAnswer(question,options,Answer,1);
		theExercise.addQuestionAndAnswer(questionAndAnswer);
		exerciseRepository.save(theExercise);
		theLesson.setExercise(theExercise);
		lessonService.updateLesson(theLesson);
		}else {
			Exercise theExercise =theLesson.getExercise();
			
			int questionNumber = theExercise.getQuestionAndAnswer().size()+1;
			
			QuestionAndAnswer questionAndAnswer = new QuestionAndAnswer(question,options,Answer,questionNumber);
			theExercise.addQuestionAndAnswer(questionAndAnswer);
			exerciseRepository.save(theExercise);	
		}
	}
	
	public void AddUniteExercise(int subjectId,int uniteNumber, 
								String question, String Answer,List<String> options) {
		
		Unite theUnite = subjectService.getOneUnite(subjectId, uniteNumber);
		
		if(theUnite.getExercise()==null) {
			
			Exercise theExercise =new Exercise ();
			QuestionAndAnswer questionAndAnswer = new QuestionAndAnswer(question,options,Answer,1);
			theExercise.addQuestionAndAnswer(questionAndAnswer);
			exerciseRepository.save(theExercise);
			theUnite.setExercise(theExercise);
			uniteService.save(theUnite);
			
		}else {
			
			Exercise theExercise =theUnite.getExercise();
			int questionNumber = theExercise.getQuestionAndAnswer().size()+1;
			QuestionAndAnswer questionAndAnswer = new QuestionAndAnswer(question,options,Answer,questionNumber);
			theExercise.addQuestionAndAnswer(questionAndAnswer);
			exerciseRepository.save(theExercise);	
			
		}
		
	}

}
