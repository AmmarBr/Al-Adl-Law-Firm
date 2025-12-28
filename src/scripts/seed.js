const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;

// Define minimal User schema for seeding
const UserSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, select: false },
        role: { type: String, enum: ['admin', 'editor', 'viewer'], default: 'viewer' },
    },
    { timestamps: true }
);

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function seed() {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/oman-law-firm';

    await mongoose.connect(MONGODB_URI);
    console.log('Connected to DB');

    const adminEmail = 'admin@aladl.com';
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash('admin123', 10);
        await User.create({
            name: 'Admin User',
            email: adminEmail,
            password: hashedPassword,
            role: 'admin',
        });
        console.log('Admin user created: admin@aladl.com / admin123');
    } else {
        console.log('Admin user already exists');
    }

    process.exit(0);
}

seed().catch((err) => {
    console.error(err);
    process.exit(1);
});
