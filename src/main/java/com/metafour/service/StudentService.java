package com.metafour.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.metafour.model.Student;
import com.metafour.repo.StudentRepository;

@Service
public class StudentService {
	@Autowired
	StudentRepository studentRepository;

	public Student saveStudent(Student student) {
		return studentRepository.save(student);
	}

	public Student findOneStudent(Long id) {
		return studentRepository.getOne(id);
	}

	public List<Student> findStudents() {
		return studentRepository.findAll();
	}

	public Student updateStudent(Student student) {
		return saveStudent(student);
	}

	public void deleteStudentById(Long id) {
		studentRepository.deleteById(id);
	}
}
