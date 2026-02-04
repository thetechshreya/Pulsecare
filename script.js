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
function simulatePulse() {
    const bpmElement = document.getElementById('bpm-val');
    if (!bpmElement) return;

    setInterval(() => {

        const randomBPM = Math.floor(Math.random() * (75 - 70 + 1)) + 70;
        bpmElement.innerText = randomBPM;
    }, 3000);
}
function updateGreeting() {
    const now = new Date();
    const hour = now.getHours();
    const greetingElement = document.getElementById('greeting-text');
    const dateElement = document.getElementById('current-date');
    const nameElement = document.getElementById('user-display-name');

    
    let message = "Good Night,";
    if (hour >= 5 && hour < 12) message = "Good Morning,";
    else if (hour >= 12 && hour < 17) message = "Good Afternoon,";
    else if (hour >= 17 && hour < 21) message = "Good Evening,";
    
    greetingElement.innerText = message;

    
    const options = { weekday: 'long', month: 'short', day: 'numeric' };
    dateElement.innerText = now.toLocaleDateString('en-US', options);

    const savedName = localStorage.getItem('pulseUserName');
    if (savedName) {
        nameElement.innerText = savedName;
    }
}


function changeName() {
    const newName = prompt("What's your name?");
    if (newName) {
        localStorage.setItem('pulseUserName', newName);
        document.getElementById('user-display-name').innerText = newName;
    }
}
updateGreeting();

