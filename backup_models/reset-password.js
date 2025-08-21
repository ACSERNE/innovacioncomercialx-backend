async function main() {
const bcrypt = require('bcryptjs');
const { User } = require('./models');

(async () => {
  try {
    const correo = 'testuser@example.com';  // Cambia el correo si quieres otro usuario
    const newPassword = '123456';            // Cambia la nueva contraseña aquí

    const user = await User.findOne({ where: { correo } });
    if (!user) {
      console.log('Usuario no encontrado');
      process.exit(1);
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;

    // Guardar sin hooks para evitar doble hash
    await user.save({ hooks: false });

    console.log('✅ Contraseña reseteada con éxito');
    process.exit(0);
  } catch (error) {
    console.error('Error reseteando contraseña:', error);
    process.exit(1);
  }
})();
}
main()
