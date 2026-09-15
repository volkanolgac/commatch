import { LevelCategory, ItemDef } from '../types/game';

// =========================================================================
// HAND-CRAFTED CORE CATEGORIES (Levels 1 to 15)
// =========================================================================
const BASE_CATEGORIES: LevelCategory[] = [
  // LEVEL 1 — 🌱 DOĞA (Nature) [8 Items] - Kolay / Başlangıç
  {
    id: 'nature_1',
    levelNumber: 1,
    name: 'Doğa',
    titleTr: '🌱 DOĞA',
    icon: '🌱',
    themeColor: 'emerald',
    gradientFrom: 'from-emerald-500',
    gradientTo: 'to-teal-600',
    badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40',
    baseItemIds: ['seed', 'water', 'sun'],
    items: [
      { id: 'seed', name: 'Tohum', icon: '🌱', tier: 1, isBase: true, description: 'Yaşamın başlangıcı' },
      { id: 'water', name: 'Su', icon: '💧', tier: 1, isBase: true, description: 'Saf hayat kaynağı' },
      { id: 'sun', name: 'Güneş', icon: '☀️', tier: 1, isBase: true, description: 'Isı ve ışık enerjisi' },
      { id: 'flower', name: 'Çiçek', icon: '🌷', tier: 2, description: 'Tohum ve suyun meyvesi' },
      { id: 'apple', name: 'Elma', icon: '🍎', tier: 2, description: 'Lezzetli kırmızı elma' },
      { id: 'tree', name: 'Ağaç', icon: '🌳', tier: 3, description: 'Büyüyen görkemli ağaç' },
      { id: 'exotic_flower', name: 'Egzotik Çiçek', icon: '🌺', tier: 3, description: 'Nadir tropik güzellik' },
      { id: 'palm_tree', name: 'Palmiye', icon: '🌴', tier: 4, description: 'Güneşin altındaki vaha' },
    ],
    recipes: [
      { a: 'seed', b: 'water', result: 'flower' },
      { a: 'flower', b: 'sun', result: 'tree' },
      { a: 'tree', b: 'water', result: 'apple' },
      { a: 'flower', b: 'flower', result: 'exotic_flower' },
      { a: 'tree', b: 'sun', result: 'palm_tree' },
      { a: 'seed', b: 'sun', result: 'flower' },
      { a: 'water', b: 'sun', result: 'flower' },
      { a: 'apple', b: 'sun', result: 'palm_tree' },
    ],
  },

  // LEVEL 2 — 🪵 EV & MOBİLYA (Home & Furniture) [8 Items]
  {
    id: 'home_1',
    levelNumber: 2,
    name: 'Ev & Mobilya',
    titleTr: '🪵 EV & MOBİLYA',
    icon: '🪵',
    themeColor: 'amber',
    gradientFrom: 'from-amber-500',
    gradientTo: 'to-orange-600',
    badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
    baseItemIds: ['wood', 'screw', 'stone'],
    items: [
      { id: 'wood', name: 'Odun', icon: '🪵', tier: 1, isBase: true, description: 'Sağlam doğal kereste' },
      { id: 'screw', name: 'Vida', icon: '🔩', tier: 1, isBase: true, description: 'Metal tutturucu vida' },
      { id: 'stone', name: 'Taş', icon: '🪨', tier: 1, isBase: true, description: 'Sert yapı taşı' },
      { id: 'chair', name: 'Sandalye', icon: '🪑', tier: 2, description: 'Odun ve vidanın uyumu' },
      { id: 'sofa', name: 'Koltuk', icon: '🛋️', tier: 3, description: 'Yumuşak konforlu kanepe' },
      { id: 'bed', name: 'Yatak', icon: '🛏️', tier: 3, description: 'Huzurlu uyku alanı' },
      { id: 'wooden_house', name: 'Ahşap Ev', icon: '🏠', tier: 4, description: 'Sıcak şirin ahşap ev' },
      { id: 'mansion', name: 'Malikane', icon: '🏡', tier: 5, description: 'Görkemli lüks malikane' },
    ],
    recipes: [
      { a: 'wood', b: 'screw', result: 'chair' },
      { a: 'chair', b: 'chair', result: 'sofa' },
      { a: 'wood', b: 'stone', result: 'bed' },
      { a: 'wood', b: 'sofa', result: 'wooden_house' },
      { a: 'wooden_house', b: 'wooden_house', result: 'mansion' },
      { a: 'bed', b: 'chair', result: 'wooden_house' },
      { a: 'stone', b: 'screw', result: 'chair' },
      { a: 'stone', b: 'wooden_house', result: 'mansion' },
    ],
  },

  // LEVEL 3 — ⚙️ TEKNOLOJİ (Tech) [8 Items]
  {
    id: 'tech_1',
    levelNumber: 3,
    name: 'Teknoloji',
    titleTr: '⚙️ TEKNOLOJİ',
    icon: '⚙️',
    themeColor: 'cyan',
    gradientFrom: 'from-cyan-500',
    gradientTo: 'to-blue-600',
    badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40',
    baseItemIds: ['gear', 'fire', 'magnet'],
    items: [
      { id: 'gear', name: 'Dişli', icon: '⚙️', tier: 1, isBase: true, description: 'Mekanik hassas çark' },
      { id: 'fire', name: 'Ateş', icon: '🔥', tier: 1, isBase: true, description: 'Termal enerji kaynağı' },
      { id: 'magnet', name: 'Mıknatıs', icon: '🧲', tier: 1, isBase: true, description: 'Manyetik çekim gücü' },
      { id: 'wrench', name: 'Alet', icon: '🔧', tier: 2, description: 'Makineleri onaran anahtar' },
      { id: 'lightbulb', name: 'Ampul', icon: '💡', tier: 2, description: 'Aydınlatan parlak fikir' },
      { id: 'battery', name: 'Batarya', icon: '🔋', tier: 3, description: 'Depolanmış elektrik gücü' },
      { id: 'robot', name: 'Robot', icon: '🤖', tier: 4, description: 'Akıllı mekanik asistan' },
      { id: 'rocket', name: 'Roket', icon: '🚀', tier: 5, description: 'Yıldızlara uzanan roket' },
    ],
    recipes: [
      { a: 'gear', b: 'fire', result: 'wrench' },
      { a: 'gear', b: 'magnet', result: 'lightbulb' },
      { a: 'lightbulb', b: 'wrench', result: 'battery' },
      { a: 'gear', b: 'battery', result: 'robot' },
      { a: 'robot', b: 'fire', result: 'rocket' },
      { a: 'wrench', b: 'battery', result: 'robot' },
      { a: 'fire', b: 'magnet', result: 'lightbulb' },
      { a: 'battery', b: 'rocket', result: 'rocket' },
    ],
  },

  // LEVEL 4 — 🚗 ULAŞIM (Vehicles) [8 Items]
  {
    id: 'vehicles_1',
    levelNumber: 4,
    name: 'Ulaşım',
    titleTr: '🚗 ULAŞIM',
    icon: '🚗',
    themeColor: 'rose',
    gradientFrom: 'from-rose-500',
    gradientTo: 'to-red-600',
    badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-400/40',
    baseItemIds: ['wheel', 'fuel'],
    items: [
      { id: 'wheel', name: 'Tekerlek', icon: '🛞', tier: 1, isBase: true, description: 'Dönen kauçuk tekerlek' },
      { id: 'fuel', name: 'Yakıt', icon: '⛽', tier: 1, isBase: true, description: 'Saf hareket enerjisi' },
      { id: 'bicycle', name: 'Bisiklet', icon: '🚲', tier: 2, description: 'İki tekerlekli çevre dostu araç' },
      { id: 'scooter', name: 'Motor', icon: '🛵', tier: 3, description: 'Seri şehir motoru' },
      { id: 'car', name: 'Araba', icon: '🚗', tier: 3, description: 'Dört tekerlekli konforlu otomobil' },
      { id: 'train', name: 'Tren', icon: '🚂', tier: 4, description: 'Raylar üzerinde güçlü lokomotif' },
      { id: 'boat', name: 'Gemi', icon: '⛵', tier: 4, description: 'Denizleri aşan yelkenli gemi' },
      { id: 'airplane', name: 'Uçak', icon: '✈️', tier: 5, description: 'Bulutların üstünde uçan jet' },
    ],
    recipes: [
      { a: 'wheel', b: 'wheel', result: 'bicycle' },
      { a: 'bicycle', b: 'fuel', result: 'scooter' },
      { a: 'scooter', b: 'wheel', result: 'car' },
      { a: 'car', b: 'fuel', result: 'train' },
      { a: 'car', b: 'wheel', result: 'boat' },
      { a: 'train', b: 'fuel', result: 'airplane' },
      { a: 'wheel', b: 'fuel', result: 'bicycle' },
      { a: 'boat', b: 'train', result: 'airplane' },
    ],
  },

  // LEVEL 5 — 🧸 EĞLENCE & OYUNCAK (Toys & Fun) [8 Items]
  {
    id: 'toys_1',
    levelNumber: 5,
    name: 'Oyuncak & Eğlence',
    titleTr: '🧸 OYUNCAK & EĞLENCE',
    icon: '🧸',
    themeColor: 'purple',
    gradientFrom: 'from-purple-500',
    gradientTo: 'to-fuchsia-600',
    badgeBg: 'bg-purple-500/20 text-purple-300 border-purple-400/40',
    baseItemIds: ['balloon', 'thread'],
    items: [
      { id: 'balloon', name: 'Balon', icon: '🎈', tier: 1, isBase: true, description: 'Uçuşan renkli balon' },
      { id: 'thread', name: 'İplik', icon: '🧵', tier: 1, isBase: true, description: 'İnce esnek bağlayıcı iplik' },
      { id: 'teddy', name: 'Ayıcık', icon: '🧸', tier: 2, description: 'Sevimli peluş ayıcık' },
      { id: 'yoyo', name: 'Yoyo', icon: '🪀', tier: 2, description: 'İple dönen eğlenceli oyuncak' },
      { id: 'kite', name: 'Uçurtma', icon: '🪁', tier: 3, description: 'Gökyüzünde süzülen uçurtma' },
      { id: 'gift_box', name: 'Hediye Kutusu', icon: '🎁', tier: 3, description: 'Sürprizlerle dolu kutu' },
      { id: 'circus', name: 'Sirk', icon: '🎪', tier: 4, description: 'Kahkaha dolu büyülü sirk' },
      { id: 'ferris_wheel', name: 'Dönme Dolap', icon: '🎡', tier: 5, description: 'Panoramik dev eğlence çarkı' },
    ],
    recipes: [
      { a: 'balloon', b: 'thread', result: 'kite' },
      { a: 'thread', b: 'thread', result: 'teddy' },
      { a: 'teddy', b: 'thread', result: 'yoyo' },
      { a: 'teddy', b: 'balloon', result: 'gift_box' },
      { a: 'kite', b: 'gift_box', result: 'circus' },
      { a: 'gift_box', b: 'circus', result: 'ferris_wheel' },
      { a: 'balloon', b: 'balloon', result: 'kite' },
      { a: 'circus', b: 'circus', result: 'ferris_wheel' },
    ],
  },

  // LEVEL 6 — 🌿 VAHŞİ DOĞA (Wild Flora) [16 Items]
  {
    id: 'wild_nature',
    levelNumber: 6,
    name: 'Vahşi Doğa',
    titleTr: '🌿 VAHŞİ DOĞA',
    icon: '🌿',
    themeColor: 'emerald',
    gradientFrom: 'from-emerald-600',
    gradientTo: 'to-green-500',
    badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40',
    baseItemIds: ['leaf', 'rain', 'lightning'],
    items: [
      { id: 'leaf', name: 'Kuru Yaprak', icon: '🍂', tier: 1, isBase: true, description: 'Rüzgarla süzülen altın yaprak' },
      { id: 'rain', name: 'Yağmur', icon: '🌧️', tier: 1, isBase: true, description: 'Toprağı canlandıran yağmur' },
      { id: 'lightning', name: 'Yıldırım', icon: '⚡', tier: 1, isBase: true, description: 'Gökyüzünün saf kıvılcımı' },
      { id: 'mushroom', name: 'Mantar', icon: '🍄', tier: 2, description: 'Nemli orman tabanında açan mantar' },
      { id: 'cactus', name: 'Kaktüs', icon: '🌵', tier: 2, description: 'Çölün dayanıklı dikenli bitkisi' },
      { id: 'wheat', name: 'Buğday', icon: '🌾', tier: 2, description: 'Altın sarısı bereketli başak' },
      { id: 'clover', name: 'Yonca', icon: '🍀', tier: 2, description: 'Şans getiren dört yapraklı yonca' },
      { id: 'bamboo', name: 'Bambu', icon: '🎋', tier: 3, description: 'Hızla uzayan yeşil bambu' },
      { id: 'sunflower', name: 'Ayçiçeği', icon: '🌻', tier: 3, description: 'Güneşe dönen neşeli çiçek' },
      { id: 'grapes', name: 'Üzüm Bağı', icon: '🍇', tier: 3, description: 'Salkım salkım tatlı üzüm' },
      { id: 'strawberry', name: 'Çilek', icon: '🍓', tier: 3, description: 'Mis kokulu taze dağ çileği' },
      { id: 'pine', name: 'Çam Ağacı', icon: '🌲', tier: 4, description: 'Dört mevsim yeşil kalan ulu çam' },
      { id: 'mountain', name: 'Karlı Zirve', icon: '🏔️', tier: 4, description: 'Bulutları delen karlı dağ' },
      { id: 'volcano', name: 'Volkan', icon: '🌋', tier: 5, description: 'Lav püskürten canlı yanardağ' },
      { id: 'rainbow_nature', name: 'Gökkuşağı', icon: '🌈', tier: 5, description: 'Fırtına sonrası parlayan renkler' },
      { id: 'tornado', name: 'Kasırga', icon: '🌪️', tier: 6, description: 'Doğanın karşı konulamaz gücü' },
    ],
    recipes: [
      { a: 'leaf', b: 'rain', result: 'mushroom' },
      { a: 'leaf', b: 'leaf', result: 'wheat' },
      { a: 'wheat', b: 'rain', result: 'clover' },
      { a: 'leaf', b: 'lightning', result: 'cactus' },
      { a: 'clover', b: 'rain', result: 'bamboo' },
      { a: 'wheat', b: 'lightning', result: 'sunflower' },
      { a: 'sunflower', b: 'rain', result: 'grapes' },
      { a: 'grapes', b: 'clover', result: 'strawberry' },
      { a: 'bamboo', b: 'sunflower', result: 'pine' },
      { a: 'grapes', b: 'strawberry', result: 'mountain' },
      { a: 'mountain', b: 'lightning', result: 'volcano' },
      { a: 'pine', b: 'mountain', result: 'rainbow_nature' },
      { a: 'volcano', b: 'rainbow_nature', result: 'tornado' },
    ],
  },

  // LEVEL 7 — 🏰 SARAY & MİMARİ (Palaces & Architecture) [16 Items]
  {
    id: 'architecture',
    levelNumber: 7,
    name: 'Saray & Mimari',
    titleTr: '🏰 SARAY & MİMARİ',
    icon: '🏰',
    themeColor: 'amber',
    gradientFrom: 'from-amber-600',
    gradientTo: 'to-yellow-500',
    badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
    baseItemIds: ['brick', 'axe_tool', 'gold_coin'],
    items: [
      { id: 'brick', name: 'Tuğla', icon: '🧱', tier: 1, isBase: true, description: 'Sağlam fırınlanmış kil tuğla' },
      { id: 'axe_tool', name: 'Marangoz Baltası', icon: '🪓', tier: 1, isBase: true, description: 'Şekil veren usta aleti' },
      { id: 'gold_coin', name: 'Altın Sikke', icon: '🪙', tier: 1, isBase: true, description: 'İhtişamlı yapıların sermayesi' },
      { id: 'door', name: 'Ahşap Kapı', icon: '🚪', tier: 2, description: 'Girişleri koruyan sağlam kapı' },
      { id: 'window', name: 'Vitray Pencere', icon: '🪟', tier: 2, description: 'Işığı süzen renkli cam' },
      { id: 'lantern', name: 'Fener', icon: '🏮', tier: 2, description: 'Geceleri aydınlatan fener' },
      { id: 'ladder', name: 'Merdiven', icon: '🪜', tier: 2, description: 'Yükseklere tırmanma basamağı' },
      { id: 'mirror', name: 'Altın Ayna', icon: '🪞', tier: 3, description: 'Zarafeti yansıtan süslü ayna' },
      { id: 'bathtub', name: 'Mermer Küvet', icon: '🛁', tier: 3, description: 'Saray banyosuna layık mermer küvet' },
      { id: 'statue', name: 'Heykel', icon: '🗿', tier: 3, description: 'Usta heykeltıraşın eseri' },
      { id: 'fountain', name: 'Fıskiye', icon: '⛲', tier: 3, description: 'Saray bahçesinde şırıldayan su' },
      { id: 'temple', name: 'Antik Tapınak', icon: '🏛️', tier: 4, description: 'Mermer sütunlu görkemli mabet' },
      { id: 'mosque', name: 'Kubbeli Yapı', icon: '🕌', tier: 4, description: 'Mimarinin zirve noktası' },
      { id: 'tower', name: 'Gözetleme Kulesi', icon: '🗼', tier: 5, description: 'Göğe uzanan heybetli kule' },
      { id: 'grand_castle', name: 'Krallık Şatosu', icon: '🏰', tier: 5, description: 'Hükümdarların taht kurduğu kale' },
      { id: 'future_city', name: 'Metropol Şehir', icon: '🏙️', tier: 6, description: 'Işıklar saçan geleceğin kenti' },
    ],
    recipes: [
      { a: 'brick', b: 'axe_tool', result: 'door' },
      { a: 'brick', b: 'brick', result: 'window' },
      { a: 'axe_tool', b: 'axe_tool', result: 'ladder' },
      { a: 'gold_coin', b: 'window', result: 'lantern' },
      { a: 'window', b: 'gold_coin', result: 'mirror' },
      { a: 'brick', b: 'mirror', result: 'bathtub' },
      { a: 'brick', b: 'gold_coin', result: 'statue' },
      { a: 'statue', b: 'bathtub', result: 'fountain' },
      { a: 'mirror', b: 'statue', result: 'temple' },
      { a: 'ladder', b: 'fountain', result: 'mosque' },
      { a: 'temple', b: 'temple', result: 'tower' },
      { a: 'mosque', b: 'mosque', result: 'grand_castle' },
      { a: 'tower', b: 'grand_castle', result: 'future_city' },
    ],
  },

  // LEVEL 8 — 💻 SİBER & BİLİM (Cyber & Science) [16 Items]
  {
    id: 'cyber_tech',
    levelNumber: 8,
    name: 'Siber & Bilim',
    titleTr: '💻 SİBER & BİLİM',
    icon: '💻',
    themeColor: 'cyan',
    gradientFrom: 'from-cyan-600',
    gradientTo: 'to-indigo-600',
    badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40',
    baseItemIds: ['plug', 'floppy', 'test_tube'],
    items: [
      { id: 'plug', name: 'Güç Kablosu', icon: '🔌', tier: 1, isBase: true, description: 'Elektrik akımı taşıyıcı kablo' },
      { id: 'floppy', name: 'Veri Diski', icon: '💾', tier: 1, isBase: true, description: 'Kod ve yazılım kayıt diski' },
      { id: 'test_tube', name: 'Kimya Tüpü', icon: '🧪', tier: 1, isBase: true, description: 'Laboratuvar reaktifi' },
      { id: 'microchip', name: 'Mikroçip', icon: '📟', tier: 2, description: 'Milyonlarca transistörlü işlemci' },
      { id: 'smartphone', name: 'Akıllı Telefon', icon: '📱', tier: 2, description: 'Cepte taşınan süper bilgisayar' },
      { id: 'laptop', name: 'Dizüstü Bilgisayar', icon: '💻', tier: 2, description: 'Yüksek performanslı çalışma istasyonu' },
      { id: 'headphones', name: 'Kulaklık', icon: '🎧', tier: 2, description: 'Kristal netliğinde ses donanımı' },
      { id: 'joystick', name: 'Oyun Konsolu', icon: '🎮', tier: 3, description: 'Eğlence ve simülasyon kontrolcüsü' },
      { id: 'satellite_dish', name: 'Uydu Anteni', icon: '📡', tier: 3, description: 'Uzay sinyali alıcısı' },
      { id: 'supercomputer', name: 'Süper Sunucu', icon: '🖥️', tier: 3, description: 'Kuantum düzeyinde işlem gücü' },
      { id: 'microscope', name: 'Mikroskop', icon: '🔬', tier: 3, description: 'Hücreleri inceleyen optik cihaz' },
      { id: 'telescope', name: 'Dev Teleskop', icon: '🔭', tier: 4, description: 'Derin uzayı gözleyen mercek' },
      { id: 'vr_goggles', name: 'VR Gözlük', icon: '🥽', tier: 4, description: 'Sanal evrene açılan vizör' },
      { id: 'orbit_satellite', name: 'Yörünge Uydusu', icon: '🛰️', tier: 5, description: 'Dünyayı saran iletişim uydusu' },
      { id: 'dna_ai', name: 'Yapay Zeka Çekirdeği', icon: '🧬', tier: 5, description: 'Biyo-sentetik kuantum zeka' },
      { id: 'ufo_cyber', name: 'Galaktik Keşif Gemisi', icon: '🛸', tier: 6, description: 'Işık hızında seyahat aracı' },
    ],
    recipes: [
      { a: 'plug', b: 'floppy', result: 'microchip' },
      { a: 'microchip', b: 'plug', result: 'smartphone' },
      { a: 'smartphone', b: 'floppy', result: 'laptop' },
      { a: 'plug', b: 'plug', result: 'headphones' },
      { a: 'laptop', b: 'headphones', result: 'joystick' },
      { a: 'floppy', b: 'test_tube', result: 'microscope' },
      { a: 'microchip', b: 'laptop', result: 'supercomputer' },
      { a: 'supercomputer', b: 'plug', result: 'satellite_dish' },
      { a: 'supercomputer', b: 'satellite_dish', result: 'telescope' },
      { a: 'joystick', b: 'microscope', result: 'vr_goggles' },
      { a: 'telescope', b: 'supercomputer', result: 'orbit_satellite' },
      { a: 'vr_goggles', b: 'microscope', result: 'dna_ai' },
      { a: 'orbit_satellite', b: 'dna_ai', result: 'ufo_cyber' },
    ],
  },

  // LEVEL 9 — 🚀 AĞIR ULAŞIM (Heavy Transit) [16 Items]
  {
    id: 'heavy_transit',
    levelNumber: 9,
    name: 'Ağır Ulaşım',
    titleTr: '🚀 AĞIR ULAŞIM',
    icon: '🚀',
    themeColor: 'rose',
    gradientFrom: 'from-rose-600',
    gradientTo: 'to-indigo-600',
    badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-400/40',
    baseItemIds: ['compass', 'oil_drum', 'parachute'],
    items: [
      { id: 'compass', name: 'Pusula', icon: '🧭', tier: 1, isBase: true, description: 'Kuzeyi gösteren manyetik ibre' },
      { id: 'oil_drum', name: 'Yakıt Varili', icon: '🛢️', tier: 1, isBase: true, description: 'Yüksek oktanlı ağır yakıt' },
      { id: 'parachute', name: 'Paraşüt', icon: '🪂', tier: 1, isBase: true, description: 'Havadaki güvenli iniş kanadı' },
      { id: 'skateboard', name: 'Kaykay', icon: '🛹', tier: 2, description: 'Hızlı sokak tahtası' },
      { id: 'tractor', name: 'Traktör', icon: '🚜', tier: 2, description: 'Tarlaları süren güçlü iş makinesi' },
      { id: 'helicopter', name: 'Helikopter', icon: '🚁', tier: 2, description: 'Döner kanatlı hava aracı' },
      { id: 'bus', name: 'Şehir Otobüsü', icon: '🚌', tier: 2, description: 'Yolcuları taşıyan toplu taşıma' },
      { id: 'racecar', name: 'Yarış Arabası', icon: '🏎️', tier: 3, description: 'Pistlerin hız canavarı' },
      { id: 'truck', name: 'Ağır Tır', icon: '🚚', tier: 3, description: 'Kıtalararası yük taşıyıcı' },
      { id: 'speedboat', name: 'Sürat Teknesi', icon: '🚤', tier: 3, description: 'Dalgaları yaran motorlu bot' },
      { id: 'cruise_ship', name: 'Kruvaziyer Gemi', icon: '🚢', tier: 3, description: 'Yüzen dev tatil şehri' },
      { id: 'cable_car', name: 'Teleferik', icon: '🚡', tier: 4, description: 'Dağları birbirine bağlayan hat' },
      { id: 'hovercraft', name: 'Hovercraft', icon: '🛸', tier: 4, description: 'Hava yastıklı her arazi aracı' },
      { id: 'moon_lander', name: 'Ay Modülü', icon: '🚀', tier: 5, description: 'Ay yüzeyine iniş kapsülü' },
      { id: 'space_station', name: 'Uzay İstasyonu', icon: '🛰️', tier: 5, description: 'Sıfır yerçekimi araştırma üssü' },
      { id: 'portal', name: 'Yıldız Geçidi', icon: '🌌', tier: 6, description: 'Galaksiler arası solucan deliği' },
    ],
    recipes: [
      { a: 'compass', b: 'oil_drum', result: 'skateboard' },
      { a: 'oil_drum', b: 'oil_drum', result: 'tractor' },
      { a: 'parachute', b: 'oil_drum', result: 'helicopter' },
      { a: 'tractor', b: 'oil_drum', result: 'bus' },
      { a: 'bus', b: 'skateboard', result: 'racecar' },
      { a: 'bus', b: 'tractor', result: 'truck' },
      { a: 'skateboard', b: 'helicopter', result: 'speedboat' },
      { a: 'truck', b: 'speedboat', result: 'cruise_ship' },
      { a: 'racecar', b: 'truck', result: 'cable_car' },
      { a: 'speedboat', b: 'helicopter', result: 'hovercraft' },
      { a: 'cable_car', b: 'cable_car', result: 'moon_lander' },
      { a: 'hovercraft', b: 'cruise_ship', result: 'space_station' },
      { a: 'moon_lander', b: 'space_station', result: 'portal' },
    ],
  },

  // =========================================================================
  // HARD STRATEGY LEVELS (Level 10+)
  // Strict Dual-Branch Tree Requirement for Discovery
  // =========================================================================

  // LEVEL 10 — 🎪 EĞLENCE PARKI (Theme Park - Zorluk +10) [16 Items]
  {
    id: 'theme_park',
    levelNumber: 10,
    name: 'Eğlence Parkı',
    titleTr: '🎪 EĞLENCE PARKI',
    icon: '🎪',
    themeColor: 'purple',
    gradientFrom: 'from-purple-600',
    gradientTo: 'to-pink-500',
    badgeBg: 'bg-purple-500/20 text-purple-300 border-purple-400/40',
    baseItemIds: ['ticket', 'dice', 'dart_target'],
    items: [
      // Base (Tier 1) - Only these drop!
      { id: 'ticket', name: 'Altın Bilet', icon: '🎟️', tier: 1, isBase: true, description: 'Giriş sağlayan lunapark bileti' },
      { id: 'dice', name: 'Şans Zarı', icon: '🎲', tier: 1, isBase: true, description: 'Şansı belirleyen zar' },
      { id: 'dart_target', name: 'Hedef Tahtası', icon: '🎯', tier: 1, isBase: true, description: 'Tam 12’den vuran hedef' },
      // Tier 2 (Crafted from T1)
      { id: 'popcorn', name: 'Patlamış Mısır', icon: '🍿', tier: 2, description: 'Tuzlu ve çıtır lezzet' },
      { id: 'lollipop', name: 'Lolipop', icon: '🍭', tier: 2, description: 'Rengarenk şekerleme' },
      { id: 'bowling', name: 'Bowling Labutu', icon: '🎳', tier: 2, description: 'Tüm labutları devirme heyecanı' },
      { id: 'icecream', name: 'Dondurma', icon: '🍦', tier: 2, description: 'Külah dolusu ferahlatıcı lezzet' },
      // Tier 3 (Branch A: Gösteri / Branch B: Oyun & Kumar)
      { id: 'theater_mask', name: 'Tiyatro Maskeleri', icon: '🎭', tier: 3, description: 'Komedi ve dramın sahnesi (Kol A)' },
      { id: 'paint_palette', name: 'Sanat Paleti', icon: '🎨', tier: 3, description: 'Yaratıcılık fırçaları (Kol A)' },
      { id: 'billiards', name: '8 Numaralı Top', icon: '🎱', tier: 3, description: 'Hassas vuruşların yeşil masası (Kol B)' },
      { id: 'saxophone', name: 'Saksafon', icon: '🎷', tier: 3, description: 'Büyüleyici caz melodileri (Kol B)' },
      // Tier 4 (Advanced Synthesis)
      { id: 'fairytale_castle', name: 'Masal Şatosu', icon: '🏰', tier: 4, description: 'Kol A Şaheseri: Rüya parkı' },
      { id: 'slot_machine', name: 'Şans Otomatı', icon: '🎰', tier: 4, description: 'Kol B Şaheseri: Büyük ikramiye' },
      // Tier 5 (Apex Branches)
      { id: 'guitar', name: 'Elektro Gitar', icon: '🎸', tier: 5, description: 'Kol A Zirvesi: Rock sahnesi' },
      { id: 'rollercoaster', name: 'Hız Treni', icon: '🎢', tier: 5, description: 'Kol B Zirvesi: Adrenalin rayları' },
      // Tier 6 (Master Apex - Requires Guitar + Rollercoaster!)
      { id: 'fireworks', name: 'Havai Fişek Şöleni', icon: '🎆', tier: 6, description: 'ZİRVE: İki kolun birleşimiyle patlayan şölen' },
    ],
    recipes: [
      // Tier 2 crafts
      { a: 'ticket', b: 'dice', result: 'popcorn' },
      { a: 'ticket', b: 'ticket', result: 'lollipop' },
      { a: 'dart_target', b: 'dice', result: 'bowling' },
      { a: 'popcorn', b: 'lollipop', result: 'icecream' },
      // Branch A Tier 3
      { a: 'popcorn', b: 'icecream', result: 'theater_mask' },
      { a: 'theater_mask', b: 'lollipop', result: 'paint_palette' },
      // Branch B Tier 3
      { a: 'bowling', b: 'dice', result: 'billiards' },
      { a: 'billiards', b: 'popcorn', result: 'saxophone' },
      // Branch A Tier 4
      { a: 'theater_mask', b: 'paint_palette', result: 'fairytale_castle' },
      // Branch B Tier 4
      { a: 'billiards', b: 'saxophone', result: 'slot_machine' },
      // Branch A Tier 5
      { a: 'fairytale_castle', b: 'paint_palette', result: 'guitar' },
      // Branch B Tier 5
      { a: 'slot_machine', b: 'billiards', result: 'rollercoaster' },
      // Tier 6 APEX (Requires Branch A Guitar + Branch B Rollercoaster)
      { a: 'guitar', b: 'rollercoaster', result: 'fireworks' },
    ],
  },

  // LEVEL 11 — 🍕 LEZZET & MUTFAK (Culinary Master - Zorluk +20) [16 Items]
  {
    id: 'gastronomy',
    levelNumber: 11,
    name: 'Lezzet & Mutfak',
    titleTr: '🍕 LEZZET & MUTFAK',
    icon: '🍕',
    themeColor: 'amber',
    gradientFrom: 'from-amber-500',
    gradientTo: 'to-red-500',
    badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
    baseItemIds: ['flour', 'milk', 'salt_shaker'],
    items: [
      { id: 'flour', name: 'Buğday Unu', icon: '🌾', tier: 1, isBase: true, description: 'Hamurun temel ana maddesi' },
      { id: 'milk', name: 'Taze Süt', icon: '🥛', tier: 1, isBase: true, description: 'Doğal saf çiftlik sütü' },
      { id: 'salt_shaker', name: 'Baharat & Tuz', icon: '🧂', tier: 1, isBase: true, description: 'Yemeklerin gizli lezzet sırrı' },
      // Tier 2
      { id: 'cheese', name: 'Köy Peyniri', icon: '🧀', tier: 2, description: 'Fermante lezzetli peynir' },
      { id: 'bread', name: 'Köy Ekmeği', icon: '🍞', tier: 2, description: 'Fırından yeni çıkmış sıcak ekmek' },
      { id: 'fried_egg', name: 'Sahanda Yumurta', icon: '🍳', tier: 2, description: 'Kızgın tavada pişen lezzet' },
      { id: 'fries', name: 'Patates Kızartması', icon: '🍟', tier: 2, description: 'Altın sarısı çıtır patates' },
      // Tier 3 (Branch A: Fırın & İtalyan / Branch B: Şarküteri & Fast Food)
      { id: 'sandwich', name: 'Sandviç', icon: '🥪', tier: 3, description: 'Doyurucu fırın atıştırmalığı (Kol A)' },
      { id: 'pizza', name: 'İtalyan Pizzası', icon: '🍕', tier: 3, description: 'Bol peynirli fırın pizzası (Kol A)' },
      { id: 'burger', name: 'Gurme Burger', icon: '🍔', tier: 3, description: 'Nefis köfteli çıtır burger (Kol B)' },
      { id: 'pancakes', name: 'Pankek Kulesi', icon: '🥞', tier: 3, description: 'Ballı yumuşacık tatlı (Kol B)' },
      // Tier 4
      { id: 'ramen', name: 'Sıcak Ramen', icon: '🍜', tier: 4, description: 'Kol A Şaheseri: Uzakdoğu lezzet kasesi' },
      { id: 'sushi', name: 'Somon Suşi', icon: '🍣', tier: 4, description: 'Kol B Şaheseri: Usta şefin taze suşi tabağı' },
      // Tier 5
      { id: 'chocolate_bar', name: 'Çikolata Bar', icon: '🍫', tier: 5, description: 'Kol A Zirvesi: Yoğun kakao lezzeti' },
      { id: 'birthday_cake', name: 'Kutlama Pastası', icon: '🎂', tier: 5, description: 'Kol B Zirvesi: Kat kat şef pastası' },
      // Tier 6 Apex
      { id: 'royal_feast', name: 'Kraliyet Ziyafeti', icon: '🍱', tier: 6, description: 'ZİRVE: Çikolata & Pasta ustalarının birleştiği ziyafet' },
    ],
    recipes: [
      { a: 'milk', b: 'salt_shaker', result: 'cheese' },
      { a: 'flour', b: 'salt_shaker', result: 'bread' },
      { a: 'milk', b: 'flour', result: 'fried_egg' },
      { a: 'flour', b: 'salt_shaker', result: 'fries' },
      // Branch A
      { a: 'bread', b: 'cheese', result: 'sandwich' },
      { a: 'sandwich', b: 'cheese', result: 'pizza' },
      // Branch B
      { a: 'bread', b: 'fried_egg', result: 'burger' },
      { a: 'milk', b: 'fries', result: 'pancakes' },
      // Tier 4
      { a: 'pizza', b: 'sandwich', result: 'ramen' },
      { a: 'burger', b: 'pancakes', result: 'sushi' },
      // Tier 5
      { a: 'ramen', b: 'pizza', result: 'chocolate_bar' },
      { a: 'sushi', b: 'burger', result: 'birthday_cake' },
      // Tier 6 Apex
      { a: 'chocolate_bar', b: 'birthday_cake', result: 'royal_feast' },
    ],
  },

  // LEVEL 12 — 🔮 BÜYÜ & MİTOLOJİ (Magic Realm - Zorluk +30) [16 Items]
  {
    id: 'magic_mythology',
    levelNumber: 12,
    name: 'Büyü & Mitoloji',
    titleTr: '🔮 BÜYÜ & MİTOLOJİ',
    icon: '🔮',
    themeColor: 'purple',
    gradientFrom: 'from-violet-600',
    gradientTo: 'to-purple-800',
    badgeBg: 'bg-violet-500/20 text-violet-300 border-violet-400/40',
    baseItemIds: ['scroll', 'candle', 'mana_gem'],
    items: [
      { id: 'scroll', name: 'Kadim Parşömen', icon: '📜', tier: 1, isBase: true, description: 'Gizemli rünlerle dolu büyü kağıdı' },
      { id: 'candle', name: 'Büyülü Mum', icon: '🕯️', tier: 1, isBase: true, description: 'Sönmeyen alevli ritüel mumu' },
      { id: 'mana_gem', name: 'Mana Taşı', icon: '💎', tier: 1, isBase: true, description: 'Saf büyü enerjisi yayan kristal' },
      // Tier 2
      { id: 'magic_wand', name: 'Sihirli Asa', icon: '🪄', tier: 2, description: 'Büyüleri yönlendiren meşe asa' },
      { id: 'potion_bottle', name: 'Şifa İksiri', icon: '🧪', tier: 2, description: 'Işıl ışıl parlayan sihirli karışım' },
      { id: 'amulet', name: 'Koruyucu Tılsım', icon: '🧿', tier: 2, description: 'Kötü enerjileri defeden tılsım' },
      { id: 'magic_sword', name: 'Efsanevi Kılıç', icon: '🗡️', tier: 2, description: 'Ejderha çeliğinden dövülmüş kılıç' },
      // Tier 3 (Branch A: Işık ve İyilik / Branch B: Kudret ve Savaş)
      { id: 'wizard', name: 'Ak Büyücü', icon: '🧙‍♂️', tier: 3, description: 'Doğa elementlerine hükmeden bilge (Kol A)' },
      { id: 'fairy', name: 'Orman Perisi', icon: '🧚', tier: 3, description: 'Işıltılı kanatlı sihirli peri (Kol A)' },
      { id: 'dragon_shield', name: 'Ejderha Kalkanı', icon: '🛡️', tier: 3, description: 'Ateş geçirmez kalkan (Kol B)' },
      { id: 'unicorn', name: 'Unicorn', icon: '🦄', tier: 3, description: 'Saf ışık boynuzlu varlık (Kol B)' },
      // Tier 4
      { id: 'phoenix', name: 'Zümrüdüanka', icon: '🦅', tier: 4, description: 'Kol A Şaheseri: Küllerinden doğan efsanevi kuş' },
      { id: 'fire_dragon', name: 'Ateş Ejderhası', icon: '🐉', tier: 4, description: 'Kol B Şaheseri: Kudretli alev canavarı' },
      // Tier 5
      { id: 'crystal_ball', name: 'Kehanet Küresi', icon: '🔮', tier: 5, description: 'Kol A Zirvesi: Kaderi gösteren küre' },
      { id: 'hourglass', name: 'Zaman Kum Saati', icon: '⏳', tier: 5, description: 'Kol B Zirvesi: Zamanı bükebilen saat' },
      // Tier 6 Apex
      { id: 'immortality_star', name: 'Ölümsüzlük Yıldızı', icon: '🌟', tier: 6, description: 'ZİRVE: Kehanet ve Zamanın buluştuğu sonsuzluk yıldızı' },
    ],
    recipes: [
      { a: 'scroll', b: 'mana_gem', result: 'magic_wand' },
      { a: 'candle', b: 'mana_gem', result: 'potion_bottle' },
      { a: 'scroll', b: 'candle', result: 'amulet' },
      { a: 'mana_gem', b: 'mana_gem', result: 'magic_sword' },
      // Branch A
      { a: 'magic_wand', b: 'potion_bottle', result: 'wizard' },
      { a: 'wizard', b: 'amulet', result: 'fairy' },
      // Branch B
      { a: 'magic_sword', b: 'amulet', result: 'dragon_shield' },
      { a: 'dragon_shield', b: 'magic_sword', result: 'unicorn' },
      // Tier 4
      { a: 'wizard', b: 'fairy', result: 'phoenix' },
      { a: 'dragon_shield', b: 'unicorn', result: 'fire_dragon' },
      // Tier 5
      { a: 'phoenix', b: 'wizard', result: 'crystal_ball' },
      { a: 'fire_dragon', b: 'dragon_shield', result: 'hourglass' },
      // Tier 6 Apex
      { a: 'crystal_ball', b: 'hourglass', result: 'immortality_star' },
    ],
  },

  // LEVEL 13 — 🌊 DERİN OKYANUS (Deep Ocean - Zorluk +40) [16 Items]
  {
    id: 'deep_ocean',
    levelNumber: 13,
    name: 'Derin Okyanus',
    titleTr: '🌊 DERİN OKYANUS',
    icon: '🌊',
    themeColor: 'blue',
    gradientFrom: 'from-blue-600',
    gradientTo: 'to-cyan-700',
    badgeBg: 'bg-blue-500/20 text-blue-300 border-blue-400/40',
    baseItemIds: ['seashell', 'coral', 'bubble'],
    items: [
      { id: 'seashell', name: 'Deniz Kabuğu', icon: '🐚', tier: 1, isBase: true, description: 'Kumsala vuran sedefli kabuk' },
      { id: 'coral', name: 'Kırmızı Mercan', icon: '🪸', tier: 1, isBase: true, description: 'Rengarenk canlı sualtı kayalığı' },
      { id: 'bubble', name: 'Hava Baloncuğu', icon: '🫧', tier: 1, isBase: true, description: 'Derinliklerden yükselen nefes' },
      // Tier 2
      { id: 'jellyfish', name: 'Denizanası', icon: '🪼', tier: 2, description: 'Karanlıkta ışık saçan zarif varlık' },
      { id: 'shrimp', name: 'Karides', icon: '🦐', tier: 2, description: 'Mercanların arasında gezinen karides' },
      { id: 'crab', name: 'Kıskaçlı Yengeç', icon: '🦀', tier: 2, description: 'Deniz tabanının cesur bekçisi' },
      { id: 'tropical_fish', name: 'Tropik Balık', icon: '🐠', tier: 2, description: 'Sarı mavi desenli sevimli balık' },
      // Tier 3 (Branch A: Zeki Memeliler & Canlılar / Branch B: Derin Avcılar)
      { id: 'pufferfish', name: 'Balon Balığı', icon: '🐡', tier: 3, description: 'Dikenli balık (Kol A)' },
      { id: 'dolphin', name: 'Akıllı Yunus', icon: '🐬', tier: 3, description: 'Dalgalarla dans eden yunus (Kol A)' },
      { id: 'octopus', name: 'Ahtapot', icon: '🐙', tier: 3, description: 'Sekiz kollu kamuflaj ustası (Kol B)' },
      { id: 'squid', name: 'Dev Mürekkepbalığı', icon: '🦑', tier: 3, description: 'Uçsuz bucaksız derinliğin avcısı (Kol B)' },
      // Tier 4
      { id: 'whale', name: 'Mavi Balina', icon: '🐋', tier: 4, description: 'Kol A Şaheseri: Okyanusun nazik devi' },
      { id: 'shark', name: 'Büyük Beyaz Köpekbalığı', icon: '🦈', tier: 4, description: 'Kol B Şaheseri: Zirvedeki avcı' },
      // Tier 5
      { id: 'diver', name: 'Derin Deniz Dalgıcı', icon: '🤿', tier: 5, description: 'Kol A Zirvesi: Batıkları keşfeden dalgıç' },
      { id: 'shipwreck', name: 'Batık Korsan Gemisi', icon: '⚓', tier: 5, description: 'Kol B Zirvesi: Altın sandıklı kadim enkaz' },
      // Tier 6 Apex
      { id: 'trident', name: 'Poseidon Mızrağı', icon: '🔱', tier: 6, description: 'ZİRVE: Dalgıç ve Batık Geminin sırrını çözen kutsal mızrak' },
    ],
    recipes: [
      { a: 'seashell', b: 'bubble', result: 'jellyfish' },
      { a: 'coral', b: 'bubble', result: 'shrimp' },
      { a: 'seashell', b: 'coral', result: 'crab' },
      { a: 'bubble', b: 'bubble', result: 'tropical_fish' },
      // Branch A
      { a: 'tropical_fish', b: 'jellyfish', result: 'pufferfish' },
      { a: 'pufferfish', b: 'tropical_fish', result: 'dolphin' },
      // Branch B
      { a: 'crab', b: 'shrimp', result: 'octopus' },
      { a: 'octopus', b: 'crab', result: 'squid' },
      // Tier 4
      { a: 'dolphin', b: 'pufferfish', result: 'whale' },
      { a: 'squid', b: 'octopus', result: 'shark' },
      // Tier 5
      { a: 'whale', b: 'dolphin', result: 'diver' },
      { a: 'shark', b: 'squid', result: 'shipwreck' },
      // Tier 6 Apex
      { a: 'diver', b: 'shipwreck', result: 'trident' },
    ],
  },

  // LEVEL 14 — 🌌 DERİN KOZMOS (Cosmic Odyssey - Zorluk +50) [16 Items]
  {
    id: 'cosmic_odyssey',
    levelNumber: 14,
    name: 'Derin Kozmos',
    titleTr: '🌌 DERİN KOZMOS',
    icon: '🌌',
    themeColor: 'indigo',
    gradientFrom: 'from-indigo-600',
    gradientTo: 'to-fuchsia-700',
    badgeBg: 'bg-indigo-500/20 text-indigo-300 border-indigo-400/40',
    baseItemIds: ['meteorite', 'stardust', 'moon_crater'],
    items: [
      { id: 'meteorite', name: 'Meteor Parçası', icon: '☄️', tier: 1, isBase: true, description: 'Atmosferden süzülen alevli kaya' },
      { id: 'stardust', name: 'Yıldız Tozu', icon: '✨', tier: 1, isBase: true, description: 'Nebulalardan saçılan ışıltı' },
      { id: 'moon_crater', name: 'Ay Krateri', icon: '🌑', tier: 1, isBase: true, description: 'Karanlık ay yüzeyi' },
      // Tier 2
      { id: 'saturn_planet', name: 'Halkalı Gezegen', icon: '🪐', tier: 2, description: 'Buzdan halkaları olan gaz devi' },
      { id: 'full_moon', name: 'Parlak Dolunay', icon: '🌕', tier: 2, description: 'Geceyi aydınlatan gümüş küre' },
      { id: 'shooting_star', name: 'Kayan Yıldız', icon: '💫', tier: 2, description: 'Dilek tutulan ışık çizgisi' },
      { id: 'radio_telescope', name: 'Radyo Teleskop', icon: '🔭', tier: 2, description: 'Kozmik frekansları dinleyen çanak' },
      // Tier 3 (Branch A: Gezegenler & Yaşam / Branch B: Enerji & Karadelikler)
      { id: 'rover', name: 'Mars Gezgini', icon: '🛸', tier: 3, description: 'Örnek toplayan robot (Kol A)' },
      { id: 'alien_life', name: 'Uzaylı Medeniyeti', icon: '👾', tier: 3, description: 'Dünya dışı akıllı yaşam (Kol A)' },
      { id: 'spiral_galaxy', name: 'Sarmal Galaksi', icon: '🌌', tier: 3, description: 'Milyarlarca yıldızın dansı (Kol B)' },
      { id: 'supernova', name: 'Süpernova Patlaması', icon: '☀️', tier: 3, description: 'Dev yıldız patlaması (Kol B)' },
      // Tier 4
      { id: 'exoplanet', name: 'Yabancı Gezegen', icon: '🌍', tier: 4, description: 'Kol A Şaheseri: Yaşanabilir yeni dünya' },
      { id: 'black_hole', name: 'Karadelik', icon: '🕳️', tier: 4, description: 'Kol B Şaheseri: Sonsuz çekim gücü' },
      // Tier 5
      { id: 'parallel_universe', name: 'Paralel Boyut', icon: '🔮', tier: 5, description: 'Kol A Zirvesi: Çoklu evrenler kapısı' },
      { id: 'wormhole', name: 'Uzay-Zaman Tüneli', icon: '⚡', tier: 5, description: 'Kol B Zirvesi: Evrenler arası geçit' },
      // Tier 6 Apex
      { id: 'cosmic_infinity', name: 'Kozmik Sonsuzluk', icon: '♾️', tier: 6, description: 'ZİRVE: Paralel Boyut ve Solucan Deliğinin nihai birleşimi' },
    ],
    recipes: [
      { a: 'meteorite', b: 'stardust', result: 'saturn_planet' },
      { a: 'moon_crater', b: 'stardust', result: 'full_moon' },
      { a: 'meteorite', b: 'meteorite', result: 'shooting_star' },
      { a: 'stardust', b: 'moon_crater', result: 'radio_telescope' },
      // Branch A
      { a: 'radio_telescope', b: 'saturn_planet', result: 'rover' },
      { a: 'rover', b: 'full_moon', result: 'alien_life' },
      // Branch B
      { a: 'saturn_planet', b: 'shooting_star', result: 'spiral_galaxy' },
      { a: 'shooting_star', b: 'stardust', result: 'supernova' },
      // Tier 4
      { a: 'alien_life', b: 'rover', result: 'exoplanet' },
      { a: 'supernova', b: 'spiral_galaxy', result: 'black_hole' },
      // Tier 5
      { a: 'exoplanet', b: 'alien_life', result: 'parallel_universe' },
      { a: 'black_hole', b: 'supernova', result: 'wormhole' },
      // Tier 6 Apex
      { a: 'parallel_universe', b: 'wormhole', result: 'cosmic_infinity' },
    ],
  },

  // LEVEL 15 — 👑 ANTİK İMPARATORLUK (Ancient Empire - Zorluk +60) [16 Items]
  {
    id: 'ancient_empire',
    levelNumber: 15,
    name: 'Antik İmparatorluk',
    titleTr: '👑 ANTİK İMPARATORLUK',
    icon: '👑',
    themeColor: 'amber',
    gradientFrom: 'from-amber-600',
    gradientTo: 'to-rose-600',
    badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
    baseItemIds: ['amphora', 'ancient_coin', 'bronze_key'],
    items: [
      { id: 'amphora', name: 'Zeytinyağı Amforası', icon: '🏺', tier: 1, isBase: true, description: 'Kilden pişirilmiş antik testi' },
      { id: 'ancient_coin', name: 'Bronz Sikke', icon: '🪙', tier: 1, isBase: true, description: 'İmparator kabartmalı eski sikke' },
      { id: 'bronze_key', name: 'Hazine Anahtarı', icon: '🗝️', tier: 1, isBase: true, description: 'Gizli tapınak kapılarını açan anahtar' },
      // Tier 2
      { id: 'hieroglyph', name: 'Hiyeroglif Taşı', icon: '📜', tier: 2, description: 'Piramit duvarlarındaki gizli yazıt' },
      { id: 'battle_axe', name: 'Savaş Baltası', icon: '🪓', tier: 2, description: 'Lejyonerlerin çift taraflı baltası' },
      { id: 'bow_arrow', name: 'Ok & Yay', icon: '🏹', tier: 2, description: 'Menzilli avcı ve savaşçı yayı' },
      { id: 'gladiator_shield', name: 'Gladyatör Kalkanı', icon: '🛡️', tier: 2, description: 'Arenada dövüşen savaşçı kalkanı' },
      // Tier 3 (Branch A: Hükümranlık & Mimari / Branch B: Askeri Güç & Kervan)
      { id: 'pharaoh_statue', name: 'Firavun Heykeli', icon: '🗿', tier: 3, description: 'Devasa monolit taş anıt (Kol A)' },
      { id: 'acropolis', name: 'Akropol Tapınağı', icon: '🏛️', tier: 3, description: 'Tepedeki beyaz mermer saray (Kol A)' },
      { id: 'chariot', name: 'Savaş Arabası', icon: '🏇', tier: 3, description: 'Hızlı savaş arabası (Kol B)' },
      { id: 'camel_caravan', name: 'İpek Yolu Kervanı', icon: '🐪', tier: 3, description: 'Baharat tüccarları kervanı (Kol B)' },
      // Tier 4
      { id: 'pyramid', name: 'Büyük Piramit', icon: '🏜️', tier: 4, description: 'Kol A Şaheseri: Güneşin altındaki ebedi anıt' },
      { id: 'golden_crown', name: 'İmparatorluk Tacı', icon: '👑', tier: 4, description: 'Kol B Şaheseri: Saf yakut ve zümrütlü hükümdar tacı' },
      // Tier 5
      { id: 'winged_goddess', name: 'Zafer Tanrıçası', icon: '🪽', tier: 5, description: 'Kol A Zirvesi: Kanatlı mermer zafer heykeli' },
      { id: 'caesar', name: 'Büyük Hükümdar', icon: '🤴', tier: 5, description: 'Kol B Zirvesi: Medeniyetleri birleştiren imparator' },
      // Tier 6 Apex
      { id: 'seven_wonders', name: 'Dünya Harikası', icon: '🏆', tier: 6, description: 'ZİRVE: Büyük Hükümdar ve Zafer Tanrıçasının ebedi mirası' },
    ],
    recipes: [
      { a: 'amphora', b: 'ancient_coin', result: 'hieroglyph' },
      { a: 'ancient_coin', b: 'ancient_coin', result: 'battle_axe' },
      { a: 'bronze_key', b: 'ancient_coin', result: 'bow_arrow' },
      { a: 'bronze_key', b: 'amphora', result: 'gladiator_shield' },
      // Branch A
      { a: 'hieroglyph', b: 'amphora', result: 'pharaoh_statue' },
      { a: 'pharaoh_statue', b: 'hieroglyph', result: 'acropolis' },
      // Branch B
      { a: 'gladiator_shield', b: 'battle_axe', result: 'chariot' },
      { a: 'chariot', b: 'bow_arrow', result: 'camel_caravan' },
      // Tier 4
      { a: 'acropolis', b: 'pharaoh_statue', result: 'pyramid' },
      { a: 'camel_caravan', b: 'chariot', result: 'golden_crown' },
      // Tier 5
      { a: 'pyramid', b: 'acropolis', result: 'winged_goddess' },
      { a: 'golden_crown', b: 'camel_caravan', result: 'caesar' },
      // Tier 6 Apex
      { a: 'winged_goddess', b: 'caesar', result: 'seven_wonders' },
    ],
  },
];

