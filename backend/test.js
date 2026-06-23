const bcrypt = require('bcryptjs');

const testBcrypt = async () => {
  try {
    console.log('Testing bcrypt...');
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash('123456', salt);
    console.log('Hash created:', hash);
    const match = await bcrypt.compare('123456', hash);
    console.log('Password match:', match);
    console.log('bcrypt works fine!');
  } catch (error) {
    console.log('bcrypt error:', error.message);
  }
};

testBcrypt();