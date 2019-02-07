package com.metafour.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.metafour.message.Response;
import com.metafour.model.Student;
import com.metafour.service.StudentService;

@RestController
@RequestMapping("/student")
public class MetafourRestController {

	@Autowired
	StudentService studentService;

	@PostMapping(value = "/save")
	public Response postStudent(Student student, Model model) {
		studentService.saveStudent(student);
		model.addAttribute("student", new Student());
		Response response = new Response("Done", student);
		return response;
	}
}
