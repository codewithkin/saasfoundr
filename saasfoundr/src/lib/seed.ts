import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const users = [
  {
    name: "Sarah Chen",
    email: "sarah@saasmaker.co",
    image: "https://ui-avatars.com/api/?name=Sarah+Chen",
    lookingFor: "TECHNICAL_COFOUNDER",
    bio: "Ex-Google PM building AI-powered analytics tools. Looking for a technical co-founder with ML expertise.",
    role: "BUSINESS"
  },
  {
    name: "Alex Kumar",
    email: "alex@techlabs.dev",
    image: "https://ui-avatars.com/api/?name=Alex+Kumar",
    lookingFor: "BUSINESS_COFOUNDER",
    bio: "Full-stack developer with 8 years experience. Built and sold 2 SaaS products. Seeking business co-founder.",
    role: "TECHNICAL"
  },
  {
    name: "Maria Rodriguez",
    email: "maria@growthmetrics.io",
    image: "https://ui-avatars.com/api/?name=Maria+Rodriguez",
    lookingFor: "TECHNICAL_COFOUNDER",
    bio: "Growth marketing expert specializing in B2B SaaS. Previously led growth at Stripe.",
    role: "BUSINESS"
  },
  {
    name: "James Wilson",
    email: "james@cloudstack.dev",
    image: "https://ui-avatars.com/api/?name=James+Wilson",
    lookingFor: "BUSINESS_COFOUNDER",
    bio: "Backend engineer specializing in cloud infrastructure. Looking to build developer tools.",
    role: "TECHNICAL"
  },
  {
    name: "Lisa Park",
    email: "lisa@designsystems.co",
    image: "https://ui-avatars.com/api/?name=Lisa+Park",
    lookingFor: "TECHNICAL_COFOUNDER",
    bio: "Product designer with expertise in B2B SaaS. Worked with 20+ startups.",
    role: "BUSINESS"
  },
  {
    name: "Michael Zhang",
    email: "michael@aiplatform.dev",
    image: "https://ui-avatars.com/api/?name=Michael+Zhang",
    lookingFor: "BUSINESS_COFOUNDER",
    bio: "ML engineer with PhD in Computer Science. Built multiple AI products.",
    role: "TECHNICAL"
  },
  {
    name: "Emma Brown",
    email: "emma@saasventures.co",
    image: "https://ui-avatars.com/api/?name=Emma+Brown",
    lookingFor: "TECHNICAL_COFOUNDER",
    bio: "Serial entrepreneur with 2 successful exits. Focus on B2B enterprise software.",
    role: "BUSINESS"
  },
  {
    name: "David Kim",
    email: "david@devtools.io",
    image: "https://ui-avatars.com/api/?name=David+Kim",
    lookingFor: "BUSINESS_COFOUNDER",
    bio: "Senior engineer from AWS. Expert in cloud infrastructure and DevOps.",
    role: "TECHNICAL"
  }
];

const samplePosts = [
  "Just launched our new SaaS product! 🚀",
  "Looking for a technical co-founder for my startup",
  "Great meeting with potential investors today",
  "Sharing my experience building MVPs",
  "Anyone interested in joining our beta testing?",
  "Milestone achieved: 1000 users! 🎉",
  "Need feedback on our new UI design",
  "Tips for scaling your SaaS business",
  "Lessons learned from my first startup",
  "Seeking mentorship in product development",
];

async function seed() {
  console.log('🌱 Seeding database...');

  const createdUsers = [];
  
  for (const user of users) {
    const newUser = await prisma.user.upsert({
      where: { email: user.email },
      update: user,
      create: user,
    });

    createdUsers.push(newUser);
  }

  // Create 25 random posts
for (let i = 0; i < 25; i++) {
  const randomUser = createdUsers[Math.floor(Math.random() * createdUsers.length)];
  const randomPost = samplePosts[Math.floor(Math.random() * samplePosts.length)];
  
  await prisma.post.create({
    data: {
      user_id: randomUser.id,
      content: randomPost,
      created_at: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)) // Random date within the last week
    }
  });
}

  console.log('✅ Database seeded successfully!');
}

export default seed;

seed()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
