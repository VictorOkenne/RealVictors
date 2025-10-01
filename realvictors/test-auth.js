// Test Authentication Script
// Run this with: node test-auth.js

const { createClient } = require('@supabase/supabase-js');

// Replace with your actual Supabase credentials
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testAuth() {
  console.log('🧪 Testing RealVictors Authentication...\n');

  try {
    // Test 1: Check if we can connect to Supabase
    console.log('1️⃣ Testing Supabase connection...');
    const { data, error } = await supabase.from('users').select('count').limit(1);
    if (error) {
      console.log('❌ Connection failed:', error.message);
      return;
    }
    console.log('✅ Supabase connection successful\n');

    // Test 2: Try to sign up a test user
    console.log('2️⃣ Testing user signup...');
    const testEmail = `test-${Date.now()}@example.com`;
    const testPassword = 'testpassword123';
    
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: testEmail,
      password: testPassword,
      options: {
        data: {
          display_name: 'Test User'
        }
      }
    });

    if (signUpError) {
      console.log('❌ Signup failed:', signUpError.message);
    } else {
      console.log('✅ Signup successful:', signUpData.user?.email);
    }

    // Test 3: Try to sign in
    console.log('\n3️⃣ Testing user signin...');
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email: testEmail,
      password: testPassword
    });

    if (signInError) {
      console.log('❌ Signin failed:', signInError.message);
    } else {
      console.log('✅ Signin successful:', signInData.user?.email);
    }

    // Test 4: Check if user record was created
    console.log('\n4️⃣ Testing user record creation...');
    if (signInData?.user) {
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', signInData.user.id)
        .single();

      if (userError) {
        console.log('❌ User record not found:', userError.message);
      } else {
        console.log('✅ User record found:', userData.display_name);
      }
    }

    // Test 5: Clean up test user
    console.log('\n5️⃣ Cleaning up test user...');
    if (signInData?.user) {
      const { error: deleteError } = await supabase.auth.admin.deleteUser(signInData.user.id);
      if (deleteError) {
        console.log('⚠️ Could not delete test user:', deleteError.message);
      } else {
        console.log('✅ Test user cleaned up');
      }
    }

  } catch (error) {
    console.log('❌ Test failed with error:', error.message);
  }

  console.log('\n🎉 Authentication test completed!');
}

// Run the test
testAuth();
