import { useState } from "react";
import { motion } from "motion/react";
import { Star, ExternalLink, RotateCcw, Sparkles } from "lucide-react";

type Recipient = "Partner" | "Mom" | "Dad" | "Friend" | "Sibling" | "Colleague" | "Child";
type Occasion = "Birthday" | "Anniversary" | "Wedding" | "Graduation" | "Holiday" | "Just Because" | "Thank You";
type Budget = "Under ₹2,500" | "₹2,500–₹6,000" | "₹6,000–₹12,500" | "₹12,500+";
type Interest = "Tech" | "Books" | "Fashion" | "Food & Drink" | "Travel" | "Sports" | "Art & Craft" | "Wellness" | "Music" | "Home";

interface GiftItem {
  id: number;
  name: string;
  tagline: string;
  category: string;
  priceRange: string;
  priceLevel: 1 | 2 | 3 | 4;
  for: Recipient[];
  occasions: Occasion[];
  interests: Interest[];
  image: string;
  why: string;
  rating: number;
  amazonUrl: string;
  nykaaUrl?: string;
}

const GIFTS: GiftItem[] = [
  {
    id: 1,
    name: "Custom Star Map Print",
    tagline: "The sky on your most special night",
    category: "Sentimental",
    priceRange: "₹2,900–₹4,600",
    priceLevel: 2,
    for: ["Partner", "Mom", "Friend", "Sibling"],
    occasions: ["Anniversary", "Birthday", "Wedding"],
    interests: ["Art & Craft", "Home"],
    image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=600&h=700&fit=crop&auto=format",
    why: "A timeless keepsake capturing a date that matters most.",
    rating: 4.9,
    amazonUrl: "https://www.amazon.in/s?k=custom+star+map+print+gift",
  },
  {
    id: 2,
    name: "Wireless Headphones",
    tagline: "Studio-quality sound, anywhere",
    category: "Tech",
    priceRange: "₹10,000–₹15,000",
    priceLevel: 3,
    for: ["Partner", "Dad", "Friend", "Sibling", "Colleague"],
    occasions: ["Birthday", "Graduation", "Holiday"],
    interests: ["Tech", "Music", "Travel"],
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=700&fit=crop&auto=format",
    why: "Works for nearly everyone who commutes, travels, or loves music.",
    rating: 4.8,
    amazonUrl: "https://www.amazon.in/s?k=wireless+noise+cancelling+headphones",
  },
  {
    id: 3,
    name: "Artisan Tea Tasting Set",
    tagline: "A world tour in every cup",
    category: "Food & Drink",
    priceRange: "₹3,300–₹5,400",
    priceLevel: 2,
    for: ["Mom", "Partner", "Friend", "Colleague"],
    occasions: ["Birthday", "Thank You", "Holiday", "Just Because"],
    interests: ["Food & Drink", "Wellness"],
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&h=700&fit=crop&auto=format",
    why: "Thoughtful, sensory, and endlessly cozy.",
    rating: 4.7,
    amazonUrl: "https://www.amazon.in/s?k=artisan+tea+tasting+set+gift",
    nykaaUrl: "https://www.nykaa.com/search/result/?q=luxury+tea+gift+set",
  },
  {
    id: 4,
    name: "Premium Leather Journal",
    tagline: "For thoughts worth keeping",
    category: "Stationery",
    priceRange: "₹2,000–₹3,800",
    priceLevel: 1,
    for: ["Friend", "Colleague", "Sibling", "Partner"],
    occasions: ["Birthday", "Graduation", "Just Because", "Thank You"],
    interests: ["Books", "Art & Craft", "Travel"],
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&h=700&fit=crop&auto=format",
    why: "Timeless and personal — a blank journal is an invitation to create.",
    rating: 4.6,
    amazonUrl: "https://www.amazon.in/s?k=premium+leather+journal+diary+gift",
  },
  {
    id: 5,
    name: "Luxury Spa & Wellness Kit",
    tagline: "A spa day, gift-wrapped",
    category: "Wellness",
    priceRange: "₹4,600–₹7,500",
    priceLevel: 2,
    for: ["Mom", "Partner", "Friend", "Sibling"],
    occasions: ["Birthday", "Anniversary", "Thank You", "Holiday"],
    interests: ["Wellness", "Fashion"],
    image: "https://images.unsplash.com/photo-1607006344380-b6775a0824a7?w=600&h=700&fit=crop&auto=format",
    why: "Self-care in a box — a welcome indulgence for anyone who deserves a reset.",
    rating: 4.8,
    amazonUrl: "https://www.amazon.in/s?k=luxury+spa+wellness+gift+kit",
    nykaaUrl: "https://www.nykaa.com/search/result/?q=spa+gift+set",
  },
  {
    id: 6,
    name: "Personalized Recipe Book",
    tagline: "Recipes from the heart",
    category: "Food & Home",
    priceRange: "₹3,700–₹5,800",
    priceLevel: 2,
    for: ["Mom", "Dad", "Partner", "Friend"],
    occasions: ["Birthday", "Wedding", "Anniversary", "Holiday"],
    interests: ["Food & Drink", "Home", "Art & Craft"],
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=700&fit=crop&auto=format",
    why: "A one-of-a-kind heirloom they will reach for again and again.",
    rating: 4.7,
    amazonUrl: "https://www.amazon.in/s?k=personalized+recipe+book+gift",
  },
  {
    id: 7,
    name: "Smart Fitness Tracker",
    tagline: "Every step, tracked beautifully",
    category: "Tech",
    priceRange: "₹6,600–₹12,500",
    priceLevel: 3,
    for: ["Dad", "Partner", "Friend", "Sibling", "Colleague"],
    occasions: ["Birthday", "Graduation", "Holiday"],
    interests: ["Tech", "Sports", "Wellness"],
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&h=700&fit=crop&auto=format",
    why: "Pairs perfectly with anyone on a wellness journey.",
    rating: 4.6,
    amazonUrl: "https://www.amazon.in/s?k=smart+fitness+tracker+band",
  },
  {
    id: 8,
    name: "Curated Book Box",
    tagline: "Three books they haven't read yet",
    category: "Books",
    priceRange: "₹3,300–₹5,000",
    priceLevel: 2,
    for: ["Friend", "Partner", "Sibling", "Mom", "Colleague"],
    occasions: ["Birthday", "Holiday", "Just Because", "Thank You"],
    interests: ["Books", "Art & Craft"],
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&h=700&fit=crop&auto=format",
    why: "Hand-picked by expert curators based on their genre preferences.",
    rating: 4.9,
    amazonUrl: "https://www.amazon.in/s?k=curated+book+gift+set",
  },
  {
    id: 9,
    name: "Weekend Travel Duffel Bag",
    tagline: "For the perpetual adventurer",
    category: "Travel",
    priceRange: "₹7,100–₹11,700",
    priceLevel: 3,
    for: ["Partner", "Friend", "Dad", "Sibling", "Colleague"],
    occasions: ["Birthday", "Graduation", "Holiday"],
    interests: ["Travel", "Sports", "Fashion"],
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=700&fit=crop&auto=format",
    why: "Practical luxury — they will think of you every trip.",
    rating: 4.7,
    amazonUrl: "https://www.amazon.in/s?k=weekend+travel+duffel+bag",
  },
  {
    id: 10,
    name: "Wine & Cheese Gift Hamper",
    tagline: "An evening in a box",
    category: "Food & Drink",
    priceRange: "₹5,800–₹10,000",
    priceLevel: 3,
    for: ["Partner", "Friend", "Mom", "Dad", "Colleague"],
    occasions: ["Anniversary", "Birthday", "Thank You", "Holiday", "Wedding"],
    interests: ["Food & Drink", "Home"],
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&h=700&fit=crop&auto=format",
    why: "Elevated, shareable, and always a hit at dinner parties.",
    rating: 4.8,
    amazonUrl: "https://www.amazon.in/s?k=wine+cheese+gift+hamper",
  },
  {
    id: 11,
    name: "Deluxe Building Set",
    tagline: "Build something iconic",
    category: "Creative",
    priceRange: "₹5,000–₹15,000",
    priceLevel: 3,
    for: ["Child", "Friend", "Sibling", "Partner"],
    occasions: ["Birthday", "Holiday"],
    interests: ["Art & Craft", "Tech", "Home"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=700&fit=crop&auto=format",
    why: "Meditative, rewarding, and endlessly displayable when finished.",
    rating: 4.8,
    amazonUrl: "https://www.amazon.in/s?k=lego+architecture+set+gift",
  },
  {
    id: 12,
    name: "Personalized Gold Necklace",
    tagline: "Wear your story",
    category: "Jewelry",
    priceRange: "₹7,500–₹16,500",
    priceLevel: 4,
    for: ["Partner", "Mom", "Friend", "Sibling"],
    occasions: ["Anniversary", "Birthday", "Wedding", "Graduation"],
    interests: ["Fashion", "Art & Craft"],
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=700&fit=crop&auto=format",
    why: "Engraved with a name, date, or word — becomes a piece they never take off.",
    rating: 4.9,
    amazonUrl: "https://www.amazon.in/s?k=personalized+gold+necklace+gift",
    nykaaUrl: "https://www.nykaa.com/search/result/?q=personalized+gold+necklace",
  },
  {
    id: 13,
    name: "Luxury Scented Candle",
    tagline: "Smell Luxe",
    category: "Wellness",
    priceRange: "₹2,000–₹6,500",
    priceLevel: 1,
    for: ["Colleague", "Partner", "Friend", "Sibling", "Mom"],
    occasions: ["Birthday","Just Because", "Holiday", "Thank You", "Wedding"],
    interests: ["Fashion","Home", "Wellness"],
    image: "https://www.kimirica.shop/cdn/shop/files/LOVESTORYSCENTEDCANDLE_Listing_Images-New-Jan-24-06.jpg?v=1753345553",
    why: "specializing in unique, fragrant candles for homes and gifts",
    rating: "4.7",
    amazonUrl: "https://www.amazon.in/scented-candles/s?k=scented+candles",
    nykaaUrl: "https://www.nykaa.com/home/decor/candles-home-fragrances/c/17526",
  },
   {
    id: 14,
    name: "Handbags and Purse",
    tagline: "Cutest bag in the room",
    category: "Fashion",
    priceRange: "₹3,000–₹16,500",
    priceLevel: 2,
    for: ["Colleague", "Partner", "Friend", "Sibling", "Mom"],
    occasions: ["Birthday","Just Because", "Holiday", "Thank You", "Graduation"],
    interests: ["Fashion","Travel"],
    image: "https://img.freepik.com/free-photo/bag-hanging-from-furniture-item-indoors_23-2151073506.jpg?semt=ais_hybrid&w=740&q=80",
    why: "Too cute to handle, just like my bag.",
    rating: "4.5",
    amazonUrl: "https://www.amazon.in/s?k=handbags&crid=3C7MOI5ZK3QUR&sprefix=handbags%2Caps%2C289&ref=nb_sb_noss_2",
    nykaaUrl: "https://www.nykaa.com/bags/handbags/c/2321",
  },
  {
    id: 15,
    name: "Watch",
    tagline: "The right time for everything",
    category: "Fashion", 
    priceRange: "₹2,000–₹8,500",
    priceLevel: 1,
    for: ["Colleague", "Partner", "Friend", "Sibling", "Mom", "Child", "Dad"],
    occasions: ["Birthday","Just Because", "Thank You", "Graduation"],
    interests: ["Fashion", "Travel"],
    image: "https://www.sonatawatches.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw7b993993/images/Sonata/Catalog/7152QM01_1.jpg?sw=600&sh=600",
    why: "To infinity and beyond",
    rating: "4.4",
    amazonUrl: "https://www.amazon.in/Watches/b?ie=UTF8&node=1350387031",
    nykaaUrl: "https://www.nykaa.com/accessories/watches/c/20629",
  },
  {
    id: 16,
    name: "laptop",
    tagline: "Elevate Your Digital Experience",
    category: "Tech", 
    priceRange: "₹30,000–₹2,00,000",
    priceLevel: 4,
    for: ["Colleague", "Partner", "Friend", "Sibling", "Child",],
    occasions: ["Birthday","Just Because", "Thank You", "Graduation"],
    interests: ["Tech"],
    image: "https://4.imimg.com/data4/SJ/BA/MY-3018414/apple-laptop-500x500.jpg",
    why: "Experience the Power of Innovation",
    rating: "4.9",
    amazonUrl: "https://www.amazon.in/laptop/s?k=laptop",
  }
];

const RECIPIENTS: Recipient[] = ["Partner", "Mom", "Dad", "Friend", "Sibling", "Colleague", "Child"];
const OCCASIONS: Occasion[] = ["Birthday", "Anniversary", "Wedding", "Graduation", "Holiday", "Just Because", "Thank You"];
const BUDGETS: Budget[] = ["Under ₹2,500", "₹2,500–₹6,000", "₹6,000–₹12,500", "₹12,500+"];
const INTERESTS: Interest[] = ["Tech", "Books", "Fashion", "Food & Drink", "Travel", "Sports", "Art & Craft", "Wellness", "Music", "Home"];

const BUDGET_LEVEL: Record<Budget, number[]> = {
  "Under ₹2,500": [1],
  "₹2,500–₹6,000": [1, 2],
  "₹6,000–₹12,500": [2, 3],
  "₹12,500+": [3, 4],
};

const OCCASION_ICONS: Record<string, string> = {
  Birthday: "🎂",
  Anniversary: "💍",
  Wedding: "💐",
  Graduation: "🎓",
  Holiday: "✨",
  "Just Because": "🤍",
  "Thank You": "🙏",
};

const TESTIMONIALS = [
  { name: "Priya S.", stars: 5, text: "Found the perfect anniversary gift for my husband in under a minute. He was completely surprised!" },
  { name: "Rahul M.", stars: 5, text: "I always struggle with gifts. WRAPPED suggested exactly what my mom would love. Ordered from Amazon instantly." },
  { name: "Ananya K.", stars: 5, text: "The Nykaa link for the spa kit was so convenient. My best friend absolutely loved it." },
  { name: "Vikram D.", stars: 4, text: "Really thoughtful suggestions based on the occasion. Saved me so much time during the festive season." },
];

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=400&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&h=400&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=400&h=400&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1481437156560-3205f6a55735?w=400&h=400&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=400&fit=crop&auto=format",
];

