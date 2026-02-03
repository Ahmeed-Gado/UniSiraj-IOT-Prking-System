#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <ESP32Servo.h>
#include <WiFi.h>
#include <HTTPClient.h>

// ================= WIFI & SERVER =================
// IMPORTANT: Replace these with your actual WiFi credentials!
const char* ssid = "Galaxy Note10+7f68";  // <-- CHANGE THIS
const char* password = "Daddy Pls";  // <-- CHANGE THIS

// Firebase Realtime Database URL
// TODO: Replace with your actual RTDB URL from Firebase Console
// Format: https://unisiraj-parking-2026-default-rtdb.firebaseio.com/
const char* firebaseHost = "https://unisiraj-parking-2026-default-rtdb.firebaseio.com";
const String sensorDeviceId = "ESP32_MAIN_UNIT";

// ================= LCD =================
LiquidCrystal_I2C lcd(0x27, 20, 4);  // I2C address 0x27, 20x4

// ================= SERVO =================
Servo gateServo;
const int SERVO_PIN = 13;

const int CLOSE_ANGLE = 10;   // adjust (0..20)
const int OPEN_ANGLE  = 90;   // gate open 90 degrees

bool gateIsOpen = false;
unsigned long gateOpenedAt = 0;

// Faster close timing
const unsigned long GATE_OPEN_TIME_MS = 2000;

// ================= IR SENSOR PINS =================
const int GATE_IN_PIN  = 16;
const int GATE_OUT_PIN = 17;
const int SLOT_PINS[5] = {25, 26, 27, 32, 33};
const String SLOT_IDS[5] = {"A1", "A2", "A3", "A4", "A5"};

// ================= SENSOR LOGIC =================
bool isDetected(int pin) {
  return digitalRead(pin) == LOW;
}

const int STABLE_READS = 2;  // Reduced for faster response
const int READ_DELAY_MS = 10;  // Reduced delay

bool stableDetected(int pin) {
  int count = 0;
  for (int i = 0; i < STABLE_READS; i++) {
    if (isDetected(pin)) count++;
    delay(READ_DELAY_MS);
  }
  return (count == STABLE_READS);
}

// Simple detection without stability check (for debugging)
bool quickDetect(int pin) {
  return digitalRead(pin) == LOW;
}

// ================= STATE =================
bool slotOccupied[5] = {false, false, false, false, false};
String lastWebStatus[5] = {"unknown", "unknown", "unknown", "unknown", "unknown"};
int availableSlots = 5;

bool lastGateInDetected  = false;
bool lastGateOutDetected = false;

unsigned long msgUntil = 0;
String msgLine2 = "";
String msgLine3 = "";

unsigned long lastHeartbeat = 0;
const unsigned long HEARTBEAT_INTERVAL = 5000;

// ================= WEB SYNC (Firebase RTDB) =================
void sendStatusUpdate(String slotId, String status) {
  if (WiFi.status() != WL_CONNECTED) return;
  
  HTTPClient http;
  
  // Build RTDB REST API URL: /slots/A1.json
  String url = String(firebaseHost) + "/slots/" + slotId + ".json";
  
  http.begin(url);
  http.addHeader("Content-Type", "application/json");
  
  // Create simplified payload for RTDB
  String payload = "{";
  payload += "\"status\":\"" + status + "\",";
  payload += "\"sensorId\":\"" + sensorDeviceId + "\",";
  payload += "\"lastUpdated\":" + String(millis());
  payload += "}";
  
  // Use PUT to replace entire slot data (or PATCH to update fields)
  int httpCode = http.PUT(payload);
  
  if (httpCode > 0) {
    Serial.printf("RTDB Sync %s: %s (Code: %d)\n", slotId.c_str(), status.c_str(), httpCode);
    if (httpCode == 200) {
      String response = http.getString();
      Serial.printf("Response: %s\n", response.c_str());
    }
  } else {
    Serial.printf("RTDB Error %s: %d\n", slotId.c_str(), httpCode);
  }
  http.end();
}

