function createVacancyCard(vacancy) {
  return `
    <div class="col-lg-6 col-md-8 mb-4">
      <div class="card vacancy-card">
        <div class="card-body">
          <h5 class="card-title job-offer">${vacancy.jobOffer}</h5>
          <p class="card-text"><strong>Major:</strong> ${vacancy.majorName}</p>
          <p class="card-text"><strong>Status:</strong> ${vacancy.status}</p>
          <p class="card-text"><strong>Requirements:</strong> ${vacancy.requirements}</p>
          <p class="card-text"><strong>Working Hours:</strong> ${vacancy.workingHours}</p>
          <p class="card-text"><strong>Recruiter:</strong> ${vacancy.recruiterUsername}</p>
          <div class="description-container">
            <p class="card-text description">${vacancy.description}</p>
          </div>
          
          <div class="button-container">
            <button class="btn btn-info update-button">Update</button>
            <button class="btn btn-danger delete-button">Delete</button>
          
          </div>
        </div>
      </div>
    </div>
  `;
}


async function displayVacancies() {
  const vacancyListContainer = document.getElementById('vacancyList');

  try {
     
      const email = 'hipstore82@gmail.com';  

     
      const response = await fetch(`https://localhost:44346/api/Recruiter/VacancyList/${email}`);
      const vacanciesData = await response.json();

     
      if (vacanciesData.length > 0) {
    
          vacanciesData.forEach(vacancy => {
              const vacancyCard = createVacancyCard(vacancy);
              vacancyListContainer.innerHTML += vacancyCard;
          });
      } else {
          vacancyListContainer.innerHTML = '<p>No vacancies found.</p>';
      }
  } catch (error) {
      console.error('Error fetching data:', error);
  }
}

window.onload = displayVacancies;
