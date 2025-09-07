// Admin Login Debug Test
// Run this in browser console to debug admin login issues

console.log('🔍 ADMIN LOGIN DEBUG TEST');
console.log('='.repeat(40));

// Check current authentication state
const checkAuthState = () => {
  console.log('\n📊 Current Authentication State:');
  
  // Check localStorage
  const savedUser = localStorage.getItem('adminUser');
  if (savedUser) {
    const user = JSON.parse(savedUser);
    console.log('✅ Saved user found:', user);
  } else {
    console.log('❌ No saved user in localStorage');
  }
  
  // Check current URL
  console.log('🌐 Current URL:', window.location.href);
  
  // Check if React context is available
  if (window.React) {
    console.log('⚛️ React detected');
  }
};

// Test admin credentials
const testCredentials = () => {
  console.log('\n🔑 Testing Admin Credentials:');
  
  const adminAccounts = [
    {
      id: '1',
      username: '24691F0071@mits.ac.in',
      password: 'Hemanth@71',
      role: 'root'
    },
    {
      id: '2', 
      username: '24691F00A8@mits.ac.in',
      password: 'Kumar@12345',
      role: 'admin'
    },
    {
      id: '3',
      username: '24691F00C3@mits.ac.in',
      password: 'Pujitha@C3',
      role: 'admin'
    }
  ];
  
  adminAccounts.forEach((account, index) => {
    console.log(`${index + 1}. ${account.username} (${account.role})`);
  });
};

// Manual login test
const manualLogin = (username, password) => {
  console.log(`\n🧪 Manual Login Test: ${username}`);
  
  // Simulate the login process
  const adminAccounts = [
    { id: '1', username: '24691F0071@mits.ac.in', password: 'Hemanth@71', role: 'root', email: '24691F0071@mits.ac.in' },
    { id: '2', username: '24691F00A8@mits.ac.in', password: 'Kumar@12345', role: 'admin', email: '24691F00A8@mits.ac.in' },
    { id: '3', username: '24691F00C3@mits.ac.in', password: 'Pujitha@C3', role: 'admin', email: '24691F00C3@mits.ac.in' }
  ];
  
  const account = adminAccounts.find(acc => acc.username === username && acc.password === password);
  
  if (account) {
    console.log('✅ Credentials valid');
    const user = {
      id: account.id,
      username: account.username,
      role: account.role,
      email: account.email
    };
    
    // Save to localStorage
    localStorage.setItem('adminUser', JSON.stringify(user));
    console.log('💾 User saved to localStorage');
    console.log('🎯 Try refreshing the page or navigating to /admin');
    
    return true;
  } else {
    console.log('❌ Invalid credentials');
    return false;
  }
};

// Clear session for testing
const clearSession = () => {
  localStorage.removeItem('adminUser');
  console.log('🗑️ Admin session cleared');
};

// Check form elements
const checkForm = () => {
  console.log('\n📝 Form Element Check:');
  
  const usernameField = document.querySelector('input[name="username"]');
  const passwordField = document.querySelector('input[name="password"]');
  const form = document.querySelector('form');
  
  console.log('Username field:', !!usernameField);
  console.log('Password field:', !!passwordField);
  console.log('Form element:', !!form);
  
  if (usernameField && passwordField) {
    console.log('Current username:', usernameField.value);
    console.log('Current password length:', passwordField.value.length);
  }
};

// Run all checks
console.log('\n🚀 Running all diagnostic checks...');
checkAuthState();
testCredentials();
checkForm();

console.log('\n💡 DEBUGGING COMMANDS:');
console.log('• checkAuthState() - Check current auth state');
console.log('• testCredentials() - Show valid credentials');
console.log('• manualLogin("24691F0071@mits.ac.in", "Hemanth@71") - Manual login');
console.log('• clearSession() - Clear saved session');
console.log('• checkForm() - Check form elements');

console.log('\n🎯 QUICK FIX:');
console.log('If login seems to work but dashboard doesn\'t show:');
console.log('1. Check browser console for errors');
console.log('2. Try: manualLogin("24691F0071@mits.ac.in", "Hemanth@71")');
console.log('3. Refresh the page');
console.log('4. Navigate to /admin or /myadminpage');

// Make functions globally available
window.checkAuthState = checkAuthState;
window.testCredentials = testCredentials;
window.manualLogin = manualLogin;
window.clearSession = clearSession;
window.checkForm = checkForm;
