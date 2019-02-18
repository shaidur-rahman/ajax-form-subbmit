$(document).ready(function() {

	// Calling findTasks() method
	findTasks();

	// Save or update operation
	$('#addTask').click(function() {
		var val1 = $('input[id="title"]').val();
		var val2 = $('textarea[id="description"]').val();
		var val3 = $('input[id="addTask"]').val();
		if (val1.length > 0 && val2.length > 0) {
			addTask();
			if (val3 == "Update") {
				$('#modal').hide();
				$('h3[id="heading"]').text("Add a task");
				$("#addTask").val('Add Task');
			}
		} else {
			alert("Title / Description cannot be empty!!!");
		}

	});

	// When click add task to save new task
	$('#openModal').click(function() {
		$('#modal').show();
		$('#message').text("");
	});

	// Click to close modal page
	$('#closeModal').click(function() {
		$('#modal').hide();
		$('h3[id="heading"]').text("Add a task");
		$("#addTask").val('Add Task');
	});// End of click add task

	// Show Update & Delete icon
	var taskid;
	$('#pending').hover(function() {
		$('div[name="task-item-pending"]').mouseenter(function() {
			taskid = $(this).attr('id');
			$('input[id=' + taskid + ']').show();
			option();
		}).mouseleave(function() {
			$('input[id=' + taskid + ']').hide();

		});
	});

	function option() {
		$('input[id=' + taskid + '][value="Edit"]').click(function() {
			getTask(taskid, "pending", "btnUpdate");
		});
		$('input[id=' + taskid + '][value="Delete"]').click(function() {
			deleteTask(taskid);
		});
	}

	// Initialize HTML content
	var defaults = {
		// CSS selectors and attributes that would be used by the
		// JavaScript
		// functions(Elements Class name)

		taskId : "task-",
		formId : "todo-form",
		todoTask : "todo-task",
		todoHeader : "task-header",
		todoDescription : "task-description",
		dataAttribute : "data",
		deleteDiv : "delete-div"
	}, codes = {
		"pending" : "#pending", // For pending tasks
		"inProgress" : "#inProgress",
		"completed" : "#completed"
	}, container = {
		"1" : "#1",
		"2" : "#2",
		"3" : "#3",
	};

	// $("." + defaults.todoTask).draggable();

	// Fetch data from RestController
	function findTasks() {
		$.ajax({
			type : "GET",
			url : $('#baseUrl').attr('href') + "student/findTasks",
			success : function(obj) {
				$("#pending").empty();
				$("#inProgress").empty();
				$("#completed").empty();
				$.each(obj, function(i, task) {
					// Calling configure card function
					configCard(task);
				});
			},
			error : function(e) {
				console.log('ERROR: ', e);
			}
		});
	}

	// Configure data to HTMl card
	function configCard(tasks) {
		var parent = $(codes[tasks.parent]), wrapper;

		if (!parent) {
			return
	}
		wrapper = $("<div />", {
			"class" : defaults.todoTask,
			"id" : tasks.id,
			"name" : "task-item-" + tasks.parent,
			"data" : tasks.id
		}).appendTo(parent);

		$("<div />", {
			"class" : defaults.todoHeader,
			"text" : tasks.title
		}).appendTo(wrapper);

		$("<div />", {
			"class" : defaults.todoDescription,
			"text" : tasks.description
		}).appendTo(wrapper);

		$("<input />", {
			"value" : "Edit",
			"style" : "display: none",
			"type" : "button",
			"id" : tasks.id,
			"class" : "btn btn-primary"
		}).appendTo(wrapper);

		$("<input />", {
			"value" : "Delete",
			"style" : "display: none",
			"type" : "button",
			"id" : tasks.id,
			"class" : "btn btn-danger"
		}).appendTo(wrapper);

		wrapper.draggable({
			start : function() {
			},
			stop : function() {
			},
			revert : "invalid",
			revertDuration : 200
		});

	}

	// Drop function operation
	$.each(container, function(index, value) {
		var parent;
		if (index == "1") {
			parent = "pending";
		} else if (index == "2") {
			parent = "inProgress";
		} else if (index == "3") {
			parent = "completed";
		}

		$(value).droppable({
			drop : function(event, ui) {
				var element = ui.helper, id = element.attr("id");
				getTask(id, parent, "dragUpdate");
			}
		});
	});

	// add task
	function addTask() {
		$.ajax({
			type : "POST",
			url : $('#baseUrl').attr('href') + "student/saveTask",
			data : $('#addTaskForm').serializeArray(),
			success : function(status) {
				findTasks();
				if (status == "Done") {
					$('#id').val("");
					$('#parent').val("");
					$('#title').val("");
					$('#description').val("");
					$('#message').text("Successfully saved");
				} else {
					console.log("Error from controller");
				}
			},
			error : function(e) {
				console.log("ERROR: ", e);
			}
		});
	}

	// Get Task by ID
	function getTask(taskId, parent, option) {
		$.ajax({
			type : "Get",
			url : $('#baseUrl').attr('href') + "student/getTask/" + taskId,
			success : function(task) {
				if (option == "btnUpdate") {
					$('#modal').show();
					$('#message').text("");
					$('h3[id="heading"]').text("Update Task");
					$("#id").val(task.id);
					$("#parent").val(task.parent);
					$("#title").val(task.title);
					$("#description").val(task.description);
					$("#addTask").val('Update');
				} else if (option == "dragUpdate") {
					$("#id").val(task.id);
					$("#parent").val(parent);
					$("#title").val(task.title);
					$("#description").val(task.description);
					addTask();
				}
			},
			error : function(e) {
				console.log("ERROR: ", e);
			}
		});
	}

	// Deleting Task
	function deleteTask(taskId) {
		$.ajax({
			type : "POST",
			url : $('#baseUrl').attr('href') + "student/daleteTask",
			data : {
				id : taskId
			},
			success : function(status) {
				findTasks();
				if (status == "Done") {
					console.log("Delete ok");
				} else {
					console.log("Error to deleting from controller");
				}
			},
			error : function(e) {
				console.log("ERROR: ", e);
			}
		});
	}
});