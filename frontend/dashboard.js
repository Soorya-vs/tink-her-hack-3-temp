// Firebase Initialization
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "habit-hero.firebaseapp.com",
    projectId: "habit-hero",
    storageBucket: "habit-hero.appspot.com",
    messagingSenderId: "SENDER_ID",
    appId: "APP_ID",
    measurementId: "MEASUREMENT_ID"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

let user = { xp: 0, level: 1, habits: [], achievements: [] };

// Handle Auth State Change
auth.onAuthStateChanged(userCredential => {
    if (userCredential) {
        let userId = userCredential.uid;
        db.collection("users").doc(userId).get().then(doc => {
            if (doc.exists) {
                user = doc.data();
                updateUI();
                displayHabits();
                displayBadges();
            }
        });
    } else {
        window.location.href = "login.html"; // Redirect to login if not authenticated
    }
});

// Add Habit
document.getElementById("addHabitBtn").addEventListener("click", () => {
    let habitName = document.getElementById("habitInput").value.trim();
    if (habitName !== "") {
        // Add new habit to the user's habits list
        let newHabit = { name: habitName, completed: false };
        user.habits.push(newHabit);

        // Save updated user data to Firebase
        saveUserData().then(() => {
            // After saving, update the habit list and clear input
            displayHabits();
            document.getElementById("habitInput").value = ""; // Clear input field
        }).catch((error) => {
            console.error("Error saving habit: ", error);
        });
    }
});

// Complete Habit
function completeHabit(index) {
    user.habits[index].completed = true;
    user.xp += 10; // Award XP for completing a habit
    checkLevelUp();
    saveUserData().then(() => {
        displayHabits();
        updateUI();
    }).catch((error) => {
        console.error("Error completing habit: ", error);
    });
}

// Level Up
function checkLevelUp() {
    if (user.xp >= user.level * 50) {
        user.level++;
        alert(`🎉 Level Up! You’re now Level ${user.level}!`);
    }
}

// Save User Data
function saveUserData() {
    let userId = auth.currentUser?.uid;
    if (userId) {
        return db.collection("users").doc(userId).set(user);
    }
}

// Display Habits
function displayHabits() {
    let habitList = document.getElementById("habitList");
    habitList.innerHTML = "";
    user.habits.forEach((habit, index) => {
        let li = document.createElement("li");
        li.innerHTML = `
            ${habit.name} 
            ${habit.completed ? "✔️" : `<button onclick="completeHabit(${index})">Complete</button>`}
        `;
        habitList.appendChild(li);
    });
}

// Update UI
function updateUI() {
    document.getElementById("xpDisplay").innerText = `XP: ${user.xp}`;
    document.getElementById("levelDisplay").innerText = `Level: ${user.level}`;
}

// Display Achievements/Badges
function displayBadges() {
    const badgeSection = document.getElementById("badgeSection");
    badgeSection.innerHTML = "";

    if (user.xp >= 50) {
        badgeSection.innerHTML += '<div class="badge">First Habit Master</div>';
    }
    if (user.level >= 5)
        {
            badgeSection.innerHTML += '<div class="badge">Superhero Level 5</div>';
        }
        // Add more badges based on levels and achievements
    }
    
    // Hamburger Menu Toggle
    function toggleMenu() {
        let menu = document.getElementById("menu");
        menu.style.display = (menu.style.display === "block") ? "none" : "block";
    }
    
    // Share Progress
    function shareProgress() {
        alert("Progress shared!");
    }
    
    // For sharing functionality, you might want to integrate a real sharing feature using Web Share API or something like a link to share
    function shareApp() {
        if (navigator.share) {
            navigator.share({
                title: 'Habit Hero - Superhero Habit Tracker',
                text: 'Check out my habit tracking progress on Habit Hero!',
                url: window.location.href
            }).then(() => {
                console.log('Thanks for sharing!');
            }).catch((error) => {
                console.error('Error sharing:', error);
            });
        } else {
            alert("Sharing is not supported in this browser.");
        }
    }