const MARQUEE_TEXT = "PERFECT FOR EVERY OCCASION  ·  PERSONALIZED BY AI  ·  SHIPS FROM AMAZON & NYKAA  ·  THOUGHTFUL GIFTING  ·  ";

// Decorative illustrated icons (inline SVG)
function IconGift() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
      <rect x="8" y="20" width="32" height="24" rx="2" fill="#C8607A" fillOpacity="0.15" stroke="#C8607A" strokeWidth="2"/>
      <rect x="4" y="14" width="40" height="8" rx="2" fill="#C8607A" fillOpacity="0.25" stroke="#C8607A" strokeWidth="2"/>
      <path d="M24 14 C24 14 18 8 14 10 C10 12 12 18 24 14Z" fill="#C8607A" fillOpacity="0.5" stroke="#C8607A" strokeWidth="1.5"/>
      <path d="M24 14 C24 14 30 8 34 10 C38 12 36 18 24 14Z" fill="#C8607A" fillOpacity="0.5" stroke="#C8607A" strokeWidth="1.5"/>
      <line x1="24" y1="14" x2="24" y2="44" stroke="#C8607A" strokeWidth="2"/>
    </svg>
  );
}

function IconStar() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <polygon points="20,4 24,14 35,14 26,21 29,32 20,25 11,32 14,21 5,14 16,14" fill="#8B8B5A" fillOpacity="0.3" stroke="#8B8B5A" strokeWidth="1.5"/>
    </svg>
  );
}

