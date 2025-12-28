const mongoose = require('mongoose');
const { Schema } = mongoose;

// Minimal Service schema for seeding
const ServiceSchema = new Schema(
    {
        slug: { type: String, required: true, unique: true },
        title: {
            en: { type: String, required: true },
            ar: { type: String, required: true },
        },
        description: {
            en: { type: String, required: true },
            ar: { type: String, required: true },
        },
        icon: { type: String },
        order: { type: Number, default: 0 },
    },
    { timestamps: true }
);

const Service = mongoose.models.Service || mongoose.model('Service', ServiceSchema);

const services = [
    {
        slug: 'corporate-law',
        title: { en: 'Corporate & Company Law', ar: 'قانون الشركات' },
        description: {
            en: 'Company formation, governance, and legal compliance for businesses in Oman.',
            ar: 'تأسيس الشركات، الحوكمة، والامتثال القانوني للشركات العاملة في سلطنة عمان.'
        },
        icon: '/images/services/corporate-law.png',
        order: 1
    },
    {
        slug: 'civil-litigation',
        title: { en: 'Civil Litigation', ar: 'القانون المدني التقاضي' },
        description: {
            en: 'Dispute resolution and court representation for civil and commercial cases.',
            ar: 'حل النزاعات والتمثيل القانوني في المحاكم العمانية للقضايا المدنية والتجارية.'
        },
        icon: '/images/services/civil-litigation.png',
        order: 2
    },
    {
        slug: 'criminal-law',
        title: { en: 'Criminal Law', ar: 'القانون الجنائي' },
        description: {
            en: 'Strategic defense in misdemeanor and felony cases according to Omani Penal Code.',
            ar: 'الدفاع الاستراتيجي في قضايا الجنح والجنايات وفقاً لقانون الجزاء العماني.'
        },
        icon: '/images/services/criminal-law.png',
        order: 3
    },
    {
        slug: 'real-estate-law',
        title: { en: 'Real Estate & Property', ar: 'عقارات وأراضي' },
        description: {
            en: 'Property transactions, land registration, and ownership legalities in the Sultanate.',
            ar: 'المعاملات العقارية، تسجيل الأراضي، والنزاعات المتعلقة بالتملك في السلطنة.'
        },
        icon: '/images/services/real-estate.png',
        order: 4
    },
    {
        slug: 'family-law',
        title: { en: 'Family Law', ar: 'قانون الأسرة والأحوال الشخصية' },
        description: {
            en: 'Personal status matters, marriage, divorce, and family dispute mediation.',
            ar: 'قضايا الأحوال الشخصية، الزواج، الطلاق، والوساطة في النزاعات العائلية.'
        },
        icon: '/images/services/family-law.png',
        order: 5
    },
    {
        slug: 'labor-law',
        title: { en: 'Labor & Employment', ar: 'قانون العمل والعمال' },
        description: {
            en: 'Employment contracts, worker rights, and Omani labor law compliance.',
            ar: 'عقود العمل، حقوق العمال، والامتثال لقانون العمل العماني وتعديلاته.'
        },
        icon: '/images/services/labor-law.png',
        order: 6
    },
    {
        slug: 'administrative-law',
        title: { en: 'Administrative Law', ar: 'القانون الإداري' },
        description: {
            en: 'Claims against government entities, administrative decisions, and legal grievances.',
            ar: 'الدعاوى ضد الجهات الحكومية، القرارات الإدارية، والتظلمات القانونية.'
        },
        icon: 'Scale', // Placeholder icon name from lucide
        order: 7
    }
];

async function seed() {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/oman-law-firm';

    await mongoose.connect(MONGODB_URI);
    console.log('Connected to DB');

    // Clean up existing services to remove junk data
    await Service.deleteMany({});
    console.log('Cleared existing services');

    for (const service of services) {
        await Service.findOneAndUpdate(
            { slug: service.slug },
            service,
            { upsert: true, new: true }
        );
        console.log(`Seeded/Updated service: ${service.slug}`);
    }

    console.log('Seeding completed');
    process.exit(0);
}

seed().catch((err) => {
    console.error(err);
    process.exit(1);
});
