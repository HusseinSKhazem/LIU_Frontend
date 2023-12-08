document.addEventListener("DOMContentLoaded", function () {
    document.querySelector('.add-skill').addEventListener('click', addSkill);
    document.querySelector('.add-project').addEventListener('click', addProject);
    document.getElementById('profileForm').addEventListener('submit', submitForm);
});


function addSkill() {
    const skillsContainer = document.getElementById('skillsContainer');
    const newSkillInput = document.querySelector('.skill-input').cloneNode(true);
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

function submitForm(event) {
    event.preventDefault();
    
   
    const skillsInputs = document.querySelectorAll('input[name="skills[]"]');
    const skills = Array.from(skillsInputs).map(input => input.value).filter(skill => skill.trim() !== '');
    const skillsField = document.createElement('input');
    skillsField.type = 'hidden';
    skillsField.name = 'skills';
    skillsField.value = skills.join(', ');
    event.target.appendChild(skillsField);

    
    const projectsInputs = document.querySelectorAll('input[name="projects[]"]');
    const projects = Array.from(projectsInputs).map(input => input.value).filter(project => project.trim() !== '');
    const projectsField = document.createElement('input');
    projectsField.type = 'hidden';
    projectsField.name = 'projects';
    projectsField.value = projects.join(', ');
    event.target.appendChild(projectsField);

    event.target.submit();
}

