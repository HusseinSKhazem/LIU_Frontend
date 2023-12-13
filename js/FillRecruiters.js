document.addEventListener("DOMContentLoaded", function () {

    fetch("https://localhost:44346/api/Admin/FillRecruiters")
      .then(response => response.json())
      .then(data => {
        // Get the select element
        const recruiterSelect = document.getElementById("recruiterSelect");
  
        // Loop through the data and create options
        data.forEach(recruiter => {
          const option = document.createElement("option");
          option.value = recruiter.recruiterID;
          option.text = recruiter.username;
          recruiterSelect.appendChild(option);
        });
      })
      .catch(error => console.error("Error fetching data:", error));
  });