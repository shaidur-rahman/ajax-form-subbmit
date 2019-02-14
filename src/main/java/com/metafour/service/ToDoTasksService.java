package com.metafour.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.metafour.model.ToDoTasks;
import com.metafour.repo.ToDoTasksRepository;

@Service
public class ToDoTasksService {

	@Autowired
	ToDoTasksRepository toDoTasksRepository;

	public ToDoTasks saveTask(ToDoTasks toDoTasks) {
		toDoTasksRepository.save(toDoTasks);
		return toDoTasks;
	}

	public List<ToDoTasks> findAllTask() {
		return toDoTasksRepository.findAll();
	}
	public ToDoTasks getTaskById(Long id) {
		return toDoTasksRepository.getOne(id);
	}
	
	public void deleteTask(Long id) {
		toDoTasksRepository.deleteById(id);
	}
}
