$(document).ready(function() {

	// Calling findTasks() method
	findTasks();

	$('#addTask').click(function() {
		addTask();

	});

	// Initialize HTML content
	var defaults = {
		// CSS selectors and attributes that would be used by the JavaScript
		// functions(Elements Class name)

		taskId : "task-",
		formId : "todo-form",
		todoTask : "todo-task",
		todoHeader : "task-header",
		todoDate : "task-date",
		todoDescription : "task-description",
		dataAttribute : "data",
		deleteDiv : "delete-div"
	}, codes = {
		"1" : "#pending", // For pending tasks
		"2" : "#inProgress",
		"3" : "#completed"
	};

	// Fetch data from RestController
	function findTasks() {
		$.ajax({
			type : "GET",
			url : $('#baseUrl').attr('href') + "student/findTasks",
			success : function(obj) {
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
		var parent = $(codes[1]), wrapper;

		if (!parent) {
			return

		}

		wrapper = $("<div />", {
			"class" : defaults.todoTask,
			"id" : tasks.id,
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

		$("<div />", {
			"class" : defaults.todoDate,
			"text" : tasks.date
		}).appendTo(wrapper);

		$("<img />", {
			//"class" : "btn btn-danger btn-circle btn-sm",
			"src":"templates/delete.png"
		}).appendTo(wrapper);
	}

	// Get data from todo-form
	function addTask() {
		$.ajax({
			type : "POST",
			url : $('#baseUrl').attr('href') + "student/saveTask",
			data : $('#addTaskForm').serializeArray(),
			success : function(status) {
				findTasks();
				console.log(status);
				// Reset Form
				inputs[0].value = "";
				inputs[1].value = "";
				inputs[2].value = "";
				if (status == "Done") {
					console.log("Save ok");
				} else {
					console.log("Error from controller");
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
			url : $('#baseUrl').attr('href') + "student/deleteTask",
			data : taskId,
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