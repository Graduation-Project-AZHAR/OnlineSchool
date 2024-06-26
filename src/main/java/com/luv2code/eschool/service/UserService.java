package com.luv2code.eschool.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.luv2code.eschool.Controller.auth.AuthenticateRequest;
import com.luv2code.eschool.Controller.auth.AuthenticationResponse;
import com.luv2code.eschool.Controller.auth.UserRequest;
import com.luv2code.eschool.Entity.Parent;
import com.luv2code.eschool.Entity.Role;
import com.luv2code.eschool.Entity.Student;
import com.luv2code.eschool.Entity.Teacher;
import com.luv2code.eschool.Entity.User;
import com.luv2code.eschool.config.JwtService;
import com.luv2code.eschool.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder ;
	private final JwtService jwtService;
	private final AuthenticationManager authenticationManager;
	private final ParentService  parentService;
	private final StudentService studentService;
	private final TeacherService teacherService;
	
	public boolean checkUsedEmails (String theEmail) {
		
		List<Object> UsersEmails= userRepository.selectEmail();
		for (Object tempEmail : UsersEmails ) {
			if (theEmail.equals(tempEmail)) {
				
				return false ;
			}}
		return true ;
	}
	
	public void save(User theUser) {
		
		userRepository.save(theUser);
		
	}
	
	public User getUserByEmail (String theEmail) {
		
		Optional<User> result= userRepository.findByEmail(theEmail);
		User theUser = new User();
		if(result.isPresent()) {
			theUser=result.get();
		}else {
			throw new RuntimeException("Did not find this user  " + theEmail);
		}
		return theUser;
		}
	
	
	public AuthenticationResponse TeacherRequest(UserRequest request) {
		
		Teacher user = new Teacher() ;
		user.setName(request.getName());
		user.setEmail(request.getEmail());
		user.setPassword(passwordEncoder.encode(request.getPassword()));
		user.setActive(1);
		user.setRole(Role.TEACHER);
		teacherService.save(user);
		
		var jwtToken = jwtService.generateToken(user);
		return AuthenticationResponse.builder()
				.token(jwtToken)
				.build();
	}
	
	
//	public User login(String theEmail,String Password) {
//		
//		Optional<User> result = userRepository.findByEmailAndPassword(theEmail, Password);
//		
//		
//		if(result.isPresent()) {
//			return result.get();
//			
//		}else {
//			return null;
//		}
//	}
	public AuthenticationResponse ParentRequest(UserRequest request) {
		
		Parent user = new Parent() ;
		user.setName(request.getName());
		user.setEmail(request.getEmail());
		user.setPassword(passwordEncoder.encode(request.getPassword()));
		user.setActive(1);
		user.setRole(Role.PARENT);
		parentService.save(user);
		
		var jwtToken = jwtService.generateToken(user);
		return AuthenticationResponse.builder()
				.token(jwtToken)
				.build();
	}

	public AuthenticationResponse StudentRequest(UserRequest request) {
		
		Student user = new Student() ;
		user.setName(request.getName());
		user.setEmail(request.getEmail());
		user.setPassword(passwordEncoder.encode(request.getPassword()));
		user.setActive(1);
		Parent theParent = new Parent();
		int parentId = getUserByEmail(request.getParentEmail()).getId();
		theParent = parentService.getParentById(parentId);
		user.setParent(theParent);
		user.setRole(Role.STUDENT);
		studentService.save(user);
		
		var jwtToken = jwtService.generateToken(user);
		return AuthenticationResponse.builder()
				.token(jwtToken)
				.build();
	}


	public Object authenticate(AuthenticateRequest request) {
		
		authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
				);
		var user = userRepository.findByEmail(request.getEmail()).orElseThrow();

		var jwtToken = jwtService.generateToken(user);
		
		Map<String, Object> UserRole = new HashMap<>();
		UserRole.put("UserRole",user.getRole().name() );
		UserRole.put("token", jwtToken);
		return UserRole;
	}
	
	public void deleteUser(String email) {
		
		User theUser = getUserByEmail(email);
		userRepository.delete(theUser);
		
	}
	
	
}
