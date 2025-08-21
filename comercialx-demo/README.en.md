# 📦 ComercialX Cockpit

Federated technical cockpit for remote validation, visual auditing, and multiplatform publishing via GitHub Pages, Netlify, and Railway.

---

## 🌐 Countries and Environments

| Country   | Store     | Environment | Viewer | Log | Embed | Badge |
|-----------|-----------|-------------|--------|-----|-------|-------|
| 🇨🇱 Chile   | Santiago  | Production  | [Viewer](visor-chile.html) | [Log](logs/log-chile.txt) | [Embed](embeds/embed-chile.html) | ![Chile](badges/badge-chile.svg) |
| 🇲🇽 Mexico  | CDMX      | Staging     | [Viewer](visor-mexico.html) | [Log](logs/log-mexico.txt) | [Embed](embeds/embed-mexico.html) | ![Mexico](badges/badge-mexico.svg) |
| 🇪🇸 Spain   | Madrid    | QA          | [Viewer](visor-espana.html) | [Log](logs/log-espana.txt) | [Embed](embeds/embed-espana.html) | ![Spain](badges/badge-españa.svg) |

---

## 📊 Technical Dashboard

- [Dashboard Monitor](dashboard-monitor.html)
- [dashboard.csv](dashboard.csv)
- [dashboard-maestro-normalizado.json](dashboard-maestro-normalizado.json)

---

## 🛠️ Technical Scripts

| Script | Description |
|--------|-------------|
| `generador-dashboard-csv.sh` | Generates `dashboard.csv` from master JSON |
| `validador-csv.sh` | Validates CSV structure and encoding |
| `validador-remoto.sh` | Runs remote validation per country |
| `verificador-submodulo.sh` | Checks submodule status |
| `visor-submodulo.html` | Visual viewer of submodule state |

---

## 🚀 Deploy & Traceability

- Published at: [GitHub Pages](https://acserne.github.io/comercialx-demo/)
- Full history: [GitHub Actions](https://github.com/ACSERNE/comercialx-demo/actions)
- Latest deploy attempts:
  - ❌ #34 – Failed
  - ❌ #33 – Failed
  - ❌ #32 – Failed
  - ❌ #28 – Failed

---

## 🤝 Contribute

1. Clone the repository:
   ```bash
   git clone https://github.com/ACSERNE/comercialx-demo.git
   cd comercialx-demo
   ```

2. Run validations:
   ```bash
   bash validador-remoto.sh
   bash verificador-submodulo.sh
   ```

3. Generate artifacts:
   ```bash
   bash generador-dashboard-csv.sh
   ```

4. Commit and push:
   ```bash
   git add .
   git commit -m "Cockpitized iteration"
   git push origin gh-pages
   ```

---

## 🧭 Federated by ComercialX Cockpit

Remote validation, visual traceability, and extended auditing for Chile, Mexico, and Spain.  
Compatible with GitHub Pages, Netlify, and Railway.  
Reproducible via CLI, web, and federated environments.

---
