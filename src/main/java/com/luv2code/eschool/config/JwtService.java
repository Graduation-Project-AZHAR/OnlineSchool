package com.luv2code.eschool.config;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;


@Service
public class JwtService {

	@Value("${application.security.jwt.secret-key}")
	private String secretKey;
	
	@Value("${application.security.jwt.expiration}")
	private Long jwtExpiration;
	
	@Value("${application.security.jwt.refresh-token.expiration}")
	private Long refreshExpiration;
	
	
	private Key getSignInKey () {
		byte[] keyBytes  = Decoders.BASE64.decode(secretKey);
		return Keys.hmacShaKeyFor(keyBytes);
	}
	
	
	private Claims extractAllClaims (String token) {
		
	return Jwts.parserBuilder()
			.setSigningKey(getSignInKey())
			.build()
			.parseClaimsJws(token)
			.getBody();
	}
	
	
	public <T> T extractClaim(String token,Function<Claims,T> claimsResolver) {
		final Claims claims = extractAllClaims(token);
		return claimsResolver.apply(claims);
	}
	
		
	public String extractUsername (String token) {
		
		return extractClaim(token,Claims::getSubject);
	}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
	private String buildToken(Map<String, Object> extraClaim, UserDetails userDetails, Long expiration2) {
		
	return Jwts.builder()
			.setClaims(extraClaim)
			.setSubject(userDetails.getUsername())
			.setIssuedAt(new Date(System.currentTimeMillis()))
			.setExpiration(new Date(System.currentTimeMillis()+expiration2))
			.signWith(getSignInKey(),SignatureAlgorithm.HS256)
			.compact();
	}
	
	public String generateRefreshToken(UserDetails userDetails){
		
		return buildToken(new HashMap<>(),userDetails,refreshExpiration);
	}	
	
	public String generateToken(Map<String, Object> extraClaims,UserDetails userDetails) {
		
		return buildToken(extraClaims,userDetails,jwtExpiration);
	}


	public String generateToken(UserDetails userDetails) {
		
		return generateToken(new HashMap<>(),userDetails);
	}
	
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
	private Date extractExpiration(String token) {
	
	return extractClaim(token, Claims::getExpiration);
	}
	
	private boolean isTokenExpired(String token) {
		
	return extractExpiration(token).before(new Date());
	}


	public boolean isTokenValid(String token,UserDetails userDetails) {
	final String userName = extractUsername(token);	
	return (userName.equals(userDetails.getUsername()) && !isTokenExpired(token));
	}




}
