// Firestore.js - Handles Firestore interactions

// Import Firebase modules
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDFtISEprjNtK3ndtlOZjaLPB_rgTWrY8",
  authDomain: "habit-hero-f8094.firebaseapp.com",
  projectId: "habit-hero-f8094",
  storageBucket: "habit-hero-f8094.firebasestorage.app",
  messagingSenderId: "265677115923",
  appId: "1:265677115923:web:e2c0278112136f6ab0a5e6",
  measurementId: "G-V2QG47FDMS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

// ✅ Save User Data to Firestore
async function saveUserData(userId, userData) {
  try {
    await setDoc(doc(db, "users", userId), userData, { merge: true });
    console.log("✅ User data saved successfully");
  } catch (error) {
    console.error("❌ Error saving user data:", error);
  }
}

// ✅ Load User Data from Firestore
async function loadUserData(userId) {
  try {
    const docSnap = await getDoc(doc(db, "users", userId));
    return docSnap.exists() ? docSnap.data() : null;
  } catch (error) {
    console.error("❌ Error loading user data:", error);
  }
}

// ✅ Add New Habit (Ensures habits array exists)
async function addHabit(userId, habitName) {
  try {
    const userData = (await loadUserData(userId)) || {};
    userData.habits = userData.habits || [];
    userData.habits.push({ name: habitName, completed: false });

    await saveUserData(userId, userData);
    console.log("✅ Habit added successfully");
  } catch (error) {
    console.error("❌ Error adding habit:", error);
  }
}

// ✅ Mark Habit as Completed (Ensures XP & Level Up)
async function completeHabit(userId, habitIndex) {
  try {
    const userData = await loadUserData(userId);
    if (!userData || !userData.habits) return;

    if (userData.habits[habitIndex] && !userData.habits[habitIndex].completed) {
      userData.habits[habitIndex].completed = true;
      userData.xp = (userData.xp || 0) + 10;
      userData.level = userData.level || 1;

      // Check Level Up
      if (userData.xp >= userData.level * 50) {
        userData.level++;
        console.log(`🎉 Level Up! You’re now Level ${userData.level}!`);
      }

      await saveUserData(userId, userData);
    }
  } catch (error) {
    console.error("❌ Error completing habit:", error);
  }
}

// ✅ Logout Function
async function logout() {
  try {
    await signOut(auth);
    window.location.href = "login.html"; // Redirect to login page
  } catch (error) {
    console.error("❌ Error logging out:", error);
  }
}

// ✅ Export Functions for Other Files
export { saveUserData, loadUserData, addHabit, completeHabit, logout };
