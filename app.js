const { useState, useEffect, useRef, useCallback } = React;

// ─── SUPABASE INIT ────────────────────────────────────────────────────────────
const _cfg = {};
const _isSupabaseReady = false;
// Supabase integration disabled – using localStorage for data persistence only.
// No Supabase client will be created.
const db = _isSupabaseReady
  ? window.supabase.createClient(_cfg.url, _cfg.anonKey)
  : null;

// ─── PRIVATE ROOMS DATA ───────────────────────────────────────────────────────
const PRIVATE_ROOMS = [
  {
    id: "room_gold",
    name: "VIP Gold Room",
    icon: "👑",
    price: 150000,
    capacity: "Maksimal 10 Orang",
    features: ["Full AC", 'Smart TV 55"', "Sofa Mewah", "Wi-Fi 100 Mbps"],
    color: "#c9a84c",
  },
  {
    id: "room_exec",
    name: "Executive Suite Room",
    icon: "🏛️",
    price: 250000,
    capacity: "Maksimal 20 Orang",
    features: [
      "Full AC",
      'Smart TV 65" & Projector',
      "Sound System",
      "Whiteboard",
      "Free Coffee & Tea",
    ],
    color: "#4a90e2",
  },
  {
    id: "room_creative",
    name: "Creative Studio Lounge",
    icon: "🎨",
    price: 100000,
    capacity: "Maksimal 6 Orang",
    features: ["Full AC", "Wi-Fi Cepat", "Glass Writing Board", "Cozy Ambience"],
    color: "#2ecc71",
  },
];

// ─── MENU DATA ────────────────────────────────────────────────────────────────
const MENU_DATA = {
  "Signature": [
    { id: 1, name: "Brotherhood Coffee 250ml", price: 17000, desc: "Signature blend dengan cita rasa kompleks dari biji pilihan", tag: "BEST SELLER" },
    { id: 2, name: "Brotherhood Coffee 500ml", price: 30000, desc: "Versi jumbo dari signature coffee Brotherhood", tag: "" },
  ],
  "Classic Coffee": [
    { id: 3, name: "Espresso", price: 18000, desc: "Shot espresso pekat dengan crema sempurna — HOT/ICE", tag: "" },
    { id: 4, name: "Americano", price: 20000, desc: "Espresso dengan air panas, rasa bersih dan ringan — HOT/ICE", tag: "" },
    { id: 5, name: "Caffe Latte", price: 23000, desc: "Espresso dengan steamed milk yang creamy — HOT/ICE", tag: "" },
    { id: 6, name: "Cappuchino", price: 23000, desc: "Espresso, steamed milk dan milk foam — HOT/ICE", tag: "" },
    { id: 7, name: "Mochachino", price: 28000, desc: "Espresso dengan coklat dan steamed milk — HOT/ICE", tag: "" },
    { id: 8, name: "V60", price: 20000, desc: "Pour over coffee dengan metode V60", tag: "" },
    { id: 9, name: "Vietnam Dripp", price: 15000, desc: "Kopi vietnam dengan drip tradisional", tag: "" },
    { id: 10, name: "Affogato", price: 23000, desc: "Espresso panas dituang di atas vanilla ice cream", tag: "" },
  ],
  "Flavour Coffee": [
    { id: 11, name: "Vanilla Latte", price: 28000, desc: "Caffe latte dengan sirup vanilla yang harum", tag: "" },
    { id: 12, name: "Caramel Latte", price: 28000, desc: "Caffe latte dengan drizzle caramel manis", tag: "" },
    { id: 13, name: "Hazelnut Latte", price: 28000, desc: "Caffe latte dengan aroma hazelnut khas", tag: "" },
    { id: 14, name: "Tiramisu Latte", price: 28000, desc: "Perpaduan espresso dengan cita rasa tiramisu", tag: "FAVORIT" },
    { id: 15, name: "Cafelatte Gula Aren", price: 26000, desc: "Caffe latte dengan pemanis gula aren alami", tag: "" },
    { id: 16, name: "Matcha Esspresso", price: 28000, desc: "Perpaduan matcha Jepang dengan espresso", tag: "" },
    { id: 17, name: "Coffee Tonic", price: 25000, desc: "Espresso dengan tonic water yang menyegarkan", tag: "" },
    { id: 18, name: "Red Himalayan", price: 27000, desc: "Minuman kopi dengan sentuhan himalayan", tag: "NEW" },
    { id: 19, name: "Espresso Summer", price: 27000, desc: "Espresso segar dengan twist musim panas", tag: "NEW" },
  ],
  "Milk Based": [
    { id: 20, name: "Milk Cheese Cincau", price: 27000, desc: "Freshmilk dengan jelly cincau, aren sugar & cheese cream", tag: "" },
    { id: 21, name: "Klepon Cheese Cream", price: 29000, desc: "Ekstrak klepon dengan freshmilk & topping sugar cheese", tag: "" },
    { id: 22, name: "Chocolate Original", price: 25000, desc: "Basic coklat dengan steam milk — HOT/ICE", tag: "" },
    { id: 23, name: "Nutella Blast", price: 32000, desc: "Freshmilk dengan nutella & vanilla icecream & cheese cream", tag: "FAVORIT" },
    { id: 24, name: "Matcha Latte", price: 25000, desc: "Ekstrak daun teh dicampur freshmilk — HOT/ICE", tag: "" },
    { id: 25, name: "Taro Latte", price: 25000, desc: "Minuman ekstrak buah talas dengan froathing — HOT/ICE", tag: "" },
    { id: 26, name: "Red Velvet", price: 25000, desc: "Ekstrak buah bit merah dicampur freshmilk — HOT/ICE", tag: "" },
  ],
  "Mocktail": [
    { id: 27, name: "Strawberry Mojito", price: 28000, desc: "Extract strawberry dengan soda", tag: "" },
    { id: 28, name: "Sunset in Brotherhood", price: 27000, desc: "Strawberry flavour dan pineapple dengan soda", tag: "" },
    { id: 29, name: "Lychee Spring", price: 29000, desc: "Yoghurt, lychee flavour dengan soda", tag: "" },
    { id: 30, name: "Virgin Mojito", price: 27000, desc: "Extract lime, mint dengan soda", tag: "" },
    { id: 31, name: "Orange Berry Party", price: 28000, desc: "Extract cocopandan, orange juice & strawberry dengan soda", tag: "NEW" },
    { id: 32, name: "Kimochi", price: 29000, desc: "Extract kiwi, lemon dengan lychee fruit", tag: "NEW" },
    { id: 33, name: "Sunny Tropical Sky", price: 25000, desc: "Mix flavour mango orange, nata de coco & blue soda", tag: "" },
  ],
  "Juice & Blend": [
    { id: 34, name: "Melon Juice", price: 18000, desc: "From fresh melon fruit", tag: "" },
    { id: 35, name: "Watermelon Juice", price: 18000, desc: "From fresh watermelon fruit", tag: "" },
    { id: 36, name: "Orange Juice", price: 18000, desc: "From fresh orange fruit", tag: "" },
    { id: 37, name: "Strawberry Juice", price: 18000, desc: "From fresh strawberry fruit", tag: "" },
    { id: 38, name: "Avocado Juice", price: 22000, desc: "From fresh avocado fruit", tag: "" },
    { id: 39, name: "Strawberry Blend", price: 25000, desc: "Mix strawberry fruit with yoghurt", tag: "" },
    { id: 40, name: "Mango Berry Blend", price: 25000, desc: "Yoghurt blend with mango slice", tag: "" },
    { id: 41, name: "Lychee Berry Blend", price: 28000, desc: "Mix lychee fruit with yoghurt", tag: "" },
  ],
  "Tea": [
    { id: 42, name: "Peach Tea", price: 21000, desc: "Based tea, peach flavour with peach fruit", tag: "" },
    { id: 43, name: "Lychee Tea", price: 21000, desc: "Based tea, lychee flavour with lychee fruit", tag: "" },
    { id: 44, name: "Lemon Tea", price: 18000, desc: "Based tea and extract lemon", tag: "" },
    { id: 45, name: "Strawberry Tea", price: 18000, desc: "Based tea, strawberry flavour with strawberry fruit", tag: "" },
    { id: 46, name: "Thai Tea", price: 20000, desc: "Original Thailand tea, freshmilk with jelly cincau on topping", tag: "" },
  ],
  "Steak": [
    { id: 47, name: "Rib Eye Meltique", price: 115000, desc: "Wagyu 200gr — Potongan daging sapi Jepang bagian rusuk", tag: "" },
    { id: 48, name: "Sirloin Meltique", price: 115000, desc: "Wagyu 200gr — Potongan daging sapi Jepang bagian samping", tag: "" },
    { id: 49, name: "Sirloin Aussie", price: 95000, desc: "Aussie 180gr — Daging sapi Australia bagian samping", tag: "" },
    { id: 50, name: "Chicken Rosemary", price: 60000, desc: "Dada ayam dipanggang dengan rosemary & kentang wedges", tag: "" },
    { id: 51, name: "Cordon Bleu", price: 55000, desc: "Dada ayam dengan smoke beef & keju mozarela", tag: "" },
    { id: 52, name: "Salmon Steak", price: 100000, desc: "Steak salmon dengan kondiment kentang & sauce teriyaki", tag: "" },
    { id: 53, name: "Dorry Panshared", price: 50000, desc: "Ikan dori, sayur, kentang dan bumbu brotherhood", tag: "" },
  ],
  "Fried Rice": [
    { id: 54, name: "Nasi Goreng Ayam Geprek", price: 30000, desc: "Nasi goreng dengan isian telur dan toping ayam geprek", tag: "" },
    { id: 55, name: "Nasi Goreng Iga", price: 40000, desc: "Nasi goreng dengan isian daging iga & iga bakar", tag: "BEST SELLER" },
    { id: 56, name: "Nasi Goreng BBQ", price: 27000, desc: "Nasi goreng dengan isian daging ayam & BBQ sauce", tag: "" },
    { id: 57, name: "Nasi Goreng Brotherhood", price: 30000, desc: "Nasi goreng dengan isian sosis, bakso, ayam dan telur", tag: "" },
    { id: 58, name: "Nasi Goreng Seafood", price: 30000, desc: "Nasi goreng dengan isian udang, cumi dan telur", tag: "" },
  ],
  "Daily Rice": [
    { id: 59, name: "Bebek Goreng Brotherhood", price: 45000, desc: "Bebek goreng, nasi, urap, sambal, tempe, tahu, telur, lalapan", tag: "" },
    { id: 60, name: "Ayam Goreng Serundeng", price: 38000, desc: "Nasi ayam goreng, serundeng, tempe, tahu, sambal, lalapan", tag: "" },
    { id: 61, name: "Rice Bowl Ayam/Dori", price: 30000, desc: "Nasi dori/ayam dengan bumbu sambal matah/salted egg", tag: "" },
    { id: 62, name: "Beef Blackpepper", price: 35000, desc: "Daging sapi dengan sauce blackpepper & telur mata sapi", tag: "" },
    { id: 63, name: "Iga Bakar", price: 45000, desc: "Daging iga sapi dibakar dengan bumbu rempah khas Brotherhood", tag: "" },
    { id: 64, name: "Tom Yum", price: 38000, desc: "Sup tomyum dengan isian bakso ikan, seafood, pak coy, chikuwa & crab stik", tag: "" },
    { id: 65, name: "Sup Iga", price: 45000, desc: "Daging iga sapi ditambah bumbu rempah khas Brotherhood", tag: "" },
  ],
  "Pasta": [
    { id: 66, name: "Spaghetti Aglio Olio", price: 29000, desc: "Spaghetti, chili flake, smoke beef", tag: "" },
    { id: 67, name: "Spaghetti Chicken Sambal Matah", price: 29000, desc: "Spaghetti, ayam katsu, sambal matah dan bumbu brotherhood", tag: "FAVORIT" },
    { id: 68, name: "Spaghetti Carbonara", price: 29000, desc: "Spaghetti, smoke beef, cooking cream & keju", tag: "" },
    { id: 69, name: "Spaghetti Blackpepper", price: 29000, desc: "Spaghetti, beef slice, blackpepper sauce", tag: "" },
    { id: 70, name: "Spaghetti Bolognese", price: 29000, desc: "Spaghetti, daging sapi dan bolognese sauce", tag: "" },
    { id: 71, name: "La Sagna", price: 29000, desc: "Pasta lembaran berlapis disi daging sapi cincang & bolognese", tag: "" },
  ],
  "Pizza": [
    { id: 72, name: "Meat Lover", price: 65000, desc: "Beef, saussage, concasse, paprika, mozarella", tag: "BEST SELLER" },
    { id: 73, name: "American Pizza", price: 45000, desc: "Corn, mushroom, mayopaprika concasse", tag: "" },
    { id: 74, name: "Classic Pizza", price: 55000, desc: "Smoked beef, onion concasse, paprika, mozarella", tag: "" },
    { id: 75, name: "Fontina Pizza", price: 55000, desc: "Chicken, keju parmesan, mozarella, paprika, concasse", tag: "" },
    { id: 76, name: "Pepperoni Pizza", price: 55000, desc: "Beef pepperoni, onion, concasse, paprika, mozarella", tag: "" },
  ],
  "Snack": [
    { id: 77, name: "Nacos", price: 23000, desc: "Corn tortila, tomato sauce, paprika, minced beef, creamy sauce", tag: "" },
    { id: 78, name: "French Fries", price: 20000, desc: "Kentang goreng crispy", tag: "" },
    { id: 79, name: "Crispy Chicken Skin", price: 19000, desc: "Kulit ayam krispi", tag: "" },
    { id: 80, name: "Spicy Chicken Wings", price: 27000, desc: "Sayap ayam krispi dengan saus pedas", tag: "" },
    { id: 81, name: "Mix Platter", price: 40000, desc: "Sayap ayam, sosis, potato chips, corn tortila", tag: "" },
    { id: 82, name: "Spring Roll", price: 21000, desc: "Sayur, ayam cincang digulug dengan kulit lumpia & sauce bangkok", tag: "" },
    { id: 83, name: "Tahu Cabe Garam", price: 21000, desc: "Tahu krispi, cabai, garam, bawang", tag: "" },
    { id: 84, name: "Fish and Chips", price: 30000, desc: "Ikan dori fillet crispy dengan kentang goreng", tag: "" },
  ],
  "Sweet & Salad": [
    { id: 85, name: "Caesar Salad", price: 32000, desc: "Letuce, selada, tomat, telur rebus, ayam, french bread dan dressing", tag: "" },
    { id: 86, name: "Fruit Salad", price: 25000, desc: "Opsional buah dan salad dressing", tag: "" },
    { id: 87, name: "French Toast", price: 28000, desc: "Roti panggang dengan buah dan ice cream diatasnya", tag: "" },
    { id: 88, name: "Crispy Banana", price: 23000, desc: "Pisang dibalut tepung crispy dengan toping coklat dan keju", tag: "" },
    { id: 89, name: "Waffle", price: 30000, desc: "Special waffle dengan toping buah ice cream diatasnya", tag: "" },
    { id: 90, name: "Afogatto", price: 23000, desc: "Espresso with vanilla ice cream", tag: "" },
    { id: 91, name: "Matcha Gatto", price: 23000, desc: "Vanilla ice cream & matcha based", tag: "" },
  ],
  "Burger": [
    { id: 92, name: "Brotherhood Beef Burger", price: 40000, desc: "Burger buns, beef patty, spicy mayo, letuce, tomato, french fries", tag: "SIGNATURE" },
  ],
};

