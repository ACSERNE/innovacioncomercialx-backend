async function main() {
const bcrypt = require('bcryptjs');
const { User } = require('./models');

(async () => {
  try {
    const correo = 'testuser@example.com';
    const passwordPlain = '123456';

    const user = await User.findOne({ where: { correo } });
    if (!user) {
      console.log('Usuario NO encontrado');
      return;
    }

    user.password = await bcrypt.hash(passwordPlain, 10);
    await user.save();

    console.log('Contraseña reseteada a "123456" con éxito');
  } catch (error) {
    console.error('Error:', error);
  }
})();}
main()
