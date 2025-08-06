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

document.getElementById('view-submissions').addEventListener('click', async () => {
  const section = document.getElementById('submissions');
  if (section.classList.contains('hidden')) {
    try {
      const res = await fetch('/api/contacts');
      const data = await res.json();
      const tbody = document.getElementById('submissions-body');
      tbody.innerHTML = '';
      data.forEach((c) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td class="py-2 px-4 border-b">${c.name}</td>` +
                       `<td class="py-2 px-4 border-b">${c.email}</td>` +
                       `<td class="py-2 px-4 border-b">${c.message}</td>` +
                       `<td class="py-2 px-4 border-b">${new Date(c.timestamp).toLocaleString()}</td>`;
        tbody.appendChild(tr);
      });
    } catch (err) {
      console.error('Failed to load contacts', err);
    }
    section.classList.remove('hidden');
  } else {
    section.classList.add('hidden');
  }
});
