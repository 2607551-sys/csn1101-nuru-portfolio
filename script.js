const quoteText = document.querySelector('#quote-text');
const quoteAuthor = document.querySelector('#quote-author');
const quoteStatusText = document.querySelector('#quote-status-text');
const quoteCard = document.querySelector('.quote-card');
const refreshQuoteButton = document.querySelector('#refresh-quote');
const contactForm = document.querySelector('#contact-form');
const formFeedback = document.querySelector('#form-feedback');
const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('#site-nav');

function setQuoteState({ text, author, status, busy }) {
  quoteText.textContent = text;
  quoteAuthor.textContent = author;
  quoteStatusText.textContent = status;
  quoteCard.setAttribute('aria-busy', String(busy));
}

async function loadQuote() {
  setQuoteState({ text: 'Finding a fresh thought…', author: 'Loading the signal', status: 'Fetching now', busy: true });
  refreshQuoteButton.disabled = true;
  try {
    const response = await fetch('https://api.quotable.io/random', { headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error(`Quote request failed with status ${response.status}`);
    const data = await response.json();
    setQuoteState({ text: data.content || 'Keep making room for better questions.', author: data.author ? `— ${data.author}` : '— Unknown author', status: 'Live from Quotable', busy: false });
  } catch (error) {
    console.warn('Live quote unavailable:', error);
    setQuoteState({ text: 'The signal is quiet right now. Your next good idea can still start here.', author: '— Nuru fallback', status: 'Offline fallback', busy: false });
  } finally {
    refreshQuoteButton.disabled = false;
  }
}

refreshQuoteButton.addEventListener('click', loadQuote);
loadQuote();

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.querySelector('#name').value.trim();
  if (!name) {
    formFeedback.textContent = 'Please add your name so I know who is writing.';
    return;
  }
  formFeedback.textContent = `Thanks, ${name}. Your note is ready to send — email hello@nuru.studio to continue the conversation.`;
  contactForm.reset();
});

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  siteNav.classList.toggle('open', !isOpen);
});

siteNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    siteNav.classList.remove('open');
  });
});