// ================= SERVO HELPERS =================
void smoothMove(int from, int to) {
  const int step = 5;  // Increased from 3 for faster movement
  const int d = 3;     // Reduced from 6 for faster movement

  if (from < to) {
    for (int a = from; a <= to; a += step) {
      gateServo.write(a);
      delay(d);
    }
  } else {
    for (int a = from; a >= to; a -= step) {
      gateServo.write(a);
      delay(d);
    }
  }
  gateServo.write(to);
}

void openGate() {
  Serial.println("Opening gate...");
  smoothMove(CLOSE_ANGLE, OPEN_ANGLE);
  gateIsOpen = true;
  gateOpenedAt = millis();
  Serial.println("Gate OPEN");
}

void closeGate() {
  Serial.println("Closing gate...");
  smoothMove(OPEN_ANGLE, CLOSE_ANGLE);
  gateIsOpen = false;
  Serial.println("Gate CLOSED");
}

// ================= SLOT UPDATE =================
void updateSlots() {
  int freeCount = 0;

  for (int i = 0; i < 5; i++) {
    bool detected = stableDetected(SLOT_PINS[i]);
    slotOccupied[i] = detected;
    if (!slotOccupied[i]) freeCount++;

    String currentStatus = detected ? "occupied" : "available";
    
    // Send to web if status changed OR heartbeat interval reached
    if (currentStatus != lastWebStatus[i] || (millis() - lastHeartbeat >= HEARTBEAT_INTERVAL)) {
      sendStatusUpdate(SLOT_IDS[i], currentStatus);
      lastWebStatus[i] = currentStatus;
    }
  }

  if (millis() - lastHeartbeat >= HEARTBEAT_INTERVAL) {
    lastHeartbeat = millis();
  }

  availableSlots = freeCount;
}

String freeSlotsString() {
  String s = "Free:";
  bool any = false;

  for (int i = 0; i < 5; i++) {
    if (!slotOccupied[i]) {
      s += " ";
      s += String(i + 1);
      any = true;
    }
  }
  if (!any) s += " none";
  return s;
}

void showTempMessage(String l2, String l3, unsigned long durationMs) {
  msgLine2 = l2;
  msgLine3 = l3;
  msgUntil = millis() + durationMs;
}

// ================= LCD DISPLAY =================
void displayLCD() {
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Smart Parking 5");
  lcd.setCursor(14, 0);
  lcd.print("A:");
  lcd.print(availableSlots);

  if (millis() < msgUntil) {
    lcd.setCursor(0, 1);
    lcd.print("** NOTICE **");
    lcd.setCursor(0, 2);
    lcd.print(msgLine2.substring(0, 20));
    lcd.setCursor(0, 3);
    lcd.print(msgLine3.substring(0, 20));
    return;
  }

  lcd.setCursor(0, 1);
  lcd.print("S1:"); lcd.print(slotOccupied[0] ? "Occ " : "Free");
  lcd.setCursor(10, 1);
  lcd.print("S2:"); lcd.print(slotOccupied[1] ? "Occ " : "Free");

  lcd.setCursor(0, 2);
  lcd.print("S3:"); lcd.print(slotOccupied[2] ? "Occ " : "Free");
  lcd.setCursor(10, 2);
  lcd.print("S4:"); lcd.print(slotOccupied[3] ? "Occ " : "Free");

  lcd.setCursor(0, 3);
  lcd.print("S5:"); lcd.print(slotOccupied[4] ? "Occ " : "Free");

  lcd.setCursor(10, 3);
  if (availableSlots == 0) {
    lcd.print("PARKING FULL");
  } else {
    String shortList = "";
    for (int i = 0; i < 5; i++) {
        if (!slotOccupied[i]) {
            if (shortList.length() > 0) shortList += " ";
            shortList += String(i + 1);
        }
    }
    lcd.print("Free ");
    lcd.print(shortList.substring(0, 7));
  }
}

