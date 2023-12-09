$("#saveChangesBtn").click(function () {
    // Get values from input fields
    var bio = $("#bio").val();
    var link = $("#link").val();

    // Create a FormData object
    var formData = new FormData();
    formData.append("Bio", bio);
    formData.append("Links", link);

    const jwtToken = localStorage.getItem('jwtToken');
    var claims = parseJwt(jwtToken);
    var Email = claims["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
    const email = encodeURIComponent(Email);

   
    $.ajax({
        type: "POST",
        url: `https://localhost:44346/api/User/UpdateProfile?Email=${email}`,
        data: formData,
        processData: false,  // Don't process the data (already in form data)
        contentType: false,  // Don't set content type (let the server handle it)
        success: function (response) {
            location.reload();
            console.log(response);
        },
        error: function (error) {
            // Handle error
            console.log(error);
        }
    });
});