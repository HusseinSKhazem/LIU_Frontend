function createVacancyRow(vacancy) {
  return `
  <tr>
            <td>${vacancy.jobOffer}</td>
            <td>${vacancy.majorName}</td>
            <td>${vacancy.status}</td>
            <td>${vacancy.workingHours}</td>
            <td>${vacancy.companyName}</td>
            <td>${vacancy.recruiterUsername}</td>
            <td>
                <button class="btn btn-danger" onclick="deleteVacancy(${vacancy.vacancyId})">Delete</button>
            </td>
        </tr>
`;
}

async function displayVacancies() {
  const vacancyListContainer = document.getElementById('vacancyList');

  try {
      const jwtToken = sessionStorage.getItem('jwtToken');
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
              const vacancyRow = createVacancyRow(vacancy);
              vacancyListContainer.innerHTML += vacancyRow;
          });
      } else {
          vacancyListContainer.innerHTML = '<tr><td colspan="9">No vacancies found.</td></tr>';
      }
  } catch (error) {
      console.error('Error fetching data:', error);
  }
}

async function deleteVacancy(vacancyId) {
  try {
    const jwtToken = sessionStorage.getItem('jwtToken');
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
