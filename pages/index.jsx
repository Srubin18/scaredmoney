import React, { useState, useRef, useEffect } from 'react';

const hustlesData = [
  { id: 1, name: "WhatsApp Reseller", category: "online", description: "Buy wholesale, sell via WhatsApp status", howToStart: "1. Find supplier\n2. Get product photos\n3. Post on WhatsApp status\n4. Take orders, deliver", earningsTypical: "R2,000 - R5,000/mo", earningsTop: "R10,000+/mo", capital: "R0-R500", difficulty: 1, trending: true, icon: "📱", quick: true, level: "beginner", timeToFirst: "1 week" },
  { id: 2, name: "Social Media Manager", category: "online", description: "Manage business social accounts", howToStart: "1. Learn basics on YouTube\n2. Create samples in Canva\n3. Approach local businesses\n4. Offer first month free", earningsTypical: "R1,500 - R3,000/client", earningsTop: "R5,000+/client", capital: "R0", difficulty: 2, trending: true, icon: "📲", quick: true, level: "beginner", timeToFirst: "2 weeks" },
  { id: 3, name: "TikTok Creator", category: "online", description: "Create viral content, earn from Creator Fund", howToStart: "1. Pick a niche\n2. Post 3x daily\n3. Use trending sounds\n4. Apply for Creator Fund at 10K", earningsTypical: "R500 - R5,000/mo", earningsTop: "R50,000+/mo", capital: "R0", difficulty: 2, trending: true, icon: "🎵", quick: true, level: "beginner", timeToFirst: "1 month" },
  { id: 4, name: "Online Tutor", category: "online", description: "Teach subjects via video call", howToStart: "1. List subjects you know\n2. Message parents\n3. Post on groups\n4. Start at R100/hour", earningsTypical: "R100 - R300/hr", earningsTop: "R500/hr", capital: "R0", difficulty: 2, trending: true, icon: "📚", quick: false, level: "intermediate", timeToFirst: "1 week" },
  { id: 5, name: "CV Writer", category: "online", description: "Write professional CVs", howToStart: "1. Learn CV best practices\n2. Create templates\n3. Post on Facebook groups\n4. Charge R150-500", earningsTypical: "R150 - R300/CV", earningsTop: "R500/CV", capital: "R0", difficulty: 1, trending: true, icon: "📄", quick: true, level: "beginner", timeToFirst: "3 days" },
  { id: 6, name: "Canva Designer", category: "online", description: "Create graphics & social posts", howToStart: "1. Master Canva\n2. Build portfolio\n3. Offer to businesses\n4. Package deals", earningsTypical: "R50 - R150/design", earningsTop: "R200+/design", capital: "R0", difficulty: 1, trending: true, icon: "🎨", quick: true, level: "beginner", timeToFirst: "3 days" },
  { id: 7, name: "Video Editor", category: "online", description: "Edit videos for creators", howToStart: "1. Learn CapCut\n2. Edit free videos\n3. Reach out to YouTubers\n4. Charge per video", earningsTypical: "R200 - R1,000/video", earningsTop: "R2,000+/video", capital: "R0", difficulty: 2, trending: true, icon: "🎬", quick: false, level: "intermediate", timeToFirst: "2 weeks" },
  { id: 8, name: "Virtual Assistant", category: "online", description: "Handle admin tasks remotely", howToStart: "1. List your skills\n2. Create Fiverr profile\n3. Start with low rates\n4. Specialize", earningsTypical: "R50 - R150/hr", earningsTop: "R200/hr", capital: "R0", difficulty: 2, trending: false, icon: "💼", quick: false, level: "intermediate", timeToFirst: "2 weeks" },
  { id: 9, name: "Transcription", category: "online", description: "Convert audio to text", howToStart: "1. Practice typing\n2. Sign up on Rev\n3. Pass tests\n4. Start jobs", earningsTypical: "R50 - R150/hr", earningsTop: "R200/hr", capital: "R0", difficulty: 1, trending: false, icon: "🎧", quick: false, level: "beginner", timeToFirst: "1 week" },
  { id: 10, name: "Online Surveys", category: "online", description: "Get paid for opinions", howToStart: "1. Sign up on sites\n2. Complete profiles\n3. Check daily\n4. Cash out", earningsTypical: "R200 - R500/mo", earningsTop: "R1,000/mo", capital: "R0", difficulty: 1, trending: false, icon: "📝", quick: true, level: "beginner", timeToFirst: "1 day" },
  { id: 11, name: "Mobile Car Wash", category: "services", description: "Wash cars at homes/offices", howToStart: "1. Get bucket, soap (R100)\n2. Print flyers\n3. Go door-to-door\n4. Offer packages", earningsTypical: "R80 - R150/car", earningsTop: "R250/car", capital: "R100", difficulty: 1, trending: true, icon: "🚗", quick: true, level: "beginner", timeToFirst: "1 day" },
  { id: 12, name: "Dog Walker", category: "services", description: "Walk dogs for busy owners", howToStart: "1. Create flyers\n2. Post on groups\n3. Start with 1-2 dogs\n4. Build clients", earningsTypical: "R50 - R100/walk", earningsTop: "R150/walk", capital: "R0", difficulty: 1, trending: false, icon: "🐕", quick: true, level: "beginner", timeToFirst: "2 days" },
  { id: 13, name: "Queue Stander", category: "services", description: "Stand in queues for people", howToStart: "1. Know worst queues\n2. Post on groups\n3. Charge by hour\n4. Bring chair", earningsTypical: "R100 - R200/queue", earningsTop: "R300/queue", capital: "R0", difficulty: 1, trending: true, icon: "🧍", quick: true, level: "beginner", timeToFirst: "1 day" },
  { id: 14, name: "Grocery Shopper", category: "services", description: "Shop for busy/elderly", howToStart: "1. Offer to neighbors\n2. Post on groups\n3. Charge fee\n4. Be reliable", earningsTypical: "R50 - R100/trip", earningsTop: "R150/trip", capital: "R0", difficulty: 1, trending: false, icon: "🛒", quick: true, level: "beginner", timeToFirst: "1 day" },
  { id: 15, name: "House Cleaner", category: "services", description: "Clean homes", howToStart: "1. Start with friends\n2. Get supplies\n3. Offer weekly\n4. Get referrals", earningsTypical: "R200 - R350/clean", earningsTop: "R500/clean", capital: "R0", difficulty: 1, trending: false, icon: "🧹", quick: true, level: "beginner", timeToFirst: "2 days" },
  { id: 16, name: "Garden Cleaner", category: "services", description: "Clean gardens, mow lawns", howToStart: "1. Offer to neighbors\n2. Use client tools\n3. Build regulars\n4. Buy own later", earningsTypical: "R150 - R300/garden", earningsTop: "R400/garden", capital: "R0", difficulty: 1, trending: false, icon: "🌿", quick: true, level: "beginner", timeToFirst: "2 days" },
  { id: 17, name: "Local Delivery", category: "services", description: "Deliver items locally", howToStart: "1. Sign up Mr D/Uber\n2. Or go independent\n3. Partner with shops\n4. Be fast", earningsTypical: "R30 - R70/delivery", earningsTop: "R100/delivery", capital: "R0", difficulty: 1, trending: true, icon: "🚴", quick: true, level: "beginner", timeToFirst: "1 day" },
  { id: 18, name: "Babysitter", category: "services", description: "Look after children", howToStart: "1. Get first aid cert\n2. Start with family\n3. Ask for referrals\n4. Join groups", earningsTypical: "R50 - R100/hr", earningsTop: "R150/hr", capital: "R0", difficulty: 1, trending: false, icon: "👶", quick: true, level: "beginner", timeToFirst: "3 days" },
  { id: 19, name: "Pet Sitter", category: "services", description: "Look after pets", howToStart: "1. Offer to neighbors\n2. List online\n3. Get references\n4. Home visits", earningsTypical: "R150 - R300/day", earningsTop: "R400/day", capital: "R0", difficulty: 1, trending: false, icon: "🐱", quick: true, level: "beginner", timeToFirst: "3 days" },
  { id: 20, name: "Errand Runner", category: "services", description: "Run errands for professionals", howToStart: "1. List services\n2. Target busy people\n3. Offer packages\n4. Be reliable", earningsTypical: "R50 - R150/errand", earningsTop: "R200/errand", capital: "R0", difficulty: 1, trending: false, icon: "🏃", quick: true, level: "beginner", timeToFirst: "1 day" },
  { id: 21, name: "Hair Braider", category: "skills", description: "Braid hair for clients", howToStart: "1. Perfect skills\n2. Take photos\n3. Post on Instagram\n4. Start referrals", earningsTypical: "R150 - R500/style", earningsTop: "R800/style", capital: "R0", difficulty: 2, trending: true, icon: "💇‍♀️", quick: false, level: "intermediate", timeToFirst: "1 week" },
  { id: 22, name: "Mobile Barber", category: "skills", description: "Cut hair at homes", howToStart: "1. Get clippers (R300)\n2. Practice on friends\n3. Build Instagram\n4. Home visits", earningsTypical: "R50 - R100/cut", earningsTop: "R150/cut", capital: "R300", difficulty: 2, trending: true, icon: "💈", quick: false, level: "intermediate", timeToFirst: "1 week" },
  { id: 23, name: "Makeup Artist", category: "skills", description: "Do makeup for events", howToStart: "1. Practice\n2. Build Instagram\n3. Start with dances\n4. Invest later", earningsTypical: "R200 - R800/face", earningsTop: "R1,500/face", capital: "R0", difficulty: 2, trending: true, icon: "💄", quick: false, level: "intermediate", timeToFirst: "2 weeks" },
  { id: 24, name: "Fitness Trainer", category: "skills", description: "Train clients", howToStart: "1. Get certified\n2. Park workouts\n3. Before/after photos\n4. Group sessions", earningsTypical: "R100 - R250/session", earningsTop: "R400/session", capital: "R0", difficulty: 2, trending: true, icon: "💪", quick: false, level: "intermediate", timeToFirst: "2 weeks" },
  { id: 25, name: "Tech Tutor", category: "skills", description: "Teach tech to elderly", howToStart: "1. Be patient\n2. Offer in community\n3. Cover basics\n4. Charge per session", earningsTypical: "R100 - R150/hr", earningsTop: "R200/hr", capital: "R0", difficulty: 1, trending: true, icon: "📱", quick: true, level: "beginner", timeToFirst: "3 days" },
  { id: 26, name: "Phone Photographer", category: "skills", description: "Photos with smartphone", howToStart: "1. Master phone camera\n2. Learn Lightroom\n3. Offer to businesses\n4. Build Instagram", earningsTypical: "R200 - R600/shoot", earningsTop: "R1,000/shoot", capital: "R0", difficulty: 2, trending: true, icon: "📸", quick: false, level: "intermediate", timeToFirst: "1 week" },
  { id: 27, name: "Music Teacher", category: "skills", description: "Teach instruments", howToStart: "1. Decide instrument\n2. Create lessons\n3. Offer locally\n4. Online too", earningsTypical: "R150 - R300/hr", earningsTop: "R400/hr", capital: "R0", difficulty: 2, trending: false, icon: "🎸", quick: false, level: "intermediate", timeToFirst: "1 week" },
  { id: 28, name: "Homework Helper", category: "skills", description: "Help kids with homework", howToStart: "1. Choose subjects\n2. Offer nearby\n3. Charge hourly\n4. Groups = more", earningsTypical: "R50 - R100/hr", earningsTop: "R150/hr", capital: "R0", difficulty: 1, trending: false, icon: "📚", quick: true, level: "beginner", timeToFirst: "3 days" },
  { id: 29, name: "Driving Instructor", category: "skills", description: "Teach driving", howToStart: "1. Have license\n2. Start with friends\n3. Use their car\n4. Help with K53", earningsTypical: "R150 - R250/hr", earningsTop: "R300/hr", capital: "R0", difficulty: 2, trending: false, icon: "🚙", quick: false, level: "intermediate", timeToFirst: "1 week" },
  { id: 30, name: "Dance Teacher", category: "skills", description: "Teach dance", howToStart: "1. Choose style\n2. Create routines\n3. Community centers\n4. Private = more", earningsTypical: "R100 - R200/hr", earningsTop: "R300/hr", capital: "R0", difficulty: 2, trending: false, icon: "💃", quick: false, level: "intermediate", timeToFirst: "1 week" },
  { id: 31, name: "Airtime Reseller", category: "street", description: "Sell airtime and data", howToStart: "1. Register as agent\n2. Start R500 float\n3. Sell from home\n4. 5-10% commission", earningsTypical: "R500 - R2,000/mo", earningsTop: "R3,000/mo", capital: "R500", difficulty: 1, trending: true, icon: "📶", quick: true, level: "beginner", timeToFirst: "1 day" },
  { id: 32, name: "Electricity Seller", category: "street", description: "Sell prepaid electricity", howToStart: "1. Register vendor\n2. Advertise locally\n3. Available in outages\n4. Offer delivery", earningsTypical: "R300 - R1,500/mo", earningsTop: "R2,000/mo", capital: "R500", difficulty: 1, trending: true, icon: "⚡", quick: true, level: "beginner", timeToFirst: "2 days" },
  { id: 33, name: "Thrift Flipper", category: "street", description: "Buy cheap, sell higher", howToStart: "1. Learn what sells\n2. Hunt charity shops\n3. Clean/repair\n4. Sell online", earningsTypical: "R500 - R3,000/mo", earningsTop: "R5,000/mo", capital: "R100", difficulty: 2, trending: true, icon: "👕", quick: false, level: "intermediate", timeToFirst: "1 week" },
  { id: 34, name: "Brand Ambassador", category: "street", description: "Represent brands", howToStart: "1. Join agencies\n2. Create portfolio\n3. Be outgoing\n4. Work events", earningsTypical: "R150 - R300/day", earningsTop: "R400/day", capital: "R0", difficulty: 1, trending: false, icon: "🌟", quick: true, level: "beginner", timeToFirst: "1 week" },
  { id: 35, name: "Mystery Shopper", category: "street", description: "Evaluate stores", howToStart: "1. Sign up companies\n2. Complete training\n3. Visit stores\n4. Submit reports", earningsTypical: "R100 - R200/shop", earningsTop: "R300/shop", capital: "R0", difficulty: 1, trending: false, icon: "🔍", quick: true, level: "beginner", timeToFirst: "1 week" },
  { id: 36, name: "Recycling Collector", category: "street", description: "Collect recyclables", howToStart: "1. Find depot\n2. Learn what sells\n3. Collect from neighbors\n4. Sort weekly", earningsTypical: "R50 - R150/day", earningsTop: "R200/day", capital: "R0", difficulty: 1, trending: false, icon: "♻️", quick: true, level: "beginner", timeToFirst: "1 day" },
  { id: 37, name: "Flyer Distributor", category: "street", description: "Hand out flyers", howToStart: "1. Approach businesses\n2. Offer per-flyer\n3. Be professional\n4. Track distribution", earningsTypical: "R10 - R15/hr", earningsTop: "R20/hr", capital: "R0", difficulty: 1, trending: false, icon: "📃", quick: true, level: "beginner", timeToFirst: "1 day" },
  { id: 38, name: "Market Researcher", category: "street", description: "Do surveys in public", howToStart: "1. Sign up companies\n2. Get trained\n3. Face-to-face surveys\n4. Report accurately", earningsTypical: "R200 - R300/day", earningsTop: "R400/day", capital: "R0", difficulty: 1, trending: false, icon: "📋", quick: true, level: "beginner", timeToFirst: "1 week" },
  { id: 39, name: "Product Promoter", category: "street", description: "Promote in malls", howToStart: "1. Apply agencies\n2. Get trained\n3. Be friendly\n4. Work weekends", earningsTypical: "R200 - R300/day", earningsTop: "R400/day", capital: "R0", difficulty: 1, trending: false, icon: "🏷️", quick: true, level: "beginner", timeToFirst: "1 week" },
  { id: 40, name: "Book Seller", category: "street", description: "Sell used books", howToStart: "1. Collect books\n2. Research values\n3. Sell at markets\n4. Textbooks = gold", earningsTypical: "R200 - R1,000/mo", earningsTop: "R2,000/mo", capital: "R0", difficulty: 1, trending: false, icon: "📚", quick: false, level: "beginner", timeToFirst: "1 week" },
  { id: 41, name: "SASSA Helper", category: "knowledge", description: "Help apply for grants", howToStart: "1. Learn requirements\n2. Know the process\n3. Help with forms\n4. Accompany to offices", earningsTypical: "R50 - R150/application", earningsTop: "R200/application", capital: "R0", difficulty: 1, trending: true, icon: "📝", quick: true, level: "beginner", timeToFirst: "3 days" },
  { id: 42, name: "UIF Claims Helper", category: "knowledge", description: "Help file UIF claims", howToStart: "1. Study requirements\n2. Learn online system\n3. Help with docs\n4. Charge per claim", earningsTypical: "R100 - R200/claim", earningsTop: "R300/claim", capital: "R0", difficulty: 2, trending: true, icon: "💼", quick: false, level: "intermediate", timeToFirst: "1 week" },
  { id: 43, name: "WhatsApp Business Setup", category: "knowledge", description: "Set up WA Business for shops", howToStart: "1. Master the app\n2. Create catalogs\n3. Set auto-replies\n4. Train owners", earningsTypical: "R200 - R400/setup", earningsTop: "R500/setup", capital: "R0", difficulty: 1, trending: true, icon: "💬", quick: true, level: "beginner", timeToFirst: "2 days" },
  { id: 44, name: "Google Business Setup", category: "knowledge", description: "Set up Google profiles", howToStart: "1. Learn Google Business\n2. Help get listed\n3. Optimize search\n4. Train on reviews", earningsTypical: "R200 - R400/setup", earningsTop: "R500/setup", capital: "R0", difficulty: 1, trending: true, icon: "🔍", quick: true, level: "beginner", timeToFirst: "2 days" },
  { id: 45, name: "Tax Return Helper", category: "knowledge", description: "Help with simple returns", howToStart: "1. Learn SARS eFiling\n2. Study basics\n3. Simple returns only\n4. Refer complex", earningsTypical: "R150 - R350/return", earningsTop: "R500/return", capital: "R0", difficulty: 2, trending: false, icon: "📊", quick: false, level: "intermediate", timeToFirst: "2 weeks" },
  { id: 46, name: "Bursary Helper", category: "knowledge", description: "Help find bursaries", howToStart: "1. Research bursaries\n2. Create database\n3. Help applications\n4. Charge per app", earningsTypical: "R100 - R200/application", earningsTop: "R300/application", capital: "R0", difficulty: 2, trending: true, icon: "🎓", quick: false, level: "intermediate", timeToFirst: "1 week" },
  { id: 47, name: "Load Shedding Consultant", category: "knowledge", description: "Advise on backup power", howToStart: "1. Research solutions\n2. Know costs\n3. Help businesses plan\n4. Connect suppliers", earningsTypical: "R200 - R600/consult", earningsTop: "R1,000/consult", capital: "R0", difficulty: 2, trending: true, icon: "🔌", quick: false, level: "intermediate", timeToFirst: "1 week" },
  { id: 48, name: "Tour Guide", category: "knowledge", description: "Show tourists around", howToStart: "1. Know your area\n2. List on Airbnb\n3. Create unique tours\n4. Partner with hotels", earningsTypical: "R200 - R500/tour", earningsTop: "R800/tour", capital: "R0", difficulty: 2, trending: false, icon: "🗺️", quick: false, level: "intermediate", timeToFirst: "2 weeks" },
  { id: 49, name: "Spaza Registrar", category: "knowledge", description: "Help spazas register", howToStart: "1. Learn regulations\n2. Know requirements\n3. Help paperwork\n4. Compliance support", earningsTypical: "R200 - R400/registration", earningsTop: "R500/registration", capital: "R0", difficulty: 2, trending: true, icon: "🏪", quick: false, level: "intermediate", timeToFirst: "1 week" },
  { id: 50, name: "Social Media Setup", category: "knowledge", description: "Create business pages", howToStart: "1. Know platforms\n2. Create pages\n3. Design in Canva\n4. Train owners", earningsTypical: "R150 - R300/page", earningsTop: "R400/page", capital: "R0", difficulty: 1, trending: false, icon: "📲", quick: true, level: "beginner", timeToFirst: "2 days" },
  { id: 51, name: "Stokvel Organizer", category: "community", description: "Start and manage stokvels", howToStart: "1. Gather members\n2. Set rules\n3. Track payments\n4. Small admin fee", earningsTypical: "R100 - R300/mo", earningsTop: "R500/mo", capital: "R0", difficulty: 2, trending: false, icon: "💰", quick: false, level: "intermediate", timeToFirst: "2 weeks" },
  { id: 52, name: "Event MC", category: "community", description: "Host events/weddings", howToStart: "1. Practice speaking\n2. MC free events\n3. Create demo video\n4. Network", earningsTypical: "R500 - R2,000/event", earningsTop: "R3,000/event", capital: "R0", difficulty: 2, trending: false, icon: "🎤", quick: false, level: "intermediate", timeToFirst: "2 weeks" },
  { id: 53, name: "Funeral Programs", category: "community", description: "Create funeral programs", howToStart: "1. Learn Canva\n2. Create templates\n3. Offer to homes\n4. Be sensitive", earningsTypical: "R100 - R200/program", earningsTop: "R300/program", capital: "R0", difficulty: 1, trending: false, icon: "🕊️", quick: true, level: "beginner", timeToFirst: "3 days" },
  { id: 54, name: "Tournament Organizer", category: "community", description: "Organize sports tournaments", howToStart: "1. Choose sport\n2. Find venue\n3. Collect entries\n4. Organize prizes", earningsTypical: "R500 - R3,000/event", earningsTop: "R5,000/event", capital: "R0", difficulty: 2, trending: false, icon: "🏆", quick: false, level: "intermediate", timeToFirst: "2 weeks" },
  { id: 55, name: "Lift Club Coordinator", category: "community", description: "Organize lift clubs", howToStart: "1. Identify routes\n2. Create groups\n3. Match people\n4. Coordination fee", earningsTypical: "R50 - R150/mo", earningsTop: "R200/mo", capital: "R0", difficulty: 1, trending: false, icon: "🚗", quick: true, level: "beginner", timeToFirst: "1 week" },
  { id: 56, name: "Face Painter", category: "creative", description: "Paint faces at parties", howToStart: "1. Get kit (R100)\n2. Practice designs\n3. Build portfolio\n4. Kids parties", earningsTypical: "R300 - R600/event", earningsTop: "R800/event", capital: "R100", difficulty: 2, trending: false, icon: "🎭", quick: false, level: "intermediate", timeToFirst: "1 week" },
  { id: 57, name: "Balloon Artist", category: "creative", description: "Create balloon decorations", howToStart: "1. Buy kit (R100)\n2. Learn YouTube\n3. Practice shapes\n4. Offer at parties", earningsTypical: "R200 - R400/event", earningsTop: "R600/event", capital: "R100", difficulty: 2, trending: false, icon: "🎈", quick: false, level: "intermediate", timeToFirst: "1 week" },
  { id: 58, name: "Mobile DJ", category: "creative", description: "DJ at parties", howToStart: "1. Learn DJing\n2. Free gigs first\n3. Build library\n4. Get equipment", earningsTypical: "R500 - R2,000/event", earningsTop: "R3,000/event", capital: "R0", difficulty: 2, trending: false, icon: "🎧", quick: false, level: "intermediate", timeToFirst: "2 weeks" },
  { id: 59, name: "Gift Wrapper", category: "creative", description: "Wrap gifts beautifully", howToStart: "1. Master techniques\n2. Get supplies\n3. Offer at Christmas\n4. Partner stores", earningsTypical: "R20 - R70/gift", earningsTop: "R100/gift", capital: "R100", difficulty: 1, trending: false, icon: "🎁", quick: true, level: "beginner", timeToFirst: "3 days" },
  { id: 60, name: "Calligraphy", category: "creative", description: "Hand-lettered items", howToStart: "1. Practice YouTube\n2. Get brush pens\n3. Wedding invites\n4. Build Instagram", earningsTypical: "R50 - R200/piece", earningsTop: "R300/piece", capital: "R100", difficulty: 2, trending: false, icon: "✒️", quick: false, level: "intermediate", timeToFirst: "2 weeks" },
  { id: 61, name: "Charging Station", category: "services", description: "Charge phones during outages", howToStart: "1. Have backup power\n2. Set up station\n3. Charge per phone\n4. Load shedding times", earningsTypical: "R5 - R15/phone", earningsTop: "R20/phone", capital: "R0", difficulty: 1, trending: true, icon: "🔋", quick: true, level: "beginner", timeToFirst: "1 day" },
  { id: 62, name: "Furniture Assembly", category: "services", description: "Assemble flat-pack", howToStart: "1. Practice on own\n2. Post on groups\n3. Bring tools\n4. Be patient", earningsTypical: "R100 - R300/item", earningsTop: "R400/item", capital: "R0", difficulty: 1, trending: false, icon: "🪑", quick: true, level: "beginner", timeToFirst: "3 days" },
  { id: 63, name: "Tech Setup", category: "services", description: "Set up TVs and tech", howToStart: "1. Know devices\n2. Offer to neighbors\n3. Be patient\n4. Per device", earningsTypical: "R100 - R200/setup", earningsTop: "R300/setup", capital: "R0", difficulty: 1, trending: false, icon: "📺", quick: true, level: "beginner", timeToFirst: "3 days" },
  { id: 64, name: "Braai Master", category: "services", description: "Braai for events", howToStart: "1. Perfect skills\n2. Offer for parties\n3. Charge per head\n4. Supply or cook theirs", earningsTypical: "R50 - R80/head", earningsTop: "R100/head", capital: "R0", difficulty: 1, trending: false, icon: "🔥", quick: true, level: "beginner", timeToFirst: "3 days" },
  { id: 65, name: "Affiliate Marketing", category: "online", description: "Earn commission on sales", howToStart: "1. Join Takealot affiliate\n2. Create content\n3. Share links\n4. Build audience", earningsTypical: "R500 - R5,000/mo", earningsTop: "R20,000/mo", capital: "R0", difficulty: 3, trending: true, icon: "🔗", quick: false, level: "advanced", timeToFirst: "1 month" },
  { id: 66, name: "UGC Creator", category: "online", description: "Create content for brands", howToStart: "1. Study UGC\n2. Create samples\n3. Pitch brands\n4. Build portfolio", earningsTypical: "R500 - R2,500/video", earningsTop: "R5,000/video", capital: "R0", difficulty: 2, trending: true, icon: "📦", quick: false, level: "intermediate", timeToFirst: "2 weeks" },
  { id: 67, name: "Voice Over Artist", category: "online", description: "Record voice for ads", howToStart: "1. Practice reading\n2. Record samples\n3. Create profile\n4. Get mic later", earningsTypical: "R200 - R1,000/project", earningsTop: "R2,000/project", capital: "R0", difficulty: 2, trending: false, icon: "🎙️", quick: false, level: "intermediate", timeToFirst: "2 weeks" },
  { id: 68, name: "Proofreader", category: "online", description: "Check documents for errors", howToStart: "1. Take courses\n2. Practice on texts\n3. Create profiles\n4. Specialize", earningsTypical: "R100 - R200/hr", earningsTop: "R300/hr", capital: "R0", difficulty: 2, trending: false, icon: "✅", quick: false, level: "intermediate", timeToFirst: "2 weeks" },
  { id: 69, name: "Translator", category: "online", description: "Translate documents", howToStart: "1. Identify languages\n2. Create profiles\n3. Get certified\n4. Specialize", earningsTypical: "R0.50 - R1.50/word", earningsTop: "R2/word", capital: "R0", difficulty: 2, trending: false, icon: "🌍", quick: false, level: "intermediate", timeToFirst: "2 weeks" },
  { id: 70, name: "E-book Writer", category: "online", description: "Write and sell e-books", howToStart: "1. Choose topic\n2. Write 5K-20K words\n3. Format PDF\n4. Sell on Gumroad", earningsTypical: "R50 - R300/sale", earningsTop: "R500/sale", capital: "R0", difficulty: 2, trending: false, icon: "📖", quick: false, level: "intermediate", timeToFirst: "1 month" },
];