// =========================================================================
// PROCEDURAL THEME TEMPLATES (For Unique 100 Levels Progression)
// =========================================================================
interface ThemeTemplate {
  name: string;
  icon: string;
  themeColor: string;
  gradientFrom: string;
  gradientTo: string;
  badgeBg: string;
  itemTemplates: {
    name: string;
    icon: string;
    tier: number;
    description: string;
  }[];
}

const THEME_TEMPLATES: ThemeTemplate[] = [
  // 1. ZİNDAN & HAZİNE (Dungeon & Crypts)
  {
    name: 'Zindan & Hazine',
    icon: '🗝️',
    themeColor: 'amber',
    gradientFrom: 'from-amber-700',
    gradientTo: 'to-stone-900',
    badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
    itemTemplates: [
      { name: 'Kırık Meşale', icon: '🪵', tier: 1, description: 'Karanlığı delen sönük ateş' },
      { name: 'Paslı Kilit', icon: '🔒', tier: 1, description: 'Kadim kapı kilidi' },
      { name: 'Kafatası', icon: '💀', tier: 1, description: 'Eski zindan bekçisi' },
      { name: 'Demir Zincir', icon: '⛓️', tier: 2, description: 'Ağır tutsak zinciri' },
      { name: 'Gizli Harita', icon: '🗺️', tier: 2, description: 'Labirentin sırrı' },
      { name: 'Gümüş Hançer', icon: '🗡️', tier: 2, description: 'Sessiz gölgelerin silahı' },
      { name: 'Şövalye Miğferi', icon: '🪖', tier: 2, description: 'Dövülmüş çelik zırh' },
      { name: 'Hazine Sandığı', icon: '📦', tier: 3, description: 'Mücevher dolu sandık (Kol A)' },
      { name: 'Büyülü Rün', icon: '🔮', tier: 3, description: 'Taşa kazınmış büyü (Kol A)' },
      { name: 'Zümrüt Heykelcik', icon: '🗿', tier: 3, description: 'Lanetli zümrüt idôl (Kol B)' },
      { name: 'Yakut Kolye', icon: '📿', tier: 3, description: 'Parlayan kan yakutu (Kol B)' },
      { name: 'Golemin Kalbi', icon: '💎', tier: 4, description: 'Kol A Şaheseri: Taş devi canlandıran çekirdek' },
      { name: 'Zindan Ejderi', icon: '🐉', tier: 4, description: 'Kol B Şaheseri: Altınları koruyan ejderha' },
      { name: 'Gölge Kapısı', icon: '🌌', tier: 5, description: 'Kol A Zirvesi: Araf boyutuna açılan geçit' },
      { name: 'Kadim Taht', icon: '👑', tier: 5, description: 'Kol B Zirvesi: Kayıp kralın altın tahtı' },
      { name: 'Ölümsüz Hükümranlık', icon: '🏆', tier: 6, description: 'ZİRVE: Taht ve Gölge Kapısının nihai fatihi' },
    ],
  },

  // 2. SİBERPUNK & NEO KENT (Cyberpunk)
  {
    name: 'Siberpunk & Neo Kent',
    icon: '⚡',
    themeColor: 'cyan',
    gradientFrom: 'from-fuchsia-600',
    gradientTo: 'to-cyan-600',
    badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40',
    itemTemplates: [
      { name: 'Neon LED', icon: '💡', tier: 1, description: 'Göz alıcı neon boru' },
      { name: 'Veri Kablosu', icon: '🔌', tier: 1, description: 'Optik sinyal hattı' },
      { name: 'Sentetik Pil', icon: '🔋', tier: 1, description: 'Plazma enerji pili' },
      { name: 'Hacker Tableti', icon: '📟', tier: 2, description: 'Güvenlik duvarı kırıcı' },
      { name: 'Siber Göz', icon: '👁️', tier: 2, description: 'Kızılötesi biyonik protez' },
      { name: 'Lazer Tabancası', icon: '🔫', tier: 2, description: 'Yüksek voltajlı silah' },
      { name: 'Hologram Kaseti', icon: '📼', tier: 2, description: '3D kayıt verisi' },
      { name: 'Uçan Motorsiklet', icon: '🏍️', tier: 3, description: 'Manyetik raylı motor (Kol A)' },
      { name: 'Siber Drone', icon: '🛸', tier: 3, description: 'Şehir gözetleyicisi (Kol A)' },
      { name: 'Biyonik Kol', icon: '🦾', tier: 3, description: 'Titanyum hidrolik güç (Kol B)' },
      { name: 'Hologram Kule', icon: '🗼', tier: 3, description: 'Dev reklam kulesi (Kol B)' },
      { name: 'Sentetik Android', icon: '🤖', tier: 4, description: 'Kol A Şaheseri: Bilinçli robot' },
      { name: 'Mega Şirket Kulesi', icon: '🏙️', tier: 4, description: 'Kol B Şaheseri: Bulutları aşan merkez' },
      { name: 'Kuantum Ağ Çekirdeği', icon: '🧬', tier: 5, description: 'Kol A Zirvesi: Şehri yöneten yapay zeka' },
      { name: 'Matrix Matrisi', icon: '🌐', tier: 5, description: 'Kol B Zirvesi: Sanal evren boyutu' },
      { name: 'Siber Tanrı', icon: '💠', tier: 6, description: 'ZİRVE: Kuantum Zeka ve Matrixin mutlak hakimi' },
    ],
  },

  // 3. KUTUP & BUZUL ÇAĞI (Arctic Frozen)
  {
    name: 'Buzul & Kutup Seferi',
    icon: '❄️',
    themeColor: 'sky',
    gradientFrom: 'from-sky-500',
    gradientTo: 'to-blue-800',
    badgeBg: 'bg-sky-500/20 text-sky-300 border-sky-400/40',
    itemTemplates: [
      { name: 'Buz Kristali', icon: '🧊', tier: 1, description: 'Donmuş saf su parçası' },
      { name: 'Kar Tanesi', icon: '❄️', tier: 1, description: 'Eşsiz geometrik kar' },
      { name: 'Fırtına Rüzgarı', icon: '💨', tier: 1, description: 'Dondurucu kutup esintisi' },
      { name: 'Buz Sarkıtı', icon: '🗡️', tier: 2, description: 'Keskin mağara sarkıtı' },
      { name: 'Kar Gözlüğü', icon: '🥽', tier: 2, description: 'Tipiye karşı vizör' },
      { name: 'Kutup Pengueni', icon: '🐧', tier: 2, description: 'Buz üstünde kayan sevimli kuş' },
      { name: 'Kızak Köpeği', icon: '🐕', tier: 2, description: 'Fırtınaya meydan okuyan husky' },
      { name: 'İglo Evi', icon: '🛖', tier: 3, description: 'Kar tuğlası sığınak (Kol A)' },
      { name: 'Kutup Ayısı', icon: '🐻‍❄️', tier: 3, description: 'Buzulların devi (Kol A)' },
      { name: 'Buzkıran Gemisi', icon: '🚢', tier: 3, description: 'Buz tabakasını yaran gemi (Kol B)' },
      { name: 'Donmuş Mamut', icon: '🦣', tier: 3, description: 'Bin yıllık buzul fosili (Kol B)' },
      { name: 'Buzul Kanyonu', icon: '🏔️', tier: 4, description: 'Kol A Şaheseri: Turkuaz buz vadisi' },
      { name: 'Kutup Işıkları', icon: '🌌', tier: 4, description: 'Kol B Şaheseri: Yeşil aurora dansı' },
      { name: 'Mutlak Sıfır Çekirdeği', icon: '💎', tier: 5, description: 'Kol A Zirvesi: Zamanı donduran buz çekirdeği' },
      { name: 'Buz Kraliçesi Sarayı', icon: '🏰', tier: 5, description: 'Kol B Zirvesi: Kristalden örülmüş ihtişam' },
      { name: 'Buz Devri Tacı', icon: '👑', tier: 6, description: 'ZİRVE: Kuzeyin ebedi hükümdarlık tacı' },
    ],
  },

  // 4. KORSAN & HAZİNE ADASI (Pirates & Caribbean)
  {
    name: 'Korsan & Hazine Adası',
    icon: '🏴‍☠️',
    themeColor: 'amber',
    gradientFrom: 'from-amber-600',
    gradientTo: 'to-teal-800',
    badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
    itemTemplates: [
      { name: 'Korsan Şapkası', icon: '🏴‍☠️', tier: 1, description: 'Kuru kafa işlemeli şapka' },
      { name: 'Tahta Bacak', icon: '🪵', tier: 1, description: 'Eski denizcinin hatırası' },
      { name: 'Romatizma Şişesi', icon: '🍾', tier: 1, description: 'İçinde mesaj olan şişe' },
      { name: 'Kanca El', icon: '🪝', tier: 2, description: 'Keskin demir kanca' },
      { name: 'Hazine Haritası', icon: '📜', tier: 2, description: 'Kırmızı X işaretli ada haritası' },
      { name: 'Korsan Papağanı', icon: '🦜', tier: 2, description: 'Rengarenk konuşan kuş' },
      { name: 'Barut Tabancası', icon: '🔫', tier: 2, description: 'Çakmaktaşlı korsan piştovu' },
      { name: 'Top Arabası', icon: '💣', tier: 3, description: 'Gülle atan döküm top (Kol A)' },
      { name: 'Pusulalı Usturlap', icon: '🧭', tier: 3, description: 'Yıldızları ölçen alet (Kol A)' },
      { name: 'Elmas Sandığı', icon: '💎', tier: 3, description: 'Gömülü servet (Kol B)' },
      { name: 'Kuru Kafa Mağarası', icon: '☠️', tier: 3, description: 'Lanetli koy girişi (Kol B)' },
      { name: 'Karakelle Firkateyni', icon: '⛵', tier: 4, description: 'Kol A Şaheseri: Karayip sularının hayaleti' },
      { name: 'Deniz Canavarı Kraken', icon: '🐙', tier: 4, description: 'Kol B Şaheseri: Gemileri yutan dev ahtapot' },
      { name: 'Kayıp Ada Mabedi', icon: '🏝️', tier: 5, description: 'Kol A Zirvesi: Haritada olmayan cennet' },
      { name: 'Korsanlar Kralı Tahtı', icon: '👑', tier: 5, description: 'Kol B Zirvesi: 7 Denizin hükümdarı' },
      { name: 'Karayip Efsanesi', icon: '🏆', tier: 6, description: 'ZİRVE: Okyanusun en büyük hazine efsanesi' },
    ],
  },

  // 5. LAV & EJDERHA VADİSİ (Inferno & Volcano)
  {
    name: 'Lav & Ejderha Vadisi',
    icon: '🌋',
    themeColor: 'red',
    gradientFrom: 'from-red-600',
    gradientTo: 'to-amber-600',
    badgeBg: 'bg-red-500/20 text-red-300 border-red-400/40',
    itemTemplates: [
      { name: 'Volkanik Kül', icon: '💨', tier: 1, description: 'Sıcak duman ve kül' },
      { name: 'Obsidyen Taşı', icon: '🪨', tier: 1, description: 'Sertleşmiş kara volkan camı' },
      { name: 'Kor Alev', icon: '🔥', tier: 1, description: 'Sönmeyen yeraltı ateşi' },
      { name: 'Kızgın Magma', icon: '🩸', tier: 2, description: 'Fokurdayan akkor lav' },
      { name: 'Ateş Kalkanı', icon: '🛡️', tier: 2, description: 'Ateşe dayanıklı kalkan' },
      { name: 'Lav Kertenkelesi', icon: '🦎', tier: 2, description: 'Ateşte koşan sürüngen' },
      { name: 'Ejderha Pulu', icon: '🐲', tier: 2, description: 'Kırılmaz zırh pulu' },
      { name: 'Ateş Zümrüdü', icon: '♦️', tier: 3, description: 'Kızıl alev kristali (Kol A)' },
      { name: 'Kükürt Gayzeri', icon: '♨️', tier: 3, description: 'Fışkıran buhar (Kol A)' },
      { name: 'Lav Golemi', icon: '🗿', tier: 3, description: 'Ateşten yürüyen dev (Kol B)' },
      { name: 'Ateş Dağı Tapınağı', icon: '🏛️', tier: 3, description: 'Lav ortasındaki mabet (Kol B)' },
      { name: 'Kızıl Ejderha', icon: '🐉', tier: 4, description: 'Kol A Şaheseri: Göğü ateşe veren ejder' },
      { name: 'Cehennem Çekirdeği', icon: '☀️', tier: 4, description: 'Kol B Şaheseri: Güneş kadar sıcak öz' },
      { name: 'Yanardağ Kalbi', icon: '🌋', tier: 5, description: 'Kol A Zirvesi: Yeryüzünü sarsan güç' },
      { name: 'Alevlerin Efendisi Tacı', icon: '👑', tier: 5, description: 'Kol B Zirvesi: Volkanların efendisi' },
      { name: 'Kozmik Süper Alev', icon: '✨', tier: 6, description: 'ZİRVE: Ateşin en saf ve nihai formu' },
    ],
  },

  // 6. KUANTUM FİZİĞİ & ATOM DÜNYASI (Quantum Physics)
  {
    name: 'Kuantum Laboratuvarı',
    icon: '⚛️',
    themeColor: 'violet',
    gradientFrom: 'from-violet-600',
    gradientTo: 'to-cyan-600',
    badgeBg: 'bg-violet-500/20 text-violet-300 border-violet-400/40',
    itemTemplates: [
      { name: 'Elektron Işını', icon: '⚡', tier: 1, description: 'Yüksek enerjili parçacık akımı' },
      { name: 'Manyetik Halka', icon: '🧲', tier: 1, description: 'Atomları hızlandıran sarmal' },
      { name: 'Foton Kristali', icon: '💎', tier: 1, description: 'Saf ışık hapseden prizma' },
      { name: 'Lazer Huzmesi', icon: '🔦', tier: 2, description: 'Odaklanmış koherent ışık' },
      { name: 'Plazma Küresi', icon: '🔮', tier: 2, description: 'İyonize akkor gaz küresi' },
      { name: 'Kuantum Sensör', icon: '📟', tier: 2, description: 'Nanometrik frekans ölçer' },
      { name: 'Süperiletken Bobin', icon: '🌀', tier: 2, description: 'Sıfır dirençli manyetik bobin' },
      { name: 'Parçacık Hızlandırıcı', icon: '🔄', tier: 3, description: 'Atom çarpıştıran tünel (Kol A)' },
      { name: 'Antimadde Kapsülü', icon: '🧪', tier: 3, description: 'Boşluk enerjisi tüpü (Kol A)' },
      { name: 'Nanobot Sürüsü', icon: '🤖', tier: 3, description: 'Mikroskobik onarım botları (Kol B)' },
      { name: 'Kuantum Dolanıklık', icon: '🧬', tier: 3, description: 'Aynı anda iki yerde olan parçacık (Kol B)' },
      { name: 'Karanlık Madde Reaktörü', icon: '🌌', tier: 4, description: 'Kol A Şaheseri: Evrenin görünmez kütle jeneratörü' },
      { name: 'Kuantum Işınlayıcı', icon: '🛸', tier: 4, description: 'Kol B Şaheseri: Maddeyi anında transfer eden kapı' },
      { name: 'Higgs Bozonu Çekirdeği', icon: '✨', tier: 5, description: 'Kol A Zirvesi: Tanrı parçacığı matrisi' },
      { name: 'Zaman Kuantum Kristali', icon: '⏳', tier: 5, description: 'Kol B Zirvesi: Zaman simetrisini bozan kristal' },
      { name: 'Evrensel Teori Çekirdeği', icon: '💠', tier: 6, description: 'ZİRVE: Tüm fizik kanunlarının nihai birleşimi' },
    ],
  },

  // 7. DİNOZORLAR & TARİH ÖNCESİ (Prehistoric Era)
  {
    name: 'Tarih Öncesi & Dinozorlar',
    icon: '🦖',
    themeColor: 'emerald',
    gradientFrom: 'from-amber-700',
    gradientTo: 'to-emerald-800',
    badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40',
    itemTemplates: [
      { name: 'Antik Fosil', icon: '🦴', tier: 1, description: 'Kayalaşmış tarih öncesi kemik' },
      { name: 'Ağaç Reçinesi', icon: '🪨', tier: 1, description: 'Milyon yıllık sarı amber damlası' },
      { name: 'İlkel Çakmaktaşı', icon: '🪓', tier: 1, description: 'İlk insanların yonttuğu keskin taş' },
      { name: 'Dev Yumurta', icon: '🥚', tier: 2, description: 'Kuluçkaya yatan dinozor yumurtası' },
      { name: 'Eğrelti Otu Ağacı', icon: '🌿', tier: 2, description: 'Jurasik dönemin devasa bitkisi' },
      { name: 'Volkanik Kükürt', icon: '💨', tier: 2, description: 'Tarih öncesi gayzer dumanı' },
      { name: 'Yırtıcı Dişi', icon: '🦷', tier: 2, description: 'Korkunç avcının jilet dişi' },
      { name: 'Trisaratops', icon: '🦏', tier: 3, description: 'Üç boynuzlu zırhlı otobur (Kol A)' },
      { name: 'Pterodaktil', icon: '🦅', tier: 3, description: 'Gökyüzünün kanatlı kertenkelesi (Kol A)' },
      { name: 'Velosiraptor', icon: '🦎', tier: 3, description: 'Hızlı ve sürü halinde avlanan etobur (Kol B)' },
      { name: 'Brakiozor', icon: '🦕', tier: 3, description: 'Ağaç boyunda uzun boyunlu dev (Kol B)' },
      { name: 'Tiranazor Rex (T-Rex)', icon: '🦖', tier: 4, description: 'Kol A Şaheseri: Jurasik çağın mutlak kralı' },
      { name: 'Meteor Yağmuru Krateri', icon: '☄️', tier: 4, description: 'Kol B Şaheseri: Çağı değiştiren kozmik vuruş' },
      { name: 'Eski Dünya Mirası', icon: '🏛️', tier: 5, description: 'Kol A Zirvesi: Buz tabakasında korunan vadi' },
      { name: 'Fosil Mabedi', icon: '💎', tier: 5, description: 'Kol B Zirvesi: Altın amber içindeki ilk gen' },
      { name: 'Jurasik Ebediyet Tacı', icon: '👑', tier: 6, description: 'ZİRVE: Tarih öncesi yaşamın görkemli anıtı' },
    ],
  },

  // 8. ANTİK MISIR & PİRAMİTLER (Ancient Egypt)
  {
    name: 'Antik Mısır & Piramitler',
    icon: '🏜️',
    themeColor: 'amber',
    gradientFrom: 'from-amber-500',
    gradientTo: 'to-yellow-700',
    badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
    itemTemplates: [
      { name: 'Papirüs Rulosu', icon: '📜', tier: 1, description: 'Nil kıyısında kurutulmuş yazı kağıdı' },
      { name: 'Kutsal Ankh', icon: '☥', tier: 1, description: 'Ebedi yaşamın anahtarı' },
      { name: 'Altın Bokböceği', icon: '🪲', tier: 1, description: 'Güneş tanrısı Ra’nın sembolü' },
      { name: 'Mumya Sargısı', icon: '🧻', tier: 2, description: 'Baharatlı keten bezleri' },
      { name: 'Göz Kolyesi', icon: '🧿', tier: 2, description: 'Horus’un koruyucu gözü' },
      { name: 'Mermer Sütun', icon: '🏛️', tier: 2, description: 'Tapınak tavanını tutan oyma taş' },
      { name: 'Çöl Akrebi', icon: '🦂', tier: 2, description: 'Kızgın kumların zehirli muhafızı' },
      { name: 'Firavun Maskesi', icon: '🎭', tier: 3, description: 'Saf altından dövülmüş maske (Kol A)' },
      { name: 'Anubis Asası', icon: '🪄', tier: 3, description: 'Yeraltı dünyasının rehber asası (Kol A)' },
      { name: 'Güneş Sandalı', icon: '⛵', tier: 3, description: 'Gökyüzünde süzülen altın gemi (Kol B)' },
      { name: 'Lapis Lazuli Taşı', icon: '🔷', tier: 3, description: 'Kraliyet mavisi kutsal mücevher (Kol B)' },
      { name: 'Dev Sfenks Anıtı', icon: '🗿', tier: 4, description: 'Kol A Şaheseri: Çölü bekleyen aslan gövdeli bilge' },
      { name: 'Giza Büyük Piramidi', icon: '🏜️', tier: 4, description: 'Kol B Şaheseri: Yıldızlarla hizalanmış mimari zirve' },
      { name: 'Ra’nın Güneş Tacı', icon: '☀️', tier: 5, description: 'Kol A Zirvesi: Sonsuz ışık saçan güneş tacı' },
      { name: 'Ölüler Kitabı Gizemi', icon: '🔮', tier: 5, description: 'Kol B Zirvesi: Öbür dünyaya kapı açan büyü' },
      { name: 'Firavunlar Şahı', icon: '👑', tier: 6, description: 'ZİRVE: Nil’in ve iki diyarın ölümsüz hükümdarı' },
    ],
  },

  // 9. ORTAÇAĞ & ŞÖVALYELER (Medieval Knights)
  {
    name: 'Ortaçağ & Şövalyeler',
    icon: '⚔️',
    themeColor: 'slate',
    gradientFrom: 'from-slate-600',
    gradientTo: 'to-indigo-900',
    badgeBg: 'bg-slate-500/20 text-slate-300 border-slate-400/40',
    itemTemplates: [
      { name: 'Demir Külçe', icon: '🪙', tier: 1, description: 'Ocakta ısıtılmış saf demir' },
      { name: 'Demirci Çekici', icon: '🔨', tier: 1, description: 'Örste çelik döven çekiç' },
      { name: 'Deri Kalkan', icon: '🛡️', tier: 1, description: 'İlk savunma siperi' },
      { name: 'Çelik Hançer', icon: '🗡️', tier: 2, description: 'Keskin çift taraflı bıçak' },
      { name: 'Şövalye Zırhı', icon: '🦺', tier: 2, description: 'Vücudu saran parlak plaka zırh' },
      { name: 'Yay ve Kundak', icon: '🏹', tier: 2, description: 'Kale burçlarından atılan ok' },
      { name: 'Savaş Atı', icon: '🐎', tier: 2, description: 'Zırh kuşanmış asil at' },
      { name: 'Paladin Kılıcı', icon: '⚔️', tier: 3, description: 'Işıkla kutsanmış çift elli kılıç (Kol A)' },
      { name: 'Mancınık', icon: '🪨', tier: 3, description: 'Sur duvarlarını yıkan kuşatma makinesi (Kol A)' },
      { name: 'Kraliyet Sancağı', icon: '🚩', tier: 3, description: 'Orduları toplayan asil flama (Kol B)' },
      { name: 'Yuvarlak Masa', icon: '🪵', tier: 3, description: 'Eşitlik yemini eden şövalyeler (Kol B)' },
      { name: 'Efsanevi Excalibur', icon: '✨', tier: 4, description: 'Kol A Şaheseri: Taşa saplanan kutsal kılıç' },
      { name: 'Kuşatılmaz Kale', icon: '🏰', tier: 4, description: 'Kol B Şaheseri: Hendekli devasa taş hisar' },
      { name: 'Kutsal Kâse', icon: '🏆', tier: 5, description: 'Kol A Zirvesi: Sonsuz şifa ve güç kadehi' },
      { name: 'Kral Arthur Tahtı', icon: '👑', tier: 5, description: 'Kol B Zirvesi: Birleşik krallığın hükümdarı' },
      { name: 'Camelot Efsanesi', icon: '🌟', tier: 6, description: 'ZİRVE: Şövalyeliğin ve şerefin ölümsüz destanı' },
    ],
  },

  // 10. SAMURAY & UZAK DOĞU (Feudal Japan & Samurai)
  {
    name: 'Samuray & Uzak Doğu',
    icon: '⛩️',
    themeColor: 'rose',
    gradientFrom: 'from-rose-600',
    gradientTo: 'to-red-900',
    badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-400/40',
    itemTemplates: [
      { name: 'Bonsai Ağacı', icon: '🪴', tier: 1, description: 'Yılların sabrıyla budanmış bodur ağaç' },
      { name: 'İpek Yelpaze', icon: '🪭', tier: 1, description: 'Hassas katlanmış zarif yelpaze' },
      { name: 'Origami Turna', icon: '🦢', tier: 1, description: 'Katlanmış kağıt dilek kuşu' },
      { name: 'Çay Seremonisi', icon: '🍵', tier: 2, description: 'Yeşil matcha çay kasesi' },
      { name: 'Bambu Flüt', icon: '🎋', tier: 2, description: 'Huzur veren dağ melodisi' },
      { name: 'Kiraz Çiçeği', icon: '🌸', tier: 2, description: 'Baharın müjdecisi sakura dalı' },
      { name: 'Kırmızı Fener', icon: '🏮', tier: 2, description: 'Sokakları aydınlatan kağıt fener' },
      { name: 'Usta Katanası', icon: '🗡️', tier: 3, description: 'Kat kat çelikten dövülmüş kılıç (Kol A)' },
      { name: 'Samuray Miğferi', icon: '🪖', tier: 3, description: 'Korkutucu şeytan boynuzlu miğfer (Kol A)' },
      { name: 'Şinto Tapınağı', icon: '⛩️', tier: 3, description: 'Ruhların dünyasına açılan kırmızı kapı (Kol B)' },
      { name: 'Koi Balığı Havuzu', icon: '🐟', tier: 3, description: 'Şans ve bereket getiren balık (Kol B)' },
      { name: 'Gölge Ninjası', icon: '🥷', tier: 4, description: 'Kol A Şaheseri: Çatılarda sessizce süzülen casus' },
      { name: 'Ulu Şogun Sarayı', icon: '🏯', tier: 4, description: 'Kol B Şaheseri: Kiraz çiçekleri içindeki saray' },
      { name: 'Kırmızı Ejderha Dansı', icon: '🐉', tier: 5, description: 'Kol A Zirvesi: Festivalin alev saçan koruyucusu' },
      { name: 'Onur ve Bushido Kodu', icon: '📜', tier: 5, description: 'Kol B Zirvesi: Samurayın sarsılmaz yolu' },
      { name: 'İmparatorluk Samuray Efendisi', icon: '👑', tier: 6, description: 'ZİRVE: Kılıç ve ruhun mutlak uyumu' },
    ],
  },

  // 11. MÜZİK & SAHNE FESTİVALİ (Music & Concert)
  {
    name: 'Müzik & Sahne Festivali',
    icon: '🎷',
    themeColor: 'fuchsia',
    gradientFrom: 'from-fuchsia-600',
    gradientTo: 'to-purple-900',
    badgeBg: 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-400/40',
    itemTemplates: [
      { name: 'Müzik Notası', icon: '🎵', tier: 1, description: 'Havada uçuşan ilk melodi' },
      { name: 'Gitar Pensi', icon: '🎸', tier: 1, description: 'Tellere can veren mızrap' },
      { name: 'Mikrofon Kablosu', icon: '🎙️', tier: 1, description: 'Sesi yükselten stüdyo hattı' },
      { name: 'Vinil Plak', icon: '💿', tier: 2, description: 'Nostaljik analog ses kaydı' },
      { name: 'Kulaklık Monitörü', icon: '🎧', tier: 2, description: 'Basları ayıran DJ kulaklığı' },
      { name: 'Akustik Keman', icon: '🎻', tier: 2, description: 'Duygusal yaylı enstrüman' },
      { name: 'Bateri Çubukları', icon: '🥁', tier: 2, description: 'Ritim tutan bagetler' },
      { name: 'Elektro Saksafon', icon: '🎷', tier: 3, description: 'Gece kulübünün caz solosunu çalan alet (Kol A)' },
      { name: 'DJ Mikser Masası', icon: '🎛️', tier: 3, description: 'Ses dalgalarını harmanlayan mikser (Kol A)' },
      { name: 'Sahne Projektörü', icon: '💡', tier: 3, description: 'Ritmik lazer ve ışık kulesi (Kol B)' },
      { name: 'Kuyruklu Piyano', icon: '🎹', tier: 3, description: '88 tuşlu klasik şaheser (Kol B)' },
      { name: 'Stadyum Rock Konseri', icon: '🏟️', tier: 4, description: 'Kol A Şaheseri: Binlerin eşlik ettiği dev sahne' },
      { name: 'Senfoni Filarmonisi', icon: '🎼', tier: 4, description: 'Kol B Şaheseri: 100 kişilik orkestra uyumu' },
      { name: 'Altın Plak Ödülü', icon: '🏆', tier: 5, description: 'Kol A Zirvesi: Milyon satan albüm kupası' },
      { name: 'Efsanevi Müzik İkonu', icon: '🌟', tier: 5, description: 'Kol B Zirvesi: Nesilleri etkileyen müzik dehası' },
      { name: 'Evrensel Senfoni Tacı', icon: '👑', tier: 6, description: 'ZİRVE: Tüm dünya dillerini birleştiren müzik' },
    ],
  },

  // 12. BİYOLOJİ & MİKRO EVREN (Biology & Microverse)
  {
    name: 'Biyoloji & Mikro Evren',
    icon: '🔬',
    themeColor: 'emerald',
    gradientFrom: 'from-emerald-600',
    gradientTo: 'to-teal-900',
    badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40',
    itemTemplates: [
      { name: 'Damla Özü', icon: '💧', tier: 1, description: 'Petri kabındaki saf çözelti' },
      { name: 'Lamel Camı', icon: '🔲', tier: 1, description: 'Numuneyi sabitleyen ince cam' },
      { name: 'Mavi Reaktif', icon: '🧪', tier: 1, description: 'Hücre çekirdeğini boyayan boya' },
      { name: 'Canlı Bakteri', icon: '🦠', tier: 2, description: 'Bölünerek çoğalan tek hücreli' },
      { name: 'Fotosentez Klorofili', icon: '🍃', tier: 2, description: 'Güneşten enerji üreten pigment' },
      { name: 'Enzim Katalizörü', icon: '⚗️', tier: 2, description: 'Tepkimeleri bin kat hızlandıran biyo-katalizör' },
      { name: 'Optik Mikroskop', icon: '🔬', tier: 2, description: 'Bin kat büyüten optik mercek' },
      { name: 'DNA Çift Sarmalı', icon: '🧬', tier: 3, description: 'Genetik kod şifresi (Kol A)' },
      { name: 'Kök Hücre Kümesi', icon: '🧫', tier: 3, description: 'Her dokuya dönüşebilen mucize (Kol A)' },
      { name: 'Biolüminesans Mantar', icon: '🍄', tier: 3, description: 'Karanlıkta mavi ışık saçan spor (Kol B)' },
      { name: 'Biyonik Antikor', icon: '💉', tier: 3, description: 'Tüm virüsleri yok eden akıllı savunma (Kol B)' },
      { name: 'Klonlama İnkübatörü', icon: '🛸', tier: 4, description: 'Kol A Şaheseri: Mükemmel hücre replikasyonu' },
      { name: 'Sentetik Biyo-Organizma', icon: '👾', tier: 4, description: 'Kol B Şaheseri: Kendi ekosistemini kuran canlı' },
      { name: 'Genom Çözümleme Anahtarı', icon: '💎', tier: 5, description: 'Kol A Zirvesi: Yaşam kodunun haritası' },
      { name: 'Ölümsüz Hücre Matrisi', icon: '✨', tier: 5, description: 'Kol B Zirvesi: Yaşlanmayı durduran telomer' },
      { name: 'Evrim Ağacı Zirvesi', icon: '👑', tier: 6, description: 'ZİRVE: Biyolojik evrimin nihai sentezi' },
    ],
  },

  // 13. MARS KOLONİSİ & GÜNEŞ SİSTEMİ (Mars Colony)
  {
    name: 'Mars Kolonisi & Güneş',
    icon: '🪐',
    themeColor: 'orange',
    gradientFrom: 'from-orange-600',
    gradientTo: 'to-red-950',
    badgeBg: 'bg-orange-500/20 text-orange-300 border-orange-400/40',
    itemTemplates: [
      { name: 'Kızıl Toprak', icon: '🧱', tier: 1, description: 'Demir oksit zengini Mars kumu' },
      { name: 'Güneş Paneli', icon: '🔲', tier: 1, description: 'Radyasyonu elektriğe çeviren panel' },
      { name: 'Oksijen Kapsülü', icon: '🫧', tier: 1, description: 'Sıvılaştırılmış saf nefes' },
      { name: 'Hidroponik Sera', icon: '🌱', tier: 2, description: 'Topraksız tarım modülü' },
      { name: 'Basınçlı Kask', icon: '👨‍🚀', tier: 2, description: 'Uzay yürüyüşü başlığı' },
      { name: 'Termal Batarya', icon: '🔋', tier: 2, description: 'Gece dondurucu soğuğa karşı güç' },
      { name: 'Mars Rover Aracı', icon: '🚜', tier: 2, description: '6 tekerlekli otonom kâşif' },
      { name: 'Yeraltı Buz Sondajı', icon: '⛏️', tier: 3, description: 'Kutup buzullarını eriten sondaj (Kol A)' },
      { name: 'Biyo-Kubbe Yaşam Alanı', icon: '🛖', tier: 3, description: 'İnsanların yaşadığı korunaklı kubbe (Kol A)' },
      { name: 'Roket Fırlatma Rampası', icon: '🚀', tier: 3, description: 'Dünya ile ikmal hattı (Kol B)' },
      { name: 'Atmosfer Jeneratörü', icon: '💨', tier: 3, description: 'Karbondioksiti havaya çeviren tesis (Kol B)' },
      { name: 'Olympus Mons Üssü', icon: '🏔️', tier: 4, description: 'Kol A Şaheseri: Güneş sisteminin en yüksek volkanındaki şehir' },
      { name: 'Terraform Reaktörü', icon: '🌐', tier: 4, description: 'Kol B Şaheseri: Gezegeni yeşile dönüştüren mega motor' },
      { name: 'Kızıl Gezegen Şehri', icon: '🏙️', tier: 5, description: 'Kol A Zirvesi: İkinci medeniyetin başkenti' },
      { name: 'Güneş Sistemi Federasyonu', icon: '🛰️', tier: 5, description: 'Kol B Zirvesi: Gezegenler arası ittifak' },
      { name: 'İki Dünyanın Hakimi', icon: '👑', tier: 6, description: 'ZİRVE: Dünya ve Mars’ı birleştiren lider' },
    ],
  },

  // 14. YERALTI MADENCİLİĞİ & CEVHERLER (Deep Mining)
  {
    name: 'Yeraltı Madenciliği & Cevherler',
    icon: '⛏️',
    themeColor: 'amber',
    gradientFrom: 'from-amber-800',
    gradientTo: 'to-stone-950',
    badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
    itemTemplates: [
      { name: 'Madenci Feneri', icon: '🔦', tier: 1, description: 'Kaskın üstündeki parlak karpit feneri' },
      { name: 'Çelik Kazma', icon: '⛏️', tier: 1, description: 'Kaya damarlarını kıran keskin kazma' },
      { name: 'Kömür Parçası', icon: '🪨', tier: 1, description: 'Yüksek kalorili kara taş' },
      { name: 'Dinamit Lokumu', icon: '🧨', tier: 2, description: 'Tünel açan kontrollü patlayıcı' },
      { name: 'Maden Vagonu', icon: '🛒', tier: 2, description: 'Raylarda giden cevher arabası' },
      { name: 'Bakır Külçe', icon: '🥉', tier: 2, description: 'Fırında eritilmiş kırmızı bakır' },
      { name: 'Gümüş Damarı', icon: '🥈', tier: 2, description: 'Kayaların arasında parlayan damar' },
      { name: 'Zümrüt Jeodu', icon: '🟢', tier: 3, description: 'Kırıldığında içi parlayan kristal kaya (Kol A)' },
      { name: 'Altın Külçesi', icon: '🪙', tier: 3, description: 'Kusursuz saflıkta altın blok (Kol A)' },
      { name: 'Hidrolik Matkap', icon: '🔩', tier: 3, description: 'Graniti saniyeler içinde delen canavar (Kol B)' },
      { name: 'Havalandırma Şaftı', icon: '🌀', tier: 3, description: 'Kilometrelerce derine temiz hava basan fan (Kol B)' },
      { name: 'Elmas Kristali', icon: '💎', tier: 4, description: 'Kol A Şaheseri: Milyarlarca yıllık basıncın şaheseri' },
      { name: 'Yeraltı Maden Metropolü', icon: '🏛️', tier: 4, description: 'Kol B Şaheseri: Mağaralara kurulmuş şehir' },
      { name: 'Dünyanın Çekirdek Taşı', icon: '🔮', tier: 5, description: 'Kol A Zirvesi: Gezegenin manyetik kalbi' },
      { name: 'Hazineler Dağı Hükmü', icon: '👑', tier: 5, description: 'Kol B Zirvesi: Tüm yeraltı zenginliklerinin sahibi' },
      { name: 'Kusursuz Mücevher Tacı', icon: '🏆', tier: 6, description: 'ZİRVE: Yeryüzünün en nadir minerallerinin sentezi' },
    ],
  },

  // 15. RÖNESANS & GÜZEL SANATLAR (Fine Arts & Renaissance)
  {
    name: 'Rönesans & Güzel Sanatlar',
    icon: '🎨',
    themeColor: 'amber',
    gradientFrom: 'from-amber-600',
    gradientTo: 'to-rose-800',
    badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
    itemTemplates: [
      { name: 'Keten Tuval', icon: '📜', tier: 1, description: 'Şaseye gerilmiş beyaz tuval' },
      { name: 'Samur Fırça', icon: '🖌️', tier: 1, description: 'İnce detayları çizen usta fırçası' },
      { name: 'Yağlıboya Tüpü', icon: '🎨', tier: 1, description: 'Doğal pigmentli parlak boya' },
      { name: 'Mermer Bloğu', icon: '🪨', tier: 2, description: 'İçinde heykeli gizleyen Carrara mermeri' },
      { name: 'Heykeltıraş Keskesi', icon: '🔨', tier: 2, description: 'Mermere şekil veren çelik alet' },
      { name: 'Altın Varak Çerçeve', icon: '🖼️', tier: 2, description: 'Tabloları taçlandıran oymalı çerçeve' },
      { name: 'Pergel ve Cetvel', icon: '📐', tier: 2, description: 'Altın oranı hesaplayan çizim takımı' },
      { name: 'Klasik Büst Heykeli', icon: '🗿', tier: 3, description: 'Kusursuz orantılı mermer yüz (Kol A)' },
      { name: 'Fresk Duvar Resmi', icon: '🏛️', tier: 3, description: 'Katedral tavanına çizilen destan (Kol A)' },
      { name: 'Usta Eskiz Defteri', icon: '📖', tier: 3, description: 'Uçan makineler ve anatomi çizimleri (Kol B)' },
      { name: 'Vitray Cam Pencere', icon: '🪟', tier: 3, description: 'Güneş ışığını gökkuşağına çeviren cam (Kol B)' },
      { name: 'Mona Lisa Şaheseri', icon: '👩‍🎨', tier: 4, description: 'Kol A Şaheseri: Gizemli gülüşün ölümsüz tablosu' },
      { name: 'Davut Heykeli', icon: '🏆', tier: 4, description: 'Kol B Şaheseri: Rönesans heykel sanatının zirvesi' },
      { name: 'Büyük Sanat Galerisi', icon: '🏰', tier: 5, description: 'Kol A Zirvesi: Louvre ve Uffizi mirası' },
      { name: 'Rönesans Polimat Dehası', icon: '🧠', tier: 5, description: 'Kol B Zirvesi: Da Vinci ve Michelangelo ruhu' },
      { name: 'Sanatın Ebedi Şaheseri', icon: '👑', tier: 6, description: 'ZİRVE: İnsanlık ruhunun en büyük sanatsal mirası' },
    ],
  },

  // 16. KAFE & GURME PASTANESİ (Bakery & Café)
  {
    name: 'Kafe & Gurme Pastanesi',
    icon: '☕',
    themeColor: 'amber',
    gradientFrom: 'from-amber-600',
    gradientTo: 'to-yellow-800',
    badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
    itemTemplates: [
      { name: 'Kavrulmuş Kahve Çekirdeği', icon: '🫘', tier: 1, description: 'Aromatik taze Arabica çekirdeği' },
      { name: 'Vanilya Çubuğu', icon: '🌿', tier: 1, description: 'Mis kokulu tatlı vanilya' },
      { name: 'Taze Krema', icon: '🥛', tier: 1, description: 'Kıvamlı süt kreması' },
      { name: 'Sıcak Espresso', icon: '☕', tier: 2, description: 'Yoğun kremalı sert kahve' },
      { name: 'Tereyağlı Kruvasan', icon: '🥐', tier: 2, description: 'Kat kat açılmış çıtır Fransız lezzeti' },
      { name: 'Çikolatalı Donut', icon: '🍩', tier: 2, description: 'Renkli şekerlemeli yumuşak çörek' },
      { name: 'Köpüklü Latte', icon: '🧋', tier: 2, description: 'Üstünde kalp deseni olan sütlü kahve' },
      { name: 'Çilekli Cheesecake', icon: '🍰', tier: 3, description: 'Fırınlanmış kıvamlı peynir tatlısı (Kol A)' },
      { name: 'Karamelli Makaron', icon: '🧁', tier: 3, description: 'Badem unundan renkli Fransız kurabiyesi (Kol A)' },
      { name: 'İtalyan Tiramisu', icon: '🍮', tier: 3, description: 'Kahveye batırılmış kedi dilli tatlı (Kol B)' },
      { name: 'Belçika Vafılı', icon: '🧇', tier: 3, description: 'Meyve ve sıcak çikolata soslu gofret (Kol B)' },
      { name: 'Şefin Çok Katlı Düğün Pastası', icon: '🎂', tier: 4, description: 'Kol A Şaheseri: 5 katlı şeker çiçekli sanat eseri' },
      { name: 'El Yapımı Çikolata Kutusu', icon: '🍫', tier: 4, description: 'Kol B Şaheseri: Fındıklı, fıstıklı trüf şaheseri' },
      { name: 'Paris Gurme Kafe Köşesi', icon: '🏬', tier: 5, description: 'Kol A Zirvesi: Şanzelize manzaralı ünlü pastane' },
      { name: 'Dünya Barista Şampiyonu', icon: '🏆', tier: 5, description: 'Kol B Zirvesi: Kahve sanatının büyük ustası' },
      { name: 'Kraliyet Tatlı Şöleni', icon: '👑', tier: 6, description: 'ZİRVE: Tatlı ve kahvenin damağı fetheden uyumu' },
    ],
  },

  // 17. SİMYA & BÜYÜLÜ REAKSİYONLAR (Alchemy Lab)
  {
    name: 'Simya & Element Dönüşümü',
    icon: '⚗️',
    themeColor: 'purple',
    gradientFrom: 'from-purple-700',
    gradientTo: 'to-indigo-900',
    badgeBg: 'bg-purple-500/20 text-purple-300 border-purple-400/40',
    itemTemplates: [
      { name: 'Cıva Damlası', icon: '💧', tier: 1, description: 'Akan sıvı gümüş metali' },
      { name: 'Kükürt Taşı', icon: '🟡', tier: 1, description: 'Ateşle tepkimeye giren sarı mineral' },
      { name: 'Bakır Talaşı', icon: '🪙', tier: 1, description: 'Simyacının dönüştürmek istediği temel maden' },
      { name: 'Simya Kazanı', icon: '🍲', tier: 2, description: 'Fokurdayan iksir kazanı' },
      { name: 'Damıtma İbiği', icon: '⚗️', tier: 2, description: 'Buharı saflaştıran cam boru' },
      { name: 'Hayat İksiri', icon: '🧪', tier: 2, description: 'Parıldayan yeşil şifa karışımı' },
      { name: 'Gümüş Paraşüt', icon: '✨', tier: 2, description: 'Gümüşe dönüşen alaşım' },
      { name: 'Altın Tozu Reaksiyonu', icon: '🌟', tier: 3, description: 'Sıradan metali altına çeviren toz (Kol A)' },
      { name: 'Ouroboros Yılan Halkası', icon: '🐍', tier: 3, description: 'Kendi kuyruğunu ısıran sonsuzluk simgesi (Kol A)' },
      { name: 'Ayın Özü İksiri', icon: '🌙', tier: 3, description: 'Gecenin ışığını emen gümüş sıvı (Kol B)' },
      { name: 'Güneşin Kalbi Özü', icon: '☀️', tier: 3, description: 'Gündüzün sıcaklığını hapseden alev özü (Kol B)' },
      { name: 'Efsanevi Felsefe Taşı', icon: '💎', tier: 4, description: 'Kol A Şaheseri: Ölümsüzlük ve sonsuz altın kaynağı' },
      { name: 'Homunkulus Fanusu', icon: '🧬', tier: 4, description: 'Kol B Şaheseri: Simyayla yaratılan sentetik yaşam' },
      { name: 'Simyacılar Loncası Mabedi', icon: '🏛️', tier: 5, description: 'Kol A Zirvesi: Kadim bilgi kütüphanesi' },
      { name: 'Büyük Üstat Hermetik', icon: '🧙‍♂️', tier: 5, description: 'Kol B Zirvesi: Doğanın 4 elementini birleştiren bilge' },
      { name: 'Magnum Opus (Büyük Eser)', icon: '👑', tier: 6, description: 'ZİRVE: Simya sanatının nihai mükemmelliği' },
    ],
  },

  // 18. İLLÜZYON & SİHİRBAZLIK (Illusion & Magic Show)
  {
    name: 'İllüzyon & Sihirbazlık',
    icon: '🎩',
    themeColor: 'indigo',
    gradientFrom: 'from-indigo-600',
    gradientTo: 'to-slate-900',
    badgeBg: 'bg-indigo-500/20 text-indigo-300 border-indigo-400/40',
    itemTemplates: [
      { name: 'İskambil Ası', icon: '🂡', tier: 1, description: 'Hileli sihirbaz destesi' },
      { name: 'Beyaz Güvercin Tüyü', icon: '🪶', tier: 1, description: 'Kafesten çıkan kuş tüyü' },
      { name: 'Kırmızı İpek Mendil', icon: '🧣', tier: 1, description: 'Avuçta kaybolan mendil' },
      { name: 'Sihirli Silindir Şapka', icon: '🎩', tier: 2, description: 'İçinden tavşan çıkan şapka' },
      { name: 'Işıltılı Değnek', icon: '🪄', tier: 2, description: 'Kıvılcım çıkaran gösteri çubuğu' },
      { name: 'Sihirli Aynalı Kutu', icon: '📦', tier: 2, description: 'Nesneleri yok eden gizli bölme' },
      { name: 'Köstekli Hipnoz Saati', icon: '⏱️', tier: 2, description: 'Sallanan sarkaç saati' },
      { name: 'Beyaz Tavşan', icon: '🐇', tier: 3, description: 'Şapkadan fırlayan sevimli tavşan (Kol A)' },
      { name: 'Kılıçlı Kutu Numarası', icon: '🗡️', tier: 3, description: 'Kılıçlar saplanan ahşap kutu (Kol A)' },
      { name: 'Havadaki Levitasör', icon: '🧘', tier: 3, description: 'Yerçekimini hiçe sayan gösteri (Kol B)' },
      { name: 'Kayıp Kart Tahmini', icon: '🃏', tier: 3, description: 'Seyircinin aklındaki kartı bilen zihin okuma (Kol B)' },
      { name: 'Büyük İllüzyon Kafesi', icon: '🎪', tier: 4, description: 'Kol A Şaheseri: Göz açıp kapayıncaya kadar kaybolan fil' },
      { name: 'Houdini Su Tankı Kaçışı', icon: '⛓️', tier: 4, description: 'Kol B Şaheseri: Kilitli su tankından mucizevi kaçış' },
      { name: 'Las Vegas Sihir Sahnesi', icon: '🌟', tier: 5, description: 'Kol A Zirvesi: Milyonları büyüleyen büyük gösteri' },
      { name: 'Dünya İllüzyon Kralı', icon: '👑', tier: 5, description: 'Kol B Zirvesi: Gerçek ile hayali ayıran usta' },
      { name: 'Büyük Mucize Aynası', icon: '🏆', tier: 6, description: 'ZİRVE: İmkansızı gözler önüne seren nihai illüzyon' },
    ],
  },

  // 19. ATLANTIS & KAYIP SUALTI KRALLIĞI (Atlantis Underwater Realm)
  {
    name: 'Kayıp Atlantis Krallığı',
    icon: '🔱',
    themeColor: 'teal',
    gradientFrom: 'from-teal-600',
    gradientTo: 'to-blue-950',
    badgeBg: 'bg-teal-500/20 text-teal-300 border-teal-400/40',
    itemTemplates: [
      { name: 'Parlayan Su Mercanı', icon: '🪸', tier: 1, description: 'Derinliklerde mavi parlayan canlı kaya' },
      { name: 'Sedef İnci', icon: '🦪', tier: 1, description: 'Dev istiridyeden çıkan kusursuz inci' },
      { name: 'Deniz Suyu Akıntısı', icon: '🌊', tier: 1, description: 'Sıcak okyanus akımı enerjisi' },
      { name: 'Deniz Kabuğu Trompeti', icon: '🐚', tier: 2, description: 'Balinaları çağıran derin ses borusu' },
      { name: 'Işıklı Denizatı', icon: '🪼', tier: 2, description: 'Sualtı bahçelerinde süzülen varlık' },
      { name: 'Akuamarin Taşı', icon: '💎', tier: 2, description: 'Okyanus rengi büyü kristali' },
      { name: 'Batık Mermer Sütun', icon: '🏛️', tier: 2, description: 'Yosun tutmuş kadim tapınak parçası' },
      { name: 'Denizkızı Tacı', icon: '👑', tier: 3, description: 'İnci ve mercanla örülmüş taç (Kol A)' },
      { name: 'Dev Kaplumbağa Bineği', icon: '🐢', tier: 3, description: 'Sırtında kütüphane taşıyan kadim kaplumbağa (Kol A)' },
      { name: 'Sualtı Şehir Kubbesi', icon: '🛖', tier: 3, description: 'Hava kabarcığı içindeki kristal saray (Kol B)' },
      { name: 'Poseidon Muhafızı', icon: '🧜‍♂️', tier: 3, description: 'Mızraklı sualtı şövalyesi (Kol B)' },
      { name: 'Batık Altın Tapınak', icon: '🏰', tier: 4, description: 'Kol A Şaheseri: Bin yıldır okyanus tabanında bekleyen tapınak' },
      { name: 'Kutsal Poseidon Üç Dişlisi', icon: '🔱', tier: 4, description: 'Kol B Şaheseri: Dalgalara ve fırtınalara hükmeden mızrak' },
      { name: 'Atlantis Enerji Piramidi', icon: '🔺', tier: 5, description: 'Kol A Zirvesi: Şehre sonsuz güç veren kristal kule' },
      { name: 'Okyanuslar İmparatoriçesi', icon: '🧜‍♀️', tier: 5, description: 'Kol B Zirvesi: 7 Denizin sualtı kraliçesi' },
      { name: 'Atlantis Ebedi Zaferi', icon: '🏆', tier: 6, description: 'ZİRVE: Kayıp krallığın sular üstüne yükselişi' },
    ],
  },

  // 20. BÖLÜM 100 FİNALİ: COMMATCH BÜYÜK ŞAMPİYONASI (Grand Finale Level 100)
  {
    name: 'Commatch! Büyük Şampiyonası',
    icon: '👑',
    themeColor: 'amber',
    gradientFrom: 'from-amber-400 via-rose-500',
    gradientTo: 'to-cyan-400',
    badgeBg: 'bg-gradient-to-r from-amber-500/30 to-cyan-500/30 text-amber-200 border-amber-300/50',
    itemTemplates: [
      { name: 'Kozmik Kıvılcım', icon: '✨', tier: 1, description: 'Evrenin ilk doğum anındaki saf enerji' },
      { name: 'Zaman Damlası', icon: '⏳', tier: 1, description: 'Tüm çağların hafızasını taşıyan damla' },
      { name: 'Birlik Kristali', icon: '💎', tier: 1, description: '100 bölüm boyunca topladığın güç' },
      { name: 'Yaratılış Matrisi', icon: '🌀', tier: 2, description: 'Maddenin şekil aldığı kozmik şablon' },
      { name: 'Elementler Küresi', icon: '🔮', tier: 2, description: 'Ateş, su, toprak ve havayı bağlayan küre' },
      { name: 'Yıldızlar Kapısı', icon: '🌌', tier: 2, description: 'Tüm boyutları tek noktada birleştiren geçit' },
      { name: 'Şampiyon Meşalesi', icon: '🔥', tier: 2, description: '100. bölüme kadar hiç sönmeyen inanç ateşi' },
      { name: 'Kozmik Felsefe Küpü', icon: '💠', tier: 3, description: 'Bütün sırları içinde saklayan hiperküp (Kol A)' },
      { name: 'Zaman Kütüphanesi', icon: '📖', tier: 3, description: 'Geçmiş ve geleceğin tüm tarifleri (Kol A)' },
      { name: 'Sonsuzluk Asası', icon: '🪄', tier: 3, description: 'Tüm eşyaları var edip birleştiren asa (Kol B)' },
      { name: 'Galaktik Ejderha Muhafızı', icon: '🐉', tier: 3, description: 'Evrenin kalbini koruyan yıldız ejderi (Kol B)' },
      { name: 'Sonsuz Evrenler Matrisi', icon: '🌟', tier: 4, description: 'Kol A Şaheseri: Milyarlarca galaksinin tek bir formüldeki dansı' },
      { name: 'Commatch Efsanesi Kalbi', icon: '💖', tier: 4, description: 'Kol B Şaheseri: Oyunun ruhunu oluşturan birleştirme sevgisi' },
      { name: 'Zamanın ve Maddenin Efendisi', icon: '🤴', tier: 5, description: 'Kol A Zirvesi: 100 seviyeyi fetheden büyük usta' },
      { name: 'Büyük Şampiyonlar Şatosu', icon: '🏰', tier: 5, description: 'Kol B Zirvesi: Ebedi onur salonunun zirvesi' },
      { name: 'Commatch! Yüce Şampiyonluk Tacı', icon: '👑', tier: 6, description: '100. BÖLÜM BÜYÜK FİNALİ: Tüm 100 seviyeyi tamamlayan büyük efsanevi şampiyon!' },
    ],
  },
];

