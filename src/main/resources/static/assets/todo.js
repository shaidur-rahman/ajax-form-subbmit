$(document).ready(function() {

	// Calling findTasks() method
	findTasks();

	// Show Update & Delete icon
	var taskid;
	$('#pending').hover(function() {
		$('div[class="todo-task ui-draggable"]').mouseenter(function() {
			taskid = $(this).attr('id');
			$('input[id=' + taskid + ']').show();
			option();
		}).mouseleave(function() {
			$('input[id=' + taskid + ']').hide();

		});
	});

	function option() {
		$('input[id=' + taskid + '][value="Update"]').click(function() {
			getTask(taskid);
		});
		$('input[id=' + taskid + '][value="Delete"]').click(function() {
			deleteTask(taskid);
		});
	}

	$('#addTask').click(function() {
		var val1=$('#title').val();
		var val2=$('#description').val();
		if(val1>0 && val2>0){
		addTask();
		}else {
			alert("Title / Description cannot be empty!!!");
		}

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
		"pending" : "#pending", // For pending tasks
		"inProgress" : "#inProgress",
		"completed" : "#completed"
	};

	//$("." + defaults.todoTask).draggable();

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

		$("<input />", {
			"value" : "Update",
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
            start: function() {
                $("#" + defaults.deleteDiv).show();
            },
            stop: function() {
                $("#" + defaults.deleteDiv).hide();
            },
	        revert: "invalid",
	        revertDuration : 200
        });

	}

	// add task
	function addTask() {
		$.ajax({
			type : "POST",
			url : $('#baseUrl').attr('href') + "student/saveTask",
			data : $('#addTaskForm').serializeArray(),
			success : function(status) {
				findTasks();
				console.log(status);
				if (status == "Done") {
					$('#title').val("");
					$('#description').val("");
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

	// find Task
	function getTask(taskId) {
		$.ajax({
			type : "Get",
			url : $('#baseUrl').attr('href') + "student/getTask/" + taskId,
			// data : {id : taskId},
			success : function(task) {
				console.log(task);
				// if (task.id.length>0) {
				$("#id").val(task.id);
				$("#parent").val(task.parent);
				$("#title").val(task.title);
				$("#description").val(task.description);
				
				// } else {
				// console.log("Error to getting task from controller");
				// }
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