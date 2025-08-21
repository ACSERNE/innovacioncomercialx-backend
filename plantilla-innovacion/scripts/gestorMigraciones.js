const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

function leerMigracionesPendientes() {
  const applied = JSON.parse(fs.readFileSync(path.join(__dirname, '../logs/applied-meta.json')));
  const disponibles = fs
    .readdirSync(path.join(__dirname, '../migrations'))
    .filter(f => f.endsWith('.js'));

  return disponibles
    .filter(m => !applied.includes(m))
    .map(m => {
      const texto = fs.readFileSync(path.join(__dirname, '../migrations', m), 'utf8');
      const criticos = ['password', 'email', 'userId', 'token', 'nombre'];
      const impacto = criticos.filter(c => texto.includes(`'${c}'`)).join(', ');
      return {
        migracion: m,
        acciones: texto.includes('addColumn') ? 'addColumn' : texto.includes('createTable') ? 'createTable' : '—',
        impactoCritico: impacto ? `🚨 ${impacto}` : '—'
      };
    });
}

async function gestorMigraciones() {
  const pendientes = leerMigracionesPendientes();
  console.table(pendientes);

  const opciones = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirmar',
      message: '¿Deseás aplicar TODAS las migraciones pendientes ahora?'
    }
  ]);

  if (opciones.confirmar) {
    exec('npx sequelize-cli db:migrate', (_, stdout, stderr) => {
      if (stderr) console.error(stderr);
      else console.log(stdout);
    });
  } else {
    console.log('⏸️ Migraciones conservadas en estado pendiente.');
  }
}

gestorMigraciones();