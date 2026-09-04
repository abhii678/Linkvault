# Meta App Review Verification Audit

This audit evaluates the DM Vault codebase against Meta's App Review requirements, security standards, and UX best practices.

## 1. Requested Permissions and API Scopes
**Detected Meta API Calls:**
- `GET https://graph.instagram.com/v21.0/me?fields=user_id,username,name`
- `GET https://graph.instagram.com/v21.0/{user_id}/conversations?platform=instagram&fields=id,updated_time,messages.limit(25)...`

**Requested Scopes (in `/api/auth/login`):**
- `instagram_business_basic` (Required to read the user's profile)
- `instagram_business_manage_messages` (Required to fetch DM threads and messages)

> [!CAUTION]
> Ensure both `instagram_business_basic` and `instagram_business_manage_messages` are explicitly added to your App Review submission. Without both, the OAuth flow will succeed but the API calls will fail.

## 2. Security & Vulnerability Check
**App Secret Hardcoding:**
- ✅ **Pass:** `INSTAGRAM_APP_SECRET` is correctly read from environment variables (`process.env.INSTAGRAM_APP_SECRET`) in `/app/api/auth/callback/route.ts` and is not exposed to the client.
- ✅ **Pass:** The Next.js frontend code does not include any embedded Meta App Secrets.

**Token Storage & Data Privacy:**
- ⚠️ **Warning (Multi-tenant SaaS Issue):** The current OAuth callback (`/app/api/auth/callback/route.ts`) logs the generated access token to the backend server console instead of saving it to a database associated with a user session. 
- **Impact for App Review:** A Meta reviewer testing your app will log in, but since their token isn't persisted for their session, the app will continue to read the `USER_ACCESS_TOKEN` hardcoded in your `.env.local` (which belongs to your test account). The reviewer will see *your* DMs (or fail to see theirs), which might cause the review to be rejected.
- **Fix Required before launch:** Implement a database (like Supabase or Postgres) or use secure cookies to store the token for the specific user who just logged in.

## 3. OAuth Flow, Deauthorization, and Data Deletion
- ✅ **Login Flow:** The `/api/auth/login` route successfully redirects to Meta's authorization dialog.
- ✅ **Callback:** The `/api/auth/callback` route successfully exchanges the authorization code for short-lived and long-lived tokens.
- ✅ **Data Deletion Instructions:** The `/data-deletion` page clearly outlines the manual steps to revoke access via Instagram settings.
- ⚠️ **Missing Deauthorization Callback URL:** Meta requires you to provide a "Deauthorize Callback URL" in your App Settings. If a user deletes the app via Instagram, Meta pings this URL. Currently, there is no `/api/deauth` route to handle this ping. (Though providing instructions in `/data-deletion` is sometimes sufficient for basic apps, having a webhook handler is best practice).

## 4. API Error States and UI Fallbacks
- ⚠️ **Warning:** In `lib/instagram.ts`, if the API fails (e.g., the token expires, or the user revokes permissions), the backend catches the error and simply returns `[]` (an empty array of resources).
- **Impact:** The frontend will just display "Your resources will appear here..." instead of a helpful error message like "Your Instagram connection expired. Please reconnect."
- **Fix Required:** Update `lib/instagram.ts` to throw specific errors (e.g., `TokenExpiredError`), and have the UI catch them to show a "Reconnect Instagram" button.

---

## 5. Screencast Recording Instructions for Meta App Review

Meta requires a screencast showing exactly how their API is used in your app. Follow these steps when recording your video:

1. **Start at your Landing Page:** Show the `https://your-domain.com` homepage.
2. **Show the Login Button:** Clearly explain: *"Here is the 'Connect Instagram' button where users initiate the OAuth flow."*
3. **Record the OAuth Dialog:** Click the button. Ensure the URL bar of the popup is visible, showing the Facebook/Instagram login domain and your App ID.
4. **Accept Permissions:** Click through the permission screens, explicitly showing the request for "Access your Instagram Direct Messages".
5. **Show the Result:** Once redirected back to your dashboard, show how the app extracts links from the DMs and displays them.
6. **Explain the Value:** Briefly state: *"The app uses the `instagram_business_manage_messages` permission strictly to scan the user's own DMs to extract and save URLs/resources, helping them manage links shared with them."*

> [!TIP]
> Keep the video under 2 minutes. Do not include background music. Speak clearly in English, or add English subtitles, describing exactly how the requested permissions translate to the features shown on screen.
