// Admin Login Test Script
// Run this in the browser console to test admin authentication

console.log("=== Admin Login Test ===");

// Test admin credentials
const testCredentials = [
  {
    username: '24691F0071@mits.ac.in',
    password: 'Hemanth@71',
    role: 'root'
  },
  {
    username: '24691F00A8@mits.ac.in',
    password: 'Kumar@12345',
    role: 'admin'
  },
  {
    username: '24691F00C3@mits.ac.in',
    password: 'Pujitha@C3',
    role: 'admin'
  }
];

console.log("Available admin accounts:", testCredentials);

// Check localStorage for existing admin session
const existingAdmin = localStorage.getItem('adminUser');
if (existingAdmin) {
  console.log("Existing admin session found:", JSON.parse(existingAdmin));
} else {
  console.log("No existing admin session found");
}

// Check current URL
console.log("Current URL:", window.location.href);

// Instructions
console.log("\n=== Steps to Test Admin Login ===");
console.log("1. Navigate to: http://localhost:8080/myadminpage");
console.log("2. Use any of the credentials above");
console.log("3. Check browser network tab for errors");
console.log("4. Check console for any React errors");

// Clear any existing session for fresh test
console.log("\n=== Clearing existing session for fresh test ===");
localStorage.removeItem('adminUser');
console.log("Admin session cleared. Refresh the page and try logging in.");
