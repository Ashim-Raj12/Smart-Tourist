# Smart Tourist Safety System

A comprehensive MERN stack application designed to enhance tourist safety through real-time geo-fencing, AI-powered chatbot assistance, and emergency response features.

## Overview

The Smart Tourist Safety System is a web application that helps tourists stay safe while exploring new destinations. It provides real-time zone monitoring (safe, moderate, danger), emergency contact management, AI chatbot support, and interactive mapping features.

## Features

### Core Functionality
- **User Authentication**: Secure registration and login with JWT tokens
- **Real-time Zone Monitoring**: Live tracking of tourist location with zone classification
- **Interactive Map**: Leaflet-based map displaying safe (green), moderate (yellow), and danger (red) zones
- **Emergency SOS**: One-click calling to emergency contacts
- **AI Chatbot**: AI-powered chatbot for safety advice and information
- **Profile Management**: Update personal information and emergency contacts
- **Alert System**: Automatic alerts when entering risky zones

### Zone Types
- **Safe Zones**: Low-risk areas marked in green
- **Moderate Zones**: Medium-risk areas marked in yellow
- **Danger Zones**: High-risk areas marked in red

## Technology Stack

### Frontend
- **React 18**: Modern React with hooks and functional components
- **Vite**: Fast build tool and development server
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Leaflet & React-Leaflet**: Interactive mapping library
- **Axios**: HTTP client for API requests
- **Context API**: State management for authentication

### Backend
- **Node.js & Express**: Server-side JavaScript runtime and web framework
- **MongoDB & Mongoose**: NoSQL database and ODM
- **JWT**: JSON Web Tokens for authentication
- **bcryptjs**: Password hashing
- **CORS**: Cross-origin resource sharing

## Project Structure

```
smart-tourist/
├── client/                 # React frontend
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── context/       # React context for state management
│   │   ├── pages/         # Page components
│   │   ├── utils/         # Utility functions
│   │   └── assets/        # Images and icons
│   ├── package.json
│   └── vite.config.js
├── server/                 # Express backend
│   ├── config/            # Database configuration
│   ├── controllers/       # Route handlers
│   ├── middleware/        # Custom middleware
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API routes
│   ├── utils/             # Server utilities
│   ├── package.json
│   └── server.js          # Main server file
└── README.md
```

## Frontend Details

### Architecture
- **React 18** with functional components and hooks
- **Vite** for fast development and building
- **React Router DOM** for client-side routing
- **Tailwind CSS** for responsive, utility-first styling
- **Axios** for HTTP requests with JWT interceptors
- **Context API** for global state management

### Key Components
- **AppRouter**: Central routing component with protected route guards
- **Navbar**: Responsive navigation with conditional rendering based on auth state
- **Map**: Leaflet-powered interactive map with real-time GPS tracking, zone overlays (green/yellow/red), and user location markers
- **Emergency**: SOS button with direct calling functionality and emergency contact grid (Police, Fire, Ambulance, Tourist Police)
- **Chatbot**: Floating chat interface for AI-powered safety queries
- **AlertBox**: Reusable notification component with animations
- **Button**: Styled button component with hover effects
- **ProtectedRoute**: Route guard component for authentication checks
- **Footer**: Site footer with branding

### Pages
- **Home**: Gradient background landing page with app introduction and call-to-action buttons
- **Login**: Authentication form with email/password validation
- **Register**: User registration with name, email, password, and emergency contact fields
- **Map**: Full-screen map view with zone display, location tracking, and current zone status indicator
- **Emergency**: Dark-themed emergency page with prominent SOS button and contact grid
- **Profile**: Editable user profile with form inputs for name, emergency contact, and profile picture upload

### Context & State Management
- **AuthContext**: Comprehensive auth state management with:
  - User data persistence in localStorage
  - JWT token handling
  - Login/logout functions
  - User update functionality
  - Automatic token attachment to API requests

## Backend Details

### Architecture
- **Node.js & Express.js** with ES6 modules
- **MongoDB** with Mongoose ODM for data persistence
- **JWT authentication** with bcrypt password hashing
- **CORS** enabled for cross-origin requests
- **Environment-based configuration** with dotenv
- **Modular structure** with separate controllers, models, routes, and middleware

