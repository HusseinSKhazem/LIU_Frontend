function addStudent() {
  console.log("Starting addStudent function");
  var selectedMajorID = $("#majorFilter").val();
  var email = document.getElementById("studentEmail").value;
  var password = document.getElementById("studentPassword").value;
  var username = document.getElementById("studentUsername").value;
  var majorID = selectedMajorID;

  var data = {
    email: email,
    password: password,
    username: username,
    majorID: parseInt(majorID, 10),
  };
  var accessToken = localStorage.getItem("jwtToken");
  console.log("Access Token:", accessToken);

  fetch("https://localhost:44346/api/Admin/AddStudent", {
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
        showSuccessBanner("Student added successfully!");
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
      showErrorBanner("An error occurred while adding the student.");
    });
}
