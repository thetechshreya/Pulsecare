const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.remove('dark-mode');
        }
        const doctorData = [
        { name: "Dr. Aisha Sharma", specialty: "Cardiologist", image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200",rating:5 },
        { name: "Dr. Aryan Khan", specialty: "Neurologist", image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200",rating:4 },
        { name: "Dr. Sara", specialty: "Dermatologist", image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200",rating:5 },
        { name: "Dr. Raj", specialty: "Pediatrician", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200",rating:3 },
        { name: "Dr. Raj", specialty: "Heartspecialist", image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200",rating:3 },
        ];
    
        function displayDoctors() {
            renderFilteredDoctors(doctorData);
        } 
        displayDoctors(); 
  const btn = document.querySelector('.find-btn');
const loader = document.getElementById('loader');
const container = document.querySelector('.doctor-container');

btn.onclick = function() {
    
    container.innerHTML = "";
    loader.style.display = "block";
    setTimeout(() => {
        
        loader.style.display = "none";
        displayDoctors();
        alert("Doctors list updated!");
    }, 1000); 
};
    function renderFilteredDoctors(list) {
    const container = document.querySelector('.doctor-container');
    container.innerHTML = ""; 
list.forEach((doctor, index) => { 
    const card = document.createElement('div');
    card.className = 'doctor-card';
    
    
    card.innerHTML = `
        <img src="${doctor.image}" alt="${doctor.name}">
        <h2>${doctor.name}</h2>
        <p>${doctor.specialty}</p>
        <div class="stars">${"⭐".repeat(doctor.rating)}</div>
        <button class="book-btn" id="book-btn-${index}">Book Appointment</button>
    `;

    const bookBtn = card.querySelector('.book-btn');

    bookBtn.onclick = function() {
        alert(`✅ Appointment Confirmed with ${doctor.name}!`);
        
        const listArea = document.getElementById('appointmentList');
        const emptyMsg = document.getElementById('empty-msg');
        if (emptyMsg) { emptyMsg.remove(); }

        const ticket = document.createElement('div');
        ticket.className = 'appointment-ticket';
        ticket.innerHTML = `
            <span><strong>${doctor.name}</strong> - ${doctor.specialty}</span>
            <button class="delete-btn" title="Cancel Appointment">&times;</button>
        `;
        const deleteBtn = ticket.querySelector('.delete-btn');
        deleteBtn.onclick = function() {
            ticket.remove();
            

            bookBtn.innerText = "Book Appointment";
            bookBtn.style.backgroundColor = "#0052FF"; 
            bookBtn.disabled = false;

            if (listArea.children.length === 0) {
                listArea.innerHTML = '<p id="empty-msg">No appointments booked yet.</p>';
            }
        };

        listArea.appendChild(ticket);

        bookBtn.innerText = "Booked";
        bookBtn.style.backgroundColor = "#28a745";
        bookBtn.disabled = true; 
    };

    container.appendChild(card);
});
}
let currentReview = 0;
const reviews = document.querySelectorAll('.testimonial-card');

function showNextReview() {
    reviews[currentReview].classList.remove('active');
    currentReview = (currentReview + 1) % reviews.length;
    reviews[currentReview].classList.add('active');
}
setInterval(showNextReview, 4000);
const backToTopBtn = document.getElementById("backToTop");

window.onscroll = function() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
};
backToTopBtn.onclick = function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};
function filterDoctors(category) {
    const cards = document.querySelectorAll('.doctor-card');
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    cards.forEach(card => {
        const specialty = card.querySelector('p').innerText;
        if (category === 'all' || specialty.includes(category)) {
            card.style.display = "flex";
            card.style.opacity = "1";
        } else {
            card.style.display = "none";
            card.style.opacity = "0";
        }
    });
}
function generateCard() {
    const name = document.getElementById('userNameInput').value;
    if (name.trim() === "") {
        alert("Please enter a name first!");
        return;
    }
    document.getElementById('idCard').style.display = "block";

    document.getElementById('displayName').innerText = name;
    
    const randomID = Math.floor(1000 + Math.random() * 9000);
    document.getElementById('displayID').innerText = "#" + randomID;
    updateCardDate();
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0052FF', '#ffffff', '#00d4ff']
    });
}
function updateCardDate() {
    const dateElement = document.getElementById('last-updated');
    const now = new Date();

    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = now.toLocaleDateString('en-US', options);

    dateElement.innerText = formattedDate;
    
    localStorage.setItem("card_last_updated", formattedDate);
}

window.addEventListener('load', () => {
    const savedDate = localStorage.getItem("card_last_updated");
    if (savedDate) {
        document.getElementById('last-updated').innerText = savedDate;
    }
});
function downloadCard() {

    const cardContent = document.getElementById('idCard').innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = `<div class="id-card" style="margin: 50px auto; display:block;">${cardContent}</div>`;
    window.print();
   
    document.body.innerHTML = originalContent;
    location.reload(); 
}
const themeToggle = document.getElementById('theme-toggle');
themeToggle.onclick = function(e) {
    e.preventDefault();
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        themeToggle.innerText = "☀️ Light Mode";
    } else {
        themeToggle.innerText = "🌙 Dark Mode";
    }
};
function showReminder() {
    const reminder = document.getElementById('reminder');
    reminder.style.display = 'block'
    setTimeout(() => {
        reminder.style.display = 'none';
    }, 5000);
}

