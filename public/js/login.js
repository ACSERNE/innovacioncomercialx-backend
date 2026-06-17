async function login() {
  const correo = document.getElementById('correo').value;
  const password = document.getElementById('password').value;

  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ correo, password })
  });

  const data = await res.json();

  if (data.error) {
    document.getElementById('error').innerText = data.error;
    return;
  }

  localStorage.setItem('token', data.token);

  window.location.href = "/dashboard";
}
