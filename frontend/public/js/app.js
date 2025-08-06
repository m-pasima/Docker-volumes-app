document.getElementById('contact-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const status = document.getElementById('status');
  const data = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value
  };
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      status.textContent = 'Message sent!';
      e.target.reset();
    } else {
      status.textContent = 'Failed to send.';
    }
  } catch (err) {
    status.textContent = 'Error sending message.';
  }
});