// =========================================================================
// GENERATE EXACTLY 100 RICH PROGRESSIVE LEVELS WITH NO REPETITIVE SETS
// =========================================================================
export function generateAll100Categories(): LevelCategory[] {
  const categories: LevelCategory[] = [...BASE_CATEGORIES];

  let currentLevelNum = categories.length + 1;
  let templateIndex = 0;

  // Generate levels up to level 99 from varied unique templates
  while (currentLevelNum < 100) {
    const template = THEME_TEMPLATES[templateIndex % (THEME_TEMPLATES.length - 1)];
    const cycle = Math.floor(templateIndex / (THEME_TEMPLATES.length - 1)) + 1;
    const levelId = `level_gen_${currentLevelNum}`;
    const titleTr = `${template.icon} ${template.name.toUpperCase()} ${cycle > 1 ? `[Kademe ${cycle}]` : ''}`;

    const prefix = `l${currentLevelNum}_`;
    const items: ItemDef[] = template.itemTemplates.map((t, idx) => ({
      id: `${prefix}${idx}`,
      name: t.name,
      icon: t.icon,
      tier: t.tier,
      isBase: t.tier === 1,
      description: t.description,
    }));

    const baseItemIds = items.filter((i) => i.isBase).map((i) => i.id);

    const recipes: { a: string; b: string; result: string }[] = [
      { a: items[0].id, b: items[1].id, result: items[3].id },
      { a: items[1].id, b: items[2].id, result: items[4].id },
      { a: items[0].id, b: items[2].id, result: items[5].id },
      { a: items[0].id, b: items[0].id, result: items[6].id },

      { a: items[3].id, b: items[4].id, result: items[7].id },
      { a: items[7].id, b: items[3].id, result: items[8].id },

      { a: items[5].id, b: items[6].id, result: items[9].id },
      { a: items[9].id, b: items[5].id, result: items[10].id },

      { a: items[7].id, b: items[8].id, result: items[11].id },
      { a: items[9].id, b: items[10].id, result: items[12].id },

      { a: items[11].id, b: items[7].id, result: items[13].id },
      { a: items[12].id, b: items[9].id, result: items[14].id },

      { a: items[13].id, b: items[14].id, result: items[15].id },
    ];

    categories.push({
      id: levelId,
      levelNumber: currentLevelNum,
      name: `${template.name} ${cycle > 1 ? `(${cycle})` : ''}`,
      titleTr,
      icon: template.icon,
      themeColor: template.themeColor,
      gradientFrom: template.gradientFrom,
      gradientTo: template.gradientTo,
      badgeBg: template.badgeBg,
      baseItemIds,
      items,
      recipes,
    });

    currentLevelNum++;
    templateIndex++;
  }

  // LEVEL 100: GRAND FINALE THEME
  if (categories.length === 99) {
    const finalTemplate = THEME_TEMPLATES[THEME_TEMPLATES.length - 1]; // Finale template
    const prefix = 'l100_';
    const items: ItemDef[] = finalTemplate.itemTemplates.map((t, idx) => ({
      id: `${prefix}${idx}`,
      name: t.name,
      icon: t.icon,
      tier: t.tier,
      isBase: t.tier === 1,
      description: t.description,
    }));

    const baseItemIds = items.filter((i) => i.isBase).map((i) => i.id);

    const recipes: { a: string; b: string; result: string }[] = [
      { a: items[0].id, b: items[1].id, result: items[3].id },
      { a: items[1].id, b: items[2].id, result: items[4].id },
      { a: items[0].id, b: items[2].id, result: items[5].id },
      { a: items[0].id, b: items[0].id, result: items[6].id },

      { a: items[3].id, b: items[4].id, result: items[7].id },
      { a: items[7].id, b: items[3].id, result: items[8].id },

      { a: items[5].id, b: items[6].id, result: items[9].id },
      { a: items[9].id, b: items[5].id, result: items[10].id },

      { a: items[7].id, b: items[8].id, result: items[11].id },
      { a: items[9].id, b: items[10].id, result: items[12].id },

      { a: items[11].id, b: items[7].id, result: items[13].id },
      { a: items[12].id, b: items[9].id, result: items[14].id },

      { a: items[13].id, b: items[14].id, result: items[15].id },
    ];

    categories.push({
      id: 'level_100_grand_finale',
      levelNumber: 100,
      name: 'Commatch! Büyük Şampiyonası (FİNAL)',
      titleTr: '👑 BÖLÜM 100: BÜYÜK FİNAL',
      icon: '👑',
      themeColor: 'amber',
      gradientFrom: 'from-amber-400 via-rose-500',
      gradientTo: 'to-cyan-400',
      badgeBg: 'bg-gradient-to-r from-amber-500/30 to-cyan-500/30 text-amber-200 border-amber-300/50',
      baseItemIds,
      items,
      recipes,
    });
  }

  return categories;
}

