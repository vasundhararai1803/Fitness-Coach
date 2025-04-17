function generateWorkoutPlan() {
    // Show loader while "generating" the plan
    document.getElementById('loader').style.display = 'block';
    document.getElementById('workoutPlanDisplay').classList.add('hidden');

    // Collect form data
    const formData = {
        name: document.getElementById('userName').value,
        age: document.getElementById('userAge').value,
        height: document.getElementById('userHeight').value,
        weight: document.getElementById('userWeight').value,
        fitnessLevel: document.getElementById('fitnessLevel').value,
        workoutGoal: document.getElementById('workoutGoal').value,
        weeklyWorkouts: document.getElementById('weeklyWorkouts').value,
        workoutDuration: document.getElementById('workoutDuration').value,
        targetMuscles: Array.from(document.querySelectorAll('.checkbox-group input[type="checkbox"]:checked'))
            .filter(cb => cb.parentElement.parentElement.previousElementSibling.textContent === 'Target Muscle Groups:')
            .map(cb => cb.value),
        equipment: Array.from(document.querySelectorAll('.checkbox-group input[type="checkbox"]:checked'))
            .filter(cb => cb.parentElement.parentElement.previousElementSibling.textContent === 'Available Equipment:')
            .map(cb => cb.value),
        preferences: Array.from(document.querySelectorAll('.checkbox-group input[type="checkbox"]:checked'))
            .filter(cb => cb.parentElement.parentElement.previousElementSibling.textContent === 'Workout Preferences:')
            .map(cb => cb.value)
    };

    // Validate form data
    if (!validateFormData(formData)) {
        alert('Please fill in all required fields');
        document.getElementById('loader').style.display = 'none';
        return;
    }

    // Simulate API call delay
    setTimeout(() => {
        const workoutPlan = generatePlan(formData);
        displayWorkoutPlan(workoutPlan);
        
        document.getElementById('loader').style.display = 'none';
        document.getElementById('workoutPlanDisplay').classList.remove('hidden');
        
        // Smooth scroll to results
        scrollToResults();
    }, 1500);
}

function validateFormData(formData) {
    const fields = [
        'userName', 'userAge', 'userHeight', 'userWeight',
        'fitnessLevel', 'workoutGoal', 'weeklyWorkouts', 'workoutDuration'
    ];
    
    let isValid = true;
    
    // Check required fields
    fields.forEach(field => {
        const element = document.getElementById(field);
        if (!formData[field.replace('user', '').toLowerCase()]) {
            element.style.borderColor = 'red';
            isValid = false;
        } else {
            element.style.borderColor = '#ccc';
        }
    });
    
    // Check checkboxes
    if (formData.targetMuscles.length === 0) {
        alert('Please select at least one target muscle group');
        isValid = false;
    }
    
    if (formData.equipment.length === 0) {
        alert('Please select at least one piece of equipment');
        isValid = false;
    }
    
    return isValid;
}

function generatePlan(formData) {
    // This is a placeholder function that would normally generate a workout plan
    // based on the user's input. For now, it returns a simple example plan
    return {
        weeklySchedule: Array.from({ length: parseInt(formData.weeklyWorkouts) }, (_, i) => ({
            day: i + 1,
            exercises: [
                { name: "Warm-up", duration: "10 minutes" },
                { name: "Main workout", duration: `${parseInt(formData.workoutDuration) - 15} minutes` },
                { name: "Cool-down", duration: "5 minutes" }
            ]
        }))
    };
}

function displayWorkoutPlan(plan) {
    const container = document.getElementById('weeklyWorkoutPlan');
    
    // Clear previous content
    container.innerHTML = '';
    
    // Add each day with a slight delay for animation
    plan.weeklySchedule.forEach((day, index) => {
        setTimeout(() => {
            const dayElement = document.createElement('div');
            dayElement.className = 'workout-day';
            dayElement.style.opacity = '0';
            dayElement.style.transform = 'translateY(20px)';
            
            dayElement.innerHTML = `
                <h3>Day ${day.day}</h3>
                <ul>
                    ${day.exercises.map(exercise => `
                        <li>${exercise.name} - ${exercise.duration}</li>
                    `).join('')}
                </ul>
            `;
            
            container.appendChild(dayElement);
            
            // Trigger animation
            requestAnimationFrame(() => {
                dayElement.style.transition = 'all 0.5s ease';
                dayElement.style.opacity = '1';
                dayElement.style.transform = 'translateY(0)';
            });
        }, index * 150); // 150ms delay between each day
    });
}

// Add smooth scroll to results
function scrollToResults() {
    const results = document.getElementById('workoutPlanDisplay');
    results.scrollIntoView({ behavior: 'smooth', block: 'start' });
} 