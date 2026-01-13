# 🏥 Pulsecare-AI | Technical Documentation

Welcome to the development journey of Pulsecare-AI. This is an ongoing project designed to bridge the gap between AI logic and healthcare accessibility.

## 🧠 Development Deep Dive

### 1. Dynamic DOM Manipulation
Instead of writing static HTML for every doctor, I used a **JavaScript Array of Objects**. This allows the app to scale. If we had 1,000 doctors, the code wouldn't need to change—the `.forEach()` loop handles the rendering automatically.

### 2. State Syncing & Logic
The biggest challenge was syncing the **Booking Button** with the **Appointment List**.
- **The Solution:** I implemented a "Closure" inside the delete function. When a user cancels an appointment, the code "remembers" which doctor card it belongs to and resets that specific button back to its original "Book" state.

### 3. User Experience (UX) Engineering
- **Asynchronous Feedback:** Added a `setTimeout` to the search button to simulate data fetching, providing a more realistic feel.
- **Visual Cues:** Used CSS Transitions for the sliding sidebar and "Toast" reminders to ensure the UI feels fluid, not "jumpy."

### 4. Smart Quiz Logic
The health quiz uses a **Point Accumulation System**. Based on the `totalHealthScore`, the app branches into three different recommendation paths using `if/else` logic, eventually suggesting a specific medical specialty.

## 🛠️ Current Tech Stack
- **HTML5/CSS3** (Flexbox & Grid)
- **Vanilla JavaScript** (ES6+)
- **Canvas-Confetti** (External API integration)
## 📸 Preview
*Check out the live link in the About section!*
