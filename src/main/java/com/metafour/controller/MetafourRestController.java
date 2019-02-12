package com.metafour.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.metafour.message.Response;
import com.metafour.model.Student;
import com.metafour.model.ToDoTasks;
import com.metafour.service.StudentService;
import com.metafour.service.ToDoTasksService;

@RestController
@RequestMapping("/student")
public class MetafourRestController {

	@Autowired
	StudentService studentService;

	@Autowired
	ToDoTasksService toDoTasksService;

	@PostMapping(value = "/save")
	public Response postStudent(Student student, Model model) {
		studentService.saveStudent(student);
		model.addAttribute("student", new Student());
		return new Response("Done", student);
	}

	@GetMapping(value = "/findStudents")
	public List<Student> findStudents() {
		return studentService.findStudents();
	}

	@PostMapping(value = "/saveTask")
	public Response saveTask(ToDoTasks toDoTasks) {
		toDoTasksService.saveTask(toDoTasks);
		return new Response("Done", toDoTasks);
	}

	@GetMapping(value = "/findTasks")
	public List<ToDoTasks> findTasks() {
		return toDoTasksService.findAllTask();
	}
}