const CATEGORY_ICONS = {
  "Signature": "✦", "Classic Coffee": "☕", "Flavour Coffee": "🍵",
  "Milk Based": "🥛", "Mocktail": "🍹", "Juice & Blend": "🧃",
  "Tea": "🫖", "Steak": "🥩", "Fried Rice": "🍳",
  "Daily Rice": "🍚", "Pasta": "🍝", "Pizza": "🍕",
  "Snack": "🍟", "Sweet & Salad": "🧁", "Burger": "🍔",
  "Private Room": "🗝️",
};

const formatRupiah = (n) => "Rp " + Number(n).toLocaleString("id-ID");

const CAFE_PHOTOS = ["photo1.jpg","photo2.jpg","photo3.jpg","photo4.jpg","photo5.jpg","photo6.jpg"];

// ─── STORAGE LAYER ────────────────────────────────────────────────────────────
// Provides a unified API that uses Supabase when configured, localStorage as fallback.

const STORAGE_KEYS = {
  MENU: "brotherhood_menu_v3",
  ORDERS: "brotherhood_orders_v3",
  MY_ORDER_IDS: "brotherhood_my_order_ids_v3",
};

const loadFromStorage = (key, fallback) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch { return fallback; }
};

const saveToStorage = (key, data) => {
  try { localStorage.setItem(key, JSON.stringify(data)); } catch {}
};

// ─── SHARED IN-MEMORY STATE (localStorage mode) ───────────────────────────────
const defaultSharedMenu = Object.entries(MENU_DATA).flatMap(([cat, items]) =>
  items.map(item => ({ ...item, category: cat, available: true }))
);
let sharedMenu = loadFromStorage(STORAGE_KEYS.MENU, defaultSharedMenu);
let sharedOrders = loadFromStorage(STORAGE_KEYS.ORDERS, []);
let orderCounter = sharedOrders.length > 0
  ? Math.max(...sharedOrders.map(o => o.id)) + 1
  : 1;

// ─── AUDIO ────────────────────────────────────────────────────────────────────
const playChime = () => {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const playTone = (freq, startTime, duration) => {
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, startTime);
      gainNode.gain.setValueAtTime(0.15, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      osc.start(startTime);
      osc.stop(startTime + duration);
    };
    const now = audioCtx.currentTime;
    playTone(659.25, now, 0.25);
    playTone(880.00, now + 0.12, 0.45);
  } catch (e) { console.warn("Audio blocked:", e); }
};

// ─── QRIS SVG ────────────────────────────────────────────────────────────────
const QRIS_SVG = (
  <svg width="180" height="180" viewBox="0 0 100 100" style={{ display: "block", margin: "0 auto", border: "1px solid #ddd", padding: "4px", background: "#fff" }}>
    <rect width="100" height="100" fill="#fff" />
    <rect x="5" y="5" width="22" height="22" fill="#000" /><rect x="8" y="8" width="16" height="16" fill="#fff" /><rect x="11" y="11" width="10" height="10" fill="#000" />
    <rect x="73" y="5" width="22" height="22" fill="#000" /><rect x="76" y="8" width="16" height="16" fill="#fff" /><rect x="79" y="11" width="10" height="10" fill="#000" />
    <rect x="5" y="73" width="22" height="22" fill="#000" /><rect x="8" y="76" width="16" height="16" fill="#fff" /><rect x="11" y="79" width="10" height="10" fill="#000" />
    <rect x="45" y="45" width="10" height="10" fill="#000" /><rect x="47" y="47" width="6" height="6" fill="#fff" /><rect x="49" y="49" width="2" height="2" fill="#000" />
    <rect x="75" y="75" width="8" height="8" fill="#000" /><rect x="77" y="77" width="4" height="4" fill="#fff" />
    <rect x="32" y="5" width="4" height="12" fill="#000" /><rect x="40" y="8" width="12" height="4" fill="#000" /><rect x="56" y="5" width="4" height="4" fill="#000" /><rect x="64" y="10" width="4" height="12" fill="#000" />
    <rect x="32" y="22" width="16" height="4" fill="#000" /><rect x="52" y="18" width="8" height="12" fill="#000" /><rect x="64" y="26" width="16" height="4" fill="#000" />
    <rect x="5" y="32" width="12" height="4" fill="#000" /><rect x="22" y="32" width="4" height="16" fill="#000" /><rect x="5" y="44" width="8" height="4" fill="#000" />
    <rect x="32" y="36" width="4" height="8" fill="#000" /><rect x="40" y="40" width="16" height="4" fill="#000" /><rect x="60" y="32" width="8" height="12" fill="#000" /><rect x="72" y="36" width="4" height="4" fill="#000" /><rect x="84" y="32" width="12" height="4" fill="#000" />
    <rect x="5" y="56" width="16" height="4" fill="#000" /><rect x="26" y="52" width="4" height="8" fill="#000" /><rect x="32" y="48" width="12" height="12" fill="#000" /><rect x="52" y="52" width="4" height="4" fill="#000" /><rect x="60" y="48" width="16" height="4" fill="#000" /><rect x="80" y="44" width="16" height="12" fill="#000" />
    <rect x="32" y="64" width="4" height="16" fill="#000" /><rect x="40" y="64" width="16" height="4" fill="#000" /><rect x="60" y="64" width="4" height="12" fill="#000" /><rect x="68" y="60" width="16" height="4" fill="#000" />
    <rect x="40" y="76" width="12" height="4" fill="#000" /><rect x="56" y="72" width="4" height="12" fill="#000" /><rect x="64" y="76" width="4" height="4" fill="#000" />
    <rect x="32" y="88" width="20" height="4" fill="#000" /><rect x="56" y="88" width="4" height="8" fill="#000" /><rect x="64" y="84" width="12" height="4" fill="#000" /><rect x="80" y="88" width="16" height="4" fill="#000" />
  </svg>
);

