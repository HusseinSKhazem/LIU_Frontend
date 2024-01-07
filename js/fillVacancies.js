document.addEventListener("DOMContentLoaded", function () {

    function fillVacancies(recruiterId) {
      
      var apiUrl = "https://localhost:44346/api/Admin/GetVacancyByRecruiterID?recruiterID=" + recruiterId;
  
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
        
          renderVacanciesTable(data);
        })
        .catch(error => console.error("Error fetching vacancy data:", error));
    }
    var recruiterSelect = document.getElementById("recruiterSelect");
    recruiterSelect.addEventListener("change", function () {
      var selectedRecruiterId = recruiterSelect.value;
      fillVacancies(selectedRecruiterId);
    });
  
  
    var initialSelectedRecruiterId = recruiterSelect.value;
    fillVacancies(initialSelectedRecruiterId);
  });
  
  function renderVacanciesTable(vacancies) {
    var vacanciesTableContainer = document.getElementById("vacanciesTableContainer");

    vacanciesTableContainer.innerHTML = "";

    var table = document.createElement("table");
    table.classList.add("table", "table-bordered", "table-striped", "table-hover", "table-blue"); 

    var thead = document.createElement("thead");
    thead.classList.add("thead-blue"); 
    var headerRow = document.createElement("tr");
    var headers = ["Vacancy", "Status", "Work Location", "Salary", "Working Hours", "Job Offer"];

    headers.forEach(headerText => {
        var th = document.createElement("th");
        th.textContent = headerText;
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    var tbody = document.createElement("tbody");
    vacancies.forEach(vacancy => {
        var row = document.createElement("tr");

        var vacancyIdCell = document.createElement("td");
        var vacancyIdLink = document.createElement("a");
        
 
        vacancyIdLink.textContent = "Details";
        vacancyIdLink.style.fontWeight = "bold";

        vacancyIdLink.href = "../adminVacancy.html?vacancyId=" + vacancy["vacancyId"];
        
        vacancyIdCell.appendChild(vacancyIdLink);
        row.appendChild(vacancyIdCell);

        Object.values(vacancy).slice(1).forEach(value => {
            var td = document.createElement("td");
            td.textContent = value;
            row.appendChild(td);
        });

        tbody.appendChild(row);
    });

    table.appendChild(tbody);

    var tableWrapper = document.createElement("div");
    tableWrapper.classList.add("table-responsive");
    tableWrapper.appendChild(table);
    vacanciesTableContainer.appendChild(tableWrapper);
}

