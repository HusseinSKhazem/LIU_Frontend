
function displayBanner(type, message) {
  const banner = document.getElementById("banner");

  banner.innerHTML = "";

  const alertDiv = document.createElement("div");
  alertDiv.classList.add("alert", `alert-${type}`);
  alertDiv.textContent = message;

  banner.appendChild(alertDiv);

  setTimeout(() => {
    banner.innerHTML = "";
  }, 5000);
}

// Function to delete user
async function deleteUser() {
  const userIDInput = document.getElementById("UserID").value;

  try {
    const accessToken = localStorage.getItem("jwtToken");
    const response = await fetch(`https://localhost:44346/api/User/DeleteUsers/${userIDInput}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      },
    });

    if (response.ok) {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const result = await response.json();
        console.log(result);
        displayBanner("success", "User deleted successfully!");
      } else {
        const successMessage = await response.text();
        console.log(successMessage);
        displayBanner("success", successMessage);
      }
    } else {
      const errorMessage = await response.text();
      console.error("Error deleting user:", errorMessage);
      displayBanner("error", `Error deleting user: ${errorMessage}`);
    }
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    displayBanner("error", `An unexpected error occurred: ${error.message}`);
  }
}
