async function changeEmail() {
  const emailInput = document.getElementById("Email").value;
  const userIDInput = document.getElementById("UserID").value; 
  const bannerElement = document.getElementById("successBanner");

  try {
    const accessToken = localStorage.getItem("jwtToken");
    const response = await fetch(`https://localhost:44346/api/User/ChangeEmail/${userIDInput}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      },
      body: JSON.stringify(emailInput),
    });

    if (response.ok) {
      const user = await response.json();
      console.log("Email updated successfully:", user);

      if (bannerElement) {
        bannerElement.innerText = `Email successfully changed for ${user.username}. New email: ${user.email}`;
        bannerElement.classList.remove("error");
        bannerElement.classList.add("success");
      }
    } else {
      const errorMessage = await response.text();
      console.error("Error updating email:", errorMessage);

      if (bannerElement) {
        bannerElement.innerText = `Error updating email: ${errorMessage}`;
        bannerElement.classList.remove("success");
        bannerElement.classList.add("error");
      }
    }
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    if (bannerElement) {
      bannerElement.innerText = `An unexpected error occurred: ${error.message}`;
      bannerElement.classList.remove("success");
      bannerElement.classList.add("error");
    }
  }
}
