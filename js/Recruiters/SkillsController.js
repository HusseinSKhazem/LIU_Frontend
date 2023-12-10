function fetchStudents() {
    var skills = document.getElementById('skillsInput').value;

    // Make AJAX request to the API
    $.ajax({
        url: 'https://localhost:44346/api/StudentFilter/GetStudentBySkills?skills=' + skills,
        method: 'GET',
        success: function (data) {
            displayStudents(data);
        },
        error: function (error) {
            showBanner('No Students with such skills', false);
        }
    });
}

function displayStudents(students) {
    var tableBody = $('#studentsTable tbody');
    tableBody.empty(); // Clear existing table rows

    students.forEach(function (student) {
        var row = $('<tr>');
        row.append('<td>' + student.email + '</td>');
        row.append('<td>' + student.username + '</td>');
        row.append('<td>' + student.skills + '</td>');
        
        var cvLink = $('<a>', {
            href: './Screens/studentResume.html?email=' + encodeURIComponent(student.email),
            text: 'View CV',
            target: '_blank'
        });
        var cvCell = $('<td>').append(cvLink);
        row.append(cvCell);

        tableBody.append(row);
    });
}


function showBanner(message, isSuccess) {
    const bannerType = isSuccess ? 'success' : 'danger';

    const banner = `
      <div class="container mt-3 mr-5">
        <div class="alert alert-${bannerType} alert-dismissible fade show" role="alert">
          ${message}
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('afterbegin', banner);
  }