### API Endpoints

#### Authentication (`/api/auth`)
- `POST /register`: User registration with validation, password hashing, and blockchain-like ID generation
- `POST /login`: User authentication with JWT token generation
- `GET /profile`: Retrieve authenticated user's profile data (JWT protected)
- `PUT /profile`: Update user profile fields (name, emergencyContact, profilePic) (JWT protected)

#### Zones (`/api/zones`)
- `GET /`: Fetch all geographic zones from database
- `POST /check`: Determine user's current zone based on latitude/longitude coordinates with priority handling (danger > moderate > safe)

#### Alerts (`/api/alerts`)
- `POST /log`: Log alerts when users enter risky zones

#### Chatbot (`/api/chatbot`)
- `POST /ask`: Process user queries through AI chatbot for safety advice

#### ID Management (`/api/id`)
- Blockchain-like unique identifier generation and management

### Database Models

#### User Model
- **Fields**: name, email, password (hashed), emergencyContact, blockchainId (SHA-256 hash), profilePic
- **Validation**: Required fields for registration, unique email constraint
- **Timestamps**: Automatic createdAt/updatedAt tracking

#### Zone Model
- **Fields**: lat, lng, radius, type (enum: 'safe', 'moderate', 'danger')
- **Validation**: Required geographic coordinates and zone classification
- **Timestamps**: Automatic createdAt/updatedAt tracking

#### Alert Model
- **Fields**: zoneId, message, user association
- **Purpose**: Track zone entry alerts and notifications

#### FAQ Model
- **Fields**: question, answer
- **Purpose**: Pre-seeded knowledge base for chatbot responses

### Controllers

#### authController
- **register**: Validates input, checks for existing users, hashes passwords, generates blockchain IDs, creates JWT tokens
- **login**: Authenticates credentials, generates JWT tokens, returns user data
- **updateProfile**: Updates user fields selectively, returns updated user data

#### zoneController
- **getZones**: Retrieves all zones from database
- **checkLocation**: Calculates Haversine distance to determine zone containment with priority (danger > moderate > safe)

#### alertController
- **logAlert**: Records zone entry alerts with zone and user information

#### chatbotController
- **askQuestion**: Processes user queries, potentially using OpenAI API for responses

#### idController
- **generateId**: Creates unique blockchain-style identifiers using cryptographic hashing

### Middleware
- **authenticate**: JWT token verification middleware for protected routes
- **CORS**: Cross-origin resource sharing configuration
- **JSON parsing**: Request body parsing with 10MB limit for file uploads

### Security Features
- **JWT Authentication**: Stateless token-based auth with 1-day expiration
- **Password Hashing**: bcrypt with salt rounds for secure password storage
- **Input Validation**: Required field checks and data sanitization
- **Protected Routes**: Middleware guards for sensitive endpoints
- **CORS Configuration**: Controlled cross-origin access

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup
```bash
cd server
npm install
# Create .env file with:
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret
npm start
```

### Frontend Setup
```bash
cd client
npm install
npm run dev
```

### Environment Variables
Create a `.env` file in the server directory with:
```
MONGODB_URI=mongo-db-uri
JWT_SECRET=your_secure_jwt_secret
PORT=5000
```

## Usage

1. **Registration**: Create an account with name, email, password, and emergency contact
2. **Login**: Authenticate to access protected features
3. **Map View**: Navigate to the map to see zones and track location
4. **Emergency**: Use SOS button or contact grid for immediate help
5. **Chatbot**: Ask safety-related questions for advice
6. **Profile**: Update personal information and emergency contacts

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected routes for sensitive operations
- CORS configuration for secure API access
- Input validation and sanitization

## Future Enhancements

- PWA support for offline functionality
- Push notifications for alerts
- Integration with local emergency services
- Multi-language support
- Advanced AI features for predictive safety analysis

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes and test thoroughly
4. Submit a pull request

## License

This project is licensed under the ISC License.
