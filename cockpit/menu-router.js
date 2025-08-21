async function main() {
const fs = require('fs');
const path = require('path');
const genericMenu = require('./generic-menu');

const loadUser = (email) => {
  const userPath = path.join(__dirname, 'users', `${email}.json`);
  if (!fs.existsSync(userPath)) {
    console.error('❌ Usuario no registrado.');
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(userPath, 'utf-8'));
};

const routeMenu = async (email) => {
  const user = loadUser(email);
  const { fullName, role } = user;

  console.log(`👋 Bienvenido, ${fullName} (${role})`);
  await genericMenu(fullName, role);
};

module.exports = routeMenu;
}
main()
