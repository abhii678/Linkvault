// debug_meta.js
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

async function debug() {
  loadEnv();
  const token = process.env.USER_ACCESS_TOKEN;
  const appId = process.env.INSTAGRAM_APP_ID;
  const appSecret = process.env.INSTAGRAM_APP_SECRET;

  if (!token) {
    console.error('Error: USER_ACCESS_TOKEN is missing in .env.local');
    return;
  }

  console.log('Testing USER_ACCESS_TOKEN:', token.substring(0, 15) + '...');

  try {
    // 1. Debug the token to see what permissions are active
    if (appId && appSecret) {
      console.log('Debugging token permissions via Meta API...');
      const debugUrl = `https://graph.facebook.com/debug_token?input_token=${token}&access_token=${appId}|${appSecret}`;
      const debugRes = await fetch(debugUrl);
      if (debugRes.ok) {
        const debugData = await debugRes.json();
        console.log('\n--- Token Debug Info ---');
        console.log('App ID:', debugData.data?.app_id);
        console.log('Is Valid:', debugData.data?.is_valid);
        console.log('Scopes/Permissions:', debugData.data?.scopes);
        console.log('------------------------\n');
      } else {
        console.warn('Could not debug token permissions (app_id/secret might be invalid).');
      }
    }

    // 2. Fetch Pages
    const pagesUrl = `https://graph.facebook.com/v18.0/me/accounts?access_token=${token}`;
    const pagesRes = await fetch(pagesUrl);
    if (!pagesRes.ok) {
      console.error('Failed to fetch Pages:', await pagesRes.text());
      return;
    }

    const pagesData = await pagesRes.json();
    const pages = pagesData.data || [];
    console.log(`Found ${pages.length} Facebook Pages:`);

    for (const page of pages) {
      console.log(`- Page Name: ${page.name} (ID: ${page.id})`);
      
      const igUrl = `https://graph.facebook.com/v18.0/${page.id}?fields=instagram_business_account{id,username}&access_token=${page.access_token}`;
      const igRes = await fetch(igUrl);
      if (igRes.ok) {
        const igData = await igRes.json();
        if (igData.instagram_business_account) {
          console.log(`  -> Connected Instagram Account ID: ${igData.instagram_business_account.id}`);
        } else {
          console.log(`  -> No connected Instagram account found on this Page.`);
        }
      } else {
        console.error(`  -> Failed to check Instagram account:`, await igRes.text());
      }
    }
  } catch (err) {
    console.error('Debug script error:', err);
  }
}

debug();
