import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const users = [
  {
    name: "Sarah Chen",
    email: "sarah@saasmaker.co",
    image: "https://ui-avatars.com/api/?name=Sarah+Chen",
    looking_for: "TECHNICAL_COFOUNDER",
    description: "Ex-Google PM building AI-powered analytics tools. Looking for a technical co-founder with ML expertise.",
    role: "BUSINESS"
  },
  {
    name: "Alex Kumar",
    email: "alex@techlabs.dev",
    image: "https://ui-avatars.com/api/?name=Alex+Kumar",
    looking_for: "BUSINESS_COFOUNDER",
    description: "Full-stack developer with 8 years experience. Built and sold 2 SaaS products. Seeking business co-founder.",
    role: "TECHNICAL"
  },
  {
    name: "Maria Rodriguez",
    email: "maria@growthmetrics.io",
    image: "https://ui-avatars.com/api/?name=Maria+Rodriguez",
    looking_for: "TECHNICAL_COFOUNDER",
    description: "Growth marketing expert specializing in B2B SaaS. Previously led growth at Stripe.",
    role: "BUSINESS"
  },
  {
    name: "James Wilson",
    email: "james@cloudstack.dev",
    image: "https://ui-avatars.com/api/?name=James+Wilson",
    looking_for: "BUSINESS_COFOUNDER",
    description: "Backend engineer specializing in cloud infrastructure. Looking to build developer tools.",
    role: "TECHNICAL"
  },
  {
    name: "Lisa Park",
    email: "lisa@designsystems.co",
    image: "https://ui-avatars.com/api/?name=Lisa+Park",
    looking_for: "TECHNICAL_COFOUNDER",
    description: "Product designer with expertise in B2B SaaS. Worked with 20+ startups.",
    role: "BUSINESS"
  },
  {
    name: "Michael Zhang",
    email: "michael@aiplatform.dev",
    image: "https://ui-avatars.com/api/?name=Michael+Zhang",
    looking_for: "BUSINESS_COFOUNDER",
    description: "ML engineer with PhD in Computer Science. Built multiple AI products.",
    role: "TECHNICAL"
  },
  {
    name: "Emma Brown",
    email: "emma@saasventures.co",
    image: "https://ui-avatars.com/api/?name=Emma+Brown",
    looking_for: "TECHNICAL_COFOUNDER",
    description: "Serial entrepreneur with 2 successful exits. Focus on B2B enterprise software.",
    role: "BUSINESS"
  },
  {
    name: "David Kim",
    email: "david@devtools.io",
    image: "https://ui-avatars.com/api/?name=David+Kim",
    looking_for: "BUSINESS_COFOUNDER",
    description: "Senior engineer from AWS. Expert in cloud infrastructure and DevOps.",
    role: "TECHNICAL"
  }
];

async function seed() {
  console.log('🌱 Seeding database...');
  
  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: user,
      create: user,
    });
  }

  console.log('✅ Database seeded successfully!');
}

seed()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
