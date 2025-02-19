import { prisma } from "./auth";

type PostType = 'GENERAL' | 'MILESTONE' | 'QUESTION' | 'INSIGHT' | 'SHOWCASE' | 'METRICS' | 'HIRING' | 'EVENT';

const postTemplates: Record<PostType, string[]> = {
  GENERAL: [
    "Working on optimizing our onboarding flow. Any tips on reducing friction while maintaining necessary data collection?",
    "Just implemented Stripe for our payment processing. The documentation is amazing! 💳",
    "Thoughts on using Next.js vs traditional React for a B2B SaaS dashboard?",
    "Starting my journey in SaaS. Currently validating ideas in the project management space.",
    "What's your tech stack for handling real-time notifications in your SaaS?"
  ],
  MILESTONE: [
    "🎉 Huge milestone: Hit our first $1K MRR! Thanks to everyone who supported us.",
    "🚀 Just launched our beta! After 6 months of development, we're finally live.",
    "🎯 Reached 100 paying customers! The journey from 0 to 100 taught us so much.",
    "🤝 Closed our seed round! $500K to fuel our growth.",
    "📈 Crossed $10K MRR! Team is growing and we're hiring."
  ],
  QUESTION: [
    "How do you handle feature requests from enterprise clients without derailing your product roadmap?",
    "What's your strategy for reducing churn in the first 30 days?",
    "Looking for recommendations on good customer success tools for a growing SaaS.",
    "How do you structure your pricing tiers? Struggling with this decision.",
    "Best practices for implementing usage-based billing?"
  ],
  INSIGHT: [
    "Learned that focusing on one core feature and doing it exceptionally well beats having multiple mediocre features.",
    "Key insight: Enterprise sales cycles are much longer than we anticipated. Plan your runway accordingly.",
    "Found that personalized onboarding sessions increased our activation rate by 40%.",
    "A/B testing showed that longer trial periods don't necessarily lead to better conversion rates.",
    "Data shows our most successful customers use these three features consistently..."
  ],
  SHOWCASE: [
    "Just shipped our new analytics dashboard! Check out these beautiful visualizations...",
    "Redesigned our landing page with a focus on social proof. Conversion up by 25%!",
    "New feature alert: Now supporting custom workflows with our API.",
    "Launched our public API with comprehensive documentation.",
    "Introducing dark mode! Our most requested feature is now live."
  ],
  METRICS: [
    "Monthly metrics update: 15% MoM growth, 3% churn, 110% net revenue retention.",
    "Q1 Results: $50K ARR, 250 active users, 98% uptime.",
    "Growth metrics: CAC down 20%, LTV up 35% this quarter.",
    "Infrastructure costs optimization resulted in 40% reduction in per-user cost.",
    "Customer satisfaction score reached 9.2/10 this month."
  ],
  HIRING: [
    "Looking for a senior full-stack developer with Node.js and React experience.",
    "Hiring our first customer success manager! Remote-friendly.",
    "Seeking a growth marketer who understands B2B SaaS metrics.",
    "Opening up a DevOps position as we scale our infrastructure.",
    "Looking for a product designer with B2B SaaS experience."
  ],
  EVENT: [
    "Hosting a webinar next week on 'Building Scalable SaaS Architecture'.",
    "Join us at SaaStr Annual! We'll be at booth 42.",
    "Virtual office hours this Friday - come chat about your SaaS challenges.",
    "Organizing a local SaaS founders meetup in San Francisco.",
    "Live demo session of our new features this Thursday."
  ]
};

