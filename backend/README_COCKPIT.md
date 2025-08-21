# 🧭 Cockpit Técnico — InnovacionComercialX

Este entorno incluye una CLI técnica modular con visualizador interactivo, cabeceras dinámicas, validadores y estructura de carpetas trazable.

---

## 📦 Módulos Técnicos

| Módulo | Estado | Archivo |
|--------|--------|--------|
| 🧠 Introspección Técnica | ✅ OK | cli/modules/introspeccion.js |
| 🌳 Estructura del Proyecto | ✅ OK | cli/tools/estructura.js |
| 🚦 Auditor de Rutas | ✅ OK | cli/modules/auditor.js |
| 🔍 Validador de Semillas | ✅ OK | cli/modules/validador.js |
| 🩺 Diagnóstico del Sistema | ✅ OK | cli/modules/diagnostico.js |
| 📤 Exportador Batch | ✅ OK | cli/modules/exportador.js |

---

## 📁 Estructura del Proyecto

- `backend/cli/` → CLI principal y módulos  
- `backend/utils/` → cabeceras dinámicas, explorador técnico  
- `backend/routes/` → routers Express  
- `backend/logs/` → evidencias Markdown, CSV  
- `backend/data/` → semillas y archivos de entrada JSON

---

## 🚀 Uso

```bash
node backend/cli/index.js
```

---

## ⚙️ Diagnóstico Técnico

Antes de ejecutar validadores, corre:

```bash
node backend/cli/modules/diagnostico.js
```
---

## 📈 Dashboard Visual

![Dashboard HTML](routes-dashboard.html)

---

## 🔍 Gaps Detectados

Consulta `routes-gaps.md` para ver rutas esperadas no encontradas en la auditoría.