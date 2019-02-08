$(document).ready(
		function() {
			//dataTable();
			constractCategoryTable();
			// SUBMIT FORM
			$("#save").click(function(event) {
				// Prevent the form from submitting via the browser.
				console.log('form submit');
				event.preventDefault();
				ajaxPost();
			});

			function ajaxPost() {
				console.log("Hello");

				/*
				 * // PREPARE FORM DATA var formData = { firstname :
				 * $("#firstName").val(), lastname : $("#lastName").val } // DO
				 * POST
				 */$.ajax({
					type : "POST",
					url : $('#baseUrl').attr('href') + "student/save",
					data : $("#submitForm").serializeArray(),
					success : function(result) {
						console.log(result.data);
						if (result.status == "Done") {
							$("#postResultDiv").html("New Student Created");
						} else {
							$("#postResultDiv").html("<strong></strong>");
						}
						console.log(result);
					},
					error : function(e) {
						alert("Save Error!")
						console.log("ERROR: ", e);
					}
				});

				// Reset FormData after Posting
				resetData();

			}

			// Fetch data from database and load to bootstrap table
			function dataTable(e) {
				$.ajax({
					type : "GET",
					url : $('#baseUrl').attr('href') + "student/findStudents",
					success : function(result) {
						$.each(result.data, function(i, student) {

							var studentRow = '<tr>' + '<td>' + student.id
									+ '</td>' + '<td>' + student.firstName
									+ '</td>' + '<td>' + student.lastName
									+ '</td>' + '<td>' + student.gender
									+ '</td>' + '<td>' + student.hobby
									+ '</td>' + '<td>' + student.country
									+ '</td>' + '<td>' + student.dateOfBirth
									+ '</td>' + '</tr>';

							$('#dataTable tbody').append(studentRow);

						});

						$("#dataTable tbody tr:odd").addClass("info");
						$("#dataTable tbody tr:even").addClass("success");
					},
					error : function(e) {
//						alert("ERROR: ", e);
//						console.log("ERROR: ", e);
					}
				});

			}
			
			
			
			
			
			
			

			function constractCategoryTable(categories){
			var catagoryTable = $('#dataTable').DataTable();
			catagoryTable.clear().draw();
			$.each(categories, function(i, category){
			catagoryTable.row.add([
			"",
			++i,
			category.firstName,
			category.lastName,
			category.gender,
			category.hobby,
			category.country,
			getActionButtons(category)
			]).draw();
			});
			}
			
			
			
			
			
			
			
			
			
			
			
			
			
			

			function resetData() {
				console.log('sahid');
				$("#firstName").val("");
				$("#lastName").val("");
				$('input[name=Choose]').attr('checked', false);
				$('input[type=checkbox]').prop('checked', false);
				$("#roll").val("");
				$('#country').get(0).selectedIndex = 0;
				$("#dateOfBirth").val("");

			}
		})