function IconHeart() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <path d="M22 38 C22 38 6 28 6 16 C6 10 11 6 16 6 C19 6 22 9 22 9 C22 9 25 6 28 6 C33 6 38 10 38 16 C38 28 22 38 22 38Z" fill="#C8607A" fillOpacity="0.2" stroke="#C8607A" strokeWidth="2"/>
    </svg>
  );
}

// Daisy / floral SVG tile pattern as background
const FLORAL_BG = `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23C8607A' stroke-width='1.2' opacity='0.35'%3E%3Ccircle cx='40' cy='40' r='6'/%3E%3Cellipse cx='40' cy='26' rx='5' ry='9' fill='%23C8607A' fill-opacity='0.18'/%3E%3Cellipse cx='40' cy='54' rx='5' ry='9' fill='%23C8607A' fill-opacity='0.18'/%3E%3Cellipse cx='26' cy='40' rx='9' ry='5' fill='%23C8607A' fill-opacity='0.18'/%3E%3Cellipse cx='54' cy='40' rx='9' ry='5' fill='%23C8607A' fill-opacity='0.18'/%3E%3Cellipse cx='29' cy='29' rx='5' ry='9' transform='rotate(45 29 29)' fill='%23C8607A' fill-opacity='0.12'/%3E%3Cellipse cx='51' cy='51' rx='5' ry='9' transform='rotate(45 51 51)' fill='%23C8607A' fill-opacity='0.12'/%3E%3Cellipse cx='51' cy='29' rx='5' ry='9' transform='rotate(-45 51 29)' fill='%23C8607A' fill-opacity='0.12'/%3E%3Cellipse cx='29' cy='51' rx='5' ry='9' transform='rotate(-45 29 51)' fill='%23C8607A' fill-opacity='0.12'/%3E%3C/g%3E%3C/svg%3E")`;

