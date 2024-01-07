$(document).ready(function () {
    const jwtToken = sessionStorage.getItem('jwtToken');
    var claims = parseJwt(jwtToken);
    var Email = claims["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
    const email = encodeURIComponent(Email);
    $.get(`https://localhost:44346/api/landing/GetLast4byMajor?Email=${email}`, function (data) {
      // Iterate through each vacancy and create a card
      data.forEach(function (vacancy) {
        var cardHtml = `
          <div class="col-md-3">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title text-truncate">${vacancy.jobOffer}</h5>
                <p class="card-text">
                  <i class="fas fa-money-bill-alt"></i>aSalary: $${vacancy.salary}
                </p>
                <p class="card-text">
                  <i class="fas fa-building"></i> Company: ${vacancy.companyName}
                </p>
                <a href="../vacancyDetails.html?vacancyId=${vacancy.vacancyId}" class="btn btn-warning btn-sm">View Details</a>
              </div>
            </div>
          </div>
        `;
        $("#vacanciesSecond").append(cardHtml);
      });
    });
  });


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
