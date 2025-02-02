import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { saveUserData, loadUserData, addHabit, completeHabit, logout } from "./firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCDFtISEprjNtK3ndtlOZjaLPB_rgTWrY8",
  authDomain: "habit-hero-f8094.firebaseapp.com",
  projectId: "habit-hero-f8094",
  storageBucket: "habit-hero-f8094.appspot.com",
  messagingSenderId: "265677115923",
  appId: "1:265677115923:web:e2c0278112136f6ab0a5e6",
  measurementId: "G-V2QG47FDMS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
let userId = null;

// Check if the user is authenticated
onAuthStateChanged(auth, (userCredential) => {
  if (userCredential) {
    userId = userCredential.uid;
    loadUserDataAndUpdateUI(userId);
  } else {
    window.location.href = "login.html"; // Redirect to login page
  }
});

// Load user data from Firestore and update UI
async function loadUserDataAndUpdateUI(userId) {
  try {
    const userData = await loadUserData(userId);
    if (userData) {
      document.getElementById("xpDisplay").innerText = `XP: ${userData.xp}`;
      document.getElementById("levelDisplay").innerText = `Level: ${userData.level}`;
      displayHabits(userData.habits);
    }
  } catch (error) {
    console.error("❌ Error loading user data:", error);
  }
}

// Display user habits on the UI
function displayHabits(habits) {
  const habitList = document.getElementById("habitList");
  habitList.innerHTML = "";
  habits.forEach((habit, index) => {
    const habitElement = document.createElement("li");
    habitElement.innerHTML = `${habit.name} ${habit.completed ? "✔️" : `<button onclick="completeHabit(${index})">Complete</button>`}`;
    habitList.appendChild(habitElement);
  });
}

// Add habit to Firestore
document.getElementById("addHabitBtn").addEventListener("click", () => {
  const habitName = document.getElementById("habitInput").value.trim();
  if (habitName !== "" && userId) {
    addHabit(userId, habitName);
  }
});

// Complete habit and update XP & Level
window.completeHabit = async function (index) {
  if (userId) {
    await completeHabit(userId, index);
    loadUserDataAndUpdateUI(userId); // Reload data to reflect changes
  }
};

// Log out the user
document.getElementById("logoutBtn").addEventListener("click", async () => {
  await logout();
});
