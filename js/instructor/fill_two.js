$(document).ready(function () {
    // Fetch data from the API
    $.get("https://localhost:44346/api/landing/most-applied", function (data) {
      // Iterate through each vacancy and create a card
      data.forEach(function (vacancy) {
        var cardHtml = `
          <div class="col-md-3">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title text-truncate">${vacancy.jobOffer}</h5>
                <p class="card-text">
                  <i class="fas fa-money-bill-alt"></i> Salary: $${vacancy.salary}
                </p>
                <p class="card-text">
                  <i class="fas fa-building"></i> Company: ${vacancy.companyName}
                </p>
                <a href="../instructorvacancydetails.html?vacancyId=${vacancy.vacancyId}" class="btn btn-warning btn-sm">View Details</a>
              </div>
            </div>
          </div>
        `;
        $("#vacanciesThird").append(cardHtml);
      });
    });
  });