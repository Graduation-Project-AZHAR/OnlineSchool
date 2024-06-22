package com.luv2code.eschool.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.luv2code.eschool.Entity.FinalQuestionAnswer;
import com.luv2code.eschool.Entity.Lesson;
import com.luv2code.eschool.Entity.Subject;
import com.luv2code.eschool.Entity.Unite;
import com.luv2code.eschool.repository.SubjectRepository;

@Service
public class SubjectService  {
	
	private SubjectRepository subjectRepository ;
	private TeacherService teacherService;
	
	@Autowired
	public SubjectService(SubjectRepository subjectRepository,TeacherService teacherService) {
		this.subjectRepository  = subjectRepository;
		this.teacherService     = teacherService;
	}

	
	public List<Subject> findAll() {
		return subjectRepository.findAll();
	}
	
	
	public List<Object> getSubjectNames() {
		List<Subject> subjects =subjectRepository.findAll();
		
		return subjects.stream()
	            .map(subject -> {
	                Map<String, Object> subjectMap = new HashMap<>();
	                subjectMap.put("teacher Id", subject.getTeacher());
	                subjectMap.put("title", subject.getTitle());
	                subjectMap.put("description", subject.getDescription());
	                subjectMap.put("id", subject.getId());
	                return subjectMap;
	            })
				.collect(Collectors.toList());
	}
	
	public Subject getSubjectById(int subjectId) {
		
		Optional<Subject> result = subjectRepository.findById(subjectId);
		Subject theSubject=null;
		
		if (result.isPresent()) {
			theSubject=result.get();
		}else {
			throw new RuntimeException("Did not find Subject id : " + subjectId+" :-( ");
		}
		return theSubject;
	}
	
	
	
	public List<Unite> getSubjectUnits(int subjectId) {
		
		Subject theSubject=getSubjectById(subjectId);
		
		return theSubject.getUnite();
	}
	
	
	
	public int lastUnitNumber(int subjectId) {
		List<Unite> unites = getSubjectUnits(subjectId);
		int theNumber=0;
		for(Unite temp:unites) {
			if (temp.getNumber()>theNumber) {
			theNumber=temp.getNumber();
			}
		}
		return theNumber;
	}
	
	public int LastLessonNumber(int subjectId,int uniteNumber) {
		List<Lesson> lessons = getUnitLessons(subjectId,uniteNumber);
		int theNumber=0;
		for(Lesson temp:lessons) {
			if (temp.getNumber()>theNumber) {
			theNumber=temp.getNumber();
			}
		}
		return theNumber;
	}
	
	public Unite getOneUnite(int subjectId,int uniteNumber) {
		List<Unite> unites = getSubjectUnits(subjectId);
		for(Unite temp:unites) {
			if (temp.getNumber()==uniteNumber) {
				return temp;
			}
		}
		throw new RuntimeException("Did not find Unite number : " + subjectId+" / "+uniteNumber+"  :-( ");
	}
	
	
	public List<Lesson> getUnitLessons(int subjectId,int uniteNumber){
		return getOneUnite(subjectId,uniteNumber).getLesson();
	}
	
	
	public void save(Subject theSubject) {
		subjectRepository.save(theSubject);
	}
	
	
	public void save (int subjectId,String title,String description ,Integer teacherId,String contentOfFirstTerm,String contentOfSecondTeam) {
		
		Subject theSubject = getSubjectById(subjectId);
		if(title!=null) {
			theSubject.setTitle(title);}
		if(description!=null) {
			theSubject.setDescription(description);}
		if(teacherId!=null) {
			theSubject.setTeacher(teacherService.getTeacherById(teacherId));}
		if(contentOfFirstTerm!=null) {
			theSubject.setContentOfFirstTerm(contentOfFirstTerm);}
		if(contentOfSecondTeam!=null) {
			theSubject.setContentOfSecondTeam(contentOfSecondTeam);}
		
		subjectRepository.save(theSubject);
	}
	
	public void AddSubjectFinelTest (int SubjectId,String question, String Answer,List<String> FinalOptions) {
	
		Subject theSubject = getSubjectById(SubjectId);
		
		if(theSubject.getFinalQuestionAnswer()==null) {
			
			FinalQuestionAnswer finalQuestionAnswer = new FinalQuestionAnswer(question,FinalOptions,Answer,1);
			theSubject.addFinalQuestionAnswer(finalQuestionAnswer);
			
		}else {
			
			int questionNumber = theSubject.getFinalQuestionAnswer().size() + 1;
			FinalQuestionAnswer finalQuestionAnswer = new FinalQuestionAnswer(question,FinalOptions,Answer,questionNumber);
			theSubject.addFinalQuestionAnswer(finalQuestionAnswer);
		}
		subjectRepository.save(theSubject);
		
	}
	
	
}
