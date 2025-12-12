import React, { useState, useRef, useEffect } from 'react';

const hustlesData = [
  { id: 1, name: "WhatsApp Reseller", category: "online", description: "Buy wholesale, sell via WhatsApp status", howToStart: "1. Find supplier\n2. Get product photos\n3. Post on WhatsApp status\n4. Take orders, deliver", earnings: "R2,000 - R10,000/mo", capital: "R0-R500", difficulty: 1, trending: true, icon: "📱", quick: true },
  { id: 2, name: "Social Media Manager", category: "online", description: "Manage business social accounts", howToStart: "1. Learn basics on YouTube\n2. Create samples in Canva\n3. Approach local businesses\n4. Offer first month free", earnings: "R1,500 - R5,000/client", capital: "R0", difficulty: 2, trending: true, icon: "📲", quick: true },
  { id: 3, name: "TikTok Creator", category: "online", description: "Create viral content, earn from Creator Fund", howToStart: "1. Pick a niche\n2. Post 3x daily\n3. Use trending sounds\n4. Apply for Creator Fund at 10K", earnings: "R500 - R50,000/mo", capital: "R0", difficulty: 2, trending: true, icon: "🎵", quick: true },
  { id: 4, name: "Online Tutor", category: "online", description: "Teach subjects via video call", howToStart: "1. List subjects you know\n2. Message parents\n3. Post on groups\n4. Start at R100/hour", earnings: "R100 - R500/hr", capital: "R0", difficulty: 2, trending: true, icon: "📚", quick: false },
  { id: 5, name: "CV Writer", category: "online", description: "Write professional CVs", howToStart: "1. Learn CV best practices\n2. Create templates\n3. Post on Facebook groups\n4. Charge R150-500", earnings: "R150 - R500/CV", capital: "R0", difficulty: 1, trending: true, icon: "📄", quick: true },
  { id: 6, name: "Canva Designer", category: "online", description: "Create graphics & social posts", howToStart: "1. Master Canva\n2. Build portfolio\n3. Offer to businesses\n4. Package deals", earnings: "R50 - R200/design", capital: "R0", difficulty: 1, trending: true, icon: "🎨", quick: true },
  { id: 7, name: "Video Editor", category: "online", description: "Edit videos for creators", howToStart: "1. Learn CapCut\n2. Edit free videos\n3. Reach out to YouTubers\n4. Charge per video", earnings: "R200 - R2,000/video", capital: "R0", difficulty: 2, trending: true, icon: "🎬", quick: false },
  { id: 8, name: "Virtual Assistant", category: "online", description: "Handle admin tasks remotely", howToStart: "1. List your skills\n2. Create Fiverr profile\n3. Start with low rates\n4. Specialize", earnings: "R50 - R200/hr", capital: "R0", difficulty: 2, trending: false, icon: "💼", quick: false },
  { id: 9, name: "Transcription", category: "online", description: "Convert audio to text", howToStart: "1. Practice typing\n2. Sign up on Rev\n3. Pass tests\n4. Start jobs", earnings: "R50 - R200/hr", capital: "R0", difficulty: 1, trending: false, icon: "🎧", quick: false },
  { id: 10, name: "Online Surveys", category: "online", description: "Get paid for opinions", howToStart: "1. Sign up on sites\n2. Complete profiles\n3. Check daily\n4. Cash out", earnings: "R200 - R1,000/mo", capital: "R0", difficulty: 1, trending: false, icon: "📝", quick: true },
  { id: 11, name: "Mobile Car Wash", category: "services", description: "Wash cars at homes/offices", howToStart: "1. Get bucket, soap (R100)\n2. Print flyers\n3. Go door-to-door\n4. Offer packages", earnings: "R80 - R250/car", capital: "R100", difficulty: 1, trending: true, icon: "🚗", quick: true },
  { id: 12, name: "Dog Walker", category: "services", description: "Walk dogs for busy owners", howToStart: "1. Create flyers\n2. Post on groups\n3. Start with 1-2 dogs\n4. Build clients", earnings: "R50 - R150/walk", capital: "R0", difficulty: 1, trending: false, icon: "🐕", quick: true },
  { id: 13, name: "Queue Stander", category: "services", description: "Stand in queues for people", howToStart: "1. Know worst queues\n2. Post on groups\n3. Charge by hour\n4. Bring chair", earnings: "R100 - R300/queue", capital: "R0", difficulty: 1, trending: true, icon: "🧍", quick: true },
  { id: 14, name: "Grocery Shopper", category: "services", description: "Shop for busy/elderly", howToStart: "1. Offer to neighbors\n2. Post on groups\n3. Charge fee\n4. Be reliable", earnings: "R50 - R150/trip", capital: "R0", difficulty: 1, trending: false, icon: "🛒", quick: true },
  { id: 15, name: "House Cleaner", category: "services", description: "Clean homes", howToStart: "1. Start with friends\n2. Get supplies\n3. Offer weekly\n4. Get referrals", earnings: "R200 - R500/clean", capital: "R0", difficulty: 1, trending: false, icon: "🧹", quick: true },
  { id: 16, name: "Garden Cleaner", category: "services", description: "Clean gardens, mow lawns", howToStart: "1. Offer to neighbors\n2. Use client tools\n3. Build regulars\n4. Buy own later", earnings: "R150 - R400/garden", capital: "R0", difficulty: 1, trending: false, icon: "🌿", quick: true },
  { id: 17, name: "Local Delivery", category: "services", description: "Deliver items locally", howToStart: "1. Sign up Mr D/Uber\n2. Or go independent\n3. Partner with shops\n4. Be fast", earnings: "R30 - R100/delivery", capital: "R0", difficulty: 1, trending: true, icon: "🚴", quick: true },
  { id: 18, name: "Babysitter", category: "services", description: "Look after children", howToStart: "1. Get first aid cert\n2. Start with family\n3. Ask for referrals\n4. Join groups", earnings: "R50 - R150/hr", capital: "R0", difficulty: 1, trending: false, icon: "👶", quick: true },
  { id: 19, name: "Pet Sitter", category: "services", description: "Look after pets", howToStart: "1. Offer to neighbors\n2. List online\n3. Get references\n4. Home visits", earnings: "R150 - R400/day", capital: "R0", difficulty: 1, trending: false, icon: "🐱", quick: true },
  { id: 20, name: "Errand Runner", category: "services", description: "Run errands for professionals", howToStart: "1. List services\n2. Target busy people\n3. Offer packages\n4. Be reliable", earnings: "R50 - R200/errand", capital: "R0", difficulty: 1, trending: false, icon: "🏃", quick: true },
  { id: 21, name: "Hair Braider", category: "skills", description: "Braid hair for clients", howToStart: "1. Perfect skills\n2. Take photos\n3. Post on Instagram\n4. Start referrals", earnings: "R150 - R800/style", capital: "R0", difficulty: 2, trending: true, icon: "💇‍♀️", quick: false },
  { id: 22, name: "Mobile Barber", category: "skills", description: "Cut hair at homes", howToStart: "1. Get clippers (R300)\n2. Practice on friends\n3. Build Instagram\n4. Home visits", earnings: "R50 - R150/cut", capital: "R300", difficulty: 2, trending: true, icon: "💈", quick: false },
  { id: 23, name: "Makeup Artist", category: "skills", description: "Do makeup for events", howToStart: "1. Practice\n2. Build Instagram\n3. Start with dances\n4. Invest later", earnings: "R200 - R1,500/face", capital: "R0", difficulty: 2, trending: true, icon: "💄", quick: false },
  { id: 24, name: "Fitness Trainer", category: "skills", description: "Train clients", howToStart: "1. Get certified\n2. Park workouts\n3. Before/after photos\n4. Group sessions", earnings: "R100 - R400/session", capital: "R0", difficulty: 2, trending: true, icon: "💪", quick: false },
  { id: 25, name: "Tech Tutor", category: "skills", description: "Teach tech to elderly", howToStart: "1. Be patient\n2. Offer in community\n3. Cover basics\n4. Charge per session", earnings: "R100 - R200/hr", capital: "R0", difficulty: 1, trending: true, icon: "📱", quick: true },
  { id: 26, name: "Phone Photographer", category: "skills", description: "Photos with smartphone", howToStart: "1. Master phone camera\n2. Learn Lightroom\n3. Offer to businesses\n4. Build Instagram", earnings: "R200 - R1,000/shoot", capital: "R0", difficulty: 2, trending: true, icon: "📸", quick: false },
  { id: 27, name: "Music Teacher", category: "skills", description: "Teach instruments", howToStart: "1. Decide instrument\n2. Create lessons\n3. Offer locally\n4. Online too", earnings: "R150 - R400/hr", capital: "R0", difficulty: 2, trending: false, icon: "🎸", quick: false },
  { id: 28, name: "Homework Helper", category: "skills", description: "Help kids with homework", howToStart: "1. Choose subjects\n2. Offer nearby\n3. Charge hourly\n4. Groups = more", earnings: "R50 - R150/hr", capital: "R0", difficulty: 1, trending: false, icon: "📚", quick: true },
  { id: 29, name: "Driving Instructor", category: "skills", description: "Teach driving", howToStart: "1. Have license\n2. Start with friends\n3. Use their car\n4. Help with K53", earnings: "R150 - R300/hr", capital: "R0", difficulty: 2, trending: false, icon: "🚙", quick: false },
  { id: 30, name: "Dance Teacher", category: "skills", description: "Teach dance", howToStart: "1. Choose style\n2. Create routines\n3. Community centers\n4. Private = more", earnings: "R100 - R300/hr", capital: "R0", difficulty: 2, trending: false, icon: "💃", quick: false },
  { id: 31, name: "Airtime Reseller", category: "street", description: "Sell airtime and data", howToStart: "1. Register as agent\n2. Start R500 float\n3. Sell from home\n4. 5-10% commission", earnings: "R500 - R3,000/mo", capital: "R500", difficulty: 1, trending: true, icon: "📶", quick: true },
  { id: 32, name: "Electricity Seller", category: "street", description: "Sell prepaid electricity", howToStart: "1. Register vendor\n2. Advertise locally\n3. Available in outages\n4. Offer delivery", earnings: "R300 - R2,000/mo", capital: "R500", difficulty: 1, trending: true, icon: "⚡", quick: true },
  { id: 33, name: "Thrift Flipper", category: "street", description: "Buy cheap, sell higher", howToStart: "1. Learn what sells\n2. Hunt charity shops\n3. Clean/repair\n4. Sell online", earnings: "R500 - R5,000/mo", capital: "R100", difficulty: 2, trending: true, icon: "👕", quick: false },
  { id: 34, name: "Brand Ambassador", category: "street", description: "Represent brands", howToStart: "1. Join agencies\n2. Create portfolio\n3. Be outgoing\n4. Work events", earnings: "R150 - R400/day", capital: "R0", difficulty: 1, trending: false, icon: "🌟", quick: true },
  { id: 35, name: "Mystery Shopper", category: "street", description: "Evaluate stores", howToStart: "1. Sign up companies\n2. Complete training\n3. Visit stores\n4. Submit reports", earnings: "R100 - R300/shop", capital: "R0", difficulty: 1, trending: false, icon: "🔍", quick: true },
  { id: 36, name: "Recycling Collector", category: "street", description: "Collect recyclables", howToStart: "1. Find depot\n2. Learn what sells\n3. Collect from neighbors\n4. Sort weekly", earnings: "R50 - R200/day", capital: "R0", difficulty: 1, trending: false, icon: "♻️", quick: true },
  { id: 37, name: "Flyer Distributor", category: "street", description: "Hand out flyers", howToStart: "1. Approach businesses\n2. Offer per-flyer\n3. Be professional\n4. Track distribution", earnings: "R10 - R20/hr", capital: "R0", difficulty: 1, trending: false, icon: "📃", quick: true },
  { id: 38, name: "Market Researcher", category: "street", description: "Do surveys in public", howToStart: "1. Sign up companies\n2. Get trained\n3. Face-to-face surveys\n4. Report accurately", earnings: "R200 - R400/day", capital: "R0", difficulty: 1, trending: false, icon: "📋", quick: true },
  { id: 39, name: "Product Promoter", category: "street", description: "Promote in malls", howToStart: "1. Apply agencies\n2. Get trained\n3. Be friendly\n4. Work weekends", earnings: "R200 - R400/day", capital: "R0", difficulty: 1, trending: false, icon: "🏷️", quick: true },
  { id: 40, name: "Book Seller", category: "street", description: "Sell used books", howToStart: "1. Collect books\n2. Research values\n3. Sell at markets\n4. Textbooks = gold", earnings: "R200 - R2,000/mo", capital: "R0", difficulty: 1, trending: false, icon: "📚", quick: false },
  { id: 41, name: "SASSA Helper", category: "knowledge", description: "Help apply for grants", howToStart: "1. Learn requirements\n2. Know the process\n3. Help with forms\n4. Accompany to offices", earnings: "R50 - R200/application", capital: "R0", difficulty: 1, trending: true, icon: "📝", quick: true },
  { id: 42, name: "UIF Claims Helper", category: "knowledge", description: "Help file UIF claims", howToStart: "1. Study requirements\n2. Learn online system\n3. Help with docs\n4. Charge per claim", earnings: "R100 - R300/claim", capital: "R0", difficulty: 2, trending: true, icon: "💼", quick: false },
  { id: 43, name: "WhatsApp Business Setup", category: "knowledge", description: "Set up WA Business for shops", howToStart: "1. Master the app\n2. Create catalogs\n3. Set auto-replies\n4. Train owners", earnings: "R200 - R500/setup", capital: "R0", difficulty: 1, trending: true, icon: "💬", quick: true },
  { id: 44, name: "Google Business Setup", category: "knowledge", description: "Set up Google profiles", howToStart: "1. Learn Google Business\n2. Help get listed\n3. Optimize search\n4. Train on reviews", earnings: "R200 - R500/setup", capital: "R0", difficulty: 1, trending: true, icon: "🔍", quick: true },
  { id: 45, name: "Tax Return Helper", category: "knowledge", description: "Help with simple returns", howToStart: "1. Learn SARS eFiling\n2. Study basics\n3. Simple returns only\n4. Refer complex", earnings: "R150 - R500/return", capital: "R0", difficulty: 2, trending: false, icon: "📊", quick: false },
  { id: 46, name: "Bursary Helper", category: "knowledge", description: "Help find bursaries", howToStart: "1. Research bursaries\n2. Create database\n3. Help applications\n4. Charge per app", earnings: "R100 - R300/application", capital: "R0", difficulty: 2, trending: true, icon: "🎓", quick: false },
  { id: 47, name: "Load Shedding Consultant", category: "knowledge", description: "Advise on backup power", howToStart: "1. Research solutions\n2. Know costs\n3. Help businesses plan\n4. Connect suppliers", earnings: "R200 - R1,000/consult", capital: "R0", difficulty: 2, trending: true, icon: "🔌", quick: false },
  { id: 48, name: "Tour Guide", category: "knowledge", description: "Show tourists around", howToStart: "1. Know your area\n2. List on Airbnb\n3. Create unique tours\n4. Partner with hotels", earnings: "R200 - R800/tour", capital: "R0", difficulty: 2, trending: false, icon: "🗺️", quick: false },
  { id: 49, name: "Spaza Registrar", category: "knowledge", description: "Help spazas register", howToStart: "1. Learn regulations\n2. Know requirements\n3. Help paperwork\n4. Compliance support", earnings: "R200 - R500/registration", capital: "R0", difficulty: 2, trending: true, icon: "🏪", quick: false },
  { id: 50, name: "Social Media Setup", category: "knowledge", description: "Create business pages", howToStart: "1. Know platforms\n2. Create pages\n3. Design in Canva\n4. Train owners", earnings: "R150 - R400/page", capital: "R0", difficulty: 1, trending: false, icon: "📲", quick: true },
  { id: 51, name: "Stokvel Organizer", category: "community", description: "Start and manage stokvels", howToStart: "1. Gather members\n2. Set rules\n3. Track payments\n4. Small admin fee", earnings: "R100 - R500/mo", capital: "R0", difficulty: 2, trending: false, icon: "💰", quick: false },
  { id: 52, name: "Event MC", category: "community", description: "Host events/weddings", howToStart: "1. Practice speaking\n2. MC free events\n3. Create demo video\n4. Network", earnings: "R500 - R3,000/event", capital: "R0", difficulty: 2, trending: false, icon: "🎤", quick: false },
  { id: 53, name: "Funeral Programs", category: "community", description: "Create funeral programs", howToStart: "1. Learn Canva\n2. Create templates\n3. Offer to homes\n4. Be sensitive", earnings: "R100 - R300/program", capital: "R0", difficulty: 1, trending: false, icon: "🕊️", quick: true },
  { id: 54, name: "Tournament Organizer", category: "community", description: "Organize sports tournaments", howToStart: "1. Choose sport\n2. Find venue\n3. Collect entries\n4. Organize prizes", earnings: "R500 - R5,000/event", capital: "R0", difficulty: 2, trending: false, icon: "🏆", quick: false },
  { id: 55, name: "Lift Club Coordinator", category: "community", description: "Organize lift clubs", howToStart: "1. Identify routes\n2. Create groups\n3. Match people\n4. Coordination fee", earnings: "R50 - R200/mo", capital: "R0", difficulty: 1, trending: false, icon: "🚗", quick: true },
  { id: 56, name: "Face Painter", category: "creative", description: "Paint faces at parties", howToStart: "1. Get kit (R100)\n2. Practice designs\n3. Build portfolio\n4. Kids parties", earnings: "R300 - R800/event", capital: "R100", difficulty: 2, trending: false, icon: "🎭", quick: false },
  { id: 57, name: "Balloon Artist", category: "creative", description: "Create balloon decorations", howToStart: "1. Buy kit (R100)\n2. Learn YouTube\n3. Practice shapes\n4. Offer at parties", earnings: "R200 - R600/event", capital: "R100", difficulty: 2, trending: false, icon: "🎈", quick: false },
  { id: 58, name: "Mobile DJ", category: "creative", description: "DJ at parties", howToStart: "1. Learn DJing\n2. Free gigs first\n3. Build library\n4. Get equipment", earnings: "R500 - R3,000/event", capital: "R0", difficulty: 2, trending: false, icon: "🎧", quick: false },
  { id: 59, name: "Gift Wrapper", category: "creative", description: "Wrap gifts beautifully", howToStart: "1. Master techniques\n2. Get supplies\n3. Offer at Christmas\n4. Partner stores", earnings: "R20 - R100/gift", capital: "R100", difficulty: 1, trending: false, icon: "🎁", quick: true },
  { id: 60, name: "Calligraphy", category: "creative", description: "Hand-lettered items", howToStart: "1. Practice YouTube\n2. Get brush pens\n3. Wedding invites\n4. Build Instagram", earnings: "R50 - R300/piece", capital: "R100", difficulty: 2, trending: false, icon: "✒️", quick: false },
  { id: 61, name: "Charging Station", category: "services", description: "Charge phones during outages", howToStart: "1. Have backup power\n2. Set up station\n3. Charge per phone\n4. Load shedding times", earnings: "R5 - R20/phone", capital: "R0", difficulty: 1, trending: true, icon: "🔋", quick: true },
  { id: 62, name: "Furniture Assembly", category: "services", description: "Assemble flat-pack", howToStart: "1. Practice on own\n2. Post on groups\n3. Bring tools\n4. Be patient", earnings: "R100 - R400/item", capital: "R0", difficulty: 1, trending: false, icon: "🪑", quick: true },
  { id: 63, name: "Tech Setup", category: "services", description: "Set up TVs and tech", howToStart: "1. Know devices\n2. Offer to neighbors\n3. Be patient\n4. Per device", earnings: "R100 - R300/setup", capital: "R0", difficulty: 1, trending: false, icon: "📺", quick: true },
  { id: 64, name: "Braai Master", category: "services", description: "Braai for events", howToStart: "1. Perfect skills\n2. Offer for parties\n3. Charge per head\n4. Supply or cook theirs", earnings: "R50 - R100/head", capital: "R0", difficulty: 1, trending: false, icon: "🔥", quick: true },
  { id: 65, name: "Affiliate Marketing", category: "online", description: "Earn commission on sales", howToStart: "1. Join Takealot affiliate\n2. Create content\n3. Share links\n4. Build audience", earnings: "R500 - R20,000/mo", capital: "R0", difficulty: 3, trending: true, icon: "🔗", quick: false },
  { id: 66, name: "UGC Creator", category: "online", description: "Create content for brands", howToStart: "1. Study UGC\n2. Create samples\n3. Pitch brands\n4. Build portfolio", earnings: "R500 - R5,000/video", capital: "R0", difficulty: 2, trending: true, icon: "📦", quick: false },
  { id: 67, name: "Voice Over Artist", category: "online", description: "Record voice for ads", howToStart: "1. Practice reading\n2. Record samples\n3. Create profile\n4. Get mic later", earnings: "R200 - R2,000/project", capital: "R0", difficulty: 2, trending: false, icon: "🎙️", quick: false },
  { id: 68, name: "Proofreader", category: "online", description: "Check documents for errors", howToStart: "1. Take courses\n2. Practice on texts\n3. Create profiles\n4. Specialize", earnings: "R100 - R300/hr", capital: "R0", difficulty: 2, trending: false, icon: "✅", quick: false },
  { id: 69, name: "Translator", category: "online", description: "Translate documents", howToStart: "1. Identify languages\n2. Create profiles\n3. Get certified\n4. Specialize", earnings: "R0.50 - R2/word", capital: "R0", difficulty: 2, trending: false, icon: "🌍", quick: false },
  { id: 70, name: "E-book Writer", category: "online", description: "Write and sell e-books", howToStart: "1. Choose topic\n2. Write 5K-20K words\n3. Format PDF\n4. Sell on Gumroad", earnings: "R50 - R500/sale", capital: "R0", difficulty: 2, trending: false, icon: "📖", quick: false },
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

const ChatBot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([{ type: 'bot', text: "Hey! 👋 What's your situation?\n\n⚠️ Note: Earnings shown are examples, not guarantees." }]);
  const [input, setInput] = useState('');
  const quickReplies = ["No money to start", "Work from home", "Need money NOW", "I'm a student"];
  
  const getResponse = (msg) => {
    const m = msg.toLowerCase();
    if (m.includes('no money') || m.includes('broke')) return "R0 to start:\n• 📱 WhatsApp Reseller\n• 📲 Social Media Manager\n• 🎵 TikTok Creator\n• 📄 CV Writer";
    if (m.includes('home') || m.includes('online')) return "Work from anywhere:\n• 📱 WhatsApp Reseller\n• 🎨 Canva Designer\n• 🎬 Video Editor";
    if (m.includes('fast') || m.includes('now')) return "Start TODAY:\n• 🚗 Car Wash (R80-250)\n• 🧍 Queue Standing (R100-300)\n• 🚴 Delivery (R30-100)";
    if (m.includes('student')) return "Student hustles:\n• 📄 CV Writer\n• 🎨 Canva Designer\n• 📚 Online Tutor";
    return "Hot right now:\n• 📱 WhatsApp Reseller\n• 🎵 TikTok Creator\n• 🚗 Car Wash\n• 💇‍♀️ Hair Braider";
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
        <div className="sticky top-0 bg-zinc-900 p-4 border-b border-zinc-800 flex justify-between items-center"><div className="flex items-center gap-3"><span className="text-3xl">{hustle.icon}</span><h2 className="text-lg font-bold text-white">{hustle.name}</h2></div><button onClick={onClose} className="text-zinc-400 text-2xl">&times;</button></div>
        <div className="p-5 space-y-4">
          <p className="text-zinc-300">{hustle.description}</p>
          <div className="grid grid-cols-2 gap-3"><div className="bg-zinc-800 rounded-xl p-3"><p className="text-xs text-zinc-500">Earnings</p><p className="text-emerald-400 font-bold">{hustle.earnings}</p></div><div className="bg-zinc-800 rounded-xl p-3"><p className="text-xs text-zinc-500">Capital</p><p className="text-white">{hustle.capital}</p></div></div>
          {hustle.quick && <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-xl p-3"><p className="text-emerald-400 font-bold text-sm">⚡ Start in 30 minutes!</p></div>}
          <div><h3 className="font-bold text-white mb-2">🚀 How to Start</h3><div className="bg-zinc-800 rounded-xl p-4 text-zinc-300 text-sm whitespace-pre-line">{hustle.howToStart}</div></div>
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3"><p className="text-yellow-500/80 text-xs">⚠️ Earnings are estimates. Results vary based on effort, skills, and market.</p></div>
          <button onClick={onClose} className="w-full bg-emerald-500 text-white font-bold py-4 rounded-xl">Got It! 🚀</button>
        </div>
      </div>
    </div>
  );
};

export default function ScaredMoney() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [selected, setSelected] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  
  const filtered = hustlesData.filter(h => {
    const matchSearch = h.name.toLowerCase().includes(search.toLowerCase()) || h.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'all' || h.category === category;
    return matchSearch && matchCat;
  });
  
  const trending = hustlesData.filter(h => h.trending).slice(0, 6);
  
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-black to-cyan-900/20" />
        <div className="relative max-w-6xl mx-auto px-4 py-12 sm:py-20 text-center">
          <h1 className="text-4xl sm:text-6xl font-black mb-4 bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">SCARED MONEY<br/>DON'T MAKE MONEY</h1>
          <p className="text-lg text-zinc-400 mb-8">70 ways to earn in South Africa. Zero excuses.<br/><span className="text-emerald-400">Pick one. Start today.</span></p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setChatOpen(true)} className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold px-8 py-4 rounded-full">💬 Find Your Hustle</button>
          </div>
        </div>
      </header>
      
      <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 py-2 text-center"><span className="text-black font-bold text-sm">🔥 70 HUSTLES • 💰 R0 CAPITAL • 🇿🇦 MADE FOR SA • ⚡ START TODAY</span></div>
      
      <section className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-xl font-bold mb-4">🔥 Hot Right Now</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {trending.map(h => (<button key={h.id} onClick={() => setSelected(h)} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-left hover:border-emerald-500/50"><span className="text-2xl mb-2 block">{h.icon}</span><p className="font-bold text-white text-sm truncate">{h.name}</p><p className="text-emerald-400 text-xs">{h.earnings.split(' - ')[0]}</p></button>))}
        </div>
      </section>
      
      <section className="max-w-6xl mx-auto px-4 pb-4">
        <div className="relative mb-4"><span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">🔍</span><input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search hustles..." className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-emerald-500" /></div>
        <div className="flex gap-2 overflow-x-auto pb-4">{categories.map(c => (<button key={c.id} onClick={() => setCategory(c.id)} className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap ${category === c.id ? 'bg-emerald-500 text-white' : 'bg-zinc-900 text-zinc-400'}`}><span>{c.icon}</span><span className="text-sm">{c.name}</span></button>))}</div>
      </section>
      
      <section className="max-w-6xl mx-auto px-4 pb-12">
        <p className="text-zinc-500 text-sm mb-4">{filtered.length} hustles</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(h => (
            <button key={h.id} onClick={() => setSelected(h)} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 text-left hover:border-emerald-500/50">
              <div className="flex justify-between items-start mb-3"><span className="text-3xl">{h.icon}</span><div className="flex gap-2">{h.quick && <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-1 rounded-full">⚡Quick</span>}{h.trending && <span className="bg-red-500/20 text-red-400 text-xs px-2 py-1 rounded-full">🔥Hot</span>}</div></div>
              <h3 className="font-bold text-white text-lg mb-1">{h.name}</h3>
              <p className="text-zinc-500 text-sm mb-3">{h.description}</p>
              <div className="flex justify-between"><span className="text-emerald-400 font-bold">{h.earnings}</span><span className="text-zinc-600 text-sm">{h.capital}</span></div>
            </button>
          ))}
        </div>
      </section>
      
      <footer className="border-t border-zinc-800 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-xl font-bold text-emerald-400 mb-2">SCARED MONEY</p>
          <p className="text-zinc-500 text-sm mb-4">Scared money don't make money 💰</p>
          <div className="flex justify-center gap-6 mb-4 text-sm"><a href="/privacy" className="text-zinc-500 hover:text-emerald-400">Privacy</a><a href="/terms" className="text-zinc-500 hover:text-emerald-400">Terms</a></div>
          <div className="bg-zinc-900 rounded-xl p-4 max-w-2xl mx-auto mb-4"><p className="text-zinc-500 text-xs"><strong>DISCLAIMER:</strong> Information is for educational purposes only. Earnings shown are examples and not guaranteed. Results vary. Not financial advice.</p></div>
          <p className="text-zinc-600 text-xs">© 2024 ScaredMoney 🇿🇦</p>
        </div>
      </footer>
      
      <button onClick={() => setChatOpen(true)} className="fixed bottom-6 right-6 w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-2xl shadow-lg z-40">💬</button>
      
      <ChatBot isOpen={chatOpen} onClose={() => setChatOpen(false)} />
      <HustleModal hustle={selected} onClose={() => setSelected(null)} />
      
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');
        body { font-family: 'Space Grotesk', sans-serif; }
      `}</style>
    </div>
  );
}
