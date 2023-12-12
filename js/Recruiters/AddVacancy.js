async function postVacancy(event) {
  try {
    event.preventDefault();

    var jwtToken = localStorage.getItem("jwtToken");
    console.log(jwtToken);
    var claims = parseJwt(jwtToken);
    if (claims && claims["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"]) {
      var formData = {
        recruiterEmail: claims["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
        status: document.getElementById('status').value,
        description: document.getElementById('description').value,
        requirements: document.getElementById('requirements').value,
        workingHours: parseInt(document.getElementById('workingHours').value),
        jobOffer: document.getElementById('jobOffer').value,
        majorID: $("#majorFilter").val(),
        workLocation: document.getElementById('workLocation').value,
        salary: parseInt(document.getElementById('salary').value),
        experience: document.getElementById('experience').value,
        Responsibility: document.getElementById('Responsibility').value,
      };

      const response = await fetch('https://localhost:44346/api/Recruiter/PostVacancy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.text();
      console.log("Response Data:", responseData);

      if (response.status >= 200 && response.status < 300) {
        showSuccessBanner('Vacancy Posted Successfully!');
      } else {
        console.log("Error:", response.status, response.statusText);
        showErrorBanner("Error posting vacancy");
      }
    } else {
      console.log("JWT Token is missing or invalid");
    }
  } catch (error) {
    console.error("An error occurred during postVacancy:", error);
  }
}


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


function showSuccessBanner(message) {
  $('#successBanner').html('<strong>Success!</strong> ' + message).fadeIn().delay(3000).fadeOut();
}

function showErrorBanner(message) {
  $('#errorBanner').html('<strong>Error!</strong> ' + message).fadeIn().delay(3000).fadeOut();
}