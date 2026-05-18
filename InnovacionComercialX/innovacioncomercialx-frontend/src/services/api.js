const API = "http://localhost:3000/api";

export async function getProductos() {
  const res = await fetch(\`\${API}/producto\`);
  return res.json();
}

export async function login(correo, password) {
  const res = await fetch(\`\${API}/auth/login\`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ correo, password })
  });
  return res.json();
}
