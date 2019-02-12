$(document).ready(
		function() {
			console.log('its ok' + $('#baseUrl').attr('href')
					+ "student/findStudents")
			$.ajax({
				type : "GET",
				url : $('#baseUrl').attr('href') + "student/findStudents",
				success : function(obj) {
					var studentTable = $('#dataTable').DataTable();
					studentTable.clear().draw();

					$.each(obj, function(i, student) {
						console.log(student)
						studentTable.row.add(
								[ ++i, student.firstName, student.lastName,
										student.gender, student.hobby,
										student.country, student.roll,
										student.dateOfBirth,""]).draw();
					});
				},
				error : function(e) {
					console.log('ERROR: ', e);
				}
			});

		});