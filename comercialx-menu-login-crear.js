#!/usr/bin/env node
import inquirer from 'inquirer';

const sandbox = true; // Cambiar a false si quieres modo real

async function ejecutarOpcion(opcion) {
  switch(opcion) {
    case 'login':
      if(sandbox) {
        const { correo } = await inquirer.prompt([
          { type: 'input', name: 'correo', message: '✏️ Ingrese correo para login (sandbox):' }
        ]);
        console.log(`💡 [SANDBOX] Sesión iniciada para ${correo} (simulado)`);
      } else {
        const { correo, password } = await inquirer.prompt([
          { type: 'input', name: 'correo', message: '✏️ Correo:' },
          { type: 'password', name: 'password', message: '🔑 Contraseña:' }
        ]);
        console.log(`🔄 Iniciando sesión real para ${correo}...`);
        // Llama a tu función real de autenticación aquí
      }
      break;

    case 'crear_usuario':
      if(sandbox) {
        const { nombre, correo } = await inquirer.prompt([
          { type: 'input', name: 'nombre', message: '✏️ Nombre del usuario (sandbox):' },
          { type: 'input', name: 'correo', message: '✏️ Correo del usuario (sandbox):' }
        ]);
        console.log(`💡 [SANDBOX] Usuario ${nombre} (${correo}) creado (simulado)`);
      } else {
        const { nombre, correo, password } = await inquirer.prompt([
          { type: 'input', name: 'nombre', message: '✏️ Nombre del usuario:' },
          { type: 'input', name: 'correo', message: '✏️ Correo:' },
          { type: 'password', name: 'password', message: '🔑 Contraseña:' }
        ]);
        console.log(`🧑‍💼 Creando usuario real ${nombre}...`);
        // Llama a tu función real de creación de usuario aquí
      }
      break;

    default:
      console.log('❌ Opción inválida');
      break;
  }
}

async function main() {
  while(true) {
    const { opcion } = await inquirer.prompt([
      {
        type: 'list',
        name: 'opcion',
        message: '===== MENU COMERCIALX =====',
        choices: [
          { name: '2) Iniciar sesión', value: 'login' },
          { name: '3) Crear nuevo usuario', value: 'crear_usuario' },
          { name: 'Salir', value: 'salir' }
        ],
      },
    ]);

    if(opcion === 'salir') {
      console.log('🚪 Saliendo...');
      process.exit(0);
    }

    await ejecutarOpcion(opcion);
    await inquirer.prompt([{ type: 'input', name: 'enter', message: 'Presiona ENTER para continuar...' }]);
  }
}

main();
