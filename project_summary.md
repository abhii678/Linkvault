# DM Vault: Project Summary & Roadmap

This document serves as a comprehensive overview of the DM Vault project, detailing the core product, the technical implementation, the challenges overcome during development, and the roadmap for launch.

---

## 1. What We Created
**DM Vault** is a personal productivity web application designed to solve the problem of valuable links and resources getting buried in Instagram Direct Message histories. 

By integrating directly with the official Meta Graph API, the app securely scans a user's Instagram DMs, extracts URLs and media links, and categorizes them into a clean, searchable dashboard. Users can easily view, save, and manage the resources shared with them without having to scroll through endless chat threads.

## 2. How We Created It
The application was built using modern web development frameworks and APIs:

*   **Tech Stack:** Next.js 14 (App Router), React, Tailwind CSS, and Lucide Icons for a responsive, "glassmorphism" UI.
*   **API Integration:** Meta Graph API (v21.0).
*   **Authentication Flow:** We implemented a custom OAuth 2.0 flow (`/api/auth/login` and `/api/auth/callback`) to securely authenticate users via Instagram and exchange short-lived access tokens for 60-day long-lived tokens.
*   **Permissions:** The app requests `instagram_business_basic` (for profile info) and `instagram_business_manage_messages` (to read the chat threads).
*   **Compliance:** We built out the necessary legal infrastructure required by Meta, including a Privacy Policy, Terms of Service, and a Data Deletion instruction page.

## 3. Recurring Issues & Roadblocks Overcome
During development, we navigated several complex technical and platform-specific hurdles:

*   **Meta API Restrictions in Dev Mode:** We discovered that standard Creator accounts (`MEDIA_CREATOR`) cannot access the messaging API. We had to switch the test account to an **Instagram Business Account**. Furthermore, we learned that Meta intentionally restricts the API to return empty data (`[]`) while the app is in Development Mode, unless configured perfectly with registered test users.
*   **OAuth Redirect Loops & Token Overwrites:** During local testing, the login flow kept triggering re-authentication, which overwrote the valid token we were testing with. We resolved this by modifying the login route to detect existing tokens in `.env.local` and bypass the OAuth redirect during testing.
*   **Next.js CORS Errors via Ngrok:** When using Ngrok to expose the local server to Meta's webhooks/callbacks, Next.js 14 blocked the requests due to cross-origin security. We fixed this by configuring `allowedDevOrigins` in `next.config.mjs`.
*   **UTF-16 File Encoding Crashes:** When generating the legal pages via Windows PowerShell, the files were saved in UTF-16 encoding. This caused Next.js to crash with a `stream did not contain valid UTF-8` error. We resolved this by writing a custom Node.js script to rewrite the files in clean UTF-8.

## 4. Pending Work (Pre-Launch Checklist)
While the core proof-of-concept is verified and working locally, the app requires architectural updates to support multiple users in production.

*   **[ ] Multi-Tenant Token Storage (Database):** Currently, the app reads a single, hardcoded access token from `.env.local`. To support real users, we need to integrate a database (e.g., Supabase, PostgreSQL, or Firebase) to securely store and retrieve unique OAuth tokens for each logged-in user session.
*   **[ ] Graceful Error Handling:** If a user's Instagram token expires or they revoke permission, the API currently swallows the error and returns an empty list. We need to update the backend to throw a specific `TokenExpiredError` and update the UI to prompt the user to "Reconnect Instagram".
*   **[ ] Deauthorization Webhook (Optional but Recommended):** Create an `/api/deauth` endpoint to handle automated pings from Meta when a user deletes the app from their Instagram settings.
*   **[ ] Meta App Review Submission:** Record a screencast demonstrating the OAuth flow and how the `instagram_business_manage_messages` permission is used to extract links, and submit the app for official Meta App Review.
