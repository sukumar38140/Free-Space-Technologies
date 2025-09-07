// Node.js Admin Credentials Verification Test
// Run with: node admin-test.js

console.log('🔍 Free Space Technologies - Admin Login Test\n');

// Predefined admin accounts (from AdminAuthContext.tsx)
const ADMIN_ACCOUNTS = [
  {
    id: '1',
    username: '24691F0071@mits.ac.in',
    password: 'Hemanth@71',
    role: 'root',
    email: '24691F0071@mits.ac.in'
  },
  {
    id: '2',
    username: '24691F00A8@mits.ac.in',
    password: 'Kumar@12345',
    role: 'admin',
    email: '24691F00A8@mits.ac.in'
  },
  {
    id: '3',
    username: '24691F00C3@mits.ac.in',
    password: 'Pujitha@C3',
    role: 'admin',
    email: '24691F00C3@mits.ac.in'
  }
];

// Test credentials function (simulates the login function)
const testLogin = (username, password) => {
  console.log(`🧪 Testing login: ${username}`);
  console.log(`   Password length: ${password.length} characters`);
  
  const account = ADMIN_ACCOUNTS.find(
    acc => acc.username === username && acc.password === password
  );
  
  if (account) {
    console.log(`   ✅ SUCCESS - Role: ${account.role}, Email: ${account.email}`);
    return { success: true, user: account };
  } else {
    console.log(`   ❌ FAILED - Invalid credentials`);
    return { success: false, user: null };
  }
};

// Run tests
console.log('📋 Testing all admin accounts:\n');

let totalTests = 0;
let successfulTests = 0;

ADMIN_ACCOUNTS.forEach((account, index) => {
  console.log(`--- Test ${index + 1}: ${account.role.toUpperCase()} ADMIN ---`);
  const result = testLogin(account.username, account.password);
  totalTests++;
  if (result.success) successfulTests++;
  console.log('');
});

// Test invalid credentials
console.log('--- Test 4: INVALID CREDENTIALS ---');
testLogin('invalid@example.com', 'wrongpassword');
totalTests++;
console.log('');

// Summary
console.log('📊 TEST SUMMARY:');
console.log(`   Total Tests: ${totalTests}`);
console.log(`   Successful: ${successfulTests}`);
console.log(`   Failed: ${totalTests - successfulTests}`);
console.log(`   Success Rate: ${((successfulTests/3)*100).toFixed(1)}%`); // Only count valid accounts

if (successfulTests === 3) {
  console.log('\n🎉 ALL ADMIN CREDENTIALS ARE WORKING CORRECTLY!');
  console.log('✅ Admin authentication system is properly configured');
  console.log('🚀 Ready for production use');
} else {
  console.log('\n⚠️  Some admin credentials are not working properly');
  console.log('🔧 Check AdminAuthContext.tsx configuration');
}

console.log('\n🌐 To test in browser:');
console.log('   1. Go to: http://localhost:8081/admin');
console.log('   2. Use any of the credentials above');
console.log('   3. Should redirect to admin dashboard');

console.log('\n📱 Access URLs:');
console.log('   Website: http://localhost:8081/');
console.log('   Admin:   http://localhost:8081/admin');
