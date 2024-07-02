package com.luv2code.eschool.Entity;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="teacher")
public class Teacher extends User {
	
	@OneToMany(mappedBy = "teacher", // fetch = FetchType.EAGER,
			fetch = FetchType.LAZY,
			cascade = {CascadeType.DETACH,CascadeType.MERGE,CascadeType.PERSIST,CascadeType.REFRESH})
	@JsonIgnore
	private List<Subject> subject;
	
	
	
////////////////////////////////////////////////////////////////////////////////////////////



	public Teacher() {
		super();
	}
	
	
	
public Teacher(String name, String personalPhoto, String email, String password ) {
	super(name, personalPhoto, email, password);
}


	
	public List<Subject> getSubject() {
		return subject;
	}


	public void setSubject(List<Subject> subject) {
		this.subject = subject;
	}

	
	

}