const users = [
  {
    name: "John Developer",
    email: "john@example.com",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    role: "TECHNICAL",
    field: "Development",
    lookingFor: "BUSINESS_COFOUNDER",
    bio: "Full-stack developer with 5 years of experience",
    experience: "5+ years in full-stack development, specializing in React and Node.js",
    interests: "Cloud computing, AI/ML, Developer tooling",
    goals: "Building scalable SaaS solutions that solve real problems"
  },
  {
    name: "Sarah Investor",
    email: "sarah@example.com",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    role: "BUSINESS",
    field: "Investment",
    lookingFor: "TECHNICAL_COFOUNDER",
    bio: "Angel investor looking for promising tech startups",
    experience: "10+ investments in early-stage startups, 3 successful exits",
    interests: "B2B SaaS, AI/ML startups, Enterprise software",
    goals: "Investing in and mentoring the next generation of tech founders"
  },
  {
    name: "Mike Designer",
    email: "mike@example.com",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
    role: "TECHNICAL",
    field: "Design",
    lookingFor: "BUSINESS_COFOUNDER",
    bio: "UI/UX designer passionate about creating beautiful interfaces",
    experience: "Led design at multiple startups, created design systems from scratch",
    interests: "User experience, Design systems, Product design",
    goals: "Creating intuitive and delightful user experiences"
  },
  {
    name: "Lisa Marketer",
    email: "lisa@example.com",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=lisa",
    role: "BUSINESS",
    field: "Marketing",
    lookingFor: "TECHNICAL_COFOUNDER",
    bio: "Digital marketing expert with focus on SaaS",
    experience: "7 years in SaaS marketing, specializing in B2B growth",
    interests: "Growth marketing, Content strategy, Marketing automation",
    goals: "Building a marketing platform for SaaS companies"
  },
  {
    name: "David Product",
    email: "david@example.com",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
    role: "BUSINESS",
    field: "Product",
    lookingFor: "TECHNICAL_COFOUNDER",
    bio: "Product manager with experience in B2B SaaS",
    experience: "Product manager at Salesforce, launched multiple enterprise products",
    interests: "Product strategy, User research, Market analysis",
    goals: "Creating innovative solutions for enterprise customers"
  },
  {
    name: "Emma Developer",
    email: "emma@example.com",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
    role: "TECHNICAL",
    field: "Development",
    lookingFor: "BUSINESS_COFOUNDER",
    bio: "Backend developer specializing in scalable systems",
    experience: "Built high-scale systems at AWS, expert in distributed systems",
    interests: "System architecture, Cloud infrastructure, Performance optimization",
    goals: "Building the next generation of cloud infrastructure tools"
  },
  {
    name: "Alex Investor",
    email: "alex@example.com",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
    role: "BUSINESS",
    field: "Investment",
    lookingFor: "TECHNICAL_COFOUNDER",
    bio: "VC investor focusing on early-stage startups",
    experience: "Partner at a leading VC firm, previously founded and sold a startup",
    interests: "Deep tech, Enterprise SaaS, Developer tools",
    goals: "Identifying and supporting promising technical founders"
  },
  {
    name: "Rachel Designer",
    email: "rachel@example.com",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=rachel",
    role: "TECHNICAL",
    field: "Design",
    lookingFor: "BUSINESS_COFOUNDER",
    bio: "Product designer with a focus on user experience",
    experience: "Senior designer at Figma, created design systems for multiple startups",
    interests: "Design systems, Interaction design, User research",
    goals: "Building design tools that empower creators"
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
    
    // Generate random post type with weighted distribution
    const postTypeWeights = {
      GENERAL: 0.3,    // 30% chance
      MILESTONE: 0.1,  // 10% chance
      QUESTION: 0.15,  // 15% chance
      INSIGHT: 0.15,   // 15% chance
      SHOWCASE: 0.1,   // 10% chance
      METRICS: 0.1,    // 10% chance
      HIRING: 0.05,    // 5% chance
      EVENT: 0.05      // 5% chance
    };

    const randomType = weightedRandom(postTypeWeights);
    
    // Get a random post content based on the type
    const posts = postTemplates[randomType];
    const randomPost = posts[Math.floor(Math.random() * posts.length)];
    
    // Generate appropriate milestone if post type is MILESTONE
    let milestone = null;
    if (randomType === 'MILESTONE') {
      const milestoneMap = {
        'first $1K MRR': 'FIRST_1K_MRR',
        'beta': 'LAUNCH',
        '100 paying customers': 'FIRST_SALE',
        'seed round': 'FUNDING',
        '$10K MRR': 'FIRST_10K_MRR'
      };
      
      // Find the milestone from the post content
      for (const [key, value] of Object.entries(milestoneMap)) {
        if (randomPost.toLowerCase().includes(key.toLowerCase())) {
          milestone = value;
          break;
        }
      }
    }
    
    // Generate relevant tags based on post content and type
    const tagPool: Record<PostType, string[]> = {
      GENERAL: ['#development', '#tech', '#startup'],
      MILESTONE: ['#milestone', '#growth', '#success'],
      QUESTION: ['#help', '#advice', '#discussion'],
      INSIGHT: ['#learning', '#experience', '#tips'],
      SHOWCASE: ['#product', '#launch', '#feature'],
      METRICS: ['#data', '#growth', '#metrics'],
      HIRING: ['#jobs', '#hiring', '#team'],
      EVENT: ['#event', '#meetup', '#networking']
    };
    
    const baseTags = ['#saas', '#startup'];
    const typeTags = tagPool[randomType];
    const randomTypeTags = typeTags.sort(() => 0.5 - Math.random()).slice(0, 2);
    const tags = [...baseTags, ...randomTypeTags];

    // Generate realistic metrics if it's a metrics post
    const metrics = randomType === 'METRICS' ? generateRealisticMetrics() : null;

    await prisma.post.create({
      data: {
        content: randomPost,
        type: randomType as any,
        milestone: milestone as any,
        metrics: metrics,
        tags: tags,
        visibility: 'PUBLIC' as const,
        author: {
          connect: {
            id: randomUser.id
          }
        }
      }
    });
  }
}

// Helper function for weighted random selection
function weightedRandom(weights: Record<PostType, number>): PostType {
  const entries = Object.entries(weights) as [PostType, number][];
  const total = entries.reduce((sum, [_, weight]) => sum + weight, 0);
  let random = Math.random() * total;
  
  for (const [item, weight] of entries) {
    random -= weight;
    if (random <= 0) return item;
  }
  
  return entries[0][0];
}

// Helper function to generate realistic metrics
function generateRealisticMetrics() {
  const baseMetrics = {
    mrr: Math.floor(Math.random() * 50000) + 1000, // $1K to $51K
    users: Math.floor(Math.random() * 1000) + 50,   // 50 to 1050
    churn: (Math.random() * 8 + 2).toFixed(1),      // 2% to 10%
    growth: (Math.random() * 25 + 5).toFixed(1),    // 5% to 30%
    cac: Math.floor(Math.random() * 300) + 50,      // $50 to $350
    ltv: Math.floor(Math.random() * 2000) + 500,    // $500 to $2500
  };

  // Add some derived metrics
  return {
    ...baseMetrics,
    arpu: (baseMetrics.mrr / baseMetrics.users).toFixed(2),
    ltv_cac_ratio: (baseMetrics.ltv / baseMetrics.cac).toFixed(2)
  };
}

export default main
