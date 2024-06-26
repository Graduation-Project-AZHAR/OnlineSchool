package com.luv2code.eschool.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.luv2code.eschool.Entity.Exercise;
import com.luv2code.eschool.Entity.Lesson;
import com.luv2code.eschool.Entity.Student;
import com.luv2code.eschool.Entity.Unite;
import com.luv2code.eschool.Entity.solve;
import com.luv2code.eschool.compositekeys.SolveKey;
import com.luv2code.eschool.repository.SolveRepository;

@Service
public class SolveService {

	private SolveRepository solveRepository;
	private SubjectService subjectService;
	private ExerciseService exerciseService;
	private StudentService studentService;
	
	@Autowired
	public SolveService (SolveRepository solveRepository,SubjectService subjectService,
						 ExerciseService exerciseService,StudentService studentService) {
		this.solveRepository = solveRepository;
		this.subjectService  = subjectService;
		this.exerciseService = exerciseService;
		this.studentService  = studentService;
	}
	public solve getSolveById (SolveKey solveKey) {
		
		Optional<solve> result = solveRepository.findById(solveKey);
		
		if(result.isPresent()) {
			return result.get();
		}else {
			return null;
		}
		
	}
	
	public void save (solve thesolve) {
		
		solveRepository.save(thesolve);
		
	}
	
	
	public SolveKey getSolveKey ( int studentId,int exerciseNumber) {
		
		Student  theStudent  = studentService.findStudentById(studentId);
		Exercise theExercise = exerciseService.findById(exerciseNumber);
		
		return new SolveKey(theStudent,theExercise);
		
	}
	
	
	public int getExerciseGrade(int exerciseNumber,int studentId) {
		SolveKey theKey = getSolveKey(studentId,exerciseNumber);
		if(getSolveById(theKey)==null) {
			return 0;
		}else {
			solve theSolve = getSolveById(theKey);
			return theSolve.getGrade();
		}
	}
	
	public boolean FlagCalculate(int grade,int Qnumber) {
		if(grade>=(Qnumber/2)) {
			return true;
		}
		return false;
	} 
	
	
	
	public List<Object> LessonsGrades (int subjectId,int uniteNumber,int studentId){
		
		List<Lesson> Lessons= subjectService.getUnitLessons(subjectId, uniteNumber);
		List<Object> lessonsGrades= new ArrayList<Object>();
		for(Lesson tempLesson : Lessons) {
			Map<String, Object> lessonsGradsMap = new HashMap<>();
			lessonsGradsMap.put("lessonNumber", tempLesson.getNumber());
			lessonsGradsMap.put("lessonTitle", tempLesson.getTitle());
			lessonsGradsMap.put("Grade",getExerciseGrade(tempLesson.getExercise().getNumber(),studentId));
			lessonsGradsMap.put("QuestionNumber", tempLesson.getExercise().getQuestionAndAnswer().size());
			lessonsGrades.add(lessonsGradsMap);
		}	
		return lessonsGrades;
	}
	
	public List<Object> UnitesGrades (int subjectId,int studentId){
		
		List<Unite> Unites = subjectService.getSubjectUnits(subjectId);
		List<Object> unitesGrades = new ArrayList<Object>();
		
		for(Unite temoUnite : Unites) {
			Map<String,Object> unitesGradesMap= new HashMap<>();
			unitesGradesMap.put("UniteTitle", temoUnite.getTitle());
			unitesGradesMap.put("UniteNumber", temoUnite.getNumber());
			unitesGradesMap.put("Grade",getExerciseGrade(temoUnite.getExercise().getNumber(),studentId));
			unitesGradesMap.put("QuestionNumber", temoUnite.getExercise().getQuestionAndAnswer().size());
			unitesGrades.add(unitesGradesMap);
		}
		
	return unitesGrades;
	}
	
	
	public List<Object> LessonsFlags (int subjectId,int uniteNumber,int studentId) {
		
		List<Lesson> Lessons= subjectService.getUnitLessons(subjectId, uniteNumber);
		
		List<Object> lessonsFlags= new ArrayList<Object>();
		int i=0;
		boolean[] theFlags = new boolean[Lessons.size()+1];
    	theFlags[0]=true;
    	
		for(Lesson tempLesson : Lessons) {
        	theFlags[i+1]=FlagCalculate(getExerciseGrade(tempLesson.getExercise().getNumber(),studentId),
        								tempLesson.getExercise().getQuestionAndAnswer().size());
			
			Map<String, Object> lessonsFlagsMap = new HashMap<>();
			lessonsFlagsMap.put("lessonNumber", tempLesson.getNumber());
			lessonsFlagsMap.put("Flag", theFlags[i]);
			lessonsFlags.add(lessonsFlagsMap);
			i=i+1;
		}
		return lessonsFlags;
	}
	
	
	
	public List<Object> UnitesFlags (int subjectId,int studentId){
		
		List<Unite> Unites = subjectService.getSubjectUnits(subjectId);
		List<Object> UnitesFlags = new ArrayList<Object>();
		
		int i=0;
		boolean[] theFlags = new boolean[Unites.size()+1];
    	theFlags[0]=true;
    	
    	for(Unite tempUnite : Unites) {
    		
    		int grade = getExerciseGrade(tempUnite.getExercise().getNumber(),studentId);
    		if(grade==0) {
    			
    			theFlags[i+1]=false;
    		}else {
    		theFlags[i+1]=FlagCalculate(grade,
    									tempUnite.getExercise().getQuestionAndAnswer().size());
    		}
    		Map<String,Object> unitesFlagsMap= new HashMap<>();
    		unitesFlagsMap.put("UniteNumber", tempUnite.getNumber());
    		unitesFlagsMap.put("Flag", theFlags[i]);
    		UnitesFlags.add(unitesFlagsMap);
			i=i+1;
    	}
		return UnitesFlags;
	}
	
	
	
	
	
}
