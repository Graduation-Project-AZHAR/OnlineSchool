package com.luv2code.eschool.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.luv2code.eschool.Entity.Teacher;
import com.luv2code.eschool.repository.TeacherRepository;



@Service
public class TeacherService   {

private TeacherRepository teacherRepository;

	
	@Autowired
	public TeacherService(TeacherRepository teacherRepository) {
		this.teacherRepository=teacherRepository;
	}

	public List<Teacher> findAll() {
		return teacherRepository.findAll();
	}
	
	public void save (Teacher teacher) {
		
		teacherRepository.save(teacher);
	}
	
	public Teacher getTeacherById(int teacherId) {
		 
		Optional<Teacher> result = teacherRepository.findById(teacherId);
		Teacher theTeacher = null;
		if(result.isPresent()) {
			theTeacher=result.get();
		}else {
			throw new RuntimeException("can't Find the Teacher with this Id : "+teacherId +" :-(");
		}
			return theTeacher;
		
	}
	
}
