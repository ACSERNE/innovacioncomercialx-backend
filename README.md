╭────────────────────────────────────────────────────────────╮
│ 🚀 ComercialX Cockpit Backend                              │
╰────────────────────────────────────────────────────────────╯

Sistema modular y multiplataforma para gestión de tienda, ventas, productos y auditoría. Totalmente cockpitizado con branding visual, scripts automatizados y documentación extendida.

---

## 🧠 Compatibilidad técnica

- ✅ Node.js **v18 a v22+**
- ✅ CommonJS puro (`require`, `module.exports`)
- ❌ No se usa `"type": "module"` ni `.mjs`
- 🔒 Todos los `await` encapsulados en funciones `main()`

---

## ⚠️ Prevención de errores ESM

Node.js 22+ activa modo ESM si detecta:

- `"type": "module"` en `package.json`
- Archivos `.mjs`
- `await` fuera de funciones

Para evitarlo:

```bash
./validate-esm-risk-smart.sh   # Escaneo inteligente
./fix-await-cat.sh             # Encapsula await automáticamente
