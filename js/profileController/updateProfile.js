$("#saveChangesBtn").click(function () {

    var bio = $("#bio").val();
    var link = $("#link").val();

    // Create a FormData object
    var formData = new FormData();
    formData.append("Bio", bio);
    formData.append("Links", link);

    const jwtToken = sessionStorage.getItem('jwtToken');
    var claims = parseJwt(jwtToken);
    var Email = claims["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
    const email = encodeURIComponent(Email);

   
    $.ajax({
        type: "POST",
        url: `https://localhost:44346/api/User/UpdateProfile?Email=${email}`,
        data: formData,
        processData: false, 
        contentType: false,  
        success: function (response) {
            location.reload();
            console.log(response);
        },
        error: function (error) {

            console.log(error);
        }
    });
});