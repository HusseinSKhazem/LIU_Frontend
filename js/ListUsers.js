let currentPage = 1;
const pageSize = 10;

async function searchUsers() {
  const userRole = document.getElementById("UserRole").value;

  const response = await fetch(`https://localhost:44346/api/User/GetUsersByRole/${userRole}`);
  const allUsers = await response.json();
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const usersForCurrentPage = allUsers.slice(startIndex, endIndex);
  var token = sessionStorage.getItem("jwtToken")
console.log(token);

  displayUsersTable(usersForCurrentPage);
  displayPaginationControls(allUsers.length);
}

function displayUsersTable(users) {
  const table = document.createElement("table");
  table.className = "table table-striped table-bordered";

  // Create table headers with Bootstrap styles
  const headers = ["User ID", "Email", "Username"];
  const headerRow = document.createElement("tr");
  headers.forEach(headerText => {
    const th = document.createElement("th");
    th.className = "bg-primary text-white"; 
    th.textContent = headerText;
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);


  users.forEach(user => {
    const tr = document.createElement("tr");
    const tdUserId = document.createElement("td");
    const tdEmail = document.createElement("td");
    const tdUsername = document.createElement("td");

    tdUserId.textContent = user.userId;
    tdEmail.textContent = user.email;
    tdUsername.textContent = user.username;

    tr.appendChild(tdUserId);
    tr.appendChild(tdEmail);
    tr.appendChild(tdUsername);

    table.appendChild(tr);
  });

  
  const tableContainer = document.getElementById("usersTableContainer");
  tableContainer.innerHTML = "";
  tableContainer.appendChild(table);
}

function displayPaginationControls(totalUsers) {
  const totalPages = Math.ceil(totalUsers / pageSize);

  const paginationControls = document.getElementById("paginationControls");
  paginationControls.innerHTML = "";

  const ul = document.createElement("ul");
  ul.className = "pagination";

  const previousButton = document.createElement("li");
  previousButton.innerHTML = "<a href='#'>&laquo;</a>";
  previousButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      searchUsers();
    }
  });
  ul.appendChild(previousButton);

  
  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement("li");
    const pageButton = document.createElement("a");
    pageButton.href = "#";
    pageButton.textContent = i;

    
    if (i === currentPage) {
      li.className = "active";
    }

    pageButton.addEventListener("click", () => {
      currentPage = i;
      searchUsers();
    });

    li.appendChild(pageButton);
    
   
    if (i < totalPages) {
      const space = document.createTextNode(" ");
      li.appendChild(space);
    }

    ul.appendChild(li);
  }

  
  const nextButton = document.createElement("li");
  nextButton.innerHTML = "<a href='#'>&raquo;</a>";
  nextButton.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      searchUsers();
    }
  });
  ul.appendChild(nextButton);

  paginationControls.appendChild(ul);
}

