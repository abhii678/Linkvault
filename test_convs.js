// test_convs.js
const fs = require('fs');
const path = require('path');

function loadEnv() {
  try {
    const envPath = path.resolve('.env.local');
    if (!fs.existsSync(envPath)) return;
    const content = fs.readFileSync(envPath, 'utf8');
    content.split('\n').forEach(line => {
      const parts = line.split('=');
      if (parts.length >= 2) {
        const key = parts[0].trim();
        const value = parts.slice(1).join('=').trim();
        process.env[key] = value;
      }
    });
  } catch (e) {
    console.error('Error loading .env.local file:', e);
  }
}

async function runTest() {
  loadEnv();
  const token = process.env.USER_ACCESS_TOKEN;
  if (!token) {
    console.error('USER_ACCESS_TOKEN missing');
    return;
  }

  console.log('Fetching Facebook Pages...');
  const pagesRes = await fetch(`https://graph.facebook.com/v21.0/me/accounts?access_token=${token}`);
  const pagesData = await pagesRes.json();
  const page = pagesData.data?.[0];

  if (!page) {
    console.error('No pages found:', pagesData);
    return;
  }

  console.log(`Using Page: ${page.name} (${page.id})`);
  const pageToken = page.access_token;

  // Get IG Account ID
  const igRes = await fetch(`https://graph.facebook.com/v21.0/${page.id}?fields=instagram_business_account&access_token=${pageToken}`);
  const igData = await igRes.json();
  const igId = igData.instagram_business_account?.id;

  console.log(`Instagram Business Account ID: ${igId}`);

  if (igId) {
    console.log('\n--- FETCHING INSTAGRAM ACCOUNT DETAILS ---');
    const profileRes = await fetch(`https://graph.facebook.com/v21.0/${igId}?fields=username,name,profile_picture_url&access_token=${pageToken}`);
    const profileData = await profileRes.json();
    console.log('Instagram Profile Data:', JSON.stringify(profileData, null, 2));
  }

  console.log('\n--- FETCHING CONVERSATIONS ---');
  const res = await fetch(
    `https://graph.facebook.com/v21.0/${page.id}/conversations?platform=instagram&fields=id,updated_time,messages.limit(5){message,from,created_time}&access_token=${pageToken}`
  );
  const data = await res.json();
  console.log('Conversations Result:', JSON.stringify(data, null, 2));
}

runTest();
