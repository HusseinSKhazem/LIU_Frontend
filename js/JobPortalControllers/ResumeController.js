document.addEventListener("DOMContentLoaded", function () {
    document.querySelector('.add-skill').addEventListener('click', addSkill);
    document.getElementById('profileForm').addEventListener('submit', submitForm);
});

function addSkill() {
    const skillsContainer = document.getElementById('skillsContainer');
    const newSkillInput = document.querySelector('.skill-input').cloneNode(true);
    newSkillInput.querySelector('input').value = '';
    const addButton = newSkillInput.querySelector('button');
    addButton.textContent = '-'; // Change button text to '-'
    addButton.style.backgroundColor = '#dc3545'; // Change button color to red
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

function submitForm(event) {
    event.preventDefault();
    const skillsInputs = document.querySelectorAll('input[name="skills[]"]');
    const skills = Array.from(skillsInputs).map(input => input.value).filter(skill => skill.trim() !== '');
    const skillsField = document.createElement('input');
    skillsField.type = 'hidden';
    skillsField.name = 'skills';
    skillsField.value = skills.join(', ');
    event.target.appendChild(skillsField);
    event.target.submit();
}