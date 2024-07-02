package com.luv2code.eschool.Demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.luv2code.eschool.Entity.Teacher;
import com.luv2code.eschool.Entity.Unite;

import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;

@Repository
public class DAO {

	private EntityManager entityManager;
	
	@Autowired
	public DAO (EntityManager entityManager) {
		this.entityManager=entityManager;
	}
	
	public Unite findByNumberAndSubjectId(int UNumber, int SubjectId) {
		
		TypedQuery<Unite> query = entityManager.createQuery(
				"SELECT * FROM eschool.unite where number=:unumber and subject_id=:SubjectId",Unite.class);
		query.setParameter("unumber", UNumber);
		query.setParameter("SubjectId", SubjectId);
		
		Unite unite =query.getSingleResult();
		return unite;
		
	}
	
}
