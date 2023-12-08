window.onload = function () {
    // Reference to the parent container where vacancy cards will be appended
    var vacancyContainer = document.querySelector('.row');

    // Function to create and append a vacancy card
    function createVacancyCard(vacancy) {
      var cardTemplate = `
      <div class="col-md-3 mb-4">
      <div class="card vacancy-card">
        <div class="card-body d-flex flex-column">
          <h5 class="vacancy-title">${vacancy.jobOffer}</h5>
          <p class="vacancy-info"><i class="fas fa-map-marker-alt"></i> ${vacancy.workLocation}</p>
          <p class="vacancy-info"><i class="fas fa-clock"></i> ${vacancy.workingHours} hours</p>
          <div class="mt-auto">
            <button class="btn btn-primary">Apply Now</button>
            <a href="#" class="btn btn-success">Learn More</a>
          </div>
        </div>
      </div>
    </div>
      `;
      var tempDiv = document.createElement('div');
      tempDiv.innerHTML = cardTemplate.trim();
      vacancyContainer.appendChild(tempDiv.firstChild);
    }
    fetch('https://localhost:44346/api/Admin/GetLast4Vacancies')
      .then(response => response.json())
      .then(data => {
        data.forEach(function (vacancy) {
          createVacancyCard(vacancy);
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  };