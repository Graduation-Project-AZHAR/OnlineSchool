package com.luv2code.eschool.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import lombok.RequiredArgsConstructor;


@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {
	
	private final JwtAuthenticationFilter jwtAuthFilter;
	private final AuthenticationProvider authenticationProvider;
	
	private static final String[] WHITE_LIST_URL = {
			"/home",
			"/user/api/**",
			"/v3/api-docs/**",
            "/swagger-resources",
            "/swagger-resources/**",
            "/swagger-ui/**",
            "/swagger-ui.html"
            };
	
	private static final String[] TEACHER_URL = {
			"/exercise/AddLessonExercise/{subjectId}/{uniteNumber}/{lessonNumber}",
			"/AddUniteExercise/{subjectId}/{uniteNumber}",
			"/lesson/AddNewLesson/{subjectId}/{uniteNumber}",
			"/lesson/UpdateLesson/{subjectId}/{uniteNumber}/{lessonNumber}",
			"/subject/AddFinalQuestionAnswer/{subjectId}",
			"/unite/addUnite/{Subject_id}"
			};
	
	private static final String[] STUDENT_URL = {
			"/FinalTest/addGrade/{subject_id}/{student_id}",
			"/solve/addGrade/{exerciseNumber}/{student_id}"
			};
	
	private static final String[] ADMIN_URL = {
			"/user/addTeacher",
			"/user/deleteUserByEmail",
			"/subject/addSubject"
			};
	
	private static final String[] TEACHER_ADMIN_URL = {
			"/student/students",
			"/subject/updateSubject/{subjectId}"
			};
	
	private static final String[] TEACHER_STUDENT_URL = {
			"/exercise/getOneExercise/{exercise_id}"
			};
	
	@Bean
	public SecurityFilterChain securityFilterChain (HttpSecurity http) throws Exception {
		http
		.csrf()
        .disable()
        .authorizeHttpRequests()
        .requestMatchers(WHITE_LIST_URL).permitAll()
        .requestMatchers(ADMIN_URL).hasRole("ADMIN")
        .requestMatchers(TEACHER_URL).hasRole("TEACHER")
        .requestMatchers(STUDENT_URL).hasRole("STUDENT")
        .requestMatchers(TEACHER_ADMIN_URL).hasAnyRole("TEACHER","ADMIN")
        .requestMatchers(TEACHER_STUDENT_URL).hasAnyRole("TEACHER","STUDENT")
        .anyRequest().authenticated()
        .and()
        .sessionManagement()
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and()
        .authenticationProvider(authenticationProvider)
        .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
		
		return http.build();
	}

}