// ================= GATE LOGIC =================
void handleGateLogic() {
  // Read sensors directly for better responsiveness
  bool gateInNow  = (digitalRead(GATE_IN_PIN) == LOW);
  bool gateOutNow = (digitalRead(GATE_OUT_PIN) == LOW);

  // Detect rising edge (sensor just triggered)
  bool gateInRising  = (gateInNow && !lastGateInDetected);
  bool gateOutRising = (gateOutNow && !lastGateOutDetected);

  // Update state
  lastGateInDetected  = gateInNow;
  lastGateOutDetected = gateOutNow;

  // Handle EXIT sensor (always allow exit)
  if (gateOutRising) {
    Serial.println("\n=== EXIT SENSOR TRIGGERED ===");
    showTempMessage("Exit detected", "Gate opening...", 1200);
    openGate();
  }

  // Handle ENTRY sensor (check available slots)
  if (gateInRising) {
    Serial.printf("\n=== ENTRY SENSOR TRIGGERED === (Available: %d)\n", availableSlots);
    if (availableSlots > 0) {
      showTempMessage("Welcome!", freeSlotsString(), 1500);
      openGate();
    } else {
      showTempMessage("SORRY PARKING FULL", "Try later", 2200);
    }
  }

  // Auto-close gate after timeout
  if (gateIsOpen && (millis() - gateOpenedAt >= GATE_OPEN_TIME_MS)) {
    Serial.println("Auto-closing gate (timeout)");
    closeGate();
  }
}

// ================= SETUP/LOOP =================
void setup() {
  Serial.begin(115200);
  delay(1000);
  Serial.println("\n\n=== UniSiraj Smart Parking System ===");
  Serial.println("Initializing...");

  pinMode(GATE_IN_PIN, INPUT_PULLUP);
  pinMode(GATE_OUT_PIN, INPUT_PULLUP);
  for (int i = 0; i < 5; i++) pinMode(SLOT_PINS[i], INPUT_PULLUP);
  Serial.println("Sensors initialized");

  Wire.begin(21, 22);
  lcd.init();
  lcd.backlight();
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Connecting WiFi...");
  Serial.println("LCD initialized");

  Serial.printf("Connecting to WiFi: %s\n", ssid);
  WiFi.begin(ssid, password);
  
  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 40) {
    delay(500);
    Serial.print(".");
    attempts++;
  }
  
  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\nWiFi Connected!");
    Serial.print("IP Address: ");
    Serial.println(WiFi.localIP());
    Serial.printf("Server URL: %s\n", serverUrl);
    
    lcd.clear();
    lcd.print("WiFi: Connected");
    lcd.setCursor(0, 1);
    lcd.print(WiFi.localIP());
    delay(2000);
  } else {
    Serial.println("\nWiFi Connection FAILED!");
    Serial.println("Check your SSID and password!");
    lcd.clear();
    lcd.print("WiFi FAILED!");
    lcd.setCursor(0, 1);
    lcd.print("Check credentials");
  }

  lcd.clear();
  lcd.print("System Online");

  delay(800);
  gateServo.setPeriodHertz(50);
  gateServo.attach(SERVO_PIN, 500, 2400);
  gateServo.write(CLOSE_ANGLE);
  Serial.printf("Servo initialized on pin %d\n", SERVO_PIN);
  delay(400);

  msgUntil = 0;
  lastHeartbeat = millis();
  
  Serial.println("\n=== System Ready ===");
  Serial.println("Monitoring sensors...");
  Serial.printf("Gate IN: GPIO %d, Gate OUT: GPIO %d\n", GATE_IN_PIN, GATE_OUT_PIN);
  Serial.println("Slot pins: 25, 26, 27, 32, 33");
}

void loop() {
  updateSlots();
  handleGateLogic();
  displayLCD();

  delay(200);
}
