package com.metafour.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.metafour.model.Student;
import com.metafour.service.StudentService;

@Controller
public class MetafourController {

	private String msg;

	@Autowired
	StudentService studentService;

	@RequestMapping("/")
	public String loadHomePage() {
		return "home";
	}

	@RequestMapping("/addStudent")
	public String getAddStudent(Model model) {
		model.addAttribute("student", new Student());
		return "addStudent";
	}

	@RequestMapping(value = "addStudent", method = RequestMethod.POST)
	public String postAddStudent(Model model, Student student) {
		studentService.saveStudent(student);
		model.addAttribute("success", "New Student Created");
		model.addAttribute("student", new Student());
		return "addStudent";
	}

	@RequestMapping("/allStudent")
	public String showAllStudent(Model model) {
		if (msg != null)
			model.addAttribute("Message", "Row " + msg + " Successfull");
		model.addAttribute("students", studentService.findStudents());
		msg = null;
		return "allStudent";
	}

	@RequestMapping("/editStudent")
	public String getUpdateStudent(@RequestParam(name = "id") Long id, Model model) {
		model.addAttribute("student", studentService.findOneStudent(id));
		return "updateStudent";
	}

	@RequestMapping(value = "updateStudent", method = RequestMethod.POST)
	public String postUpdateStudent(Model model, Student student) {
		studentService.updateStudent(student);
		msg = "Updated";
		return "redirect:/allStudent";
	}

	@RequestMapping("/deleteStudent")
	public String deleteStudent(@RequestParam(name = "id") Long id) {
		studentService.deleteStudentById(id);
		msg = "Deleted";
		return "redirect:/allStudent";
	}
}