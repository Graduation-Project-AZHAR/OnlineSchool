package com.luv2code.eschool.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.luv2code.eschool.Entity.User;
import com.luv2code.eschool.repository.UserRepository;

@Service
public class UserService {

	private UserRepository userRepository;
	
	@Autowired
    public UserService (UserRepository userRepository) {
    	
    	this.userRepository=userRepository;
    	
    }
	
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
	
	
	
	
	
	public User login(String theEmail,String Password) {
		
		Optional<User> result = userRepository.findByEmailAndPassword(theEmail, Password);
		
		
		if(result.isPresent()) {
			return result.get();
			
		}else {
			return null;
		}
	}
	
	
}