export const CATEGORIES: LevelCategory[] = generateAll100Categories();

export type DifficultyTier = 'easy' | 'medium' | 'hard';

export interface DifficultyInfo {
  tier: DifficultyTier;
  label: 'TEMEL' | 'ORTA' | 'ZOR';
  challengeLevel: number;
  displayText: string; // "TEMEL", "ORTA +1", "ZOR +1"
  badgeClass: string;
  isMediumMode: boolean;
  isHardMode: boolean;
  difficultyRating: number;
  goldReward: number;
}

export function getDifficultyTier(levelIndex: number): DifficultyTier {
  const levelNumber = levelIndex + 1;
  if (levelNumber < 10) return 'easy';
  if (levelNumber < 20) return 'medium';
  return 'hard';
}

/**
 * Calculates progressive difficulty metrics for a level:
 * - Level 1-9:   TEMEL / Standart (0)
 * - Level 10-19: ORTA (Sarı / Amber), Challenge: +1 to +10 (Level 10 is ORTA +1)
 * - Level 20+:   ZOR (Kırmızı / Alevli), Challenge: +1 to +81 (Level 20 is ZOR +1)
 */
export function getLevelDifficulty(levelNumber: number): DifficultyInfo {
  if (levelNumber < 10) {
    return {
      tier: 'easy',
      label: 'TEMEL',
      challengeLevel: 0,
      displayText: 'TEMEL',
      badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40',
      isMediumMode: false,
      isHardMode: false,
      difficultyRating: 1,
      goldReward: 250 + (levelNumber - 1) * 35,
    };
  } else if (levelNumber < 20) {
    const challengeLevel = levelNumber - 9; // Lv 10: +1, Lv 11: +2 ... Lv 19: +10
    return {
      tier: 'medium',
      label: 'ORTA',
      challengeLevel,
      displayText: `ORTA +${challengeLevel}`,
      badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-400/50 shadow-sm shadow-amber-500/20',
      isMediumMode: true,
      isHardMode: false,
      difficultyRating: 2,
      goldReward: 250 + (levelNumber - 1) * 35 + challengeLevel * 30,
    };
  } else {
    const challengeLevel = levelNumber - 19; // Lv 20: +1, Lv 21: +2 ...
    return {
      tier: 'hard',
      label: 'ZOR',
      challengeLevel,
      displayText: `ZOR +${challengeLevel}`,
      badgeClass: 'bg-gradient-to-r from-red-600/90 to-amber-600/90 text-amber-200 border-red-500/60 shadow-md shadow-red-500/30 animate-pulse',
      isMediumMode: false,
      isHardMode: true,
      difficultyRating: Math.min(10, Math.floor((levelNumber - 20) / 10) + 3),
      goldReward: 250 + (levelNumber - 1) * 35 + (10 * 30) + challengeLevel * 50,
    };
  }
}

