async function searchRecruiters() {
  const response = await fetch("https://localhost:44346/api/User/GetRecruiterApprove");
  const recruiters = await response.json();

  displayRecruitersTable(recruiters);
}

function displayRecruitersTable(recruiters) {
  const table = document.createElement("table");
  table.className = "table table-striped table-bordered";


  const headers = ["Recruiter ID", "User ID", "Is Approved", "Username", "Actions"];
  const headerRow = document.createElement("tr");
  headers.forEach(headerText => {
    const th = document.createElement("th");
    th.className = "bg-primary text-white"; 
    th.textContent = headerText;
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  // Populate table rows with recruiter data
  recruiters.forEach(recruiter => {
    const tr = document.createElement("tr");
    const tdRecruiterID = document.createElement("td");
    const tdUserID = document.createElement("td");
    const tdIsApproved = document.createElement("td");
    const tdUsername = document.createElement("td");
    const tdActions = document.createElement("td");

    tdRecruiterID.textContent = recruiter.recruiterID;
    tdUserID.textContent = recruiter.userID;
    tdIsApproved.textContent = recruiter.isApproved ? "Yes" : "No";
    tdUsername.textContent = recruiter.username;

    // Create "Approve" button with Bootstrap styles
    const approveButton = document.createElement("button");
    approveButton.className = "btn btn-outline-warning";
    approveButton.textContent = "Approve";
    approveButton.addEventListener("click", () => approveRecruiter(recruiter.recruiterID));

    tdActions.appendChild(approveButton);

    tr.appendChild(tdRecruiterID);
    tr.appendChild(tdUserID);
    tr.appendChild(tdIsApproved);
    tr.appendChild(tdUsername);
    tr.appendChild(tdActions);

    table.appendChild(tr);
  });

  // Display the table
  const tableContainer = document.getElementById("usersTableContainer");
  tableContainer.innerHTML = "";
  tableContainer.appendChild(table);
}

async function approveRecruiter(recruiterID) {
  const response = await fetch(`https://localhost:44346/api/User/ApproveRecruiters/${recruiterID}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("jwtToken"),
    },
  });

  if (response.ok) {
    searchRecruiters();
  } else {
    console.error("Failed to approve recruiter");
  }
}