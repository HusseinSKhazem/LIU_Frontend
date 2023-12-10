
async function applyToVacancy(VacancyId) {
    const jwtToken = localStorage.getItem('jwtToken');
    var claims = parseJwt(jwtToken);
    var Email = claims["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];

    const email = encodeURIComponent(Email);
    console.log(email)
    const vacancyId = VacancyId;

    const url = `https://localhost:44346/api/Application/Apply?Email=${email}&vacancyID=${vacancyId}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        if (response.ok) {
            const result = await response.text();
            showSuccessBanner('Application Submitted Successfully!');
        } else {
            const error = await response.text();
            showAlertBanner("Failed to Submit Application")
        }
    } catch (error) {
        console.error(`An error occurred: ${error.message}`);
    }
}

function showSuccessBanner(message) {
   
    const successBanner = document.createElement('div');
    successBanner.className = 'success-banner';
    successBanner.textContent = message;

 
    document.body.appendChild(successBanner);


    setTimeout(() => {
        document.body.removeChild(successBanner);
    }, 5000); 
}

function showAlertBanner(message) {
   
    const successBanner = document.createElement('div');
    successBanner.className = 'alert-banner';
    successBanner.textContent = message;

 
    document.body.appendChild(successBanner);


    setTimeout(() => {
        document.body.removeChild(successBanner);
    }, 5000); 
}


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


  function centerElementInViewport(element) {
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    const elementHeight = element.clientHeight;
    const elementWidth = element.clientWidth;

    const topPosition = Math.max(0, (windowHeight - elementHeight) / 2);
    const leftPosition = Math.max(0, (windowWidth - elementWidth) / 2);

    element.style.top = `${topPosition}px`;
    element.style.left = `${leftPosition}px`;
}