/**
 * Enhanced Universal Category Item Resolver
 * - Direct recipes are ALWAYS strictly prioritized.
 * - In Level 10-19 (ORTA Modu):
 *   1. Mismatched tier merging returns same-tier pool items to prevent cheating.
 *   2. Merging SAME tier items (Tier N + Tier N) unlocks Tier N + 1 smoothly.
 *   3. Final Tier 6 apex requires dual-branch synthesis.
 * - In Level 20+ (ZOR Modu):
 *   1. Strict dual-branch requirement applies to both Tier 5 and Tier 6 apexes.
 * - In Level 1-9 (TEMEL Modu):
 *   Allows forgiving progression for newcomers.
 */
export function resolveCategoryMerge(
  category: LevelCategory,
  itemAId: string,
  itemBId: string,
  discoveredIds: string[]
): ItemDef {
  // 1. Direct recipe check (ALWAYS strictly respected)
  const recipeMatch = category.recipes.find(
    (r) =>
      (r.a === itemAId && r.b === itemBId) ||
      (r.a === itemBId && r.b === itemAId)
  );

  if (recipeMatch) {
    const item = category.items.find((i) => i.id === recipeMatch.result);
    if (item) return item;
  }

  const itemA = category.items.find((i) => i.id === itemAId) || category.items[0];
  const itemB = category.items.find((i) => i.id === itemBId) || category.items[0];

  const highestInputTier = Math.max(itemA.tier, itemB.tier);
  const isSameTier = itemA.tier === itemB.tier;
  const isMedium = category.levelNumber >= 10 && category.levelNumber < 20;
  const isHard = category.levelNumber >= 20;

  // =========================================================================
  // ORTA & ZOR MODU (Level 10+)
  // =========================================================================
  if (isMedium || isHard) {
    // If tiers are DIFFERENT (e.g. T4 + T1):
    // Prevents cheap shortcuts by returning a same-tier item from dominant tier
    if (!isSameTier) {
      const dominantItem = itemA.tier >= itemB.tier ? itemA : itemB;
      const sameTierPool = category.items.filter((i) => i.tier === dominantItem.tier);
      if (sameTierPool.length > 0) {
        const hash = Math.abs(itemAId.charCodeAt(0) * 11 + itemBId.charCodeAt(0) * 17) % sameTierPool.length;
        return sameTierPool[hash];
      }
      return dominantItem;
    }

    // When merging SAME tier items (Tier N + Tier N):
    const nextTier = highestInputTier + 1;

    // In Medium (Lv 10-19): Only Tier 6 is strict Apex
    // In Hard (Lv 20+): Tier 5 and Tier 6 are strict Apexes
    const strictApexThreshold = isHard ? 5 : 6;

    if (nextTier < strictApexThreshold) {
      const undiscoveredNextTier = category.items.filter(
        (i) => !discoveredIds.includes(i.id) && i.tier === nextTier
      );
      if (undiscoveredNextTier.length > 0) {
        return undiscoveredNextTier[0];
      }

      const allNextTier = category.items.filter((i) => i.tier === nextTier);
      if (allNextTier.length > 0) {
        const hash = Math.abs(itemAId.charCodeAt(0) * 7 + itemBId.charCodeAt(0) * 13) % allNextTier.length;
        return allNextTier[hash];
      }
    }

    // For apex merges or fallback within tier:
    const sameTierItems = category.items.filter((i) => i.tier === highestInputTier);
    if (sameTierItems.length > 0) {
      const hash = Math.abs(itemAId.charCodeAt(0) + itemBId.charCodeAt(0)) % sameTierItems.length;
      return sameTierItems[hash];
    }

    return itemA.tier >= itemB.tier ? itemA : itemB;
  }

  // =========================================================================
  // CASUAL / EASY MODE RESOLUTION (Levels 1 to 9)
  // =========================================================================
  const undiscoveredTarget = category.items.filter(
    (i) => !discoveredIds.includes(i.id) && i.tier >= highestInputTier
  );

  if (undiscoveredTarget.length > 0) {
    undiscoveredTarget.sort((a, b) => a.tier - b.tier);
    return undiscoveredTarget[0];
  }

  const higherTierItems = category.items.filter((i) => i.tier > highestInputTier);
  if (higherTierItems.length > 0) {
    const hash = Math.abs(itemAId.length * 7 + itemBId.length * 13) % higherTierItems.length;
    return higherTierItems[hash];
  }

  const sameTierItems = category.items.filter((i) => i.tier === highestInputTier);
  if (sameTierItems.length > 0) {
    const hash = Math.abs(itemAId.charCodeAt(0) + itemBId.charCodeAt(0)) % sameTierItems.length;
    return sameTierItems[hash];
  }

  return itemA;
}

