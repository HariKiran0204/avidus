require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./src/models/User');
const Task = require('./src/models/Task');
const ActivityLog = require('./src/models/ActivityLog');
const connectDB = require('./src/config/database');

const seedDatabase = async () => {
  try {
    // If a running server created an in-memory MongoDB, prefer its URI
    try {
      const fs = require('fs');
      const path = require('path');
      const filePath = path.resolve(process.cwd(), '.mongouri');
      if (!process.env.MONGODB_URI && fs.existsSync(filePath)) {
        process.env.MONGODB_URI = fs.readFileSync(filePath, { encoding: 'utf8' }).trim();
        console.log('Using in-memory MongoDB URI from .mongouri');
      }
    } catch (e) {
      // ignore
    }

    await connectDB();
    console.log('Connected to database');

    // Clear existing data
    await User.deleteMany({});
    await Task.deleteMany({});
    await ActivityLog.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'password123',
      role: 'Admin',
      status: 'Active'
    });
    console.log('✓ Admin user created');

    // Create regular users
    const user1 = await User.create({
      name: 'John Doe',
      email: 'user@example.com',
      password: 'password123',
      role: 'User',
      status: 'Active'
    });

    const user2 = await User.create({
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: 'password123',
      role: 'User',
      status: 'Active'
    });
    console.log('✓ Regular users created');

    // Create sample tasks
    const task1 = await Task.create({
      title: 'Complete Project Documentation',
      description: 'Write comprehensive documentation for the new API',
      createdBy: user1._id,
      status: 'In Progress',
      priority: 'High',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    const task2 = await Task.create({
      title: 'Fix Login Bug',
      description: 'Debug and fix the authentication issue',
      createdBy: adminUser._id,
      status: 'Pending',
      priority: 'High',
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
    });

    const task3 = await Task.create({
      title: 'Update User Interface',
      description: 'Redesign dashboard components',
      createdBy: user2._id,
      status: 'Completed',
      priority: 'Medium',
      dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    });

    console.log('✓ Sample tasks created');

    // Create sample activity logs
    await ActivityLog.create({
      userId: adminUser._id,
      action: 'LOGIN',
      description: 'Admin logged in',
      ipAddress: '192.168.1.1',
      userAgent: 'Mozilla/5.0...'
    });

    await ActivityLog.create({
      userId: user1._id,
      action: 'CREATE_TASK',
      description: 'User created a new task',
      taskId: task1._id,
      ipAddress: '192.168.1.100',
      details: { title: task1.title }
    });

    console.log('✓ Sample activity logs created');

    console.log('\n✅ Database seeding completed successfully!');
    console.log('\nDemo Credentials:');
    console.log('Admin - Email: admin@example.com, Password: password123');
    console.log('User - Email: user@example.com, Password: password123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();
