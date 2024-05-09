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
	
//	@Id
//	@GeneratedValue(strategy =GenerationType.IDENTITY)
//	@Column(name="id")
//	private int id;
//
//	@Column(name="name")
//	private String name;
//	
//	@Column(name="personal_Photo")
//	private String personalPhoto;
//	
//	@Column(name="email")
//	private String email;
//	
//	@Column(name="password")
//	private String password;
//	
//	
	
	
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
	super(name, personalPhoto, email, password,"teacher");
}



//
//	public Teacher(String name,String personalPhoto, String email, String password) {
//		this.name = name;
//		this.personalPhoto = personalPhoto;
//		this.email = email;
//		this.password = password;
//		
//	}
//	
////////////////////////////////////////////////////////////////////////////////////////////
	

	
//	public String getPersonalPhoto() {
//		return personalPhoto;
//	}
//
//
//	public void setPersonalPhoto(String personalPhoto) {
//		this.personalPhoto = personalPhoto;
//	}

	
	public List<Subject> getSubject() {
		return subject;
	}


	public void setSubject(List<Subject> subject) {
		this.subject = subject;
	}

//	
//	public int getId() {
//		return id;
//	}
//
//	public void setId(int id) {
//		this.id = id;
//	}
//	
//	public String getName() {
//		return name;
//	}
//
//	public void setName(String name) {
//		this.name = name;
//	}
//
//	public String getEmail() {
//		return email;
//	}
//
//	public void setEmail(String email) {
//		this.email = email;
//	}
//
//	public String getPassword() {
//		return password;
//	}
//
//	public void setPassword(String password) {
//		this.password = password;
//	}
//



////////////////////////////////////////////////////////////////////////////////////////////


	
	
	
	

}
