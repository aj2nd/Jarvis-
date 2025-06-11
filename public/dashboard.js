// Dark/Light mode toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  if (document.documentElement.getAttribute('data-theme') === 'dark') {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('jarvis-theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('jarvis-theme', 'dark');
  }
});
// On page load: persist theme
if (localStorage.getItem('jarvis-theme') === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
}

// Chat with animated typing indicator and error handling
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatLog = document.getElementById('chat-log');
const typingIndicator = document.getElementById('typing-indicator');

chatForm.addEventListener('submit', async function(e) {
  e.preventDefault();
  const userMsg = chatInput.value.trim();
  if (!userMsg) return;

  // Append user message
  chatLog.innerHTML += `<div class="chat-message user">You: ${userMsg}</div>`;
  chatInput.value = '';
  chatLog.scrollTop = chatLog.scrollHeight;

  // Show typing indicator
  typingIndicator.style.display = "flex";

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMsg })
    });
    const data = await res.json();
    typingIndicator.style.display = "none";
    chatLog.innerHTML += `<div class="chat-message ai">Jarvis: ${data.reply || 'No response'}</div>`;
    chatLog.scrollTop = chatLog.scrollHeight;
  } catch (err) {
    typingIndicator.style.display = "none";
    chatLog.innerHTML += `<div class="chat-message ai" style="color:red;">Error: Unable to connect to AI.</div>`;
    chatLog.scrollTop = chatLog.scrollHeight;
  }
});

// Animate stats on load (optional, demo only)
function animateValue(id, start, end, duration) {
  const obj = document.getElementById(id);
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.textContent = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}
animateValue('stat-sessions', 0, 12, 900);
animateValue('stat-queries', 0, 34, 900);
animateValue('stat-users', 0, 4, 900);

// (Optional) Animated activity list appearance
document.querySelectorAll('.animated-card').forEach((card, idx) => {
  card.style.animationDelay = `${0.15 * (idx+1)}s`;
});
