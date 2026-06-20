const { User } = require('./models');

async function checkUser() {
  try {
    const user = await User.findByPk('26152256-k');
    if (!user) {
      console.log('Usuario no encontrado');
    } else {
      console.log('Usuario encontrado:', user.toJSON());
    }
  } catch (error) {
    console.error('Error:', error);
  }
  process.exit();
}

checkUser();
