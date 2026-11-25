/**
 * Wedding Invitation Configuration
 * Dr. Sayed Zain Mashhoor & Adv. Hanna Musthafa
 *
 * ALL content, links, dates, theme presets, and Supabase credentials live here.
 * Switch `theme.preset` between "ivorySage" and "pearlBlue" to change palettes & botanical motifs.
 */

const SITE_CONFIG = {
  meta: {
    title: "Zain Weds Hanna — The Nikah Invitation",
    description: "With the blessings of Allah, we cordially invite you to celebrate the Nikah ceremony of Dr. Sayed Zain Mashhoor & Adv. Hanna Musthafa on 26 December 2026.",
    url: "https://zain-wedding.vercel.app",
    ogImage: "assets/images/share.jpg",
    favicon: "assets/images/favicon.svg",
    robots: "noindex, nofollow"
  },

  theme: {
    preset: "ivorySage", // "ivorySage" (default) | "pearlBlue"
    presets: {
      ivorySage: {
        bg: "#FBF9F4",
        bg2: "#F3EEE2",
        tint: "#C9D5C3",
        tintSoft: "#E6ECE2",
        ink: "#24402F",
        inkMuted: "#5F6F63",
        accent: "#B08D4A",
        line: "rgba(176,141,74,.35)",
        themeColor: "#FBF9F4",
        botanical: "olive"
      },
      pearlBlue: {
        bg: "#FCFBF8",
        bg2: "#F1F4F6",
        tint: "#DCE6EC",
        tintSoft: "#EAF0F4",
        ink: "#2C4257",
        inkMuted: "#647789",
        accent: "#BFA46F",
        line: "rgba(191,164,111,.4)",
        themeColor: "#FCFBF8",
        botanical: "wheat"
      }
    }
  },

  cover: {
    bismillah: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    tagline: "A CELEBRATION OF LOVE & FAITH",
    groomName: "Zain",
    wedsText: "weds",
    brideName: "Hanna",
    dateNumbers: "26 · 12 · 2026",
    dayName: "SATURDAY",
    sealMonogram: "Z&H",
    buttonText: "OPEN INVITATION"
  },

  navigation: {
    monogram: "Z&H",
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
    bismillah: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    subKicker: "TOGETHER WITH OUR FAMILIES",
    kicker: "WE ARE GETTING MARRIED",
    month: "DEC",
    day: "26",
    weekday: "SATURDAY",
    year: "2026",
    lead: "With the blessings of Allah, we cordially invite you to the Nikah ceremony."
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
      label: "DATE",
      value: "26",
      subtext: "December 2026 · Saturday"
    },
    time: {
      label: "TIME",
      value: "11:00 AM",
      subtext: "Indian Standard Time"
    },
    venue: {
      label: "VENUE",
      value: "Presidency Convention Center",
      subtext: "Poopalam"
    }
  },

  venue: {
    name: "Presidency Convention Center",
    area: "Poopalam, Perinthalmanna",
    address: "SH-39, Poopalam, Perinthalmanna, Kerala 679322",
    photo: "", // Optional URL/path for pointed-arch photo; leave empty to hide slot
    mapsButtonText: "Open location in Maps",
    mapsUrl: "https://maps.app.goo.gl/CgF19UWEokYYaRuU6",
    calendarButtonText: "Add to Calendar",
    calendarUrl: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Nikah+Ceremony%3A+Zain+Weds+Hanna&dates=20261226T053000Z/20261226T063000Z&details=With+the+blessings+of+Allah%2C+we+cordially+invite+you+to+the+Nikah+ceremony+of+Dr.+Sayed+Zain+Mashhoor+and+Adv.+Hanna+Musthafa.&location=Presidency+Convention+Center%2C+Poopalam",
    copyButtonText: "Copy address",
    copiedToast: "Address copied"
  },

  countdown: {
    headingPrefix: "Counting down to ",
    headingAccent: "forever",
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
    wedsText: "weds",
    dateFormatted: "26 DECEMBER 2026",
    copyright: "MADE WITH LOVE · 2026"
  },

  guestbook: {
    supabaseUrl: "https://xqivetxsblwidwursvej.supabase.co",
    publishableKey: "sb_publishable_al7a3JQSFaABkCj9qwfCsw_vmZL-9AH",
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
