# 🐒 Moba Moba – Banana Catcher Game 🍌

![Moba Moba - Game Preview](./assets/Moba-Moba-game-Screenshot%20.jpg)

## Description

**Moba Moba** is a fast-paced arcade-style game where you control a cheeky monkey that catches falling bananas, gold, hearts—and avoids rotten bananas and bombs! The game tests your reflexes, timing, and decision-making while aiming for the best score.

The player has **3 lives** and must move left and right across a **10x10 grid** to catch or dodge different falling items. The speed increases as your score gets higher, making it progressively more challenging.

This project was chosen for its fun and engaging gameplay mechanics, combined with the challenge of dynamic DOM manipulation and audio integration in vanilla JavaScript.

## 🎮 Getting Started

- **Play the game live**: [Moba Moba on GitHub Pages](https://bazmo36.github.io/Moba-Moba-Game/)


## 🧠 How to Play

1. Press the **Start** button.
2. Use the **left (⬅️)** and **right (➡️)** buttons or keyboard arrows to move.
3. Catch **bananas (+5 pts)** and **gold (+50 pts)**.
4. Avoid **rotten bananas (-10 pts)** and **bombs (-1 life)**.
5. Catch **hearts ❤️** to regain lives (max 3).
6. Survive as long as possible to set a **high score**!

---

## 🛠️ Technologies Used

### **JavaScript**
- Main logic and interactivity
- Grid creation, item dropping, score/life tracking
- Event handling (buttons, keys)
- Local storage to save best score

### **HTML**
- Structured layout with semantic elements
- Div-based grid system for gameplay area

### **CSS**
- Responsive layout with Flexbox and Grid
- Custom styling and theme (jungle-inspired)
- Animation and background images
- Button icons and fonts via Google Fonts

### **Audio**
- Integrated sound effects for catching items, game over, footsteps
- Background music with mute/unmute toggle

---

## 🔊 Sound & Media Attributions

### 🎵 Audio

- Bomb, banana, rotten banana, gold, heart, game over, and background sounds from local assets
- Background music: `background-sound.mp3`

### 🖼️ Images

- Start screen background: [Craiyon AI](https://media.craiyon.com/2025-04-24/7Ytq8Bw5TEeUm1N2JPMtRQ.webp)
- Monkey: Custom edited sprite
- Banana and items from public PNG sources like [Pixabay](https://pixabay.com/)
- Minecraft heart icon: [TopPNG](https://toppng.com/uploads/thumbnail/minecraft-heart-png-8-bits-heart-115628574854lkqwg133a.png)

### 📚 Libraries and Fonts

- [Google Fonts – Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P)
- Bootstrap icon references used for button styling

---

## 🚀 Future Enhancements
- 🎨 Themed levels (e.g. Jungle, Space, Underwater)
- 📈 Difficulty levels (easy, medium, hard)
- 🥇 Achievements and unlockables
- 👥time-based challenge mode

---

## 📂 File Structure

```plaintext
.
├── index.html
├── /css
│   └── style.css
├── /js
│   └── app.js
├── /assets
│   ├── bomb sound.wav
│   ├── background-sound.mp3
│   └── ... (images + sfx)
└── README.md
