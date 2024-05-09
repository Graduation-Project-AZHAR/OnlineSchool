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
	
	
	public List<Lesson> getSubjectUnitLessons(int subjectId,int uniteNumber){
		
		List<Unite> unites = getSubjectUnits(subjectId);
		
		for(Unite temp:unites) {
			if (temp.getNumber()==uniteNumber) {
				return temp.getLesson();
			}
		}
		return null;
	}
	
	
}
