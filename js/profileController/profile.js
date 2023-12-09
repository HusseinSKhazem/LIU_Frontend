$.ajax({
    url: 'https://localhost:44346/api/User/GetProfile?Email=12110243%40students.liu.edu.lb',
    method: 'GET',
    success: function (data) {
        // Update the DOM with the retrieved data
        $('#profilePicture').attr('src', 'https://localhost:44346/api/User/GetProfilePicture/' + data.id);
        $('#Username').text(data.username);
        $('#ProfileEmail').text(data.email);
        $('#bio').val(data.bio);
        $('#link').val(data.links);
    },
    error: function () {
        console.error('Failed to retrieve profile data');
    }
});

fetch('https://localhost:44346/api/Resume/GetResumeByEmail?Email=12110243%40students.liu.edu.lb')
        .then(response => response.json())
        .then(data => {
            // Update input fields with API data
            document.getElementById('inputUsername').value = data.name;
            document.getElementById('Email').value = data.email;
            document.getElementById('Socials').value = data.socials;
            document.getElementById('inputOrgName').value = data.skills; // You can update this field with a relevant property from the API response
            document.getElementById('inputLocation').value = data.location;
            document.getElementById('Description').value = data.description;
            document.getElementById('inputPhone').value = data.phoneNumber;
            document.getElementById('WorkExperience').value = data.workExperience;
            document.getElementById('educationalBackground').value = data.educationalBackground;
            document.getElementById('projects').value = data.projects;
        });