require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

const User = require('../src/models/User');

const getUri = () => {
  if (process.env.MONGODB_URI) return process.env.MONGODB_URI;
  const file = path.resolve(process.cwd(), '.mongouri');
  if (fs.existsSync(file)) return fs.readFileSync(file, 'utf8').trim();
  return process.env.MONGODB_ATLAS_URI || null;
};

(async () => {
  try {
    const uri = getUri();
    if (!uri) {
      console.error('No MongoDB URI found.');
      process.exit(1);
    }
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const users = await User.find({}).select('+password');
    console.log('Users in DB:');
    users.forEach(u => {
      console.log(`- ${u.email} | role=${u.role} | passwordHash=${u.password}`);
    });
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Error listing users:', err.message);
    process.exit(1);
  }
})();
