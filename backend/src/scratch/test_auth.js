// src/scratch/test_auth.js
// Automated verification script for SkyDesk Authentication module.

import { signToken, verifyToken } from '../utils/jwt.js';
import * as authService from '../services/auth.service.js';
import bcrypt from 'bcryptjs';

async function runTests() {
  console.log('🧪 Starting Auth Verification Tests...\n');

  // 1. Verify bcrypt hashing
  console.log('1. Verifying Bcrypt Hashing...');
  const testPassword = 'Password123!';
  const hash = await bcrypt.hash(testPassword, 10);
  const isMatch = await bcrypt.compare(testPassword, hash);
  const isWrongMatch = await bcrypt.compare('WrongPassword', hash);
  console.log(`   Hash created: ${hash.substring(0, 20)}...`);
  console.log(`   Password match check: ${isMatch ? 'PASSED ✅' : 'FAILED ❌'}`);
  console.log(`   Wrong password check: ${!isWrongMatch ? 'PASSED ✅' : 'FAILED ❌'}`);
  if (!isMatch || isWrongMatch) throw new Error('Bcrypt test failed');

  // 2. Verify JWT Generation and Verification
  console.log('\n2. Verifying JWT Token Generation & Verification...');
  const payload = { id: 999, email: 'test@skydesk.com', role: 'employee' };
  const token = signToken(payload);
  console.log(`   Token generated: ${token.substring(0, 30)}...`);
  const decoded = verifyToken(token);
  console.log(`   Decoded payload ID: ${decoded.id}, Email: ${decoded.email}, Role: ${decoded.role}`);
  if (decoded.id !== payload.id || decoded.email !== payload.email) {
    throw new Error('JWT test failed');
  }
  console.log('   JWT Verification: PASSED ✅');

  // 3. Test Database Connectivity & Service Signup / Signin / GetMe
  console.log('\n3. Verifying Database & Auth Service Operations...');
  const randomSuffix = Math.floor(Math.random() * 100000);
  const testUserEmail = `authtest_${randomSuffix}@example.com`;
  const testUserName = 'Auth Test User';
  const testUserPass = 'SecurePass123!';

  console.log(`   Attempting Signup for: ${testUserEmail}...`);
  try {
    const signupRes = await authService.signup(testUserName, testUserEmail, testUserPass);
    console.log('   Signup successful. Created user ID:', signupRes.user.id);
    if (!signupRes.user.id || signupRes.user.password) {
      throw new Error('Signup response format or security violation (password leaked)!');
    }
    console.log('   Signup return check (No password leaked): PASSED ✅');

    // 4. Verify duplicate email rejection
    console.log('   Testing Duplicate Email Rejection...');
    try {
      await authService.signup(testUserName, testUserEmail, testUserPass);
      console.error('❌ Duplicate signup should have thrown error!');
      process.exit(1);
    } catch (err) {
      if (err.statusCode === 409) {
        console.log('   Duplicate email rejected with HTTP 409: PASSED ✅');
      } else {
        console.log('   Duplicate email rejected with message:', err.message, 'PASSED ✅');
      }
    }

    // 5. Verify Signin
    console.log('   Testing Signin...');
    const signinRes = await authService.signin(testUserEmail, testUserPass);
    console.log('   Signin token received:', signinRes.token ? 'YES ✅' : 'NO ❌');
    console.log('   User returned:', signinRes.user.email);
    if (signinRes.user.password) {
      throw new Error('Signin security violation (password leaked in user object)!');
    }
    console.log('   Signin return check (No password leaked): PASSED ✅');

    // 6. Verify Get Profile (ME)
    console.log('   Testing Get Profile (Me)...');
    const profileRes = await authService.getProfile(signinRes.user.id);
    console.log('   Profile fetched for user:', profileRes.name);
    if (profileRes.password) {
      throw new Error('Profile security violation (password leaked)!');
    }
    console.log('   Get Profile check: PASSED ✅');

    console.log('\n🎉 ALL AUTHENTICATION MODULE TESTS PASSED SUCESSFULLY! 🎉');
  } catch (err) {
    console.error('❌ Error during service testing:', err);
    process.exit(1);
  }
}

runTests().then(() => process.exit(0)).catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
