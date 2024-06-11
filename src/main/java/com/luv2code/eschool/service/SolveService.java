package com.luv2code.eschool.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.luv2code.eschool.Entity.solve;
import com.luv2code.eschool.compositekeys.SolveKey;
import com.luv2code.eschool.repository.SolveRepository;

@Service
public class SolveService {

	private SolveRepository solveRepository;
	
	@Autowired
	public SolveService (SolveRepository solveRepository) {
		this.solveRepository = solveRepository;
	}
	public solve getSolveById (SolveKey solveKey) {
		
		Optional<solve> result = solveRepository.findById(solveKey);
		
		if(result.isPresent()) {
			return result.get();
		}else {
			throw new RuntimeException("Did not find this SolveKey key " + solveKey+" :-(");
		}
		
	}
	
	public void save (solve thesolve) {
		
		solveRepository.save(thesolve);
		
	}
	
	
}
