window.onload = function () {
    fetchResumeStatus();
};

function fetchResumeStatus() {
    try {
        const jwtToken = localStorage.getItem('jwtToken');
        var claims = parseJwt(jwtToken);
        var Email = claims["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
    
        const email = encodeURIComponent(Email);
       

        if (!email) {
            console.error("Email not found in the JWT token");
            return;
        }

        const apiUrl = `https://localhost:44346/api/Resume/CheckResume?Email=${email}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data === 0) {
                    window.location.href = '../../Screens/Resume.html';
                } else if (data === 1) {
                   console.log("Resume exists")
                } else {
                    console.log('Unexpected response:', data);
                }
            })
            .catch(error => {
                console.error('Error fetching API:', error);
            });
    } catch (error) {
        console.error('Error:', error);
    }
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