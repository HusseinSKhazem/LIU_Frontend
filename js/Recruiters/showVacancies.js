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
          <p class="card-text"><strong>Company Name:</strong> ${vacancy.companyName}</p>
          <p class="card-text"><strong>Recruiter:</strong> ${vacancy.recruiterUsername}</p>
          <div class="description-container">
            <p class="card-text description">${vacancy.description}</p>
          </div>
          
          <div class="button-container">
            <button class="btn btn-danger delete-button" onclick="deleteVacancy(${vacancy.vacancyId})">Delete</button>
          </div>
        </div>
      </div>
    </div>
  `;
}


async function displayVacancies() {
  const vacancyListContainer = document.getElementById('vacancyList');

  try {
     
       
      const jwtToken = localStorage.getItem('jwtToken');
      var claims = parseJwt(jwtToken);
      var email = claims["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];

      const response = await fetch(`https://localhost:44346/api/Recruiter/VacancyList/${email}`, {
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
          'Content-Type': 'application/json', 
        },
      });
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

async function deleteVacancy(vacancyId) {
  try {
    const jwtToken = localStorage.getItem('jwtToken');
    console.log(vacancyId)

    const response = await fetch(`https://localhost:44346/api/Recruiter/DeleteVacancy/${vacancyId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      showMessageBanner('Vacancy deleted successfully.', 'success');
      location.reload();
    } else {
      showMessageBanner(`Error deleting vacancy: ${response.status} - ${response.statusText}`, 'error');
    }
  } catch (error) {
    console.error(`Error deleting vacancy with ID ${vacancyId}:`, error);
  }
}


window.onload = displayVacancies;


function parseJwt(token) {
  try {
    if (!token) {
      console.log("JWT Token is empty or undefined");
      return null;
    }

    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error parsing JWT:", error);
    return null;
  }
}


function showMessageBanner(message, type) {
  const messageBanner = document.getElementById('messageBanner');
  messageBanner.textContent = message;
  messageBanner.className = `alert ${type}`;
  setTimeout(() => {
    messageBanner.textContent = '';
  }, 5000);
}