// ─── CUSTOMER APP ─────────────────────────────────────────────────────────────
function CustomerApp({ onSwitch }) {
  const [activeCategory, setActiveCategory] = useState("Signature");
  const [cart, setCart] = useState([]);
  const [tableNumber, setTableNumber] = useState("");
  const [orderType, setOrderType] = useState("dine-in");
  const [page, setPage] = useState("home");
  const [heroPhoto, setHeroPhoto] = useState(0);
  const [menuItems, setMenuItems] = useState(sharedMenu);
  const [note, setNote] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [myOrderIds, setMyOrderIds] = useState(() => loadFromStorage(STORAGE_KEYS.MY_ORDER_IDS, []));
  const [showTracker, setShowTracker] = useState(false);
  const [trackedOrders, setTrackedOrders] = useState([]);
  const [checkoutMethod, setCheckoutMethod] = useState("qris");
  const [showQrisModal, setShowQrisModal] = useState(false);
  const [qrisTimer, setQrisTimer] = useState(180);
  const [addedAnimation, setAddedAnimation] = useState(false);

  // Reservation states
  const [selectedRoomId, setSelectedRoomId] = useState("room_gold");
  const [reserveName, setReserveName] = useState("");
  const [reservePhone, setReservePhone] = useState("");
  const [reserveDate, setReserveDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [reserveTime, setReserveTime] = useState("10:00");
  const [reserveDuration, setReserveDuration] = useState(1);
  const [reserveNotes, setReserveNotes] = useState("");
  const [checkoutType, setCheckoutType] = useState("food"); // "food" | "reservation"
  const [lastOrderTotal, setLastOrderTotal] = useState(0);

  // Sync menu from shared (localStorage mode) or Supabase
  // Sync menu from localStorage (polling fallback when Supabase is unavailable)
  useEffect(() => {
    const t = setInterval(() => setMenuItems([...sharedMenu]), 1500);
    return () => clearInterval(t);
  }, []);

  // Sync tracked orders
  // Sync tracked orders from localStorage (polling when Supabase is unavailable)
  useEffect(() => {
    const syncTracked = async () => {
      const ids = loadFromStorage(STORAGE_KEYS.MY_ORDER_IDS, []);
      setTrackedOrders(sharedOrders.filter(o => ids.includes(o.id)));
    };
    syncTracked();
    const t = setInterval(syncTracked, 1500);
    return () => clearInterval(t);
  }, [myOrderIds]);

  // Hero slideshow
  useEffect(() => {
    const t = setInterval(() => setHeroPhoto(p => (p + 1) % CAFE_PHOTOS.length), 4000);
    return () => clearInterval(t);
  }, []);

  // QRIS countdown
  useEffect(() => {
    let t;
    if (showQrisModal && qrisTimer > 0) {
      t = setInterval(() => setQrisTimer(p => p - 1), 1000);
    } else if (qrisTimer === 0) {
      setShowQrisModal(false);
    }
    return () => clearInterval(t);
  }, [showQrisModal, qrisTimer]);

  const addToCart = (item) => {
    setCart(prev => {
      const ex = prev.find(c => c.id === item.id);
      if (ex) return prev.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { ...item, qty: 1 }];
    });
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 600);
  };

  const removeFromCart = (id) => {
    setCart(prev => {
      const ex = prev.find(c => c.id === id);
      if (ex?.qty === 1) return prev.filter(c => c.id !== id);
      return prev.map(c => c.id === id ? { ...c, qty: c.qty - 1 } : c);
    });
  };

  const totalItems = cart.reduce((s, c) => s + c.qty, 0);
  const totalPrice = cart.reduce((s, c) => s + c.price * c.qty, 0);

  const selectedRoom = PRIVATE_ROOMS.find(r => r.id === selectedRoomId);
  const reservationTotal = selectedRoom ? selectedRoom.price * reserveDuration : 0;

  const handleCheckoutSubmit = () => {
    if (checkoutMethod === "qris") {
      setQrisTimer(180);
      setShowQrisModal(true);
    } else {
      placeOrder();
    }
  };

  const placeOrder = async () => {
    const isReservation = checkoutType === "reservation";

    if (!isReservation && !tableNumber && orderType === "dine-in") return;
    if (isReservation && (!reserveName || !reservePhone || !reserveDate || !reserveTime)) return;

    const finalTotal = isReservation ? reservationTotal : totalPrice;
    setLastOrderTotal(finalTotal);

    const orderPayload = {
      table_number: isReservation ? `Private Room — ${selectedRoom.name}` : (orderType === "dine-in" ? tableNumber : "Takeaway"),
      items: isReservation ? [{ name: selectedRoom.name, qty: reserveDuration, price: selectedRoom.price, category: "Private Room" }] : [...cart],
      total: finalTotal,
      note: isReservation ? reserveNotes : note,
      status: "pending",
      time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
      type: isReservation ? "reservation" : orderType,
      payment: checkoutMethod.toUpperCase(),
      reservation_details: isReservation ? {
        roomId: selectedRoomId,
        roomName: selectedRoom.name,
        name: reserveName,
        phone: reservePhone,
        date: reserveDate,
        startTime: reserveTime,
        duration: reserveDuration,
      } : null,
    };

    let newId;

    // Insert order into local storage only
    newId = orderCounter++;
    const localOrder = { ...orderPayload, id: newId, table: orderPayload.table_number };
    sharedOrders = [localOrder, ...sharedOrders];
    saveToStorage(STORAGE_KEYS.ORDERS, sharedOrders);

    const newMyIds = [newId, ...myOrderIds];
    setMyOrderIds(newMyIds);
    saveToStorage(STORAGE_KEYS.MY_ORDER_IDS, newMyIds);

    setCart([]);
    setNote("");
    setShowQrisModal(false);
    setPage("success");
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    return `${m}:${(secs % 60).toString().padStart(2, "0")}`;
  };

  const categories = Object.keys(MENU_DATA);
  const filteredMenuItems = menuItems.filter(item => {
    const q = searchQuery.toLowerCase();
    return searchQuery
      ? item.name.toLowerCase().includes(q) || (item.desc || "").toLowerCase().includes(q)
      : item.category === activeCategory;
  });

  const goHome = () => setPage("home");

  // ─── RENDER ───────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>

      {/* Floating Order Tracker */}
      {myOrderIds.length > 0 && (
        <button className="floating-tracker-btn" onClick={() => setShowTracker(true)} title="Riwayat Pesanan Anda">
          <span style={{ fontSize: "20px" }}>📋</span>
          {trackedOrders.filter(o => o.status !== "done").length > 0 && (
            <span className="floating-tracker-badge">{trackedOrders.filter(o => o.status !== "done").length}</span>
          )}
        </button>
      )}

      {/* ── HOME PAGE ── */}
      {page === "home" && (
        <div style={{ position: "relative", height: "calc(100vh - 33px)", overflow: "hidden" }}>
          {CAFE_PHOTOS.map((src, i) => (
            <div key={i} style={{
              position: "absolute", inset: 0,
              backgroundImage: `url(${src})`, backgroundSize: "cover", backgroundPosition: "center",
              opacity: heroPhoto === i ? 1 : 0,
              transition: "opacity 1.2s cubic-bezier(0.25,0.8,0.25,1)",
              filter: "brightness(0.38) contrast(1.15)",
            }} />
          ))}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 30%, var(--color-bg) 100%)" }} />
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 24px", textAlign: "center" }}>
            <div style={{ fontSize: 11, letterSpacing: 6, color: "var(--color-accent)", marginBottom: 16, fontWeight: 500 }}>SEJAK 2018 — PATI, JAWA TENGAH</div>
            <div style={{ fontSize: "clamp(42px,8vw,76px)", fontWeight: 700, lineHeight: 1.1, marginBottom: 8, fontFamily: "var(--font-serif)" }}>BROTHERHOOD</div>
            <div style={{ fontSize: "clamp(24px,5vw,42px)", fontStyle: "italic", color: "var(--color-accent)", marginBottom: 24, fontFamily: "var(--font-serif)" }}>Coffee & Co</div>
            <div style={{ fontSize: 13, color: "var(--color-text-secondary)", maxWidth: 360, lineHeight: 1.8, marginBottom: 40, fontWeight: 300 }}>
              Tempat nongkrong favorit di Pati dengan suasana nyaman, kopi berkualitas tinggi, dan hidangan lezat.
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
              <button className="btn btn-primary" onClick={() => setPage("menu")}>PESAN SEKARANG</button>
              <button className="btn btn-secondary" style={{ borderColor: "rgba(201,168,76,0.4)", color: "var(--color-accent)" }}
                onClick={() => { setCheckoutType("reservation"); setPage("reservation"); }}>
                🗝️ RESERVASI ROOM
              </button>
            </div>
          </div>
          {/* Slideshow dots */}
          <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8 }}>
            {CAFE_PHOTOS.map((_, i) => (
              <div key={i} onClick={() => setHeroPhoto(i)} style={{
                width: heroPhoto === i ? 24 : 8, height: 8, borderRadius: 4,
                background: heroPhoto === i ? "var(--color-accent)" : "rgba(255,255,255,0.25)",
                cursor: "pointer", transition: "var(--transition-smooth)",
              }} />
            ))}
          </div>
        </div>
      )}

      {/* ── RESERVATION PAGE ── */}
      {page === "reservation" && (
        <div style={{ flex: 1, background: "var(--color-bg-alt)" }}>
          {/* Header */}
          <div className="glass-header" style={{ padding: "16px 24px", display: "flex", alignItems: "center", gap: 16 }}>
            <button onClick={goHome} style={{ background: "none", border: "none", color: "var(--color-accent)", fontSize: "22px", cursor: "pointer" }}>←</button>
            <div>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: 20 }}>Reservasi Private Room</div>
              <div style={{ fontSize: 11, color: "var(--color-accent)", letterSpacing: 2 }}>BROTHERHOOD COFFEE & CO</div>
            </div>
          </div>

          <div style={{ padding: "32px 24px", maxWidth: "860px", margin: "0 auto" }}>
            {/* Room Selection */}
            <div style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 11, letterSpacing: 3, color: "var(--color-text-muted)", marginBottom: 16, fontWeight: 600 }}>PILIH RUANGAN</div>
              <div className="room-grid">
                {PRIVATE_ROOMS.map(room => (
                  <div key={room.id} className={`room-card ${selectedRoomId === room.id ? "active" : ""}`}
                    onClick={() => setSelectedRoomId(room.id)}>
                    <div className="room-card-select-dot" />
                    <div style={{ fontSize: 32, marginBottom: 10 }}>{room.icon}</div>
                    <div className="room-card-title">{room.name}</div>
                    <div className="room-card-capacity">👥 {room.capacity}</div>
                    <div style={{ marginBottom: 12 }}>
                      {room.features.map((f, i) => (
                        <div key={i} style={{ fontSize: 11, color: "var(--color-text-secondary)", marginBottom: 3 }}>✓ {f}</div>
                      ))}
                    </div>
                    <div className="room-card-price">{formatRupiah(room.price)} <span style={{ fontSize: 11, color: "var(--color-text-muted)", fontWeight: 400 }}>/ jam</span></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="glass-panel" style={{ padding: "28px", borderRadius: "8px" }}>
              <div style={{ fontSize: 11, letterSpacing: 3, color: "var(--color-text-muted)", marginBottom: 24, fontWeight: 600 }}>DETAIL RESERVASI</div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20, marginBottom: 20 }}>
                <div>
                  <label style={{ display: "block", fontSize: 10, color: "var(--color-text-muted)", marginBottom: 8, fontWeight: 600, letterSpacing: 1 }}>NAMA LENGKAP *</label>
                  <input value={reserveName} onChange={e => setReserveName(e.target.value)}
                    placeholder="Nama pemesan" className="form-input" />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 10, color: "var(--color-text-muted)", marginBottom: 8, fontWeight: 600, letterSpacing: 1 }}>NOMOR WHATSAPP *</label>
                  <input value={reservePhone} onChange={e => setReservePhone(e.target.value)}
                    placeholder="08xxxxxxxxxx" className="form-input" type="tel" />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 10, color: "var(--color-text-muted)", marginBottom: 8, fontWeight: 600, letterSpacing: 1 }}>TANGGAL RESERVASI *</label>
                  <input value={reserveDate} onChange={e => setReserveDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]} className="form-input" type="date" />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 10, color: "var(--color-text-muted)", marginBottom: 8, fontWeight: 600, letterSpacing: 1 }}>JAM MULAI *</label>
                  <input value={reserveTime} onChange={e => setReserveTime(e.target.value)}
                    className="form-input" type="time" />
                </div>
              </div>

              {/* Duration Selector */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 10, color: "var(--color-text-muted)", marginBottom: 12, fontWeight: 600, letterSpacing: 1 }}>
                  DURASI SEWA
                </label>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {[1, 2, 3, 4, 5, 6, 8].map(d => (
                    <button key={d} onClick={() => setReserveDuration(d)} style={{
                      padding: "10px 18px", borderRadius: "4px", fontSize: 13, fontWeight: 700, cursor: "pointer",
                      border: `1px solid ${reserveDuration === d ? "var(--color-accent)" : "var(--color-border)"}`,
                      background: reserveDuration === d ? "rgba(201,168,76,0.1)" : "transparent",
                      color: reserveDuration === d ? "var(--color-accent)" : "var(--color-text-muted)",
                      transition: "var(--transition-smooth)",
                    }}>{d} Jam</button>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: "block", fontSize: 10, color: "var(--color-text-muted)", marginBottom: 8, fontWeight: 600, letterSpacing: 1 }}>CATATAN KHUSUS (OPSIONAL)</label>
                <textarea value={reserveNotes} onChange={e => setReserveNotes(e.target.value)}
                  placeholder="Dekorasi khusus, setup ruangan, kebutuhan tambahan..." className="form-textarea" />
              </div>

              {/* Payment Method */}
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: "block", fontSize: 10, color: "var(--color-text-muted)", marginBottom: 12, fontWeight: 600, letterSpacing: 1 }}>METODE PEMBAYARAN</label>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[["qris","📱 QRIS / E-Wallet"],["cash","💵 Bayar Tunai di Kasir"],["bank","🏦 Transfer Bank"]].map(([m, label]) => (
                    <div key={m} onClick={() => setCheckoutMethod(m)} style={{
                      display: "flex", alignItems: "center", gap: 12, padding: "14px 16px",
                      border: `1px solid ${checkoutMethod === m ? "var(--color-accent)" : "var(--color-border)"}`,
                      background: checkoutMethod === m ? "rgba(201,168,76,0.04)" : "transparent",
                      borderRadius: "4px", cursor: "pointer", transition: "var(--transition-smooth)",
                    }}>
                      <div style={{
                        width: 18, height: 18, borderRadius: "50%",
                        border: `2px solid ${checkoutMethod === m ? "var(--color-accent)" : "var(--color-border)"}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        {checkoutMethod === m && <div style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--color-accent)" }} />}
                      </div>
                      <span style={{ fontSize: 13, color: checkoutMethod === m ? "#fff" : "var(--color-text-secondary)" }}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Box */}
              <div style={{ background: "rgba(0,0,0,0.3)", border: "1px solid var(--color-border-glow)", padding: "20px", borderRadius: "6px", marginBottom: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", color: "var(--color-text-secondary)", fontSize: 13, marginBottom: 6 }}>
                  <span>Ruangan</span><span>{selectedRoom?.name}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", color: "var(--color-text-secondary)", fontSize: 13, marginBottom: 6 }}>
                  <span>Harga / Jam</span><span>{formatRupiah(selectedRoom?.price || 0)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", color: "var(--color-text-secondary)", fontSize: 13, marginBottom: 12 }}>
                  <span>Durasi</span><span>{reserveDuration} Jam</span>
                </div>
                <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: 12, display: "flex", justifyContent: "space-between", color: "#fff", fontSize: 18, fontWeight: 700 }}>
                  <span>Total Bayar</span>
                  <span style={{ color: "var(--color-accent)", fontFamily: "var(--font-serif)" }}>{formatRupiah(reservationTotal)}</span>
                </div>
              </div>

              <button
                onClick={() => { setCheckoutType("reservation"); handleCheckoutSubmit(); }}
                disabled={!reserveName || !reservePhone || !reserveDate || !reserveTime}
                className="btn btn-primary"
                style={{ width: "100%", padding: "16px", fontSize: 14, letterSpacing: 2 }}>
                🗝️ KONFIRMASI RESERVASI
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MENU PAGE ── */}
      {page === "menu" && (
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div className="glass-header" style={{ padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ cursor: "pointer" }} onClick={goHome}>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: 20 }}>Brotherhood</div>
              <div style={{ fontStyle: "italic", color: "var(--color-accent)", fontSize: 12, fontFamily: "var(--font-serif)" }}>Coffee & Co</div>
            </div>
            <button className="btn btn-primary" onClick={() => setPage("cart")} style={{
              padding: "10px 18px", fontSize: "11px", letterSpacing: "1.5px",
              animation: addedAnimation ? "cartShake 0.6s ease" : "none"
            }}>
              🛒 {totalItems > 0 ? `(${totalItems}) ${formatRupiah(totalPrice)}` : "KERANJANG"}
            </button>
          </div>

          <div style={{ display: "flex", height: "calc(100vh - 120px)" }}>
            <div className="category-sidebar">
              {categories.map(cat => (
                <button key={cat} onClick={() => { setActiveCategory(cat); setSearchQuery(""); }}
                  className={`category-btn ${activeCategory === cat && !searchQuery ? "active" : ""}`}>
                  <span className="category-icon">{CATEGORY_ICONS[cat]}</span>
                  <span>{cat}</span>
                </button>
              ))}
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
              <div className="search-bar-wrapper">
                <span className="search-icon">🔍</span>
                <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Cari kopi, steak, pasta, dessert..." className="form-input search-input-custom" />
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 20 }}>
                <h2 style={{ fontSize: "24px" }}>{searchQuery ? `Hasil: "${searchQuery}"` : activeCategory}</h2>
                <span style={{ fontSize: 12, color: "var(--color-text-muted)" }}>{filteredMenuItems.length} menu</span>
              </div>

              {filteredMenuItems.length === 0 ? (
                <div style={{ textAlign: "center", padding: "80px 0", color: "var(--color-text-muted)" }}>
                  <div style={{ fontSize: "36px", marginBottom: "12px" }}>🍽️</div>
                  <div>Menu tidak ditemukan.</div>
                </div>
              ) : (
                <div className="menu-grid">
                  {filteredMenuItems.map(item => {
                    const inCart = cart.find(c => c.id === item.id);
                    return (
                      <div key={item.id} className={`menu-card ${item.tag ? "best-seller" : ""} ${!item.available ? "unavailable" : ""}`}>
                        <div>
                          <div className="menu-card-header">
                            <h4 className="menu-card-title">{item.name}</h4>
                            {item.tag && <span className="badge badge-gold">{item.tag}</span>}
                            {!item.available && <span className="badge" style={{ background: "var(--color-danger)", color: "#fff" }}>HABIS</span>}
                          </div>
                          <p className="menu-card-desc">{item.desc}</p>
                        </div>
                        <div className="menu-card-footer">
                          <span className="menu-card-price">{formatRupiah(item.price)}</span>
                          {item.available && (
                            inCart ? (
                              <div className="qty-selector">
                                <button className="qty-btn" onClick={() => removeFromCart(item.id)}>−</button>
                                <span className="qty-value">{inCart.qty}</span>
                                <button className="qty-btn qty-btn-plus" onClick={() => addToCart(item)}>+</button>
                              </div>
                            ) : (
                              <button className="btn btn-outline" style={{ padding: "6px 14px", fontSize: "11px", height: "30px" }} onClick={() => addToCart(item)}>
                                + TAMBAH
                              </button>
                            )
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── CART PAGE ── */}
      {page === "cart" && (
        <div style={{ flex: 1, background: "var(--color-bg-alt)" }}>
          <div className="glass-header" style={{ padding: "18px 24px", display: "flex", alignItems: "center", gap: 16 }}>
            <button onClick={() => setPage("menu")} style={{ background: "none", border: "none", color: "var(--color-accent)", fontSize: "22px", cursor: "pointer" }}>←</button>
            <h2 style={{ fontSize: "20px" }}>Keranjang Pesanan</h2>
          </div>

          <div style={{ padding: "30px 24px", maxWidth: "600px", margin: "0 auto" }}>
            <div className="glass-panel" style={{ padding: "24px", borderRadius: "8px" }}>
              {/* Order type */}
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: "block", fontSize: 11, color: "var(--color-text-secondary)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 10, fontWeight: 600 }}>TIPE PESANAN</label>
                <div style={{ display: "flex", gap: 12 }}>
                  {["dine-in", "takeaway"].map(t => (
                    <button key={t} onClick={() => setOrderType(t)} style={{
                      flex: 1, padding: "12px", cursor: "pointer", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", fontWeight: 700, borderRadius: "4px",
                      border: `1px solid ${orderType === t ? "var(--color-accent)" : "var(--color-border)"}`,
                      background: orderType === t ? "rgba(201,168,76,0.08)" : "transparent",
                      color: orderType === t ? "var(--color-accent)" : "var(--color-text-muted)",
                      transition: "var(--transition-smooth)",
                    }}>{t === "dine-in" ? "☕ Dine In" : "🛍️ Takeaway"}</button>
                  ))}
                </div>
              </div>

              {orderType === "dine-in" && (
                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: "block", fontSize: 11, color: "var(--color-text-secondary)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 10, fontWeight: 600 }}>NOMOR MEJA *</label>
                  <input value={tableNumber} onChange={e => setTableNumber(e.target.value)}
                    placeholder="Masukkan nomor meja Anda" className="form-input" />
                </div>
              )}

              {/* Payment */}
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: "block", fontSize: 11, color: "var(--color-text-secondary)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 10, fontWeight: 600 }}>METODE PEMBAYARAN</label>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[["qris","📱 QRIS / E-Wallet"],["cash","💵 Bayar Tunai di Kasir"],["bank","🏦 Transfer Bank Manual"]].map(([m, label]) => (
                    <div key={m} onClick={() => setCheckoutMethod(m)} style={{
                      display: "flex", alignItems: "center", gap: 12, padding: "14px 16px",
                      border: `1px solid ${checkoutMethod === m ? "var(--color-accent)" : "var(--color-border)"}`,
                      background: checkoutMethod === m ? "rgba(201,168,76,0.04)" : "transparent",
                      borderRadius: "4px", cursor: "pointer", transition: "var(--transition-smooth)",
                    }}>
                      <div style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${checkoutMethod === m ? "var(--color-accent)" : "var(--color-border)"}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {checkoutMethod === m && <div style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--color-accent)" }} />}
                      </div>
                      <span style={{ fontSize: 13, color: checkoutMethod === m ? "#fff" : "var(--color-text-secondary)" }}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Items */}
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: "block", fontSize: 11, color: "var(--color-text-secondary)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 10, fontWeight: 600 }}>DETAIL PESANAN ({totalItems} item)</label>
                {cart.length === 0 ? (
                  <div style={{ color: "var(--color-text-muted)", textAlign: "center", padding: "24px 0" }}>Keranjang kosong</div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {cart.map(item => (
                      <div key={item.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid var(--color-border)" }}>
                        <div style={{ flex: 1, paddingRight: 12 }}>
                          <div style={{ fontSize: 14, fontWeight: 500 }}>{item.name}</div>
                          <div style={{ fontSize: 12, color: "var(--color-accent)", marginTop: 2 }}>{formatRupiah(item.price)}</div>
                        </div>
                        <div className="qty-selector">
                          <button className="qty-btn" onClick={() => removeFromCart(item.id)}>−</button>
                          <span className="qty-value">{item.qty}</span>
                          <button className="qty-btn qty-btn-plus" onClick={() => addToCart(item)}>+</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Notes */}
              <div style={{ marginBottom: 28 }}>
                <label style={{ display: "block", fontSize: 11, color: "var(--color-text-secondary)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 10, fontWeight: 600 }}>CATATAN PESANAN (OPSIONAL)</label>
                <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Contoh: less sugar, tanpa es batu..." className="form-textarea" />
              </div>

              {/* Total */}
              <div style={{ background: "rgba(0,0,0,0.2)", border: "1px solid var(--color-border)", padding: "18px", borderRadius: "6px", marginBottom: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", color: "var(--color-text-secondary)", fontSize: 13, marginBottom: 8 }}>
                  <span>Subtotal</span><span>{formatRupiah(totalPrice)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", color: "#fff", fontSize: 16, fontWeight: 700 }}>
                  <span>Total Bayar</span><span style={{ color: "var(--color-accent)" }}>{formatRupiah(totalPrice)}</span>
                </div>
              </div>

              <button onClick={() => { setCheckoutType("food"); handleCheckoutSubmit(); }}
                disabled={cart.length === 0 || (orderType === "dine-in" && !tableNumber)}
                className="btn btn-primary" style={{ width: "100%", padding: "16px", fontSize: 14 }}>
                KIRIM PESANAN & SELESAIKAN
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── SUCCESS PAGE ── */}
      {page === "success" && (
        <div style={{ flex: 1, background: "var(--color-bg)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
          <div className="glass-panel" style={{ width: "100%", maxWidth: "460px", padding: "40px 30px", borderRadius: "8px", textAlign: "center" }}>
            <div className="success-checkmark">
              <svg viewBox="0 0 52 52" style={{ width: "80px", height: "80px" }}>
                <circle className="checkmark-circle" cx="26" cy="26" r="25" />
                <path className="checkmark-check" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
              </svg>
            </div>
            <h2 style={{ fontSize: "28px", color: "#fff", marginBottom: 12 }}>
              {checkoutType === "reservation" ? "Reservasi Berhasil Dikirim!" : "Pesanan Berhasil Dikirim!"}
            </h2>
            <p style={{ color: "var(--color-text-secondary)", fontSize: "14px", lineHeight: 1.6, marginBottom: 24 }}>
              {checkoutType === "reservation"
                ? "Reservasi Anda telah diterima dan akan segera dikonfirmasi oleh kasir. Harap tunggu konfirmasi."
                : "Pesanan Anda telah diterima oleh kasir dan sedang dalam antrian."}
            </p>
            <div style={{ background: "rgba(0,0,0,0.2)", border: "1px solid var(--color-border)", padding: "16px 24px", borderRadius: "4px", marginBottom: 30 }}>
              <div style={{ color: "var(--color-text-muted)", fontSize: "11px", letterSpacing: 2, marginBottom: 4 }}>TOTAL YANG DIBAYAR</div>
              <div style={{ fontSize: "26px", color: "var(--color-accent)", fontWeight: 700, fontFamily: "var(--font-serif)" }}>{formatRupiah(lastOrderTotal)}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <button className="btn btn-primary" onClick={() => { setCheckoutType("food"); setPage("menu"); }}>PESAN MENU</button>
              <button className="btn btn-secondary" onClick={() => { setCheckoutType("reservation"); setPage("reservation"); }}>🗝️ RESERVASI LAGI</button>
              <button className="btn btn-secondary" onClick={() => { setShowTracker(true); setPage("menu"); }}>TRACK STATUS LIVE</button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL: QRIS PAYMENT ── */}
      {showQrisModal && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: "400px" }}>
            <div className="modal-header">
              <h3 className="modal-title">Pembayaran QRIS</h3>
              <button className="modal-close" onClick={() => setShowQrisModal(false)}>×</button>
            </div>
            <div className="modal-body qris-container">
              <div className="qris-logo">QRIS<span>.</span></div>
              <p style={{ fontSize: 12, color: "var(--color-text-secondary)", maxWidth: 280 }}>
                Pindai kode QR ini menggunakan GOPAY, OVO, Dana, LinkAja, atau Mobile Banking.
              </p>
              <div className="qris-code-box">{QRIS_SVG}</div>
              <div>
                <span style={{ fontSize: 12, color: "var(--color-text-muted)" }}>JUMLAH TAGIHAN</span>
                <div style={{ fontSize: 22, fontWeight: 700, color: "#000", background: "var(--color-accent-light)", padding: "4px 16px", borderRadius: "4px", marginTop: 4 }}>
                  {formatRupiah(checkoutType === "reservation" ? reservationTotal : totalPrice)}
                </div>
              </div>
              <div className="qris-timer">Sisa waktu: <span className="qris-timer-val">{formatTime(qrisTimer)}</span></div>
              <div style={{ width: "100%", borderTop: "1px solid var(--color-border)", paddingTop: 16, display: "flex", gap: 10 }}>
                <button className="btn btn-secondary" style={{ flex: 1, padding: "10px" }} onClick={() => setShowQrisModal(false)}>BATAL</button>
                <button className="btn btn-primary" style={{ flex: 1, padding: "10px" }} onClick={placeOrder}>SAYA SUDAH BAYAR</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL: ORDER TRACKER ── */}
      {showTracker && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: "500px" }}>
            <div className="modal-header">
              <h3 className="modal-title">📋 Lacak Pesanan Anda</h3>
              <button className="modal-close" onClick={() => setShowTracker(false)}>×</button>
            </div>
            <div className="modal-body" style={{ padding: "20px" }}>
              {trackedOrders.length === 0 ? (
                <div style={{ textAlign: "center", padding: "30px 0", color: "var(--color-text-muted)" }}>Belum ada riwayat pesanan.</div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {trackedOrders.map(order => {
                    const isReserv = order.type === "reservation";
                    const statusLabel = isReserv
                      ? { pending: "Menunggu Konfirmasi", process: "Dikonfirmasi ✓", done: "Selesai / Aktif" }
                      : { pending: "Menunggu Kasir", process: "Sedang Dimasak", done: "Selesai Disajikan" };
                    const items = order.items || [];
                    return (
                      <div key={order.id} style={{ background: "rgba(0,0,0,0.2)", border: `1px solid ${isReserv ? "rgba(155,89,182,0.3)" : "var(--color-border)"}`, borderRadius: "6px", padding: "16px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, paddingBottom: 8, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                          <div>
                            <span style={{ fontSize: 14, fontWeight: 700 }}>#{String(order.id).padStart(3,"0")}</span>
                            <span style={{ fontSize: 11, color: "var(--color-text-muted)", marginLeft: 8 }}>{order.time}</span>
                            {isReserv && <span className="badge badge-reservation" style={{ marginLeft: 8, padding: "2px 8px", borderRadius: 20, fontSize: 10 }}>🗝️ ROOM</span>}
                          </div>
                          <span className={`badge-status ${order.status === "pending" ? "badge-pending" : order.status === "process" ? "badge-process" : "badge-done"}`}>
                            {statusLabel[order.status]}
                          </span>
                        </div>
                        {isReserv && order.reservation_details && (
                          <div style={{ fontSize: 12, color: "var(--color-text-secondary)", marginBottom: 8 }}>
                            <div>🗝️ {order.reservation_details.roomName}</div>
                            <div>📅 {order.reservation_details.date} pukul {order.reservation_details.startTime}</div>
                            <div>⏱ {order.reservation_details.duration} Jam</div>
                          </div>
                        )}
                        {!isReserv && items.map((it, idx) => (
                          <div key={idx} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--color-text-secondary)", marginBottom: 4 }}>
                            <span>{it.qty}x {it.name}</span>
                            <span>{formatRupiah(it.price * it.qty)}</span>
                          </div>
                        ))}
                        <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", marginTop: 8, paddingTop: 8, display: "flex", justifyContent: "space-between" }}>
                          <span style={{ fontSize: 11, color: "var(--color-text-muted)" }}>{order.table_number || order.table} — {order.payment}</span>
                          <span style={{ fontSize: 13, fontWeight: 700, color: "var(--color-accent)" }}>{formatRupiah(order.total)}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div style={{ padding: "16px 20px", borderTop: "1px solid var(--color-border)", display: "flex", justifyContent: "flex-end" }}>
              <button className="btn btn-secondary" style={{ padding: "10px 20px" }} onClick={() => setShowTracker(false)}>TUTUP</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── KASIR APP ────────────────────────────────────────────────────────────────
function KasirApp({ onSwitch }) {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("orders");
  const [menuItems, setMenuItems] = useState(sharedMenu);
  const [newMenuName, setNewMenuName] = useState("");
  const [newMenuPrice, setNewMenuPrice] = useState("");
  const [newMenuCat, setNewMenuCat] = useState("Signature");
  const [newMenuDesc, setNewMenuDesc] = useState("");
  const [newMenuTag, setNewMenuTag] = useState("");
  const [editItem, setEditItem] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [printOrder, setPrintOrder] = useState(null);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [searchTermOrders, setSearchTermOrders] = useState("");
  const [searchTermMenu, setSearchTermMenu] = useState("");
  const [dbStatus, setDbStatus] = useState(_isSupabaseReady ? "connecting" : "local");
  const prevCountRef = useRef(0);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // ── SUPABASE SEED: Push default menu if Supabase table is empty ──
  useEffect(() => {
    if (!db) return;
    const seedMenuIfEmpty = async () => {
      const { data } = await db.from("brotherhood_menu").select("id").limit(1);
      if (data && data.length === 0) {
        const rows = defaultSharedMenu.map(({ id, name, price, desc, category, available, tag }) =>
          ({ id, name, price, desc, category, available, tag })
        );
        await db.from("brotherhood_menu").insert(rows);
      }
    };
    seedMenuIfEmpty();
  }, []);

  // ── DATA SYNC (Supabase realtime OR localStorage polling) ──
  useEffect(() => {
    const loadOrders = async () => {
      if (db) {
        const { data, error } = await db.from("brotherhood_orders").select("*").order("id", { ascending: false });
        if (!error && data) {
          if (data.length > prevCountRef.current) {
            playChime();
            const latest = data[0];
            showToast(`🔔 Pesanan Baru! #${latest.id} — ${latest.table_number}`);
          }
          prevCountRef.current = data.length;
          setOrders(data);
        }
      } else {
        const fresh = [...sharedOrders];
        if (fresh.length > prevCountRef.current) {
          playChime();
          showToast(`🔔 Pesanan Baru! #${fresh[0]?.id} — ${fresh[0]?.table}`);
          prevCountRef.current = fresh.length;
        }
        setOrders(fresh);
      }
    };

    const loadMenu = async () => {
      if (db) {
        const { data } = await db.from("brotherhood_menu").select("*");
        if (data) { setMenuItems(data); sharedMenu = data; }
      } else {
        setMenuItems([...sharedMenu]);
      }
    };

    loadOrders();
    loadMenu();

    if (db) {
      setDbStatus("connected");
      const ch = db.channel("kasir-realtime")
        .on("postgres_changes", { event: "*", schema: "public", table: "brotherhood_orders" }, loadOrders)
        .on("postgres_changes", { event: "*", schema: "public", table: "brotherhood_menu" }, loadMenu)
        .subscribe();
      return () => db.removeChannel(ch);
    } else {
      const t = setInterval(() => { loadOrders(); loadMenu(); }, 800);
      return () => clearInterval(t);
    }
  }, []);

  // ── ORDER STATUS UPDATE ──
  const updateOrderStatus = async (id, status) => {
    if (db) {
      await db.from("brotherhood_orders").update({ status }).eq("id", id);
    } else {
      const next = sharedOrders.map(o => o.id === id ? { ...o, status } : o);
      sharedOrders = next;
      saveToStorage(STORAGE_KEYS.ORDERS, next);
      setOrders([...next]);
    }
  };

  // ── MENU CRUD ──
  const toggleAvailable = async (id, currentVal) => {
    if (db) {
      await db.from("brotherhood_menu").update({ available: !currentVal }).eq("id", id);
    } else {
      const next = sharedMenu.map(m => m.id === id ? { ...m, available: !m.available } : m);
      sharedMenu = next; saveToStorage(STORAGE_KEYS.MENU, next); setMenuItems(next);
    }
  };

  const addNewMenu = async () => {
    if (!newMenuName || !newMenuPrice) return;
    const newItem = { name: newMenuName, price: parseInt(newMenuPrice), desc: newMenuDesc || "-", category: newMenuCat, available: true, tag: newMenuTag || "" };
    if (db) {
      await db.from("brotherhood_menu").insert(newItem);
    } else {
      const withId = { ...newItem, id: Date.now() };
      const next = [withId, ...sharedMenu];
      sharedMenu = next; saveToStorage(STORAGE_KEYS.MENU, next); setMenuItems(next);
    }
    setNewMenuName(""); setNewMenuPrice(""); setNewMenuDesc(""); setNewMenuTag("");
    showToast("✅ Menu baru berhasil ditambahkan!");
  };

  const deleteMenuItem = async (id) => {
    if (!confirm("Hapus menu ini secara permanen?")) return;
    if (db) {
      await db.from("brotherhood_menu").delete().eq("id", id);
    } else {
      const next = sharedMenu.filter(m => m.id !== id);
      sharedMenu = next; saveToStorage(STORAGE_KEYS.MENU, next); setMenuItems(next);
    }
    showToast("🗑️ Menu berhasil dihapus!");
  };

  const openEditModal = (item) => { setEditItem({ ...item }); setShowEditModal(true); };

  const saveEditedMenu = async () => {
    if (!editItem?.name || !editItem?.price) return;
    const updates = { name: editItem.name, price: parseInt(editItem.price), desc: editItem.desc, category: editItem.category, tag: editItem.tag };
    if (db) {
      await db.from("brotherhood_menu").update(updates).eq("id", editItem.id);
    } else {
      const next = sharedMenu.map(m => m.id === editItem.id ? { ...m, ...updates } : m);
      sharedMenu = next; saveToStorage(STORAGE_KEYS.MENU, next); setMenuItems(next);
    }
    setShowEditModal(false); setEditItem(null);
    showToast("✏️ Menu berhasil diperbarui!");
  };

  const handlePrintTrigger = (order) => { setPrintOrder(order); setShowPrintModal(true); };

  // ── ANALYTICS ──
  const pendingOrders = orders.filter(o => o.status === "pending");
  const processOrders = orders.filter(o => o.status === "process");
  const doneOrders = orders.filter(o => o.status === "done");
  const todayRevenue = doneOrders.reduce((s, o) => s + Number(o.total), 0);

  const filteredOrders = orders.filter(o => {
    const text = searchTermOrders.toLowerCase();
    const items = o.items || [];
    return String(o.id).includes(text) ||
      (o.table_number || o.table || "").toLowerCase().includes(text) ||
      (o.payment || "").toLowerCase().includes(text) ||
      items.some(it => (it.name || "").toLowerCase().includes(text));
  });

  const filteredMenuDashboard = menuItems.filter(m => {
    const text = searchTermMenu.toLowerCase();
    return m.name.toLowerCase().includes(text) || m.category.toLowerCase().includes(text);
  });

  const chartCategories = ["Signature", "Classic Coffee", "Flavour Coffee", "Milk Based", "Mocktail", "Steak", "Snack", "Pizza", "Private Room"];
  const categorySales = {};
  doneOrders.forEach(order => {
    const items = order.items || [];
    if (order.type === "reservation") {
      categorySales["Private Room"] = (categorySales["Private Room"] || 0) + Number(order.total);
    } else {
      items.forEach(item => {
        categorySales[item.category] = (categorySales[item.category] || 0) + (item.price * item.qty);
      });
    }
  });
  const chartValues = chartCategories.map(cat => categorySales[cat] || 0);
  const maxVal = Math.max(...chartValues, 50000);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--color-bg)" }}>
      {/* Toast */}
      {toastMessage && <div className="toast-notif"><span>{toastMessage}</span></div>}

      {/* Header */}
      <div className="glass-header" style={{ padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 700, letterSpacing: "1.5px" }}>DASHBOARD KASIR</h2>
          <div style={{ fontSize: 11, color: "var(--color-accent)", letterSpacing: "2.5px" }}>BROTHERHOOD COFFEE & CO</div>
        </div>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          {/* DB Status Badge */}
          <div style={{
            fontSize: 10, letterSpacing: 1, padding: "4px 10px", borderRadius: 20, fontWeight: 700,
            background: dbStatus === "connected" ? "rgba(46,204,113,0.1)" : dbStatus === "local" ? "rgba(245,166,35,0.1)" : "rgba(74,144,226,0.1)",
            color: dbStatus === "connected" ? "#2ecc71" : dbStatus === "local" ? "#f5a623" : "#4a90e2",
            border: dbStatus === "connected" ? "1px solid rgba(46,204,113,0.3)" : dbStatus === "local" ? "1px solid rgba(245,166,35,0.3)" : "1px solid rgba(74,144,226,0.3)",
          }}>
            {dbStatus === "connected" ? "⚡ SUPABASE" : dbStatus === "local" ? "💾 LOCAL MODE" : "🔄 CONNECTING..."}
          </div>
          <div style={{ fontSize: 12, color: "var(--color-text-secondary)" }}>
            📅 {new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long" })}
          </div>
          <button className="btn btn-primary" style={{ padding: "8px 16px", fontSize: 11 }} onClick={onSwitch}>CUSTOMER APPS</button>
        </div>
      </div>

      {/* Stats Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 1, background: "var(--color-border)", borderBottom: "1px solid var(--color-border)" }}>
        {[
          ["PENDING", pendingOrders.length, "var(--color-pending)"],
          ["DIPROSES", processOrders.length, "var(--color-process)"],
          ["SELESAI", doneOrders.length, "var(--color-done)"],
          ["OMSET HARI INI", formatRupiah(todayRevenue), "var(--color-accent)"],
        ].map(([label, val, color]) => (
          <div key={label} style={{ background: "var(--color-bg-alt)", padding: "20px 24px", textAlign: "center" }}>
            <div style={{ fontSize: 24, fontWeight: 700, color, marginBottom: 4 }}>{val}</div>
            <div style={{ fontSize: 10, color: "var(--color-text-muted)", letterSpacing: 2, fontWeight: 600 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid var(--color-border)", background: "var(--color-bg-alt)" }}>
        {[["orders","📋 Pesanan Masuk"],["menu","🍽️ Kelola Menu"],["reports","📊 Laporan Penjualan"]].map(([tab, label]) => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            padding: "16px 28px", background: "transparent", border: "none",
            borderBottom: activeTab === tab ? "2px solid var(--color-accent)" : "2px solid transparent",
            color: activeTab === tab ? "var(--color-accent)" : "var(--color-text-muted)",
            cursor: "pointer", fontSize: 12, letterSpacing: 1.5, fontWeight: 700, transition: "var(--transition-smooth)",
          }}>{label}</button>
        ))}
      </div>

      {/* Body */}
      <div style={{ flex: 1, padding: "24px" }}>

        {/* ── TAB: ORDERS ── */}
        {activeTab === "orders" && (
          <div>
            <div className="search-bar-wrapper" style={{ maxWidth: 400 }}>
              <span className="search-icon">🔍</span>
              <input value={searchTermOrders} onChange={e => setSearchTermOrders(e.target.value)}
                placeholder="Cari ID, Meja, atau Item..." className="form-input search-input-custom" />
            </div>

            {filteredOrders.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 0", color: "var(--color-text-muted)" }}>
                <div style={{ fontSize: 44, marginBottom: 16 }}>📋</div>
                <div>Tidak ada pesanan yang sesuai pencarian.</div>
              </div>
            ) : (
              <div className="kasir-grid">
                {filteredOrders.map(order => {
                  const isReserv = order.type === "reservation";
                  const rd = order.reservation_details;
                  const items = order.items || [];
                  return (
                    <div key={order.id} className={`kasir-card ${order.status}`}
                      style={{ borderLeft: isReserv ? "3px solid #c58af9" : undefined }}>
                      <div className="kasir-card-header">
                        <div>
                          <div className="kasir-card-title" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            Order #{String(order.id).padStart(3,"0")}
                            {isReserv && (
                              <span className="badge badge-reservation" style={{ fontSize: 9, padding: "2px 8px", borderRadius: 20 }}>🗝️ RESERVASI</span>
                            )}
                          </div>
                          <div style={{ fontSize: 11, color: "var(--color-text-muted)", marginTop: 2 }}>🕐 {order.time} — {order.payment}</div>
                        </div>
                        <span className={`badge-status ${order.status === "pending" ? "badge-pending" : order.status === "process" ? "badge-process" : "badge-done"}`}>
                          {order.status === "pending" ? (isReserv ? "Menunggu Konfirmasi" : "Menunggu") : order.status === "process" ? (isReserv ? "Dikonfirmasi ✓" : "Diproses") : "Selesai"}
                        </span>
                      </div>
                      <div className="kasir-card-body">
                        <div style={{ fontWeight: 600, fontSize: 13, color: "var(--color-accent-light)", marginBottom: 8 }}>
                          📍 {(order.table_number || order.table || "").toUpperCase()}
                        </div>

                        {isReserv && rd ? (
                          <div style={{ background: "rgba(155,89,182,0.05)", border: "1px solid rgba(155,89,182,0.2)", borderRadius: 6, padding: "12px", marginBottom: 8 }}>
                            <div style={{ fontSize: 11, color: "#c58af9", fontWeight: 700, letterSpacing: 1, marginBottom: 8 }}>DETAIL RESERVASI</div>
                            {[
                              ["🗝️ Ruangan", rd.roomName],
                              ["👤 Nama", rd.name],
                              ["📱 WhatsApp", rd.phone],
                              ["📅 Tanggal", rd.date],
                              ["⏰ Jam Mulai", rd.startTime],
                              ["⏱ Durasi", `${rd.duration} Jam`],
                            ].map(([label, val]) => (
                              <div key={label} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--color-text-secondary)", marginBottom: 4 }}>
                                <span style={{ color: "var(--color-text-muted)" }}>{label}</span>
                                <span style={{ color: "#fff", fontWeight: 500 }}>{val}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          items.map((item, idx) => (
                            <div key={idx} className="kasir-item-row">
                              <span>{item.qty}x {item.name}</span>
                              <span>{formatRupiah(item.price * item.qty)}</span>
                            </div>
                          ))
                        )}

                        {order.note && (
                          <div style={{ fontSize: 11, color: "var(--color-text-muted)", fontStyle: "italic", marginTop: 8, padding: "6px", background: "rgba(255,255,255,0.02)", borderLeft: "2px solid #555" }}>
                            📝 {order.note}
                          </div>
                        )}
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, paddingTop: 10, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                          <span style={{ fontSize: 12, color: "var(--color-text-muted)" }}>TOTAL</span>
                          <span style={{ fontSize: 14, color: "var(--color-accent)", fontWeight: 700 }}>{formatRupiah(order.total)}</span>
                        </div>
                      </div>
                      <div className="kasir-card-footer">
                        {order.status === "pending" && (
                          <button onClick={() => updateOrderStatus(order.id, "process")} className="btn btn-primary" style={{ flex: 1, padding: "8px 12px", fontSize: 11 }}>
                            ✓ TERIMA
                          </button>
                        )}
                        {order.status === "process" && (
                          <button onClick={() => updateOrderStatus(order.id, "done")} className="btn btn-primary" style={{ flex: 1, padding: "8px 12px", fontSize: 11, background: "var(--color-done)", color: "#000" }}>
                            ✓ SELESAIKAN
                          </button>
                        )}
                        <button onClick={() => handlePrintTrigger(order)} className="btn btn-secondary" style={{ padding: "8px 12px", fontSize: 11 }}>
                          🖨️ STRUK
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ── TAB: MENU MANAGEMENT ── */}
        {activeTab === "menu" && (
          <div className="row">
            <div className="col-8">
              <div className="glass-panel" style={{ padding: "20px", borderRadius: "6px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <h3 style={{ fontSize: 16, color: "var(--color-text-secondary)" }}>DAFTAR MENU ({menuItems.length} item)</h3>
                  <div className="search-bar-wrapper" style={{ width: 260, marginBottom: 0 }}>
                    <span className="search-icon">🔍</span>
                    <input value={searchTermMenu} onChange={e => setSearchTermMenu(e.target.value)}
                      placeholder="Cari nama menu..." className="form-input search-input-custom" style={{ padding: "8px 12px 8px 36px" }} />
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, maxHeight: "65vh", overflowY: "auto" }}>
                  {filteredMenuDashboard.map(item => (
                    <div key={item.id} className="glass-panel" style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "12px 16px", borderRadius: "4px",
                      opacity: item.available ? 1 : 0.6,
                    }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                          <span style={{ fontSize: 14, fontWeight: 600 }}>{item.name}</span>
                          <span style={{ fontSize: 9, background: "var(--color-border-glow)", color: "var(--color-accent-light)", padding: "1px 6px" }}>{item.category}</span>
                          {item.tag && <span style={{ fontSize: 9, background: "var(--color-accent)", color: "#000", padding: "1px 6px" }}>{item.tag}</span>}
                        </div>
                        <div style={{ fontSize: 12, color: "var(--color-accent)" }}>{formatRupiah(item.price)}</div>
                      </div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button onClick={() => toggleAvailable(item.id, item.available)} className="btn" style={{
                          padding: "6px 12px", fontSize: 10, letterSpacing: 1, border: "none",
                          background: item.available ? "rgba(231,76,60,0.15)" : "rgba(46,204,113,0.15)",
                          color: item.available ? "var(--color-danger)" : "var(--color-done)",
                        }}>{item.available ? "SOLD OUT" : "AKTIFKAN"}</button>
                        <button onClick={() => openEditModal(item)} className="btn btn-secondary" style={{ padding: "6px 12px", fontSize: 10 }}>EDIT</button>
                        <button onClick={() => deleteMenuItem(item.id)} className="btn" style={{ padding: "6px 12px", fontSize: 10, border: "none", background: "rgba(255,255,255,0.03)", color: "var(--color-text-muted)" }}>HAPUS</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-4">
              <div className="glass-panel" style={{ padding: "20px", borderRadius: "6px" }}>
                <h3 style={{ fontSize: 14, color: "var(--color-accent)", letterSpacing: "1.5px", marginBottom: 20 }}>+ TAMBAH MENU BARU</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {[
                    ["NAMA MENU *", <input value={newMenuName} onChange={e => setNewMenuName(e.target.value)} placeholder="Contoh: Es Kopi Susu Aren" className="form-input" />],
                    ["HARGA *", <input value={newMenuPrice} onChange={e => setNewMenuPrice(e.target.value)} placeholder="Contoh: 18000" type="number" className="form-input" />],
                    ["KATEGORI", <select value={newMenuCat} onChange={e => setNewMenuCat(e.target.value)} className="form-select">
                      {Object.keys(MENU_DATA).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>],
                    ["DESKRIPSI", <textarea value={newMenuDesc} onChange={e => setNewMenuDesc(e.target.value)} placeholder="Deskripsi singkat..." className="form-textarea" />],
                    ["TAG MENU (OPSIONAL)", <input value={newMenuTag} onChange={e => setNewMenuTag(e.target.value)} placeholder="BEST SELLER, NEW, FAVORIT" className="form-input" />],
                  ].map(([label, el]) => (
                    <div key={label}>
                      <label style={{ display: "block", fontSize: 10, color: "var(--color-text-muted)", marginBottom: 6, fontWeight: 600 }}>{label}</label>
                      {el}
                    </div>
                  ))}
                  <button onClick={addNewMenu} className="btn btn-primary" style={{ width: "100%", padding: "12px", marginTop: 6 }}>TAMBAH MENU</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB: REPORTS ── */}
        {activeTab === "reports" && (
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            <div className="chart-container">
              <div className="chart-title">📊 Penjualan Bersih Per Kategori (Pesanan Selesai)</div>
              <div style={{ display: "flex", width: "100%", height: "240px", alignItems: "flex-end", paddingBottom: "30px", borderBottom: "1px solid var(--color-border)", position: "relative" }}>
                {chartCategories.map((cat, idx) => {
                  const val = categorySales[cat] || 0;
                  const percent = Math.min((val / maxVal) * 100, 100);
                  const isRoom = cat === "Private Room";
                  return (
                    <div key={idx} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", height: "100%", justifyContent: "flex-end", position: "relative" }} title={`${cat}: ${formatRupiah(val)}`}>
                      <div style={{ fontSize: 10, color: isRoom ? "#c58af9" : "var(--color-accent)", fontWeight: 700, marginBottom: 6 }}>
                        {val > 0 ? (val >= 1000000 ? `${(val/1000000).toFixed(1)}M` : `${Math.round(val/1000)}k`) : ""}
                      </div>
                      <div style={{
                        width: "60%",
                        height: `${Math.max(percent, val > 0 ? 5 : 2)}%`,
                        background: isRoom
                          ? "linear-gradient(to top, rgba(155,89,182,0.8), #c58af9)"
                          : (val > 0 ? "linear-gradient(to top, var(--color-accent-dark), var(--color-accent))" : "var(--color-border)"),
                        borderRadius: "2px 2px 0 0",
                        transition: "all 0.6s ease",
                      }} />
                      <div style={{
                        position: "absolute", bottom: "-30px", width: "80px", textAlign: "center", fontSize: "9px",
                        transform: "rotate(-25deg)", whiteSpace: "nowrap",
                        color: isRoom ? "#c58af9" : (val > 0 ? "var(--color-text-secondary)" : "var(--color-text-muted)"),
                        textOverflow: "ellipsis", overflow: "hidden",
                      }}>{cat}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="glass-panel" style={{ padding: "24px", borderRadius: "6px" }}>
              <h3 style={{ fontSize: 15, marginBottom: 12 }}>Rekapitulasi Penjualan Kategori</h3>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--color-border)", color: "var(--color-text-muted)" }}>
                    <th style={{ textAlign: "left", padding: "10px 0" }}>KATEGORI</th>
                    <th style={{ textAlign: "right", padding: "10px 0" }}>TOTAL PENJUALAN</th>
                  </tr>
                </thead>
                <tbody>
                  {chartCategories.map(cat => (
                    <tr key={cat} style={{ borderBottom: "1px solid rgba(255,255,255,0.02)" }}>
                      <td style={{ padding: "12px 0", color: cat === "Private Room" ? "#c58af9" : "var(--color-text-secondary)" }}>
                        {CATEGORY_ICONS[cat]} {cat}
                      </td>
                      <td style={{ padding: "12px 0", textAlign: "right", fontWeight: 700, color: categorySales[cat] > 0 ? (cat === "Private Room" ? "#c58af9" : "var(--color-accent-light)") : "var(--color-text-muted)" }}>
                        {formatRupiah(categorySales[cat] || 0)}
                      </td>
                    </tr>
                  ))}
                  <tr style={{ borderTop: "1px solid var(--color-border-glow)" }}>
                    <td style={{ padding: "14px 0", fontWeight: 700, color: "#fff" }}>TOTAL OMSET</td>
                    <td style={{ padding: "14px 0", textAlign: "right", fontWeight: 700, fontSize: 15, color: "var(--color-accent)" }}>{formatRupiah(todayRevenue)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* ── MODAL: EDIT MENU ── */}
      {showEditModal && editItem && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: "420px" }}>
            <div className="modal-header">
              <h3 className="modal-title">✏️ Edit Detail Menu</h3>
              <button className="modal-close" onClick={() => setShowEditModal(false)}>×</button>
            </div>
            <div className="modal-body" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                ["NAMA MENU", <input value={editItem.name} onChange={e => setEditItem({ ...editItem, name: e.target.value })} className="form-input" />],
                ["HARGA (Rp)", <input value={editItem.price} onChange={e => setEditItem({ ...editItem, price: e.target.value })} type="number" className="form-input" />],
                ["KATEGORI", <select value={editItem.category} onChange={e => setEditItem({ ...editItem, category: e.target.value })} className="form-select">
                  {Object.keys(MENU_DATA).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>],
                ["DESKRIPSI", <textarea value={editItem.desc} onChange={e => setEditItem({ ...editItem, desc: e.target.value })} className="form-textarea" />],
                ["TAG MENU", <input value={editItem.tag} onChange={e => setEditItem({ ...editItem, tag: e.target.value })} placeholder="BEST SELLER, NEW" className="form-input" />],
              ].map(([label, el]) => (
                <div key={label}>
                  <label style={{ display: "block", fontSize: 10, color: "var(--color-text-muted)", marginBottom: 6, fontWeight: 600 }}>{label}</label>
                  {el}
                </div>
              ))}
              <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                <button className="btn btn-secondary" style={{ flex: 1, padding: "10px" }} onClick={() => setShowEditModal(false)}>BATAL</button>
                <button className="btn btn-primary" style={{ flex: 1, padding: "10px" }} onClick={saveEditedMenu}>SIMPAN</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL: STRUK PRINT ── */}
      {showPrintModal && printOrder && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: "380px" }}>
            <div className="modal-header">
              <h3 className="modal-title">🖨️ Simulasi Cetak Struk</h3>
              <button className="modal-close" onClick={() => setShowPrintModal(false)}>×</button>
            </div>
            <div className="modal-body" style={{ padding: "16px" }}>
              <div className="receipt-paper">
                <div className="receipt-header">
                  <div className="receipt-shop-name">BROTHERHOOD COFFEE & CO</div>
                  <div style={{ fontSize: 11 }}>Jl. Penjawi No.8, Pati, Jawa Tengah</div>
                  <div style={{ fontSize: 11, marginTop: 4 }}>Telp: 0812-3456-7890</div>
                </div>
                <div style={{ fontSize: 11 }}>
                  <div>No Struk : #STK-{String(printOrder.id).padStart(4,"0")}</div>
                  <div>Tanggal  : {new Date().toLocaleDateString("id-ID")} {printOrder.time}</div>
                  <div>Lokasi   : {(printOrder.table_number || printOrder.table || "").toUpperCase()}</div>
                  <div>Metode   : {printOrder.payment}</div>
                  {printOrder.type === "reservation" && <div>Tipe     : RESERVASI PRIVATE ROOM</div>}
                </div>
                <div className="receipt-divider" />
                {(printOrder.type === "reservation" && printOrder.reservation_details) ? (
                  <div style={{ fontSize: 11 }}>
                    <div className="receipt-item"><span>🗝️ {printOrder.reservation_details.roomName}</span></div>
                    <div className="receipt-item" style={{ color: "#666" }}>
                      <span>   {printOrder.reservation_details.duration} Jam x {formatRupiah(printOrder.reservation_details.duration > 0 ? printOrder.total / printOrder.reservation_details.duration : printOrder.total)}</span>
                      <span>{formatRupiah(printOrder.total)}</span>
                    </div>
                    <div style={{ fontSize: 10, color: "#888", marginTop: 4 }}>
                      Tanggal: {printOrder.reservation_details.date} Pukul {printOrder.reservation_details.startTime}
                    </div>
                  </div>
                ) : (
                  (printOrder.items || []).map((it, idx) => (
                    <div key={idx}>
                      <div className="receipt-item"><span>{it.name}</span></div>
                      <div className="receipt-item" style={{ fontSize: 11, color: "#666" }}>
                        <span>   {it.qty} x {formatRupiah(it.price)}</span>
                        <span>{formatRupiah(it.price * it.qty)}</span>
                      </div>
                    </div>
                  ))
                )}
                <div className="receipt-divider" />
                <div className="receipt-total-row">
                  <span>TOTAL BILL</span>
                  <span>{formatRupiah(printOrder.total)}</span>
                </div>
                {printOrder.note && <div style={{ fontSize: 11, fontStyle: "italic", marginTop: 10 }}>Catatan: {printOrder.note}</div>}
                <div className="receipt-footer">
                  <div>Terima Kasih Atas Kunjungan Anda</div>
                  <div style={{ marginTop: 2 }}>Silakan Datang Kembali 🙏</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
                <button className="btn btn-secondary" style={{ flex: 1, padding: "10px" }} onClick={() => setShowPrintModal(false)}>TUTUP</button>
                <button className="btn btn-primary" style={{ flex: 1, padding: "10px" }} onClick={() => window.print()}>CETAK STRUK</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
function App() {
  const [view, setView] = useState("customer");
  const switchTo = (v) => { setView(v); if (v === "kasir") playChime(); };
  return view === "customer"
    ? <CustomerApp onSwitch={() => switchTo("kasir")} />
    : <KasirApp onSwitch={() => switchTo("customer")} />;
}

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App));