window.onload = () => {
    setTimeout(showReminder, 3000);
};
let totalHealthScore = 0;

function checkHealth(score, currentStep) {
    totalHealthScore += score;
    
    const quizContent = document.getElementById('quiz-content'); 
    const progressBar = document.getElementById('progress-bar');

    if (currentStep === 1) {
        progressBar.style.width = "66%";
        
        quizContent.innerHTML = `
            <p id="question">Do you exercise at least 3 times a week?</p>
            <div class="quiz-options">
                <button onclick="checkHealth(1, 2)">Rarely</button>
                <button onclick="checkHealth(2, 2)">Sometimes</button>
                <button onclick="checkHealth(3, 2)">Every Week!</button>
            </div>
        `;
    } else if (currentStep === 2) {
        progressBar.style.width = "100%";
            confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#0052FF', '#28a745', '#ffffff'],
            zIndex: 9999 
        });
        
        let recommendation = totalHealthScore <= 3 ? "Lifestyle boost needed!" : "You're a star!";
        let doctorType = totalHealthScore <= 3 ? "General Physician" : "Dermatologist";

        quizContent.innerHTML = `
            <h3>Your Score: ${totalHealthScore}/6</h3>
            <p>${recommendation}</p>
            <div style="background: white; padding: 15px; border-radius: 10px; margin: 10px 0; border: 1px dashed #0052FF; color: black;">
                <strong>💡 Suggestion:</strong> Book with a <strong>${doctorType}</strong>.
            </div>
            <button onclick="window.scrollTo({top: 0, behavior: 'smooth'})" class="reminder-btn">Go Book Now ↑</button>
    
            <button onclick="softResetQuiz()" class="reminder-btn">Restart Quiz</button>
        `;
    }
    
}
function softResetQuiz() {
    totalHealthScore = 0; 
    const progressBar = document.getElementById('progress-bar');
    const quizContent = document.getElementById('quiz-content');

    progressBar.style.width = "33%";

    quizContent.innerHTML = `
        <p id="question">How many glasses of water do you drink daily?</p>
        <div class="quiz-options">
            <button onclick="checkHealth(1, 1)">0-2 Glasses</button>
            <button onclick="checkHealth(2, 1)">3-5 Glasses</button>
            <button onclick="checkHealth(3, 1)">6+ Glasses</button>
        </div>
    `;
}

function handleContact(event) {
    event.preventDefault();
    alert("🚀 Message Sent! Our team will contact you soon.");
    event.target.reset();
}

function toggleChat() {
    const chat = document.getElementById('chat-box');
    chat.style.display = (chat.style.display === 'flex') ? 'none' : 'flex';
}
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    
    if (sidebar.style.width === "250px") {
        sidebar.style.width = "0";
    } else {
        sidebar.style.width = "250px";
    }
}
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    document.getElementById('live-clock').innerText = timeString;
}

setInterval(updateClock, 1000);
updateClock(); 
const clinics = [
    { name: "City General Hospital", city: "New York", address: "123 Health Ave", map: "https://www.google.com/maps" },
    { name: "Blue Cross Clinic", city: "London", address: "45 Medical Lane", map: "https://www.google.com/maps" },
    { name: "Sunrise Wellness Center", city: "New York", address: "78 Wellness Rd", map: "https://www.google.com/maps" }
];

function locateClinics() {
    const input = document.getElementById('citySearch').value.toLowerCase();
    const resultsContainer = document.getElementById('clinic-results');
    resultsContainer.innerHTML = ""; 

    const filtered = clinics.filter(c => c.city.toLowerCase().includes(input));

    if (filtered.length === 0) {
        resultsContainer.innerHTML = "<p>No clinics found in that city. Try 'New York' or 'London'.</p>";
        return;
    }

    filtered.forEach(clinic => {
        resultsContainer.innerHTML += `
            <div class="clinic-card" style="animation: fadeInUp 0.5s ease;">
                <h3>🏥 ${clinic.name}</h3>
                <p>📍 ${clinic.address}</p>
                <p>🌆 ${clinic.city}</p>
                <a href="${clinic.map}" target="_blank" class="map-link">View on Google Maps →</a>
            </div>
        `;
    });
}
function handleSubmission(buttonId) {
    const btn = document.getElementById(buttonId);


    btn.classList.add('btn-loading');
    const originalText = btn.innerText;
    btn.innerText = ""; 

    setTimeout(() => {
        btn.classList.remove('btn-loading');
        btn.classList.add('btn-success');
        btn.innerText = "✓ Sent!";
        
        
        setTimeout(() => {
            btn.classList.remove('btn-success');
            btn.innerText = originalText;
        }, 2000);
    }, 1000);
}
function saveUserName() {
    const nameInput = document.querySelector('input[placeholder*="name"]');
    
    if (nameInput && nameInput.value) {
        const name = nameInput.value;
    
        localStorage.setItem("pulsecare_visitor_name", name)
        updateChatGreeting(name);
    }
}

function updateChatGreeting(name) {
    const chatBody = document.querySelector('.chat-body');
    if (chatBody) {
        chatBody.innerHTML = `<p>👋 Hello <strong>${name}</strong>! How can we assist you today?</p>`;
    }
}

window.addEventListener('load', () => {
    const savedName = localStorage.getItem("pulsecare_visitor_name");
    if (savedName) {
        updateChatGreeting(savedName);
    }
});
 

