package com.metafour.repo;

import javax.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.metafour.model.ToDoTasks;

@Repository
@Transactional
public interface ToDoTasksRepository extends JpaRepository<ToDoTasks, Long> {
}