/**
 * Calculates a recipe hint for the next undiscovered item in the category
 */
export function getHintForCategory(
  category: LevelCategory,
  discoveredIds: string[]
): { targetItem: ItemDef; itemA: ItemDef; itemB: ItemDef } | null {
  // Find first undiscovered item in category order
  const targetItem = category.items.find((i) => !discoveredIds.includes(i.id));
  if (!targetItem) return null;

  // 1. Direct recipe lookup
  const recipe = category.recipes.find((r) => r.result === targetItem.id);
  if (recipe) {
    const itemA = category.items.find((i) => i.id === recipe.a);
    const itemB = category.items.find((i) => i.id === recipe.b);
    if (itemA && itemB) {
      return { targetItem, itemA, itemB };
    }
  }

  // 2. Tier-based or parent branch fallback
  const lowerTierItems = category.items.filter((i) => i.tier < targetItem.tier);
  if (lowerTierItems.length >= 2) {
    const prevTierItems = category.items.filter((i) => i.tier === Math.max(1, targetItem.tier - 1));
    const itemA = prevTierItems[0] || lowerTierItems[0];
    const itemB = prevTierItems[1] || prevTierItems[0] || lowerTierItems[1];
    return { targetItem, itemA, itemB };
  }

  const baseItems = category.items.filter((i) => i.isBase);
  if (baseItems.length >= 2) {
    return { targetItem, itemA: baseItems[0], itemB: baseItems[1] };
  }

  return null;
}

