const { useState, useEffect, useRef } = React;

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
    { id: 23, name: "Nutella Blast", price: 32000, desc: "Freshmilk dengan nutella 7 vanilla icecream & cheese cream", tag: "FAVORIT" },
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
};

const formatRupiah = (n) => "Rp " + n.toLocaleString("id-ID");

// ─── CAFE PHOTOS (Google Maps) ──────────────────────────────────────────────
const CAFE_PHOTOS = [
  "/photo1.jpg",
  "/photo2.jpg",
  "/photo3.jpg",
  "/photo4.jpg",
  "/photo5.jpg",
  "/photo6.jpg",
];

// ─── SHARED STATE (simulate real-time via polling) ──────────────────────────
let sharedOrders = [];
let sharedMenu = Object.entries(MENU_DATA).flatMap(([cat, items]) =>
  items.map(item => ({ ...item, category: cat, available: true }))
);
let orderCounter = 1;

// ─── CUSTOMER APP ───────────────────────────────────────────────────────────
function CustomerApp({ onSwitch }) {
  const [activeCategory, setActiveCategory] = useState("Signature");
  const [cart, setCart] = useState([]);
  const [tableNumber, setTableNumber] = useState("");
  const [orderType, setOrderType] = useState("dine-in");
  const [page, setPage] = useState("home"); // home | menu | cart | success
  const [heroPhoto, setHeroPhoto] = useState(0);
  const [menuItems, setMenuItems] = useState(sharedMenu);
  const [note, setNote] = useState("");

  useEffect(() => {
    const t = setInterval(() => {
      setMenuItems([...sharedMenu]);
    }, 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setHeroPhoto(p => (p + 1) % CAFE_PHOTOS.length), 4000);
    return () => clearInterval(t);
  }, []);

  const addToCart = (item) => {
    setCart(prev => {
      const ex = prev.find(c => c.id === item.id);
      if (ex) return prev.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { ...item, qty: 1 }];
    });
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

  const placeOrder = () => {
    if (!tableNumber && orderType === "dine-in") return;
    const order = {
      id: orderCounter++,
      table: orderType === "dine-in" ? tableNumber : "Takeaway",
      items: [...cart],
      total: totalPrice,
      note,
      status: "pending",
      time: new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
      type: orderType,
    };
    sharedOrders = [order, ...sharedOrders];
    setCart([]);
    setNote("");
    setPage("success");
  };

  const categories = Object.keys(MENU_DATA);
  const currentItems = menuItems.filter(i => i.category === activeCategory);

  if (page === "home") return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#fff", fontFamily: "'Playfair Display', Georgia, serif" }}>
      {/* Hero */}
      <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        {CAFE_PHOTOS.map((src, i) => (
          <div key={i} style={{
            position: "absolute", inset: 0,
            backgroundImage: `url(${src})`,
            backgroundSize: "cover", backgroundPosition: "center",
            opacity: heroPhoto === i ? 1 : 0,
            transition: "opacity 1s ease",
            filter: "brightness(0.45)",
          }} />
        ))}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 30%, #0a0a0a 100%)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 24px", textAlign: "center" }}>
          <div style={{ fontSize: 11, letterSpacing: 6, color: "#c9a84c", marginBottom: 16, fontFamily: "sans-serif", fontWeight: 400 }}>SEJAK 2018 — PATI, JAWA TENGAH</div>
          <div style={{ fontSize: "clamp(48px, 10vw, 80px)", fontWeight: 700, lineHeight: 1, marginBottom: 8 }}>BROTHERHOOD</div>
          <div style={{ fontSize: "clamp(28px, 6vw, 48px)", fontStyle: "italic", color: "#c9a84c", marginBottom: 24 }}>Coffee & Co</div>
          <div style={{ fontSize: 13, color: "#aaa", maxWidth: 360, lineHeight: 1.7, fontFamily: "sans-serif", marginBottom: 40 }}>
            Tempat nongkrong favorit di Pati dengan suasana nyaman, kopi nikmat, dan menu lezat untuk setiap momen berharga Anda.
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <button onClick={() => setPage("menu")} style={{
              background: "#c9a84c", color: "#000", border: "none", padding: "14px 36px",
              fontSize: 13, letterSpacing: 3, fontFamily: "sans-serif", fontWeight: 700, cursor: "pointer",
              transition: "all 0.2s",
            }}>PESAN SEKARANG</button>
            <button onClick={onSwitch} style={{
              background: "transparent", color: "#c9a84c", border: "1px solid #c9a84c", padding: "14px 36px",
              fontSize: 13, letterSpacing: 3, fontFamily: "sans-serif", fontWeight: 700, cursor: "pointer",
            }}>KASIR DASHBOARD</button>
          </div>
        </div>
        {/* Photo dots */}
        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8 }}>
          {CAFE_PHOTOS.map((_, i) => (
            <div key={i} onClick={() => setHeroPhoto(i)} style={{
              width: heroPhoto === i ? 24 : 8, height: 8, borderRadius: 4,
              background: heroPhoto === i ? "#c9a84c" : "rgba(255,255,255,0.3)",
              cursor: "pointer", transition: "all 0.3s",
            }} />
          ))}
        </div>
      </div>

      {/* Info bar */}
      <div style={{ background: "#111", padding: "20px 24px", display: "flex", justifyContent: "center", gap: 40, flexWrap: "wrap" }}>
        {[["📍", "Jl. Penjawi No.8, Pati"], ["🕐", "10.00 – 23.00 WIB"], ["⭐", "4.5 Rating (1.438 ulasan)"]].map(([icon, text]) => (
          <div key={text} style={{ display: "flex", alignItems: "center", gap: 8, color: "#aaa", fontSize: 13, fontFamily: "sans-serif" }}>
            <span>{icon}</span><span>{text}</span>
          </div>
        ))}
      </div>
    </div>
  );

  if (page === "success") return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 24, padding: 32, textAlign: "center" }}>
      <div style={{ fontSize: 64 }}>✅</div>
      <div style={{ fontSize: 32, fontFamily: "'Playfair Display', serif", color: "#fff" }}>Pesanan Diterima!</div>
      <div style={{ color: "#aaa", fontFamily: "sans-serif", fontSize: 14, lineHeight: 1.7 }}>
        Pesananmu sedang diproses oleh kasir.<br />Silakan tunggu di meja kamu.
      </div>
      <div style={{ background: "#1a1a1a", border: "1px solid #333", padding: "20px 40px", borderRadius: 4 }}>
        <div style={{ color: "#c9a84c", fontSize: 12, letterSpacing: 3, fontFamily: "sans-serif", marginBottom: 8 }}>TOTAL PEMBAYARAN</div>
        <div style={{ fontSize: 28, color: "#fff", fontFamily: "'Playfair Display', serif" }}>{formatRupiah(totalPrice)}</div>
      </div>
      <button onClick={() => { setPage("home"); }} style={{
        background: "#c9a84c", color: "#000", border: "none", padding: "12px 32px",
        fontSize: 12, letterSpacing: 3, fontFamily: "sans-serif", fontWeight: 700, cursor: "pointer", marginTop: 8,
      }}>KEMBALI KE BERANDA</button>
    </div>
  );

  if (page === "cart") return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#fff", fontFamily: "sans-serif" }}>
      <div style={{ background: "#111", padding: "20px 24px", display: "flex", alignItems: "center", gap: 16, borderBottom: "1px solid #222" }}>
        <button onClick={() => setPage("menu")} style={{ background: "none", border: "none", color: "#c9a84c", fontSize: 20, cursor: "pointer" }}>←</button>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20 }}>Keranjang Pesanan</div>
      </div>
      <div style={{ padding: 24, maxWidth: 500, margin: "0 auto" }}>
        {/* Order type */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ color: "#888", fontSize: 11, letterSpacing: 2, marginBottom: 10 }}>TIPE PESANAN</div>
          <div style={{ display: "flex", gap: 10 }}>
            {["dine-in", "takeaway"].map(t => (
              <button key={t} onClick={() => setOrderType(t)} style={{
                flex: 1, padding: "10px", border: `1px solid ${orderType === t ? "#c9a84c" : "#333"}`,
                background: orderType === t ? "#c9a84c22" : "transparent", color: orderType === t ? "#c9a84c" : "#666",
                cursor: "pointer", fontSize: 12, letterSpacing: 2, textTransform: "uppercase",
              }}>{t === "dine-in" ? "Dine In" : "Takeaway"}</button>
            ))}
          </div>
        </div>
        {orderType === "dine-in" && (
          <div style={{ marginBottom: 20 }}>
            <div style={{ color: "#888", fontSize: 11, letterSpacing: 2, marginBottom: 10 }}>NOMOR MEJA</div>
            <input value={tableNumber} onChange={e => setTableNumber(e.target.value)}
              placeholder="Contoh: 5"
              style={{ width: "100%", background: "#1a1a1a", border: "1px solid #333", color: "#fff", padding: "12px 16px", fontSize: 14, outline: "none", boxSizing: "border-box" }} />
          </div>
        )}
        {/* Cart items */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ color: "#888", fontSize: 11, letterSpacing: 2, marginBottom: 10 }}>PESANAN KAMU ({totalItems} item)</div>
          {cart.length === 0 ? (
            <div style={{ color: "#555", textAlign: "center", padding: "40px 0" }}>Keranjang kosong</div>
          ) : cart.map(item => (
            <div key={item.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", borderBottom: "1px solid #1a1a1a" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, color: "#fff", marginBottom: 2 }}>{item.name}</div>
                <div style={{ fontSize: 12, color: "#c9a84c" }}>{formatRupiah(item.price)}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <button onClick={() => removeFromCart(item.id)} style={{ width: 28, height: 28, background: "#1a1a1a", border: "1px solid #333", color: "#fff", cursor: "pointer", fontSize: 16 }}>−</button>
                <span style={{ fontSize: 14, minWidth: 20, textAlign: "center" }}>{item.qty}</span>
                <button onClick={() => addToCart(item)} style={{ width: 28, height: 28, background: "#c9a84c", border: "none", color: "#000", cursor: "pointer", fontSize: 16, fontWeight: 700 }}>+</button>
              </div>
            </div>
          ))}
        </div>
        {/* Note */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ color: "#888", fontSize: 11, letterSpacing: 2, marginBottom: 10 }}>CATATAN (OPSIONAL)</div>
          <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Contoh: tanpa es, less sugar, dll"
            style={{ width: "100%", background: "#1a1a1a", border: "1px solid #333", color: "#fff", padding: "12px 16px", fontSize: 13, outline: "none", resize: "none", height: 80, boxSizing: "border-box" }} />
        </div>
        {/* Total & order */}
        <div style={{ background: "#111", border: "1px solid #222", padding: 20, marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", color: "#888", fontSize: 13, marginBottom: 8 }}>
            <span>Subtotal</span><span>{formatRupiah(totalPrice)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", color: "#fff", fontSize: 16, fontWeight: 700 }}>
            <span>Total</span><span style={{ color: "#c9a84c" }}>{formatRupiah(totalPrice)}</span>
          </div>
        </div>
        <button onClick={placeOrder} disabled={cart.length === 0 || (orderType === "dine-in" && !tableNumber)} style={{
          width: "100%", background: cart.length === 0 || (orderType === "dine-in" && !tableNumber) ? "#333" : "#c9a84c",
          color: "#000", border: "none", padding: "16px", fontSize: 13, letterSpacing: 3,
          fontWeight: 700, cursor: "pointer",
        }}>KIRIM PESANAN</button>
      </div>
    </div>
  );

  // Menu page
  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#fff" }}>
      {/* Header */}
      <div style={{ background: "#0f0f0f", borderBottom: "1px solid #1a1a1a", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 }}>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18 }}>Brotherhood</div>
          <div style={{ fontStyle: "italic", color: "#c9a84c", fontSize: 12 }}>Coffee & Co</div>
        </div>
        <button onClick={() => setPage("cart")} style={{
          background: "#c9a84c", border: "none", color: "#000", padding: "10px 20px",
          fontFamily: "sans-serif", fontSize: 12, letterSpacing: 2, fontWeight: 700, cursor: "pointer",
          display: "flex", alignItems: "center", gap: 8,
        }}>
          🛒 {totalItems > 0 ? `(${totalItems}) ${formatRupiah(totalPrice)}` : "KERANJANG"}
        </button>
      </div>

      <div style={{ display: "flex", height: "calc(100vh - 65px)" }}>
        {/* Category sidebar */}
        <div style={{ width: 130, background: "#0d0d0d", borderRight: "1px solid #1a1a1a", overflowY: "auto", flexShrink: 0 }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{
              width: "100%", padding: "14px 12px", background: activeCategory === cat ? "#1a1a1a" : "transparent",
              border: "none", borderLeft: activeCategory === cat ? "2px solid #c9a84c" : "2px solid transparent",
              color: activeCategory === cat ? "#c9a84c" : "#666",
              cursor: "pointer", textAlign: "left", fontSize: 11,
              fontFamily: "sans-serif", transition: "all 0.2s",
            }}>
              <div style={{ fontSize: 18, marginBottom: 4 }}>{CATEGORY_ICONS[cat]}</div>
              <div>{cat}</div>
            </button>
          ))}
        </div>

        {/* Menu items */}
        <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, marginBottom: 4 }}>{activeCategory}</div>
          <div style={{ color: "#555", fontSize: 12, fontFamily: "sans-serif", marginBottom: 20 }}>{currentItems.filter(i => i.available).length} menu tersedia</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {currentItems.map(item => {
              const inCart = cart.find(c => c.id === item.id);
              return (
                <div key={item.id} style={{
                  background: item.available ? "#111" : "#0d0d0d",
                  border: `1px solid ${item.available ? "#222" : "#1a1a1a"}`,
                  padding: "14px 16px", display: "flex", alignItems: "center", gap: 12,
                  opacity: item.available ? 1 : 0.5, transition: "all 0.2s",
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: 13, color: "#fff", fontFamily: "sans-serif" }}>{item.name}</span>
                      {item.tag && <span style={{ fontSize: 9, background: "#c9a84c", color: "#000", padding: "2px 6px", letterSpacing: 1, fontFamily: "sans-serif", fontWeight: 700 }}>{item.tag}</span>}
                      {!item.available && <span style={{ fontSize: 9, background: "#ff4444", color: "#fff", padding: "2px 6px", letterSpacing: 1, fontFamily: "sans-serif", fontWeight: 700 }}>HABIS</span>}
                    </div>
                    <div style={{ fontSize: 11, color: "#666", fontFamily: "sans-serif", marginBottom: 6, lineHeight: 1.4 }}>{item.desc}</div>
                    <div style={{ fontSize: 13, color: "#c9a84c", fontFamily: "sans-serif", fontWeight: 700 }}>{formatRupiah(item.price)}</div>
                  </div>
                  {item.available && (
                    inCart ? (
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <button onClick={() => removeFromCart(item.id)} style={{ width: 28, height: 28, background: "#1a1a1a", border: "1px solid #333", color: "#fff", cursor: "pointer" }}>−</button>
                        <span style={{ fontSize: 14, color: "#fff", minWidth: 20, textAlign: "center" }}>{inCart.qty}</span>
                        <button onClick={() => addToCart(item)} style={{ width: 28, height: 28, background: "#c9a84c", border: "none", color: "#000", cursor: "pointer", fontWeight: 700 }}>+</button>
                      </div>
                    ) : (
                      <button onClick={() => addToCart(item)} style={{
                        background: "transparent", border: "1px solid #c9a84c", color: "#c9a84c",
                        padding: "8px 14px", fontSize: 11, letterSpacing: 1, cursor: "pointer", fontFamily: "sans-serif",
                        whiteSpace: "nowrap",
                      }}>+ TAMBAH</button>
                    )
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── KASIR APP ───────────────────────────────────────────────────────────────
function KasirApp({ onSwitch }) {
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("orders"); // orders | menu
  const [menuItems, setMenuItems] = useState(sharedMenu);
  const [newMenuName, setNewMenuName] = useState("");
  const [newMenuPrice, setNewMenuPrice] = useState("");
  const [newMenuCat, setNewMenuCat] = useState("Snack");
  const [newMenuDesc, setNewMenuDesc] = useState("");
  const [newMenuImg, setNewMenuImg] = useState(null);
  const [prevCount, setPrevCount] = useState(0);
  const [notification, setNotification] = useState(null);
  const fileRef = useRef();

  useEffect(() => {
    const t = setInterval(() => {
      const newOrders = [...sharedOrders];
      if (newOrders.length > prevCount) {
        setNotification(`🔔 Pesanan baru masuk! Meja ${newOrders[0]?.table}`);
        setTimeout(() => setNotification(null), 3000);
        setPrevCount(newOrders.length);
      }
      setOrders(newOrders);
      setMenuItems([...sharedMenu]);
    }, 800);
    return () => clearInterval(t);
  }, [prevCount]);

  const updateOrderStatus = (id, status) => {
    sharedOrders = sharedOrders.map(o => o.id === id ? { ...o, status } : o);
    setOrders([...sharedOrders]);
  };

  const toggleAvailable = (id) => {
    sharedMenu = sharedMenu.map(m => m.id === id ? { ...m, available: !m.available } : m);
    setMenuItems([...sharedMenu]);
  };

  const addNewMenu = () => {
    if (!newMenuName || !newMenuPrice) return;
    const newItem = {
      id: Date.now(), name: newMenuName, price: parseInt(newMenuPrice),
      desc: newMenuDesc, category: newMenuCat, available: true, tag: "NEW",
      image: newMenuImg,
    };
    sharedMenu = [...sharedMenu, newItem];
    setMenuItems([...sharedMenu]);
    setNewMenuName(""); setNewMenuPrice(""); setNewMenuDesc(""); setNewMenuImg(null);
  };

  const pendingOrders = orders.filter(o => o.status === "pending");
  const processOrders = orders.filter(o => o.status === "process");
  const doneOrders = orders.filter(o => o.status === "done");
  const todayRevenue = orders.filter(o => o.status === "done").reduce((s, o) => s + o.total, 0);

  const statusColor = { pending: "#ff9f43", process: "#54a0ff", done: "#1dd1a1" };
  const statusLabel = { pending: "Menunggu", process: "Diproses", done: "Selesai" };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "#fff", fontFamily: "sans-serif" }}>
      {/* Notification */}
      {notification && (
        <div style={{
          position: "fixed", top: 20, right: 20, zIndex: 999,
          background: "#c9a84c", color: "#000", padding: "14px 24px",
          fontWeight: 700, fontSize: 14, borderRadius: 2,
          animation: "slideIn 0.3s ease",
        }}>{notification}</div>
      )}

      {/* Header */}
      <div style={{ background: "#0f0f0f", borderBottom: "1px solid #1a1a1a", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: 1 }}>KASIR DASHBOARD</div>
          <div style={{ fontSize: 11, color: "#c9a84c", letterSpacing: 2 }}>BROTHERHOOD COFFEE & CO</div>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ fontSize: 12, color: "#666" }}>{new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long" })}</div>
          <button onClick={onSwitch} style={{ background: "#c9a84c", border: "none", color: "#000", padding: "8px 16px", fontSize: 11, letterSpacing: 2, fontWeight: 700, cursor: "pointer" }}>
            CUSTOMER VIEW
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: "#1a1a1a", borderBottom: "1px solid #1a1a1a" }}>
        {[
          ["PENDING", pendingOrders.length, "#ff9f43"],
          ["DIPROSES", processOrders.length, "#54a0ff"],
          ["SELESAI", doneOrders.length, "#1dd1a1"],
          ["REVENUE HARI INI", formatRupiah(todayRevenue), "#c9a84c"],
        ].map(([label, val, color]) => (
          <div key={label} style={{ background: "#0f0f0f", padding: "20px 24px", textAlign: "center" }}>
            <div style={{ fontSize: 22, fontWeight: 700, color, marginBottom: 4 }}>{val}</div>
            <div style={{ fontSize: 10, color: "#555", letterSpacing: 2 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid #1a1a1a" }}>
        {[["orders", "📋 PESANAN MASUK"], ["menu", "🍽️ KELOLA MENU"]].map(([tab, label]) => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            padding: "14px 28px", background: "transparent",
            border: "none", borderBottom: activeTab === tab ? "2px solid #c9a84c" : "2px solid transparent",
            color: activeTab === tab ? "#c9a84c" : "#666", cursor: "pointer", fontSize: 12, letterSpacing: 2, fontWeight: 700,
          }}>{label}</button>
        ))}
      </div>

      {activeTab === "orders" && (
        <div style={{ padding: 24 }}>
          {orders.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "#444" }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>📋</div>
              <div>Belum ada pesanan masuk</div>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
              {orders.map(order => (
                <div key={order.id} style={{ background: "#111", border: `1px solid ${statusColor[order.status]}33`, borderTop: `3px solid ${statusColor[order.status]}` }}>
                  <div style={{ padding: "14px 16px", borderBottom: "1px solid #1a1a1a", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 700 }}>#{order.id.toString().padStart(3, "0")} — {order.type === "dine-in" ? `Meja ${order.table}` : "Takeaway"}</div>
                      <div style={{ fontSize: 11, color: "#666", marginTop: 2 }}>{order.time}</div>
                    </div>
                    <span style={{ fontSize: 10, background: statusColor[order.status] + "22", color: statusColor[order.status], padding: "4px 10px", letterSpacing: 1, fontWeight: 700, border: `1px solid ${statusColor[order.status]}44` }}>
                      {statusLabel[order.status]}
                    </span>
                  </div>
                  <div style={{ padding: "12px 16px" }}>
                    {order.items.map((item, i) => (
                      <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: "#ccc", padding: "4px 0", borderBottom: "1px solid #1a1a1a" }}>
                        <span>{item.qty}x {item.name}</span>
                        <span style={{ color: "#888" }}>{formatRupiah(item.price * item.qty)}</span>
                      </div>
                    ))}
                    {order.note && <div style={{ fontSize: 11, color: "#888", marginTop: 8, fontStyle: "italic" }}>📝 {order.note}</div>}
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, paddingTop: 10, borderTop: "1px solid #222" }}>
                      <span style={{ fontSize: 12, color: "#888" }}>TOTAL</span>
                      <span style={{ fontSize: 14, color: "#c9a84c", fontWeight: 700 }}>{formatRupiah(order.total)}</span>
                    </div>
                  </div>
                  <div style={{ padding: "10px 16px", display: "flex", gap: 8 }}>
                    {order.status === "pending" && (
                      <button onClick={() => updateOrderStatus(order.id, "process")} style={{
                        flex: 1, background: "#54a0ff22", border: "1px solid #54a0ff44", color: "#54a0ff",
                        padding: "8px", fontSize: 11, letterSpacing: 1, cursor: "pointer", fontWeight: 700,
                      }}>✓ PROSES</button>
                    )}
                    {order.status === "process" && (
                      <button onClick={() => updateOrderStatus(order.id, "done")} style={{
                        flex: 1, background: "#1dd1a122", border: "1px solid #1dd1a144", color: "#1dd1a1",
                        padding: "8px", fontSize: 11, letterSpacing: 1, cursor: "pointer", fontWeight: 700,
                      }}>✓ SELESAI</button>
                    )}
                    {order.status === "done" && (
                      <button style={{
                        flex: 1, background: "#c9a84c22", border: "1px solid #c9a84c44", color: "#c9a84c",
                        padding: "8px", fontSize: 11, letterSpacing: 1, cursor: "pointer", fontWeight: 700,
                      }}>🖨️ PRINT STRUK</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "menu" && (
        <div style={{ padding: 24, display: "grid", gridTemplateColumns: "1fr 340px", gap: 24 }}>
          {/* Menu list */}
          <div>
            <div style={{ fontSize: 12, color: "#888", letterSpacing: 2, marginBottom: 16 }}>SEMUA MENU ({menuItems.length} item)</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: "70vh", overflowY: "auto" }}>
              {menuItems.map(item => (
                <div key={item.id} style={{
                  background: "#111", border: `1px solid ${item.available ? "#222" : "#1a1a1a"}`,
                  padding: "12px 16px", display: "flex", alignItems: "center", gap: 12,
                  opacity: item.available ? 1 : 0.6,
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 2 }}>
                      <span style={{ fontSize: 13 }}>{item.name}</span>
                      <span style={{ fontSize: 9, color: "#666", background: "#1a1a1a", padding: "1px 6px" }}>{item.category}</span>
                    </div>
                    <div style={{ fontSize: 12, color: "#c9a84c" }}>{formatRupiah(item.price)}</div>
                  </div>
                  <button onClick={() => toggleAvailable(item.id)} style={{
                    padding: "6px 14px", fontSize: 10, letterSpacing: 1, cursor: "pointer", fontWeight: 700,
                    background: item.available ? "#ff444422" : "#1dd1a122",
                    border: `1px solid ${item.available ? "#ff444444" : "#1dd1a144"}`,
                    color: item.available ? "#ff4444" : "#1dd1a1",
                  }}>{item.available ? "SOLD OUT" : "AKTIFKAN"}</button>
                </div>
              ))}
            </div>
          </div>

          {/* Add new menu */}
          <div style={{ background: "#111", border: "1px solid #1a1a1a", padding: 24, height: "fit-content" }}>
            <div style={{ fontSize: 12, color: "#c9a84c", letterSpacing: 2, marginBottom: 20, fontWeight: 700 }}>+ TAMBAH MENU BARU</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <div style={{ fontSize: 10, color: "#666", letterSpacing: 1, marginBottom: 6 }}>NAMA MENU *</div>
                <input value={newMenuName} onChange={e => setNewMenuName(e.target.value)} placeholder="Nama menu baru"
                  style={{ width: "100%", background: "#0a0a0a", border: "1px solid #222", color: "#fff", padding: "10px 12px", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
              </div>
              <div>
                <div style={{ fontSize: 10, color: "#666", letterSpacing: 1, marginBottom: 6 }}>HARGA *</div>
                <input value={newMenuPrice} onChange={e => setNewMenuPrice(e.target.value)} placeholder="25000" type="number"
                  style={{ width: "100%", background: "#0a0a0a", border: "1px solid #222", color: "#fff", padding: "10px 12px", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
              </div>
              <div>
                <div style={{ fontSize: 10, color: "#666", letterSpacing: 1, marginBottom: 6 }}>KATEGORI</div>
                <select value={newMenuCat} onChange={e => setNewMenuCat(e.target.value)}
                  style={{ width: "100%", background: "#0a0a0a", border: "1px solid #222", color: "#fff", padding: "10px 12px", fontSize: 13, outline: "none", boxSizing: "border-box" }}>
                  {Object.keys(MENU_DATA).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div>
                <div style={{ fontSize: 10, color: "#666", letterSpacing: 1, marginBottom: 6 }}>DESKRIPSI</div>
                <textarea value={newMenuDesc} onChange={e => setNewMenuDesc(e.target.value)} placeholder="Deskripsi singkat menu"
                  style={{ width: "100%", background: "#0a0a0a", border: "1px solid #222", color: "#fff", padding: "10px 12px", fontSize: 13, outline: "none", resize: "none", height: 60, boxSizing: "border-box" }} />
              </div>
              <div>
                <div style={{ fontSize: 10, color: "#666", letterSpacing: 1, marginBottom: 6 }}>FOTO MENU</div>
                <input ref={fileRef} type="file" accept="image/*" onChange={e => {
                  const f = e.target.files[0];
                  if (f) { const r = new FileReader(); r.onload = ev => setNewMenuImg(ev.target.result); r.readAsDataURL(f); }
                }} style={{ display: "none" }} />
                <button onClick={() => fileRef.current.click()} style={{
                  width: "100%", background: "#0a0a0a", border: "1px dashed #333", color: "#666",
                  padding: "20px", cursor: "pointer", fontSize: 12,
                }}>
                  {newMenuImg ? <img src={newMenuImg} alt="" style={{ width: "100%", height: 80, objectFit: "cover" }} /> : "📷 Upload Foto Menu"}
                </button>
              </div>
              <button onClick={addNewMenu} style={{
                background: "#c9a84c", border: "none", color: "#000", padding: "12px",
                fontSize: 12, letterSpacing: 2, fontWeight: 700, cursor: "pointer",
              }}>TAMBAH MENU</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── ROOT ────────────────────────────────────────────────────────────────────
function App() {
  const [view, setView] = useState("customer");
  return view === "customer"
    ? <CustomerApp onSwitch={() => setView("kasir")} />
    : <KasirApp onSwitch={() => setView("customer")} />;
}

ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App));

