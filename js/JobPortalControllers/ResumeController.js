document.addEventListener("DOMContentLoaded", function () {
    document.querySelector('.add-skill').addEventListener('click', addSkill);
    document.querySelector('.add-project').addEventListener('click', addProject);
    document.getElementById('profileForm').addEventListener('submit', submitForm);
});


function addSkill() {
    const skillsContainer = document.getElementById('skillsContainer');
    const newSkillInput = document.querySelector('.skill-input').cloneNode(true);
    const newId = 'skills' + skillsContainer.children.length;
    newSkillInput.querySelector('input').id = newId;
    newSkillInput.querySelector('input').value = '';
    const addButton = newSkillInput.querySelector('button');
    addButton.textContent = '-';
    addButton.style.backgroundColor = '#dc3545';
    addButton.addEventListener('click', removeSkill);
    skillsContainer.appendChild(newSkillInput);
}

function removeSkill() {
    const skillsContainer = document.getElementById('skillsContainer');
    const skillInputs = skillsContainer.querySelectorAll('.skill-input');
    if (skillInputs.length > 1) {
        const lastSkillInput = skillInputs[skillInputs.length - 1];
        skillsContainer.removeChild(lastSkillInput);
    }
}

function addProject() {
    const projectsContainer = document.getElementById('projectsContainer');
    const newProjectInput = document.querySelector('.project-input').cloneNode(true);
    newProjectInput.querySelector('input').value = '';
    const addButton = newProjectInput.querySelector('button');
    addButton.textContent = '-'; 
    addButton.style.backgroundColor = '#dc3545'; 
    addButton.addEventListener('click', removeProject);
    projectsContainer.appendChild(newProjectInput);
}

function removeProject() {
    const projectsContainer = document.getElementById('projectsContainer');
    const projectInputs = projectsContainer.querySelectorAll('.project-input');
    if (projectInputs.length > 1) {
        const lastProjectInput = projectInputs[projectInputs.length - 1];
        projectsContainer.removeChild(lastProjectInput);
    }
}

async function submitForm(event) {
    event.preventDefault();

    const jwtToken = localStorage.getItem('jwtToken');
    var claims = parseJwt(jwtToken);
    var email = claims["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];


    const skillsInputs = document.querySelectorAll('input[name="skills[]"]');
    const skills = Array.from(skillsInputs).map(input => input.value).filter(skill => skill.trim() !== '');

    const projectsInputs = document.querySelectorAll('input[name="projects[]"]');
    const projects = Array.from(projectsInputs).map(input => input.value).filter(project => project.trim() !== '');

    const formData = {
        location: document.getElementById('location').value,
        socials: document.getElementById('socials').value,
        projects: projects.join(', '),
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        email: document.getElementById('email').value,
        phoneNumber: document.getElementById('phoneNumber').value,
        educationalBackground: document.getElementById('educationalBackground').value,
        workExperience: document.getElementById('workExperience').value,
        skills: skills.join(', ')
    };

    
    const response = await fetch(`https://localhost:44346/api/Resume/AddResume?Email=${encodeURIComponent(email)}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });


    if (response.ok) {
        showSuccessBanner("The Resume was added successfully")
     
    } else {
        showErrorBanner('Failed to add resume');

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

  function showSuccessBanner(message) {
    $('#successBanner').html('<strong>Success!</strong> ' + message).fadeIn().delay(3000).fadeOut();
  }

  function showErrorBanner(message) {
    $('#errorBanner').html('<strong>Error!</strong> ' + message).fadeIn().delay(3000).fadeOut();
  }
