package com.luv2code.eschool.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.luv2code.eschool.Entity.FinalTest;
import com.luv2code.eschool.compositekeys.FinalTestKey;
import com.luv2code.eschool.repository.FinalTestRepository;

@Service
public class FinalTestService {

	private FinalTestRepository finalTestRepository;
	
	@Autowired
	public FinalTestService(FinalTestRepository finalTestRepository) {
		this.finalTestRepository =finalTestRepository;
	}
	
	public FinalTest getFinalTestById (FinalTestKey finalTestKey) {
		
		Optional<FinalTest> result = finalTestRepository.findById(finalTestKey);
		
		if(result.isPresent()) {
			return result.get();
		}else {
			throw new RuntimeException("Did not find this finalTestKey key " + finalTestKey+" :-(");
		}
		
	}
	
	public void save (FinalTest finalTest) {
		
		finalTestRepository.save(finalTest);
		
	}
	
	
	
	
	
}
