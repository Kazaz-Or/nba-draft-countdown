// Draft date: October 17, 2025, 22:00 Israel Time
// Israel Time is UTC+3 (during daylight saving) or UTC+2 (standard time)
// In October 2025, Israel will be in standard time (UTC+2)
const draftDate = new Date("2025-10-17T22:00:00+02:00");

// Fun NBA quotes
const funQuotes = [
  "תייס ולופז מתחת לסלים",
  "ניצחת",
  "ברכות",
  "לא בושה להפסיד לסלבדור",
  "מה פספסתי? 200 הודעות",
  "כדאי שתשמור על הפה שלך",
  "אני בחוץ",
  "כולנו יד אחת נגד בלבי",
  "זהירות - גניבת דעת",
  "5:4 לאחד מהצדדים",
  "טרי רוזיר למשרפות טרבלינקה",
  "אליפות עם כוכבית",
  "וטו",
];

let currentQuoteIndex = 0;
let shuffledQuotes = [];
let shuffleIndex = 0;

// Update countdown every second
function updateCountdown() {
  const now = new Date().getTime();
  const timeLeft = draftDate.getTime() - now;

  if (timeLeft > 0) {
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // Update display with leading zeros
    document.getElementById("days").textContent = days
      .toString()
      .padStart(2, "0");
    document.getElementById("hours").textContent = hours
      .toString()
      .padStart(2, "0");
    document.getElementById("minutes").textContent = minutes
      .toString()
      .padStart(2, "0");
    document.getElementById("seconds").textContent = seconds
      .toString()
      .padStart(2, "0");

    // Add pulse animation for seconds
    const secondsElement = document.getElementById("seconds");
    secondsElement.style.animation = "none";
    setTimeout(() => {
      secondsElement.style.animation = "pulse 0.5s ease-in-out";
    }, 10);
  } else {
    // Draft time has arrived!
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";

    document.getElementById("quote").textContent =
      '"IT\'S DRAFT TIME! 🚀 Good luck!"';
    confetti();
  }
}

// Pulse animation for seconds
const style = document.createElement("style");
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// Shuffle the quotes array
function shuffleQuotes() {
  shuffledQuotes = [...funQuotes];
  for (let i = shuffledQuotes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledQuotes[i], shuffledQuotes[j]] = [
      shuffledQuotes[j],
      shuffledQuotes[i],
    ];
  }
  shuffleIndex = 0;
}

// Rotate through shuffled quotes
function rotateQuotes() {
  const quoteElement = document.getElementById("quote");
  quoteElement.style.opacity = "0";

  setTimeout(() => {
    // If we've shown all quotes, reshuffle
    if (shuffleIndex >= shuffledQuotes.length) {
      shuffleQuotes();
    }

    quoteElement.textContent = `"${shuffledQuotes[shuffleIndex]}"`;
    shuffleIndex++;
    quoteElement.style.opacity = "1";
  }, 300);
}

// Simple confetti effect
function confetti() {
  const colors = ["#FFD700", "#FF6B35", "#F7931E", "#1B365D"];
  const emojis = ["🏀", "🏆", "⭐", "🔥"];

  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      const confettiElement = document.createElement("div");
      confettiElement.textContent =
        Math.random() > 0.5
          ? emojis[Math.floor(Math.random() * emojis.length)]
          : "●";
      confettiElement.style.cssText = `
                position: fixed;
                top: -10px;
                left: ${Math.random() * 100}%;
                color: ${colors[Math.floor(Math.random() * colors.length)]};
                font-size: ${Math.random() * 20 + 10}px;
                pointer-events: none;
                z-index: 9999;
                animation: confettiFall ${
                  Math.random() * 3 + 2
                }s linear forwards;
            `;

      document.body.appendChild(confettiElement);

      setTimeout(() => {
        confettiElement.remove();
      }, 5000);
    }, i * 100);
  }
}

