const fs = require('fs');
const path = require('path');
const sessionPath = path.join(__dirname, 'state', 'session.json');

const showWelcome = () => {
  const session = fs.existsSync(sessionPath)
    ? JSON.parse(fs.readFileSync(sessionPath, 'utf-8'))
    : null;

  let name = session?.fullName || 'Usuario';

  // Validación de nombre genérico
  if (/ejemplo/i.test(name)) {
    console.log(`
⚠️  Estás usando un nombre genérico: "${name}"
✏️  Te recomendamos personalizar tu perfil en session.json para una experiencia completa.
`);
    name = 'Usuario';
  }

  console.clear();
  console.log(`
██╗███╗   ██╗██╗███╗   ███╗ ██████╗ ██████╗ ██╗  ██╗██╗  ██╗
██║████╗  ██║██║████╗ ████║██╔═══██╗██╔══██╗██║ ██╔╝╚██╗██╔╝
██║██╔██╗ ██║██║██╔████╔██║██║   ██║██████╔╝█████╔╝  ╚███╔╝ 
██║██║╚██╗██║██║██║╚██╔╝██║██║   ██║██╔═══╝ ██╔═██╗  ██╔██╗ 
██║██║ ╚████║██║██║ ╚═╝ ██║╚██████╔╝██║     ██║  ██╗██╔╝ ██╗
╚═╝╚═╝  ╚═══╝╚═╝╚═╝     ╚═╝ ╚═════╝ ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝

🛍️  Bienvenido ${name} a Innovación ComercialX
🚀 Comercio cockpitizado, auditable y extensible
`);
};

module.exports = showWelcome;
