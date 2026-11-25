/**
 * Wedding Invitation Configuration
 * Dr. Sayed Zain Mashhoor & Adv. Hanna Musthafa
 * 
 * ALL content, links, dates, tokens, and credentials live here.
 * Nothing is hardcoded in HTML or JS.
 */

const SITE_CONFIG = {
  meta: {
    title: "Zain Weds Hanna — The Nikah Invitation",
    description: "With the blessings of Allah, we cordially invite you to celebrate the Nikah ceremony of Dr. Sayed Zain Mashhoor & Adv. Hanna Musthafa on 26 December 2026.",
    url: "https://zain-wedding.vercel.app",
    ogImage: "assets/images/share.jpg",
    favicon: "assets/images/favicon.svg",
    robots: "noindex, nofollow", // Private wedding invitation
    themeColor: "#FAF7F2"
  },

  // Color Theme Configuration & Prompts
  // Presets available:
  // 1. "emerald" (Default): Royal Emerald Green & Warm Gold on Luminous Ivory Cream (Regal Groom aesthetic)
  // 2. "navy": Sapphire Royal Navy & Champagne Gold on Pearl Cream
  // 3. "sage": Desert Sage Green & Antique Bronze on Linen Cream
  theme: {
    preset: "emerald",
    doorStyle: "light", // "light" (cream-gold) | "dark"
    tokens: {
      bgPrimary: "#FAF7F2",       // Luminous warm ivory cream
      bgSecondary: "#F4ECE1",     // Deeper parchment cream
      bgCard: "rgba(255, 255, 255, 0.92)", // Crisp white frosted card
      bgCardSolid: "#FFFFFF",
      accent: "#163E2B",          // Royal Emerald Green
      accentDeep: "#0E281C",      // Deep Forest Emerald
      accentLight: "#2D5C43",     // Soft Emerald
      gold: "#C5A566",            // Warm Antique Gold
      goldBright: "#E4C88E",      // Shimmer Gold
      goldDark: "#9A7B40",        // Deep Gold
      textPrimary: "#163E2B",     // Emerald headline
      textDark: "#2B241E",        // Deep charcoal/espresso text
      textSecondary: "#52463B",   // Warm charcoal
      textMuted: "#827567",       // Refined muted stone
      borderGold: "rgba(197, 165, 102, 0.4)",
      borderSubtle: "rgba(197, 165, 102, 0.2)",
      doorLightStart: "#FAF6EF",
      doorLightEnd: "#EFE5D6",
      doorHairline: "#C5A566"
    }
  },

  cover: {
    doorStyle: "light",
    bismillah: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    tagline: "A CELEBRATION OF LOVE & FAITH",
    groomName: "Zain",
    wedsText: "weds",
    brideName: "Hanna",
    title: "Zain Weds Hanna",
    dateDisplay: "26 · 12 · 2026, Saturday",
    buttonText: "OPEN INVITATION"
  },

  navigation: {
    monogram: "Z & H",
    shareButtonText: "Share invitation",
    links: [
      { id: "intro", label: "Home" },
      { id: "couple", label: "Couple" },
      { id: "ceremony", label: "Ceremony" },
      { id: "venue", label: "Venue" },
      { id: "countdown", label: "Countdown" },
      { id: "wishes", label: "Wishes" }
    ]
  },

  intro: {
    kicker: "WE ARE GETTING MARRIED",
    subKicker: "TOGETHER WITH OUR FAMILIES",
    lead: "With the blessings of Allah, we cordially invite you to the Nikah ceremony.",
    heroCouple: "Zain & Hanna",
    heroDate: "26 DECEMBER 2026 | SATURDAY",
    sideAnnotation: "A NEW CHAPTER · 2026"
  },

  couple: {
    groom: {
      role: "THE GROOM",
      name: "Dr. Sayed Zain Mashhoor",
      lineage: "S/o Sayed Ibrahim Mashhoor and Thahira Jiffri"
    },
    dividerText: "&",
    bride: {
      role: "THE BRIDE",
      name: "Adv. Hanna Musthafa",
      lineage: "D/o Mohamed Musthafa and Zuhra Musthafa"
    }
  },

  ceremony: {
    heading: "The Nikah Ceremony",
    date: {
      label: "Date",
      dayNumber: "26",
      fullDate: "26 December 2026 · Saturday"
    },
    time: {
      label: "Time",
      displayTime: "11:00 AM",
      timeZone: "Indian Standard Time"
    },
    venue: {
      label: "Venue",
      name: "Presidency Convention Center",
      location: "Poopalam"
    },
    mapCard: {
      badge: "Poopalam",
      buttonText: "Open location in Maps",
      mapsUrl: "https://maps.app.goo.gl/CgF19UWEokYYaRuU6"
    },
    calendar: {
      buttonText: "Add to Calendar",
      calendarUrl: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Nikah+Ceremony%3A+Zain+Weds+Hanna&dates=20261226T053000Z/20261226T063000Z&details=With+the+blessings+of+Allah%2C+we+cordially+invite+you+to+the+Nikah+ceremony+of+Dr.+Sayed+Zain+Mashhoor+and+Adv.+Hanna+Musthafa.&location=Presidency+Convention+Center%2C+Poopalam"
    }
  },

  countdown: {
    heading: "Counting down to forever",
    subheading: "Until we begin our forever",
    completedText: "The blessed day is here!",
    isoDateTime: "2026-12-26T11:00:00+05:30"
  },

  wishes: {
    heading: "Leave Your Wishes",
    description: "Your prayers and wishes mean a lot to us.",
    form: {
      nameLabel: "Name",
      namePlaceholder: "Your name",
      messageLabel: "Message",
      messagePlaceholder: "Write a warm dua or wish...",
      submitButtonText: "Send your wishes",
      submittingButtonText: "Sending...",
      successMessage: "Thank you for your warm wishes & prayers!",
      cooldownMessage: "Please wait before sending another wish.",
      errorMessage: "Could not send wish. Please try again."
    },
    ticker: {
      viewAllText: "View all wishes",
      emptyStateText: "Be the first to leave a wish.",
      counterSuffix: "wishes",
      pauseButtonAria: "Pause wish ticker",
      playButtonAria: "Resume wish ticker",
      prevButtonAria: "Previous wish",
      nextButtonAria: "Next wish"
    },
    modal: {
      title: "All Wishes & Prayers",
      closeAria: "Close all wishes",
      loadMoreText: "Load more"
    },
    limits: {
      nameMaxLength: 60,
      messageMaxLength: 300,
      cooldownSeconds: 60
    }
  },

  footer: {
    dua: "بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ",
    gratitudeTitle: "With love & gratitude",
    gratitudeMessage: "Your presence will make our day complete.",
    coupleSignature: "Zain & Hanna",
    dateFormatted: "26 DECEMBER 2026",
    copyright: "MADE WITH LOVE · 2026"
  },

  guestbook: {
    supabaseUrl: "YOUR_SUPABASE_URL",
    publishableKey: "YOUR_SUPABASE_PUBLISHABLE_KEY",
    tableName: "zain_hanna_wishes",
    isSample: false,
    sampleWishes: [
      {
        id: 1,
        name: "Faisal",
        message: "Mubarak Zain & Hanna! Barakallahu lakuma. See you on the 26th, InshaAllah.",
        created_at: "2026-11-20T10:00:00Z"
      },
      {
        id: 2,
        name: "Dr. Salim",
        message: "Congratulations to both families. May Allah bless this nikah.",
        created_at: "2026-11-20T11:30:00Z"
      },
      {
        id: 3,
        name: "Rashid",
        message: "So happy for you, Zain! Allah barik lakuma wa jama bayna kuma fi khair.",
        created_at: "2026-11-20T14:15:00Z"
      },
      {
        id: 4,
        name: "Khadija & Tariq",
        message: "Wishing you both a lifetime of love and happiness. Can't wait for the day!",
        created_at: "2026-11-21T09:45:00Z"
      },
      {
        id: 5,
        name: "Imran",
        message: "Alhamdulillah! Mubarak to you and both families.",
        created_at: "2026-11-21T16:20:00Z"
      },
      {
        id: 6,
        name: "Amina",
        message: "May your life together be full of khair and barakah. Mubarak!",
        created_at: "2026-11-22T08:10:00Z"
      }
    ]
  }
};

if (typeof window !== "undefined") {
  window.SITE_CONFIG = SITE_CONFIG;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = SITE_CONFIG;
}
