const jwtToken = localStorage.getItem('jwtToken');
    var claims = parseJwt(jwtToken);
    var Email = claims["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
    const email = encodeURIComponent(Email);

    
$.ajax({
    url: `https://localhost:44346/api/User/GetProfile?Email=${email}`,
    method: 'GET',
    success: function (data) {
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

fetch(`https://localhost:44346/api/Resume/GetResumeByEmail?Email=${email}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('inputUsername').value = data.name;
            document.getElementById('Email').value = data.email;
            document.getElementById('Socials').value = data.socials;
            document.getElementById('inputOrgName').value = data.skills; 
            document.getElementById('inputLocation').value = data.location;
            document.getElementById('Description').value = data.description;
            document.getElementById('inputPhone').value = data.phoneNumber;
            document.getElementById('WorkExperience').value = data.workExperience;
            document.getElementById('educationalBackground').value = data.educationalBackground;
            document.getElementById('projects').value = data.projects;
        });

        function parseJwt(token) {
            try {
              if (!token) {
                console.log("JWT Token is empty or undefined");
                return null;
              }
          
              var base64Url = token.split(".")[1];
              var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
              var jsonPayload = decodeURIComponent(
                atob(base64)
                  .split("")
                  .map(function (c) {
                    return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
                  })
                  .join("")
              );
          
              return JSON.parse(jsonPayload);
            } catch (error) {
              console.error("Error parsing JWT:", error);
              return null;
            }
          }
