package com.luv2code.eschool.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.luv2code.eschool.Entity.Lesson;
import com.luv2code.eschool.Entity.Subject;
import com.luv2code.eschool.Entity.Unite;
import com.luv2code.eschool.repository.SubjectRepository;

@Service
public class SubjectService  {
	
	private SubjectRepository subjectRepository ;
	
	@Autowired
	public SubjectService(SubjectRepository subjectRepository) {
		this.subjectRepository=subjectRepository;
		
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
	
	
	
	public List<Unite> getSubjectUnits(int subjectId) {
		Optional<Subject> result = subjectRepository.findById(subjectId);
		Subject theSubject=null;
		
		if (result.isPresent()) {
			theSubject=result.get();
		}else {
			throw new RuntimeException("Did not find Subject id - " + subjectId);
		}
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
		Unite theUnite=null;
		for(Unite temp:unites) {
			if (temp.getNumber()==uniteNumber) {
				theUnite = temp;
			}
		}
		return theUnite;
	}
	
	
	public List<Lesson> getUnitLessons(int subjectId,int uniteNumber){
		
		return getOneUnite(subjectId,uniteNumber).getLesson();
	}
	
	
}
