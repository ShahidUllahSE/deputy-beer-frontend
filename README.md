# Deputy Beer UTC Campaign

A web application for the Deputy Beer UTC campaign where consumers can scan and upload QR codes from Deputy Beer crowns to enter a contest to win a trip to the Caribbean's biggest music festivals.

## Features

- **Landing Page**: Hero section with campaign headline
- **QR Code Scanning**: 4 QR code fields with scan and upload functionality
- **User Authentication**: Sign up and sign in functionality
- **Validation**: Ensures all 4 QR codes are scanned before submission
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Requirements

- Node.js 18+ 
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. Copy font files to the `public` directory (Manrope font family)

3. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5174`

## Project Structure

```
deputy-beer-app/
├── src/
│   ├── components/          # Reusable components
│   │   ├── QRCodeField/    # QR code input field component
│   │   └── QRScanner/      # QR code scanner component
│   ├── pages/              # Page components
│   │   ├── LandingPage/    # Main landing page
│   │   ├── SignUp/         # Registration page
│   │   └── SignIn/         # Login page
│   ├── redux/              # Redux store and slices
│   ├── routes/             # Route configuration
│   └── utils/              # Utility functions
│       └── qrExtractor.ts  # QR code extraction logic
├── public/                 # Static assets
└── package.json
```

## Campaign Rules

- Users must register an account to participate
- Each entry requires 4 QR codes from Deputy Beer crowns
- All 4 QR codes must be scanned/uploaded before submission
- 1 entry = 4 crowns
- +10 winners announced every week

## Backend Integration

The frontend is ready for backend integration. You'll need to:

1. Update API endpoints in service files (when created)
2. Replace mock authentication with real API calls
3. Implement QR code validation against the 6,000 QR code database
4. Add entry submission endpoint

## Technologies Used

- React 19
- TypeScript
- Vite
- Redux Toolkit
- React Hook Form + Yup
- Styled Components
- jsQR (QR code scanning)
- React Router
- React Toastify
