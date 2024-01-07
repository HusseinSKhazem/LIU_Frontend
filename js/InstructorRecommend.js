function addRecommendation() {
  const jwtToken = sessionStorage.getItem('jwtToken');
  var claims = parseJwt(jwtToken);
  var instructorEmail = claims["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
  const studentEmail = document.getElementById('studentEmail').value;
  const description = document.getElementById('description').value;

  const requestBody = {
    instructorEmail: instructorEmail,
    studentEmail: studentEmail,
    description: description
  };

  fetch('https://localhost:44346/api/Instructor/AddRecommendation', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
  })
  .then(response => {
      if (!response.ok) {
          throw new Error(`Student Not Found`);
      }
      return response.text();
  })
  .then(data => {
      const resultContainer = document.getElementById('result-container');
      resultContainer.innerHTML = `<p>${data}</p>`;
      resultContainer.classList.remove('alert-danger'); // Remove red background
      resultContainer.classList.add('alert-success'); // Add green background
  })
  .catch(error => {
      const resultContainer = document.getElementById('result-container');
      resultContainer.innerHTML = `<p>Error: ${error.message}</p>`;
      resultContainer.classList.remove('alert-success'); // Remove green background
      resultContainer.classList.add('alert-danger'); // Add red background
  });
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