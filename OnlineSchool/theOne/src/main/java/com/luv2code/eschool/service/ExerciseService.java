package com.luv2code.eschool.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.luv2code.eschool.Entity.Exercise;
import com.luv2code.eschool.repository.ExerciseRepository;

@Service
public class ExerciseService {

	
	private ExerciseRepository exerciseRepository;

	@Autowired
	public ExerciseService(ExerciseRepository exerciseRepository) {
		this.exerciseRepository = exerciseRepository;
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

	
	
	
}