// Vertical stripe hero background
const STRIPE_BG = `repeating-linear-gradient(
  90deg,
  #FF9CB5 0px,
  #FF9CB5 56px,
  #FFE9EF 56px,
  #FFE9EF 120px
)`;

function StarsRow({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} className={i < count ? "fill-accent text-accent" : "text-muted-foreground"} />
      ))}
    </div>
  );
}

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 border text-sm font-['Josefin_Sans'] font-semibold tracking-wide uppercase transition-all ${
        active
          ? "bg-primary text-primary-foreground border-primary"
          : "bg-card text-foreground border-border hover:border-primary/60 hover:bg-muted"
      }`}
      style={{ borderRadius: 2 }}
    >
      {label}
    </button>
  );
}

export default function App() {
  const [recipient, setRecipient] = useState<Recipient | "">("");
  const [occasion, setOccasion] = useState<Occasion | "">("");
  const [budget, setBudget] = useState<Budget | "">("");
  const [interests, setInterests] = useState<Interest[]>([]);
  const [results, setResults] = useState<GiftItem[] | null>(null);
  const [loading, setLoading] = useState(false);

  const toggleInterest = (i: Interest) =>
    setInterests((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));

  const handleFind = () => {
    if (!recipient && !occasion && !budget) return;
    setLoading(true);
    setResults([]);
    setTimeout(() => {
      const levels = budget ? BUDGET_LEVEL[budget as Budget] : [1, 2, 3, 4];
      let filtered = GIFTS.filter((g) => {
        const matchR = recipient ? g.for.includes(recipient as Recipient) : true;
        const matchO = occasion ? g.occasions.includes(occasion as Occasion) : true;
        const matchB = levels.includes(g.priceLevel);
        return matchR && matchO && matchB;
      });
      if (interests.length > 0) {
        const with_ = filtered.filter((g) => g.interests.some((i) => interests.includes(i)));
        const without_ = filtered.filter((g) => !g.interests.some((i) => interests.includes(i)));
        filtered = [...new Map([...with_, ...without_].map((g) => [g.id, g])).values()];
      }
      setResults(filtered.length > 0 ? filtered : GIFTS.slice(0, 6));
      setLoading(false);
    }, 1300);
  };

  const handleReset = () => {
    setResults(null);
    setRecipient("");
    setOccasion("");
    setBudget("");
    setInterests([]);
  };

  const canSearch = !!(recipient || occasion || budget);

  return (
    <div className="min-h-screen" style={{ background: "#FAF3E0", fontFamily: "'DM Sans', sans-serif" }}>
      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 border-b"
        style={{ background: "#FAF3E0", borderColor: "rgba(58,51,34,0.18)" }}
      >
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <span
            className="tracking-widest uppercase text-lg"
            style={{ fontFamily: "'Alfa Slab One', serif", color: "#3A3322", letterSpacing: "0.12em" }}
          >
            WRAPPED
          </span>
          <div className="hidden md:flex gap-8">
            {["How It Works", "Occasions", "Find Gifts"].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase().replace(/ /g, "-")}`}
                className="text-sm uppercase tracking-widest transition-colors hover:text-primary"
                style={{ fontFamily: "'Josefin_Sans', sans-serif", color: "#7A6F56" }}
              >
                {l}
              </a>
            ))}
          </div>
          <a
            href="#find-gifts"
            className="hidden md:block text-sm uppercase tracking-widest px-5 py-2 border-2 font-bold transition-colors hover:bg-primary hover:text-primary-foreground"
            style={{
              fontFamily: "'Josefin Sans', sans-serif",
              borderColor: "#C8607A",
              color: "#C8607A",
              borderRadius: 2,
            }}
          >
            Find a Gift
          </a>
        </div>
      </nav>

      {/* HERO — vertical stripes */}
      <section
        className="pt-14 min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
        style={{ background: STRIPE_BG }}
      >
        {/* Decorative illustrated icons floating */}
        <div className="absolute top-24 left-8 md:left-20 opacity-80">
          <IconGift />
        </div>
        <div className="absolute top-32 right-8 md:right-20 opacity-80">
          <IconHeart />
        </div>
        <div className="absolute bottom-32 left-12 md:left-28 opacity-60">
          <IconStar />
        </div>
        <div className="absolute bottom-28 right-12 md:right-28 opacity-60">
          <IconStar />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          {/* small label */}
          <p
            className="uppercase tracking-[0.3em] text-sm mb-6"
            style={{ fontFamily: "'Josefin Sans', sans-serif", color: "#3A3322" }}
          >
            Smart matching for the perfect giving
          </p>

          {/* Big slab serif headline */}
          <h1
            className="leading-none mb-2"
            style={{
              fontFamily: "'Alfa Slab One', serif",
              fontSize: "clamp(2.8rem, 10vw, 8rem)",
              color: "#3A3322",
              textShadow: "2px 2px 0px rgba(200,96,122,0.15)",
            }}
          >
            FIND GIFTS
          </h1>
          <h2
            className="leading-none mb-10"
            style={{
              fontFamily: "'Alfa Slab One', serif",
              fontSize: "clamp(2rem, 7vw, 5.5rem)",
              color: "#C8607A",
            }}
          >
            THEY'LL LOVE
          </h2>

          <p
            className="text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed"
            style={{ color: "#3A3322" }}
          >
            Tell us who you are gifting and our AI surfaces the perfect idea — with direct links to Amazon and Nykaa.
          </p>

          <a
            href="#find-gifts"
            className="inline-block uppercase tracking-widest font-bold text-sm px-10 py-4 transition-all hover:opacity-90 hover:-translate-y-0.5"
            style={{
              fontFamily: "'Josefin Sans', sans-serif",
              background: "#8B8B5A",
              color: "#FAF3E0",
              borderRadius: 2,
              letterSpacing: "0.2em",
            }}
          >
            Find Gifts Now
          </a>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60 L0 30 Q360 0 720 30 Q1080 60 1440 30 L1440 60 Z" fill="#8B8B5A" fillOpacity="0.18"/>
          </svg>
        </div>
      </section>

      {/* MARQUEE */}
      <div
        className="overflow-hidden py-3 border-y"
        style={{ background: "#3A3322", borderColor: "#3A3322" }}
      >
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap w-max"
        >
          {[MARQUEE_TEXT, MARQUEE_TEXT].map((t, i) => (
            <span
              key={i}
              className="text-xs uppercase tracking-[0.3em] mr-0"
              style={{ fontFamily: "'Josefin Sans', sans-serif", color: "#FAF3E0" }}
            >
              {t}
            </span>
          ))}
        </motion.div>
      </div>

      {/* GIFT FINDER */}
      <section id="find-gifts" className="py-20 px-6" style={{ background: "#FAF3E0" }}>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-4xl md:text-5xl tracking-wide uppercase mb-3"
              style={{ fontFamily: "'Alfa Slab One', serif", color: "#3A3322" }}
            >
              Find the Perfect Gift
            </h2>
            <p style={{ color: "#7A6F56", fontSize: "1.05rem" }}>
              Answer a few quick questions — AI does the rest.
            </p>
          </div>

          {results === null ? (
            <div
              className="p-8 md:p-10 border"
              style={{ background: "#F5EDD5", borderColor: "rgba(58,51,34,0.18)", borderRadius: 4 }}
            >
              {/* Recipient */}
              <div className="mb-7">
                <p
                  className="uppercase tracking-widest text-xs mb-3 font-bold"
                  style={{ fontFamily: "'Josefin Sans', sans-serif", color: "#7A6F56" }}
                >
                  Who is this for?
                </p>
                <div className="flex flex-wrap gap-2">
                  {RECIPIENTS.map((r) => (
                    <Chip key={r} label={r} active={recipient === r} onClick={() => setRecipient(recipient === r ? "" : r)} />
                  ))}
                </div>
              </div>

              {/* Occasion */}
              <div className="mb-7">
                <p
                  className="uppercase tracking-widest text-xs mb-3 font-bold"
                  style={{ fontFamily: "'Josefin Sans', sans-serif", color: "#7A6F56" }}
                >
                  What is the occasion?
                </p>
                <div className="flex flex-wrap gap-2">
                  {OCCASIONS.map((o) => (
                    <Chip key={o} label={`${OCCASION_ICONS[o]} ${o}`} active={occasion === o} onClick={() => setOccasion(occasion === o ? "" : o)} />
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div className="mb-7">
                <p
                  className="uppercase tracking-widest text-xs mb-3 font-bold"
                  style={{ fontFamily: "'Josefin Sans', sans-serif", color: "#7A6F56" }}
                >
                  Budget
                </p>
                <div className="flex flex-wrap gap-2">
                  {BUDGETS.map((b) => (
                    <Chip key={b} label={b} active={budget === b} onClick={() => setBudget(budget === b ? "" : b)} />
                  ))}
                </div>
              </div>

              {/* Interests */}
              <div className="mb-8">
                <p
                  className="uppercase tracking-widest text-xs mb-3 font-bold"
                  style={{ fontFamily: "'Josefin Sans', sans-serif", color: "#7A6F56" }}
                >
                  Their interests
                </p>
                <div className="flex flex-wrap gap-2">
                  {INTERESTS.map((i) => (
                    <button
                      key={i}
                      onClick={() => toggleInterest(i)}
                      className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wide border transition-all"
                      style={{
                        fontFamily: "'Josefin Sans', sans-serif",
                        borderRadius: 2,
                        background: interests.includes(i) ? "#D4A04A" : "transparent",
                        color: interests.includes(i) ? "#3A3322" : "#7A6F56",
                        borderColor: interests.includes(i) ? "#D4A04A" : "rgba(58,51,34,0.25)",
                      }}
                    >
                      {i}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleFind}
                disabled={!canSearch}
                className="w-full py-4 uppercase tracking-widest font-bold text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  fontFamily: "'Josefin Sans', sans-serif",
                  background: "#C8607A",
                  color: "#FAF3E0",
                  borderRadius: 2,
                  letterSpacing: "0.2em",
                }}
              >
                <Sparkles size={15} />
                Get Gift Suggestions
              </button>
            </div>
          ) : loading ? (
            <div
              className="p-16 border text-center"
              style={{ background: "#F5EDD5", borderColor: "rgba(58,51,34,0.18)", borderRadius: 4 }}
            >
              <p
                className="text-2xl mb-4 uppercase tracking-widest"
                style={{ fontFamily: "'Alfa Slab One', serif", color: "#3A3322" }}
              >
                Finding Gifts...
              </p>
              <p style={{ color: "#7A6F56" }}>Matching across 1,000+ gift ideas</p>
              <div className="flex gap-2 justify-center mt-6">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-3 h-3 rounded-full"
                    style={{ background: "#C8607A" }}
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-6">
                <p
                  className="uppercase tracking-widest text-sm"
                  style={{ fontFamily: "'Josefin Sans', sans-serif", color: "#7A6F56" }}
                >
                  {results.length} Gifts Found
                </p>
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 text-sm uppercase tracking-widest transition-colors hover:text-primary"
                  style={{ fontFamily: "'Josefin Sans', sans-serif", color: "#7A6F56" }}
                >
                  <RotateCcw size={13} />
                  Start Over
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {results.map((g, i) => (
                  <motion.div
                    key={g.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    className="group border overflow-hidden"
                    style={{ background: "#F5EDD5", borderColor: "rgba(58,51,34,0.18)", borderRadius: 4 }}
                  >
                    <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                      <img
                        src={g.image}
                        alt={g.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div
                        className="absolute top-2 left-2 text-xs uppercase tracking-widest px-2 py-1 font-bold"
                        style={{
                          fontFamily: "'Josefin Sans', sans-serif",
                          background: "#FAF3E0",
                          color: "#3A3322",
                          borderRadius: 2,
                        }}
                      >
                        {g.category}
                      </div>
                      <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1" style={{ background: "#FAF3E0", borderRadius: 2 }}>
                        <Star size={11} className="fill-accent text-accent" />
                        <span className="text-xs font-bold" style={{ color: "#3A3322" }}>{g.rating}</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3
                        className="text-lg mb-1"
                        style={{ fontFamily: "'Alfa Slab One', serif", color: "#3A3322", lineHeight: 1.2 }}
                      >
                        {g.name}
                      </h3>
                      <p className="text-sm mb-2 italic" style={{ color: "#7A6F56" }}>{g.tagline}</p>
                      <p className="text-xs mb-4 leading-relaxed" style={{ color: "#7A6F56" }}>"{g.why}"</p>
                      <div className="flex items-center justify-between mb-3">
                        <span
                          className="text-base font-bold"
                          style={{ fontFamily: "'Josefin Sans', sans-serif", color: "#C8607A" }}
                        >
                          {g.priceRange}
                        </span>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        <a
                          href={g.amazonUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide px-3 py-2 transition-opacity hover:opacity-80"
                          style={{
                            fontFamily: "'Josefin Sans', sans-serif",
                            background: "#FF9900",
                            color: "#fff",
                            borderRadius: 2,
                          }}
                        >
                          <ExternalLink size={11} />
                          Amazon
                        </a>
                        {g.nykaaUrl && (
                          <a
                            href={g.nykaaUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide px-3 py-2 transition-opacity hover:opacity-80"
                            style={{
                              fontFamily: "'Josefin Sans', sans-serif",
                              background: "#FC2779",
                              color: "#fff",
                              borderRadius: 2,
                            }}
                          >
                            <ExternalLink size={11} />
                            Nykaa
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* OCCASIONS — floral tile pattern */}
      <section
        id="occasions"
        className="py-20 px-6"
        style={{ backgroundImage: FLORAL_BG, backgroundSize: "80px 80px", background: `${FLORAL_BG}, #FAF3E0` }}
      >
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-center uppercase tracking-widest text-3xl md:text-4xl mb-12"
            style={{ fontFamily: "'Alfa Slab One', serif", color: "#3A3322" }}
          >
            Browse by Occasion
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {OCCASIONS.map((o, i) => (
              <motion.button
                key={o}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                onClick={() => {
                  setOccasion(o);
                  document.getElementById("find-gifts")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="border py-6 px-4 text-center transition-all hover:-translate-y-1 hover:shadow-md group"
                style={{ background: "#F5EDD5", borderColor: "rgba(58,51,34,0.2)", borderRadius: 4 }}
              >
                <div className="text-3xl mb-2">{OCCASION_ICONS[o]}</div>
                <div
                  className="text-sm uppercase tracking-widest group-hover:text-primary transition-colors"
                  style={{ fontFamily: "'Josefin Sans', sans-serif", color: "#3A3322" }}
                >
                  {o}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY — "Gift Inspiration" */}
      <section className="py-20 px-6" style={{ background: "#FAF3E0" }}>
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="md:w-2/5">
              <p
                className="uppercase tracking-[0.25em] text-sm mb-4"
                style={{ fontFamily: "'Josefin Sans', sans-serif", color: "#C8607A" }}
              >
                Gift Inspiration
              </p>
              <h2
                className="text-4xl md:text-5xl uppercase mb-6 leading-tight"
                style={{ fontFamily: "'Alfa Slab One', serif", color: "#3A3322" }}
              >
                Something for Everyone
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: "#7A6F56" }}>
                From luxury hampers to personalised keepsakes, our AI matches the right gift to the right person every time. Shop directly on Amazon and Nykaa with one click.
              </p>
              <a
                href="#find-gifts"
                className="inline-block uppercase tracking-widest text-sm font-bold px-8 py-3 border-2 transition-all hover:bg-primary hover:text-primary-foreground"
                style={{
                  fontFamily: "'Josefin Sans', sans-serif",
                  borderColor: "#C8607A",
                  color: "#C8607A",
                  borderRadius: 2,
                }}
              >
                Start Finding Gifts
              </a>
            </div>
            <div className="md:w-3/5 grid grid-cols-3 gap-2">
              {GALLERY_IMAGES.map((src, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="overflow-hidden"
                  style={{ aspectRatio: "1", borderRadius: 4 }}
                >
                  <img src={src} alt={`Gift idea ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA BAND — pink floral */}
      <section
        className="py-16 px-6"
        style={{
          backgroundImage: FLORAL_BG,
          backgroundSize: "80px 80px",
          background: `${FLORAL_BG}, #C8607A`,
        }}
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-4xl md:text-5xl uppercase mb-4"
            style={{ fontFamily: "'Alfa Slab One', serif", color: "#FAF3E0" }}
          >
            Never Give a Bad Gift Again
          </h2>
          <p className="text-lg mb-8" style={{ color: "rgba(250,243,224,0.85)" }}>
            AI-matched, budget-filtered, and delivered via Amazon & Nykaa.
          </p>
          <a
            href="#find-gifts"
            className="inline-block uppercase tracking-widest text-sm font-bold px-10 py-4 transition-all hover:opacity-90"
            style={{
              fontFamily: "'Josefin Sans', sans-serif",
              background: "#FAF3E0",
              color: "#C8607A",
              borderRadius: 2,
              letterSpacing: "0.2em",
            }}
          >
            Find the Perfect Gift
          </a>
        </div>
      </section>

      {/* KIND WORDS — sage green */}
      <section
        id="how-it-works"
        className="py-16 px-6"
        style={{ background: "#8B8B5A" }}
      >
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-center tracking-[0.25em] uppercase text-2xl md:text-3xl mb-12"
            style={{ fontFamily: "'Alfa Slab One', serif", color: "#FAF3E0" }}
          >
            Kind Words
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col gap-3 p-5"
                style={{ background: "rgba(250,243,224,0.12)", borderRadius: 2, border: "1px solid rgba(250,243,224,0.2)" }}
              >
                <StarsRow count={t.stars} />
                <p className="text-sm leading-relaxed italic" style={{ color: "#FAF3E0", opacity: 0.9 }}>
                  "{t.text}"
                </p>
                <p
                  className="text-xs uppercase tracking-widest"
                  style={{ fontFamily: "'Josefin Sans', sans-serif", color: "#FAF3E0", opacity: 0.7 }}
                >
                  — {t.name}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-14 px-6" style={{ background: "#3A3322" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            <div>
              <p
                className="text-2xl tracking-widest uppercase mb-3"
                style={{ fontFamily: "'Alfa Slab One', serif", color: "#FAF3E0" }}
              >
                WRAPPED
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(250,243,224,0.6)" }}>
                AI-powered gift suggestions matched to real people, real occasions, and real budgets.
              </p>
            </div>
            <div>
              <p
                className="uppercase tracking-widest text-xs mb-4 font-bold"
                style={{ fontFamily: "'Josefin Sans', sans-serif", color: "rgba(250,243,224,0.5)" }}
              >
                Quick Links
              </p>
              <div className="flex flex-col gap-2">
                {["Find Gifts", "Occasions", "How It Works"].map((l) => (
                  <a
                    key={l}
                    href={`#${l.toLowerCase().replace(/ /g, "-")}`}
                    className="text-sm hover:opacity-100 transition-opacity"
                    style={{ fontFamily: "'Josefin Sans', sans-serif", color: "rgba(250,243,224,0.7)" }}
                  >
                    {l}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p
                className="uppercase tracking-widest text-xs mb-4 font-bold"
                style={{ fontFamily: "'Josefin Sans', sans-serif", color: "rgba(250,243,224,0.5)" }}
              >
                Shop On
              </p>
              <div className="flex flex-col gap-2">
                <a href="https://www.amazon.in" target="_blank" rel="noopener noreferrer" className="text-sm flex items-center gap-2 transition-opacity hover:opacity-100" style={{ color: "#FF9900" }}>
                  <ExternalLink size={13} /> Amazon India
                </a>
                <a href="https://www.nykaa.com" target="_blank" rel="noopener noreferrer" className="text-sm flex items-center gap-2 transition-opacity hover:opacity-100" style={{ color: "#FC2779" }}>
                  <ExternalLink size={13} /> Nykaa
                </a>
              </div>
            </div>
          </div>
          <div className="border-t pt-6 text-center" style={{ borderColor: "rgba(250,243,224,0.1)" }}>
            <p
              className="text-xs uppercase tracking-widest"
              style={{ fontFamily: "'Josefin Sans', sans-serif", color: "rgba(250,243,224,0.4)" }}
            >
              © 2026 WRAPPED · Thoughtful Gifting, Powered by AI
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
