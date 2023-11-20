function addAdmin() {
  console.log("Starting addAdmin function");

  var email = document.getElementById("adminEmail").value;
  var password = document.getElementById("adminPassword").value;
  var username = document.getElementById("adminUsername").value;

  var data = {
    email: email,
    password: password,
    username: username,
  };

  // Retrieve the access token from localStorage
  var accessToken = localStorage.getItem("jwtToken");
  console.log("Access Token:", accessToken);

  fetch("https://localhost:44346/api/Admin/AddAdmin", {
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
        showSuccessBanner("Admin added successfully!");
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
      showErrorBanner("An error occurred while adding the admin.");
    });
}