const categories = [
  { id: "all", name: "All Hustles", icon: "🔥" },
  { id: "online", name: "Online", icon: "📱" },
  { id: "services", name: "Services", icon: "🛠️" },
  { id: "skills", name: "Skills", icon: "💡" },
  { id: "street", name: "Street Smart", icon: "🏃" },
  { id: "knowledge", name: "Knowledge", icon: "🧠" },
  { id: "community", name: "Community", icon: "🤝" },
  { id: "creative", name: "Creative", icon: "🎨" },
];

const testimonials = [
  { name: "Thabo M.", location: "Soweto", hustle: "Mobile Car Wash", quote: "Started with R100 for supplies. Now I wash 8-10 cars every weekend. Making R1,500+ extra per month.", time: "3 weeks in" },
  { name: "Lindiwe K.", location: "Durban", hustle: "WhatsApp Reseller", quote: "I sell cosmetics on my WhatsApp status. My first month I made R2,800. No shop, no rent, just my phone.", time: "1 month in" },
  { name: "Sipho N.", location: "Cape Town", hustle: "Queue Stander", quote: "People pay me to stand in Home Affairs queues. R200 per queue. Did 4 last week.", time: "2 weeks in" },
  { name: "Nomvula D.", location: "Pretoria", hustle: "CV Writer", quote: "I charge R200 per CV. Made R1,400 last week helping job seekers. All from Facebook groups.", time: "2 weeks in" },
  { name: "Kagiso T.", location: "Johannesburg", hustle: "Tech Tutor", quote: "I teach gogos how to use WhatsApp. R100 per hour. They refer their friends. Easy money.", time: "1 month in" },
];

