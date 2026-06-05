const mongoose = require('mongoose');
let MongoMemoryServer;

try {
  // require lazily to avoid module-not-found during installs
  MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;
} catch (e) {
  MongoMemoryServer = null;
}

const connectDB = async () => {
  const isProd = process.env.NODE_ENV === 'production';
  let mongoUri = process.env.MONGODB_ATLAS_URI || process.env.MONGODB_URI;

  const tryConnect = async (uri) => {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  };

  if (mongoUri) {
    try {
      await tryConnect(mongoUri);
      console.log(`MongoDB Connected: ${mongoose.connection.host}`);
      return true;
    } catch (err) {
      console.error(`Failed to connect to provided MongoDB URI: ${err.message}`);
      if (isProd) {
        process.exit(1);
      }
      // fallthrough to in-memory when not production
    }
  }

  if (!MongoMemoryServer) {
    console.error('mongodb-memory-server is not installed. Install it or provide a MongoDB URI.');
    process.exit(1);
  }

  try {
    const fs = require('fs');
    const path = require('path');
    const dbDir = path.resolve(process.cwd(), '.mongodb_data');
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }

    if (isProd) {
      console.log('Running with persistent local MongoDB database.');
    }
    console.log('Starting local persistent MongoDB...');
    const mongod = await MongoMemoryServer.create({
      instance: {
        dbPath: dbDir,
        storageEngine: 'wiredTiger',
        persist: true
      }
    });
    mongoUri = mongod.getUri();

    // Persist the in-memory URI to a file so other processes (seed) can use it
    try {
      const filePath = path.resolve(process.cwd(), '.mongouri');
      fs.writeFileSync(filePath, mongoUri, { encoding: 'utf8' });
      console.log(`Wrote MongoDB URI to ${filePath}`);
    } catch (fsErr) {
      console.warn('Could not write .mongouri file:', fsErr.message);
    }
    await tryConnect(mongoUri);
    console.log(`MongoDB In-Memory Started: ${mongoose.connection.host}`);
    return true;
  } catch (err) {
    console.error(`In-memory MongoDB failed to start: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
