export type GuideBlock = { heading?: string; paragraphs: string[]; bullets?: string[] };
export type GuideCopy = { title: string; excerpt: string; intro: string; blocks: GuideBlock[] };
export type GuidePost = { slug: string; image: string; category: string; readTime: string; en: GuideCopy; bn: GuideCopy };

export const guidePosts: GuidePost[] = [
  {
    slug: "hair-fall-care",
    image: "/media/before-after.webp",
    category: "Hair fall",
    readTime: "4 min read",
    en: {
      title: "Simple ways to care for hair that is falling more than usual",
      excerpt: "A calmer routine, gentle handling and a few consistent habits can make wash days feel much easier.",
      intro: "Seeing extra strands can feel worrying, but a simple routine is a good place to begin. Focus on gentle handling, a comfortable scalp and habits you can repeat.",
      blocks: [
        { heading: "Start with the basics", paragraphs: ["Avoid brushing aggressively when hair is wet. Use your fingers or a wide-tooth comb and work from the ends upward.", "Tight styles and frequent heat can add stress to fragile strands. Give your hair regular breaks and keep styling comfortable."], bullets: ["Use a soft towel or cotton T-shirt to absorb water.", "Keep your scalp clean without scrubbing harshly.", "Choose a routine you can follow consistently."] },
        { heading: "Make your wash day gentle", paragraphs: ["Apply shampoo mainly to the scalp and let the lather travel through the lengths. Rinse well and avoid very hot water.", "After washing, squeeze out excess water before applying a lightweight conditioner or leave-in product if it suits your hair."] },
        { heading: "When to ask for professional help", paragraphs: ["If hair fall is sudden, patchy, painful or continues for a long time, speak with a qualified dermatologist or healthcare professional. A product routine cannot replace medical advice."] }
      ]
    },
    bn: {
      title: "চুল পড়া কমানোর সহজ উপায়: শুরু হোক কোমল যত্নে",
      excerpt: "কোমলভাবে চুল ধরা, স্ক্যাল্প পরিষ্কার রাখা এবং কয়েকটি নিয়মিত অভ্যাসে রুটিন সহজ হতে পারে।",
      intro: "চুল পড়া বেড়ে গেলে দুশ্চিন্তা হওয়া স্বাভাবিক। তবে একটি সহজ, কোমল ও নিয়মিত রুটিন দিয়ে শুরু করা যায়। স্ক্যাল্প আরামদায়ক রাখা এবং চুলে কম টান দেওয়াই প্রথম ধাপ।",
      blocks: [
        { heading: "প্রথমে সহজ বিষয়গুলো ঠিক করুন", paragraphs: ["ভেজা চুলে জোরে আঁচড়াবেন না। আঙুল বা চওড়া দাঁতের চিরুনি ব্যবহার করে ডগা থেকে ধীরে ধীরে উপরের দিকে যান।", "খুব টাইট করে চুল বাঁধা এবং অতিরিক্ত হিট ব্যবহার ভঙ্গুর চুলে চাপ তৈরি করতে পারে। নিয়মিত চুলকে বিশ্রাম দিন।"], bullets: ["নরম তোয়ালে বা কটন টি-শার্ট দিয়ে পানি শুষে নিন।", "জোরে ঘষে নয়, কোমলভাবে স্ক্যাল্প পরিষ্কার করুন।", "যে রুটিন নিয়মিত করা সম্ভব, সেটিই বেছে নিন।"] },
        { heading: "ওয়াশ ডে হোক কোমল", paragraphs: ["শ্যাম্পু মূলত স্ক্যাল্পে ব্যবহার করুন এবং ফেনা চুলের লেন্থে নিজে থেকেই যেতে দিন। ভালোভাবে পানি দিয়ে ধুয়ে নিন।", "চুল ধোয়ার পর অতিরিক্ত পানি চেপে বের করে প্রয়োজন অনুযায়ী হালকা কন্ডিশনার ব্যবহার করতে পারেন।"] },
        { heading: "কখন বিশেষজ্ঞের পরামর্শ নেবেন", paragraphs: ["হঠাৎ, প্যাচ আকারে, ব্যথার সঙ্গে বা দীর্ঘদিন চুল পড়লে একজন যোগ্য ডার্মাটোলজিস্ট বা চিকিৎসকের পরামর্শ নিন। কোনো পণ্যের রুটিন চিকিৎসার বিকল্প নয়।"] }
      ]
    }
  },
  {
    slug: "dry-hair-routine",
    image: "/media/hair-oil-herbal.webp",
    category: "Dry hair",
    readTime: "5 min read",
    en: {
      title: "A weekly routine for dry, rough-feeling hair",
      excerpt: "Dry hair often needs less friction and more consistency. Here is a simple rhythm for softer-looking strands.",
      intro: "Dryness can come from weather, heat, colour, overwashing or simply the way your hair is built. The goal is not to do everything at once; it is to make each step kinder.",
      blocks: [
        { heading: "Before washing", paragraphs: ["A short, gentle scalp massage with a suitable hair oil can be a relaxing pre-wash ritual. Keep the pressure light and give the oil time to sit if your routine allows."] },
        { heading: "During washing", paragraphs: ["Use lukewarm water and avoid piling hair into a rough knot. Let shampoo focus on the scalp while the lengths are cleaned by the rinse.", "A conditioner on the mid-lengths and ends can help the hair feel easier to detangle."] },
        { heading: "After washing", paragraphs: ["Press water out instead of rubbing. Detangle with patience and let hair dry in a comfortable, low-friction way.", "Small improvements repeated every week usually feel better than a complicated routine you stop after two days."], bullets: ["Limit high heat when possible.", "Protect hair from harsh sun and friction.", "Trim split ends when needed."] }
      ]
    },
    bn: {
      title: "শুষ্ক ও রুক্ষ চুলের জন্য সাপ্তাহিক রুটিন",
      excerpt: "শুষ্ক চুলে কম ঘর্ষণ ও বেশি নিয়মিত যত্ন দরকার। নরম অনুভূতির জন্য একটি সহজ রুটিন দেখুন।",
      intro: "আবহাওয়া, হিট, কালার, অতিরিক্ত চুল ধোয়া বা চুলের স্বাভাবিক গঠনের কারণে শুষ্কতা দেখা দিতে পারে। একসঙ্গে সবকিছু নয়—প্রতিটি ধাপকে একটু কোমল করাই লক্ষ্য।",
      blocks: [
        { heading: "চুল ধোয়ার আগে", paragraphs: ["উপযোগী হেয়ার অয়েল দিয়ে অল্প সময় কোমল স্ক্যাল্প ম্যাসাজ করতে পারেন। চাপ হালকা রাখুন এবং সম্ভব হলে কিছুক্ষণ অয়েল থাকতে দিন।"] },
        { heading: "চুল ধোয়ার সময়", paragraphs: ["হালকা গরম পানি ব্যবহার করুন এবং চুলকে জোরে পাকিয়ে ঘষবেন না। শ্যাম্পু স্ক্যাল্পে ব্যবহার করুন, রিন্সের সময় লেন্থ পরিষ্কার হয়ে যাবে।", "চুলের মাঝামাঝি অংশ ও ডগায় কন্ডিশনার ব্যবহার করলে জট ছাড়ানো সহজ হতে পারে।"] },
        { heading: "চুল ধোয়ার পর", paragraphs: ["ঘষে নয়, চেপে পানি বের করুন। ধৈর্য ধরে জট ছাড়ান এবং কম ঘর্ষণে চুল শুকাতে দিন।", "দুই দিন করে বন্ধ হয়ে যাওয়া জটিল রুটিনের চেয়ে প্রতি সপ্তাহে করা ছোট অভ্যাস বেশি কার্যকর মনে হতে পারে।"], bullets: ["সম্ভব হলে অতিরিক্ত হিট কমান।", "রোদ ও ঘর্ষণ থেকে চুলকে সুরক্ষা দিন।", "প্রয়োজনে স্প্লিট এন্ড ট্রিম করুন।"] }
      ]
    }
  },
  {
    slug: "scalp-care-basics",
    image: "/media/hair-toner.webp",
    category: "Scalp care",
    readTime: "4 min read",
    en: {
      title: "Five small habits for a comfortable scalp",
      excerpt: "Healthy-looking hair starts at the scalp. Keep your routine clean, calm and easy to understand.",
      intro: "Your scalp is part of your skin, so it deserves a routine that is gentle and consistent. Notice how it feels and adjust products when needed.",
      blocks: [
        { heading: "Keep a comfortable rhythm", paragraphs: ["There is no single perfect wash schedule. Wash when your scalp feels oily, sweaty or uncomfortable, while avoiding harsh over-cleansing."] },
        { heading: "Five habits to try", paragraphs: ["Simple habits are easier to maintain. Start with one or two and observe how your scalp responds."], bullets: ["Massage lightly instead of scratching.", "Rinse shampoo thoroughly.", "Clean brushes and pillowcases regularly.", "Avoid sharing combs and brushes.", "Give new products a small patch test when appropriate."] },
        { heading: "Listen to your scalp", paragraphs: ["Persistent itching, redness, flakes or pain may need professional attention. A calm, informed approach is always better than layering many products at once."] }
      ]
    },
    bn: {
      title: "স্ক্যাল্প আরামদায়ক রাখার ৫টি সহজ অভ্যাস",
      excerpt: "স্বাস্থ্যকর দেখানো চুলের শুরু স্ক্যাল্প থেকে। রুটিন রাখুন পরিষ্কার, কোমল ও সহজ।",
      intro: "স্ক্যাল্পও ত্বকের অংশ, তাই এর জন্য কোমল ও নিয়মিত যত্ন দরকার। স্ক্যাল্প কেমন অনুভব করছে তা লক্ষ্য করুন এবং প্রয়োজন অনুযায়ী রুটিন বদলান।",
      blocks: [
        { heading: "একটি আরামদায়ক রুটিন রাখুন", paragraphs: ["সবার জন্য একই ওয়াশ শিডিউল নেই। স্ক্যাল্প তেলতেলে, ঘেমে যাওয়া বা অস্বস্তিকর লাগলে চুল ধুয়ে নিন, তবে অতিরিক্ত শক্তভাবে পরিষ্কার করবেন না।"] },
        { heading: "যে ৫টি অভ্যাস চেষ্টা করতে পারেন", paragraphs: ["সহজ অভ্যাস বজায় রাখা সহজ। প্রথমে এক বা দুইটি শুরু করুন এবং স্ক্যাল্প কেমন সাড়া দিচ্ছে দেখুন।"], bullets: ["চুলকানোর বদলে হালকা ম্যাসাজ করুন।", "শ্যাম্পু ভালোভাবে রিন্স করুন।", "চিরুনি ও বালিশের কভার নিয়মিত পরিষ্কার করুন।", "চিরুনি ও ব্রাশ শেয়ার করবেন না।", "প্রয়োজনে নতুন পণ্যের ছোট প্যাচ টেস্ট করুন।"] },
        { heading: "স্ক্যাল্পের কথা শুনুন", paragraphs: ["দীর্ঘদিন চুলকানি, লালচে ভাব, খুশকি বা ব্যথা থাকলে বিশেষজ্ঞের পরামর্শ নেওয়া ভালো। একসঙ্গে অনেক পণ্য ব্যবহার করার চেয়ে শান্ত ও সচেতন পদ্ধতি ভালো।"] }
      ]
    }
  },
  {
    slug: "wash-day-routine",
    image: "/media/shampoo.webp",
    category: "Wash day",
    readTime: "3 min read",
    en: {
      title: "How to make wash day feel more intentional",
      excerpt: "From water temperature to drying, a few small choices can make your wash-day routine feel lighter.",
      intro: "Wash day does not need to be complicated. Think of it as a sequence: prepare, cleanse, rinse, care and dry gently.",
      blocks: [
        { heading: "A simple sequence", paragraphs: ["Brush out large knots before the shower, wet the scalp completely, apply shampoo where it is needed and rinse with patience.", "Do not rush the final rinse. Leftover product can make hair and scalp feel heavy."] },
        { heading: "After the shower", paragraphs: ["Use a clean towel gently, detangle from the ends and avoid pulling. If you use heat, keep it moderate and moving."] }
      ]
    },
    bn: {
      title: "চুল ধোয়ার দিনকে আরও সুন্দর রুটিনে বদলানোর উপায়",
      excerpt: "পানির তাপমাত্রা থেকে চুল শুকানো পর্যন্ত কয়েকটি ছোট সিদ্ধান্ত রুটিনকে সহজ করতে পারে।",
      intro: "চুল ধোয়ার দিন জটিল হওয়ার দরকার নেই। ধাপগুলো ভাবুন—প্রস্তুতি, পরিষ্কার, রিন্স, যত্ন এবং কোমলভাবে শুকানো।",
      blocks: [
        { heading: "সহজ একটি ধাপের রুটিন", paragraphs: ["শাওয়ারে যাওয়ার আগে বড় জট ছাড়িয়ে নিন, স্ক্যাল্প ভালোভাবে ভিজিয়ে যেখানে দরকার সেখানে শ্যাম্পু দিন এবং ধৈর্য ধরে রিন্স করুন।", "শেষ রিন্সে তাড়াহুড়ো করবেন না। পণ্যের অবশিষ্টাংশ চুল ও স্ক্যাল্পকে ভারী লাগাতে পারে।"] },
        { heading: "শাওয়ারের পর", paragraphs: ["পরিষ্কার তোয়ালে দিয়ে কোমলভাবে পানি শুষে নিন, ডগা থেকে জট ছাড়ান এবং টান দেবেন না। হিট ব্যবহার করলে মাঝারি রাখুন এবং এক জায়গায় ধরে রাখবেন না।"] }
      ]
    }
  },
  {
    slug: "how-to-use-hair-oil",
    image: "/media/hair-oil-botanical.webp",
    category: "Hair oil",
    readTime: "4 min read",
    en: {
      title: "How to use hair oil without making your routine heavy",
      excerpt: "The right amount, a light massage and a thoughtful rinse can make oiling feel comfortable.",
      intro: "Hair oiling is a ritual, not a race. Start with a small amount and adjust based on your scalp and hair length.",
      blocks: [
        { heading: "Less is a good place to start", paragraphs: ["Warm a small amount between your palms and apply in sections. Use your fingertips rather than your nails and keep the massage light."] },
        { heading: "Give it time, then cleanse", paragraphs: ["Leave the oil for the time that suits your routine. Shampoo thoroughly but gently; repeating a small amount can be better than using too much at once."] },
        { heading: "Make it regular", paragraphs: ["A consistent weekly ritual is easier to understand than an occasional heavy application. Notice how your hair feels and make the routine your own."] }
      ]
    },
    bn: {
      title: "চুলে হেয়ার অয়েল ব্যবহারের সহজ সঠিক পদ্ধতি",
      excerpt: "সঠিক পরিমাণ, হালকা ম্যাসাজ ও ভালোভাবে রিন্স করলে অয়েলিং রুটিন আরামদায়ক হতে পারে।",
      intro: "হেয়ার অয়েল ব্যবহার একটি রিচুয়াল, দৌড় নয়। অল্প পরিমাণ দিয়ে শুরু করুন এবং স্ক্যাল্প ও চুলের লেন্থ অনুযায়ী পরিমাণ ঠিক করুন।",
      blocks: [
        { heading: "অল্প দিয়ে শুরু করুন", paragraphs: ["হাতের তালুতে অল্প অয়েল নিয়ে চুলের ভাগে ভাগে লাগান। নখ নয়, আঙুলের ডগা ব্যবহার করুন এবং ম্যাসাজ হালকা রাখুন।"] },
        { heading: "সময় দিন, তারপর পরিষ্কার করুন", paragraphs: ["আপনার রুটিন অনুযায়ী কিছুক্ষণ অয়েল থাকতে দিন। ভালোভাবে কিন্তু কোমলভাবে শ্যাম্পু করুন; একসঙ্গে বেশি ব্যবহারের চেয়ে অল্প পরিমাণে দুবার রিন্স ভালো হতে পারে।"] },
        { heading: "নিয়মিত করুন", paragraphs: ["মাঝে মাঝে বেশি অয়েল করার চেয়ে প্রতি সপ্তাহে একটি নিয়মিত রিচুয়াল বোঝা সহজ। চুল কেমন অনুভব করছে লক্ষ্য করুন এবং রুটিন নিজের মতো করে নিন।"] }
      ]
    }
  },
  {
    slug: "botanical-ingredients",
    image: "/media/hair-care-benefits.webp",
    category: "Ingredient care",
    readTime: "5 min read",
    en: {
      title: "How to choose a nature-inspired hair care routine",
      excerpt: "A botanical label is only the beginning. Look for clarity, a comfortable routine and products that suit your needs.",
      intro: "Nature-inspired care should still feel clear and considered. Read the label, learn how a product is meant to be used and choose one change at a time.",
      blocks: [
        { heading: "Look for clear information", paragraphs: ["A good product page should make it easy to understand the size, use, ingredients and care instructions. If something is unclear, ask the brand before buying."] },
        { heading: "Match the product to your routine", paragraphs: ["An oil, shampoo and toner each play a different role. Build a routine around what you can use consistently rather than collecting too many products."], bullets: ["Start with one essential.", "Introduce new products one at a time.", "Keep a note of how your scalp and hair feel."] },
        { heading: "Care is personal", paragraphs: ["There is no universal hair routine. Your texture, lifestyle, climate and comfort all matter. Let your routine grow slowly with you."] }
      ]
    },
    bn: {
      title: "প্রকৃতি-অনুপ্রাণিত হেয়ার কেয়ার রুটিন বাছাই করবেন যেভাবে",
      excerpt: "বোটানিক্যাল লেখা শুধু শুরু। পরিষ্কার তথ্য, আরামদায়ক রুটিন ও আপনার প্রয়োজন অনুযায়ী পণ্য বেছে নিন।",
      intro: "প্রকৃতি-অনুপ্রাণিত যত্নও পরিষ্কার ও সচেতন হওয়া উচিত। লেবেল পড়ুন, পণ্যটি কীভাবে ব্যবহার করতে হয় বুঝুন এবং একবারে একটি পরিবর্তন করুন।",
      blocks: [
        { heading: "পরিষ্কার তথ্য খুঁজুন", paragraphs: ["ভালো প্রোডাক্ট পেজে সাইজ, ব্যবহার, উপাদান ও কেয়ার নির্দেশনা বোঝা সহজ হওয়া উচিত। কিছু অস্পষ্ট হলে কেনার আগে ব্র্যান্ডকে জিজ্ঞেস করুন।"] },
        { heading: "রুটিনের সঙ্গে মিলিয়ে নিন", paragraphs: ["অয়েল, শ্যাম্পু ও টোনারের কাজ আলাদা। অনেক পণ্য জমা করার বদলে নিয়মিত ব্যবহার করা সম্ভব—এমন রুটিন তৈরি করুন।"], bullets: ["একটি এসেনশিয়াল দিয়ে শুরু করুন।", "একবারে একটি নতুন পণ্য যোগ করুন।", "স্ক্যাল্প ও চুল কেমন লাগছে নোট করুন।"] },
        { heading: "যত্ন ব্যক্তিগত", paragraphs: ["সবার জন্য একই হেয়ার রুটিন নেই। চুলের ধরন, জীবনযাপন, আবহাওয়া ও আরাম—সব গুরুত্বপূর্ণ। ধীরে ধীরে নিজের রুটিন তৈরি করুন।"] }
      ]
    }
  },
  {
    slug: "hair-growth-routine",
    image: "/media/complete-combo.webp",
    category: "Hair growth",
    readTime: "5 min read",
    en: {
      title: "Build a hair-growth routine you can actually repeat",
      excerpt: "A consistent routine starts with small steps, realistic expectations and gentle care from root to tip.",
      intro: "Hair growth is a gradual process, so a routine should feel sustainable rather than stressful. Focus on scalp comfort, gentle handling and habits you can keep.",
      blocks: [
        { heading: "Create a simple rhythm", paragraphs: ["Choose a few repeatable steps: cleanse the scalp, nourish when needed and protect the lengths from unnecessary friction.", "Keeping a short note of wash days and how your scalp feels can help you understand your own rhythm."] },
        { heading: "Support the basics", paragraphs: ["Adequate rest, balanced meals and gentle styling are part of caring for your hair. Products can support a routine, but they cannot replace overall wellbeing."], bullets: ["Massage with light pressure.", "Avoid pulling at wet hair.", "Keep expectations patient and realistic."] },
        { heading: "Know when to seek help", paragraphs: ["Sudden or persistent changes deserve a conversation with a qualified healthcare professional so that the underlying cause can be understood."] }
      ]
    },
    bn: {
      title: "যে হেয়ার গ্রোথ রুটিন নিয়মিত করা সম্ভব",
      excerpt: "ছোট ধাপ, বাস্তব প্রত্যাশা এবং গোড়া থেকে ডগা পর্যন্ত কোমল যত্নে একটি নিয়মিত রুটিন তৈরি করুন।",
      intro: "চুলের বৃদ্ধি ধীরে ধীরে হয়, তাই রুটিন যেন চাপের না হয়ে টেকসই হয়। স্ক্যাল্পের আরাম, কোমল ব্যবহার ও নিয়মিত অভ্যাসে মন দিন।",
      blocks: [
        { heading: "সহজ একটি ছন্দ তৈরি করুন", paragraphs: ["কয়েকটি করা সম্ভব এমন ধাপ বেছে নিন—স্ক্যাল্প পরিষ্কার, প্রয়োজনমতো পুষ্টি এবং চুলের লেন্থে অপ্রয়োজনীয় ঘর্ষণ কমানো।", "ওয়াশ ডে ও স্ক্যাল্পের অনুভূতি ছোট নোটে লিখে রাখলে নিজের রুটিন বোঝা সহজ হতে পারে।"] },
        { heading: "মূল বিষয়গুলোকে সমর্থন দিন", paragraphs: ["পর্যাপ্ত বিশ্রাম, ভারসাম্যপূর্ণ খাবার ও কোমল স্টাইলিংও চুলের যত্নের অংশ। পণ্য রুটিনকে সহায়তা করতে পারে, কিন্তু সামগ্রিক সুস্থতার বিকল্প নয়।"], bullets: ["হালকা চাপ দিয়ে ম্যাসাজ করুন।", "ভেজা চুলে টান দেবেন না।", "ধৈর্য ও বাস্তব প্রত্যাশা রাখুন।"] },
        { heading: "কখন সাহায্য নেবেন", paragraphs: ["হঠাৎ বা দীর্ঘস্থায়ী পরিবর্তন থাকলে যোগ্য চিকিৎসকের সঙ্গে কথা বলুন, যাতে মূল কারণ বোঝা যায়।"] }
      ]
    }
  },
  {
    slug: "split-ends-care",
    image: "/media/hair-oil-nature.webp",
    category: "Hair length",
    readTime: "3 min read",
    en: {
      title: "Small ways to care for dry ends and split ends",
      excerpt: "The ends of your hair experience the most friction. A few gentle changes can make them feel easier to manage.",
      intro: "Split ends cannot be repaired permanently by a product, but you can make the lengths feel softer and reduce further friction with kinder habits.",
      blocks: [
        { heading: "Reduce friction", paragraphs: ["Avoid rubbing hair dry and be mindful of rough collars, tight ties and repeated brushing. Detangle slowly from the ends upward."] },
        { heading: "Keep the ends comfortable", paragraphs: ["Use a suitable conditioner or a small amount of a leave-in product on the lengths if it works for your hair. Regular trims can remove visibly split ends."] },
        { heading: "Protect your progress", paragraphs: ["Gentle handling, moderate heat and a consistent wash routine help you keep the hair you are growing. Be patient with changes."] }
      ]
    },
    bn: {
      title: "শুষ্ক ডগা ও স্প্লিট এন্ডের জন্য ছোট কিছু যত্ন",
      excerpt: "চুলের ডগায় সবচেয়ে বেশি ঘর্ষণ হয়। কয়েকটি কোমল পরিবর্তনে ডগা সামলানো সহজ হতে পারে।",
      intro: "কোনো পণ্য স্প্লিট এন্ড স্থায়ীভাবে জোড়া দিতে পারে না। তবে কোমল অভ্যাসে চুলের লেন্থ নরম রাখা এবং অতিরিক্ত ঘর্ষণ কমানো যায়।",
      blocks: [
        { heading: "ঘর্ষণ কমান", paragraphs: ["চুল শুকানোর সময় ঘষবেন না এবং রুক্ষ কলার, টাইট ব্যান্ড ও বারবার আঁচড়ানোর দিকে খেয়াল রাখুন। ডগা থেকে ধীরে ধীরে জট ছাড়ান।"] },
        { heading: "ডগা আরামদায়ক রাখুন", paragraphs: ["চুলের জন্য উপযোগী কন্ডিশনার বা অল্প লিভ-ইন পণ্য লেন্থে ব্যবহার করতে পারেন। দৃশ্যমান স্প্লিট এন্ড নিয়মিত ট্রিম করে সরানো যায়।"] },
        { heading: "অগ্রগতি ধরে রাখুন", paragraphs: ["কোমলভাবে চুল ধরা, মাঝারি হিট এবং নিয়মিত ওয়াশ রুটিনে চুলের যত্ন সহজ থাকে। পরিবর্তনের জন্য ধৈর্য ধরুন।"] }
      ]
    }
  },
  {
    slug: "night-hair-care",
    image: "/media/hair-oil-botanical-2.webp",
    category: "Daily care",
    readTime: "4 min read",
    en: {
      title: "A calmer night-time hair care routine",
      excerpt: "Your night routine does not need many products. Keep it light, comfortable and easy to repeat.",
      intro: "A few minutes before bed can help you avoid unnecessary tangles and friction. The best routine is the one that fits your sleep and hair habits.",
      blocks: [
        { heading: "Prepare before sleep", paragraphs: ["Gently detangle your hair and choose a loose, comfortable style. Avoid tying wet hair tightly or sleeping with heavy product buildup."] },
        { heading: "Make comfort the priority", paragraphs: ["A clean pillowcase and a soft fabric can reduce friction. If you like an oiling ritual, keep it for a suitable pre-wash time rather than applying more than your hair needs."] },
        { heading: "Keep mornings easier", paragraphs: ["A little preparation at night can make the next morning feel less rushed. Start with small changes and notice what your hair enjoys."] }
      ]
    },
    bn: {
      title: "আরামদায়ক একটি রাতের হেয়ার কেয়ার রুটিন",
      excerpt: "রাতে অনেক পণ্য দরকার নেই। রুটিন হোক হালকা, আরামদায়ক ও নিয়মিত করা সম্ভব।",
      intro: "ঘুমানোর আগে কয়েক মিনিটের যত্নে জট ও অপ্রয়োজনীয় ঘর্ষণ কমতে পারে। আপনার ঘুম ও চুলের অভ্যাসের সঙ্গে মানানসই রুটিনই সেরা।",
      blocks: [
        { heading: "ঘুমানোর আগে প্রস্তুতি", paragraphs: ["কোমলভাবে জট ছাড়িয়ে ঢিলেঢালা ও আরামদায়ক স্টাইল বেছে নিন। ভেজা চুল শক্ত করে বাঁধবেন না এবং বেশি পণ্য জমে থাকা অবস্থায় ঘুমাবেন না।"] },
        { heading: "আরামকে অগ্রাধিকার দিন", paragraphs: ["পরিষ্কার বালিশের কভার ও নরম কাপড় ঘর্ষণ কমাতে পারে। অয়েলিং পছন্দ হলে চুলের প্রয়োজনের বেশি না দিয়ে উপযুক্ত প্রি-ওয়াশ সময়ে ব্যবহার করুন।"] },
        { heading: "সকাল সহজ করুন", paragraphs: ["রাতে অল্প প্রস্তুতি পরের সকালকে কম ব্যস্ত করে। ছোট পরিবর্তন দিয়ে শুরু করুন এবং চুলের প্রতিক্রিয়া লক্ষ্য করুন।"] }
      ]
    }
  },
  {
    slug: "hair-toner-how-to",
    image: "/media/hair-toner.webp",
    category: "Hair toner",
    readTime: "4 min read",
    en: {
      title: "How to add a hair toner to your everyday routine",
      excerpt: "A light toner can become a refreshing step between wash days when used thoughtfully.",
      intro: "A toner is an easy way to add a light, refreshing step to a routine. Follow the product directions and keep the application comfortable.",
      blocks: [
        { heading: "Start with a clean plan", paragraphs: ["Decide when the toner fits your schedule. Some people prefer a post-wash step, while others enjoy a light mist between wash days."] },
        { heading: "Apply without overdoing it", paragraphs: ["Use the recommended amount and focus on the scalp or areas described on the label. Avoid spraying into the eyes and stop if irritation occurs."] },
        { heading: "Let the routine stay simple", paragraphs: ["A toner should support your care rhythm, not make it complicated. Pair it with gentle cleansing and nourishing steps when needed."] }
      ]
    },
    bn: {
      title: "প্রতিদিনের রুটিনে হেয়ার টোনার যোগ করার পদ্ধতি",
      excerpt: "সঠিকভাবে ব্যবহার করলে হালকা টোনার ওয়াশ ডে-এর মাঝেও একটি সতেজ ধাপ হতে পারে।",
      intro: "রুটিনে একটি হালকা ও সতেজ ধাপ যোগ করার সহজ উপায় হতে পারে টোনার। পণ্যের নির্দেশনা মেনে আরামদায়কভাবে ব্যবহার করুন।",
      blocks: [
        { heading: "পরিষ্কার একটি পরিকল্পনা করুন", paragraphs: ["আপনার সময়সূচিতে টোনার কখন মানায় ঠিক করুন। কেউ ওয়াশের পর ব্যবহার করতে পছন্দ করেন, কেউ ওয়াশ ডে-এর মাঝে হালকা মিস্ট পছন্দ করেন।"] },
        { heading: "বেশি ব্যবহার করবেন না", paragraphs: ["প্রস্তাবিত পরিমাণ ব্যবহার করুন এবং লেবেলে বলা স্ক্যাল্প বা জায়গায় দিন। চোখে স্প্রে করবেন না এবং জ্বালা হলে ব্যবহার বন্ধ করুন।"] },
        { heading: "রুটিন সহজ রাখুন", paragraphs: ["টোনার আপনার রুটিনকে সহায়তা করবে, জটিল করবে না। প্রয়োজনে কোমল ক্লেনজিং ও পুষ্টির ধাপের সঙ্গে ব্যবহার করুন।"] }
      ]
    }
  },
  {
    slug: "scalp-massage",
    image: "/media/hair-oil-herbal.webp",
    category: "Scalp care",
    readTime: "3 min read",
    en: {
      title: "A gentle scalp massage for a relaxing care ritual",
      excerpt: "Turn a few quiet minutes into a calming ritual without scratching or pulling at the scalp.",
      intro: "Scalp massage can be a relaxing part of hair care when the pressure stays light and the movement stays comfortable.",
      blocks: [
        { heading: "Use your fingertips", paragraphs: ["Place your fingertips on the scalp and move in small circles. Keep your nails away from the skin and avoid pressing hard."] },
        { heading: "Move slowly", paragraphs: ["Work across the hairline, crown and sides for a few minutes. If you are using oil, begin with a small amount and distribute it in sections."] },
        { heading: "Stop when it feels uncomfortable", paragraphs: ["Massage should feel calming, not painful. Persistent tenderness, redness or irritation should be discussed with a qualified professional."] }
      ]
    },
    bn: {
      title: "আরামদায়ক যত্নের জন্য কোমল স্ক্যাল্প ম্যাসাজ",
      excerpt: "স্ক্যাল্পে আঁচড় বা টান না দিয়ে কয়েকটি শান্ত মিনিটকে একটি সুন্দর রিচুয়ালে বদলে দিন।",
      intro: "চাপ হালকা ও নড়াচড়া আরামদায়ক রাখলে স্ক্যাল্প ম্যাসাজ হেয়ার কেয়ারের একটি শান্ত ধাপ হতে পারে।",
      blocks: [
        { heading: "আঙুলের ডগা ব্যবহার করুন", paragraphs: ["স্ক্যাল্পে আঙুলের ডগা রেখে ছোট বৃত্তে নড়াচড়া করুন। নখ ত্বক থেকে দূরে রাখুন এবং জোরে চাপ দেবেন না।"] },
        { heading: "ধীরে ধীরে করুন", paragraphs: ["হেয়ারলাইন, মাথার ওপর ও দুই পাশ কয়েক মিনিট করে ম্যাসাজ করুন। অয়েল ব্যবহার করলে অল্প পরিমাণ নিয়ে ভাগে ভাগে লাগান।"] },
        { heading: "অস্বস্তি হলে থামুন", paragraphs: ["ম্যাসাজ শান্তিদায়ক হওয়া উচিত, ব্যথাদায়ক নয়। দীর্ঘদিন ব্যথা, লালচে ভাব বা জ্বালা থাকলে যোগ্য বিশেষজ্ঞের পরামর্শ নিন।"] }
      ]
    }
  },
  {
    slug: "seasonal-hair-care",
    image: "/media/alvero-cover.webp",
    category: "Seasonal care",
    readTime: "4 min read",
    en: {
      title: "Adjust your hair care routine with the seasons",
      excerpt: "Humidity, heat and dry weather can change how hair feels. Let your routine adapt without becoming complicated.",
      intro: "Hair can feel different throughout the year. Notice the change, make one small adjustment and keep the rest of your routine familiar.",
      blocks: [
        { heading: "In humid weather", paragraphs: ["Keep products light and pay attention to how quickly the scalp feels oily or sweaty. Rinse thoroughly and avoid piling on too many layers."] },
        { heading: "In dry weather", paragraphs: ["Gentle cleansing, careful detangling and a little extra attention to the ends can help hair feel more comfortable."] },
        { heading: "Keep the essentials steady", paragraphs: ["Whatever the season, protect hair from unnecessary heat and friction. A routine that is simple enough to repeat will always be useful."] }
      ]
    },
    bn: {
      title: "ঋতু বদলের সঙ্গে হেয়ার কেয়ার রুটিন বদলাবেন যেভাবে",
      excerpt: "আর্দ্রতা, গরম ও শুষ্ক আবহাওয়ায় চুলের অনুভূতি বদলাতে পারে। রুটিন সহজ রেখেই সামঞ্জস্য করুন।",
      intro: "বছরের বিভিন্ন সময়ে চুল আলাদা অনুভব করতে পারে। পরিবর্তনটি লক্ষ্য করুন, একটি ছোট সমন্বয় করুন এবং বাকি রুটিন পরিচিত রাখুন।",
      blocks: [
        { heading: "আর্দ্র আবহাওয়ায়", paragraphs: ["পণ্য হালকা রাখুন এবং স্ক্যাল্প কত দ্রুত তেলতেলে বা ঘেমে যাচ্ছে লক্ষ্য করুন। ভালোভাবে রিন্স করুন এবং অনেক স্তর পণ্য ব্যবহার করবেন না।"] },
        { heading: "শুষ্ক আবহাওয়ায়", paragraphs: ["কোমল ক্লেনজিং, ধীরে জট ছাড়ানো এবং ডগায় একটু বেশি মনোযোগ চুলকে আরামদায়ক রাখতে সাহায্য করতে পারে।"] },
        { heading: "মূল বিষয়গুলো ঠিক রাখুন", paragraphs: ["যে ঋতুই হোক, অপ্রয়োজনীয় হিট ও ঘর্ষণ থেকে চুলকে রক্ষা করুন। নিয়মিত করা যায় এমন সহজ রুটিন সবসময়ই কাজে আসে।"] }
      ]
    }
  }
];