const fastestToMoney = hustlesData.filter(h => h.timeToFirst === "1 day").slice(0, 5);
const beginnerPicks = hustlesData.filter(h => h.level === "beginner" && h.quick).slice(0, 6);
const studentHustles = hustlesData.filter(h => ["CV Writer", "Online Tutor", "Canva Designer", "Homework Helper", "Transcription", "Online Surveys"].includes(h.name));

const ChatBot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([{ type: 'bot', text: "Hey! 👋 Let's find your perfect hustle.\n\n⚠️ Note: Earnings shown are typical ranges, not guarantees. Your results depend on effort and market." }]);
  const [input, setInput] = useState('');
  const quickReplies = ["No money to start", "Work from home", "Need money NOW", "I'm a student"];
  
  const getResponse = (msg) => {
    const m = msg.toLowerCase();
    if (m.includes('no money') || m.includes('broke') || m.includes('r0')) return "💪 R0 to start - perfect!\n\nTop picks:\n• 📱 WhatsApp Reseller (R2-5K/mo typical)\n• 🧍 Queue Stander (R100-200/queue)\n• 📄 CV Writer (R150-300/CV)\n• 🚗 Car Wash (R80-150/car)\n\nAll need ZERO capital. Pick one, start today!";
    if (m.includes('home') || m.includes('online')) return "🏠 Work from home picks:\n\n• 📱 WhatsApp Reseller\n• 🎨 Canva Designer\n• 🎬 Video Editor\n• 📄 CV Writer\n\nAll you need is a phone and WiFi!";
    if (m.includes('fast') || m.includes('now') || m.includes('today') || m.includes('quick')) return "⚡ Make money TODAY:\n\n• 🚗 Car Wash (R80-150/car)\n• 🧍 Queue Standing (R100-200)\n• 🚴 Delivery (R30-70/trip)\n• 🔋 Phone Charging (load shedding)\n\nNo experience needed. Start in 1 hour!";
    if (m.includes('student')) return "🎓 Student hustles:\n\n• 📄 CV Writer (R150-300/CV)\n• 📚 Homework Helper (R50-100/hr)\n• 🎨 Canva Designer (R50-150/design)\n• 📚 Online Tutor (R100-300/hr)\n\nFlexible hours, work between classes!";
    return "🔥 Here's what's working now:\n\n• 📱 WhatsApp Reseller (R2-5K/mo)\n• 🎵 TikTok Creator (R500-5K/mo)\n• 🚗 Mobile Car Wash (R80-150/car)\n• 💇‍♀️ Hair Braider (R150-500/style)\n\nTell me more about your situation!";
  };
  
  const send = (text = input) => {
    if (!text.trim()) return;
    setMessages(p => [...p, { type: 'user', text }]);
    setInput('');
    setTimeout(() => setMessages(p => [...p, { type: 'bot', text: getResponse(text) }]), 500);
  };
  
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative w-full sm:max-w-md bg-zinc-900 sm:rounded-2xl border-t sm:border border-zinc-700 flex flex-col h-[80vh] sm:h-auto sm:max-h-[70vh]">
        <div className="p-4 border-b border-zinc-800 flex justify-between"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center">💬</div><span className="font-bold text-white">Hustle Finder</span></div><button onClick={onClose} className="text-zinc-400 text-2xl">&times;</button></div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">{messages.map((m, i) => (<div key={i} className={`flex ${m.type === 'user' ? 'justify-end' : ''}`}><div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm whitespace-pre-line ${m.type === 'user' ? 'bg-emerald-500 text-white' : 'bg-zinc-800 text-zinc-100'}`}>{m.text}</div></div>))}</div>
        <div className="p-3 border-t border-zinc-800"><div className="flex flex-wrap gap-2 mb-3">{quickReplies.map((r, i) => (<button key={i} onClick={() => send(r)} className="text-xs bg-zinc-800 text-zinc-300 px-3 py-2 rounded-full">{r}</button>))}</div><div className="flex gap-2"><input value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && send()} placeholder="Type here..." className="flex-1 bg-zinc-800 text-white rounded-full px-4 py-3 focus:outline-none" /><button onClick={() => send()} className="bg-emerald-500 text-white rounded-full w-12 h-12 flex items-center justify-center">➤</button></div></div>
      </div>
    </div>
  );
};

const HustleModal = ({ hustle, onClose }) => {
  if (!hustle) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />
      <div className="relative w-full sm:max-w-lg bg-zinc-900 sm:rounded-2xl border-t sm:border border-zinc-700 max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-zinc-900 p-4 border-b border-zinc-800 flex justify-between items-center"><div className="flex items-center gap-3"><span className="text-3xl">{hustle.icon}</span><div><h2 className="text-lg font-bold text-white">{hustle.name}</h2><span className={`text-xs px-2 py-0.5 rounded-full ${hustle.level === 'beginner' ? 'bg-green-500/20 text-green-400' : hustle.level === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>{hustle.level}</span></div></div><button onClick={onClose} className="text-zinc-400 text-2xl">&times;</button></div>
        <div className="p-5 space-y-4">
          <p className="text-zinc-300">{hustle.description}</p>
          
          <div className="bg-zinc-800 rounded-xl p-4">
            <p className="text-xs text-zinc-500 mb-2">💰 EARNINGS BREAKDOWN</p>
            <div className="space-y-2">
              <div className="flex justify-between"><span className="text-zinc-400">Typical:</span><span className="text-white font-medium">{hustle.earningsTypical}</span></div>
              <div className="flex justify-between"><span className="text-zinc-400">Top 10%:</span><span className="text-emerald-400 font-bold">{hustle.earningsTop}</span></div>
              <div className="flex justify-between"><span className="text-zinc-400">Time to first R:</span><span className="text-cyan-400">{hustle.timeToFirst}</span></div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-zinc-800 rounded-xl p-3"><p className="text-xs text-zinc-500">Capital Needed</p><p className="text-white font-medium">{hustle.capital}</p></div>
            <div className="bg-zinc-800 rounded-xl p-3"><p className="text-xs text-zinc-500">Difficulty</p><p className="text-white">{"⭐".repeat(hustle.difficulty)}</p></div>
          </div>
          
          {hustle.quick && <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-xl p-3"><p className="text-emerald-400 font-bold text-sm">⚡ QUICK START</p><p className="text-zinc-400 text-xs">You can earn your first money within {hustle.timeToFirst}</p></div>}
          
          <div><h3 className="font-bold text-white mb-2">🚀 How to Start (Step by Step)</h3><div className="bg-zinc-800 rounded-xl p-4 text-zinc-300 text-sm whitespace-pre-line">{hustle.howToStart}</div></div>
          
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3"><p className="text-yellow-500/80 text-xs">⚠️ <strong>Real Talk:</strong> These earnings are based on what others have made. Your results depend on your effort, skills, location, and how you execute. Start small, learn fast, scale up.</p></div>
          
          <button onClick={onClose} className="w-full bg-emerald-500 text-white font-bold py-4 rounded-xl">I'm Starting This! 🚀</button>
        </div>
      </div>
    </div>
  );
};

const StartHereModal = ({ isOpen, onClose, onSelectHustle }) => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({});
  
  const getRecommendations = () => {
    let filtered = [...hustlesData];
    if (answers.capital === 'zero') filtered = filtered.filter(h => h.capital === 'R0');
    if (answers.time === 'quick') filtered = filtered.filter(h => h.quick);
    if (answers.type === 'online') filtered = filtered.filter(h => h.category === 'online');
    if (answers.type === 'physical') filtered = filtered.filter(h => ['services', 'street'].includes(h.category));
    return filtered.filter(h => h.level === 'beginner').slice(0, 3);
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />
      <div className="relative w-full max-w-md bg-zinc-900 rounded-2xl border border-zinc-700 p-6">
        <button onClick={onClose} className="absolute top-4 right-4 text-zinc-400 text-2xl">&times;</button>
        
        {step === 1 && (
          <div className="text-center">
            <span className="text-5xl mb-4 block">💰</span>
            <h2 className="text-xl font-bold text-white mb-2">How much can you invest to start?</h2>
            <p className="text-zinc-400 text-sm mb-6">Be honest - many hustles need R0!</p>
            <div className="space-y-3">
              <button onClick={() => { setAnswers({...answers, capital: 'zero'}); setStep(2); }} className="w-full bg-zinc-800 hover:bg-zinc-700 text-white py-4 rounded-xl text-left px-4">🆓 R0 - I have no money to invest</button>
              <button onClick={() => { setAnswers({...answers, capital: 'small'}); setStep(2); }} className="w-full bg-zinc-800 hover:bg-zinc-700 text-white py-4 rounded-xl text-left px-4">💵 R100-R500 - I can invest a little</button>
              <button onClick={() => { setAnswers({...answers, capital: 'more'}); setStep(2); }} className="w-full bg-zinc-800 hover:bg-zinc-700 text-white py-4 rounded-xl text-left px-4">💰 R500+ - I have some savings</button>
            </div>
          </div>
        )}
        
        {step === 2 && (
          <div className="text-center">
            <span className="text-5xl mb-4 block">⏰</span>
            <h2 className="text-xl font-bold text-white mb-2">How fast do you need money?</h2>
            <p className="text-zinc-400 text-sm mb-6">This affects which hustles fit best</p>
            <div className="space-y-3">
              <button onClick={() => { setAnswers({...answers, time: 'quick'}); setStep(3); }} className="w-full bg-zinc-800 hover:bg-zinc-700 text-white py-4 rounded-xl text-left px-4">⚡ ASAP - I need money this week</button>
              <button onClick={() => { setAnswers({...answers, time: 'medium'}); setStep(3); }} className="w-full bg-zinc-800 hover:bg-zinc-700 text-white py-4 rounded-xl text-left px-4">📅 Soon - Within 2-4 weeks is fine</button>
              <button onClick={() => { setAnswers({...answers, time: 'long'}); setStep(3); }} className="w-full bg-zinc-800 hover:bg-zinc-700 text-white py-4 rounded-xl text-left px-4">🎯 Building - I'm thinking long-term</button>
            </div>
          </div>
        )}
        
        {step === 3 && (
          <div className="text-center">
            <span className="text-5xl mb-4 block">🏠</span>
            <h2 className="text-xl font-bold text-white mb-2">Where do you want to work?</h2>
            <p className="text-zinc-400 text-sm mb-6">Both are valid - pick what suits you</p>
            <div className="space-y-3">
              <button onClick={() => { setAnswers({...answers, type: 'online'}); setStep(4); }} className="w-full bg-zinc-800 hover:bg-zinc-700 text-white py-4 rounded-xl text-left px-4">📱 Online - From my phone/laptop</button>
              <button onClick={() => { setAnswers({...answers, type: 'physical'}); setStep(4); }} className="w-full bg-zinc-800 hover:bg-zinc-700 text-white py-4 rounded-xl text-left px-4">🚶 In Person - Out in the community</button>
              <button onClick={() => { setAnswers({...answers, type: 'both'}); setStep(4); }} className="w-full bg-zinc-800 hover:bg-zinc-700 text-white py-4 rounded-xl text-left px-4">🔄 Both - I'm flexible</button>
            </div>
          </div>
        )}
        
        {step === 4 && (
          <div>
            <div className="text-center mb-6">
              <span className="text-5xl mb-4 block">🎯</span>
              <h2 className="text-xl font-bold text-white mb-2">Your Top 3 Matches</h2>
              <p className="text-zinc-400 text-sm">Based on your answers, start with one of these:</p>
            </div>
            <div className="space-y-3">
              {getRecommendations().map((h, i) => (
                <button key={h.id} onClick={() => { onClose(); onSelectHustle(h); }} className="w-full bg-zinc-800 hover:bg-zinc-700 text-white py-4 rounded-xl text-left px-4 flex items-center gap-4">
                  <span className="text-2xl">{h.icon}</span>
                  <div className="flex-1">
                    <p className="font-bold">{i + 1}. {h.name}</p>
                    <p className="text-emerald-400 text-sm">{h.earningsTypical}</p>
                  </div>
                  <span className="text-zinc-500">→</span>
                </button>
              ))}
            </div>
            <button onClick={() => setStep(1)} className="w-full text-zinc-400 text-sm mt-4">← Start over</button>
          </div>
        )}
        
        {step < 4 && (
          <div className="flex justify-center gap-2 mt-6">
            {[1,2,3,4].map(s => (<div key={s} className={`w-2 h-2 rounded-full ${step >= s ? 'bg-emerald-500' : 'bg-zinc-700'}`} />))}
          </div>
        )}
      </div>
    </div>
  );
};

export default function ScaredMoney() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [selected, setSelected] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [startHereOpen, setStartHereOpen] = useState(false);
  
  const filtered = hustlesData.filter(h => {
    const matchSearch = h.name.toLowerCase().includes(search.toLowerCase()) || h.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'all' || h.category === category;
    return matchSearch && matchCat;
  });
  
  const trending = hustlesData.filter(h => h.trending).slice(0, 6);
  
  return (
    <div className="min-h-screen bg-black text-white">
      {/* HERO */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-black to-cyan-900/20" />
        <div className="relative max-w-6xl mx-auto px-4 py-12 sm:py-16 text-center">
          <h1 className="text-4xl sm:text-6xl font-black mb-4 bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">SCARED MONEY<br/>DON'T MAKE MONEY</h1>
          <p className="text-lg text-zinc-400 mb-2">70 proven ways to earn in South Africa. Zero excuses.</p>
          <p className="text-emerald-400 font-medium mb-8">This is about action, not gambling. Real hustles, real money.</p>
          
          {/* PRIMARY CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button onClick={() => setStartHereOpen(true)} className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold px-8 py-4 rounded-full text-lg">🎯 Find My Perfect Hustle</button>
            <button onClick={() => setChatOpen(true)} className="bg-zinc-800 border border-zinc-700 text-white font-bold px-8 py-4 rounded-full">💬 Chat with Hustle Finder</button>
          </div>
          
          {/* TRUST BAR */}
          <div className="flex flex-wrap justify-center gap-4 text-sm text-zinc-400">
            <span>✓ 70 hustles</span>
            <span>✓ Most need R0</span>
            <span>✓ Made for SA</span>
            <span>✓ Start today</span>
          </div>
        </div>
      </header>
      
      {/* PROGRESS PATH */}
      <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border-y border-zinc-800 py-6">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-center text-zinc-400 text-sm mb-4">YOUR PATH TO FIRST INCOME</p>
          <div className="flex justify-between items-center">
            <div className="text-center flex-1"><div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-2 text-lg">1</div><p className="text-xs text-zinc-400">Pick a Hustle</p></div>
            <div className="h-0.5 bg-zinc-700 flex-1" />
            <div className="text-center flex-1"><div className="w-10 h-10 bg-zinc-700 rounded-full flex items-center justify-center mx-auto mb-2 text-lg">2</div><p className="text-xs text-zinc-400">Do First Task</p></div>
            <div className="h-0.5 bg-zinc-700 flex-1" />
            <div className="text-center flex-1"><div className="w-10 h-10 bg-zinc-700 rounded-full flex items-center justify-center mx-auto mb-2 text-lg">3</div><p className="text-xs text-zinc-400">Earn First R100</p></div>
            <div className="h-0.5 bg-zinc-700 flex-1" />
            <div className="text-center flex-1"><div className="w-10 h-10 bg-zinc-700 rounded-full flex items-center justify-center mx-auto mb-2 text-lg">4</div><p className="text-xs text-zinc-400">Scale Up</p></div>
          </div>
        </div>
      </div>
      
      {/* FASTEST TO MONEY */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">⚡ Fastest to First Rand (Start Today)</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {fastestToMoney.map(h => (
            <button key={h.id} onClick={() => setSelected(h)} className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30 rounded-xl p-4 text-left hover:border-emerald-500/50">
              <span className="text-2xl mb-2 block">{h.icon}</span>
              <p className="font-bold text-white text-sm">{h.name}</p>
              <p className="text-emerald-400 text-xs">{h.earningsTypical}</p>
              <p className="text-cyan-400 text-xs mt-1">💨 Money in 1 day</p>
            </button>
          ))}
        </div>
      </section>
      
      {/* TESTIMONIALS */}
      <section className="bg-zinc-900/50 py-10">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-xl font-bold mb-6 text-center">💬 Real People, Real Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {testimonials.slice(0, 3).map((t, i) => (
              <div key={i} className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center text-lg">{t.name[0]}</div>
                  <div>
                    <p className="font-bold text-white text-sm">{t.name}</p>
                    <p className="text-zinc-500 text-xs">{t.location} • {t.hustle}</p>
                  </div>
                </div>
                <p className="text-zinc-300 text-sm italic">"{t.quote}"</p>
                <p className="text-emerald-400 text-xs mt-2">{t.time}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-zinc-500 text-xs mt-4">* Results vary based on effort, skills, and market conditions</p>
        </div>
      </section>
      
      {/* HOT RIGHT NOW */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-xl font-bold mb-6">🔥 Hot Right Now</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {trending.map(h => (
            <button key={h.id} onClick={() => setSelected(h)} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-left hover:border-emerald-500/50">
              <span className="text-2xl mb-2 block">{h.icon}</span>
              <p className="font-bold text-white text-sm truncate">{h.name}</p>
              <p className="text-zinc-500 text-xs">Typical: {h.earningsTypical.split(' - ')[0]}</p>
              <p className="text-emerald-400 text-xs">Top: {h.earningsTop}</p>
            </button>
          ))}
        </div>
      </section>
      
      {/* SEARCH & FILTER */}
      <section className="max-w-6xl mx-auto px-4 pb-4">
        <div className="relative mb-4"><span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">🔍</span><input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search hustles..." className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-emerald-500" /></div>
        <div className="flex gap-2 overflow-x-auto pb-4">{categories.map(c => (<button key={c.id} onClick={() => setCategory(c.id)} className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap ${category === c.id ? 'bg-emerald-500 text-white' : 'bg-zinc-900 text-zinc-400'}`}><span>{c.icon}</span><span className="text-sm">{c.name}</span></button>))}</div>
      </section>
      
      {/* ALL HUSTLES */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <p className="text-zinc-500 text-sm mb-4">{filtered.length} hustles • Sorted by beginner-friendly</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(h => (
            <button key={h.id} onClick={() => setSelected(h)} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 text-left hover:border-emerald-500/50">
              <div className="flex justify-between items-start mb-3">
                <span className="text-3xl">{h.icon}</span>
                <div className="flex gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${h.level === 'beginner' ? 'bg-green-500/20 text-green-400' : h.level === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>{h.level}</span>
                  {h.quick && <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-1 rounded-full">⚡</span>}
                  {h.trending && <span className="bg-red-500/20 text-red-400 text-xs px-2 py-1 rounded-full">🔥</span>}
                </div>
              </div>
              <h3 className="font-bold text-white text-lg mb-1">{h.name}</h3>
              <p className="text-zinc-500 text-sm mb-3">{h.description}</p>
              <div className="space-y-1">
                <div className="flex justify-between text-sm"><span className="text-zinc-400">Typical:</span><span className="text-white">{h.earningsTypical}</span></div>
                <div className="flex justify-between text-sm"><span className="text-zinc-400">Top 10%:</span><span className="text-emerald-400 font-medium">{h.earningsTop}</span></div>
              </div>
              <div className="flex justify-between items-center mt-3 pt-3 border-t border-zinc-800">
                <span className="text-zinc-600 text-xs">Capital: {h.capital}</span>
                <span className="text-cyan-400 text-xs">⏱ {h.timeToFirst}</span>
              </div>
            </button>
          ))}
        </div>
      </section>
      
      {/* FINAL CTA */}
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl p-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-black mb-4">Still Not Sure Where to Start?</h2>
          <p className="text-black/80 mb-6 max-w-xl mx-auto">Take our 30-second quiz and we'll match you with the perfect hustle for your situation.</p>
          <button onClick={() => setStartHereOpen(true)} className="bg-black text-white font-bold px-8 py-4 rounded-full">🎯 Find My Perfect Hustle</button>
        </div>
      </section>
      
      {/* FOOTER */}
      <footer className="border-t border-zinc-800 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-xl font-bold text-emerald-400 mb-2">SCARED MONEY</p>
          <p className="text-zinc-500 text-sm mb-4">Scared money don't make money 💰</p>
          <div className="flex justify-center gap-6 mb-4 text-sm"><a href="/privacy" className="text-zinc-500 hover:text-emerald-400">Privacy</a><a href="/terms" className="text-zinc-500 hover:text-emerald-400">Terms</a></div>
          <div className="bg-zinc-900 rounded-xl p-4 max-w-2xl mx-auto mb-4"><p className="text-zinc-500 text-xs"><strong>DISCLAIMER:</strong> Information is for educational purposes only. Earnings shown are typical ranges based on research and user reports - they are NOT guaranteed. Your actual results depend on your effort, skills, location, and market conditions. This is not financial advice. Always do your own research.</p></div>
          <p className="text-zinc-600 text-xs">© 2024 ScaredMoney 🇿🇦</p>
        </div>
      </footer>
      
      {/* FLOATING CHAT */}
      <button onClick={() => setChatOpen(true)} className="fixed bottom-6 right-6 w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-2xl shadow-lg z-40 hover:bg-emerald-600">💬</button>
      
      {/* MODALS */}
      <ChatBot isOpen={chatOpen} onClose={() => setChatOpen(false)} />
      <HustleModal hustle={selected} onClose={() => setSelected(null)} />
      <StartHereModal isOpen={startHereOpen} onClose={() => setStartHereOpen(false)} onSelectHustle={setSelected} />
      
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');
        body { font-family: 'Space Grotesk', sans-serif; }
      `}</style>
    </div>
  );
}
