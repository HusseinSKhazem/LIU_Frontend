function logout() {
  sessionStorage.removeItem('jwtToken');
  window.location.href = '/index.html'; 
}



