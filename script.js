// URL backend (ganti dengan URL backend kamu)
const BACKEND_URL = "https://backend-anda.com/chat";

// Fungsi untuk menangani input pengguna
async function sendMessage() {
  const userInput = document.getElementById("user-input").value;
  if (userInput.trim() === "") return;

  // Tambahkan pesan pengguna ke chat box
  appendMessage("user", userInput);

  // Dapatkan respons dari backend
  try {
    const aiResponse = await getAIResponse(userInput);
    appendMessage("ai", aiResponse);
  } catch (error) {
    appendMessage("ai", "Maaf, ada kesalahan saat memproses pesan kamu. Coba lagi ya!");
    console.error("Error:", error);
  }

  // Kosongkan input
  document.getElementById("user-input").value = "";
}

// Fungsi untuk mendapatkan respons dari backend
async function getAIResponse(userInput) {
  const response = await fetch(BACKEND_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: userInput }),
  });

  if (!response.ok) {
    throw new Error("Gagal mendapatkan respons dari backend");
  }

  const data = await response.json();
  return data.response;
}

// Fungsi untuk menambahkan pesan ke chat box
function appendMessage(sender, message) {
  const chatBox = document.getElementById("chat-box");
  const messageElement = document.createElement("div");
  messageElement.classList.add("message", sender);
  messageElement.textContent = message;
  chatBox.appendChild(messageElement);

  // Scroll ke bawah otomatis
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Fungsi untuk handle tombol Enter
function handleKeyPress(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
}
