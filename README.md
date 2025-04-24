# 🐶 Tail Buddys – Frontend (React)

Tail Buddys – A responsive and dynamic React-based UI for the ultimate dog-matching experience. Features include profile management, park discovery, real-time chat, Google-based login, and AI-driven bot interactions.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)

## Features

- 🔐 Login/register via email or Google OAuth
- 🐾 Add and manage dog profiles, including image galleries
- 📍 Browse and like parks using Google Maps + Places Autocomplete
- ❤️ Tinder-style dog matching interface
- 💬 Real-time SignalR-based chat with typing indicators and bot replies
- 🤖 AI-powered messages when chatting with bot dogs
- 🔔 Notification banners for unread messages or new matches
- 🖼 Upload and manage multiple images per dog or park
- 🗂 LocalStorage-based state management for filters and session
- 🛠 Admin dashboard for editing/deleting parks, users, and dogs

## Technologies Used

- React  
- React Router  
- Axios  
- Material UI  
- SignalR Client  
- Google Maps JavaScript API  
- Google Places Autocomplete  
- Context API + Custom Hooks  
- LocalStorage  
- Form validation with custom logic  
- Responsive design  

## Installation

```bash
git clone https://github.com/TailBuddys/tail-buddys-react.git
cd tail-buddys-react
npm install

```
## Execution

```bash
npm start
```

Folder Structure
```
/pages – Main routes: Home, Match, Chat, Profile, Admin

/components – Shared reusable UI components

/services – Axios-based API wrappers

/hooks – Custom logic for dogs, parks, and chat

/providers – Global contexts (auth, snackbar, alert)

/forms – Controlled forms with validation

/images – UI and logic for uploading, sorting, deleting images
```

Admin Access
```
Use these credentials to log in as an admin:

Username: admin@tail.buddy
Password: Tail1234!
Admin Capabilities
Edit or delete parks

Delete users and dogs

Manage park metadata and image galleries
```
