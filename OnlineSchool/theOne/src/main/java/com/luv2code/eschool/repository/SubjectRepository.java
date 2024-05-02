package com.luv2code.eschool.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.luv2code.eschool.Entity.Subject;

public interface SubjectRepository extends JpaRepository<Subject, Integer> {

}
