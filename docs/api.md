# 📚 ComercialX Cockpit - Documentación de Endpoints

API RESTful con autenticación JWT, trazabilidad y validación real. A continuación se detallan los endpoints principales con ejemplos `curl`.

---

## 🔐 Login

**POST** `/auth/login`

```bash
curl -X POST https://api.comercialx.cl/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"usuario@dominio.cl","password":"********"}'
