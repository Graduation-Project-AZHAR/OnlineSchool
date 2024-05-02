package com.luv2code.eschool.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.luv2code.eschool.Entity.Exercise;

public interface ExerciseRepository extends JpaRepository<Exercise, Integer> {

}
