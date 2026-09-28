// Kisan Setu - Smart Procurement Scheduling & Tracking Platform
// SIH26032 | Team: BuildBeyond (96572) | Theme: Smart Automation

(function () {
  'use strict';

  // --- AUDIO SYNTHESIS CHIME (No external MP3 needed) ---
  function playChime(type = 'success') {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      const now = ctx.currentTime;
      if (type === 'success') {
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.1); // E5
        osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.2); // G5
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'alert') {
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.setValueAtTime(880, now + 0.1);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      }
    } catch (e) {
      // Audio not permitted or not supported
    }
  }

  // --- MULTILINGUAL TRANSLATIONS ---
  const i18n = {
    en: {
      appName: 'Kisan Setu',
      appSubtitle: 'Smart Procurement Scheduling & Tracking Platform',
      tagline: 'Kisan Se Samriddhi Tak • Farmers • Mandis • Better Tomorrow',
      sihBadge: 'SIH26032 • BuildBeyond (96572)',
      liveSync: 'Live Sync Active',
      resetDemo: 'Reset Demo Data',
      tabFarmer: 'Farmer Mobile App',
      tabStaff: 'Mandi Staff Portal',
      tabMinistry: 'Ministry Analytics',
      tabSms: 'SMS Simulation',
      tabTech: 'Architecture & Load Test',
      loginTitle: 'Farmer Login / Registration',
      loginSub: 'Simulate UIDAI Aadhaar OTP verification to authenticate MSP procurement and live queue tokens.',
      judgeDemoTitle: 'Quick Demo Accounts: Judge 1-Click Login',
      aadhaarTab: 'Aadhaar Login / e-KYC',
      phoneTab: 'Mobile Number Login',
      aadhaarPlaceholder: '1234 5678 9012',
      sendOtp: 'Send Aadhaar OTP',
      verifyOtp: 'Verify OTP & Authenticate',
      bhulekhVerified: 'Bhulekh Land Record Verified',
      bookSlotBtn: 'Book Procurement Slot',
      activeTokenTitle: 'Active Gate Pass & Live Queue Status',
      callNext: 'Call Next Token',
      weighbridge: 'Weighbridge & MSP Settlement',
      qualityCheck: 'Grain Quality Inspection'
    },
    hi: {
      appName: 'किसान सेतु',
      appSubtitle: 'स्मार्ट खरीद शेड्यूलिंग एवं ट्रैकिंग प्लेटफॉर्म',
      tagline: 'किसान से समृद्धि तक • किसान • मंडी • सशक्त भारत',
      sihBadge: 'SIH26032 • टीम बिल्डबियॉन्ड (96572)',
      liveSync: 'लाइव सिंक सक्रिय',
      resetDemo: 'डेमो रीसेट करें',
      tabFarmer: 'किसान मोबाइल ऐप',
      tabStaff: 'मंडी स्टाफ पोर्टल',
      tabMinistry: 'मंत्रालय एनालिटिक्स',
      tabSms: 'एसएमएस सिमुलेशन',
      tabTech: 'आर्किटेक्चर व लोड टेस्ट',
      loginTitle: 'किसान लॉगिन / ई-केवाईसी सत्यापन',
      loginSub: 'एमएसपी खरीद और लाइव टोकन के लिए यूआईडीएआई आधार ओटीपी सत्यापन सिमुलेट करें।',
      judgeDemoTitle: 'जज डेमो खाते: 1-क्लिक लॉगिन',
      aadhaarTab: 'आधार लॉगिन / ई-केवाईसी',
      phoneTab: 'मोबाइल नंबर लॉगिन',
      aadhaarPlaceholder: '1234 5678 9012',
      sendOtp: 'आधार ओटीपी भेजें',
      verifyOtp: 'ओटीपी सत्यापित करें',
      bhulekhVerified: 'भूलेख भूमि रिकॉर्ड सत्यापित',
      bookSlotBtn: 'उपज विक्रय स्लॉट बुक करें',
      activeTokenTitle: 'सक्रिय गेट पास एवं लाइव कतार स्थिति',
      callNext: 'अगला टोकन बुलाएं',
      weighbridge: 'धर्मकांटा एवं एमएसपी भुगतान',
      qualityCheck: 'अनाज गुणवत्ता परीक्षण'
    }
  };

  // --- INITIAL APPLICATION DATA ---
  const INITIAL_FARMERS = [
    {
      id: 'FARMER-01',
      name: 'Ramesh Kumar',
      village: 'Rau Village, Indore',
      aadhaar: '123456787821',
      aadhaarDisplay: '•••• •••• 7821',
      phone: '+91 9876543210',
      khasraNo: '214/1-क',
      landArea: '4.2 Hectares (10.4 Acres)',
      bankAcc: 'SBI •••• 4091 (Aadhaar Seeded)',
      cropQuota: {
        Wheat: { total: 180, used: 52, remaining: 128 },
        Soybean: { total: 95, used: 0, remaining: 95 },
        Chana: { total: 60, used: 0, remaining: 60 }
      },
      activeTokenId: 'KS-RAU-108'
    },
    {
      id: 'FARMER-02',
      name: 'Suresh Patel',
      village: 'Rangwasa, Indore',
      aadhaar: '987654329912',
      aadhaarDisplay: '•••• •••• 9912',
      phone: '+91 9826012345',
      khasraNo: '88/2',
      landArea: '2.8 Hectares (6.9 Acres)',
      bankAcc: 'BOI •••• 1128 (Aadhaar Seeded)',
      cropQuota: {
        Wheat: { total: 120, used: 0, remaining: 120 },
        Soybean: { total: 75, used: 30, remaining: 45 },
        Chana: { total: 40, used: 0, remaining: 40 }
      },
      activeTokenId: 'KS-RAU-109'
    },
    {
      id: 'FARMER-03',
      name: 'Rajesh Verma',
      village: 'Sanwer, Indore',
      aadhaar: '567812343487',
      aadhaarDisplay: '•••• •••• 3487',
      phone: '+91 9425098765',
      khasraNo: '512/3',
      landArea: '6.5 Hectares (16.0 Acres)',
      bankAcc: 'PNB •••• 8872 (Aadhaar Seeded)',
      cropQuota: {
        Wheat: { total: 260, used: 0, remaining: 260 },
        Soybean: { total: 140, used: 0, remaining: 140 },
        Chana: { total: 90, used: 0, remaining: 90 }
      },
      activeTokenId: null
    }
  ];

      const INITIAL_MANDIS = [
    {
      id: 'RAU',
      name: 'Rau APMC Krishi Mandi',
      type: 'government',
      operator: 'MP State Mandi Board',
      licenseNo: 'APMC-MP-RAU-001',
      district: 'Indore (Rau)',
      distanceKm: 3.5,
      travelTimeMins: 12,
      gates: 4,
      bays: 12,
      currentServingToken: 'KS-RAU-105',
      queueLength: 3,
      avgWaitMins: 32,
      todayProcuredMT: 480,
      capacityPercent: 68,
      priceOffset: 0,
      badge: 'Govt APMC Yard',
      unloadingType: 'Manual Beam & Platform Scale',
      paymentMode: 'Direct DBT via PFMS (24-48 hrs)',
      turnaroundMins: 45,
      highlights: [
        '🏛️ 100% Government MSP Guaranteed',
        '🏛️ Traditional APMC Yard Weighing',
        '🏛️ Direct DBT via PFMS / Aadhaar Bridge'
      ]
    },
    {
      id: 'ITC_CHOUPAL',
      name: 'ITC Choupal Saagar (Private Mandi)',
      type: 'private',
      operator: 'ITC Limited - Agri Business Division',
      licenseNo: 'PVT-APMC-MP-2024-008',
      district: 'Indore (Rau-Pithampur Bypass)',
      distanceKm: 6.8,
      travelTimeMins: 15,
      gates: 2,
      bays: 6,
      currentServingToken: 'KS-ITC-022',
      queueLength: 1,
      avgWaitMins: 15,
      todayProcuredMT: 390,
      capacityPercent: 42,
      priceOffset: 60,
      badge: '🏢 Private Mandi (+₹60 Bonus)',
      unloadingType: '15-Min Automated Dump Pit & Electronic Sensors',
      paymentMode: 'Instant Same-Day Corporate NEFT / RTGS (Within 2 Hrs)',
      turnaroundMins: 20,
      highlights: [
        '⚡ +₹60/Qtl Private Bonus over Govt MSP',
        '⚡ 15-Minute Automated Dump Yard & Weighbridge',
        '⚡ Direct Same-Day Bank NEFT / RTGS Transfer',
        '⚡ ISO 9001:2015 Moisture & Quality Lab',
        '⚡ Farmer Rest Lounge & Free Soil Testing'
      ]
    },
    {
      id: 'ADANI_AGRI_SILO',
      name: 'Adani Agri Modern Silo & Private Yard',
      type: 'private',
      operator: 'Adani Agri Logistics Ltd.',
      licenseNo: 'PVT-APMC-MP-2024-019',
      district: 'Indore (Sanwer Road Industrial Area)',
      distanceKm: 14.2,
      travelTimeMins: 25,
      gates: 3,
      bays: 8,
      currentServingToken: 'KS-ADN-015',
      queueLength: 2,
      avgWaitMins: 18,
      todayProcuredMT: 680,
      capacityPercent: 48,
      priceOffset: 50,
      badge: '🏢 Private Silo (+₹50 Bonus)',
      unloadingType: 'Hydraulic Tipper Ramp & Vacuum Grain Conveyor',
      paymentMode: 'Instant Same-Day Corporate NEFT / RTGS (Within 2 Hrs)',
      turnaroundMins: 24,
      highlights: [
        '⚡ +₹50/Qtl Private Bonus over Govt MSP',
        '⚡ Hydraulic Tipper Unloading (18 mins)',
        '⚡ Steel Silo Grain Storage Protection',
        '⚡ Instant Corporate Payment Settlement'
      ]
    },
    {
      id: 'INDORE_CHHAWANI',
      name: 'Indore Krishi Upaj Mandi (Chhawani)',
      type: 'government',
      operator: 'MP Mandi Board',
      licenseNo: 'APMC-MP-IND-002',
      district: 'Indore (Chhawani)',
      distanceKm: 11.5,
      travelTimeMins: 28,
      gates: 8,
      bays: 24,
      currentServingToken: 'KS-IND-320',
      queueLength: 8,
      avgWaitMins: 45,
      todayProcuredMT: 1240,
      capacityPercent: 82,
      priceOffset: 20,
      badge: 'Govt APMC (High Volume)',
      unloadingType: 'Electronic Weighbridge & Auction Shed',
      paymentMode: 'Direct DBT via PFMS (24-48 hrs)',
      turnaroundMins: 60,
      highlights: [
        '🏛️ High Liquidity Commercial Trading Hub',
        '🏛️ Premium +₹20/Qtl for Clean Lot Auctions',
        '🏛️ 24 Operational Unloading Bays'
      ]
    },
    {
      id: 'SANWER',
      name: 'Sanwer Procurement Center',
      type: 'government',
      operator: 'MP Mandi Board',
      licenseNo: 'APMC-MP-SNW-004',
      district: 'Indore (Sanwer)',
      distanceKm: 28.0,
      travelTimeMins: 42,
      gates: 3,
      bays: 8,
      currentServingToken: 'KS-SNW-040',
      queueLength: 2,
      avgWaitMins: 20,
      todayProcuredMT: 310,
      capacityPercent: 44,
      priceOffset: 0,
      badge: 'Govt Procurement Center',
      unloadingType: 'Yard Unloading Platform',
      paymentMode: 'Direct DBT via PFMS (24-48 hrs)',
      turnaroundMins: 35,
      highlights: [
        '🏛️ Dedicated Wheat Procurement Station',
        '🏛️ Direct MSP Credit via Bank Seeding',
        '🏛️ Low Congestion Village Proximity'
      ]
    },
    {
      id: 'DEPALPUR',
      name: 'Depalpur Krishak Kendra',
      type: 'government',
      operator: 'MP Mandi Board',
      licenseNo: 'APMC-MP-DPL-005',
      district: 'Indore (Depalpur)',
      distanceKm: 34.5,
      travelTimeMins: 50,
      gates: 2,
      bays: 6,
      currentServingToken: 'KS-DPL-015',
      queueLength: 2,
      avgWaitMins: 24,
      todayProcuredMT: 220,
      capacityPercent: 50,
      priceOffset: 0,
      badge: 'Govt Krishak Kendra',
      unloadingType: 'Covered Shed Unloading',
      paymentMode: 'Direct DBT via PFMS (24-48 hrs)',
      turnaroundMins: 40,
      highlights: [
        '🏛️ Rural Farmer Support Center',
        '🏛️ Government Procurement Guarantee',
        '🏛️ Free Grain Moisture Testing'
      ]
    }
  ];

  const MSP_RATES = {
    Wheat: { msp: 2275, bonus: 125, total: 2400, unit: '₹ / Quintal' },
    Soybean: { msp: 4892, bonus: 100, total: 4992, unit: '₹ / Quintal' },
    Chana: { msp: 5440, bonus: 150, total: 5590, unit: '₹ / Quintal' },
    Mustard: { msp: 5650, bonus: 100, total: 5750, unit: '₹ / Quintal' }
  };

  const INITIAL_TOKENS = [
    {
      id: 'KS-ITC-022',
      mandiId: 'ITC_CHOUPAL',
      farmerId: 'FARMER-91',
      farmerName: 'Mahesh Patidar',
      phone: '+91 9425091823',
      village: 'Pithampur Rural',
      crop: 'Wheat',
      variety: 'Sharbati Premium',
      quantityQuintals: 50,
      vehicle: 'Tractor Trolley (MP-09-CB-2201)',
      slotDate: '26-Sep-2026',
      slotTime: '09:00 AM - 11:00 AM',
      assignedGate: 'Gate 1 (Automated Pit 1)',
      status: 'at_weighbridge',
      queuePosition: 0,
      etaMins: 0,
      quality: { moisture: 10.8, foreignMatter: 0.2, grade: 'Export Grade 1', dockPercent: 0 },
      weight: { gross: 8200, tare: 3200, netKg: 5000, netQuintals: 50 },
      payout: { mspRate: 2460, totalAmount: 123000, dbtStatus: 'Processed', utrNo: 'NEFT-ITC2026092671' },
      createdAt: '08:45 AM'
    },
    {
      id: 'KS-ADN-015',
      mandiId: 'ADANI_AGRI_SILO',
      farmerId: 'FARMER-92',
      farmerName: 'Vikram Singh Dangi',
      phone: '+91 9826019284',
      village: 'Sanwer Kheda',
      crop: 'Wheat',
      variety: 'Lokwan Bold',
      quantityQuintals: 65,
      vehicle: 'Hydraulic Tipper (MP-09-HG-3301)',
      slotDate: '26-Sep-2026',
      slotTime: '10:00 AM - 12:00 PM',
      assignedGate: 'Gate 2 (Tipper Bay 1)',
      status: 'in_quality_check',
      queuePosition: 1,
      etaMins: 15,
      quality: { moisture: 11.2, foreignMatter: 0.3, grade: 'FAQ Grade', dockPercent: 0 },
      weight: null,
      payout: null,
      createdAt: '09:10 AM'
    },
    {
      id: 'KS-RAU-105',
      mandiId: 'RAU',
      farmerId: 'FARMER-00',
      farmerName: 'Kailash Choudhary',
      phone: '+91 9713456789',
      village: 'Harsola',
      crop: 'Wheat',
      variety: 'Sharbati FAQ',
      quantityQuintals: 45,
      vehicle: 'Tractor Trolley (MP-09-AB-4122)',
      slotDate: '26-Sep-2026',
      slotTime: '08:00 AM - 11:00 AM',
      assignedGate: 'Gate 2 (Bay 4)',
      status: 'at_weighbridge', // scheduled, in_transit, at_gate, in_quality_check, at_weighbridge, completed
      queuePosition: 0,
      etaMins: 0,
      quality: { moisture: 11.2, foreignMatter: 0.5, grade: 'Grade A (FAQ)', dockPercent: 0 },
      weight: { gross: 7850, tare: 3350, netKg: 4500, netQuintals: 45 },
      payout: { mspRate: 2400, totalAmount: 108000, dbtStatus: 'Processed', utrNo: 'PFMS202609260012' },
      createdAt: '08:15 AM'
    },
    {
      id: 'KS-RAU-106',
      mandiId: 'RAU',
      farmerId: 'FARMER-99',
      farmerName: 'Balram Yadav',
      phone: '+91 9827112233',
      village: 'Tejaji Nagar',
      crop: 'Wheat',
      variety: 'Lokwan',
      quantityQuintals: 60,
      vehicle: 'Pickup Truck (MP-09-GA-8831)',
      slotDate: '26-Sep-2026',
      slotTime: '08:00 AM - 11:00 AM',
      assignedGate: 'Gate 2 (Bay 5)',
      status: 'in_quality_check',
      queuePosition: 1,
      etaMins: 10,
      quality: { moisture: 11.8, foreignMatter: 0.6, grade: 'Grade A (FAQ)', dockPercent: 0 },
      weight: null,
      payout: null,
      createdAt: '08:30 AM'
    },
    {
      id: 'KS-RAU-107',
      mandiId: 'RAU',
      farmerId: 'FARMER-98',
      farmerName: 'Devendra Solanki',
      phone: '+91 9926445566',
      village: 'Machal',
      crop: 'Soybean',
      variety: 'JS 9560',
      quantityQuintals: 35,
      vehicle: 'Tractor Trolley (MP-09-EA-1902)',
      slotDate: '26-Sep-2026',
      slotTime: '08:00 AM - 11:00 AM',
      assignedGate: 'Gate 1 (Bay 2)',
      status: 'at_gate',
      queuePosition: 2,
      etaMins: 20,
      quality: null,
      weight: null,
      payout: null,
      createdAt: '08:45 AM'
    },
    {
      id: 'KS-RAU-108',
      mandiId: 'RAU',
      farmerId: 'FARMER-01',
      farmerName: 'Ramesh Kumar',
      phone: '+91 9876543210',
      village: 'Rau Village, Indore',
      crop: 'Wheat',
      variety: 'Sharbati FAQ',
      quantityQuintals: 50,
      vehicle: 'Tractor Trolley (MP-09-BZ-6712)',
      slotDate: '26-Sep-2026',
      slotTime: '11:00 AM - 02:00 PM',
      assignedGate: 'Gate 2 (Bay 6)',
      status: 'in_transit', // User can change this!
      queuePosition: 3,
      etaMins: 32,
      distanceKm: 4.8,
      quality: null,
      weight: null,
      payout: null,
      createdAt: '09:05 AM'
    },
    {
      id: 'KS-RAU-109',
      mandiId: 'RAU',
      farmerId: 'FARMER-02',
      farmerName: 'Suresh Patel',
      phone: '+91 9826012345',
      village: 'Rangwasa, Indore',
      crop: 'Soybean',
      variety: 'JS 9560',
      quantityQuintals: 30,
      vehicle: 'Mini Truck (MP-09-LD-4411)',
      slotDate: '26-Sep-2026',
      slotTime: '11:00 AM - 02:00 PM',
      assignedGate: 'Gate 1 (Bay 3)',
      status: 'scheduled',
      queuePosition: 4,
      etaMins: 45,
      quality: null,
      weight: null,
      payout: null,
      createdAt: '09:20 AM'
    }
  ];

  const INITIAL_SMS = [
    {
      id: 'SMS-1',
      timestamp: '09:05 AM',
      to: '+91 9876543210 (Ramesh Kumar)',
      tag: 'SLOT CONFIRMATION',
      body: '[VM-KSITU] Token #KS-RAU-108 confirmed for Wheat (50 Qtl) at Rau Mandi on 26-Sep (11:00 AM). Gate: Gate 2. Please start transit on time. - Kisan Setu'
    },
    {
      id: 'SMS-2',
      timestamp: '09:00 AM',
      to: '+91 9876543210 (Ramesh Kumar)',
      tag: 'UIDAI OTP',
      body: '[VM-UIDAI] 782194 is your Aadhaar OTP for Kisan Setu MSP Portal e-KYC. Valid for 10 mins. Do not share OTP with anyone.'
    },
    {
      id: 'SMS-3',
      timestamp: '08:45 AM',
      to: '+91 9713456789 (Kailash Choudhary)',
      tag: 'GATE ALERT',
      body: '[VM-KSITU] Token #KS-RAU-105: Gate Entry verified at Gate 2. Proceeding to Weighbridge Bay 4. Live Queue updated.'
    }
  ];

  // --- APPLICATION STATE ---
  let state = {
    lang: 'en',
    mandiFilter: 'all', // 'all' | 'government' | 'private'
    activeTab: 'farmer', // 'farmer', 'staff', 'ministry', 'sms', 'tech'
    simulatedJam: false,
    rescheduleAlert: null,
    aiAgent: {
      isOpen: false,
      isMinimized: false,
      inputQuery: '',
      isThinking: false,
      voiceEnabled: true,
      messages: [
        {
          id: 'msg-welcome',
          sender: 'agent',
          timestamp: 'Just now',
          text: 'Namaste! 🙏 I am **Kisan Sahayak AI (कृषि सहायक)**. I can help you **compare live Mandi prices**, analyze queue wait times, and **directly book your procurement slot** when commanded!\n\nTry asking me:\n• *"Compare Wheat prices across all Mandis"*\n• *"Book a slot for 40 quintals of Wheat at Rau Mandi"*\n• *"Which Mandi has the lowest waiting time right now?"*',
          actionCard: {
            type: 'compare_preview',
            title: "Today's Mandi MSP & Rate Comparison",
            mandis: [
              { name: 'Rau APMC Mandi', crop: 'Wheat (गेहूं)', price: '₹2,400/Qtl', wait: '32 min', badge: 'Recommended', mandiId: 'RAU' },
              { name: 'Indore Mandi (Chhawani)', crop: 'Wheat (गेहूं)', price: '₹2,420/Qtl', wait: '45 min', badge: 'High Rate', mandiId: 'INDORE_CHHAWANI' },
              { name: 'Sanwer Procurement Hub', crop: 'Chana (चना)', price: '₹5,590/Qtl', wait: '20 min', badge: 'Fastest Entry', mandiId: 'SANWER' },
              { name: 'Depalpur Krishak Kendra', crop: 'Mustard (सरसों)', price: '₹5,750/Qtl', wait: '24 min', badge: 'Open Bays', mandiId: 'DEPALPUR' }
            ]
          }
        }
      ]
    },
    farmerAuth: {
      formSection: 1, // 1: Profile & Aadhaar, 2: Bank & Land, 3: Mandi Preference
      isVerified: false, // Starts as false so user completes Registration Dashboard first
      currentStep: 'register', // 'register' | 'choose_mandi' | 'active_pass'
      selectedFarmerId: 'FARMER-01',
      otpSent: false,
      otpInput: '782194',
      demoOtp: '782194',
      isAuthenticating: false,
      // Registration & Bank Form Data
      name: 'Ramesh Kumar',
      village: 'Rau Village, Indore',
      phone: '+91 9876543210',
      aadhaar: '1234 5678 7821',
      bankName: 'State Bank of India (SBI)',
      bankAcc: '308941204091',
      ifsc: 'SBIN0030128',
      dbtStatus: 'NPCI Aadhaar Seeded (Active)',
      khasraNo: '214/1-क',
      landArea: '4.2 Hectares (10.4 Acres)',
      quotaWheat: 180,
      quotaRemaining: 128
    },
    bookingForm: {
      bookingSection: 1, // 1: Mandi & Rates, 2: Crop, Qty, Date & Slot
      isOpen: false,
      mandiId: 'RAU',
      crop: 'Wheat',
      variety: 'Sharbati FAQ',
      quantity: 40,
      slotDate: '2026-09-27',
      slotTime: '08:00 AM - 11:00 AM',
      vehicleType: 'Tractor Trolley',
      vehicleNumber: 'MP-09-BZ-6712',
      isSubmitting: false
    },
    mandiStaff: {
      selectedMandiId: 'RAU',
      selectedTokenId: 'KS-RAU-106',
      filterStatus: 'all',
      // Quality inspection form state
      moisture: 11.4,
      foreignMatter: 0.6,
      shriveled: 1.2,
      inspectorName: 'Er. A. K. Sharma (Mandi Sec.)',
      // Weighbridge form state
      grossWeight: 7920,
      tareWeight: 3120,
      isSubmittingWeigh: false
    },
    concurrencySimulator: {
      isRunning: false,
      systemMode: 'async', // 'sync' (legacy) vs 'async' (kisan setu)
      concurrentUsers: 5000,
      cpuLoad: 24,
      latencyMs: 38,
      processedCount: 0,
      droppedCount: 0,
      dbConnections: 12,
      logHistory: []
    },
    farmers: JSON.parse(JSON.stringify(INITIAL_FARMERS)),
    mandis: JSON.parse(JSON.stringify(INITIAL_MANDIS)),
    tokens: JSON.parse(JSON.stringify(INITIAL_TOKENS)),
    smsList: JSON.parse(JSON.stringify(INITIAL_SMS)),
    notificationToast: null
  };


  // --- KISAN SAHAYAK AI AGENT ENGINE (Voice & Autonomous Slot Booking) ---
  function speakAiText(text) {
    if (!state.aiAgent.voiceEnabled || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const clean = text.replace(/[*_#`]/g, '').replace(/\[.*?\]/g, '').replace(/₹/g, 'Rupees ');
      const utter = new SpeechSynthesisUtterance(clean);
      utter.rate = 1.0;
      utter.pitch = 1.0;
      window.speechSynthesis.speak(utter);
    } catch (e) {}
  }

  function executeAiDirectBooking(params) {
    const f = getActiveFarmer();
    const crop = params.crop || 'Wheat';
    const qty = Number(params.quantity) || 40;
    const mandiObj = state.mandis.find(m => m.id === params.mandiId) || state.mandis[0];

    // Check Bhulekh quota
    if (f.cropQuota[crop] && qty > f.cropQuota[crop].remaining) {
      const msg = `⚠️ **Quota Exceeded!** You requested **${qty} Quintals** of ${crop}, but your verified Bhulekh land quota has only **${f.cropQuota[crop].remaining} Quintals** remaining. Please adjust your quantity.`;
      state.aiAgent.messages.push({
        id: 'msg-' + Date.now(),
        sender: 'agent',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: msg
      });
      state.aiAgent.isThinking = false;
      speakAiText(`Quota exceeded. You have ${f.cropQuota[crop].remaining} quintals remaining.`);
      render();
      return;
    }

    // Calculate exact pricing and timing for chosen mandi
    const cropRate = MSP_RATES[crop] || MSP_RATES['Wheat'];
    const effectiveRate = cropRate.total + (mandiObj.priceOffset || 0);
    const totalEstAmount = qty * effectiveRate;
    const yardWaitMins = mandiObj.avgWaitMins || 20;
    const etaMins = yardWaitMins + (mandiObj.queueLength * 8);

    // Allocate token & gate
    const tokenNum = Math.floor(100 + Math.random() * 900);
    const newTokenId = `KS-${mandiObj.id}-${tokenNum}`;
    const assignedGate = mandiObj.type === 'private'
      ? `Gate 1 (Automated Pit ${Math.floor(Math.random() * (mandiObj.bays || 4)) + 1})`
      : `Gate ${(Math.floor(Math.random() * mandiObj.gates) + 1)} (Bay ${Math.floor(Math.random() * (mandiObj.bays || 6)) + 1})`;

    const newToken = {
      id: newTokenId,
      mandiId: mandiObj.id,
      mandiName: mandiObj.name,
      mandiType: mandiObj.type,
      mandiOperator: mandiObj.operator,
      mandiLicense: mandiObj.licenseNo || 'APMC-MP-IND-01',
      farmerId: f.id,
      farmerName: f.name,
      phone: f.phone,
      village: f.village,
      crop: crop,
      variety: 'FAQ Standard',
      quantityQuintals: qty,
      vehicle: `${params.vehicleType || 'Tractor Trolley'} (MP-09-BZ-6712)`,
      slotDate: params.slotDate || '27-Sep-2026',
      slotTime: params.slotTime || '08:00 AM - 11:00 AM',
      assignedGate: assignedGate,
      status: 'scheduled',
      queuePosition: mandiObj.queueLength + 1,
      pricePerQtl: effectiveRate,
      bonusPerQtl: mandiObj.priceOffset || 0,
      totalEstAmount: totalEstAmount,
      etaMins: etaMins,
      avgWaitMins: yardWaitMins,
      distanceKm: mandiObj.distanceKm || 6.8,
      travelTimeMins: mandiObj.travelTimeMins || 16,
      paymentMode: mandiObj.paymentMode || 'Direct DBT via PFMS',
      currentServingToken: mandiObj.currentServingToken,
      quality: null,
      weight: null,
      payout: null,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    if (f.cropQuota[crop]) {
      f.cropQuota[crop].remaining -= qty;
      f.cropQuota[crop].used += qty;
    }
    f.activeTokenId = newTokenId;
    state.farmerAuth.currentStep = "active_pass";

    state.tokens.push(newToken);
    mandiObj.queueLength += 1;

    sendSimulatedSms(
      f.phone,
      'AI SLOT BOOKED',
      `[VM-KSITU] Token #${newTokenId} booked via Kisan Sahayak AI for ${crop} (${qty} Qtl) at ${mandiObj.name}. Slot: ${newToken.slotDate} ${newToken.slotTime}. Gate: ${newToken.assignedGate}.`
    );

    playChime('success');
    if (window.confetti) {
      window.confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 }, colors: ['#e11d48', '#f59e0b', '#fbbf24', '#be123c', '#d97706', '#ffe4e6'] });
    }

    const confirmMsg = `✅ **Procurement Slot Successfully Booked via AI Command!**\n\nI have confirmed your delivery slot for **${qty} Quintals of ${crop}** at **${mandiObj.name}**.\n\n• **Token ID:** \`${newTokenId}\`\n• **Slot Time:** ${newToken.slotDate} (${newToken.slotTime})\n• **Assigned:** ${assignedGate}\n• **Estimated Wait:** ~${newToken.etaMins} mins\n\nA confirmation SMS has been dispatched to your mobile (${f.phone}).`;

    state.aiAgent.messages.push({
      id: 'msg-' + Date.now(),
      sender: 'agent',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: confirmMsg,
      actionCard: {
        type: 'booking_confirmed',
        token: newToken,
        mandiName: mandiObj.name
      }
    });

    state.aiAgent.isThinking = false;
    speakAiText(`Slot confirmed! Your token number is ${newTokenId} at ${mandiObj.name} for ${qty} quintals of ${crop}.`);
    render();
  }

  function processAiAgentQuery(rawQuery) {
    const q = rawQuery.toLowerCase();
    const f = getActiveFarmer();
    const aiEngine = (typeof window !== 'undefined' && window.KisanSetuAI) || (typeof KisanSetuAI !== 'undefined' ? KisanSetuAI : null);

    // Run Voice NLP Extractor if available
    const nlp = aiEngine ? aiEngine.parseVoiceTranscript(rawQuery) : {
      intent: 'general_help',
      crop: null,
      quantity: null,
      mandi: null,
      suggestedSlot: null,
      arrivalHour: 11
    };

    // 1. Direct Booking Detection
    const isBooking = nlp.intent === 'book_slot' || q.includes('book') || q.includes('slot') || q.includes('बुक') || q.includes('स्लॉट') || q.includes('reserve') || q.includes('schedule') || q.includes('कर दो');
    if (isBooking) {
      let mandiId = nlp.mandi || 'RAU';
      if (!nlp.mandi) {
        if (q.includes('itc') || q.includes('choupal') || (q.includes('private') && q.includes('rau'))) mandiId = 'ITC_CHOUPAL';
        else if (q.includes('adani') || q.includes('silo')) mandiId = 'ADANI_AGRI_SILO';
        else if (q.includes('indore') || q.includes('इंदौर') || q.includes('chhawani') || q.includes('छावनी')) mandiId = 'INDORE_CHHAWANI';
        else if (q.includes('sanwer') || q.includes('सांवेर')) mandiId = 'SANWER';
        else if (q.includes('depalpur') || q.includes('देपालपुर')) mandiId = 'DEPALPUR';
      }

      let crop = nlp.crop || 'Wheat';
      if (!nlp.crop) {
        if (q.includes('soybean') || q.includes('सोयाबीन')) crop = 'Soybean';
        else if (q.includes('chana') || q.includes('चना')) crop = 'Chana';
        else if (q.includes('mustard') || q.includes('सरसों')) crop = 'Mustard';
      }

      let qty = nlp.quantity || 40;
      if (!nlp.quantity) {
        const numMatch = q.match(/(\d+)\s*(qtl|quintal|quintals|क्विंटल|kilo)?/i);
        if (numMatch && numMatch[1]) {
          const parsed = parseInt(numMatch[1], 10);
          if (parsed > 0 && parsed <= 300) qty = parsed;
        }
      }

      const slotTime = nlp.suggestedSlot || '08:00 AM - 11:00 AM';

      executeAiDirectBooking({
        mandiId,
        crop,
        quantity: qty,
        slotDate: '27-Sep-2026',
        slotTime: slotTime,
        vehicleType: 'Tractor Trolley'
      });
      return;
    }

    // 1.5 Private Mandi Specific Detection
    if (q.includes('private') || q.includes('निजी') || q.includes('itc') || q.includes('adani') || q.includes('choupal') || q.includes('silo')) {
      const resp = `🏢 **Government APMC vs Private Mandi Comparison**\n\n• **ITC Choupal Saagar (Private Mandi):** ₹2,460/Qtl (⚡ +₹60/Qtl Private Bonus • 15m Automated Unloading)\n• **Adani Agri Modern Silo (Private):** ₹2,450/Qtl (+₹50/Qtl Bonus • 18m Hydraulic Tipper)\n• **Rau APMC (Govt Mandi):** ₹2,400/Qtl (Govt MSP • 32m Yard Wait)\n\n💡 **Private Mandi Benefit:** Selling to **ITC Choupal Saagar** yields you **₹60/Qtl more** than government MSP with instant NEFT bank credit! Would you like me to book your slot at ITC Private Mandi?`;
      state.aiAgent.messages.push({
        id: 'msg-' + Date.now(),
        sender: 'agent',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: resp,
        actionCard: {
          type: 'quick_actions',
          buttons: [
            { label: '⚡ Book ITC Private Mandi (₹2,460/Qtl)', mandiId: 'ITC_CHOUPAL', crop: 'Wheat', qty: 40 },
            { label: '⚡ Book Adani Private Silo (₹2,450/Qtl)', mandiId: 'ADANI_AGRI_SILO', crop: 'Wheat', qty: 40 },
            { label: '🏛️ Book Rau APMC (Govt MSP)', mandiId: 'RAU', crop: 'Wheat', qty: 40 }
          ]
        }
      });
      state.aiAgent.isThinking = false;
      speakAiText('Private mandis like ITC Choupal Saagar are offering 2,460 rupees per quintal, which is 60 rupees above government MSP with 15 minutes fast-track unloading.');
      render();
      return;
    }

    // 2. Price / Rate Comparison & Net Benefit Optimization
    const isCompare = nlp.intent === 'check_price' || q.includes('compare') || q.includes('price') || q.includes('rate') || q.includes('bhav') || q.includes('भाव') || q.includes('कीमत') || q.includes('तुलना') || q.includes('रेट') || q.includes('फायदा') || q.includes('मुनाफा') || q.includes('kaunsi') || q.includes('best');
    if (isCompare) {
      let crop = nlp.crop || 'Wheat';
      if (!nlp.crop) {
        if (q.includes('soybean') || q.includes('सोयाबीन')) crop = 'Soybean';
        else if (q.includes('chana') || q.includes('चना')) crop = 'Chana';
        else if (q.includes('mustard') || q.includes('सरसों')) crop = 'Mustard';
      }
      let qty = nlp.quantity || 40;

      // Calculate dynamic net-benefit ranking via AI Optimizer
      let ranked = null;
      if (aiEngine && typeof aiEngine.optimizeMandiSelection === 'function') {
        ranked = aiEngine.optimizeMandiSelection(state.mandis, crop, qty, 11);
      }

      if (ranked && ranked.length > 0) {
        const top = ranked[0];
        const second = ranked[1] || ranked[0];

        const respText = `🌾 **AI Net-Benefit Mandi Optimization for ${crop} (${qty} Qtl)**\n\n🏆 **Top Recommended: ${top.name}**\n• **Net Take-Home:** ₹${top.netPayout.toLocaleString('en-IN')} (Effective: ₹${top.effectiveRatePerQtl}/Qtl)\n• **Predicted Yard Wait:** ~${top.predictedWaitMins} mins (ML Confidence: 94%)\n• **Transit Distance:** ${top.distanceKm} km (₹${top.travelDeduction} round-trip fuel)\n\n📊 **All Mandi Rankings (After Fuel & Delay Deductions):**\n${ranked.slice(0, 4).map((r, idx) => `${idx + 1}. **${r.name}:** ₹${r.ratePerQtl}/Qtl • Net: ₹${r.netPayout.toLocaleString('en-IN')} (~${r.predictedWaitMins}m wait)`).join('\n')}\n\n💡 *AI Insight:* Even after travel fuel and waiting delay deductions, **${top.name}** provides the highest net profit!`;

        state.aiAgent.messages.push({
          id: 'msg-' + Date.now(),
          sender: 'agent',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          text: respText,
          actionCard: {
            type: 'quick_actions',
            buttons: [
              { label: `⚡ Book ${top.name.split(' ')[0]} (Net: ₹${top.netPayout.toLocaleString('en-IN')})`, mandiId: top.id, crop: crop, qty: qty },
              { label: `🏛️ Book ${second.name.split(' ')[0]}`, mandiId: second.id, crop: crop, qty: qty }
            ]
          }
        });
        state.aiAgent.isThinking = false;
        speakAiText(`For ${qty} quintals of ${crop}, ${top.name} gives you the highest net profit of ${top.netPayout.toLocaleString('en-IN')} rupees with an estimated wait time of ${top.predictedWaitMins} minutes.`);
        render();
        return;
      }

      // Fallback comparison
      const rates = [
        { mandiId: 'RAU', name: 'Rau APMC Mandi', dist: '3.5 km', price: crop === 'Wheat' ? '₹2,400' : crop === 'Soybean' ? '₹4,992' : '₹5,590', bonus: '+₹125 State Bonus', wait: '32m wait', badge: 'Recommended', highlight: true },
        { mandiId: 'ITC_CHOUPAL', name: 'ITC Choupal Saagar (Private)', dist: '6.8 km', price: crop === 'Wheat' ? '₹2,460' : crop === 'Soybean' ? '₹5,050' : '₹5,650', bonus: '+₹60 Private Bonus', wait: '15m wait', badge: 'Highest Payout', highlight: true },
        { mandiId: 'INDORE_CHHAWANI', name: 'Indore Mandi (Chhawani)', dist: '11.5 km', price: crop === 'Wheat' ? '₹2,420' : crop === 'Soybean' ? '₹5,010' : '₹5,620', bonus: '+₹145 APMC Premium', wait: '45m wait', badge: 'High Volume', highlight: false },
        { mandiId: 'SANWER', name: 'Sanwer Procurement Center', dist: '28 km', price: crop === 'Wheat' ? '₹2,400' : crop === 'Soybean' ? '₹4,992' : '₹5,590', bonus: '+₹125 State Bonus', wait: '20m wait', badge: 'Lowest Wait', highlight: false }
      ];

      const respText = `📊 **Mandi Price & Slot Comparison for ${crop}**\n\nHere is the real-time rate comparison across nearby procurement centers in Indore division:\n\n• **ITC Choupal Saagar (Private):** ${rates[1].price}/Qtl (Fastest: 15 min wait • Highest Rate)\n• **Rau APMC Mandi:** ${rates[0].price}/Qtl (Closest: 3.5 km • 32 min wait)\n• **Indore Chhawani:** ${rates[2].price}/Qtl (High Volume • 45 min wait)\n• **Sanwer Center:** ${rates[3].price}/Qtl (20 min wait)\n\n💡 *Recommendation:* **ITC Choupal Saagar** provides the best net return considering travel fuel and quick turnaround!`;

      state.aiAgent.messages.push({
        id: 'msg-' + Date.now(),
        sender: 'agent',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: respText,
        actionCard: {
          type: 'compare_table',
          crop: crop,
          rates: rates
        }
      });
      state.aiAgent.isThinking = false;
      speakAiText(`For ${crop}, ITC Choupal is paying ${rates[1].price} and Rau Mandi is paying ${rates[0].price} per quintal.`);
      render();
      return;
    }

    // 3. Waiting Time / Crowd Detection
    const isWait = nlp.intent === 'check_wait' || q.includes('wait') || q.includes('time') || q.includes('crowd') || q.includes('rush') || q.includes('queue') || q.includes('भीड़') || q.includes('इंतज़ार') || q.includes('समय') || q.includes('fast');
    if (isWait) {
      let mandiPredictions = [];
      if (aiEngine && typeof aiEngine.predictWaitTime === 'function') {
        mandiPredictions = state.mandis.map(m => {
          const pred = aiEngine.predictWaitTime(m, 11, 'Wheat', 40, state.simulatedJam && m.id === 'RAU' ? 14 : null);
          return { mandi: m, pred };
        }).sort((a, b) => a.pred.waitMins - b.pred.waitMins);
      }

      let respText = '';
      if (mandiPredictions.length > 0) {
        respText = `⏱️ **Live Mandi Queue & Congestion Analysis (ML Predicted)**\n\nCurrent yard queue conditions & estimated turnaround across Indore division:\n\n` +
          mandiPredictions.slice(0, 4).map((item, idx) => {
            const icon = item.pred.level === 'low' ? '🟢' : item.pred.level === 'medium' ? '🟡' : '🔴';
            return `${idx + 1}. ${icon} **${item.mandi.name}:** ~${item.pred.waitMins} mins wait (${item.mandi.queueLength} in queue • ${item.pred.confidence}% confidence)`;
          }).join('\n') +
          `\n\n⚡ **AI Time-Series Recommendation:** The lowest congestion window across all mandis is **02:00 PM – 05:00 PM** (afternoon clearance). Select an afternoon slot to save ~25 minutes!`;
      } else {
        respText = `⏱️ **Live Mandi Queue & Congestion Analysis**\n\nCurrent yard queue conditions across Indore division:\n\n1. 🟢 **ITC Choupal Saagar:** ~15 mins wait (1 truck in queue)\n2. 🟢 **Sanwer Procurement Center:** ~20 mins wait (2 trucks in queue)\n3. 🟡 **Rau APMC Mandi:** ~32 mins wait (3 trucks in queue)\n4. 🟠 **Indore Chhawani:** ~45 mins wait (8 trucks in queue)\n\n⚡ **Tip:** Early morning slots (08:00 AM) or afternoon clearance (02:00 PM) have minimal delay.`;
      }

      state.aiAgent.messages.push({
        id: 'msg-' + Date.now(),
        sender: 'agent',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: respText,
        actionCard: {
          type: 'quick_actions',
          buttons: [
            { label: '⚡ Book Lowest Wait Mandi (15 mins)', mandiId: 'ITC_CHOUPAL', crop: 'Wheat', qty: 40 },
            { label: '⚡ Book Rau Mandi (08:00 AM)', mandiId: 'RAU', crop: 'Wheat', qty: 40 }
          ]
        }
      });
      state.aiAgent.isThinking = false;
      speakAiText('ITC Choupal Saagar and Sanwer have the lowest waiting times under 20 minutes right now.');
      render();
      return;
    }

    // 4. Default / Knowledge Response
    const defaultText = `Namaste ${f.name} ji! 🙏 I can assist you with:\n\n1. **Price Comparison:** *"Compare Wheat prices across all Mandis"*\n2. **Direct Booking:** *"Book slot for 50 quintals Wheat at Rau Mandi"*\n3. **Queue Status:** *"Which Mandi has lowest waiting time?"*\n4. **Moisture Norms:** Fair Average Quality (FAQ) standard requires moisture $\le 12.0\%$.\n\nWhat would you like me to do?`;

    state.aiAgent.messages.push({
      id: 'msg-' + Date.now(),
      sender: 'agent',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: defaultText
    });
    state.aiAgent.isThinking = false;
    speakAiText(`I can help you compare prices across mandis or book a slot directly. What would you like to do?`);
    render();
  }

  // --- HELPERS ---
  function showToast(title, message, type = 'success') {
    state.notificationToast = { title, message, type, id: Date.now() };
    playChime(type === 'alert' ? 'alert' : 'success');
    render();
    setTimeout(() => {
      if (state.notificationToast && state.notificationToast.id === state.notificationToast?.id) {
        state.notificationToast = null;
        render();
      }
    }, 4500);
  }

  function sendSimulatedSms(to, tag, body) {
    const newSms = {
      id: 'SMS-' + (state.smsList.length + 1),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      to,
      tag,
      body
    };
    state.smsList.unshift(newSms);
    showToast(`📱 SMS Dispatched to ${to.split(' ')[0]}`, body, 'info');
  }

  function getActiveFarmer() {
    return state.farmers.find(f => f.id === state.farmerAuth.selectedFarmerId) || state.farmers[0];
  }

  function getActiveMandi() {
    return state.mandis.find(m => m.id === state.mandiStaff.selectedMandiId) || state.mandis[0];
  }

  // --- EVENT HANDLERS ---
  window.appHandlers = {

    toggleOfflineMode: (force) => {
      state.isOffline = (typeof force === 'boolean') ? force : !state.isOffline;
      if (state.isOffline) {
        saveOfflineState();
        showToast('📶 Working Offline', 'Token #KS-RAU-108 & QR pass saved to local storage.', 'info');
      } else {
        saveOfflineState();
        showToast('🟢 Back Online', 'Synchronized live queue with Mandi Server.', 'success');
      }
      render();
    },
    toggleNotifications: (open) => {
      state.isNotificationOpen = (typeof open === 'boolean') ? open : !state.isNotificationOpen;
      render();
    },
    markAllNotificationsRead: () => {
      state.notifications.forEach(n => n.unread = false);
      showToast('Notifications Cleared', 'All alerts marked as read.');
      render();
    },
    openQrModal: () => {
      state.qrModalOpen = true;
      render();
    },
    closeQrModal: () => {
      state.qrModalOpen = false;
      render();
    },
    openStaffScanner: () => {
      state.staffScannerOpen = true;
      render();
    },
    closeStaffScanner: () => {
      state.staffScannerOpen = false;
      render();
    },
    scanStaffToken: (tokId) => {
      state.mandiStaff.selectedTokenId = tokId;
      state.staffScannerOpen = false;
      playChime('success');
      showToast('QR Code Verified ✓', `Token #${tokId} verified at Gate 2. Loaded into workstation.`);
      render();
    },
    openCropPlanner: () => {
      state.salePlanner.isOpen = true;
      if (window.KisanSetuAI) {
        state.salePlanner.plan = window.KisanSetuAI.generateCropSalePlan(state.salePlanner, state.mandis);
      }
      render();
    },
    closeCropPlanner: () => {
      state.salePlanner.isOpen = false;
      render();
    },
    recomputeCropPlan: () => {
      if (window.KisanSetuAI) {
        state.salePlanner.plan = window.KisanSetuAI.generateCropSalePlan(state.salePlanner, state.mandis);
      }
      render();
    },
    applyCropPlanAndBook: () => {
      const sp = state.salePlanner;
      state.bookingForm.crop = sp.crop;
      state.bookingForm.quantity = sp.quantity;
      if (sp.plan && sp.plan.recommendedMandi) {
        state.bookingForm.mandiId = sp.plan.recommendedMandi.id;
      }
      state.salePlanner.isOpen = false;
      state.activeTab = 'farmer';
      state.farmerAuth.currentStep = 'choose_mandi';
      state.bookingForm.bookingSection = 2;
      showToast('Plan Applied', `Auto-filled ${sp.quantity} Qtl of ${sp.crop} at ${sp.plan ? sp.plan.recommendedMandi.name : 'Rau APMC'}.`);
      render();
    },
    openQualityAdvisor: () => {
      state.qualityAdvisor.isOpen = true;
      if (window.KisanSetuAI) {
        state.qualityAdvisor.result = window.KisanSetuAI.analyzeCropQuality(state.qualityAdvisor.crop, state.qualityAdvisor.selectedSample);
      }
      render();
    },
    closeQualityAdvisor: () => {
      state.qualityAdvisor.isOpen = false;
      render();
    },
    selectQualitySample: (sampleType) => {
      state.qualityAdvisor.selectedSample = sampleType;
      if (window.KisanSetuAI) {
        state.qualityAdvisor.result = window.KisanSetuAI.analyzeCropQuality(state.qualityAdvisor.crop, sampleType);
      }
      render();
    },
    advanceQueueStage: () => {
      const tok = state.tokens.find(t => t.id === 'KS-RAU-108') || state.tokens[0];
      if ((tok.queueStage || 3) < 7) {
        tok.queueStage = (tok.queueStage || 3) + 1;
        updateTokenStatusFromStage(tok);
        playChime('success');
        showToast('Stage Advanced', `Progressed to Stage ${tok.queueStage}: ${getStageLabel(tok.queueStage)}`);
        render();
      }
    },
    prevQueueStage: () => {
      const tok = state.tokens.find(t => t.id === 'KS-RAU-108') || state.tokens[0];
      if ((tok.queueStage || 3) > 1) {
        tok.queueStage = (tok.queueStage || 3) - 1;
        updateTokenStatusFromStage(tok);
        showToast('Stage Stepped Back', `Returned to Stage ${tok.queueStage}: ${getStageLabel(tok.queueStage)}`, 'info');
        render();
      }
    },
    setQueueStage: (stage) => {
      const tok = state.tokens.find(t => t.id === 'KS-RAU-108') || state.tokens[0];
      tok.queueStage = Math.max(1, Math.min(7, stage));
      updateTokenStatusFromStage(tok);
      playChime('success');
      render();
    },

    bookSpecificMandi: (mandiId) => {
      state.activeTab = 'farmer';
      state.bookingForm.mandiId = mandiId;
      state.farmerAuth.currentStep = 'choose_mandi';
      const m = state.mandis.find(x => x.id === mandiId);
      showToast('Mandi Selected', 'Selected ' + (m ? m.name : mandiId) + '. You can now choose your delivery slot.');
      render();
    },
    toggleAiAgent: (open) => {
      state.aiAgent.isOpen = (typeof open === 'boolean') ? open : !state.aiAgent.isOpen;
      render();
      if (state.aiAgent.isOpen) {
        setTimeout(() => {
          const el = document.getElementById('ai-chat-messages');
          if (el) el.scrollTop = el.scrollHeight;
          const inputEl = document.getElementById('ai-query-input');
          if (inputEl) inputEl.focus();
        }, 100);
      }
    },
    toggleAiVoice: () => {
      state.aiAgent.voiceEnabled = !state.aiAgent.voiceEnabled;
      showToast('AI Voice', state.aiAgent.voiceEnabled ? 'Voice feedback enabled 🔊' : 'Voice feedback muted 🔇', 'info');
      render();
    },
    sendAiMessage: (queryText) => {
      const inputEl = document.getElementById('ai-query-input');
      const q = (queryText || (inputEl ? inputEl.value : '') || state.aiAgent.inputQuery || '').trim();
      if (!q) return;

      state.aiAgent.messages.push({
        id: 'msg-' + Date.now(),
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: q
      });
      state.aiAgent.inputQuery = '';
      if (inputEl) inputEl.value = '';
      state.aiAgent.isThinking = true;
      render();

      setTimeout(() => {
        const el = document.getElementById('ai-chat-messages');
        if (el) el.scrollTop = el.scrollHeight;
      }, 50);

      setTimeout(() => {
        processAiAgentQuery(q);
      }, 700);
    },
    triggerAiPrompt: (promptText) => {
      window.appHandlers.sendAiMessage(promptText);
    },
    bookViaAi: (mandiId, crop, quantity) => {
      executeAiDirectBooking({
        mandiId: mandiId || 'RAU',
        crop: crop || 'Wheat',
        quantity: quantity || 40,
        slotDate: '27-Sep-2026',
        slotTime: '08:00 AM - 11:00 AM',
        vehicleType: 'Tractor Trolley'
      });
    },

    setLang: (lang) => {
      state.lang = lang;
      render();
    },
    setTab: (tab) => {
      state.activeTab = tab;
      render();
    },
    toggleAiJamSimulation: () => {
      state.simulatedJam = !state.simulatedJam;
      const rau = state.mandis.find(m => m.id === 'mandi-1' || m.id === 'RAU') || state.mandis[0];
      if (state.simulatedJam) {
        rau._prevQueue = rau.queueLength || 14;
        rau._prevWait = rau.avgWaitMins || 24;
        rau.queueLength = 39;
        rau.liveQueue = 39;
        rau.hasBreakdown = true;
        rau.avgWaitMins = 64;

        state.rescheduleAlert = {
          delayDetected: true,
          currentWaitMins: 64,
          delayMins: 38,
          suggestedSlot: { timeWindow: '02:00 PM - 05:00 PM', predictedWaitMins: 18, timeSavedMins: 46 },
          reason: 'Electronic weighbridge sensor calibration delay & arrival surge of 39 trolleys'
        };
        showToast('⚠️ AI Anomaly Detected', 'Rau Mandi holding yard bottlenecked! Proactive reschedule recommended.');
      } else {
        rau.queueLength = rau._prevQueue || 14;
        rau.liveQueue = rau._prevQueue || 14;
        rau.hasBreakdown = false;
        rau.avgWaitMins = rau._prevWait || 24;
        state.rescheduleAlert = null;
        showToast('Simulation Normal', 'Rau Mandi telemetry restored to normal baseline.');
      }
      render();
    },
    acceptReschedule: (newTimeWindow) => {
      const windowStr = newTimeWindow || '02:00 PM - 05:00 PM';
      if (state.tokens && state.tokens[0]) {
        state.tokens[0].time = windowStr;
        state.tokens[0].slotTime = windowStr;
        state.tokens[0].predictedWaitMins = 18;
      }
      state.bookingForm.slotTime = windowStr;
      state.rescheduleAlert = null;
      showToast('✅ Slot Rescheduled by AI', `Your token has been shifted to ${windowStr}. You will save ~41 mins!`);
      state.smsList.unshift({
        id: 'SMS-' + Date.now(),
        timestamp: 'Just now',
        to: '+91 9876543210 (Ramesh Kumar)',
        body: `[VM-KSITU] AI Re-scheduling: Due to unexpected Gate 2 rush, your slot at Rau Mandi is shifted to ${windowStr}. Est. wait reduced to 18 min. Gate 3 express. - Kisan Setu`
      });
      render();
    },
    resetData: () => {
      state.farmers = JSON.parse(JSON.stringify(INITIAL_FARMERS));
      state.mandis = JSON.parse(JSON.stringify(INITIAL_MANDIS));
      state.tokens = JSON.parse(JSON.stringify(INITIAL_TOKENS));
      state.smsList = JSON.parse(JSON.stringify(INITIAL_SMS));
      state.farmerAuth.isLoggedIn = true;
      state.farmerAuth.selectedFarmerId = 'FARMER-01';
      state.bookingForm.isOpen = false;
      state.simulatedJam = false;
      state.rescheduleAlert = null;
      showToast('Data Reset', 'Prototype demo data has been restored to default state.');
      render();
    },
    setFarmerStep: (step) => {
      state.farmerAuth.currentStep = step;
      render();
    },
    
    setRegistrationSection: (sec) => {
      state.farmerAuth.formSection = Number(sec);
      render();
    },
    nextRegistrationSection: () => {
      const cur = state.farmerAuth.formSection || 1;
      if (cur < 3) {
        state.farmerAuth.formSection = cur + 1;
        render();
        window.scrollTo({ top: 120, behavior: 'smooth' });
      }
    },
    prevRegistrationSection: () => {
      const cur = state.farmerAuth.formSection || 1;
      if (cur > 1) {
        state.farmerAuth.formSection = cur - 1;
        render();
        window.scrollTo({ top: 120, behavior: 'smooth' });
      }
    },
    setBookingSection: (sec) => {
      state.bookingForm.bookingSection = Number(sec);
      render();
    },
    nextBookingSection: () => {
      state.bookingForm.bookingSection = 2;
      render();
      window.scrollTo({ top: 120, behavior: 'smooth' });
    },
    prevBookingSection: () => {
      state.bookingForm.bookingSection = 1;
      render();
      window.scrollTo({ top: 120, behavior: 'smooth' });
    },
    prefillFarmerRegistration: (farmerId) => {
      state.farmerAuth.formSection = 3;
      const f = state.farmers.find(x => x.id === farmerId) || state.farmers[0];
      state.farmerAuth.selectedFarmerId = f.id;
      state.farmerAuth.name = f.name;
      state.farmerAuth.village = f.village;
      state.farmerAuth.phone = f.phone;
      state.farmerAuth.aadhaar = f.aadhaar.replace(/(\d{4})/g, '$1 ').trim();
      state.farmerAuth.bankName = f.bankAcc.split(' ')[0] === 'SBI' ? 'State Bank of India (SBI)' : f.bankAcc.split(' ')[0] === 'BOI' ? 'Bank of India (BOI)' : 'Punjab National Bank (PNB)';
      state.farmerAuth.bankAcc = f.id === 'FARMER-01' ? '308941204091' : f.id === 'FARMER-02' ? '552109841128' : '110298418872';
      state.farmerAuth.ifsc = f.id === 'FARMER-01' ? 'SBIN0030128' : f.id === 'FARMER-02' ? 'BKID0005521' : 'PUNB0011029';
      state.farmerAuth.khasraNo = f.khasraNo;
      state.farmerAuth.landArea = f.landArea;
      state.farmerAuth.quotaWheat = f.cropQuota.Wheat.total;
      state.farmerAuth.quotaRemaining = f.cropQuota.Wheat.remaining;
      state.farmerAuth.otpSent = false;
      showToast('Form Pre-filled', `Loaded details for ${f.name} (${f.village.split(',')[0]})`);
      render();
    },
    clearRegistrationForm: () => {
      state.farmerAuth.name = '';
      state.farmerAuth.village = '';
      state.farmerAuth.phone = '+91 ';
      state.farmerAuth.aadhaar = '';
      state.farmerAuth.bankName = '';
      state.farmerAuth.bankAcc = '';
      state.farmerAuth.ifsc = '';
      state.farmerAuth.khasraNo = '';
      state.farmerAuth.landArea = '';
      state.farmerAuth.otpSent = false;
      render();
    },
    requestFarmerVerification: (e) => {
      if (e) e.preventDefault();
      const auth = state.farmerAuth;
      if (!auth.name || !auth.village || !auth.aadhaar || !auth.bankAcc || !auth.ifsc) {
        alert('Please fill in Name, Village, Aadhaar, Bank Account, and IFSC code to proceed.');
        return;
      }
      auth.isAuthenticating = true;
      render();
      setTimeout(() => {
        auth.isAuthenticating = false;
        auth.otpSent = true;
        auth.otpInput = '782194';
        sendSimulatedSms(auth.phone, 'UIDAI OTP', `[VM-UIDAI] 782194 is your Aadhaar OTP for Kisan Setu farmer registration & bank DBT authentication. Valid for 10 mins.`);
        render();
      }, 600);
    },
    verifyFarmerOtp: (e) => {
      if (e) e.preventDefault();
      const auth = state.farmerAuth;
      auth.otpSent = false;
      auth.isVerified = true;
      auth.currentStep = 'choose_mandi';
      
      // Update active farmer object
      const f = getActiveFarmer();
      f.name = auth.name;
      f.village = auth.village;
      f.phone = auth.phone;
      f.khasraNo = auth.khasraNo || f.khasraNo;
      f.landArea = auth.landArea || f.landArea;

      playChime('success');
      if (window.confetti) {
        window.confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 }, colors: ['#e11d48', '#f59e0b', '#fbbf24', '#be123c', '#d97706', '#ffe4e6'] });
      }
      showToast('Registration & e-KYC Verified! 🎉', 'UIDAI Aadhaar, Bhulekh Land Quota, and Bank Account authenticated. Now choose your Mandi.');
      render();
    },
    setMandiFilter: (filter) => {
      state.mandiFilter = filter;
      render();
    },
    selectBookingMandi: (mandiId) => {
      state.bookingForm.mandiId = mandiId;
      render();
    },

    selectDemoFarmer: (farmerId) => {
      const f = state.farmers.find(x => x.id === farmerId);
      if (f) {
        state.farmerAuth.selectedFarmerId = farmerId;
        state.farmerAuth.aadhaarInput = f.aadhaar;
        state.farmerAuth.phoneInput = f.phone.replace('+91 ', '');
        state.farmerAuth.otpSent = true;
        state.farmerAuth.otpInput = '782194';
        state.farmerAuth.isLoggedIn = true;
        showToast('Farmer Switched', `Logged in as ${f.name} (${f.village})`);
        render();
      }
    },
    requestAadhaarOtp: (e) => {
      if (e) e.preventDefault();
      state.farmerAuth.isAuthenticating = true;
      render();
      setTimeout(() => {
        state.farmerAuth.isAuthenticating = false;
        state.farmerAuth.otpSent = true;
        state.farmerAuth.otpInput = '782194';
        const f = getActiveFarmer();
        sendSimulatedSms(f.phone, 'UIDAI OTP', `[VM-UIDAI] 782194 is your Aadhaar OTP for Kisan Setu MSP Portal e-KYC. Valid for 10 mins. - GoI`);
        render();
      }, 700);
    },
    submitOtpVerify: (e) => {
      if (e) e.preventDefault();
      state.farmerAuth.isLoggedIn = true;
      showToast('Aadhaar e-KYC Verified', 'UIDAI & Bhulekh Land Record authentication successful!');
      render();
    },
    logoutFarmer: () => {
      state.farmerAuth.isLoggedIn = false;
      state.farmerAuth.otpSent = false;
      render();
    },
    toggleBookingForm: (open) => {
      state.bookingForm.isOpen = open;
      render();
    },
    handleBookingSubmit: (e) => {
      if (e) e.preventDefault();
      const f = getActiveFarmer();
      const form = state.bookingForm;
      const crop = form.crop;
      const qty = Number(form.quantity);

      if (qty > f.cropQuota[crop].remaining) {
        alert(`Quota Exceeded! You have ${f.cropQuota[crop].remaining} Quintals remaining for ${crop}.`);
        return;
      }

      form.isSubmitting = true;
      render();

      setTimeout(() => {
        form.isSubmitting = false;
        form.isOpen = false;

        const mandiObj = state.mandis.find(m => m.id === form.mandiId) || state.mandis[0];
        const cropRate = MSP_RATES[form.crop] || MSP_RATES['Wheat'];
        const effectiveRate = cropRate.total + (mandiObj.priceOffset || 0);
        const totalEstAmount = qty * effectiveRate;
        const yardWaitMins = mandiObj.avgWaitMins || 20;
        const etaMins = yardWaitMins + (mandiObj.queueLength * 8);

        const tokenNum = Math.floor(100 + Math.random() * 900);
        const newTokenId = `KS-${mandiObj.id}-${tokenNum}`;
        const assignedGate = mandiObj.type === 'private'
          ? `Gate 1 (Automated Pit ${Math.floor(Math.random() * (mandiObj.bays || 4)) + 1})`
          : `Gate ${(Math.floor(Math.random() * mandiObj.gates) + 1)} (Bay ${Math.floor(Math.random() * (mandiObj.bays || 6)) + 1})`;

        const newToken = {
          id: newTokenId,
          mandiId: mandiObj.id,
          mandiName: mandiObj.name,
          mandiType: mandiObj.type,
          mandiOperator: mandiObj.operator,
          mandiLicense: mandiObj.licenseNo || 'APMC-MP-IND-01',
          farmerId: f.id,
          farmerName: f.name,
          phone: f.phone,
          village: f.village,
          crop: form.crop,
          variety: form.variety,
          quantityQuintals: qty,
          vehicle: `${form.vehicleType} (${form.vehicleNumber})`,
          slotDate: form.slotDate,
          slotTime: form.slotTime,
          assignedGate: assignedGate,
          status: 'scheduled',
          queuePosition: mandiObj.queueLength + 1,
          pricePerQtl: effectiveRate,
          bonusPerQtl: mandiObj.priceOffset || 0,
          totalEstAmount: totalEstAmount,
          etaMins: etaMins,
          avgWaitMins: yardWaitMins,
          distanceKm: mandiObj.distanceKm || 6.8,
          travelTimeMins: mandiObj.travelTimeMins || 16,
          paymentMode: mandiObj.paymentMode || 'Direct DBT via PFMS',
          currentServingToken: mandiObj.currentServingToken,
          quality: null,
          weight: null,
          payout: null,
          createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        // Deduct quota
        f.cropQuota[crop].remaining -= qty;
        f.cropQuota[crop].used += qty;
        f.activeTokenId = newTokenId;
    state.farmerAuth.currentStep = "active_pass";

        state.tokens.push(newToken);
        mandiObj.queueLength += 1;

        sendSimulatedSms(
          f.phone,
          'SLOT CONFIRMED',
          `[VM-KSITU] Token #${newTokenId} confirmed for ${crop} (${qty} Qtl) at ${mandiObj.name}. Rate: Rs ${effectiveRate}/Qtl (Est: Rs ${totalEstAmount.toLocaleString('en-IN')}). Wait: ~${yardWaitMins}m. Gate: ${newToken.assignedGate}. Payment: ${mandiObj.paymentMode}.`
        );

        showToast('Slot Confirmed!', `Token #${newTokenId} generated with live queue tracking.`);
        render();
      }, 800);
    },
    toggleTransit: (tokenId) => {
      const tok = state.tokens.find(t => t.id === tokenId);
      if (!tok) return;
      const targetMandi = state.mandis.find(m => m.id === tok.mandiId) || getActiveMandi();
      const dist = tok.distanceKm || targetMandi.distanceKm || 6.4;
      const eta = tok.etaMins || targetMandi.travelTimeMins || 20;
      const gate = tok.assignedGate || targetMandi.gate || 'Gate 2';

      if (tok.status === 'scheduled') {
        tok.status = 'in_transit';
        tok.distanceKm = dist;
        tok.etaMins = eta;
        sendSimulatedSms(
          tok.phone,
          'IN TRANSIT',
          `[VM-KSITU] Transit started for Token #${tok.id} to ${targetMandi.name}. Mandi control room notified. Live arrival ETA: ${eta} mins (${dist} km). ${gate} allocated.`
        );
        showToast('Transit Started', `${targetMandi.name} control room updated with live vehicle transit telemetry (${dist} km, ETA: ${eta} mins).`);
      } else if (tok.status === 'in_transit') {
        tok.status = 'at_gate';
        sendSimulatedSms(
          tok.phone,
          'ARRIVED AT GATE',
          `[VM-KSITU] Vehicle arrived at ${targetMandi.name} (${gate}). Present QR Code at Gate Scanner for digital boom barrier entry.`
        );
        showToast('Arrived at Gate', `Please scan digital gate pass at ${targetMandi.name} ${gate}.`);
      }
      render();
    },
    // Mandi Staff Actions
    callNextToken: () => {
      const mandi = getActiveMandi();
      const waitingTokens = state.tokens.filter(t => t.mandiId === mandi.id && (t.status === 'scheduled' || t.status === 'in_transit' || t.status === 'at_gate'));
      if (waitingTokens.length === 0) {
        showToast('Queue Empty', 'No more pending vehicles in the queue for this Mandi.', 'info');
        return;
      }

      const nextTok = waitingTokens[0];
      nextTok.status = 'in_quality_check';
      mandi.currentServingToken = nextTok.id;
      if (mandi.queueLength > 0) mandi.queueLength -= 1;

      sendSimulatedSms(
        nextTok.phone,
        'GATE ENTRY CALL',
        `[VM-KSITU] Token #${nextTok.id}: Your turn is NOW! Please proceed to ${nextTok.assignedGate} for Quality Sampling & Weighing.`
      );
      showToast('Next Token Called', `Token ${nextTok.id} (${nextTok.farmerName}) called to Quality Check.`);
      render();
    },
    admitToGate: (tokenId) => {
      const tok = state.tokens.find(t => t.id === tokenId);
      if (tok) {
        tok.status = 'at_gate';
        sendSimulatedSms(tok.phone, 'GATE VERIFIED', `[VM-KSITU] Token #${tok.id} security pass verified at Gate Entry. Proceed to Bay.`);
        showToast('Vehicle Admitted', `Token #${tok.id} admitted through Gate security.`);
        render();
      }
    },
    selectStaffToken: (tokenId) => {
      state.mandiStaff.selectedTokenId = tokenId;
      render();
    },
    saveQualityCheck: (tokenId) => {
      const tok = state.tokens.find(t => t.id === tokenId);
      if (!tok) return;

      const m = state.mandiStaff.moisture;
      const f = state.mandiStaff.foreignMatter;
      let grade = 'Grade A (FAQ Standard)';
      let dock = 0;

      if (m > 12.0) {
        dock += Math.round((m - 12.0) * 35);
        grade = 'Grade B (Moisture Dock applied)';
      }
      if (f > 0.75) {
        dock += 25;
        grade = 'Grade B (Refraction dock)';
      }
      if (m > 14.0) {
        grade = 'Rejected (Moisture > 14%)';
      }

      tok.quality = {
        moisture: m,
        foreignMatter: f,
        shriveled: state.mandiStaff.shriveled,
        grade,
        dockPercent: dock,
        inspector: state.mandiStaff.inspectorName,
        verifiedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      tok.status = 'at_weighbridge';

      sendSimulatedSms(
        tok.phone,
        'QUALITY INSPECTION',
        `[VM-KSITU] Quality Check for #${tok.id}: ${grade}. Moisture: ${m}%, Foreign Matter: ${f}%. Proceeding to Gross Weighbridge.`
      );

      showToast('Quality Inspection Saved', `${tok.id} graded as ${grade}. Moved to Weighbridge.`);
      render();
    },
    completeWeighbridgeAndProcurement: (tokenId) => {
      const tok = state.tokens.find(t => t.id === tokenId);
      if (!tok) return;

      const gross = Number(state.mandiStaff.grossWeight);
      const tare = Number(state.mandiStaff.tareWeight);
      const netKg = gross - tare;
      const netQtl = Math.round((netKg / 100) * 10) / 10;

      const cropRate = MSP_RATES[tok.crop] || MSP_RATES['Wheat'];
      const m = state.mandis.find(x => x.id === tok.mandiId) || state.mandis[0];
      const mandiBonus = m.priceOffset || 0;
      const finalRate = cropRate.total + mandiBonus - (tok.quality?.dockPercent || 0);
      const totalPayout = Math.round(netQtl * finalRate);

      const utrNo = (m.type === 'private' ? 'NEFT-' + m.id + '-' : 'PFMS-') + Date.now().toString().slice(-8);
      const dbtStatus = m.type === 'private' ? 'Disbursed (Instant Corporate NEFT)' : 'Disbursed (Aadhaar PFMS)';

      tok.weight = { gross, tare, netKg, netQuintals: netQtl };
      tok.payout = {
        mspRate: finalRate,
        baseRate: cropRate.msp,
        bonus: cropRate.bonus,
        mandiBonus: mandiBonus,
        dock: tok.quality?.dockPercent || 0,
        totalAmount: totalPayout,
        dbtStatus: dbtStatus,
        paymentMode: m.paymentMode || 'Direct Bank Credit',
        utrNo,
        disbursedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      tok.status = 'completed';

      // Update Mandi Stats
      if (m) {
        m.todayProcuredMT += Math.round(netQtl / 10);
      }

      sendSimulatedSms(
        tok.phone,
        'MSP DISBURSED (DBT)',
        `[VM-KSITU] ₹${totalPayout.toLocaleString('en-IN')} credited via PFMS DBT for ${netQtl} Qtl ${tok.crop} (Token #${tok.id}). UTR: ${utrNo}. - Kisan Setu`
      );

      showToast('Procurement Completed! 🎉', `₹${totalPayout.toLocaleString('en-IN')} disbursed to ${tok.farmerName}. e-Receipt generated.`);
      
      // Trigger confetti celebration!
      if (window.confetti) {
        window.confetti({ particleCount: 75, spread: 70, origin: { y: 0.6 }, colors: ['#e11d48', '#f59e0b', '#fbbf24', '#be123c', '#d97706', '#ffe4e6'] });
      }

      render();
    },
    // Concurrency Stress Tester (Slide 2 Problem & Solution Showcase)
    toggleConcurrencySim: () => {
      const sim = state.concurrencySimulator;
      if (sim.isRunning) {
        sim.isRunning = false;
        render();
        return;
      }

      sim.isRunning = true;
      sim.processedCount = 0;
      sim.droppedCount = 0;
      render();

      let ticks = 0;
      const interval = setInterval(() => {
        if (!sim.isRunning || ticks >= 20) {
          clearInterval(interval);
          sim.isRunning = false;
          render();
          return;
        }
        ticks++;

        if (sim.systemMode === 'sync') {
          // Legacy Synchronous System simulation
          sim.cpuLoad = Math.min(100, 75 + Math.floor(Math.random() * 25));
          sim.latencyMs = 3800 + Math.floor(Math.random() * 2200);
          sim.dbConnections = 32; // Pool exhausted
          sim.processedCount += Math.floor(Math.random() * 80);
          sim.droppedCount += Math.floor(Math.random() * 320); // Massive drops!
          sim.logHistory.unshift(`[ALERT] 504 Gateway Timeout: DB Connection Pool Exhausted (32/32). Bhulekh sync lockup.`);
        } else {
          // Kisan Setu Decoupled Asynchronous Engine (RabbitMQ + Redis)
          sim.cpuLoad = 22 + Math.floor(Math.random() * 14);
          sim.latencyMs = 32 + Math.floor(Math.random() * 18);
          sim.dbConnections = 8;
          sim.processedCount += Math.floor(Math.random() * 450) + 500;
          sim.droppedCount = 0; // ZERO drops!
          sim.logHistory.unshift(`[ASYNC QUEUE] Ingested 500 slots. Worker pool validated Bhulekh land cache in 24ms. Tokens distributed.`);
        }
        if (sim.logHistory.length > 8) sim.logHistory.pop();
        render();
      }, 500);
    },
    setSimMode: (mode) => {
      state.concurrencySimulator.systemMode = mode;
      state.concurrencySimulator.logHistory = [];
      state.concurrencySimulator.processedCount = 0;
      state.concurrencySimulator.droppedCount = 0;
      if (mode === 'sync') {
        state.concurrencySimulator.cpuLoad = 98;
        state.concurrencySimulator.latencyMs = 4200;
      } else {
        state.concurrencySimulator.cpuLoad = 24;
        state.concurrencySimulator.latencyMs = 38;
      }
      render();
    }
  };

  // --- SVG ICON HELPERS (Clean inline SVGs for zero dependencies) ---
  const Icons = {
    tractor: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="m10 11 11 .9a1 1 0 0 1 .8 1.1l-.665 4.158a1 1 0 0 1-.988.842H20"/><path d="M16 18h-5"/><path d="M18 5a1 1 0 0 0-1 1v5.573"/><path d="M3 4h8.129a1 1 0 0 1 .99.863L13 11.246"/><path d="M4 11V4"/><path d="M7 15h.01"/><path d="M8 10.1V4"/><circle cx="18" cy="18" r="2"/><circle cx="7" cy="15" r="5"/></svg>`,
    building: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M10 12h4"/><path d="M10 8h4"/><path d="M14 21v-3a2 2 0 0 0-4 0v3"/><path d="M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2"/><path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"/></svg>`,
    chart: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 3v16a2 2 0 0 0 2 2h16"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>`,
    sms: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/><path d="M7 11h10"/><path d="M7 15h6"/><path d="M7 7h8"/></svg>`,
    server: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/></svg>`,
    check: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>`,
    clock: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    qr: `<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M3 12h.01"/><path d="M12 3h.01"/><path d="M12 16v.01"/><path d="M16 12h1"/><path d="M21 12v.01"/><path d="M12 21v-1"/></svg>`,
    arrowRight: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`,
    mapPin: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
    scale: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>`,
    shield: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>`,
    badgeCheck: `<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/></svg>`
  };

  
  function getStageLabel(stage) {
    const names = [
      '',
      'Token Confirmed',
      'In Transit',
      'Holding Yard Queue',
      'Gate 2 Entry',
      'Quality Inspection',
      'Electronic Weighment',
      'DBT Final Settlement'
    ];
    return names[stage] || 'Processing';
  }


  function generateQrSvg(content, size = 160) {
    const str = String(content || 'KS-RAU-108');
    const hash = str.split('').reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) % 1000000, 7);
    const grid = 21;
    const cellSize = (size / grid).toFixed(2);
    let rects = '';

    for (let r = 0; r < grid; r++) {
      for (let c = 0; c < grid; c++) {
        const isFinderTL = (r < 7 && c < 7) && (r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4));
        const isFinderTR = (r < 7 && c >= grid - 7) && (r === 0 || r === 6 || c === grid - 1 || c === grid - 7 || (r >= 2 && r <= 4 && c >= grid - 5 && c <= grid - 3));
        const isFinderBL = (r >= grid - 7 && c < 7) && (r === grid - 1 || r === grid - 7 || c === 0 || c === 6 || (r >= grid - 5 && r <= grid - 3 && c >= 2 && c <= 4));
        const isTiming = (r === 6 || c === 6) && (r % 2 === 0 || c % 2 === 0);
        const isData = !((r < 8 && c < 8) || (r < 8 && c >= grid - 8) || (r >= grid - 8 && c < 8)) && ((r * 7 + c * 13 + hash) % 3 === 0 || (r * 11 + c * 5 + hash) % 7 === 0);

        if (isFinderTL || isFinderTR || isFinderBL || isTiming || isData) {
          const x = (c * cellSize).toFixed(1);
          const y = (r * cellSize).toFixed(1);
          const w = (cellSize - 0.2).toFixed(1);
          const h = (cellSize - 0.2).toFixed(1);
          rects += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#1c1917" rx="${(isFinderTL || isFinderTR || isFinderBL) ? '1' : '0.5'}" />`;
        }
      }
    }

    return `
      <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" class="mx-auto block" xmlns="http://www.w3.org/2000/svg">
        <rect width="${size}" height="${size}" fill="#ffffff" rx="8" />
        ${rects}
        <circle cx="${(size / 2).toFixed(1)}" cy="${(size / 2).toFixed(1)}" r="${(cellSize * 2.2).toFixed(1)}" fill="#be123c" />
        <text x="${(size / 2).toFixed(1)}" y="${(size / 2 + 3.5).toFixed(1)}" fill="#ffffff" font-size="9" font-family="sans-serif" font-weight="900" text-anchor="middle">KS</text>
      </svg>
    `;
  }


  function renderBankVerificationTable(auth) {
    return `
      <div class="bg-white rounded-2xl border border-stone-200 p-4 shadow-2xs space-y-3">
        <div class="flex items-center justify-between border-b border-stone-100 pb-2">
          <div class="flex items-center gap-2">
            <span class="text-base">🏦</span>
            <span class="font-extrabold text-xs text-stone-900 uppercase tracking-wider">Bank & DBT Verification Status</span>
          </div>
          <span class="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-900 border border-emerald-300">
            Payment Ready ✓
          </span>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-xs text-left">
            <thead class="text-[10px] uppercase text-stone-400 border-b border-stone-100">
              <tr>
                <th class="py-1.5 font-bold">Verification Check</th>
                <th class="py-1.5 font-bold">Details</th>
                <th class="py-1.5 font-bold text-right">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-stone-100 text-[11px]">
              <tr>
                <td class="py-2 text-stone-600 font-medium">Account Holder</td>
                <td class="py-2 font-bold text-stone-900">${auth.name}</td>
                <td class="py-2 text-right"><span class="text-emerald-700 font-bold">✅ 100% Name Match</span></td>
              </tr>
              <tr>
                <td class="py-2 text-stone-600 font-medium">Bank & Account</td>
                <td class="py-2 font-mono font-bold text-stone-900">${auth.bankName} (XXXX ${auth.bankAcc.slice(-4)})</td>
                <td class="py-2 text-right"><span class="text-emerald-700 font-bold">✅ Verified Active</span></td>
              </tr>
              <tr>
                <td class="py-2 text-stone-600 font-medium">IFSC Routing</td>
                <td class="py-2 font-mono font-bold text-stone-900">${auth.ifsc} (Rau Branch)</td>
                <td class="py-2 text-right"><span class="text-emerald-700 font-bold">✅ Validated</span></td>
              </tr>
              <tr>
                <td class="py-2 text-stone-600 font-medium">Aadhaar NPCI Seeding</td>
                <td class="py-2 text-stone-800">Seeded with Aadhaar (•••• ${auth.aadhaar.slice(-4)})</td>
                <td class="py-2 text-right"><span class="text-emerald-700 font-bold">✅ Active (DBT Enabled)</span></td>
              </tr>
              <tr>
                <td class="py-2 text-stone-600 font-medium">PFMS Bridge Status</td>
                <td class="py-2 text-stone-800">Public Finance Management System Ready</td>
                <td class="py-2 text-right"><span class="text-emerald-700 font-bold">✅ Cleared for Payout</span></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-[11px] text-emerald-950 flex items-center justify-between">
          <span class="flex items-center gap-1.5">
            <span>🔒</span>
            <span>Sensitive banking credentials masked for data privacy.</span>
          </span>
          <strong class="font-bold text-emerald-800 font-mono">DBT Clearance: T+0 Ready</strong>
        </div>
      </div>
    `;
  }


  function renderFarmerHomeCard(auth, token, mandi) {
    const cropRate = MSP_RATES[token.crop] || MSP_RATES['Wheat'];
    const effectiveRate = token.pricePerQtl || (cropRate.total + (mandi.priceOffset || 0));
    const totalPayout = token.quantityQuintals * effectiveRate;
    const pred = (window.KisanSetuAI && window.KisanSetuAI.predictWaitTime) 
      ? window.KisanSetuAI.predictWaitTime(mandi, 11, token.crop, token.quantityQuintals)
      : { waitRange: '32–40 min', confidence: 94 };

    return `
      <div class="bg-gradient-to-br from-rose-900 via-rose-950 to-amber-950 text-white rounded-3xl p-5 sm:p-7 shadow-xl border-2 border-amber-400/40 relative overflow-hidden space-y-5">
        <div class="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-amber-500/10 blur-2xl pointer-events-none"></div>

        <!-- TOP GREETING -->
        <div class="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-stone-950 flex items-center justify-center font-black text-2xl shadow-md shrink-0">
              🌾
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h2 class="text-xl sm:text-2xl font-black tracking-tight">Namaste, ${auth.name} 👋</h2>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400/30 text-amber-200 border border-amber-300/30">Verified Kisan</span>
              </div>
              <p class="text-xs text-amber-200/90">${auth.village} • ${token.crop} (${token.quantityQuintals} Quintals) • Land: ${auth.landArea.split('(')[0]}</p>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <button onclick="appHandlers.openQrModal()"
              class="px-3.5 py-1.5 rounded-xl bg-white text-rose-950 font-black text-xs hover:bg-amber-50 transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer">
              <span>🎫</span>
              <span>QR Token Pass</span>
            </button>
          </div>
        </div>

        <!-- ACTIVE TOKEN & QUEUE HIGHLIGHTS -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div class="p-3 bg-white/10 rounded-2xl border border-white/15">
            <span class="text-[10px] uppercase font-bold text-amber-200 block">Active Token</span>
            <div class="font-mono text-lg sm:text-xl font-black text-white mt-0.5">${token.id}</div>
            <span class="text-[10px] text-amber-300 block font-bold">${mandi.name.split('(')[0]}</span>
          </div>

          <div class="p-3 bg-white/10 rounded-2xl border border-white/15">
            <span class="text-[10px] uppercase font-bold text-amber-200 block">Gate & Bay</span>
            <div class="text-lg sm:text-xl font-black text-white mt-0.5">${token.assignedGate.split('(')[0]}</div>
            <span class="text-[10px] text-stone-300 block">General Platform 3</span>
          </div>

          <div class="p-3 bg-white/10 rounded-2xl border border-white/15">
            <span class="text-[10px] uppercase font-bold text-amber-200 block">Queue Position</span>
            <div class="text-lg sm:text-xl font-black text-amber-300 mt-0.5">${token.queuePosition || 14} Ahead</div>
            <span class="text-[10px] text-stone-300 block">Holding Yard</span>
          </div>

          <div class="p-3 bg-white/10 rounded-2xl border border-white/15">
            <span class="text-[10px] uppercase font-bold text-amber-200 block">ML Expected Wait</span>
            <div class="font-mono text-lg sm:text-xl font-black text-white mt-0.5">${token.predictedWaitRange || pred.waitRange || '32–40 min'}</div>
            <span class="text-[10px] text-emerald-300 block font-bold">${pred.confidence || 94}% Confidence</span>
          </div>
        </div>

        <!-- VALUATION PILL -->
        <div class="p-3 bg-white/10 rounded-2xl border border-white/15 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div class="flex items-center gap-2">
            <span class="text-lg">📈</span>
            <span>MSP Rate: <strong class="font-mono text-amber-300 font-bold">₹${effectiveRate}/Qtl</strong> • Total Crop: <strong>${token.quantityQuintals} Qtl</strong></span>
          </div>
          <div class="font-mono font-black text-base text-amber-300">
            Estimated Payout: ₹${totalPayout.toLocaleString('en-IN')}
          </div>
        </div>

        <!-- 5 FAST ACTION SHORTCUTS -->
        <div class="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1">
          <button onclick="appHandlers.setFarmerStep('active_pass')"
            class="p-2.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-center transition-all hover:scale-102 cursor-pointer">
            <span class="text-base block">🗺️</span>
            <span class="font-bold text-[11px] block mt-0.5">Track Token</span>
          </button>

          <button onclick="appHandlers.openQrModal()"
            class="p-2.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-center transition-all hover:scale-102 cursor-pointer">
            <span class="text-base block">🎫</span>
            <span class="font-bold text-[11px] block mt-0.5">Show QR Pass</span>
          </button>

          <button onclick="appHandlers.openCropPlanner()"
            class="p-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 font-black text-center transition-all hover:scale-102 shadow-sm cursor-pointer">
            <span class="text-base block">🌾</span>
            <span class="font-black text-[11px] block mt-0.5">Sale Planner</span>
          </button>

          <button onclick="appHandlers.openQualityAdvisor()"
            class="p-2.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-center transition-all hover:scale-102 cursor-pointer">
            <span class="text-base block">🔬</span>
            <span class="font-bold text-[11px] block mt-0.5">Grain Pre-Check</span>
          </button>

          <button onclick="appHandlers.toggleAiAgent(true)"
            class="p-2.5 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-center transition-all hover:scale-102 col-span-2 sm:col-span-1 cursor-pointer">
            <span class="text-base block">🤖</span>
            <span class="font-bold text-[11px] block mt-0.5">Kisan Sahayak</span>
          </button>
        </div>
      </div>
    `;
  }


  // --- AI CROP SALE PLANNER MODAL ---
  function renderCropSalePlannerModal() {
    if (!state.salePlanner || !state.salePlanner.isOpen) return '';
    const sp = state.salePlanner;
    const plan = sp.plan || (window.KisanSetuAI && window.KisanSetuAI.generateCropSalePlan(sp, state.mandis));

    return `
      <div class="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        <div class="bg-white rounded-3xl border border-stone-200 shadow-2xl max-w-2xl w-full p-5 sm:p-7 space-y-5 animate-slide-up my-6 max-h-[90vh] overflow-y-auto">
          <div class="flex items-center justify-between border-b border-stone-100 pb-3">
            <div class="flex items-center gap-3">
              <div class="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500 to-rose-700 text-white flex items-center justify-center text-2xl shadow-sm shrink-0 font-bold">
                🌾
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <h3 class="font-black text-lg sm:text-xl text-stone-900 tracking-tight">AI Crop Sale Planner</h3>
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-950 border border-amber-300">स्मार्ट विक्रय योजना</span>
                </div>
                <p class="text-xs text-stone-500">End-to-end MSP selling plan with timings, net payout & weather intel</p>
              </div>
            </div>
            <button onclick="appHandlers.closeCropPlanner()" class="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center text-base font-bold cursor-pointer">
              ✕
            </button>
          </div>

          <div class="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
            <div>
              <label class="block text-[10px] font-bold text-stone-500 uppercase mb-1">Crop (फसल)</label>
              <select class="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 font-bold text-stone-900 bg-white"
                onchange="state.salePlanner.crop = this.value; appHandlers.recomputeCropPlan();">
                <option value="Wheat" ${sp.crop === 'Wheat' ? 'selected' : ''}>Wheat (गेहूं)</option>
                <option value="Soybean" ${sp.crop === 'Soybean' ? 'selected' : ''}>Soybean (सोयाबीन)</option>
                <option value="Mustard" ${sp.crop === 'Mustard' ? 'selected' : ''}>Mustard (सरसों)</option>
                <option value="Chana" ${sp.crop === 'Chana' ? 'selected' : ''}>Chana (चना)</option>
              </select>
            </div>

            <div>
              <label class="block text-[10px] font-bold text-stone-500 uppercase mb-1">Quantity (मात्रा)</label>
              <input type="number" min="5" max="300" value="${sp.quantity}"
                onchange="state.salePlanner.quantity = this.value; appHandlers.recomputeCropPlan();"
                class="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 font-bold text-stone-900 bg-white">
            </div>

            <div>
              <label class="block text-[10px] font-bold text-stone-500 uppercase mb-1">Location (स्थान)</label>
              <input type="text" value="${sp.village}"
                onchange="state.salePlanner.village = this.value; appHandlers.recomputeCropPlan();"
                class="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 font-bold text-stone-900 bg-white">
            </div>

            <div>
              <label class="block text-[10px] font-bold text-stone-500 uppercase mb-1">Target Date</label>
              <select class="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 font-bold text-stone-900 bg-white"
                onchange="state.salePlanner.targetDate = this.value; appHandlers.recomputeCropPlan();">
                <option value="Tomorrow (28-Sep-2026)">Tomorrow (28-Sep)</option>
                <option value="Today (27-Sep-2026)">Today (27-Sep)</option>
                <option value="Day After (29-Sep-2026)">Day After (29-Sep)</option>
              </select>
            </div>
          </div>

          ${plan ? `
            <div class="space-y-4">
              <div class="p-4 rounded-2xl bg-gradient-to-br from-rose-900 via-rose-950 to-amber-950 text-white shadow-md border border-amber-400/40 relative overflow-hidden">
                <div class="flex flex-wrap items-center justify-between gap-3 relative z-10">
                  <div>
                    <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-stone-950 font-black mb-1">
                      🏆 AI Recommended Blueprint: ${plan.recommendedMandi.name}
                    </span>
                    <div class="text-xl sm:text-2xl font-black">${plan.crop} • ${plan.quantity} Quintals</div>
                    <p class="text-xs text-amber-200 mt-0.5">${plan.recommendedMandi.assignedGate} • Official MSP: ₹${plan.recommendedMandi.ratePerQtl}/Qtl</p>
                  </div>
                  <div class="text-left sm:text-right bg-white/10 p-3 rounded-xl border border-white/20">
                    <span class="text-[10px] uppercase font-bold text-amber-200 block">Estimated Net Take-Home</span>
                    <div class="font-mono text-2xl sm:text-3xl font-black text-amber-300">₹${plan.financials.estimatedNetPayout.toLocaleString('en-IN')}</div>
                    <span class="text-[10px] text-stone-200 block font-bold">Effective ₹${plan.financials.effectiveRatePerQtl}/Qtl</span>
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div class="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-1.5">
                  <span class="text-[10px] font-extrabold uppercase text-stone-400 block">⏰ Timing & Turnaround</span>
                  <div class="font-bold text-stone-900">Reach By: <strong class="text-rose-900">${plan.timings.suggestedArrival}</strong></div>
                  <div class="text-stone-600">Depart Village: ${plan.timings.suggestedDeparture}</div>
                  <div class="text-stone-600">Expected Wait: <strong class="text-emerald-700">${plan.timings.expectedWaitRange}</strong></div>
                  <div class="text-[11px] text-amber-800 font-bold">Total Time: ~${plan.timings.totalTimeCommitment}</div>
                </div>

                <div class="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-1.5">
                  <span class="text-[10px] font-extrabold uppercase text-stone-400 block">🚜 Travel & Distance</span>
                  <div class="font-bold text-stone-900">${plan.timings.travelDistanceKm} km from ${sp.village.split(',')[0]}</div>
                  <div class="text-stone-600">Tractor Travel: ~${plan.timings.travelTimeOneWayMins} mins</div>
                  <div class="text-stone-600">Roundtrip Diesel: ₹${plan.financials.fuelDeduction}</div>
                  <div class="text-[11px] text-stone-500">Wait Opportunity: ₹${plan.financials.delayCost}</div>
                </div>

                <div class="p-3.5 bg-amber-50/70 rounded-xl border border-amber-200 space-y-1.5">
                  <span class="text-[10px] font-extrabold uppercase text-amber-900 block flex items-center gap-1">
                    <span>${plan.weather.icon}</span> Weather Intelligence
                  </span>
                  <div class="font-bold text-stone-900">${plan.weather.condition}</div>
                  <div class="text-[11px] text-amber-900">${plan.weather.showerRisk}</div>
                  <div class="text-[10px] text-stone-600 leading-tight">${plan.weather.advisory}</div>
                </div>
              </div>

              <div class="p-4 bg-white rounded-xl border border-stone-200 space-y-2">
                <h5 class="text-xs font-black text-stone-900 uppercase tracking-wider flex items-center justify-between">
                  <span>📄 Required Documents for Gate Entry</span>
                  <span class="text-[10px] text-stone-400 font-normal">Check before leaving farm</span>
                </h5>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  ${plan.requiredDocs.map(doc => `
                    <div class="p-2.5 rounded-lg bg-stone-50 border border-stone-200 flex items-start gap-2">
                      <span class="text-emerald-700 font-black text-sm shrink-0">✓</span>
                      <div>
                        <strong class="text-stone-900 block">${doc.name}</strong>
                        <span class="text-[11px] text-stone-500">${doc.detail}</span>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>

              <div class="pt-2 flex items-center justify-between gap-3">
                <button onclick="appHandlers.closeCropPlanner()"
                  class="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 font-bold text-xs hover:bg-stone-50 cursor-pointer">
                  Cancel
                </button>
                <button onclick="appHandlers.applyCropPlanAndBook()"
                  class="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-rose-700 via-rose-800 to-red-800 hover:from-rose-800 hover:to-red-900 text-white font-black text-xs sm:text-sm shadow-md transition-all hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer">
                  <span>⚡ Book This Plan Now (Auto-fill & Confirm Token)</span>
                  <span>➔</span>
                </button>
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  // --- AI CROP QUALITY PRE-CHECK ADVISOR MODAL ---
  function renderCropQualityAdvisorModal() {
    if (!state.qualityAdvisor || !state.qualityAdvisor.isOpen) return '';
    const qa = state.qualityAdvisor;
    const result = qa.result || (window.KisanSetuAI && window.KisanSetuAI.analyzeCropQuality(qa.crop, qa.selectedSample));

    return `
      <div class="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        <div class="bg-white rounded-3xl border border-stone-200 shadow-2xl max-w-xl w-full p-5 sm:p-7 space-y-5 animate-slide-up my-6 max-h-[90vh] overflow-y-auto">
          <div class="flex items-center justify-between border-b border-stone-100 pb-3">
            <div class="flex items-center gap-3">
              <div class="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500 to-rose-700 text-white flex items-center justify-center text-2xl shadow-sm shrink-0 font-bold">
                🔬
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <h3 class="font-black text-lg sm:text-xl text-stone-900 tracking-tight">AI Crop Quality Pre-Check</h3>
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-950 border border-amber-300">अनाज गुणवत्ता सलाहकार</span>
                </div>
                <p class="text-xs text-stone-500">Preliminary grain inspection for moisture & FAQ compliance before travelling</p>
              </div>
            </div>
            <button onclick="appHandlers.closeQualityAdvisor()" class="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center text-base font-bold cursor-pointer">
              ✕
            </button>
          </div>

          <div class="space-y-2">
            <label class="block text-xs font-extrabold text-stone-700 uppercase tracking-wider">Select Demo Grain Sample or Upload Photo:</label>
            <div class="grid grid-cols-2 gap-2 text-xs">
              <button type="button" onclick="appHandlers.selectQualitySample('clean_faq')"
                class="p-3 rounded-xl border-2 text-left transition-all cursor-pointer ${
                  qa.selectedSample === 'clean_faq'
                    ? 'border-emerald-600 bg-emerald-50/70 ring-2 ring-emerald-500/20'
                    : 'border-stone-200 bg-stone-50 hover:bg-white'
                }">
                <div class="font-black text-stone-900 flex items-center gap-1.5">
                  <span>🌾</span> Sample 1: Clean Sharbati
                </div>
                <div class="text-[11px] text-stone-500 mt-1">Sun-dried (11.4% moisture, &lt;0.5% chaff)</div>
                <span class="inline-block mt-1 text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.2 rounded">FAQ Grade A</span>
              </button>

              <button type="button" onclick="appHandlers.selectQualitySample('high_moisture')"
                class="p-3 rounded-xl border-2 text-left transition-all cursor-pointer ${
                  qa.selectedSample === 'high_moisture'
                    ? 'border-amber-600 bg-amber-50/70 ring-2 ring-amber-500/20'
                    : 'border-stone-200 bg-stone-50 hover:bg-white'
                }">
                <div class="font-black text-stone-900 flex items-center gap-1.5">
                  <span>🌧️</span> Sample 2: Rain Affected
                </div>
                <div class="text-[11px] text-stone-500 mt-1">High moisture (13.8%, needs drying)</div>
                <span class="inline-block mt-1 text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.2 rounded">Conditioning Needed</span>
              </button>
            </div>
          </div>

          ${result ? `
            <div class="space-y-3">
              <div class="p-4 rounded-2xl border ${result.color} flex items-center justify-between">
                <div>
                  <span class="text-xs uppercase font-extrabold tracking-wider block opacity-80">Preliminary AI Classification</span>
                  <div class="text-lg font-black mt-0.5">${result.visualGrade}</div>
                  <div class="text-xs mt-1 font-semibold">${result.advice}</div>
                </div>
                <span class="px-3 py-1.5 rounded-xl font-black text-xs shadow-2xs ${qa.selectedSample === 'clean_faq' ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'}">
                  ${result.badge.split(' ')[0]} ${result.status === 'likely_acceptable' ? 'Ready for MSP' : 'Dry Before Visit'}
                </span>
              </div>

              <div class="grid grid-cols-3 gap-2.5 text-xs">
                <div class="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <span class="text-[10px] uppercase font-bold text-stone-400 block">Moisture (नमी)</span>
                  <strong class="font-mono text-base font-black text-stone-900">${result.metrics.moistureEstimate}</strong>
                  <span class="text-[10px] ${qa.selectedSample === 'clean_faq' ? 'text-emerald-700' : 'text-rose-700'} font-bold block">${result.metrics.moistureStatus}</span>
                  <span class="text-[9px] text-stone-400">${result.metrics.moistureNorm}</span>
                </div>

                <div class="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <span class="text-[10px] uppercase font-bold text-stone-400 block">Foreign Matter (कचरा)</span>
                  <strong class="font-mono text-base font-black text-stone-900">${result.metrics.foreignMatterEstimate}</strong>
                  <span class="text-[10px] text-emerald-700 font-bold block">${result.metrics.foreignMatterStatus}</span>
                  <span class="text-[9px] text-stone-400">${result.metrics.foreignMatterNorm}</span>
                </div>

                <div class="p-3 bg-stone-50 rounded-xl border border-stone-200">
                  <span class="text-[10px] uppercase font-bold text-stone-400 block">Shriveled / Broken</span>
                  <strong class="font-mono text-base font-black text-stone-900">${result.metrics.shriveledBroken}</strong>
                  <span class="text-[10px] text-emerald-700 font-bold block">${result.metrics.shriveledStatus}</span>
                  <span class="text-[9px] text-stone-400">${result.metrics.shriveledNorm}</span>
                </div>
              </div>

              <div class="p-3 bg-stone-100 rounded-xl border border-stone-200 text-[11px] text-stone-600 leading-relaxed">
                ${result.disclaimer}
              </div>

              <div class="pt-2 flex justify-end">
                <button onclick="appHandlers.closeQualityAdvisor()"
                  class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-700 to-red-700 hover:from-rose-800 hover:to-red-800 text-white font-bold text-xs shadow-xs cursor-pointer">
                  Done & Return to Booking ➔
                </button>
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  // --- FULLSCREEN QR MODAL ---
  function renderQrModal() {
    if (!state.qrModalOpen) return '';
    const tok = state.tokens.find(t => t.id === 'KS-RAU-108') || state.tokens[0];
    const mandi = state.mandis.find(m => m.id === tok.mandiId) || state.mandis[0];

    return `
      <div class="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
        <div class="bg-white rounded-3xl border border-stone-200 shadow-2xl max-w-sm w-full p-6 text-center space-y-4 animate-scale-in">
          <div class="flex items-center justify-between border-b border-stone-100 pb-2">
            <span class="text-xs font-black uppercase text-stone-500 tracking-wider">Gate Clearance QR Pass</span>
            <button onclick="appHandlers.closeQrModal()" class="w-7 h-7 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 font-bold text-sm cursor-pointer">✕</button>
          </div>

          <div class="p-4 bg-stone-50 rounded-2xl border-2 border-stone-300 inline-block shadow-inner">
            ${generateQrSvg(tok.id + '|' + tok.farmerName + '|' + tok.quantityQuintals + '|' + tok.crop, 200)}
          </div>

          <div>
            <div class="font-mono text-2xl font-black text-stone-900">${tok.id}</div>
            <div class="text-xs font-bold text-rose-900 mt-0.5">${tok.farmerName} • ${tok.crop} (${tok.quantityQuintals} Qtl)</div>
            <p class="text-[11px] text-stone-500 mt-1">${mandi.name} • <strong>${tok.assignedGate}</strong></p>
          </div>

          <div class="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 font-medium">
            Show this QR code at the weighbridge scanner for express 1-minute gate verification.
          </div>

          <button onclick="window.print()" class="w-full py-2.5 rounded-xl border border-stone-200 hover:bg-stone-50 font-bold text-xs text-stone-700 flex items-center justify-center gap-1.5 cursor-pointer">
            <span>🖨️</span> Print QR Pass
          </button>
        </div>
      </div>
    `;
  }

  // --- STAFF QR SCANNER MODAL ---
  function renderStaffScannerModal() {
    if (!state.staffScannerOpen) return '';

    return `
      <div class="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
        <div class="bg-white rounded-3xl border border-stone-200 shadow-2xl max-w-md w-full p-6 space-y-4 animate-slide-up text-center">
          <div class="flex items-center justify-between border-b border-stone-100 pb-2">
            <div class="flex items-center gap-2">
              <span class="text-xl">📷</span>
              <span class="font-black text-sm text-stone-900">Mandi Gate QR Scanner</span>
            </div>
            <button onclick="appHandlers.closeStaffScanner()" class="w-7 h-7 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 font-bold text-sm cursor-pointer">✕</button>
          </div>

          <div class="relative w-64 h-64 mx-auto rounded-2xl bg-stone-950 overflow-hidden border-4 border-amber-400 flex items-center justify-center shadow-lg">
            <div class="absolute inset-4 border border-dashed border-white/40 rounded-xl pointer-events-none"></div>
            <div class="w-full h-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent animate-laser-scan shadow-[0_0_12px_#f43f5e]"></div>
            
            <div class="text-white text-center p-4">
              <div class="text-3xl mb-2 animate-bounce">📱</div>
              <div class="text-xs font-mono text-amber-300">Aim camera at farmer's QR pass</div>
              <div class="text-[10px] text-stone-400 mt-1">Optical OCR & Barcode Sensor Active</div>
            </div>
          </div>

          <div class="space-y-2 pt-1 text-left">
            <span class="text-[10px] uppercase font-bold text-stone-400 block text-center">⚡ Judge Quick-Scan (Simulate Gate Read):</span>
            <div class="grid grid-cols-3 gap-1.5">
              <button onclick="appHandlers.scanStaffToken('KS-RAU-108')"
                class="p-2 rounded-xl bg-stone-50 hover:bg-amber-50 border border-stone-200 text-center transition-all hover:scale-105 cursor-pointer">
                <span class="font-mono font-black text-xs text-rose-900 block">KS-RAU-108</span>
                <span class="text-[10px] text-stone-600">Ramesh (Wheat)</span>
              </button>
              <button onclick="appHandlers.scanStaffToken('KS-RAU-106')"
                class="p-2 rounded-xl bg-stone-50 hover:bg-amber-50 border border-stone-200 text-center transition-all hover:scale-105 cursor-pointer">
                <span class="font-mono font-black text-xs text-stone-900 block">KS-RAU-106</span>
                <span class="text-[10px] text-stone-600">Balram (Wheat)</span>
              </button>
              <button onclick="appHandlers.scanStaffToken('KS-RAU-107')"
                class="p-2 rounded-xl bg-stone-50 hover:bg-amber-50 border border-stone-200 text-center transition-all hover:scale-105 cursor-pointer">
                <span class="font-mono font-black text-xs text-stone-900 block">KS-RAU-107</span>
                <span class="text-[10px] text-stone-600">Devendra (Soy)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // --- NOTIFICATIONS DRAWER ---
  function renderNotificationsDrawer() {
    if (!state.isNotificationOpen) return '';

    return `
      <div class="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-xs flex justify-end">
        <div class="w-full max-w-sm bg-white h-full shadow-2xl border-l border-stone-200 flex flex-col animate-slide-left">
          <div class="p-4 bg-gradient-to-r from-rose-800 to-amber-900 text-white flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="text-xl">🔔</span>
              <div>
                <h3 class="font-black text-sm">Farmer Notification Center</h3>
                <p class="text-[10px] text-amber-200">${state.notifications.filter(n => n.unread).length} Unread Alerts</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <button onclick="appHandlers.markAllNotificationsRead()" class="text-[10px] font-bold bg-white/20 hover:bg-white/30 text-white px-2 py-1 rounded-lg cursor-pointer">
                Mark Read
              </button>
              <button onclick="appHandlers.toggleNotifications(false)" class="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm cursor-pointer">
                ✕
              </button>
            </div>
          </div>

          <div class="flex-1 overflow-y-auto p-4 space-y-3 bg-stone-50/70">
            ${state.notifications.map(n => `
              <div class="p-3.5 rounded-2xl border bg-white shadow-2xs transition-all ${
                n.unread ? 'border-amber-300 ring-1 ring-amber-400/30' : 'border-stone-200 opacity-80'
              }">
                <div class="flex items-start justify-between gap-2 mb-1">
                  <span class="font-extrabold text-xs text-stone-900">${n.title}</span>
                  <span class="text-[10px] text-stone-400 font-mono">${n.timestamp}</span>
                </div>
                <p class="text-xs text-stone-600 leading-relaxed">${n.body}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

// --- RENDER FUNCTIONS ---
  function render() {
    const root = document.getElementById('root');
    if (!root) return;

    const t = i18n[state.lang];
    const farmer = getActiveFarmer();
    const mandi = getActiveMandi();

    root.innerHTML = `
      <div class="min-h-screen bg-stone-100/70 pb-16 font-sans text-stone-900 antialiased selection:bg-rose-200">
        <!-- TOP TRICOLOR ACCENT BAR -->
        <div class="h-1.5 w-full bg-linear-to-r from-rose-600 via-amber-400 to-red-600 shadow-xs"></div>

        <!-- HEADER -->
        <header class="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
          <div class="max-w-7xl mx-auto px-3 sm:px-6">
            <div class="flex items-center justify-between py-2.5 border-b border-stone-100">
              <!-- LOGO & BRANDING -->
              <div class="flex items-center gap-3">
                <div class="relative w-10 h-10 rounded-xl overflow-hidden shadow-sm ring-2 ring-amber-400/60 bg-gradient-to-br from-rose-800 to-amber-900 flex items-center justify-center shrink-0">
                  <img src="./logo-icon.svg" alt="Kisan Setu Logo" class="w-full h-full object-contain" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
                  <span style="display:none;" class="w-full h-full items-center justify-center text-xl">🌾</span>
                </div>
                <div>
                  <div class="flex items-center gap-2">
                    <span class="font-extrabold text-lg sm:text-xl text-stone-900 tracking-tight">${t.appName}</span>
                    <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-950 border border-amber-300 font-extrabold">
                      ${t.sihBadge}
                    </span>
                  </div>
                  <p class="text-[11px] text-stone-500 hidden sm:block">${t.tagline}</p>
                </div>
              </div>

              <!-- CONTROLS & STATUS -->
              <div class="flex items-center gap-2 sm:gap-3">
                <!-- Offline Mode Toggle (For Judges & Rural Test) -->
                <button onclick="appHandlers.toggleOfflineMode()"
                  class="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                    state.isOffline ? 'bg-amber-100 text-amber-950 border-amber-300 font-bold' : 'bg-rose-50 text-rose-900 border-rose-200'
                  }"
                  title="Toggle offline simulated mode to test zero-network rural capability">
                  <span class="w-2 h-2 rounded-full ${state.isOffline ? 'bg-amber-600' : 'bg-emerald-500 animate-ping'}"></span>
                  <span class="text-[11px] font-bold">${state.isOffline ? '📶 Offline Mode' : '🟢 Online'}</span>
                </button>

                <!-- Farmer Notifications Bell -->
                <button onclick="appHandlers.toggleNotifications()"
                  class="relative p-1.5 rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-700 transition-colors cursor-pointer"
                  title="Farmer Notification Center">
                  ${Icons.bell}
                  ${state.notifications.filter(n => n.unread).length > 0 ? `
                    <span class="absolute -top-1 -right-1 w-4 h-4 bg-rose-600 text-white rounded-full text-[9px] font-black flex items-center justify-center animate-pulse">
                      ${state.notifications.filter(n => n.unread).length}
                    </span>
                  ` : ''}
                </button>

                <!-- Language Toggle -->
                <button onclick="appHandlers.setLang('${state.lang === 'en' ? 'hi' : 'en'}')"
                  class="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100 transition-colors shadow-2xs">
                  <span>🌐</span>
                  <span>${state.lang === 'en' ? '🇮🇳 हिंदी' : '🇬🇧 English'}</span>
                </button>

                <!-- AI Anomaly Simulation Toggle (For Judges) -->
                <button onclick="appHandlers.toggleAiJamSimulation()"
                  class="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    state.simulatedJam 
                      ? 'bg-rose-700 text-white shadow-md ring-2 ring-rose-400 animate-pulse' 
                      : 'text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 border border-stone-300'
                  }"
                  title="Simulate sudden queue congestion & weighbridge delay to test proactive AI re-scheduling">
                  <span>⚡</span>
                  <span class="hidden sm:inline font-extrabold">${state.simulatedJam ? '⚠️ Anomaly Active' : 'Simulate Jam'}</span>
                </button>

                <!-- Reset Demo Data -->
                <button onclick="appHandlers.resetData()"
                  class="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-stone-200 transition-colors"
                  title="${t.resetDemo}">
                  <span class="text-xs">🔄</span>
                  <span class="hidden md:inline">${t.resetDemo}</span>
                </button>
              </div>
            </div>

            <!-- NAVIGATION ROLES -->
            <nav class="flex items-center space-x-1 sm:space-x-2 py-2 overflow-x-auto no-scrollbar">
              <button onclick="appHandlers.setTab('farmer')"
                class="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${state.activeTab === 'farmer' ? 'bg-gradient-to-r from-rose-700 to-red-800 text-white shadow-sm ring-1 ring-amber-400/50' : 'text-stone-600 hover:bg-rose-50/60 hover:text-rose-900'}">
                ${Icons.tractor}
                <span>${t.tabFarmer}</span>
              </button>

              <button onclick="appHandlers.setTab('staff')"
                class="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${state.activeTab === 'staff' ? 'bg-gradient-to-r from-rose-700 to-red-800 text-white shadow-sm ring-1 ring-amber-400/50' : 'text-stone-600 hover:bg-rose-50/60 hover:text-rose-900'}">
                ${Icons.building}
                <span>${t.tabStaff}</span>
                <span class="ml-1 px-1.5 py-0.5 rounded-full text-[10px] bg-amber-400/30 text-white font-bold">4</span>
              </button>

              <button onclick="appHandlers.setTab('ministry')"
                class="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${state.activeTab === 'ministry' ? 'bg-gradient-to-r from-rose-700 to-red-800 text-white shadow-sm ring-1 ring-amber-400/50' : 'text-stone-600 hover:bg-rose-50/60 hover:text-rose-900'}">
                ${Icons.chart}
                <span>${t.tabMinistry}</span>
              </button>

              <button onclick="appHandlers.setTab('sms')"
                class="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${state.activeTab === 'sms' ? 'bg-gradient-to-r from-rose-700 to-red-800 text-white shadow-sm ring-1 ring-amber-400/50' : 'text-stone-600 hover:bg-rose-50/60 hover:text-rose-900'}">
                ${Icons.sms}
                <span>${t.tabSms}</span>
                <span class="px-1.5 py-0.5 rounded-full text-[10px] font-extrabold ${state.activeTab === 'sms' ? 'bg-white text-rose-900' : 'bg-amber-100 text-amber-900'}">
                  ${state.smsList.length}
                </span>
              </button>

              <button onclick="appHandlers.setTab('tech')"
                class="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${state.activeTab === 'tech' ? 'bg-indigo-800 text-white shadow-sm ring-1 ring-indigo-900' : 'text-stone-600 hover:bg-stone-100 hover:text-indigo-900'}">
                ${Icons.server}
                <span>${t.tabTech}</span>
                <span class="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-indigo-100 text-indigo-800">SIH Core</span>
              </button>
            </nav>
          </div>
        </header>

        <!-- LIVE RATES & PRIVATE MANDI HIGHLIGHT TICKER (VISIBLE ON ALL SCREENS) -->
        <div class="bg-gradient-to-r from-amber-50 via-rose-50/30 to-amber-100/50 border-b border-amber-200/90 py-2 px-3 sm:px-6 shadow-2xs">
          <div class="max-w-7xl mx-auto flex items-center justify-between gap-3 text-xs">
            <div class="flex items-center gap-2.5 overflow-x-auto whitespace-nowrap no-scrollbar py-0.5">
              <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-gradient-to-r from-rose-700 to-amber-600 text-white font-black text-[10px] uppercase tracking-wider shadow-2xs shadow-2xs shrink-0">
                <span>⚡</span> Live Procurement Rates
              </span>
              <div class="inline-flex items-center gap-2 font-bold text-stone-800 text-[11px]">
                <span class="text-amber-950 bg-amber-100/90 px-2 py-0.5 rounded border border-amber-300 flex items-center gap-1 shadow-2xs">
                  <span>🏢</span> <strong>ITC Choupal Saagar (Private):</strong> <span class="font-mono text-rose-950 font-black">₹2,460/Qtl</span> <span class="text-amber-800 font-black text-[10px]">(+₹60 Bonus • 15m Fast-Track)</span>
                </span>
                <span class="text-amber-950 bg-amber-100/90 px-2 py-0.5 rounded border border-amber-300 flex items-center gap-1 shadow-2xs">
                  <span>🏢</span> <strong>Adani Agri Modern Silo (Private):</strong> <span class="font-mono text-rose-950 font-black">₹2,450/Qtl</span> <span class="text-amber-800 font-black text-[10px]">(+₹50 Bonus • 18m Tipper)</span>
                </span>
                <span class="text-stone-700 bg-stone-100 px-2 py-0.5 rounded border border-stone-200 flex items-center gap-1">
                  <span>🏛️</span> <strong>Rau APMC (Govt):</strong> <span class="font-mono text-stone-900 font-bold">₹2,400/Qtl</span> <span class="text-stone-500 font-normal text-[10px]">(Govt MSP)</span>
                </span>
                <span class="text-stone-700 bg-stone-100 px-2 py-0.5 rounded border border-stone-200 flex items-center gap-1">
                  <span>🏛️</span> <strong>Indore Chhawani (Govt):</strong> <span class="font-mono text-stone-900 font-bold">₹2,420/Qtl</span>
                </span>
              </div>
            </div>

            <div class="hidden sm:flex items-center gap-2 shrink-0">
              <button onclick="appHandlers.openCropPlanner()"
                class="px-2.5 py-1 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 font-black text-xs shadow-2xs flex items-center gap-1 cursor-pointer">
                <span>🌾</span>
                <span>AI Crop Sale Planner</span>
              </button>
              <button onclick="appHandlers.openQualityAdvisor()"
                class="px-2.5 py-1 rounded-lg bg-white border border-stone-300 hover:bg-stone-50 text-stone-800 font-bold text-xs shadow-2xs flex items-center gap-1 cursor-pointer">
                <span>🔬</span>
                <span>Grain Pre-Check</span>
              </button>
              <button onclick="appHandlers.setTab('farmer'); appHandlers.setFarmerStep('choose_mandi');"
                class="px-3 py-1 rounded-lg bg-gradient-to-r from-rose-700 to-red-700 hover:from-rose-800 hover:to-red-800 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer">
                <span>Compare & Book</span>
                <span>➔</span>
              </button>
            </div>
          </div>
        </div>

        <!-- NOTIFICATION TOAST -->
        ${state.notificationToast ? `
          <div class="fixed top-24 right-4 z-50 max-w-sm w-full bg-white rounded-xl shadow-xl border border-stone-200 p-4 animate-slide-in flex items-start gap-3">
            <div class="w-8 h-8 rounded-lg ${state.notificationToast.type === 'alert' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-950 border border-amber-300'} flex items-center justify-center font-bold text-sm shrink-0">
              ${state.notificationToast.type === 'alert' ? '⚠️' : '🔔'}
            </div>
            <div class="flex-1">
              <h4 class="font-bold text-xs text-stone-900">${state.notificationToast.title}</h4>
              <p class="text-[11px] text-stone-600 mt-0.5 leading-relaxed">${state.notificationToast.message}</p>
            </div>
          </div>
        ` : ''}

        <!-- MAIN BODY VIEW -->
        ${state.isOffline ? `
          <div class="bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-bold px-4 py-2 text-xs text-center border-b border-amber-400 flex items-center justify-center gap-2 shadow-xs">
            <span>📶</span>
            <span>Working in Offline Mode (Last synced: ${state.offlineLastSynced || '11:42 AM'}). Your Gate Token, QR Pass & Queue status are cached locally and work 100% without internet.</span>
            <button onclick="appHandlers.toggleOfflineMode(false)" class="underline text-stone-900 font-black ml-2 cursor-pointer">Switch Online</button>
          </div>
        ` : ''}
        <main class="max-w-7xl mx-auto px-3 sm:px-6 py-6 animate-fade-in">
          ${renderActiveView()}
        </main>

        <!-- ALL COMPONENT MODALS -->
        ${renderCropSalePlannerModal()}
        ${renderCropQualityAdvisorModal()}
        ${renderQrModal()}
        ${renderStaffScannerModal()}
        ${renderNotificationsDrawer()}

        <!-- FLOATING AI AGENT BUTTON (FAB) -->
        <button onclick="appHandlers.toggleAiAgent()"
          class="fixed bottom-5 right-5 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-rose-700 via-red-800 to-amber-800 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-amber-400/50 group">
          <span class="w-3 h-3 rounded-full bg-amber-400 animate-ping shrink-0"></span>
          <span class="text-lg shrink-0">🤖</span>
          <div class="text-left">
            <div class="text-xs font-black tracking-tight leading-tight flex items-center gap-1.5">
              <span>Kisan Sahayak AI</span>
              <span class="text-[9px] font-bold bg-amber-400 text-amber-950 px-1.5 py-0.2 rounded-full uppercase">Agent</span>
            </div>
            <div class="text-[10px] text-amber-200">Compare Prices & Book Slot</div>
          </div>
        </button>

        <!-- AI ASSISTANT MODAL / DRAWER -->
        ${state.aiAgent.isOpen ? renderAiAssistantModal() : ''}
      </div>
    `;
  }

  function renderActiveView() {
    switch (state.activeTab) {
      case 'farmer':
        return renderFarmerView();
      case 'staff':
        return renderStaffView();
      case 'ministry':
        return renderMinistryView();
      case 'sms':
        return renderSmsView();
      case 'tech':
        return renderTechView();
      default:
        return renderFarmerView();
    }
  }

  // ==========================================
  // VIEW 1: FARMER MOBILE APP & DASHBOARD
  // ==========================================
  function renderFarmerView() {
    const t = i18n[state.lang];
    const auth = state.farmerAuth;
    const f = getActiveFarmer();
    const token = state.tokens.find(tok => tok.id === f.activeTokenId);
    const selectedMandi = state.mandis.find(m => m.id === state.bookingForm.mandiId) || state.mandis[0];

    return `
      <div class="max-w-4xl mx-auto space-y-6">
        
        <!-- FARMER CLEAN HOME DASHBOARD (Namaste Ramesh Card) -->
        ${auth.isVerified ? renderFarmerHomeCard(auth, token || state.tokens[0], selectedMandi) : ''}

        <!-- STEPPER HEADER NAVIGATION -->
        <div class="bg-white rounded-2xl border border-stone-200 p-3 sm:p-4 shadow-xs">
          <div class="grid grid-cols-3 gap-2">
            <!-- STEP 1 TAB -->
            <button onclick="appHandlers.setFarmerStep('register')"
              class="flex items-center gap-2 p-2 sm:p-3 rounded-xl text-left transition-all ${
                auth.currentStep === 'register' 
                  ? 'bg-rose-50 border-2 border-rose-600 text-rose-950 font-black shadow-2xs card-hover-lift' 
                  : 'bg-stone-50 border border-stone-200 text-stone-600 hover:bg-stone-100'
              }">
              <div class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                auth.isVerified ? 'bg-amber-500 text-amber-950 font-black' : auth.currentStep === 'register' ? 'bg-rose-700 text-white' : 'bg-stone-300 text-stone-700'
              }">
                ${auth.isVerified ? '✓' : '1'}
              </div>
              <div class="hidden sm:block">
                <div class="text-xs font-bold leading-tight">Farmer Registration</div>
                <div class="text-[10px] text-stone-500">Aadhaar & Bank Details</div>
              </div>
              <div class="sm:hidden text-xs font-bold">1. Registration</div>
            </button>

            <!-- STEP 2 TAB -->
            <button onclick="appHandlers.setFarmerStep('choose_mandi')"
              class="flex items-center gap-2 p-2 sm:p-3 rounded-xl text-left transition-all ${
                auth.currentStep === 'choose_mandi' 
                  ? 'bg-rose-50 border-2 border-rose-600 text-rose-950 font-black shadow-2xs card-hover-lift' 
                  : auth.isVerified ? 'bg-stone-50 border border-stone-200 text-stone-700 hover:bg-stone-100' : 'bg-stone-100/50 border border-dashed border-stone-300 text-stone-400 cursor-not-allowed'
              }">
              <div class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                token ? 'bg-amber-500 text-amber-950 font-black' : auth.currentStep === 'choose_mandi' ? 'bg-rose-700 text-white' : 'bg-stone-300 text-stone-700'
              }">
                ${token ? '✓' : '2'}
              </div>
              <div class="hidden sm:block">
                <div class="text-xs font-bold leading-tight">Choose Mandi & Slot</div>
                <div class="text-[10px] text-amber-700 font-bold">Govt & Private Mandis</div>
              </div>
              <div class="sm:hidden text-xs font-bold">2. Mandis & Slot</div>
            </button>

            <!-- STEP 3 TAB -->
            <button onclick="${token ? "appHandlers.setFarmerStep('active_pass')" : "alert('No active gate pass yet. Complete Mandi slot booking in Step 2 to generate your pass.')"}"
              class="flex items-center gap-2 p-2 sm:p-3 rounded-xl text-left transition-all ${
                auth.currentStep === 'active_pass' 
                  ? 'bg-rose-50 border-2 border-rose-600 text-rose-950 font-black shadow-2xs card-hover-lift' 
                  : token ? 'bg-stone-50 border border-stone-200 text-stone-700 hover:bg-stone-100' : 'bg-stone-100/50 border border-dashed border-stone-300 text-stone-400 cursor-not-allowed'
              }">
              <div class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                auth.currentStep === 'active_pass' ? 'bg-rose-700 text-white' : token ? 'bg-amber-500 text-amber-950 font-black' : 'bg-stone-300 text-stone-700'
              }">
                3
              </div>
              <div class="hidden sm:block">
                <div class="text-xs font-bold leading-tight">Digital Gate Pass</div>
                <div class="text-[10px] text-stone-500">Live Queue & QR Pass</div>
              </div>
              <div class="sm:hidden text-xs font-bold">3. Gate Pass</div>
            </button>
          </div>
        </div>

        <!-- VIEW SWITCH BASED ON STEP -->
        ${
          auth.currentStep === 'register' 
            ? renderRegistrationDashboard() 
            : auth.currentStep === 'choose_mandi' 
            ? renderMandiSelectionAndBookingDashboard() 
            : renderFarmerTokenPipeline(token || state.tokens[0])
        }

      </div>
    `;
  }

  // --- SUB-VIEW 1: FARMER REGISTRATION DASHBOARD ---
    // --- SUB-VIEW 1: FARMER REGISTRATION DASHBOARD (MOBILE-FIRST MULTI-SECTION WIZARD) ---
  function renderRegistrationDashboard() {
    const auth = state.farmerAuth;
    const curSec = auth.formSection || 1;

    return `
      <div class="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden animate-fade-in">
        <!-- HEADER BANNER -->
        <div class="bg-gradient-to-r from-rose-800 via-red-900 to-amber-950 text-white p-4 sm:p-6 border-b-2 border-amber-400/40">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div class="flex items-center gap-3">
              <div class="w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-2xl shadow-xs shrink-0">
                👨‍🌾
              </div>
              <div>
                <div class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/15 text-amber-200 border border-amber-300/30 mb-0.5">
                  <span>🔒 Step 1 of 3 • Government e-KYC Verification</span>
                </div>
                <h2 class="text-lg sm:text-2xl font-black tracking-tight">Farmer Registration & Bank DBT</h2>
                <p class="text-[11px] sm:text-xs text-amber-200/90">Organized in 3 quick sections for easy mobile entry without scrolling.</p>
              </div>
            </div>

            <!-- Pre-fill 1-Click Judge Buttons -->
            <div class="bg-white/10 p-2 rounded-xl border border-white/20 text-xs text-right w-full sm:w-auto">
              <span class="block text-[10px] font-bold uppercase tracking-wider text-amber-200 mb-1">⚡ Judge 1-Click Quick Fill:</span>
              <div class="flex flex-wrap gap-1 justify-start sm:justify-end">
                <button type="button" onclick="appHandlers.prefillFarmerRegistration('FARMER-01')"
                  class="px-2 py-1 rounded-lg bg-white text-rose-900 hover:bg-amber-50 text-[11px] font-bold border border-amber-200 shadow-2xs transition-colors">
                  Ramesh (Rau)
                </button>
                <button type="button" onclick="appHandlers.prefillFarmerRegistration('FARMER-02')"
                  class="px-2 py-1 rounded-lg bg-white text-rose-900 hover:bg-amber-50 text-[11px] font-bold border border-amber-200 shadow-2xs transition-colors">
                  Suresh (Rangwasa)
                </button>
                <button type="button" onclick="appHandlers.prefillFarmerRegistration('FARMER-03')"
                  class="px-2 py-1 rounded-lg bg-white text-rose-900 hover:bg-amber-50 text-[11px] font-bold border border-amber-200 shadow-2xs transition-colors">
                  Rajesh (Sanwer)
                </button>
                <button type="button" onclick="appHandlers.clearRegistrationForm()"
                  class="px-2 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-white text-[11px] font-bold transition-colors">
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- MOBILE-FIRST SECTION TABS (PREVENTS SCROLLING) -->
        <div class="px-3 sm:px-6 pt-3 pb-2.5 bg-stone-50 border-b border-stone-200 sticky top-[61px] z-20 backdrop-blur-md">
          <div class="flex items-center justify-between text-[11px] font-extrabold uppercase tracking-wider text-stone-500 mb-2">
            <span class="flex items-center gap-1.5">
              <span>📑</span> Registration Wizard (अनुभाग)
            </span>
            <span class="px-2 py-0.5 rounded-full bg-rose-100 text-rose-900 font-bold">
              Section ${curSec} of 3
            </span>
          </div>

          <div class="grid grid-cols-3 gap-1.5 sm:gap-2">
            <button type="button" onclick="appHandlers.setRegistrationSection(1)"
              class="py-2 px-1.5 rounded-xl text-center transition-all card-hover-lift ${
                curSec === 1
                  ? 'bg-gradient-to-r from-rose-700 to-red-800 text-white font-black shadow-xs ring-1 ring-amber-400/40'
                  : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50 font-bold'
              }">
              <div class="text-[11px] sm:text-xs leading-tight">👤 1. Profile</div>
              <div class="text-[9px] ${curSec === 1 ? 'text-rose-100' : 'text-stone-400'}">Aadhaar e-KYC</div>
            </button>

            <button type="button" onclick="appHandlers.setRegistrationSection(2)"
              class="py-2 px-1.5 rounded-xl text-center transition-all card-hover-lift ${
                curSec === 2
                  ? 'bg-gradient-to-r from-rose-700 to-red-800 text-white font-black shadow-xs ring-1 ring-amber-400/40'
                  : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50 font-bold'
              }">
              <div class="text-[11px] sm:text-xs leading-tight">🏦 2. Bank & Land</div>
              <div class="text-[9px] ${curSec === 2 ? 'text-rose-100' : 'text-stone-400'}">DBT & Quota</div>
            </button>

            <button type="button" onclick="appHandlers.setRegistrationSection(3)"
              class="py-2 px-1.5 rounded-xl text-center transition-all card-hover-lift ${
                curSec === 3
                  ? 'bg-gradient-to-r from-rose-700 to-red-800 text-white font-black shadow-xs ring-1 ring-amber-400/40'
                  : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50 font-bold'
              }">
              <div class="text-[11px] sm:text-xs leading-tight">🏢 3. Mandi Choice</div>
              <div class="text-[9px] ${curSec === 3 ? 'text-rose-100' : 'text-stone-400'}">Govt vs Private</div>
            </button>
          </div>
        </div>

        <form onsubmit="appHandlers.requestFarmerVerification(event)" class="p-4 sm:p-6 space-y-5">
          
          <!-- SECTION 1: PERSONAL & AADHAAR e-KYC -->
          ${curSec === 1 ? `
            <div class="space-y-4 animate-fade-in">
              <div class="flex items-center justify-between border-b border-stone-200 pb-2">
                <h4 class="text-xs font-black text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                  <span>👤</span> Section 1: Personal & Aadhaar Details (व्यक्तिगत व आधार विवरण)
                </h4>
                <span class="text-[10px] text-rose-700 font-bold">Part 1 of 3</span>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label class="block font-bold text-stone-700 mb-1">Full Name / किसान का पूरा नाम *</label>
                  <input type="text" required value="${auth.name}"
                    oninput="state.farmerAuth.name = this.value"
                    placeholder="e.g. Ramesh Kumar"
                    class="w-full px-3 py-2.5 rounded-xl border border-stone-300 font-bold text-stone-900 focus:ring-2 focus:ring-rose-500 bg-white">
                </div>

                <div>
                  <label class="block font-bold text-stone-700 mb-1">Village & District / गाँव व जिला *</label>
                  <input type="text" required value="${auth.village}"
                    oninput="state.farmerAuth.village = this.value"
                    placeholder="e.g. Rau Village, Indore"
                    class="w-full px-3 py-2.5 rounded-xl border border-stone-300 font-bold text-stone-900 focus:ring-2 focus:ring-rose-500 bg-white">
                </div>

                <div>
                  <label class="block font-bold text-stone-700 mb-1">Mobile Number (For OTP & Alerts) *</label>
                  <input type="text" required value="${auth.phone}"
                    oninput="state.farmerAuth.phone = this.value"
                    placeholder="+91 9876543210"
                    class="w-full px-3 py-2.5 rounded-xl border border-stone-300 font-mono font-bold text-stone-900 focus:ring-2 focus:ring-rose-500 bg-white">
                </div>
              </div>

              <!-- UIDAI Aadhaar Verification -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                <div>
                  <label class="block font-bold text-stone-700 mb-1 flex justify-between">
                    <span>12-Digit Aadhaar Number *</span>
                    <span class="text-rose-700 font-mono text-[10px]">UIDAI Integrated</span>
                  </label>
                  <input type="text" maxlength="14" required value="${auth.aadhaar}"
                    oninput="state.farmerAuth.aadhaar = this.value"
                    placeholder="1234 5678 9012"
                    class="w-full px-3 py-2.5 rounded-xl border border-stone-300 font-mono font-black text-sm tracking-widest text-rose-950 focus:ring-2 focus:ring-rose-500 bg-white">
                  <span class="text-[10px] text-stone-500 mt-1 block">Aadhaar validated via simulated OTP verification</span>
                </div>

                <div class="p-3 bg-amber-50/80 rounded-xl border border-amber-200 space-y-1 text-xs">
                  <div class="font-bold text-amber-950 flex items-center gap-1.5">
                    <span>🛡️</span> Aadhaar e-KYC Direct Seeding
                  </div>
                  <p class="text-[11px] text-stone-700 leading-relaxed">
                    Direct Aadhaar seeding ensures transparent MSP payment transfers without middlemen or identity duplication.
                  </p>
                </div>
              </div>

              <div class="pt-3 border-t border-stone-100 flex items-center justify-between">
                <span class="text-[11px] text-stone-500">Filled? Proceed to Bank & Land</span>
                <button type="button" onclick="appHandlers.nextRegistrationSection()"
                  class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-700 to-red-700 hover:from-rose-800 hover:to-red-800 text-white font-extrabold text-xs shadow-xs flex items-center gap-1.5">
                  <span>Continue to Bank & Land (Section 2)</span>
                  <span>➔</span>
                </button>
              </div>
            </div>
          ` : ''}

          <!-- SECTION 2: BANK ACCOUNT & LAND RECORDS -->
          ${curSec === 2 ? `
            <div class="space-y-4 animate-fade-in">
              <div class="flex items-center justify-between border-b border-stone-200 pb-2">
                <h4 class="text-xs font-black text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🏦</span> Section 2: Bank Account & Land Records (बैंक व भूमि रिकॉर्ड)
                </h4>
                <span class="text-[10px] text-rose-700 font-bold">Part 2 of 3</span>
              </div>

              <!-- Bank Details -->
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label class="block font-bold text-stone-700 mb-1">Bank Name / बैंक का नाम *</label>
                  <input type="text" required value="${auth.bankName}"
                    oninput="state.farmerAuth.bankName = this.value"
                    placeholder="e.g. State Bank of India (SBI)"
                    class="w-full px-3 py-2.5 rounded-xl border border-stone-300 font-bold text-stone-900 focus:ring-2 focus:ring-rose-500 bg-white">
                </div>

                <div>
                  <label class="block font-bold text-stone-700 mb-1">Account Number / खाता संख्या *</label>
                  <input type="text" required value="${auth.bankAcc}"
                    oninput="state.farmerAuth.bankAcc = this.value"
                    placeholder="e.g. 308941204091"
                    class="w-full px-3 py-2.5 rounded-xl border border-stone-300 font-mono font-bold text-stone-900 focus:ring-2 focus:ring-rose-500 bg-white">
                </div>

                <div>
                  <label class="block font-bold text-stone-700 mb-1">IFSC Code / आईएफएससी कोड *</label>
                  <input type="text" required value="${auth.ifsc}"
                    oninput="state.farmerAuth.ifsc = this.value"
                    placeholder="e.g. SBIN0030128"
                    class="w-full px-3 py-2.5 rounded-xl border border-stone-300 font-mono font-bold uppercase text-stone-900 focus:ring-2 focus:ring-rose-500 bg-white">
                </div>
              </div>

              <!-- BANK VERIFICATION TABLE (Official Status) -->
              ${renderBankVerificationTable(auth)}

              <!-- Bhulekh Land Records -->
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
                <div>
                  <label class="block font-bold text-stone-700 mb-1">Khasra Number (खसरा संख्या) *</label>
                  <input type="text" value="${auth.khasraNo}"
                    oninput="state.farmerAuth.khasraNo = this.value"
                    placeholder="214/1-क"
                    class="w-full px-3 py-2.5 rounded-xl border border-stone-300 font-mono font-bold text-stone-900 focus:ring-2 focus:ring-rose-500 bg-white">
                </div>

                <div>
                  <label class="block font-bold text-stone-700 mb-1">Land Holding (भूमि क्षेत्रफल) *</label>
                  <input type="text" value="${auth.landArea}"
                    oninput="state.farmerAuth.landArea = this.value"
                    placeholder="4.2 Hectares"
                    class="w-full px-3 py-2.5 rounded-xl border border-stone-300 font-bold text-stone-900 focus:ring-2 focus:ring-rose-500 bg-white">
                </div>

                <div>
                  <label class="block font-bold text-stone-700 mb-1">Permissible Wheat Quota</label>
                  <div class="px-3 py-2.5 rounded-xl border border-amber-300 bg-amber-50/70 font-mono font-black text-amber-950 flex justify-between items-center">
                    <span>${auth.quotaWheat} Quintals</span>
                    <span class="text-[10px] text-amber-800 font-bold">Bhulekh Verified</span>
                  </div>
                </div>
              </div>

              <div class="pt-3 border-t border-stone-100 flex items-center justify-between">
                <button type="button" onclick="appHandlers.prevRegistrationSection()"
                  class="px-4 py-2 rounded-xl border border-stone-200 text-stone-700 font-bold text-xs hover:bg-stone-50">
                  ← Back to Profile
                </button>
                <button type="button" onclick="appHandlers.nextRegistrationSection()"
                  class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-700 to-red-700 hover:from-rose-800 hover:to-red-800 text-white font-extrabold text-xs shadow-xs flex items-center gap-1.5">
                  <span>Continue to Mandi Channel (Section 3)</span>
                  <span>➔</span>
                </button>
              </div>
            </div>
          ` : ''}

          <!-- SECTION 3: PREFERRED PROCUREMENT CHANNEL & VERIFY -->
          ${curSec === 3 ? `
            <div class="space-y-4 animate-fade-in">
              <div class="flex items-center justify-between border-b border-stone-200 pb-2">
                <h4 class="text-xs font-black text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🏢</span> Section 3: Preferred Procurement Channel (Government vs Private Mandi)
                </h4>
                <span class="text-[10px] text-rose-700 font-bold">Part 3 of 3</span>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <!-- Option A: Private Mandis -->
                <div onclick="state.preferredMandiType = 'private'; state.mandiFilter = 'private'; render();"
                  class="p-4 rounded-xl border-2 cursor-pointer transition-all card-hover-lift ${
                    state.preferredMandiType === 'private'
                      ? 'border-amber-500 bg-amber-50/80 ring-2 ring-amber-400/30 shadow-xs'
                      : 'border-stone-200 bg-white hover:border-stone-300'
                  }">
                  <div class="flex items-center justify-between">
                    <span class="font-extrabold text-stone-900 flex items-center gap-1.5">
                      <span>🏢</span> Private Mandi / Silo (ITC Choupal / Adani)
                    </span>
                    ${state.preferredMandiType === 'private' ? '<span class="text-amber-800 text-xs font-black">✓ Selected</span>' : ''}
                  </div>
                  <div class="font-mono text-rose-900 font-black text-sm mt-1">₹2,460 / Qtl (+₹60 Bonus)</div>
                  <p class="text-[11px] text-stone-600 mt-1">15-minute automated hydraulic dump unloading and direct same-day corporate NEFT bank settlement.</p>
                </div>

                <!-- Option B: Govt APMC -->
                <div onclick="state.preferredMandiType = 'government'; state.mandiFilter = 'government'; render();"
                  class="p-4 rounded-xl border-2 cursor-pointer transition-all card-hover-lift ${
                    state.preferredMandiType === 'government'
                      ? 'border-rose-600 bg-rose-50/80 ring-2 ring-rose-500/25 shadow-xs'
                      : 'border-stone-200 bg-white hover:border-stone-300'
                  }">
                  <div class="flex items-center justify-between">
                    <span class="font-extrabold text-stone-900 flex items-center gap-1.5">
                      <span>🏛️</span> Government APMC Mandi (Rau / Indore)
                    </span>
                    ${state.preferredMandiType === 'government' ? '<span class="text-rose-700 text-xs font-black">✓ Selected</span>' : ''}
                  </div>
                  <div class="font-mono text-stone-900 font-bold text-sm mt-1">₹2,400 / Qtl (Official MSP)</div>
                  <p class="text-[11px] text-stone-600 mt-1">Official Government MSP procurement guaranteed with direct Aadhaar DBT payment transfer via PFMS.</p>
                </div>
              </div>

              <!-- Quick Summary Pill before submit -->
              <div class="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span class="text-stone-400 block text-[10px] font-bold">FARMER VERIFICATION SUMMARY</span>
                  <span class="font-bold text-stone-900">${auth.name} • ${auth.village} • Aadhaar ${auth.aadhaar.slice(-4)} • ${auth.bankName}</span>
                </div>
                <button type="button" onclick="appHandlers.setRegistrationSection(1)"
                  class="text-rose-700 hover:text-rose-800 text-[11px] font-bold underline">
                  Review All Details
                </button>
              </div>

              <!-- VERIFY ACTION & SUBMIT -->
              <div class="pt-3 border-t border-stone-100 flex items-center justify-between gap-3 flex-wrap">
                <button type="button" onclick="appHandlers.prevRegistrationSection()"
                  class="px-4 py-2.5 rounded-xl border border-stone-200 text-stone-700 font-bold text-xs hover:bg-stone-50">
                  ← Back to Bank & Land
                </button>
                
                <button type="submit" ${auth.isAuthenticating ? 'disabled' : ''}
                  class="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-gradient-to-r from-rose-700 via-rose-800 to-red-800 hover:from-rose-800 hover:to-red-900 text-white font-extrabold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.01]">
                  <span>${auth.isAuthenticating ? 'Authenticating with UIDAI...' : 'Verify Details & Proceed to Mandi Selection (Govt & Private) ➔'}</span>
                </button>
              </div>
            </div>
          ` : ''}

        </form>

        <!-- OTP SIMULATION MODAL -->
        ${auth.otpSent ? `
          <div class="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div class="bg-white rounded-2xl border border-stone-200 shadow-2xl max-w-sm w-full p-6 space-y-4 animate-slide-up text-center">
              <div class="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center mx-auto text-2xl font-bold">
                📱
              </div>
              <div>
                <h3 class="font-extrabold text-base text-stone-900">Enter UIDAI Aadhaar OTP</h3>
                <p class="text-xs text-stone-500 mt-1">OTP sent to mobile ending in <strong class="text-stone-800">${auth.phone.slice(-4)}</strong></p>
                <span class="inline-block mt-1 px-2.5 py-0.5 bg-amber-100 text-amber-900 font-mono font-bold text-xs rounded-full">
                  Demo OTP: 782194
                </span>
              </div>

              <input type="text" maxlength="6" value="${auth.otpInput}"
                oninput="state.farmerAuth.otpInput = this.value"
                class="w-full text-center tracking-widest font-mono text-2xl py-2.5 bg-stone-50 rounded-xl border-2 border-rose-600 font-black text-stone-900 outline-none">

              <div class="flex gap-2">
                <button type="button" onclick="state.farmerAuth.otpSent = false; render();"
                  class="flex-1 py-2.5 rounded-xl border border-stone-200 text-stone-600 font-bold text-xs">
                  Cancel
                </button>
                <button type="button" onclick="appHandlers.verifyFarmerOtp(event)"
                  class="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-rose-700 to-red-700 hover:from-rose-800 hover:to-red-800 text-white font-bold text-xs shadow-xs">
                  Verify & Continue ➔
                </button>
              </div>
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }

    // --- SUB-VIEW 2: CHOOSE MANDI & BOOK PROCUREMENT SLOT (MOBILE-OPTIMIZED MULTI-SECTION) ---
  function renderMandiSelectionAndBookingDashboard() {
    const auth = state.farmerAuth;
    const form = state.bookingForm;
    const curSec = form.bookingSection || 1;
    const selectedMandi = state.mandis.find(m => m.id === form.mandiId) || state.mandis[0];
    const cropRate = MSP_RATES[form.crop] || MSP_RATES['Wheat'];
    const baseRate = cropRate.total;
    const mandiOffset = selectedMandi.priceOffset || 0;
    const effectiveRate = baseRate + mandiOffset;
    const qty = Math.max(1, Number(form.quantity) || 40);
    const totalEstPayout = qty * effectiveRate;
    const basePayout = qty * baseRate;
    const bonusPayout = qty * mandiOffset;
    const yardWaitMins = selectedMandi.avgWaitMins || 20;
    const distanceKm = selectedMandi.distanceKm || 6.8;
    const travelTimeMins = selectedMandi.travelTimeMins || 16;
    const totalTurnaroundMins = selectedMandi.turnaroundMins || (yardWaitMins + (selectedMandi.type === 'private' ? 12 : 25));
    const paymentMode = selectedMandi.paymentMode || (selectedMandi.type === 'private' ? 'Instant Same-Day Corporate NEFT' : 'Direct DBT via PFMS');
    const unloadingType = selectedMandi.unloadingType || (selectedMandi.type === 'private' ? '15-Min Automated Dump Pit' : 'Yard Weighbridge');

    return `
      <div class="space-y-5 animate-fade-in">
        
        <!-- VERIFIED FARMER SUMMARY PILL -->
        <div class="bg-gradient-to-r from-rose-900 via-red-900 to-amber-950 text-white p-3.5 sm:p-4 rounded-2xl shadow-xs border border-amber-400/30 flex flex-wrap items-center justify-between gap-2.5">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-lg bg-amber-500 text-amber-950 font-black border border-amber-400 flex items-center justify-center font-bold text-base shrink-0">
              ✓
            </div>
            <div>
              <div class="flex items-center gap-1.5">
                <span class="font-extrabold text-sm sm:text-base">${auth.name}</span>
                <span class="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-400/30 text-amber-200 border border-amber-400/40">e-KYC Verified</span>
              </div>
              <p class="text-[11px] text-amber-200">${auth.village} • Aadhaar: •••• ${auth.aadhaar.slice(-4)} • ${auth.bankName}</p>
            </div>
          </div>

          <button onclick="appHandlers.setFarmerStep('register')"
            class="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg text-[11px] font-bold border border-white/20 transition-colors">
            ✏️ Edit Profile
          </button>
        </div>

        <!-- PROACTIVE AI RE-SCHEDULING & CONGESTION ALERT BANNER -->
        ${state.rescheduleAlert && state.rescheduleAlert.delayDetected ? `
          <div class="p-4 rounded-2xl bg-gradient-to-r from-rose-100 via-amber-50 to-rose-50 border-2 border-rose-400 shadow-md flex items-center justify-between flex-wrap gap-3 animate-fade-in ring-2 ring-rose-500/20">
            <div class="flex items-start sm:items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-700 to-red-800 text-white flex items-center justify-center font-bold text-xl shadow-xs shrink-0 ring-2 ring-rose-400/50">
                ⚠️
              </div>
              <div>
                <div class="flex items-center gap-2 flex-wrap">
                  <h4 class="font-black text-sm text-rose-950">AI Congestion Alert: Rau Mandi Delay Detected (+${state.rescheduleAlert.delayMins || 38} mins)</h4>
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-200 text-rose-950 border border-rose-300">Live Anomaly</span>
                </div>
                <p class="text-xs text-rose-900 mt-0.5">
                  ${state.rescheduleAlert.reason || 'Holding yard queue jumped to 39 trolleys.'}
                  Expected wait is now <strong>${state.rescheduleAlert.currentWaitMins || 64} minutes</strong>.
                  AI recommends switching to <strong>${state.rescheduleAlert.suggestedSlot.timeWindow}</strong> (Predicted wait: <strong>${state.rescheduleAlert.suggestedSlot.predictedWaitMins}m</strong>, saves <strong>${state.rescheduleAlert.suggestedSlot.timeSavedMins} mins</strong>!).
                </p>
              </div>
            </div>
            <button type="button" onclick="appHandlers.acceptReschedule('${state.rescheduleAlert.suggestedSlot.timeWindow}')"
              class="px-4 py-2.5 bg-gradient-to-r from-rose-700 via-rose-800 to-red-800 hover:from-rose-800 hover:to-red-900 text-white rounded-xl text-xs font-black shadow-md transition-all hover:scale-105 cursor-pointer flex items-center gap-1.5 ring-2 ring-amber-400/40">
              <span>Accept AI Reschedule (Save ~${state.rescheduleAlert.suggestedSlot.timeSavedMins}m)</span>
              <span>➔</span>
            </button>
          </div>
        ` : ''}

        <!-- MAIN BOOKING CONTAINER -->
        <div class="bg-white rounded-2xl border border-stone-200 p-4 sm:p-6 shadow-sm space-y-4">
          <div>
            <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-900 border border-rose-200 mb-1">
              <span>🌾 Step 2 of 3 • Slot Scheduling</span>
            </div>
            <h2 class="text-lg sm:text-2xl font-black text-stone-900 tracking-tight">Choose Mandi & Schedule Delivery Slot</h2>
            <p class="text-xs text-stone-500 mt-0.5">Two easy sections: pick your center first, then customize your crop and slot window.</p>
          </div>

          <!-- STEP 2 SECTION TABS (PREVENTS SCROLLING ON MOBILE) -->
          <div class="grid grid-cols-2 gap-2 bg-stone-100 p-1.5 rounded-xl border border-stone-200 sticky top-[61px] z-20 backdrop-blur-md">
            <button type="button" onclick="appHandlers.setBookingSection(1)"
              class="py-2 px-2.5 rounded-lg text-center transition-all text-xs font-bold ${
                curSec === 1
                  ? 'bg-gradient-to-r from-rose-700 to-red-800 text-white shadow-xs font-black ring-1 ring-amber-400/40'
                  : 'text-stone-700 hover:text-stone-950 font-bold bg-white/70'
              }">
              🏢 1. Choose Mandi & Rates
            </button>
            <button type="button" onclick="appHandlers.setBookingSection(2)"
              class="py-2 px-2.5 rounded-lg text-center transition-all text-xs font-bold ${
                curSec === 2
                  ? 'bg-gradient-to-r from-rose-700 to-red-800 text-white shadow-xs font-black ring-1 ring-amber-400/40'
                  : 'text-stone-700 hover:text-stone-950 font-bold bg-white/70'
              }">
              🌾 2. Crop, Qty & Slot Booking
            </button>
          </div>

          <form onsubmit="appHandlers.handleBookingSubmit(event)" class="space-y-5">
            
            <!-- SECTION 1: MANDI SELECTION & REAL-TIME VALUATION -->
            ${curSec === 1 ? `
              <div class="space-y-4 animate-fade-in">
                <!-- MANDI TYPE FILTER BUTTONS -->
                <div class="flex items-center gap-1.5 pb-0.5 overflow-x-auto no-scrollbar">
                  <button type="button" onclick="appHandlers.setMandiFilter('all')"
                    class="px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all whitespace-nowrap ${
                      state.mandiFilter === 'all' ? 'bg-gradient-to-r from-rose-700 to-red-800 text-white shadow-2xs font-extrabold' 
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }">
                    All Centers (6)
                  </button>
                  <button type="button" onclick="appHandlers.setMandiFilter('government')"
                    class="px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all whitespace-nowrap ${
                      state.mandiFilter === 'government' ? 'bg-gradient-to-r from-rose-700 to-red-800 text-white shadow-2xs font-extrabold' 
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    }">
                    🏛️ Govt APMC (4)
                  </button>
                  <button type="button" onclick="appHandlers.setMandiFilter('private')"
                    class="px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all whitespace-nowrap ${
                      state.mandiFilter === 'private' ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-2xs font-extrabold' 
                        : 'bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100'
                    }">
                    🏢 Private Mandis (2)
                  </button>
                </div>

                <!-- MANDI CARDS (CLICK TO CHOOSE) -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[460px] overflow-y-auto pr-1">
                  ${(() => {
                    const aiOpt = (window.KisanSetuAI && window.KisanSetuAI.optimizeMandiSelection)
                      ? window.KisanSetuAI.optimizeMandiSelection(state.mandis, form.crop, form.quantity, 11)
                      : null;

                    return state.mandis.filter(m => state.mandiFilter === 'all' || m.type === state.mandiFilter).map(m => {
                      const aiData = aiOpt ? aiOpt.rankedMandis.find(x => x.id === m.id) : null;
                      const isTopAi = aiData && aiData.isAiRecommended;
                      const crowd = (window.KisanSetuAI && window.KisanSetuAI.getHourlyCrowdForecast)
                        ? window.KisanSetuAI.getHourlyCrowdForecast(m, form.crop, form.quantity)
                        : null;

                      return `
                        <div onclick="appHandlers.selectBookingMandi('${m.id}')"
                          class="p-3.5 rounded-xl border-2 cursor-pointer transition-all card-hover-lift ${
                            form.mandiId === m.id 
                              ? (m.type === 'private' ? 'border-amber-500 bg-amber-50/80 shadow-md ring-2 ring-amber-400/40' : 'border-rose-600 bg-rose-50/80 shadow-md ring-2 ring-rose-500/30')
                              : 'border-stone-200 bg-stone-50/60 hover:bg-white hover:border-stone-300'
                          }">
                          
                          <!-- AI RECOMMENDATION PILL -->
                          <div class="mb-2 flex items-center justify-between">
                            ${isTopAi ? `
                              <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-black bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 border border-amber-300 shadow-2xs">
                                <span>✨</span>
                                <span>AI Ranked #1 • Best Net Benefit</span>
                              </span>
                            ` : `
                              <span class="text-[9px] text-stone-500 font-bold">
                                AI Efficiency Rank #${aiData ? aiData.rank : '2'}
                              </span>
                            `}
                            <span class="text-[9px] font-extrabold ${isTopAi ? 'text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200' : 'text-stone-700'}">
                              Net: ₹${aiData ? aiData.netBenefit.toLocaleString('en-IN') : '...'}
                            </span>
                          </div>

                          <div class="flex items-start justify-between">
                            <div>
                              <div class="font-extrabold text-sm text-stone-900 flex items-center gap-1.5">
                                <span>${m.name.split('(')[0]}</span>
                                ${form.mandiId === m.id ? '<span class="' + (m.type === 'private' ? 'text-amber-800' : 'text-rose-700') + ' text-xs font-black">✓ Selected</span>' : ''}
                              </div>
                              <div class="flex items-center gap-1.5 mt-0.5">
                                <span class="px-1.5 py-0.2 rounded text-[9px] font-extrabold ${m.type === 'private' ? 'bg-amber-100 text-amber-950 border border-amber-300' : 'bg-rose-100 text-rose-950 border border-rose-300'}">
                                  ${m.type === 'private' ? '🏢 Private' : '🏛️ Govt'}
                                </span>
                                <span class="text-[11px] text-stone-500">${m.district} • ${m.distanceKm || '6.8'} km</span>
                              </div>
                            </div>
                            <span class="px-2 py-0.5 rounded text-[10px] font-bold ${
                              (m.liveQueue || m.queueLength) > 25 ? 'bg-rose-100 text-rose-900' : 'bg-emerald-100 text-emerald-900'
                            }">
                              ~${aiData ? aiData.predictedWait : m.avgWaitMins}m wait
                            </span>
                          </div>

                          <!-- RATE & DISTANCE -->
                          <div class="grid grid-cols-2 gap-2 mt-2.5 pt-2 border-t border-stone-200/70 text-xs">
                            <div>
                              <span class="text-[10px] text-stone-400 block">Rate / भाव:</span>
                              <strong class="font-mono text-rose-900 font-extrabold text-sm">₹${cropRate.total + (m.priceOffset || 0)} / Qtl</strong>
                              <span class="text-[9px] font-bold ${m.type === 'private' ? 'text-amber-800' : 'text-stone-500'} block">
                                ${m.type === 'private' ? '+₹' + m.priceOffset + ' Private Bonus' : 'Govt MSP'}
                              </span>
                            </div>
                            <div>
                              <span class="text-[10px] text-stone-400 block">Transit Fuel & Cost:</span>
                              <strong class="text-stone-800 font-bold">${m.distanceKm || '6.8'} km (-₹${aiData ? aiData.fuelCost : '240'})</strong>
                              <span class="text-[9px] text-stone-500 block">~${m.travelTimeMins || '15'}m transit</span>
                            </div>
                          </div>

                          <!-- HOURLY CROWD FORECAST MINI-HISTOGRAM (TIME-SERIES ML) -->
                          <div class="mt-2.5 pt-2 border-t border-stone-200/70">
                            <div class="space-y-1 mb-1.5">
                              <div class="flex items-center justify-between text-[9px] font-bold text-stone-600">
                                <span class="flex items-center gap-1">
                                  <span>📊</span>
                                  <span>Crowd Forecast (Time-Series)</span>
                                </span>
                                <button type="button" onclick="event.stopPropagation(); alert('AI Timing Recommendation: For fastest turnaround, reach between 08:30 AM – 09:15 AM or 02:00 PM – 03:30 PM (🟢 Low Wait: 18–26m). Avoid 10:00 AM – 11:30 AM peak rush (🔴 45–55m wait)!');"
                                  class="text-[9px] font-bold text-rose-700 hover:text-rose-900 underline cursor-pointer">
                                  ❓ When should I reach?
                                </button>
                              </div>
                              <div class="flex items-center gap-1.5 text-[8px] font-extrabold text-stone-700 overflow-x-auto no-scrollbar py-0.5">
                                <span class="px-1.5 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-800">🟢 Low — 2 PM (18–26m)</span>
                                <span class="px-1.5 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-900">🟡 Mod — 11 AM (38–51m)</span>
                                <span class="px-1.5 py-0.5 rounded bg-rose-50 border border-rose-200 text-rose-900">🔴 High — 10 AM (44–59m)</span>
                              </div>
                            </div>
                            <div class="grid grid-cols-5 gap-1 text-center">
                              ${(crowd ? [crowd.timeline[0], crowd.timeline[2], crowd.timeline[3], crowd.timeline[6], crowd.timeline[8]] : [
                                { label: '08 AM', waitMins: 16, barPct: 24, level: 'low' },
                                { label: '10 AM', waitMins: 32, barPct: 48, level: 'moderate' },
                                { label: '11 AM', waitMins: 58, barPct: 88, level: 'high' },
                                { label: '02 PM', waitMins: 19, barPct: 28, level: 'low' },
                                { label: '04 PM', waitMins: 14, barPct: 20, level: 'low' }
                              ]).map(slot => `
                                <div class="p-0.5 rounded bg-white border border-stone-200/70 flex flex-col items-center">
                                  <span class="text-[8px] text-stone-500 font-bold">${slot.label.split(' ')[0]}</span>
                                  <div class="w-full bg-stone-100 rounded-full h-1.5 my-0.5 overflow-hidden">
                                    <div class="h-full rounded-full ${slot.level === 'high' ? 'bg-rose-600' : (slot.level === 'moderate' ? 'bg-amber-500' : 'bg-emerald-500')}" style="width: ${slot.barPct}%"></div>
                                  </div>
                                  <span class="text-[8px] font-black font-mono ${slot.level === 'high' ? 'text-rose-700' : (slot.level === 'moderate' ? 'text-amber-800' : 'text-emerald-700')}">
                                    ${slot.waitMins}m
                                  </span>
                                </div>
                              `).join('')}
                            </div>
                          </div>

                          <button type="button" onclick="event.stopPropagation(); appHandlers.selectBookingMandi('${m.id}'); appHandlers.nextBookingSection();"
                            class="mt-2.5 w-full py-1.5 rounded-lg ${form.mandiId === m.id ? 'bg-gradient-to-r from-rose-700 to-red-700 text-white' : 'bg-stone-200 hover:bg-stone-300 text-stone-800'} font-bold text-[11px] transition-colors flex items-center justify-center gap-1">
                            <span>Select & Proceed to Slot</span>
                            <span>➔</span>
                          </button>
                        </div>
                      `;
                    }).join('');
                  })()}
                </div>

                <!-- DYNAMIC VALUATION DASHBOARD (COMPACT & RICH) -->
                <div class="p-3.5 sm:p-4 rounded-xl bg-gradient-to-br ${selectedMandi.type === 'private' ? 'from-amber-50 via-white to-rose-50/30 border-2 border-amber-400 shadow-md' : 'from-rose-50 via-white to-amber-50/40 border-2 border-rose-300 shadow-md'} space-y-3">
                  <div class="flex items-center justify-between border-b border-stone-200/80 pb-2">
                    <div class="flex items-center gap-2">
                      <span class="text-lg">${selectedMandi.type === 'private' ? '🏢' : '🏛️'}</span>
                      <div>
                        <span class="font-black text-sm text-stone-900">${selectedMandi.name}</span>
                        <span class="text-[10px] text-stone-500 block">${selectedMandi.operator} • Lic: ${selectedMandi.licenseNo || 'APMC-MP-IND-01'}</span>
                      </div>
                    </div>
                    <span class="font-mono font-extrabold text-[11px] text-amber-950 bg-white px-2 py-0.5 rounded border border-amber-300 shadow-2xs">
                      Queue: ${selectedMandi.queueLength} Ahead
                    </span>
                  </div>

                  <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div class="p-2 bg-white rounded-lg border border-stone-200">
                      <span class="text-[9px] uppercase font-bold text-stone-400 block">Rate / Qtl</span>
                      <strong class="font-mono text-base font-black text-rose-950">₹${effectiveRate}</strong>
                      <span class="text-[9px] text-stone-500 block">${mandiOffset > 0 ? '+₹' + mandiOffset + ' Bonus' : 'Govt MSP'}</span>
                    </div>

                    <div class="p-2 bg-white rounded-lg border border-stone-200">
                      <span class="text-[9px] uppercase font-bold text-stone-400 block">Est. Payout (${qty} Qtl)</span>
                      <strong class="font-mono text-base font-black text-rose-900">₹${totalEstPayout.toLocaleString('en-IN')}</strong>
                      <span class="text-[9px] text-stone-500 block">${bonusPayout > 0 ? '+₹' + bonusPayout.toLocaleString('en-IN') + ' Bonus' : 'Standard'}</span>
                    </div>

                    <div class="p-2 bg-white rounded-lg border border-stone-200">
                      <span class="text-[9px] uppercase font-bold text-stone-400 block">Yard Wait</span>
                      <strong class="font-mono text-base font-black text-amber-800">~${yardWaitMins}m</strong>
                      <span class="text-[9px] text-stone-500 block">Total: ~${totalTurnaroundMins}m</span>
                    </div>

                    <div class="p-2 bg-white rounded-lg border border-stone-200">
                      <span class="text-[9px] uppercase font-bold text-stone-400 block">Transit Distance</span>
                      <strong class="font-mono text-base font-black text-stone-800">${distanceKm} km</strong>
                      <span class="text-[9px] text-stone-500 block">ETA: ~${travelTimeMins}m</span>
                    </div>
                  </div>

                  <div class="pt-2 border-t border-stone-200/60 flex items-center justify-between">
                    <span class="text-[11px] text-stone-600">Payment: <strong>${paymentMode}</strong></span>
                    <button type="button" onclick="appHandlers.nextBookingSection()"
                      class="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-700 to-red-700 hover:from-rose-800 hover:to-red-800 text-white font-extrabold text-xs shadow-xs flex items-center gap-1.5">
                      <span>Next: Crop & Slot Window</span>
                      <span>➔</span>
                    </button>
                  </div>
                </div>
              </div>
            ` : ''}

            <!-- SECTION 2: CROP, QUANTITY, DATE, TIME & VEHICLE -->
            ${curSec === 2 ? `
              <div class="space-y-4 animate-fade-in">
                <!-- Selected Mandi Reminder Banner -->
                <div class="p-3 rounded-xl bg-amber-50 border border-amber-300 flex items-center justify-between text-xs">
                  <div>
                    <span class="text-[10px] text-amber-800 uppercase font-bold block">Selected Mandi:</span>
                    <strong class="text-stone-900 font-extrabold text-sm">${selectedMandi.name}</strong>
                    <span class="text-[11px] text-stone-600 block">Rate: ₹${effectiveRate}/Qtl • ~${yardWaitMins}m wait • ${distanceKm} km</span>
                  </div>
                  <button type="button" onclick="appHandlers.prevBookingSection()"
                    class="px-2.5 py-1 rounded-lg border border-amber-300 bg-white text-stone-700 hover:bg-stone-50 font-bold text-[11px]">
                    Change Mandi
                  </button>
                </div>

                <!-- Crop & Quantity -->
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label class="block font-bold text-stone-700 mb-1">Crop Type / फसल</label>
                    <select class="w-full px-3 py-2.5 rounded-xl border border-stone-300 font-bold text-stone-900 bg-white"
                      onchange="state.bookingForm.crop = this.value; render();">
                      <option value="Wheat" ${form.crop === 'Wheat' ? 'selected' : ''}>Wheat (गेहूं) - Base MSP ₹2,400</option>
                      <option value="Soybean" ${form.crop === 'Soybean' ? 'selected' : ''}>Soybean (सोयाबीन) - Base MSP ₹4,992</option>
                      <option value="Chana" ${form.crop === 'Chana' ? 'selected' : ''}>Chana (चना) - Base MSP ₹5,590</option>
                      <option value="Mustard" ${form.crop === 'Mustard' ? 'selected' : ''}>Mustard (सरसों) - Base MSP ₹5,750</option>
                    </select>
                  </div>

                  <div>
                    <label class="block font-bold text-stone-700 mb-1 flex justify-between">
                      <span>Quantity (Quintals) *</span>
                      <span class="text-stone-400 text-[10px]">Quota: ${auth.quotaRemaining} Qtl</span>
                    </label>
                    <input type="number" min="1" max="${auth.quotaRemaining || 150}" value="${form.quantity}" required
                      oninput="state.bookingForm.quantity = this.value; render();"
                      class="w-full px-3 py-2.5 rounded-xl border border-stone-300 font-mono font-black text-stone-900 bg-white">
                  </div>

                  <!-- Live Calculated Payout Card -->
                  <div class="p-3 bg-gradient-to-br from-amber-50 to-rose-50/40 rounded-xl border border-amber-300 space-y-0.5">
                    <div class="flex justify-between items-center">
                      <span class="text-[9px] text-stone-700 uppercase font-extrabold block">Est. Payout</span>
                      <span class="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-200 text-amber-950 font-black font-mono">@ ₹${effectiveRate}/Qtl</span>
                    </div>
                    <div class="font-mono text-lg font-black text-rose-950">
                      ₹${totalEstPayout.toLocaleString('en-IN')}
                    </div>
                    <div class="text-[9px] text-stone-600 flex justify-between pt-0.5 border-t border-amber-200/60">
                      <span>Base: ₹${(qty * baseRate).toLocaleString('en-IN')}</span>
                      <span class="font-bold ${mandiOffset > 0 ? 'text-amber-800' : 'text-stone-500'}">
                        ${mandiOffset > 0 ? '+₹' + (qty * mandiOffset).toLocaleString('en-IN') + ' Bonus' : 'Govt MSP'}
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Date, Time Window & Vehicle Details -->
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
                  <div>
                    <label class="block font-bold text-stone-700 mb-1">Delivery Date</label>
                    <input type="date" value="${form.slotDate}" required
                      onchange="state.bookingForm.slotDate = this.value"
                      class="w-full px-3 py-2 rounded-xl border border-stone-300 font-bold text-stone-900 bg-white">
                  </div>

                  ${(() => {
                    const pred8 = (window.KisanSetuAI && window.KisanSetuAI.predictWaitTime)
                      ? window.KisanSetuAI.predictWaitTime(selectedMandi, 9, form.crop, form.quantity)
                      : { waitMins: 18, color: 'bg-emerald-50 text-emerald-950 border border-emerald-200', label: '🟢 Low Queue' };
                    const pred11 = (window.KisanSetuAI && window.KisanSetuAI.predictWaitTime)
                      ? window.KisanSetuAI.predictWaitTime(selectedMandi, 11, form.crop, form.quantity)
                      : { waitMins: 58, color: 'bg-rose-50 text-rose-950 border border-rose-200', label: '🔴 Peak Rush' };
                    const pred14 = (window.KisanSetuAI && window.KisanSetuAI.predictWaitTime)
                      ? window.KisanSetuAI.predictWaitTime(selectedMandi, 14, form.crop, form.quantity)
                      : { waitMins: 19, color: 'bg-emerald-50 text-emerald-950 border border-emerald-200', label: '🟢 Low Queue' };

                    const curSlot = form.slotTime || '08:00 AM - 11:00 AM';
                    const activePred = curSlot.startsWith('11') ? pred11 : (curSlot.startsWith('02') ? pred14 : pred8);

                    return `
                      <div>
                        <label class="block font-bold text-stone-700 mb-1 flex justify-between">
                          <span class="flex items-center gap-1">
                            <span>⏰</span>
                            <span>Delivery Slot (AI Queuing Model)</span>
                          </span>
                          <span class="text-stone-500 text-[10px]">Transit: ~${travelTimeMins}m</span>
                        </label>
                        <select class="w-full px-3 py-2 rounded-xl border border-stone-300 font-bold text-stone-900 bg-white"
                          onchange="state.bookingForm.slotTime = this.value; render();">
                          <option value="08:00 AM - 11:00 AM" ${form.slotTime === '08:00 AM - 11:00 AM' ? 'selected' : ''}>
                            08:00 AM - 11:00 AM (🟢 Pred. Wait: ~${pred8.waitMins}m • Low Queue)
                          </option>
                          <option value="11:00 AM - 02:00 PM" ${form.slotTime === '11:00 AM - 02:00 PM' ? 'selected' : ''}>
                            11:00 AM - 02:00 PM (🔴 Pred. Wait: ~${pred11.waitMins}m • Peak Surge)
                          </option>
                          <option value="02:00 PM - 05:00 PM" ${form.slotTime === '02:00 PM - 05:00 PM' ? 'selected' : ''}>
                            02:00 PM - 05:00 PM (🟢 Pred. Wait: ~${pred14.waitMins}m • AI Recommended)
                          </option>
                        </select>

                        <!-- LIVE PREDICTED WAIT BADGE -->
                        <div class="mt-1.5 p-2 rounded-lg ${activePred.color} text-xs flex items-center justify-between">
                          <span class="font-extrabold flex items-center gap-1.5 text-[11px]">
                            <span>🤖 Expected Yard Wait:</span>
                            <span>~${activePred.waitMins} minutes</span>
                          </span>
                          <span class="text-[9px] font-mono font-black opacity-80">ML Confidence: 94.2%</span>
                        </div>
                      </div>
                    `;
                  })()}

                  <div>
                    <label class="block font-bold text-stone-700 mb-1">Vehicle Registration #</label>
                    <input type="text" value="${form.vehicleNumber}" required
                      oninput="state.bookingForm.vehicleNumber = this.value"
                      placeholder="MP-09-BZ-6712"
                      class="w-full px-3 py-2 rounded-xl border border-stone-300 font-mono font-bold text-stone-900 bg-white">
                  </div>
                </div>

                <!-- ACTIONS -->
                <div class="pt-3 border-t border-stone-100 flex items-center justify-between gap-3 flex-wrap">
                  <button type="button" onclick="appHandlers.prevBookingSection()"
                    class="px-4 py-2.5 rounded-xl border border-stone-200 text-stone-700 font-bold text-xs hover:bg-stone-50">
                    ← Back to Mandi Centers
                  </button>

                  <button type="submit" ${form.isSubmitting ? 'disabled' : ''}
                    class="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-gradient-to-r from-rose-700 via-rose-800 to-red-800 hover:from-rose-800 hover:to-red-900 text-white font-extrabold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.01]">
                    <span>${form.isSubmitting ? 'Generating Token...' : `Confirm Slot for ${selectedMandi.name.split('(')[0]} (Est. ₹${totalEstPayout.toLocaleString('en-IN')}) ➔`}</span>
                  </button>
                </div>
              </div>
            ` : ''}

          </form>
        </div>
      </div>
    `;
  }

  function renderFarmerTokenPipeline(token) {
    const mandi = state.mandis.find(m => m.id === token.mandiId) || state.mandis[0];
    const cropRate = MSP_RATES[token.crop] || MSP_RATES['Wheat'];
    const effectiveRate = token.pricePerQtl || (cropRate.total + (mandi.priceOffset || 0));
    const totalEstValuation = token.totalEstAmount || (token.quantityQuintals * effectiveRate);

    const isCompleted = token.status === 'completed';
    const isTransit = token.status === 'in_transit';
    const isAtGate = token.status === 'at_gate';
    const isQC = token.status === 'in_quality_check';
    const isWeigh = token.status === 'at_weighbridge';

    return `
      <!-- DIGITAL GATE PASS CARD -->
      <div id="printable-pass" class="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
        <!-- PASS HEADER -->
        <div class="bg-gradient-to-r from-rose-800 via-red-900 to-amber-950 text-white p-5 sm:p-6 border-b-2 border-amber-400/40 relative">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/15 text-amber-200 border border-amber-300/30 mb-1">
                <span>🎫 Digital Gate Pass • ${mandi.type === 'private' ? '🏢 Licensed Private Mandi' : '🏛️ Government APMC'}</span>
              </div>
              <h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight font-mono">${token.id}</h2>
              <p class="text-xs text-amber-200 mt-0.5">${token.crop} (${token.variety}) • ${token.quantityQuintals} Quintals • <strong>${mandi.name}</strong></p>
              <div class="text-[11px] text-amber-100/90 mt-1 flex flex-wrap gap-2">
                <span>Operator: ${mandi.operator}</span>
                <span>•</span>
                <span>Lic: ${mandi.licenseNo || 'APMC-MP-IND-01'}</span>
                <span>•</span>
                <span class="font-mono font-bold text-amber-300">Rate: ₹${effectiveRate}/Qtl (Est. ₹${totalEstValuation.toLocaleString('en-IN')})</span>
              </div>
            </div>

            <!-- QR Code Simulation -->
            <div class="bg-white p-2.5 rounded-xl shadow-md text-stone-900 text-center shrink-0">
              <div class="w-20 h-20 bg-stone-900 rounded-lg flex items-center justify-center text-white text-xs font-mono p-1 text-center font-bold tracking-tighter">
                [QR-PASS]<br>${token.id}
              </div>
              <span class="block text-[9px] font-bold text-stone-500 mt-1 uppercase">Scan at Gate</span>
            </div>
          </div>
        </div>

        <!-- PASS DETAILS & LIVE QUEUE TRACKER -->
        <div class="p-5 sm:p-6 space-y-6">
          <!-- LIVE STATUS CHIPS -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div class="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <div class="text-[10px] uppercase font-bold text-stone-400">Assigned Gate</div>
              <div class="text-xs sm:text-sm font-extrabold text-stone-900 mt-0.5">${token.assignedGate}</div>
            </div>
            <div class="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <div class="text-[10px] uppercase font-bold text-stone-400">Current Serving</div>
              <div class="text-xs sm:text-sm font-mono font-bold text-rose-900 mt-0.5">${mandi.currentServingToken}</div>
            </div>
            <div class="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <div class="text-[10px] uppercase font-bold text-stone-400">Vehicles Ahead</div>
              <div class="text-xs sm:text-sm font-bold text-amber-700 mt-0.5">${token.queuePosition > 0 ? token.queuePosition + ' Trucks' : 'At Bay'}</div>
            </div>
            <div class="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <div class="text-[10px] uppercase font-bold text-stone-400">Estimated Wait</div>
              <div class="text-xs sm:text-sm font-bold text-stone-900 mt-0.5">${token.etaMins > 0 ? token.etaMins + ' Minutes' : 'Now Serving'}</div>
            </div>
          </div>

          <!-- DYNAMIC 7-STAGE LIVE QUEUE JOURNEY TRACKER -->
          <div class="space-y-4 p-4 bg-stone-50 rounded-2xl border border-stone-200">
            <div class="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200/80 pb-2.5">
              <div>
                <h4 class="text-xs font-black text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                  <span>🚜</span> Live Procurement Journey: Token → Queue → Gate → Quality → Weighment → Settlement
                </h4>
                <p class="text-[11px] text-stone-500">Live multi-stage progress with sensor and weighbridge updates</p>
              </div>

              <!-- JUDGE SIMULATION CONTROLS -->
              <div class="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-stone-200 shadow-2xs">
                <span class="text-[10px] uppercase font-bold text-stone-400 px-1">⚡ Demo Stage:</span>
                <button type="button" onclick="appHandlers.prevQueueStage()"
                  class="px-2 py-1 rounded-lg border border-stone-200 hover:bg-stone-100 text-stone-700 font-bold text-[10px] cursor-pointer">
                  ◀ Prev
                </button>
                <span class="font-mono font-black text-rose-900 text-xs px-1">Stage ${token.queueStage || 3}/7</span>
                <button type="button" onclick="appHandlers.advanceQueueStage()"
                  class="px-2.5 py-1 rounded-lg bg-gradient-to-r from-rose-700 to-red-700 hover:from-rose-800 hover:to-red-800 text-white font-black text-[10px] shadow-2xs cursor-pointer">
                  Next Stage ▶
                </button>
              </div>
            </div>

            <!-- 7 STAGES STEPPER BAR -->
            <div class="relative overflow-x-auto pb-2">
              <div class="min-w-[620px] relative flex items-center justify-between">
                <div class="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-stone-200 w-full z-0"></div>
                <div class="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-rose-600 to-amber-500 transition-all duration-300 z-0"
                  style="width: ${Math.min(100, Math.max(0, (((token.queueStage || 3) - 1) / 6) * 100))}%;"></div>

                ${[
                  { num: 1, label: 'Token Confirmed', icon: '🎫', pos: 'Booked' },
                  { num: 2, label: 'In Transit', icon: '🚚', pos: 'Moving' },
                  { num: 3, label: 'Yard Queue', icon: '🅿️', pos: '14 Ahead' },
                  { num: 4, label: 'Gate Entry', icon: '🚪', pos: 'Gate 2' },
                  { num: 5, label: 'Quality Check', icon: '🔬', pos: 'FAQ Passed' },
                  { num: 6, label: 'Weighment', icon: '⚖️', pos: '45.00 Qtl' },
                  { num: 7, label: 'DBT Settlement', icon: '💳', pos: '₹1,08,000' }
                ].map(st => {
                  const isDone = (token.queueStage || 3) > st.num;
                  const isCurrent = (token.queueStage || 3) === st.num;
                  return `
                    <div onclick="appHandlers.setQueueStage(${st.num})"
                      class="relative z-10 flex flex-col items-center cursor-pointer transition-all hover:scale-105">
                      <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ring-4 ring-white shadow-xs ${
                        isDone ? 'bg-gradient-to-r from-rose-700 to-amber-600 text-white' :
                        isCurrent ? 'bg-gradient-to-r from-rose-700 to-red-800 text-white ring-amber-400 ring-2' :
                        'bg-stone-200 text-stone-500'
                      }">
                        ${isDone ? '✓' : st.icon}
                      </div>
                      <span class="text-[10px] font-extrabold mt-1 text-center whitespace-nowrap ${
                        isCurrent ? 'text-rose-950 font-black' : isDone ? 'text-stone-800' : 'text-stone-400'
                      }">
                        ${st.label}
                      </span>
                      <span class="text-[9px] font-mono text-stone-400">${st.pos}</span>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>

            <!-- CURRENT ACTIVE STAGE CALLOUT -->
            <div class="p-3 bg-white rounded-xl border border-amber-300 shadow-2xs flex items-center justify-between gap-3 text-xs">
              <div class="flex items-center gap-2.5">
                <span class="text-2xl">${
                  (token.queueStage || 3) === 1 ? '🎫' :
                  (token.queueStage || 3) === 2 ? '🚚' :
                  (token.queueStage || 3) === 3 ? '🅿️' :
                  (token.queueStage || 3) === 4 ? '🚪' :
                  (token.queueStage || 3) === 5 ? '🔬' :
                  (token.queueStage || 3) === 6 ? '⚖️' : '🎉'
                }</span>
                <div>
                  <div class="font-extrabold text-stone-900">
                    Current Status: <strong class="text-rose-950 font-black">${getStageLabel(token.queueStage || 3)}</strong>
                  </div>
                  <p class="text-[11px] text-stone-600 mt-0.5">${
                    (token.queueStage || 3) === 1 ? 'Token #KS-RAU-108 confirmed for 28-Sep at Rau APMC. Ready to leave.' :
                    (token.queueStage || 3) === 2 ? 'Vehicle in transit from Rangwasa on Bypass Road. GPS ETA: ~14 mins.' :
                    (token.queueStage || 3) === 3 ? 'In Mandi holding yard. 14 vehicles ahead. Expected wait: 32–40 min.' :
                    (token.queueStage || 3) === 4 ? 'Token called! Proceed to Gate 2 (Platform 3) for sensor entry.' :
                    (token.queueStage || 3) === 5 ? 'Moisture meter reading: 11.2% (FAQ standard ≤ 12.0%). Grade A Passed.' :
                    (token.queueStage || 3) === 6 ? 'Weighbridge Gross: 7,850 kg, Tare: 3,350 kg. Net: 45.00 Qtl confirmed.' :
                    'MSP Payment credited! ₹1,08,000 sent via PFMS DBT to SBI A/c XXXX 4091.'
                  }</p>
                </div>
              </div>
              <button onclick="appHandlers.openQrModal()"
                class="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs shrink-0 flex items-center gap-1 cursor-pointer">
                <span>🎫</span> Show QR
              </button>
            </div>
          </div>

          <!-- TRANSIT & GPS SIMULATOR (Slide 2 & 4 Solution for farmer arrivals) -->
          <div class="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="text-xl">🚜</span>
                <div>
                  <h5 class="text-xs font-bold text-stone-900">Transit & Arrival Dispatch</h5>
                  <p class="text-[11px] text-stone-500">Vehicle: <strong class="text-stone-800">${token.vehicle}</strong></p>
                </div>
              </div>
              <div>
                ${token.status === 'scheduled' ? `
                  <button onclick="appHandlers.toggleTransit('${token.id}')"
                    class="px-4 py-1.5 bg-gradient-to-r from-rose-700 to-red-700 hover:from-rose-800 hover:to-red-800 text-white font-bold rounded-lg text-xs shadow-xs transition-colors">
                    Start Journey to Mandi
                  </button>
                ` : token.status === 'in_transit' ? `
                  <button onclick="appHandlers.toggleTransit('${token.id}')"
                    class="px-4 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-lg text-xs shadow-xs transition-colors animate-pulse">
                    Simulate Arrival at Gate
                  </button>
                ` : `
                  <span class="px-2.5 py-1 bg-amber-100 text-amber-950 font-bold rounded-lg text-xs border border-amber-300">
                    Status: ${token.status.replace('_', ' ').toUpperCase()}
                  </span>
                `}
              </div>
            </div>

            ${isTransit ? `
              <div class="p-2.5 bg-amber-50 rounded-lg border border-amber-200 text-xs text-amber-950 flex items-center justify-between">
                <span>📍 GPS Simulation: <strong>${mandi.distanceKm} km</strong> from ${mandi.name} • Speed: <strong>28 km/h</strong></span>
                <span class="font-bold">ETA: ${mandi.travelTimeMins} Mins</span>
              </div>
            ` : ''}
          </div>

          <!-- IF COMPLETED: SHOW MSP SETTLEMENT E-RECEIPT -->
          ${isCompleted && token.payout ? `
            <div class="p-5 bg-gradient-to-br from-amber-50 via-rose-50/20 to-amber-100/50 rounded-xl border border-amber-300 space-y-3">
              <div class="flex items-center justify-between border-b border-amber-200/80 pb-2">
                <div class="flex items-center gap-2">
                  <span class="text-2xl">🎉</span>
                  <div>
                    <h4 class="font-bold text-sm text-rose-950">Procurement e-Receipt & Payment Credit</h4>
                    <p class="text-[11px] text-amber-800">${mandi.paymentMode || 'Govt. Direct Benefit Transfer (DBT)'}</p>
                  </div>
                </div>
                <div class="text-right">
                  <span class="text-xs font-mono font-bold text-amber-950 bg-white px-2 py-0.5 rounded border border-amber-300 font-black">
                    UTR: ${token.payout.utrNo}
                  </span>
                </div>
              </div>

              <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-1">
                <div>
                  <span class="text-stone-500 block">Net Weight:</span>
                  <strong class="font-mono text-stone-900 text-sm">${token.weight.netQuintals} Quintals</strong>
                </div>
                <div>
                  <span class="text-stone-500 block">Quality Grade:</span>
                  <strong class="text-stone-900">${token.quality.grade.split('(')[0]}</strong>
                </div>
                <div>
                  <span class="text-stone-500 block">Effective MSP Rate:</span>
                  <strong class="font-mono text-stone-900">₹${token.payout.mspRate} / Qtl</strong>
                </div>
                <div>
                  <span class="text-stone-500 block">Total Credited:</span>
                  <strong class="font-mono text-rose-900 font-black text-base">₹${token.payout.totalAmount.toLocaleString('en-IN')}</strong>
                </div>
              </div>
            </div>
          ` : ''}

          <!-- ACTIONS: PRINT & SWITCH VIEW -->
          <div class="flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
            <button onclick="window.print()" class="px-3.5 py-1.5 rounded-lg border border-stone-200 text-stone-700 hover:bg-stone-50 font-bold flex items-center gap-1.5">
              <span>🖨️</span> Print / Save Gate Pass
            </button>
            <span class="text-[11px] text-stone-400">Digital Token protected with 256-bit hash</span>
          </div>
        </div>
      </div>
    `;
  }

  // Slot Booking Modal Wizard
  function renderBookingModal() {
    const f = getActiveFarmer();
    const form = state.bookingForm;

    return `
      <div class="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
        <div class="bg-white rounded-2xl border border-stone-200 shadow-2xl max-w-lg w-full p-6 space-y-5 animate-fade-in my-8">
          <div class="flex items-center justify-between border-b border-stone-100 pb-3">
            <div class="flex items-center gap-2">
              <span class="text-2xl">📅</span>
              <div>
                <h3 class="font-bold text-base text-stone-900">Book Procurement Slot</h3>
                <p class="text-xs text-stone-500">Kisan Setu Smart Queue Distribution</p>
              </div>
            </div>
            <button onclick="appHandlers.toggleBookingForm(false)" class="text-stone-400 hover:text-stone-700 text-xl font-bold">
              ✕
            </button>
          </div>

          <form onsubmit="appHandlers.handleBookingSubmit(event)" class="space-y-4">
            <!-- Select Mandi -->
            <div>
              <label class="block text-xs font-bold text-stone-700 mb-1">Select Procurement Center (Mandi)</label>
              <select class="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-semibold text-stone-900 bg-white"
                onchange="state.bookingForm.mandiId = this.value; render();">
                ${state.mandis.map(m => `
                  <option value="${m.id}" ${form.mandiId === m.id ? 'selected' : ''}>
                    ${m.name} (${m.type === 'Private Mandi' ? '🏢 Private' : '🏛️ Govt'} • ${m.priceOffset > 0 ? '+₹' + m.priceOffset + '/Qtl' : 'MSP'} • ${m.avgWaitMins}m wait • ${m.distanceKm || 6.4} km)
                  </option>
                `).join('')}
              </select>
            </div>

            <!-- Dynamic Chosen Mandi Live Calculation & Highlights -->
            ${(() => {
              const selM = state.mandis.find(m => m.id === (form.mandiId || state.selectedMandiId)) || state.mandis[0];
              const baseMsp = form.crop === 'Soybean' ? 4992 : form.crop === 'Chana' ? 5590 : 2400;
              const rate = baseMsp + (selM.priceOffset || 0);
              const q = parseFloat(form.quantity) || 45;
              const totalPayout = rate * q;
              return `
                <div class="p-3 rounded-xl border ${selM.type === 'Private Mandi' ? 'bg-amber-50/70 border-amber-200' : 'bg-rose-50/70 border-rose-200'} text-xs space-y-1.5">
                  <div class="flex items-center justify-between">
                    <span class="font-bold text-stone-800 flex items-center gap-1.5">
                      <span class="px-1.5 py-0.5 rounded text-[10px] font-bold ${selM.type === 'Private Mandi' ? 'bg-amber-200 text-amber-950 font-bold' : 'bg-rose-100 text-rose-950 border border-rose-200 font-bold'}">${selM.type}</span>
                      ${selM.name}
                    </span>
                    <span class="font-mono font-black text-stone-900 bg-white px-2 py-0.5 rounded-lg border border-stone-200 shadow-2xs">
                      Est. ₹${totalPayout.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div class="grid grid-cols-3 gap-2 pt-1 border-t border-stone-200/60 text-[11px]">
                    <div>
                      <span class="text-stone-400 block text-[10px]">Effective Rate</span>
                      <strong class="text-amber-800 font-mono">₹${rate.toLocaleString('en-IN')}/Qtl</strong>
                      ${selM.priceOffset > 0 ? `<span class="text-[9px] text-amber-700 block font-semibold">(+₹${selM.priceOffset} Bonus)</span>` : ''}
                    </div>
                    <div>
                      <span class="text-stone-400 block text-[10px]">Yard Wait</span>
                      <strong class="text-stone-800">~${selM.avgWaitMins} Mins</strong>
                      <span class="text-[9px] text-stone-500 block">Total: ~${selM.turnaroundMins || 45}m</span>
                    </div>
                    <div>
                      <span class="text-stone-400 block text-[10px]">Distance & ETA</span>
                      <strong class="text-stone-800">${selM.distanceKm || 6.4} km</strong>
                      <span class="text-[9px] text-stone-500 block">~${selM.travelTimeMins || 20}m transit</span>
                    </div>
                  </div>
                  <div class="text-[10px] text-stone-600 flex items-center justify-between pt-1">
                    <span>💳 Payment: <strong class="text-stone-800">${selM.paymentMode || 'Instant DBT'}</strong></span>
                    <span class="text-stone-500">Unloading: <strong>${selM.unloadingType || 'Automatic'}</strong></span>
                  </div>
                </div>
              `;
            })()}

            <!-- Crop & Quantity -->
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-bold text-stone-700 mb-1">Select Crop</label>
                <select class="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-semibold text-stone-900 bg-white"
                  onchange="state.bookingForm.crop = this.value">
                  <option value="Wheat">Wheat (गेंहू) - MSP ₹2,400</option>
                  <option value="Soybean">Soybean (सोयाबीन) - MSP ₹4,992</option>
                  <option value="Chana">Chana (चना) - MSP ₹5,590</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-bold text-stone-700 mb-1">
                  Quantity (Quintals)
                </label>
                <input type="number" min="1" max="150" value="${form.quantity}" required
                  oninput="state.bookingForm.quantity = this.value"
                  class="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-mono font-bold text-stone-900 bg-white">
                <span class="text-[10px] text-stone-500">Max permissible: ${f.cropQuota.Wheat.remaining} Qtl</span>
              </div>
            </div>

            <!-- Date & Time Slot (With visual load indicator) -->
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-bold text-stone-700 mb-1">Delivery Date</label>
                <input type="date" value="${form.slotDate}" required
                  onchange="state.bookingForm.slotDate = this.value"
                  class="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-semibold text-stone-900 bg-white">
              </div>

              <div>
                <label class="block text-xs font-bold text-stone-700 mb-1">Time Window</label>
                <select class="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-semibold text-stone-900 bg-white"
                  onchange="state.bookingForm.slotTime = this.value">
                  <option value="08:00 AM - 11:00 AM">08:00 AM - 11:00 AM (🟢 Low Load)</option>
                  <option value="11:00 AM - 02:00 PM">11:00 AM - 02:00 PM (🟡 Moderate)</option>
                  <option value="02:00 PM - 05:00 PM">02:00 PM - 05:00 PM (🟢 Low Load)</option>
                </select>
              </div>
            </div>

            <!-- Vehicle Details -->
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-bold text-stone-700 mb-1">Vehicle Type</label>
                <select class="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-semibold text-stone-900 bg-white"
                  onchange="state.bookingForm.vehicleType = this.value">
                  <option value="Tractor Trolley">Tractor Trolley</option>
                  <option value="Pickup Truck">Pickup Truck (Bolero Maxi)</option>
                  <option value="Mini Truck">Mini Truck (Tata 407)</option>
                  <option value="Bullock Cart">Bullock Cart / बैलगाड़ी</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-bold text-stone-700 mb-1">Vehicle Registration #</label>
                <input type="text" value="${form.vehicleNumber}" required
                  oninput="state.bookingForm.vehicleNumber = this.value"
                  placeholder="MP-09-BZ-6712"
                  class="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs font-mono font-bold text-stone-900 bg-white">
              </div>
            </div>

            <!-- Anti-Deadlock Rate Limiting Guarantee -->
            <div class="p-3 bg-stone-50 rounded-xl border border-stone-200 text-[11px] text-stone-600 flex items-center gap-2">
              <span class="text-amber-800 font-bold">⚡ Redis Token Bucket:</span>
              <span>Smooth queue distribution guarantees zero 502/504 slot booking collisions.</span>
            </div>

            <div class="flex items-center gap-3 pt-2">
              <button type="button" onclick="appHandlers.toggleBookingForm(false)"
                class="flex-1 py-2.5 rounded-xl border border-stone-200 text-stone-700 font-bold text-xs hover:bg-stone-50">
                Cancel
              </button>
              <button type="submit" ${form.isSubmitting ? 'disabled' : ''}
                class="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-rose-700 to-red-700 hover:from-rose-800 hover:to-red-800 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2">
                ${form.isSubmitting ? 'Generating Token...' : 'Confirm & Generate Token'}
              </button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  // ==========================================
  // VIEW 2: MANDI STAFF & GATE OPERATIONS
  // ==========================================
  function renderStaffView() {
    const mandi = getActiveMandi();
    const waitingTokens = state.tokens.filter(t => t.mandiId === mandi.id);
    const selectedTok = state.tokens.find(t => t.id === state.mandiStaff.selectedTokenId) || waitingTokens[0] || state.tokens[0];

    return `
      <div class="space-y-6">
        <!-- TOP STATS BAR -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          <div class="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-stone-400 uppercase">Waiting in Yard</span>
              <span class="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
            </div>
            <div class="text-2xl sm:text-3xl font-black text-rose-950 mt-1">37 Vehicles</div>
            <span class="text-[11px] text-stone-500 font-medium">Holding Bay A & B</span>
          </div>

          <div class="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-stone-400 uppercase">In Processing</span>
              <span class="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            </div>
            <div class="text-2xl sm:text-3xl font-black text-amber-900 mt-1">12 Bays Active</div>
            <span class="text-[11px] text-amber-800 font-bold">Avg Processing: 11 min</span>
          </div>

          <div class="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-stone-400 uppercase">Completed Today</span>
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            </div>
            <div class="text-2xl sm:text-3xl font-black text-emerald-900 mt-1">84 Farmers</div>
            <span class="text-[11px] text-emerald-700 font-bold">3,780 MT Procured</span>
          </div>

          <div class="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
            <span class="text-xs font-bold text-stone-400 uppercase">Gate Operations</span>
            <div class="flex items-center gap-1.5 mt-2">
              <span class="px-2 py-0.5 rounded text-[10px] font-black bg-emerald-100 text-emerald-950 border border-emerald-300">Gate 1 🟢</span>
              <span class="px-2 py-0.5 rounded text-[10px] font-black bg-amber-100 text-amber-950 border border-amber-300">Gate 2 🟡</span>
              <span class="px-2 py-0.5 rounded text-[10px] font-black bg-rose-100 text-rose-950 border border-rose-300">Gate 3 🔴</span>
            </div>
            <span class="text-[10px] text-stone-400 mt-1 block">Live Turnaround: 11m avg</span>
          </div>
        </div>

        <!-- STAFF ACTION CONTROL BAR -->
        <div class="p-3 bg-white rounded-2xl border border-stone-200 shadow-xs flex flex-wrap items-center justify-between gap-2.5">
          <div class="flex items-center gap-2">
            <button onclick="appHandlers.openStaffScanner()"
              class="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 font-black text-xs shadow-2xs flex items-center gap-1.5 cursor-pointer">
              <span>📷</span>
              <span>Scan Farmer QR Code</span>
            </button>
            <button onclick="appHandlers.callNextToken()"
              class="px-3.5 py-2 rounded-xl bg-gradient-to-r from-rose-700 to-red-700 hover:from-rose-800 hover:to-red-800 text-white font-bold text-xs shadow-2xs flex items-center gap-1.5 cursor-pointer">
              <span>📢</span>
              <span>Call Next Farmer</span>
            </button>
          </div>
          <div class="text-xs text-stone-500 font-bold flex items-center gap-2">
            <span>Center: <strong>${mandi.name}</strong></span>
            <span>•</span>
            <span class="text-amber-800 font-bold">RFID Reader: Active</span>
          </div>
        </div>

        <!-- MAIN SPLIT: QUEUE CONTROLLER & TERMINAL WORKSTATION -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- LEFT: LIVE QUEUE LIST & CALL NEXT -->
          <div class="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="font-extrabold text-sm text-stone-900">Live Yard Queue</h3>
                <p class="text-[11px] text-stone-500">Vehicles slotted for today</p>
              </div>
              <button onclick="appHandlers.callNextToken()"
                class="px-3.5 py-1.5 bg-gradient-to-r from-rose-700 to-red-700 hover:from-rose-800 hover:to-red-800 text-white font-bold rounded-xl text-xs shadow-xs transition-colors flex items-center gap-1.5">
                <span>📢</span>
                <span>Call Next Token</span>
              </button>
            </div>

            <!-- Queue Token Items -->
            <div class="space-y-2.5 max-h-[520px] overflow-y-auto pr-1">
              ${waitingTokens.map(tok => `
                <div onclick="appHandlers.selectStaffToken('${tok.id}')"
                  class="p-3 rounded-xl border text-xs cursor-pointer transition-all ${selectedTok?.id === tok.id ? 'border-rose-600 bg-rose-50/70 ring-2 ring-rose-500/20 shadow-2xs' : 'border-stone-200 bg-stone-50 hover:bg-white'}">
                  <div class="flex items-center justify-between mb-1">
                    <span class="font-mono font-extrabold text-stone-900">${tok.id}</span>
                    <span class="px-2 py-0.5 rounded text-[10px] font-bold ${
                      tok.status === 'completed' ? 'bg-amber-100 text-amber-950 font-bold border border-amber-300' :
                      tok.status === 'at_weighbridge' ? 'bg-indigo-100 text-indigo-800' :
                      tok.status === 'in_quality_check' ? 'bg-amber-100 text-amber-800' :
                      'bg-stone-200 text-stone-700'
                    }">
                      ${tok.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>

                  <div class="font-bold text-stone-800">${tok.farmerName}</div>
                  <div class="text-[11px] text-stone-500 flex justify-between mt-0.5">
                    <span>${tok.crop} (${tok.quantityQuintals} Qtl)</span>
                    <span class="font-mono text-stone-600">${tok.slotTime.split(' - ')[0]}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- RIGHT (2 COLS): WORKSTATION (Quality Check & Weighbridge) -->
          <div class="lg:col-span-2 space-y-5">
            ${selectedTok ? renderStaffWorkstation(selectedTok) : `
              <div class="bg-white rounded-2xl border border-stone-200 p-8 text-center text-stone-400">
                Select a token from the queue to process.
              </div>
            `}
          </div>
        </div>
      </div>
    `;
  }

  // Workstation for Quality Inspection & Weighbridge MSP calculation
  function renderStaffWorkstation(tok) {
    return `
      <div class="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-6">
        <!-- HEADER -->
        <div class="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-4">
          <div>
            <div class="flex items-center gap-2">
              <span class="font-mono font-extrabold text-2xl text-stone-900">${tok.id}</span>
              <span class="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-950 border border-amber-300 font-extrabold">
                ${tok.crop} • ${tok.quantityQuintals} Qtl
              </span>
            </div>
            <p class="text-xs text-stone-500 mt-1">Farmer: <strong class="text-stone-900">${tok.farmerName}</strong> (${tok.village}) • Phone: ${tok.phone}</p>
          </div>

          <div class="text-right">
            <span class="text-xs font-bold text-stone-400 block uppercase">Gate & Bay</span>
            <span class="font-bold text-sm text-stone-800">${tok.assignedGate}</span>
          </div>
        </div>

        <!-- 2 WORKSTATION MODULES: 1. QUALITY CHECK & 2. WEIGHBRIDGE -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <!-- MODULE 1: QUALITY INSPECTION TERMINAL (Slide 3) -->
          <div class="p-4 rounded-xl border border-stone-200 bg-stone-50/60 space-y-4">
            <div class="flex items-center justify-between border-b border-stone-200 pb-2">
              <span class="text-xs font-extrabold text-stone-900 flex items-center gap-1.5">
                🔬 Digital Quality Inspection
              </span>
              <span class="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                FAQ Standards
              </span>
            </div>

            <!-- Moisture Content % -->
            <div class="space-y-1">
              <div class="flex justify-between text-xs font-bold">
                <span>Grain Moisture Content</span>
                <span class="font-mono text-rose-900">${state.mandiStaff.moisture}% (Max 12%)</span>
              </div>
              <input type="range" min="8" max="18" step="0.1"
                value="${state.mandiStaff.moisture}"
                oninput="state.mandiStaff.moisture = Number(this.value); appHandlers.selectStaffToken('${tok.id}');"
                class="w-full accent-rose-600 cursor-pointer">
              <div class="flex justify-between text-[10px] text-stone-400">
                <span>Dry (8%)</span>
                <span class="text-amber-800 font-bold">Optimal (12%)</span>
                <span class="text-rose-600 font-bold">Excess (>14%)</span>
              </div>
            </div>

            <!-- Foreign Matter % -->
            <div class="space-y-1">
              <div class="flex justify-between text-xs font-bold">
                <span>Foreign Matter / Impurities</span>
                <span class="font-mono text-stone-800">${state.mandiStaff.foreignMatter}% (Max 0.75%)</span>
              </div>
              <input type="range" min="0" max="3" step="0.1"
                value="${state.mandiStaff.foreignMatter}"
                oninput="state.mandiStaff.foreignMatter = Number(this.value); appHandlers.selectStaffToken('${tok.id}');"
                class="w-full accent-rose-600 cursor-pointer">
            </div>

            <!-- Auto-Calculated Quality Grade -->
            <div class="p-3 bg-white rounded-lg border border-stone-200 space-y-1 text-xs">
              <div class="flex justify-between">
                <span class="text-stone-500">Grading Result:</span>
                <span class="font-bold ${state.mandiStaff.moisture > 14 ? 'text-rose-600' : 'text-rose-800 font-bold'}">
                  ${state.mandiStaff.moisture > 14 ? 'Rejected (Moisture High)' : 'Grade A (FAQ Standard)'}
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-stone-500">Moisture Dock:</span>
                <span class="font-mono font-bold">${state.mandiStaff.moisture > 12 ? '- ₹' + Math.round((state.mandiStaff.moisture - 12) * 35) + '/Qtl' : '₹0 (Zero Dock)'}</span>
              </div>
            </div>

            <button onclick="appHandlers.saveQualityCheck('${tok.id}')"
              class="w-full py-2 bg-stone-800 hover:bg-stone-900 text-white font-bold rounded-lg text-xs shadow-xs transition-colors">
              Approve Quality & Move to Weighbridge
            </button>
          </div>

          <!-- MODULE 2: WEIGHBRIDGE & MSP SETTLEMENT (Slide 3) -->
          <div class="p-4 rounded-xl border border-stone-200 bg-stone-50/60 space-y-4">
            <div class="flex items-center justify-between border-b border-stone-200 pb-2">
              <span class="text-xs font-extrabold text-stone-900 flex items-center gap-1.5">
                ${Icons.scale} Digital Weighbridge & MSP
              </span>
              <span class="text-[10px] font-bold bg-amber-100 text-amber-950 px-2 py-0.5 rounded border border-amber-300 font-bold">
                Auto-Tare
              </span>
            </div>

            <!-- Gross & Tare Inputs -->
            <div class="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label class="block text-[11px] font-bold text-stone-600 mb-1">Gross Weight (kg)</label>
                <input type="number" value="${state.mandiStaff.grossWeight}"
                  oninput="state.mandiStaff.grossWeight = this.value; appHandlers.selectStaffToken('${tok.id}');"
                  class="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 font-mono font-bold text-xs bg-white">
              </div>
              <div>
                <label class="block text-[11px] font-bold text-stone-600 mb-1">Tare Weight (kg)</label>
                <input type="number" value="${state.mandiStaff.tareWeight}"
                  oninput="state.mandiStaff.tareWeight = this.value; appHandlers.selectStaffToken('${tok.id}');"
                  class="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 font-mono font-bold text-xs bg-white">
              </div>
            </div>

            <!-- Net Calculation -->
            ${(() => {
              const gross = Number(state.mandiStaff.grossWeight);
              const tare = Number(state.mandiStaff.tareWeight);
              const netKg = Math.max(0, gross - tare);
              const netQtl = Math.round((netKg / 100) * 10) / 10;
              const m = state.mandis.find(x => x.id === tok.mandiId) || state.mandis[0];
              const baseMsp = MSP_RATES[tok.crop]?.total || 2400;
              const rate = baseMsp + (m.priceOffset || 0);
              const payout = Math.round(netQtl * rate);

              return `
                <div class="p-3 bg-white rounded-lg border border-stone-200 space-y-1.5 text-xs">
                  <div class="flex justify-between">
                    <span class="text-stone-500">Calculated Net:</span>
                    <span class="font-mono font-extrabold text-stone-900">${netKg.toLocaleString()} kg (${netQtl} Quintals)</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-stone-500">MSP Rate + State Bonus:</span>
                    <span class="font-mono font-bold text-rose-900">₹${rate} / Qtl</span>
                  </div>
                  <div class="flex justify-between border-t border-stone-100 pt-1.5 text-sm font-extrabold">
                    <span class="text-stone-800">Direct DBT Credit:</span>
                    <span class="font-mono text-rose-950 font-black">₹${payout.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <button onclick="appHandlers.completeWeighbridgeAndProcurement('${tok.id}')"
                  class="w-full py-2.5 bg-gradient-to-r from-rose-700 via-rose-800 to-amber-700 hover:from-rose-800 hover:to-amber-800 text-white font-extrabold rounded-lg text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5">
                  <span>💰</span>
                  <span>Authorize Procurement & Issue e-Receipt</span>
                </button>
              `;
            })()}
          </div>
        </div>
      </div>
    `;
  }

  // ==========================================
  // VIEW 3: MINISTRY & DISTRICT ANALYTICS
  // ==========================================
  function renderMinistryView() {
    const totalProcuredMT = state.mandis.reduce((acc, m) => acc + m.todayProcuredMT, 0);
    const totalMSPDisbursedCr = (totalProcuredMT * 24000 / 10000000).toFixed(2);

    return `
      <div class="space-y-6">
        <!-- EXECUTIVE KPI CARDS -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
            <span class="text-xs font-bold text-stone-400 uppercase tracking-wider">Connected Mandis</span>
            <div class="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-1">48 Centers</div>
            <div class="text-[11px] text-amber-800 font-bold mt-1">● 100% Operational Uptime</div>
          </div>

          <div class="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
            <span class="text-xs font-bold text-stone-400 uppercase tracking-wider">Metric Tonnes Procured</span>
            <div class="text-2xl sm:text-3xl font-extrabold text-rose-900 mt-1">${totalProcuredMT.toLocaleString()} MT</div>
            <div class="text-[11px] text-stone-500 mt-1">Target: 85,000 MT (Seasonal)</div>
          </div>

          <div class="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
            <span class="text-xs font-bold text-stone-400 uppercase tracking-wider">Total MSP Disbursed</span>
            <div class="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-1">₹${totalMSPDisbursedCr} Cr</div>
            <div class="text-[11px] text-amber-800 font-bold mt-1">100% Direct DBT Bank Credit</div>
          </div>

          <div class="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs">
            <span class="text-xs font-bold text-stone-400 uppercase tracking-wider">Average Yard Wait Time</span>
            <div class="text-2xl sm:text-3xl font-extrabold text-amber-800 mt-1">38 Mins</div>
            <div class="text-[11px] text-stone-500 mt-1">Reduced from 8.5 Hours (Manual)</div>
          </div>
        </div>

        <!-- MANDI CONGESTION HEATMAP TABLE -->
        <div class="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-extrabold text-base text-stone-900">District Mandi Congestion & Throughput Heatmap</h3>
              <p class="text-xs text-stone-500">Real-time load balancing and slot rate-limiting telemetry</p>
            </div>
            <span class="px-2.5 py-1 bg-rose-50 text-rose-900 border border-rose-200 font-bold text-xs rounded-full">
              Indore Division
            </span>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead class="bg-stone-50 text-stone-600 font-bold border-b border-stone-200">
                <tr>
                  <th class="py-3 px-3">Mandi / Center Name</th>
                  <th class="py-3 px-3">Active Gates</th>
                  <th class="py-3 px-3">Current Queue</th>
                  <th class="py-3 px-3">Avg Wait Time</th>
                  <th class="py-3 px-3">Capacity Load</th>
                  <th class="py-3 px-3">Today Intake</th>
                  <th class="py-3 px-3">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-stone-100 font-medium">
                ${state.mandis.map(m => `
                  <tr class="hover:bg-stone-50/70">
                    <td class="py-3 px-3 font-bold text-stone-900">${m.name}</td>
                    <td class="py-3 px-3 font-mono">${m.gates} Operational</td>
                    <td class="py-3 px-3 font-mono font-bold">${m.queueLength} Trucks</td>
                    <td class="py-3 px-3 font-mono text-rose-900 font-bold">${m.avgWaitMins} mins</td>
                    <td class="py-3 px-3">
                      <div class="w-28 bg-stone-200 h-2 rounded-full overflow-hidden">
                        <div class="h-full rounded-full ${m.capacityPercent > 75 ? 'bg-amber-500' : 'bg-rose-600'}"
                          style="width: ${m.capacityPercent}%"></div>
                      </div>
                      <span class="text-[10px] text-stone-500 mt-0.5 block">${m.capacityPercent}% Full</span>
                    </td>
                    <td class="py-3 px-3 font-mono font-bold">${m.todayProcuredMT} MT</td>
                    <td class="py-3 px-3">
                      <span class="px-2 py-0.5 rounded text-[10px] font-bold ${m.capacityPercent > 75 ? 'bg-amber-100 text-amber-900' : 'bg-rose-100 text-rose-900'}">
                        ${m.capacityPercent > 75 ? 'Heavy Load' : 'Smooth Flow'}
                      </span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- CROP DISTRIBUTION & DBT METRICS -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div class="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-3">
            <h4 class="font-bold text-sm text-stone-900">Procurement Commodity Breakdown</h4>
            <div class="space-y-3 pt-2">
              <div>
                <div class="flex justify-between text-xs font-bold mb-1">
                  <span>Wheat (गेहूं)</span>
                  <span class="font-mono">68% (1,530 MT)</span>
                </div>
                <div class="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden">
                  <div class="bg-amber-600 h-full rounded-full" style="width: 68%"></div>
                </div>
              </div>

              <div>
                <div class="flex justify-between text-xs font-bold mb-1">
                  <span>Soybean (सोयाबीन)</span>
                  <span class="font-mono">22% (495 MT)</span>
                </div>
                <div class="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden">
                  <div class="bg-gradient-to-r from-rose-600 to-amber-600 h-full rounded-full" style="width: 22%"></div>
                </div>
              </div>

              <div>
                <div class="flex justify-between text-xs font-bold mb-1">
                  <span>Gram / Chana (चना)</span>
                  <span class="font-mono">10% (225 MT)</span>
                </div>
                <div class="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden">
                  <div class="bg-orange-600 h-full rounded-full" style="width: 10%"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-3">
            <h4 class="font-bold text-sm text-stone-900">Direct Benefit Transfer (DBT) Integration</h4>
            <div class="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-2 text-xs">
              <div class="flex justify-between">
                <span class="text-stone-500">NPCI Aadhaar Payment Bridge:</span>
                <span class="font-bold text-rose-900">Connected (99.8% Success)</span>
              </div>
              <div class="flex justify-between">
                <span class="text-stone-500">PFMS Gateway Settlement:</span>
                <span class="font-bold text-rose-900">T+0 Realtime Transfer</span>
              </div>
              <div class="flex justify-between">
                <span class="text-stone-500">Middlemen Elimination:</span>
                <span class="font-bold text-stone-900">100% Zero Intermediary</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // ==========================================
  // VIEW 4: REAL-TIME SMS NOTIFICATION DRAWER
  // ==========================================
  function renderSmsView() {
    return `
      <div class="max-w-2xl mx-auto space-y-5">
        <div class="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-2">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="text-2xl">📱</span>
              <div>
                <h3 class="font-extrabold text-base text-stone-900">Live Telecom SMS Gateway Simulation</h3>
                <p class="text-xs text-stone-500">Transactional SMS dispatched to farmers without external API lag</p>
              </div>
            </div>
            <span class="px-2.5 py-1 bg-amber-50 text-amber-900 font-bold text-xs rounded-full border border-amber-200">
              Telecom Simulator
            </span>
          </div>
        </div>

        <!-- Phone screen container -->
        <div class="bg-stone-900 p-4 rounded-3xl shadow-xl max-w-lg mx-auto border-4 border-stone-700">
          <div class="bg-stone-800 text-stone-300 text-[11px] px-3 py-1.5 rounded-t-xl flex justify-between font-mono">
            <span>●●● 4G</span>
            <span>Messages (Kisan Setu)</span>
            <span>100% 🔋</span>
          </div>

          <div class="bg-stone-100 p-3 rounded-b-xl space-y-3 min-h-[420px] max-h-[500px] overflow-y-auto">
            ${state.smsList.map(sms => `
              <div class="bg-white p-3.5 rounded-2xl shadow-2xs border border-stone-200 space-y-1.5 animate-slide-in">
                <div class="flex items-center justify-between">
                  <span class="text-[10px] font-extrabold px-2 py-0.5 rounded bg-rose-100 text-rose-900 font-bold">
                    ${sms.tag}
                  </span>
                  <span class="text-[10px] text-stone-400 font-mono">${sms.timestamp}</span>
                </div>
                <div class="text-[11px] text-stone-500 font-mono">To: <strong>${sms.to}</strong></div>
                <p class="text-xs text-stone-800 leading-relaxed font-sans">${sms.body}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // ==========================================
  // VIEW 5: TECHNICAL ARCHITECTURE & LOAD TEST (SIH Slide 2 & 3 Showcase)
  // ==========================================
  function renderTechView() {
    const sim = state.concurrencySimulator;

    return `
      <div class="space-y-6">
        <!-- HEADER SHOWCASE -->
        <div class="bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 text-white p-6 rounded-2xl shadow-sm space-y-3">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-500/20 text-indigo-200 border border-indigo-400/30 mb-1">
                <span>⚡ SIH26032 Architecture Innovation</span>
              </div>
              <h2 class="text-xl sm:text-2xl font-extrabold tracking-tight">Technical Bottleneck & Concurrency Simulator</h2>
              <p class="text-xs text-indigo-200 mt-1 max-w-2xl">
                Demonstrating the solution to <strong>Slide 2 Problem 1 & 2</strong>: Eliminating 100% CPU lockups, 502/504 errors, and Bhulekh database deadlocks using Redis token buckets and RabbitMQ asynchronous queues.
              </p>
            </div>
            
            <button onclick="appHandlers.toggleConcurrencySim()"
              class="px-5 py-2.5 rounded-xl font-extrabold text-xs shadow-md transition-all ${sim.isRunning ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse' : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 font-black'}">
              ${sim.isRunning ? '⏹ Stop Simulation' : '▶ Run 10,000 Slot Booking Surge'}
            </button>
          </div>
        </div>

        <!-- ARCHITECTURE COMPARISON: LEGACY VS KISAN SETU -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <!-- LEFT: LEGACY SYSTEM (THE PROBLEM IN SLIDE 2) -->
          <div onclick="appHandlers.setSimMode('sync')"
            class="p-5 rounded-2xl border-2 cursor-pointer transition-all ${sim.systemMode === 'sync' ? 'border-rose-500 bg-rose-50/40 shadow-sm' : 'border-stone-200 bg-white hover:border-stone-300'}">
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-extrabold text-rose-800 uppercase flex items-center gap-1.5">
                <span>❌</span> 01. Legacy Synchronous System
              </span>
              <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold">
                Slide 2 Bottleneck
              </span>
            </div>
            <ul class="text-xs text-stone-600 space-y-1.5 list-disc pl-4 leading-relaxed">
              <li><strong>Static Servers:</strong> Hits 100% CPU on 9:00 AM booking surge causing 502/504 Bad Gateway errors.</li>
              <li><strong>Bhulekh Deadlocks:</strong> Simultaneous land queries lock database rows and drop client connections.</li>
              <li><strong>OTP Timeout Loops:</strong> Synchronous telecom SMS gateway hangs user sessions indefinitely.</li>
            </ul>
          </div>

          <!-- RIGHT: KISAN SETU ASYNC DECOUPLED (THE SOLUTION IN SLIDE 2 & 3) -->
          <div onclick="appHandlers.setSimMode('async')"
            class="p-5 rounded-2xl border-2 cursor-pointer transition-all ${sim.systemMode === 'async' ? 'border-rose-500 bg-rose-50/40 shadow-sm' : 'border-stone-200 bg-white hover:border-stone-300'}">
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-extrabold text-rose-900 uppercase flex items-center gap-1.5">
                <span>✅</span> 02. Kisan Setu Decoupled Engine
              </span>
              <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300 font-bold">
                BuildBeyond Innovation
              </span>
            </div>
            <ul class="text-xs text-stone-600 space-y-1.5 list-disc pl-4 leading-relaxed">
              <li><strong>RabbitMQ / Redis Queues:</strong> Buffers 15,000+ requests/sec smoothly without server collapse.</li>
              <li><strong>Decoupled Middleware:</strong> Asynchronous slot validation bypasses OTP bottlenecks.</li>
              <li><strong>Edge SPA & Caching:</strong> Zero session timeouts, ultra-low bandwidth consumption (<100 KB).</li>
            </ul>
          </div>
        </div>

        <!-- LIVE BENCHMARK TELEMETRY GAUGES -->
        <div class="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs space-y-4">
          <h3 class="font-extrabold text-sm text-stone-900">Live Concurrency Telemetry (9:00 AM Slot Rush)</h3>
          
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div class="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span class="text-[10px] font-bold text-stone-500 uppercase">Server CPU Load</span>
              <div class="text-2xl font-mono font-extrabold ${sim.cpuLoad > 80 ? 'text-rose-600' : 'text-amber-800'} mt-1">
                ${sim.cpuLoad}%
              </div>
              <div class="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden mt-2">
                <div class="h-full rounded-full ${sim.cpuLoad > 80 ? 'bg-rose-600' : 'bg-rose-600'}" style="width: ${sim.cpuLoad}%"></div>
              </div>
            </div>

            <div class="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span class="text-[10px] font-bold text-stone-500 uppercase">API Response Latency</span>
              <div class="text-2xl font-mono font-extrabold ${sim.latencyMs > 1000 ? 'text-rose-600' : 'text-amber-800'} mt-1">
                ${sim.latencyMs} ms
              </div>
              <span class="text-[10px] text-stone-400 mt-1 block">${sim.latencyMs > 1000 ? 'Severe Latency Degradation' : 'Sub-50ms Edge Response'}</span>
            </div>

            <div class="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span class="text-[10px] font-bold text-stone-500 uppercase">Successful Bookings</span>
              <div class="text-2xl font-mono font-extrabold text-rose-900 mt-1">
                ${sim.processedCount.toLocaleString()}
              </div>
              <span class="text-[10px] text-amber-800 font-bold mt-1 block">Dynamic Tokens Allocated</span>
            </div>

            <div class="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span class="text-[10px] font-bold text-stone-500 uppercase">Dropped Requests (502/504)</span>
              <div class="text-2xl font-mono font-extrabold ${sim.droppedCount > 0 ? 'text-rose-600' : 'text-stone-400'} mt-1">
                ${sim.droppedCount.toLocaleString()}
              </div>
              <span class="text-[10px] text-stone-400 mt-1 block">${sim.droppedCount > 0 ? 'Deadlocks in Bhulekh DB Pool' : 'Zero Loss (RabbitMQ Ingest)'}</span>
            </div>
          </div>

          <!-- Realtime Terminal Logs -->
          <div class="bg-stone-900 rounded-xl p-4 font-mono text-[11px] text-amber-400 space-y-1">
            <div class="text-stone-400 pb-1 border-b border-stone-800 text-[10px] flex justify-between">
              <span>CLUSTER LOG STREAM</span>
              <span>NODE: ap-south-1 • INSTANCE: kisan-setu-worker-01</span>
            </div>
            ${sim.logHistory.length > 0 ? sim.logHistory.map(l => `<div>> ${l}</div>`).join('') : `
              <div class="text-stone-500">> Ready for high concurrency stress test. Click 'Run 10,000 Slot Booking Surge' above.</div>
            `}
          </div>
        </div>
      </div>
    `;
  }


  // ==========================================
  // VIEW: MANDIS & LIVE RATES DIRECTORY (GOVT + PRIVATE)
  // ==========================================
  function renderMandisDirectoryView() {
    const cropRate = MSP_RATES['Wheat'];

    return `
      <div class="space-y-6 animate-fade-in">
        <!-- HEADER -->
        <div class="bg-gradient-to-r from-rose-900 via-stone-900 to-amber-950 text-white p-6 rounded-2xl border-b-2 border-amber-400/30 shadow-sm">
          <div class="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/15 text-amber-300 border border-white/20 mb-2">
                <span>🏢 Government & Private Mandi Directory</span>
              </div>
              <h2 class="text-2xl sm:text-3xl font-black tracking-tight">Procurement Centers & Live Rates (Indore Division)</h2>
              <p class="text-xs text-stone-300 mt-1">Compare official Government APMC yards and licensed Corporate Silos/Private Mandis for maximum farmer profit.</p>
            </div>

            <!-- Mandi Filter Buttons -->
            <div class="flex items-center gap-2">
              <button onclick="appHandlers.setMandiFilter('all')"
                class="px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${state.mandiFilter === 'all' ? 'bg-white text-stone-900 shadow-xs' : 'bg-white/10 text-white hover:bg-white/20'}">
                All Mandis (6)
              </button>
              <button onclick="appHandlers.setMandiFilter('private')"
                class="px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${state.mandiFilter === 'private' ? 'bg-amber-500 text-stone-950 font-black shadow-xs' : 'bg-white/10 text-white hover:bg-white/20'}">
                🏢 Private Mandis (2)
              </button>
              <button onclick="appHandlers.setMandiFilter('government')"
                class="px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${state.mandiFilter === 'government' ? 'bg-rose-700 text-white shadow-xs' : 'bg-white/10 text-white hover:bg-white/20'}">
                🏛️ Govt APMC (4)
              </button>
            </div>
          </div>
        </div>

        <!-- COMPARISON MATRIX: GOVT APMC VS PRIVATE MANDI -->
        <div class="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-xs space-y-4">
          <h3 class="text-sm font-black text-stone-900 uppercase tracking-wider flex items-center gap-2">
            <span>⚖️</span> Comparative Analysis: Government APMC vs Licensed Private Mandi
          </h3>
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead class="bg-stone-50 text-stone-700 font-bold border-b border-stone-200">
                <tr>
                  <th class="py-2.5 px-3">Evaluation Parameter</th>
                  <th class="py-2.5 px-3 text-rose-950 bg-rose-50/60 font-bold">🏛️ Government APMC Mandis</th>
                  <th class="py-2.5 px-3 text-amber-950 bg-amber-50/50">🏢 Licensed Private Mandis & Silos</th>
                  <th class="py-2.5 px-3">Farmer Benefit Summary</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-stone-100 font-medium">
                <tr>
                  <td class="py-3 px-3 font-bold text-stone-800">Wheat Procurement Rate</td>
                  <td class="py-3 px-3 font-mono">₹2,400 / Qtl (Official MSP)</td>
                  <td class="py-3 px-3 font-mono font-bold text-rose-900 bg-amber-50/30">₹2,450 – ₹2,460 / Qtl (+₹50-₹60 Bonus)</td>
                  <td class="py-3 px-3 text-amber-800 font-bold">+₹2,400 extra profit per 40 Qtl trolley</td>
                </tr>
                <tr>
                  <td class="py-3 px-3 font-bold text-stone-800">Avg. Unloading Time</td>
                  <td class="py-3 px-3">32 – 45 Minutes (Yard Congestion)</td>
                  <td class="py-3 px-3 font-bold text-amber-900 bg-amber-50/30">15 – 18 Minutes (Hydraulic Tipper)</td>
                  <td class="py-3 px-3 text-stone-600">Save 25+ minutes per delivery trip</td>
                </tr>
                <tr>
                  <td class="py-3 px-3 font-bold text-stone-800">Weighing Technology</td>
                  <td class="py-3 px-3">Electronic / Manual beam scale</td>
                  <td class="py-3 px-3 font-bold text-amber-900 bg-amber-50/30">Automated Computerized Gross/Tare Sensors</td>
                  <td class="py-3 px-3 text-stone-600">Zero weight manipulation or rounding loss</td>
                </tr>
                <tr>
                  <td class="py-3 px-3 font-bold text-stone-800">Payment Channel & Speed</td>
                  <td class="py-3 px-3">PFMS Direct Benefit Transfer (24–48 hrs)</td>
                  <td class="py-3 px-3 font-bold text-rose-900 bg-amber-50/30">Instant Same-Day Corporate NEFT / RTGS</td>
                  <td class="py-3 px-3 text-amber-800 font-bold">Immediate bank credit on same day</td>
                </tr>
                <tr>
                  <td class="py-3 px-3 font-bold text-stone-800">Legal Licensing</td>
                  <td class="py-3 px-3">MP State Krishi Upaj Mandi Board</td>
                  <td class="py-3 px-3 bg-amber-50/30">Section 31-A Private Mandi License (ITC / Adani)</td>
                  <td class="py-3 px-3 text-stone-600">100% legal, regulated under state oversight</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- MANDIS CARDS GRID -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          ${state.mandis.filter(m => state.mandiFilter === 'all' || m.type === state.mandiFilter).map(m => `
            <div class="bg-white rounded-2xl border-2 ${m.type === 'private' ? 'border-amber-300 shadow-xs ring-1 ring-amber-200' : 'border-stone-200'} p-5 space-y-4 flex flex-col justify-between transition-all hover:shadow-md">
              <div class="space-y-3">
                <div class="flex items-start justify-between gap-2">
                  <div>
                    <span class="px-2 py-0.5 rounded text-[10px] font-extrabold ${m.type === 'private' ? 'bg-amber-100 text-amber-950 border border-amber-300' : 'bg-rose-100 text-rose-950 border border-rose-300'}">
                      ${m.type === 'private' ? '🏢 LICENSED PRIVATE MANDI' : '🏛️ GOVERNMENT APMC'}
                    </span>
                    <h4 class="font-black text-base text-stone-900 mt-1">${m.name}</h4>
                    <p class="text-[11px] text-stone-500">${m.operator || 'MP Mandi Board'} • ${m.district}</p>
                  </div>
                  <span class="px-2 py-1 rounded-lg text-xs font-bold ${m.capacityPercent > 75 ? 'bg-amber-100 text-amber-900' : 'bg-rose-100 text-rose-900'} shrink-0">
                    ~${m.avgWaitMins}m wait
                  </span>
                </div>

                <div class="p-3 bg-stone-50 rounded-xl space-y-2 text-xs">
                  <div class="flex justify-between items-center">
                    <span class="text-stone-500">Wheat Today's Rate:</span>
                    <strong class="font-mono text-rose-900 text-sm font-extrabold">₹${cropRate.total + (m.priceOffset || 0)} / Qtl</strong>
                  </div>
                  ${m.type === 'private' ? `
                    <div class="flex justify-between items-center text-amber-900 font-bold text-[11px]">
                      <span>⚡ Private Corporate Bonus:</span>
                      <span>+₹${m.priceOffset} / Qtl over MSP</span>
                    </div>
                  ` : ''}
                  <div class="flex justify-between items-center text-stone-600">
                    <span>Queue Load:</span>
                    <span class="font-mono font-bold">${m.queueLength} Vehicles in line</span>
                  </div>
                  <div class="flex justify-between items-center text-stone-600">
                    <span>License / Reg:</span>
                    <span class="font-mono text-[11px]">${m.licenseNo || 'APMC-MP-IND-01'}</span>
                  </div>
                </div>

                <!-- Highlights -->
                <div class="space-y-1">
                  <span class="text-[10px] font-extrabold uppercase tracking-wider text-stone-400">Key Features:</span>
                  <ul class="text-[11px] text-stone-600 space-y-0.5">
                    ${(m.highlights || [
                      'Automated Gate Entry pass system',
                      'Direct Bank Settlement to farmer account',
                      'Real-time queue SMS notification alerts'
                    ]).map(h => `<li class="flex items-center gap-1.5"><span>•</span><span>${h}</span></li>`).join('')}
                  </ul>
                </div>
              </div>

              <button onclick="appHandlers.bookSpecificMandi('${m.id}')"
                class="w-full py-2.5 rounded-xl font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5 ${
                  m.type === 'private'
                    ? 'bg-amber-600 hover:bg-amber-700 text-white'
                    : 'bg-gradient-to-r from-rose-700 to-red-700 hover:from-rose-800 hover:to-red-800 text-white font-bold'
                }">
                <span>⚡ Book Delivery Slot at this Mandi</span>
                <span>➔</span>
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

// --- KISAN SAHAYAK AI ASSISTANT MODAL UI ---
  function renderAiAssistantModal() {
    const agent = state.aiAgent;
    const f = getActiveFarmer();

    return `
      <div class="fixed inset-0 z-50 bg-stone-900/50 backdrop-blur-xs flex items-end sm:items-center justify-center sm:justify-end sm:p-6 p-0 animate-fade-in">
        <div class="bg-white rounded-t-3xl sm:rounded-2xl border border-stone-200 shadow-2xl w-full max-w-lg h-[85vh] sm:h-[620px] flex flex-col overflow-hidden animate-slide-up">
          
          <!-- AI MODAL HEADER -->
          <div class="bg-gradient-to-r from-rose-800 via-red-900 to-amber-950 text-white p-4 border-b border-amber-400/30 flex items-center justify-between shrink-0 shadow-xs">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-xl shadow-xs">
                🤖
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <h3 class="font-black text-sm sm:text-base tracking-tight">Kisan Sahayak AI</h3>
                  <span class="text-[10px] font-bold bg-amber-400/30 text-amber-200 border border-amber-400/40 px-2 py-0.2 rounded-full">
                    कृषि सहायक • Online
                  </span>
                </div>
                <p class="text-[11px] text-amber-200/90">Compare Mandi Rates & Instant Slot Booking</p>
              </div>
            </div>

            <div class="flex items-center gap-1.5">
              <!-- Voice Toggle -->
              <button onclick="appHandlers.toggleAiVoice()"
                class="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-white transition-colors"
                title="${agent.voiceEnabled ? 'Mute Voice' : 'Enable Voice'}">
                ${agent.voiceEnabled ? '🔊' : '🔇'}
              </button>

              <!-- Close Button -->
              <button onclick="appHandlers.toggleAiAgent(false)"
                class="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-white font-bold transition-colors">
                ✕
              </button>
            </div>
          </div>

          <!-- MESSAGES CONTAINER -->
          <div id="ai-chat-messages" class="flex-1 p-4 overflow-y-auto space-y-4 bg-stone-50/70">
            ${agent.messages.map(m => `
              <div class="flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}">
                ${m.sender === 'agent' ? `
                  <div class="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 text-amber-950 flex items-center justify-center text-xs shrink-0 shadow-2xs font-black">
                    🤖
                  </div>
                ` : ''}
                
                <div class="max-w-[85%] space-y-2">
                  <!-- Message Bubble -->
                  <div class="p-3.5 rounded-2xl text-xs leading-relaxed shadow-2xs ${
                    m.sender === 'user' ? 'bg-gradient-to-r from-rose-700 to-red-800 text-white rounded-tr-xs shadow-2xs' 
                      : 'bg-white text-stone-800 border border-amber-200/90 rounded-tl-xs shadow-2xs'
                  }">
                    ${m.text.replace(/\n/g, '<br>')}
                  </div>

                  <!-- Optional Action Cards -->
                  ${m.actionCard ? renderAiActionCard(m.actionCard) : ''}

                  <span class="text-[10px] text-stone-400 block px-1 ${m.sender === 'user' ? 'text-right' : 'text-left'}">
                    ${m.timestamp}
                  </span>
                </div>
              </div>
            `).join('')}

            <!-- Thinking Indicator -->
            ${agent.isThinking ? `
              <div class="flex items-center gap-2 text-stone-500 text-xs pl-9">
                <div class="flex items-center gap-1 bg-white border border-stone-200 px-3 py-2 rounded-full shadow-2xs">
                  <span class="w-1.5 h-1.5 rounded-full bg-rose-600 typing-dot-1"></span>
                  <span class="w-1.5 h-1.5 rounded-full bg-rose-600 typing-dot-2"></span>
                  <span class="w-1.5 h-1.5 rounded-full bg-rose-600 typing-dot-3"></span>
                  <span class="text-[11px] font-bold text-stone-600 ml-1">Analyzing Mandis & Quota...</span>
                </div>
              </div>
            ` : ''}
          </div>

          <!-- QUICK SUGGESTED PROMPTS -->
          <div class="px-3 py-2 bg-stone-100/90 border-t border-stone-200 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
            <button onclick="appHandlers.triggerAiPrompt('Which mandi gives maximum net profit for 50 quintal wheat considering diesel and waiting time?')"
              class="px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-rose-600 text-white text-[11px] font-extrabold whitespace-nowrap shadow-xs">
              🧠 AI Net Profit Optimizer
            </button>
            <button onclick="appHandlers.triggerAiPrompt('Compare Govt APMC vs Private Mandi prices')"
              class="px-2.5 py-1 rounded-full bg-amber-50 border border-amber-300 text-amber-900 text-[11px] font-bold whitespace-nowrap hover:bg-amber-100 transition-colors shadow-2xs">
              🏢 Govt vs Private Mandis
            </button>
            <button onclick="appHandlers.triggerAiPrompt('Which Mandi has the lowest waiting time right now?')"
              class="px-2.5 py-1 rounded-full bg-white border border-stone-300 text-stone-700 text-[11px] font-bold whitespace-nowrap hover:border-rose-600 hover:text-rose-800 transition-colors shadow-2xs">
              ⏱️ ML Queue Predictions
            </button>
            <button onclick="appHandlers.triggerAiPrompt('Book slot for 40 quintals of Wheat at ITC Choupal Saagar private mandi')"
              class="px-2.5 py-1 rounded-full bg-white border border-stone-300 text-stone-700 text-[11px] font-bold whitespace-nowrap hover:border-rose-600 hover:text-rose-800 transition-colors shadow-2xs">
              ⚡ Book ITC Private Mandi
            </button>
            <button onclick="appHandlers.triggerAiPrompt('राऊ मंडी में गेहूं का 50 क्विंटल स्लॉट बुक करो')"
              class="px-2.5 py-1 rounded-full bg-white border border-stone-300 text-stone-700 text-[11px] font-bold whitespace-nowrap hover:border-rose-600 hover:text-rose-800 transition-colors shadow-2xs">
              🇮🇳 हिंदी: स्लॉट बुक करो
            </button>
          </div>

          <!-- INPUT FORM -->
          <form onsubmit="event.preventDefault(); appHandlers.sendAiMessage();" class="p-3 bg-white border-t border-stone-200 flex items-center gap-2 shrink-0">
            <input id="ai-query-input" type="text"
              placeholder="Ask to compare prices or say 'Book slot at Rau Mandi'..."
              class="flex-1 px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-rose-500 bg-stone-50 focus:bg-white transition-all font-medium">
            
            <button type="submit"
              class="p-2.5 bg-gradient-to-r from-rose-700 to-red-700 hover:from-rose-800 hover:to-red-800 text-white font-bold rounded-xl text-xs shadow-xs transition-colors shrink-0 flex items-center justify-center">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="m5 12 14-7-7 14-2-5-5-2Z"/></svg>
            </button>
          </form>
        </div>
      </div>
    `;
  }

  // Renders Rich Action Cards inside AI Chat
  function renderAiActionCard(card) {
    if (card.type === 'compare_preview' || card.type === 'compare_table') {
      const items = card.mandis || card.rates || [];
      return `
        <div class="bg-white rounded-xl border border-stone-200 p-3 space-y-2 shadow-xs">
          <div class="text-[11px] font-extrabold text-stone-800 uppercase tracking-wider flex items-center justify-between border-b border-stone-100 pb-1.5">
            <span>${card.title || 'Mandi Comparison Matrix'}</span>
            <span class="text-[10px] text-amber-800 font-bold">Live MSP Rates</span>
          </div>
          <div class="space-y-1.5">
            ${items.map(m => `
              <div class="p-2 rounded-lg bg-stone-50 border border-stone-200/80 flex items-center justify-between text-xs">
                <div>
                  <div class="font-bold text-stone-900 flex items-center gap-1.5">
                    <span>${m.name.split('(')[0]}</span>
                    <span class="text-[9px] px-1.5 py-0.2 rounded font-bold ${m.badge === 'Recommended' ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-amber-100 text-amber-800'}">
                      ${m.badge}
                    </span>
                  </div>
                  <div class="text-[10px] text-stone-500">${m.crop || card.crop || 'Wheat'} • ${m.wait || m.dist}</div>
                </div>
                <div class="text-right">
                  <span class="font-mono font-extrabold text-stone-900 text-xs block">${m.price}</span>
                  <button onclick="appHandlers.bookViaAi('${m.mandiId}', '${card.crop || 'Wheat'}', 40)"
                    class="mt-1 px-2 py-0.5 rounded bg-gradient-to-r from-rose-700 to-amber-700 hover:from-rose-800 hover:to-amber-800 text-white font-bold text-[10px] shadow-2xs transition-colors">
                    ⚡ Book Slot
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    if (card.type === 'booking_confirmed') {
      const tok = card.token;
      return `
        <div class="bg-gradient-to-br from-rose-50 via-white to-amber-50 rounded-xl border-2 border-amber-400 p-3.5 space-y-2.5 shadow-sm text-xs">
          <div class="flex items-center justify-between border-b border-amber-200/80 pb-2">
            <div class="flex items-center gap-2">
              <span class="text-xl">🎫</span>
              <div>
                <span class="font-mono font-black text-sm text-rose-950 block">${tok.id}</span>
                <span class="text-[10px] text-amber-800 font-bold">Verified Gate Entry Token</span>
              </div>
            </div>
            <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-gradient-to-r from-rose-600 to-amber-600 text-white font-black">CONFIRMED</span>
          </div>

          <div class="grid grid-cols-2 gap-2 text-[11px]">
            <div>
              <span class="text-stone-500 block">Center:</span>
              <strong class="text-stone-900">${card.mandiName.split('(')[0]}</strong>
            </div>
            <div>
              <span class="text-stone-500 block">Quantity:</span>
              <strong class="text-stone-900">${tok.quantityQuintals} Quintals (${tok.crop})</strong>
            </div>
            <div>
              <span class="text-stone-500 block">Slot Window:</span>
              <strong class="text-stone-900">${tok.slotTime}</strong>
            </div>
            <div>
              <span class="text-stone-500 block">Assigned Gate:</span>
              <strong class="text-stone-900">${tok.assignedGate}</strong>
            </div>
          </div>

          <button onclick="appHandlers.toggleAiAgent(false); appHandlers.setTab('farmer');"
            class="w-full py-2 bg-gradient-to-r from-rose-800 to-amber-900 hover:from-rose-900 hover:to-amber-950 text-white font-bold text-xs rounded-lg shadow-xs transition-colors flex items-center justify-center gap-1.5">
            <span>👉</span>
            <span>View Active Gate Pass in Farmer Dashboard</span>
          </button>
        </div>
      `;
    }

    if (card.type === 'quick_actions') {
      return `
        <div class="flex flex-wrap gap-1.5 pt-1">
          ${card.buttons.map(b => `
            <button onclick="appHandlers.bookViaAi('${b.mandiId}', '${b.crop}', ${b.qty})"
              class="px-3 py-1.5 rounded-lg bg-gradient-to-r from-rose-700 to-amber-700 hover:from-rose-800 hover:to-amber-800 text-white font-bold text-xs shadow-2xs transition-colors">
              ${b.label}
            </button>
          `).join('')}
        </div>
      `;
    }

    return '';
  }

// Initial render when script loads
  document.addEventListener('DOMContentLoaded', render);
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    render();
  }
})();
