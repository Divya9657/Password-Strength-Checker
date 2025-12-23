const passwordInput = document.getElementById("password");
const strengthText = document.getElementById("strength-text");
const strengthBar = document.getElementById("strength-bar");
const togglePassword = document.getElementById("togglePassword");
const copyBtn = document.getElementById("copyBtn");
const generateBtn = document.getElementById("generateBtn");
const form = document.getElementById("passwordForm");
const lengthInput = document.getElementById("length");
let currentStrength = 0;

// Show/Hide Password
togglePassword.addEventListener("click", () => {
  const type = passwordInput.type === "password" ? "text" : "password";
  passwordInput.type = type;
  togglePassword.textContent = type === "password" ? "🔒" : "👁️";
});

// Detect Input Changes
passwordInput.addEventListener("input", () => {
  const password = passwordInput.value;
  currentStrength = calculateStrength(password);
  updateStrengthUI(currentStrength);
});

// Calculate Strength
function calculateStrength(password) {
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;
  return strength;
}

// Update UI
function updateStrengthUI(strength) {
  const texts = ["", "Weak", "Medium", "Strong", "Very Strong"];
  const colors = ["#444", "#ff4d4d", "#ffaa00", "#6cefadff", "#0de8f8ff"];
  const widths = ["0%", "25%", "50%", "75%", "100%"];

  strengthText.textContent = texts[strength];
  strengthBar.style.backgroundColor = colors[strength];
  strengthBar.style.width = widths[strength];
}

// Copy Password
copyBtn.addEventListener("click", () => {
  const password = passwordInput.value;
  if (password) {
    navigator.clipboard.writeText(password)
      .then(() => alert("Password copied to clipboard!")) //runs on the success
      .catch(() => alert("Failed to copy password."));   //runs on fail
  } else {
    alert("No password to copy!");
  }
});

// Generate Strong Password
generateBtn.addEventListener("click", () => {
  const length = parseInt(lengthInput.value) || 12;
  const password = generateStrongPassword(length);
  passwordInput.value = password;
  currentStrength = calculateStrength(password);
  updateStrengthUI(currentStrength);
});

// Generate Password Function (guarantees all char types)
function generateStrongPassword(length) {
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";
  
  // Ensure each category has at least 1 char
  let password = [
    lower[Math.floor(Math.random() * lower.length)],
    upper[Math.floor(Math.random() * upper.length)],
    numbers[Math.floor(Math.random() * numbers.length)],
    symbols[Math.floor(Math.random() * symbols.length)]
  ];

  // Fill the rest randomly from all combined characters
  const allChars = lower + upper + numbers + symbols;
  for (let i = password.length; i < length; i++) {
    password.push(allChars[Math.floor(Math.random() * allChars.length)]);
  }

  // Shuffle to remove predictable order
  password = password.sort(() => Math.random() - 0.5);

  return password.join("");
}

// Form Submission
form.addEventListener("submit", (e) => {
  e.preventDefault();  //prevent the page reload
  if (currentStrength < 4) {
    alert("Password too weak. Please enter a stronger password.");
  } else {
    alert("Form submitted successfully with a strong password!");
    form.reset();
    updateStrengthUI(0);
  }
});