/**
 * Retrieves the recipe formula or base item status for any specified item in a category
 */
export function getItemRecipeInfo(
  category: LevelCategory,
  targetItemId: string
): { targetItem: ItemDef; itemA: ItemDef | null; itemB: ItemDef | null; isBaseItem: boolean } | null {
  const targetItem = category.items.find((i) => i.id === targetItemId);
  if (!targetItem) return null;

  if (targetItem.isBase || targetItem.tier === 1) {
    return { targetItem, itemA: null, itemB: null, isBaseItem: true };
  }

  // 1. Direct recipe lookup
  const recipe = category.recipes.find((r) => r.result === targetItem.id);
  if (recipe) {
    const itemA = category.items.find((i) => i.id === recipe.a);
    const itemB = category.items.find((i) => i.id === recipe.b);
    if (itemA && itemB) {
      return { targetItem, itemA, itemB, isBaseItem: false };
    }
  }

  // 2. Previous tier fallback
  const prevTierItems = category.items.filter((i) => i.tier === Math.max(1, targetItem.tier - 1));
  if (prevTierItems.length >= 2) {
    return { targetItem, itemA: prevTierItems[0], itemB: prevTierItems[1], isBaseItem: false };
  } else if (prevTierItems.length === 1) {
    return { targetItem, itemA: prevTierItems[0], itemB: prevTierItems[0], isBaseItem: false };
  }

  const baseItems = category.items.filter((i) => i.isBase);
  if (baseItems.length >= 2) {
    return { targetItem, itemA: baseItems[0], itemB: baseItems[1], isBaseItem: false };
  }

  return { targetItem, itemA: null, itemB: null, isBaseItem: true };
}

