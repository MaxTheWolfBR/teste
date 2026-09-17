// ========== CONFIGURAÇÃO ==========
const SECRET = "quiz_sexual_chave_secreta_2025_web";

// ========== ESTADO ==========
let answered = {};          // { id: resposta }
let currentBatch = [];
let selectedMode = "medio";

// ========== ELEMENTOS ==========
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const endScreen = document.getElementById("end-screen");
const questionsContainer = document.getElementById("questions-container");
const answeredCountEl = document.getElementById("answered-count");
const fileUpload = document.getElementById("file-upload");

// ========== CRIPTOGRAFIA SIMPLES (XOR + Base64) ==========
function deriveKey(secret) {
  // Gera uma chave simples a partir da string
  let hash = 0;
  for (let i = 0; i < secret.length; i++) {
    hash = ((hash << 5) - hash) + secret.charCodeAt(i);
    hash |= 0;
  }
  const key = [];
  for (let i = 0; i < 32; i++) {
    key.push((hash >> (i % 4 * 8)) & 0xff);
  }
  return key;
}

function encrypt(data) {
  const key = deriveKey(SECRET);
  const str = JSON.stringify(data);
  const bytes = new TextEncoder().encode(str);
  const encrypted = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) {
    encrypted[i] = bytes[i] ^ key[i % key.length];
  }
  return btoa(String.fromCharCode(...encrypted));
}

function decrypt(base64) {
  try {
    const key = deriveKey(SECRET);
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const decrypted = new Uint8Array(bytes.length);
    for (let i = 0; i < bytes.length; i++) {
      decrypted[i] = bytes[i] ^ key[i % key.length];
    }
    const str = new TextDecoder().decode(decrypted);
    return JSON.parse(str);
  } catch (e) {
    return null;
  }
}

// ========== GERAÇÃO DE PERGUNTAS ==========
function generateQuestions(count = 5) {
  const answeredIds = new Set(Object.keys(answered).map(Number));
  let available = QUESTIONS.filter(q => !answeredIds.has(q.id));

  // Se acabou o banco, gera perguntas de aprofundamento
  if (available.length === 0) {
    const temas = ["fetiches", "toque", "dinâmicas de poder", "sensações", "roleplay", "orgasmo", "dirty talk"];
    const templates = [
      "Sobre o que você respondeu a respeito de {tema}, gostaria de explorar mais detalhes?",
      "Em relação a {tema}, existe alguma variação que te atrai mais?",
      "Como você se sente ao imaginar {tema} de forma mais intensa?",
      "Há algum limite especial que você gostaria de definir sobre {tema}?"
    ];
    const newQs = [];
    for (let i = 0; i < count; i++) {
      const tema = temas[Math.floor(Math.random() * temas.length)];
      const text = templates[Math.floor(Math.random() * templates.length)].replace("{tema}", tema);
      newQs.push({
        id: 1000 + Object.keys(answered).length + i,
        text,
        category: "aprofundamento",
        options: null
      });
    }
    return newQs;
  }

  // Embaralha e pega a quantidade desejada
  available = available.sort(() => Math.random() - 0.5);
  return available.slice(0, Math.min(count, available.length));
}

// ========== RENDER ==========
function renderQuestions() {
  questionsContainer.innerHTML = "";
  answeredCountEl.textContent = Object.keys(answered).length;

  if (currentBatch.length === 0) {
    quizScreen.classList.add("hidden");
    endScreen.classList.remove("hidden");
    return;
  }

  currentBatch.forEach(q => {
    const card = document.createElement("div");
    card.className = "question-card";
    card.dataset.id = q.id;

    let optionsHtml = "";
    if (q.options) {
      optionsHtml = `<div class="options">`;
      q.options.forEach((opt, i) => {
        optionsHtml += `
          <label class="option">
            <input type="radio" name="q_${q.id}" value="${opt}">
            <span>${opt}</span>
          </label>`;
      });
      optionsHtml += `</div>`;
    } else {
      optionsHtml = `<textarea placeholder="Digite sua resposta..." id="text_${q.id}"></textarea>`;
    }

    card.innerHTML = `
      <h3>${q.text}</h3>
      ${optionsHtml}
      <button class="answer-btn" onclick="submitAnswer(${q.id})">Registrar resposta</button>
    `;
    questionsContainer.appendChild(card);
  });
}

function submitAnswer(id) {
  let answer = null;
  const card = document.querySelector(`.question-card[data-id="${id}"]`);
  
  const radio = card.querySelector(`input[name="q_${id}"]:checked`);
  if (radio) {
    answer = radio.value;
  } else {
    const textarea = card.querySelector(`#text_${id}`);
    if (textarea) answer = textarea.value.trim();
  }

  if (!answer) {
    alert("Por favor, responda antes de registrar.");
    return;
  }

  answered[id] = answer;
  currentBatch = currentBatch.filter(q => q.id !== id);
  renderQuestions();
}

// ========== SALVAR / CARREGAR ==========
function saveProgress() {
  const data = { answered, timestamp: Date.now() };
  const encrypted = encrypt(data);
  
  const blob = new Blob([encrypted], { type: "application/octet-stream" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "meu_progresso.qdata";
  a.click();
  URL.revokeObjectURL(url);
}

function loadProgress(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const decrypted = decrypt(e.target.result);
    if (!decrypted || !decrypted.answered) {
      alert("Arquivo inválido ou corrompido.");
      return;
    }
    answered = decrypted.answered;
    currentBatch = generateQuestions(5);
    startScreen.classList.add("hidden");
    endScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");
    renderQuestions();
  };
  reader.readAsText(file);
}

// ========== EVENTOS ==========
document.querySelectorAll(".mode-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".mode-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    selectedMode = btn.dataset.mode;
  });
});

document.getElementById("start-btn").addEventListener("click", () => {
  const counts = { poucas: 15, medio: 40, muitas: 80 };
  currentBatch = generateQuestions(counts[selectedMode] || 40);
  startScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  renderQuestions();
});

document.getElementById("more-questions-btn").addEventListener("click", () => {
  currentBatch = generateQuestions(5);
  renderQuestions();
});

document.getElementById("save-btn").addEventListener("click", saveProgress);
document.getElementById("save-end-btn").addEventListener("click", saveProgress);

document.getElementById("restart-btn").addEventListener("click", () => {
  answered = {};
  currentBatch = [];
  endScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
});

fileUpload.addEventListener("change", (e) => {
  if (e.target.files[0]) {
    loadProgress(e.target.files[0]);
  }
});
