# Social-Connect-App-MAD
Social Connect App Implementation
Develop a comprehensive React Native social media application with a Firebase backend. The app will feature user relationship management (follow/unfollow), real-time messaging, post creation/editing/deletion with media, robust navigation, profile management, and push notifications.

Proposed Tech Stack
Framework: React Native (CLI or Expo Development Build)
Navigation: React Navigation (Bottom Tabs + Native Stack)
Backend (BaaS): Firebase (Auth, Firestore, Storage, Cloud Messaging)
State Management: Context API or Redux Toolkit
Media: react-native-image-picker (as requested)
UI: Custom components with standard StyleSheet & reanimated for smooth transitions.
Data Schema (Firestore)
Users: uid, displayName, email, bio, photoURL, following (array of UIDs), followers (array of UIDs), fcmToken.
Posts: postId, userId, textContent, imageUrl, createdAt.
Messages: messageId, participants (array of 2 UIDs), senderId, text, createdAt.
Phase Breakdown
Phase 1: Setup & Base Architecture
Scaffold the React Native project inside C:\Users\HASHIR\.gemini\antigravity\scratch\SocialConnectApp.
Integrate Firebase environment settings.
Implement Authentication (Login/Register).
Set up React Navigation (Home, Search, Messages, Profile).
Phase 2: Profiles & Navigation
Implement the Bottom Tab Navigator.
Profile Screen: View and edit profile info (bio, name).
Integrate react-native-image-picker for profile picture updates; upload to Firebase Storage.
Phase 3: Posts & Feed
Implement Post Creation with text and conditional image upload.
Build the Home Feed using an optimized FlatList.
Add functionality to edit and delete existing posts.
Phase 4: Social & Messaging
Implement the Follow/Unfollow toggle on user profiles.
Build the Search feature with Firestore queries to find users and posts.
Build the 1-on-1 basic messaging system with real-time listeners.
Phase 5: Push Notifications & Performance
Optimize heavy lists.
Set up Firebase Cloud Messaging (FCM) to trigger alerts for likes/comments/messages.
User Review Required
IMPORTANT

The requirements mention react-native-image-picker and FCM push notifications. These require native modules. The two paths forward are:

React Native CLI (npx react-native init): Traditional setup, full native control.
Expo with Development Builds: Faster setup, but we use expo prebuild to compile native libraries.
I recommend the React Native CLI route to strictly adhere to your requested libraries without configuration plugin overhead, but let me know your preference.

WARNING

Firebase Credentials: To establish the database, auth, and push notifications, we will need connection config. I can scaffold the app using dummy/mock configurations, but for the fully working app, we will eventually need you to create a project at Firebase Console and provide the google-services.json and web configuration details.
