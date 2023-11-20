function showErrorBanner(message) {
  var alertDiv = document.createElement("div");
  alertDiv.className = "alert alert-danger";
  alertDiv.innerHTML = message;

  document.body.insertBefore(alertDiv, document.body.firstChild);
  setTimeout(function () {
    alertDiv.remove();
  }, 3000);
}

function showSuccessBanner(message) {
  // Create a success alert
  var alertDiv = document.createElement("div");
  alertDiv.className = "alert alert-success";
  alertDiv.innerHTML = message;

  // Append the alert to the top of the body
  document.body.insertBefore(alertDiv, document.body.firstChild);

  // Remove the alert after 3 seconds (adjust the timeout as needed)
  setTimeout(function () {
    alertDiv.remove();
  }, 3000);
}

function addInstructor() {
  console.log("Starting addInstructor function");

  var email = document.getElementById("inputEmail4").value;
  var password = document.getElementById("inputPassword4").value;
  var username = document.getElementById("inputUsername").value;

  var data = {
    email: email,
    password: password,
    username: username,
  };

  // Retrieve the access token from localStorage
  var accessToken = localStorage.getItem("jwtToken");
  console.log("Access Token:", accessToken);

  fetch("https://localhost:44346/api/Admin/AddInstructor", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      console.log("Response received from server:", response);
      if (response.ok) {
        showSuccessBanner("Instructor added successfully!");
      } else if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Data received from server:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
      showErrorBanner("An error occurred while adding the instructor.");
    });
}
