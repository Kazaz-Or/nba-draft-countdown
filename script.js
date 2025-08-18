// Draft date: October 17, 2025, 22:00 Israel Time
// Israel Time is UTC+3 (during daylight saving) or UTC+2 (standard time)
// In October 2025, Israel will be in standard time (UTC+2)
const draftDate = new Date("2025-10-17T22:00:00+02:00");

// Fun NBA quotes
const funQuotes = [
  "Ready to draft your championship team? 🏆",
  "Time to separate the ballers from the benchwarmers! 💪",
  "Draft day approaching... May the best GM win! 🎯",
  "Building dynasties, one pick at a time! 🏗️",
  "The clock is ticking... Choose wisely! ⏰",
  "Future hall of famers await your selection! ⭐",
  "Draft prep mode: ACTIVATED! 🔥",
  "Who's going #1 overall in your heart? ❤️",
  "From sleepers to superstars - draft them all! 🌟",
  "Basketball IQ test incoming... Are you ready? 🧠",
];

let currentQuoteIndex = 0;

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
      "IT'S DRAFT TIME! 🚀 Good luck!";
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

// Rotate fun quotes every 5 seconds
function rotateQuotes() {
  const quoteElement = document.getElementById("quote");
  quoteElement.style.opacity = "0";

  setTimeout(() => {
    currentQuoteIndex = (currentQuoteIndex + 1) % funQuotes.length;
    quoteElement.textContent = funQuotes[currentQuoteIndex];
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
document.querySelectorAll(".time-block").forEach((block) => {
  block.addEventListener("mouseenter", () => {
    block.style.transform = "translateY(-10px) scale(1.05)";
  });

  block.addEventListener("mouseleave", () => {
    block.style.transform = "";
  });
});

// Add click effect to quotes
document.getElementById("quote").addEventListener("click", () => {
  rotateQuotes();
});

// Initialize countdown and start intervals
updateCountdown();
setInterval(updateCountdown, 1000);
setInterval(rotateQuotes, 5000);

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