// Confetti fall animation
const confettiStyle = document.createElement("style");
confettiStyle.textContent = `
    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);

// Basketball bounce animation trigger
function triggerBallBounce() {
  const ball = document.getElementById("ball");
  ball.style.animation = "none";
  setTimeout(() => {
    ball.style.animation = "bounce 2s ease-in-out infinite";
  }, 10);
}

// Add click interaction to basketball
document.getElementById("ball").addEventListener("click", () => {
  triggerBallBounce();
  // Play a fun sound if user clicks the ball
  const audio = new Audio(
    "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+D0v2MeAzt4w/HgfiYEJX"
  );
});

// Keyboard shortcuts for fun
document.addEventListener("keydown", (e) => {
  if (e.key === " ") {
    e.preventDefault();
    triggerBallBounce();
  }
  if (e.key === "Enter") {
    confetti();
  }
});

// Add hover effects to time blocks
document.querySelectorAll(".time-block").forEach((block, index) => {
  block.addEventListener("mouseenter", () => {
    block.style.transform = "translateY(-10px) scale(1.05)";
  });

  block.addEventListener("mouseleave", () => {
    block.style.transform = "";
  });
});

// Add click effect to quotes (just rotation, no sound)
document.getElementById("quote").addEventListener("click", () => {
  rotateQuotes();
});

// Preload and setup audio
let draftAudio = null;
let audioReady = false;

// Initialize audio immediately
function initializeAudio() {
  try {
    draftAudio = new Audio("NBADraftSoundEffect.mp3");
    draftAudio.volume = 0.7;
    draftAudio.preload = "auto";

    // Try to load the audio file
    draftAudio.load();

    draftAudio.addEventListener("canplaythrough", () => {
      audioReady = true;
    });

    draftAudio.addEventListener("error", (e) => {
      console.log("Audio failed to load:", e);
      audioReady = false;
    });
  } catch (error) {
    console.log("Audio initialization failed:", error);
  }
}

// Initialize audio immediately when script loads
initializeAudio();

// NBA Draft selection sound effect - authentic draft chime
function playDraftSound() {
  try {
    if (draftAudio && audioReady) {
      // Reset audio to beginning
      draftAudio.currentTime = 0;

      // Attempt to play
      const playPromise = draftAudio.play();

      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          // Silently fail - autoplay was prevented
          console.log("Autoplay prevented:", error.name);
        });
      }
    }

    // Add enhanced visual feedback to minutes block
    const minutesElement = document.getElementById("minutes");
    const minutesBlock = minutesElement.parentElement;

    minutesBlock.style.borderColor = "#FFD700";
    minutesBlock.style.boxShadow = "0 0 30px #FFD700, 0 0 50px #FF6B35";
    minutesBlock.style.animation = "draftGlow 0.8s ease-in-out";
    minutesElement.style.color = "#FFD700";
    minutesElement.style.textShadow = "0 0 15px #FFD700";

    setTimeout(() => {
      minutesBlock.style.borderColor = "";
      minutesBlock.style.boxShadow = "";
      minutesBlock.style.animation = "";
      minutesElement.style.color = "";
      minutesElement.style.textShadow = "";
    }, 800);
  } catch (error) {
    console.log("NBA Draft sound failed to play:", error);

    // Visual feedback only fallback
    const minutesElement = document.getElementById("minutes");
    const minutesBlock = minutesElement.parentElement;

    minutesBlock.style.borderColor = "#FFD700";
    minutesBlock.style.boxShadow = "0 0 20px #FFD700";
    minutesElement.style.color = "#FFD700";

    setTimeout(() => {
      minutesBlock.style.borderColor = "";
      minutesBlock.style.boxShadow = "";
      minutesElement.style.color = "";
    }, 500);
  }
}

// Initialize countdown and start intervals
updateCountdown();
setInterval(updateCountdown, 1000);

// Initialize shuffled quotes and show first one immediately
shuffleQuotes();
document.getElementById(
  "quote"
).textContent = `"${shuffledQuotes[shuffleIndex]}"`;
shuffleIndex++;

// Then rotate quotes every 3 seconds
setInterval(rotateQuotes, 3000);

// Play welcome sound on first click anywhere on the website
let hasPlayedWelcomeSound = false;

document.addEventListener(
  "click",
  () => {
    if (!hasPlayedWelcomeSound) {
      playDraftSound();
      hasPlayedWelcomeSound = true;
    }
  },
  { once: false }
); // Don't use once: true because we want to check the flag ourselves

// Display current time in different timezones for reference
function displayTimezones() {
  const now = new Date();
  const israelTime = now.toLocaleString("en-US", {
    timeZone: "Asia/Jerusalem",
    hour12: false,
  });

  console.log(`Current Israel Time: ${israelTime}`);
  console.log(`Draft Date: October 17, 2025, 22:00 Israel Time`);
}

displayTimezones();

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA",
];

document.addEventListener("keydown", (e) => {
  konamiCode.push(e.code);
  if (konamiCode.length > konamiSequence.length) {
    konamiCode.shift();
  }

  if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
    confetti();
    document.getElementById("quote").textContent =
      "🎮 Konami Code activated! You're a true gamer! 🎮";
    konamiCode = [];
  }
});

// Google Calendar integration
function addToCalendar() {
  const title = "Broadcast Room 2025 Fantasy League Draft";
  const description =
    "Time to draft your championship team! 🏆🏀\n\nDraft Order:\n1st - Amir\n2nd - Kazi\n3rd - Eyal\n4th - Matananas\n5th - Nadav\n6th - Volvo\n7th - Balbi\n8th - Ben\n\nGood luck everyone!";

  // Draft date: October 17, 2025, 22:00-23:30 Israel Time
  // Use local time format and let the timezone parameter handle the conversion
  const startDate = "20251017T220000"; // 22:00 Israel Time (no Z = local time)
  const endDate = "20251017T233000"; // End at 23:30 same day (1.5 hour duration)

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    title
  )}&dates=${startDate}/${endDate}&details=${encodeURIComponent(
    description
  )}&location=${encodeURIComponent(
    "Broadcast Room 2025 Fantasy League Draft"
  )}&ctz=Asia/Jerusalem`;

  // Open in new tab
  window.open(googleCalendarUrl, "_blank");

  // Visual feedback
  const calendarIcon = document.querySelector(".calendar-icon");
  const originalText = calendarIcon.innerHTML;
  calendarIcon.innerHTML = "✅";
  calendarIcon.style.background = "rgba(0, 255, 0, 0.2)";

  setTimeout(() => {
    calendarIcon.innerHTML = originalText;
    calendarIcon.style.background = "rgba(255, 215, 0, 0.1)";
  }, 2000);
}

// Performance optimization: pause animations when tab is not visible
document.addEventListener("visibilitychange", () => {
  const animations = document.querySelectorAll("*");
  if (document.hidden) {
    animations.forEach((el) => {
      el.style.animationPlayState = "paused";
    });
  } else {
    animations.forEach((el) => {
      el.style.animationPlayState = "running";
    });
  }
});
