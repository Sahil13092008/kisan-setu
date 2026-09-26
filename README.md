# 🌾 Kisan Setu – Smart Procurement Scheduling & Tracking Platform
> **Smart India Hackathon 2026 (SIH 2026)**  
> **Problem Statement ID:** SIH26032  
> **Problem Statement Title:** “Kisan Setu – Smart Procurement Scheduling & Tracking Platform”  
> **Theme:** Smart Automation (Software)  
> **Team Name:** BuildBeyond  
> **Team ID:** 96572  
> **Motto:** *Kisan Se Samriddhi Tak* (किसान से समृद्धि तक • Farmers • Mandis • Better Tomorrow)

---

## 📌 Executive Overview & Alignment with Presentation

This interactive prototype is built directly from the **SIH 2026 presentation slides**, implementing the full technical architecture and addressing all three critical bottlenecks highlighted in **Slide 2**:

| Slide 2 Challenge | Technical Bottleneck in Legacy System | Kisan Setu Prototype Solution (Slide 2 & 3) |
|---|---|---|
| **01. Technical Bottlenecks** | Static servers hit 100% CPU causing 502/504 Bad Gateway errors; simultaneous Bhulekh DB queries lock rows and drop connections. | **Smart Procurement Scheduling with Redis Token Bucket & RabbitMQ queues** to buffer high concurrency; dynamic tokens distribute loads. |
| **02. Integration Gaps** | Synchronous dependency on external Aadhaar e-KYC and telecom SMS gateways causes sessions to hang indefinitely. | **Decoupled middleware** utilizing reliable offline-first verification and asynchronous transactional dispatch. |
| **03. UX & Frontend Flaws** | Bloated scripts waste bandwidth; aggressive security timeouts (2–5 mins) log farmers out mid-booking. | **Next-gen SPA architecture** optimized with edge caching (<100 KB total payload), continuous transit-state tracking, and zero session breaks. |

---

## 🚀 Key Modules Implemented

### 1. 🌾 Farmer Mobile App & Portal (Responsive PWA)
- **Simulated Aadhaar e-KYC & UIDAI Verification:**
  - 1-Click Judge Demo Accounts (`Ramesh Kumar`, `Suresh Patel`, `Rajesh Verma`).
  - 6-digit OTP simulation with real-time SMS trigger.
- **Bhulekh Land Record Integration:**
  - Displays land parcel Khasra number, land holding (Hectares/Acres), and permissible procurement quota.
- **Smart Slot Booking Wizard:**
  - Mandi selection with live queue wait indicators (e.g. Rau APMC Mandi, Indore Krishi Upaj Mandi, Sanwer).
  - Crop selection (Wheat, Soybean, Chana, Mustard) with real-time quota remaining calculation.
  - Delivery date and 3-hour time window with color-coded traffic indicators.
- **Digital Gate Pass & Live Queue Tracker:**
  - Unique Token Number (e.g. `KS-RAU-108`), scannable QR Code, assigned Gate & Bay.
  - Live progress stepper: *Booked ➔ In-Transit ➔ Gate Entry ➔ Quality Check ➔ Weighbridge ➔ MSP Disbursed*.
  - **Transit Simulator:** Farmers can click *"Start Journey to Mandi"* to transmit live GPS distance and ETA to the Mandi control room.
  - Print / Save Gate Pass capability.
- **Multilingual Support:** Instant toggle between English and **हिन्दी (Hindi)**.

### 2. 🏢 Mandi Staff & Yard Operations Console
- **Live Queue Controller:**
  - *"Call Next Token"* button to advance the physical queue, notifying the farmer with sound and SMS.
  - Gate security verification and status updates.
- **Digital Quality Inspection Terminal:**
  - Interactive sliders for **Moisture Content %** (FAQ limit ≤ 12.0%) and **Foreign Matter %** (limit ≤ 0.75%).
  - Automatic grading: *Grade A (FAQ Standard)*, *Grade B (Moisture dock)*, or *Rejected*.
- **Digital Weighbridge & MSP Settlement Station:**
  - Gross Weight (Vehicle + Crop) and Tare Weight (Empty Vehicle) auto-calculates Net Weight in Quintals.
  - Government MSP Rate + State Bonus calculator (e.g. Wheat ₹2,275 + ₹125 = ₹2,400/Qtl).
  - Instant MSP payout authorization with direct PFMS DBT simulation and confetti celebration.

### 3. 🏛️ Ministry & District Administration Dashboard
- **Executive Procurement KPIs:**
  - Total Connected Mandis (48 Centers across Indore Division).
  - Metric Tonnes Procured vs Seasonal Target.
  - Total MSP Disbursed in ₹ Crores (100% direct bank credit).
  - Average Yard Waiting Time reduced from 8.5 hours to 38 minutes.
- **Mandi Congestion & Throughput Heatmap:**
  - Real-time monitoring across Rau, Indore Chhawani, Sanwer, and Depalpur.
- **Commodity Breakdown:**
  - Live distribution between Wheat, Soybean, and Chana.
- **DBT Integration Health:**
  - NPCI Aadhaar Payment Bridge & PFMS Gateway success rates.

### 4. 📱 Live Telecom SMS Gateway Simulator
- Simulated floating smartphone drawer displaying transactional SMS sent to farmers in real time:
  - OTP verification codes.
  - Token and slot confirmation passes.
  - Gate entry reminders.
  - Quality inspection grade passes.
  - Direct Benefit Transfer (DBT) bank credit notifications with reference UTR numbers.

### 5. ⚡ Technical Architecture & Concurrency Stress-Tester (For Hackathon Judges)
- Live interactive benchmark demonstrating the solution to Slide 2's bottlenecks:
  - Toggle between **Legacy Synchronous System** (demonstrating 100% CPU lockup, 504 timeouts, connection pool exhaustion) vs **Kisan Setu Decoupled Engine** (sub-50ms latency, zero dropped requests, smooth queue distribution).
  - Real-time terminal log streamer showing asynchronous worker operations.

---

## 🏃 How to Run the Prototype

### Option 1: 1-Click Desktop Launcher (Recommended)
Double-click the **`Launch-Kisan-Setu.bat`** file on your Desktop:
```
C:\Users\sisod\OneDrive\Desktop\Launch-Kisan-Setu.bat
```
This automatically starts the local HTTP server and opens `http://localhost:3000` in your default browser.

### Option 2: Direct Browser Launch (Offline Ready)
You can directly double-click or open:
```
C:\Users\sisod\OneDrive\Desktop\kisan-setu-prototype\index.html
```
in Google Chrome, Microsoft Edge, or Mozilla Firefox.

### Option 3: Terminal Command
```bash
cd "C:\Users\sisod\OneDrive\Desktop\kisan-setu-prototype"
npm start
```
Then navigate to: `http://localhost:3000`

---
*Built with ❤️ for Indian Farmers by Team BuildBeyond (SIH26032)*
