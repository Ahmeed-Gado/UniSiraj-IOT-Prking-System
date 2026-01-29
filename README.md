# UniSiraj Smart Parking System

Professional animated web application for real-time IoT parking management with Firebase integration.

## 🚀 Features

- **Real-time Updates**: Live parking availability with 1-3 second latency
- **Interactive Dashboard**: Animated parking map with visual status indicators
- **Admin Panel**: Complete management system with manual overrides and logging
- **Analytics**: Usage insights and occupancy trends
- **Demo Mode**: Simulated data for presentations and testing
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 📋 Prerequisites

- Node.js 18+ and npm
- Firebase account
- (Optional) ESP32 microcontroller with ultrasonic sensors for hardware integration

## 🛠️ Installation

### 1. Clone and Install Dependencies

```bash
cd "d:\project smart parking"
npm install
```

### 2. Firebase Setup

#### Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name: `unisiraj-smart-parking`
4. Disable Google Analytics (optional)
5. Click "Create project"

#### Enable Firestore Database

1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in production mode"
4. Select a location (e.g., `asia-southeast1`)
5. Click "Enable"

#### Enable Authentication

1. Go to "Authentication" in Firebase Console
2. Click "Get started"
3. Enable "Email/Password" sign-in method
4. Add your admin user:
   - Email: `GADO21774@GMAIL.COM`
   - Password: `Parking123#`

#### Get Firebase Configuration

1. Go to Project Settings (gear icon)
2. Scroll to "Your apps" section
3. Click the web icon (`</>`)
4. Register app with nickname: `unisiraj-parking-web`
5. Copy the `firebaseConfig` object

### 3. Environment Variables

Create a `.env.local` file in the project root:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

ADMIN_EMAIL=GADO21774@GMAIL.COM
ADMIN_PASSWORD=Parking123#
```

### 4. Initialize Database

The database will be automatically initialized when you first visit the website. The system will create 5 parking slots (A1-A5) in Firestore.

## 🏃 Running the Application

### Development Mode

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## 📱 Usage

### Public Website

- **Landing Page**: `/` - View system overview and statistics
- **Live Parking**: `/parking` - Real-time parking availability dashboard
- **About**: `/about` - Project information and tech stack
- **Contact**: `/contact` - Contact form and project details

### Admin Panel

1. Navigate to `/admin/login`
2. Sign in with admin credentials
3. Access admin features:
   - **Dashboard**: Overview of parking system
   - **Slot Management**: Manual override of slot status
   - **Devices**: Monitor ESP32 device status
   - **Logs**: View all activity logs
   - **Analytics**: Usage insights and trends

### Demo Mode

Toggle "Demo Mode" on the Live Parking page to simulate sensor data for presentations. The system will randomly change slot statuses every 5-10 seconds.

## 🔌 ESP32 Integration

### Hardware Setup

1. **Components Needed**:
   - ESP32 Development Board
   - HC-SR04 Ultrasonic Sensors (5x)
   - Jumper wires
   - Power supply

2. **Wiring** (for each sensor):
   - VCC → 5V
   - GND → GND
   - TRIG → GPIO pin (e.g., GPIO 5, 18, 19, 21, 22)
   - ECHO → GPIO pin (e.g., GPIO 23, 25, 26, 27, 32)

### ESP32 Code Example

```cpp
#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";
const char* serverUrl = "https://your-app-url.vercel.app/api/slots/update";

// Sensor pins for slot A1
const int trigPin = 5;
const int echoPin = 23;

void setup() {
  Serial.begin(115200);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("WiFi connected");
}

void loop() {
  // Measure distance
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  
  long duration = pulseIn(echoPin, HIGH);
  int distance = duration * 0.034 / 2;
  
  // Determine status (adjust threshold as needed)
  String status = (distance < 50) ? "occupied" : "available";
  
  // Send to server
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(serverUrl);
    http.addHeader("Content-Type", "application/json");
    
    String payload = "{\"slotId\":\"A1\",\"status\":\"" + status + "\",\"sensorId\":\"ESP32_01\"}";
    int httpCode = http.POST(payload);
    
    if (httpCode > 0) {
      Serial.println("Update sent: " + status);
    }
    http.end();
  }
  
  delay(3000); // Update every 3 seconds
}
```

### API Endpoint

**POST** `/api/slots/update`

```json
{
  "slotId": "A1",
  "status": "available",
  "sensorId": "ESP32_01"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Slot A1 updated to available"
}
```

## 🚀 Deployment

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Add environment variables in Vercel dashboard

### Firebase Deployment

Firebase is already hosted in the cloud. No additional deployment needed for the database.

## 📊 Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Charts**: Recharts
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📝 Project Structure

```
d:\project smart parking\
├── app/                    # Next.js app directory
│   ├── admin/             # Admin panel pages
│   ├── api/               # API routes
│   ├── parking/           # Live parking page
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── layout/           # Layout components
│   ├── landing/          # Landing page components
│   ├── parking/          # Parking dashboard components
│   └── admin/            # Admin components
├── lib/                   # Utilities and configurations
│   ├── firebase/         # Firebase setup
│   ├── hooks/            # Custom React hooks
│   └── utils/            # Utility functions
└── public/               # Static assets

```

## 🎓 Academic Information

- **University**: Tiankiu Syed Sirajuddin International Islamic University (UniSiraj)
- **Project Type**: Final Year Project
- **Year**: 2026
- **Category**: IoT & Smart Systems

## 📧 Contact

- **Email**: GADO21774@GMAIL.COM
- **Project**: UniSiraj Smart Parking System

## 📄 License

This project is created for academic purposes as a Final Year Project.

---

Built with ❤️ for UniSiraj
