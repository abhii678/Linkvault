# DM Vault 🔗
A premium Instagram DM Resource Organizer built with Next.js 14, TypeScript, and Tailwind CSS.

## Getting Started

### 1. Set Up Meta Developer App
1. Go to the [Meta for Developers Portal](https://developers.facebook.com/) and register as a developer.
2. Create a new App, select **Other** -> **Consumer** (or appropriate type that supports Instagram Basic Display / Messenger API).
3. Set up **Instagram Basic Display**:
   - Go to App Settings -> Basic. Scroll down, click **Add Platform**, select **Website**, and enter `http://localhost:3000`.
   - Go to **Instagram Basic Display** -> **Basic Display** (on the left menu) and create a new Instagram App.
   - Set the Redirect URIs, Deauthorize Callback URIs, and Data Deletion Request URIs to:
     `http://localhost:3000/api/auth/callback`
   - Under the Roles tab, add your own Instagram account as an **Instagram Test User**.

### 2. Configure Environment Variables
Copy `.env.local.example` to `.env.local`:
```bash
cp .env.local.example .env.local
```
Fill in the credentials from your Meta Developer App:
- `INSTAGRAM_APP_ID`: Your Instagram App ID.
- `INSTAGRAM_APP_SECRET`: Your Instagram App Secret.
- `REDIRECT_URI`: `http://localhost:3000/api/auth/callback`
- `WEBHOOK_VERIFY_TOKEN`: Any random secure string of your choice.

### 3. Running Webhooks Locally (ngrok)
To receive real-time webhook updates from Instagram, Meta needs a public HTTPS URL:
1. Start ngrok in a separate terminal:
   ```bash
   ngrok http 3000
   ```
2. Copy the generated HTTPS forwarding URL (e.g., `https://xxxx.ngrok-free.app`).
3. Set up a Webhook in the Meta Developer Console pointing to `https://xxxx.ngrok-free.app/api/webhooks`.
4. Enter the same `WEBHOOK_VERIFY_TOKEN` you set in `.env.local` to complete the verification step.

### 4. Run Development Server
```bash
npm run dev
```

### 5. Perform OAuth Login
1. Open your browser and navigate to `http://localhost:3000`.
2. Click the **Connect Instagram** button.
3. Authorize the application.
4. After redirecting back, inspect your development server console logs to find the access tokens. Copy the **Long-Lived Token** and save it as `USER_ACCESS_TOKEN` in your `.env.local` file to start pulling real DMs.
