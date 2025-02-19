const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

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

const users = [
  {
    name: "John Developer",
    email: "john@example.com",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    role: "Developer",
    lookingFor: "Investor",
    bio: "Full-stack developer with 5 years of experience",
  },
  {
    name: "Sarah Investor",
    email: "sarah@example.com",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    role: "Investor",
    lookingFor: "Developer",
    bio: "Angel investor looking for promising tech startups",
  },
  {
    name: "Mike Designer",
    email: "mike@example.com",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
    role: "Designer",
    lookingFor: "Developer",
    bio: "UI/UX designer passionate about creating beautiful interfaces",
  },
  {
    name: "Lisa Marketer",
    email: "lisa@example.com",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa",
    role: "Marketer",
    lookingFor: "Investor",
    bio: "Digital marketing expert with focus on SaaS",
  },
  {
    name: "David Product",
    email: "david@example.com",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
    role: "Product Manager",
    lookingFor: "Designer",
    bio: "Product manager with experience in B2B SaaS",
  },
  {
    name: "Emma Developer",
    email: "emma@example.com",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
    role: "Developer",
    lookingFor: "Designer",
    bio: "Backend developer specializing in scalable systems",
  },
  {
    name: "Alex Investor",
    email: "alex@example.com",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
    role: "Investor",
    lookingFor: "Developer",
    bio: "VC investor focusing on early-stage startups",
  },
  {
    name: "Rachel Designer",
    email: "rachel@example.com",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=rachel",
    role: "Designer",
    lookingFor: "Product Manager",
    bio: "Product designer with a focus on user experience",
  },
];

async function main() {
  // Create users
  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
  }

  // Get all users
  const createdUsers = await prisma.user.findMany();

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

  console.log('Seeding completed!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