simulatePulse();
 function renderFilteredDoctors(list) {
    const container = document.querySelector('.doctor-container');
    if (!container) {
        console.error("Error: .doctor-container not found in HTML!");
        return;
    }

    container.innerHTML = ""; 
    console.log("Rendering doctors list...", list);
    
    const hour = new Date().getHours();
    const isAvailable = hour >= 9 && hour < 20;
    list.forEach((doctor, index) => { 
        const card = document.createElement('div');
        card.className = 'doctor-card';
        
        const statusClass = isAvailable ? 'status-available' : 'status-offline';
        const dotClass = isAvailable ? 'dot-online' : 'dot-offline';
        const statusText = isAvailable ? 'Available' : 'Offline';

    
        card.innerHTML = `
            <div class="status-badge ${statusClass}">
                <span class="dot ${dotClass}"></span>
                ${statusText}
            </div>
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

            ticket.querySelector('.delete-btn').onclick = function() {
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
function previewImage(event) {
    const reader = new FileReader();
    const uploadBtn = document.getElementById('uploadBtn');
    const statusText = document.getElementById('uploadStatus');
    
    reader.onload = function() {
        const output = document.getElementById('card-photo');
        output.src = reader.result;
        
        localStorage.setItem("user_card_image", reader.result);
        
        uploadBtn.classList.add('upload-success');
        uploadBtn.innerText = "Photo Ready!";

        statusText.style.display = "inline";
    };
    
    if (event.target.files[0]) {
        reader.readAsDataURL(event.target.files[0]);
    }
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#0052FF', '#28a745', '#ffffff'],
            zIndex: 9999 
        })
}

window.addEventListener('load', () => {
    const savedImg = localStorage.getItem("user_card_image");
    if (savedImg) {
        document.getElementById('card-photo').src = savedImg;
    }
});
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
function showAbout() {
    const home = document.getElementById('home-page');
    const about = document.getElementById('about-page');

    home.style.display = 'none';
    about.style.display = 'block';
    
    about.classList.add('fade-in');
    
    window.scrollTo(0, 0);
}

function showHome() {
    const home = document.getElementById('home-page');
    const about = document.getElementById('about-page');

    about.style.display = 'none';
    home.style.display = 'block';
    
    
    home.classList.add('fade-in');
    
    window.scrollTo(0, 0);
    
    
    setTimeout(() => {
        home.classList.remove('fade-in');
        about.classList.remove('fade-in');
    }, 500);
}
function goToHome() {
    console.log("Navigating to Home...");

    document.getElementById('home-page').style.display = 'block';
    
    
    document.getElementById('about-page').style.display = 'none';

    window.scrollTo(0, 0);
    

}
const healthTips = [
    { text: "Your body hears everything your mind says. Stay positive.", author: "Naomi Judd" },
    { text: "Drink a glass of water first thing every morning.", author: "Wellness Tip" },
    { text: "Sleep is the greatest performance enhancing drug.", author: "Dr. Matthew Walker" },
    { text: "Take a 10-minute walk outside; your mind will thank you.", author: "Health Tip" },
    { text: "Self-care is not selfish. You cannot pour from an empty cup.", author: "Eleanor Brown" }
];

let currentQuoteIndex = 0;

function rotateQuotes() {
    const quoteElement = document.getElementById('health-quote');
    const authorElement = document.getElementById('quote-author');
    const iconElement = document.querySelector('.quote-icon'); 
    
    
    const icons = {
        "water": "💧",
        "sleep": "🌙",
        "walk": "👟",
        "mind": "🧠",
        "care": "❤️",
        "default": "✨"
    };

    quoteElement.style.opacity = 0;
    authorElement.style.opacity = 0;

    setTimeout(() => {
        currentQuoteIndex = (currentQuoteIndex + 1) % healthTips.length;
        const selected = healthTips[currentQuoteIndex];

        
        let icon = icons.default;
        for (let key in icons) {
            if (selected.text.toLowerCase().includes(key)) {
                icon = icons[key];
            }
        }

        quoteElement.innerText = `"${selected.text}"`;
        authorElement.innerText = `— ${selected.author}`;
        iconElement.innerText = icon; 

        quoteElement.style.opacity = 1;
        authorElement.style.opacity = 1;
    }, 500);
}

setInterval(rotateQuotes, 4000);
function searchByDoctor() {
    
    let input = document.getElementById('doctorSearch').value.toLowerCase();
    
    
    let cards = document.getElementsByClassName('doctor-card');

    for (let i = 0; i < cards.length; i++) {
        
        let docName = cards[i].querySelector('h2').innerText.toLowerCase();


        if (docName.includes(input)) {
            cards[i].style.display = ""; 
            cards[i].classList.add('fade-in'); 
        } else {
            cards[i].style.display = "none";
        }
    }
}
function filterSpecialty(specialty) {
    let cards = document.getElementsByClassName('doctor-card');
    let input = document.getElementById('doctorSearch');

    input.value = ""; 

    for (let i = 0; i < cards.length; i++) {
        let docSpecialty = cards[i].querySelector('.specialty-text').innerText.toLowerCase();
        
        if (specialty === 'all' || docSpecialty.includes(specialty.toLowerCase())) {
            cards[i].style.display = "";
        } else {
            cards[i].style.display = "none";
        }
    }
}
const myMeds = [
    { id: 1, name: "Vitamin D3", time: "08:00 AM", taken: false },
    { id: 2, name: "Omega 3", time: "12:00 PM", taken: false },
    { id: 3, name: "Magnesium", time: "09:00 PM", taken: false }
];

function renderMeds() {
    const listContainer = document.getElementById('meds-list');
    listContainer.innerHTML = "";

    myMeds.forEach(med => {
        const medDiv = document.createElement('div');
        medDiv.className = `med-item ${med.taken ? 'completed' : ''}`;
        medDiv.onclick = () => toggleMed(med.id);

        medDiv.innerHTML = `
            <div class="checkbox-custom">${med.taken ? '✓' : ''}</div>
            <div class="med-info">
                <div style="font-weight: bold;">${med.name}</div>
                <div style="font-size: 0.75rem; color: #888;">${med.time}</div>
            </div>
        `;
        listContainer.appendChild(medDiv);
    });

    updateMedProgress();
}

function toggleMed(id) {
    const med = myMeds.find(m => m.id === id);
    med.taken = !med.taken;
    renderMeds();
}

function updateMedProgress() {
    const completedCount = myMeds.filter(m => m.taken).length;
    const total = myMeds.length;
    const percentage = (completedCount / total) * 100;

    document.getElementById('meds-progress-bar').style.width = percentage + "%";
    document.getElementById('meds-count').innerText = `${completedCount}/${total} Completed`;
}

renderMeds();
function calculateBMI() {
    const weight = document.getElementById('bmi-weight').value;
    const heightCm = document.getElementById('bmi-height').value;
    const resultArea = document.getElementById('bmi-result-area');

    if (weight > 0 && heightCm > 0) {
        const heightM = heightCm / 100;
        const bmi = (weight / (heightM * heightM)).toFixed(1);
        
        document.getElementById('bmi-num').innerText = bmi;
        resultArea.style.display = "block";

        let status = "";
        let color = "";
        let position = "";

        if (bmi < 18.5) { status = "Underweight"; color = "#3498db"; position = "10%"; }
        else if (bmi < 25) { status = "Normal"; color = "#2ecc71"; position = "35%"; }
        else if (bmi < 30) { status = "Overweight"; color = "#f1c40f"; position = "60%"; }
        else { status = "Obese"; color = "#e74c3c"; position = "85%"; }

        document.getElementById('bmi-status').innerText = status;
        document.getElementById('bmi-num').style.color = color;
        document.getElementById('bmi-indicator').style.left = position;
    } else {
        alert("Please enter valid numbers!");
    }
}
let currentWater = 0;
const goal = 2000;

function addWater(amount) {
    if (currentWater < goal) {
        currentWater += amount;
        if (currentWater > goal) currentWater = goal;
        updateWaterUI();
    }
    
    if (currentWater === goal) {
        alert("🎉 Awesome! You've reached your daily hydration goal!");
    }
}

function updateWaterUI() {
    const percent = Math.floor((currentWater / goal) * 100);
    
    document.getElementById('water-fill').style.height = percent + "%";
    document.getElementById('water-percent').innerText = percent + "%";
    document.getElementById('water-ml').innerText = currentWater;
    

    localStorage.setItem('dailyWater', currentWater);
}

function resetWater() {
    if(confirm("Start a new day?")) {
        currentWater = 0;
        updateWaterUI();
    }
}
window.onload = () => {
    const saved = localStorage.getItem('dailyWater');
    if (saved) {
        currentWater = parseInt(saved);
        updateWaterUI();
    }
};
function logMood(emoji, label) {
    const statusText = document.getElementById('mood-status');
    
    statusText.innerHTML = `You're feeling <strong>${label}</strong> today!`;
    
    const ping = new Audio('https://www.soundjay.com/buttons/button-16.mp3');
    ping.play();

    
    const moodEntry = {
        date: new Date().toLocaleDateString(),
        mood: emoji,
        status: label
    };
    localStorage.setItem('userMood', JSON.stringify(moodEntry));
}
function analyzeSleep() {
    const hours = document.getElementById('sleep-range').value;
    const hoursText = document.getElementById('hours-val');
    const percentText = document.getElementById('sleep-percent');
    const progressCircle = document.getElementById('sleep-progress');
    const scorePill = document.getElementById('sleep-score-pill');

    hoursText.innerText = hours;

    
    let score = (hours / 8) * 100;
    if (score > 100) score = 100 - (score - 100); 

    percentText.innerText = Math.floor(score) + "%";
    progressCircle.setAttribute('stroke-dasharray', `${score}, 100`);

    if (score > 85) { scorePill.innerText = "Optimal"; scorePill.style.background = "#00ff88"; }
    else if (score > 60) { scorePill.innerText = "Fair"; scorePill.style.background = "#0052FF"; }
    else { scorePill.innerText = "Poor"; scorePill.style.background = "#ff4b2b"; }
}
// 1. Heart Rate Zone Logic
function updateHRZones(bpm) {
    document.getElementById('live-hr').innerText = bpm;
    
    document.querySelectorAll('.zone').forEach(z => z.classList.remove('active'));
    

    if (bpm < 100) document.getElementById('zone-1').classList.add('active');
    else if (bpm < 130) document.getElementById('zone-2').classList.add('active');
    else if (bpm < 160) document.getElementById('zone-3').classList.add('active');
    else document.getElementById('zone-4').classList.add('active');
}


const noteArea = document.getElementById('doctor-notes');
noteArea.addEventListener('input', () => {
    localStorage.setItem('userHealthNotes', noteArea.value);
    document.getElementById('save-status').innerText = "Saving...";
    setTimeout(() => { document.getElementById('save-status').innerText = "Auto-saved"; }, 1000);
});


window.addEventListener('DOMContentLoaded', () => {
    const savedNotes = localStorage.getItem('userHealthNotes');
    if (savedNotes) noteArea.value = savedNotes;
});

function clearNotes() {
    if(confirm("Delete all notes?")) {
        noteArea.value = "";
        localStorage.removeItem('userHealthNotes');
    }
}
function generateReport() {
    const reportArea = document.getElementById('report-print-area');
    const name = localStorage.getItem('pulseUserName') || "Guest";
    const bmi = document.getElementById('bmi-num').innerText || "N/A";
    const sleep = document.getElementById('sleep-percent').innerText || "N/A";
    const water = document.getElementById('water-ml').innerText || "0";
    const notes = document.getElementById('doctor-notes').value || "No notes recorded.";
    const date = new Date().toLocaleDateString();

    reportArea.innerHTML = `
        <div style="text-align:center">
            <h1>PULSECARE</h1>
            <p>Personal Health Summary | ${date}</p>
        </div>
        <hr>
        <h3>Patient: ${name}</h3>
        <div class="report-grid">
            <div class="report-item"><label>BMI Score</label> ${bmi}</div>
            <div class="report-item"><label>Sleep Quality</label> ${sleep}</div>
            <div class="report-item"><label>Water Intake</label> ${water} ml / 2000 ml</div>
            <div class="report-item"><label>Heart Rate</label> ${document.getElementById('live-hr').innerText} BPM</div>
        </div>
        <div style="margin-top:30px;">
            <h4>Clinical Notes:</h4>
            <p style="background:#f9f9f9; padding:15px; border-left:4px solid #0052FF;">${notes}</p>
        </div>
        <p style="font-size: 0.7rem; color: #888; margin-top: 40px;">* This report is generated automatically by PulseCare and is for informational purposes only.</p>
    `;

    document.getElementById('report-modal').style.display = "block";
}

function closeReport() {
    document.getElementById('report-modal').style.display = "none";
}
let sosTimer;
const sosBtn = document.getElementById('sos-btn');

function startSOS() {
    sosBtn.style.transform = "scale(0.9)";
    document.getElementById('sos-instruction').innerText = "Keep holding...";
    
    sosTimer = setTimeout(() => {
        triggerSOS();
    }, 3000); // 3 seconds hold time
}

function stopSOS() {
    clearTimeout(sosTimer);
    sosBtn.style.transform = "scale(1)";
    document.getElementById('sos-instruction').innerText = "Hold 3s for Emergency";
}

function triggerSOS() {
    document.getElementById('sos-overlay').style.display = "flex";
    

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
            document.getElementById('gps-coords').innerText = 
                `${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`;
        });
    }

    
    const siren = new Audio('https://www.soundjay.com/misc/sounds/siren-01.mp3');
    siren.loop = true;
    siren.play();
    window.currentSiren = siren;
}

function cancelSOS() {
    document.getElementById('sos-overlay').style.display = "none";
    if (window.currentSiren) window.currentSiren.pause();
}
function syncGraph() {
    const todayBar = document.getElementById('today-bar');
    
    
    let waterScore = (currentWater / 2000) * 50; 
    if (waterScore > 50) waterScore = 50;

    const sleepHours = document.getElementById('sleep-range').value;
    let sleepScore = (sleepHours / 8) * 50; 
    if (sleepScore > 50) sleepScore = 50;

   
    const totalScore = Math.floor(waterScore + sleepScore);

    todayBar.style.height = totalScore + "%";
}