export const guideFaqs = [
  { en: "How often should I oil my hair?", bn: "কতদিন পর পর চুলে অয়েল ব্যবহার করব?", answerEn: "Start with once a week and adjust based on how your scalp and hair feel. A comfortable routine is more important than a fixed number.", answerBn: "সপ্তাহে একবার দিয়ে শুরু করতে পারেন। স্ক্যাল্প ও চুল কেমন অনুভব করছে তার ওপর ভিত্তি করে রুটিন ঠিক করুন।" },
  { en: "Can I use all three Alvero products together?", bn: "Alvero-এর তিনটি পণ্য কি একসঙ্গে ব্যবহার করা যায়?", answerEn: "Yes, they are presented as a simple three-step routine: oil before wash, shampoo during wash and toner as a light daily step.", answerBn: "হ্যাঁ। সহজ তিন ধাপের রুটিন হিসেবে—ওয়াশের আগে অয়েল, ওয়াশের সময় শ্যাম্পু এবং হালকা দৈনিক ধাপ হিসেবে টোনার ব্যবহার করতে পারেন।" },
  { en: "Is this routine suitable for every hair type?", bn: "এই রুটিন কি সব ধরনের চুলের জন্য?", answerEn: "Hair needs vary. Start with a small amount, follow the label and stop if a product feels uncomfortable. Seek professional advice for persistent scalp concerns.", answerBn: "চুলের প্রয়োজন ভিন্ন হতে পারে। অল্প দিয়ে শুরু করুন, লেবেলের নির্দেশনা মেনে চলুন এবং অস্বস্তি হলে ব্যবহার বন্ধ করুন। দীর্ঘস্থায়ী সমস্যায় বিশেষজ্ঞের পরামর্শ নিন।" },
  { en: "How long should I keep hair oil on?", bn: "কতক্ষণ হেয়ার অয়েল রেখে দেব?", answerEn: "Use the time that fits your routine. Keeping it on for a short, comfortable period before washing is a simple place to start.", answerBn: "আপনার রুটিনের সঙ্গে মানানসই সময় রাখুন। চুল ধোয়ার আগে অল্প সময় রেখে শুরু করাই সহজ।" },
  { en: "When should I talk to a professional?", bn: "কখন বিশেষজ্ঞের পরামর্শ নেব?", answerEn: "Sudden, patchy, painful or persistent hair and scalp changes deserve advice from a qualified professional.", answerBn: "হঠাৎ, প্যাচ আকারে, ব্যথার সঙ্গে বা দীর্ঘদিন চুল ও স্ক্যাল্পে পরিবর্তন থাকলে যোগ্য বিশেষজ্ঞের পরামর্শ নিন।" }
];

export function getGuidePost(slug: string) {
  return guidePosts.find((post) => post.slug === slug);
}
