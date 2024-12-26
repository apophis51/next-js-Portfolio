
export const web_dev_plans = {
  productName: "WebDev Plans",
  pricingType: "subscription",
  product: [{
    showHeroContent: true,
    title: "Weekly Plan",
    price: 3_000,
    item: "price_1P5MU7CBn6LU6bJVwmNbGMDc",
    billing: "/week",
    features: [
      { name: "Includes Prisma, Next.js, TailwindCSS, TypeScript & Strapi CMS support" },
      { name: "40 Hours of Dev Time Per Week" },
      { name: "SEO Optimization and Strategy" }
    ],
    crossOutFeatures: [
      { name: "Save 20% on annual billing" },
      { name: "BYOS - Chose Your Stack" },
      { name: "Dedicated Developer Support" },
    ],
    meta: {
      get productName(): string {
        return ai_article_generator.productName;
      },
      exipire: 7,
      credits: 40
    }
  },
  {
    title: "Monthly Plan - Popular",
    price: 10_000,
    item: "price_1P5LByCBn6LU6bJVQq9IZUZo",
    billing: "/month",
    features: [
      { name: "Dedicated Developer Support" },
      { name: "Includes Prisma, Next.js, TailwindCSS, TypeScript & Strapi CMS support" },
      { name: "40 Hours of Dev Time Per Week" },
      { name: "SEO Optimization and Strategy" }

    ],
    crossOutFeatures: [
      { name: "Save 20% on annual billing" },
      { name: "BYOS - Chose Your Stack" },
    ],
    meta: {
      get productName(): string {
        return ai_article_generator.productName;
      },
      exipire: 30,
      credits: 160
    }
  },
  {
    title: "Yearly Plan - Best Value",
    price: 96_000,
    item: "price_1P5MVSCBn6LU6bJVs6P0VATr",
    billing: "/year",
    features: [
      { name: "Dedicated Developer Support" },
      { name: "Includes Prisma, Next.js, TailwindCSS, TypeScript & Strapi CMS support" },
      { name: "40 Hours of Dev Time Per Week" },
      { name: "SEO Optimization and Strategy" },
      { name: "Save 20% on annual billing" },
      { name: "BYOS - Chose Your Stack" },
    ],
    crossOutFeatures: [
    ],
    meta: {
      get productName(): string {
        return ai_article_generator.productName;
      },
      exipire: 365,
      credits: 2240
    }
  }
  ]

}


export const ai_article_generator = {
  originPath: "/Web-Apps/ai-article-generator",
  productName: "AI Article Generator",
  pricingType: "payment",
  product: [{
    title: "2000 Credits",
    price: 20,
    item: "price_1QWZNcCBn6LU6bJVtjqRDpvd",
    billing: "/month",
    features: [
      { name: "2000 credits" },
    ],
    crossOutFeatures: [
    ],
    meta: {
      get productName(): string {
        return ai_article_generator.productName;
      },
      exipire: 30,
      credits: 2000
    }
  },
  {
    title: "3000 Credits - Best Value",
    price: 30,
    item: "price_1QWZO0CBn6LU6bJVPZMchd7n",
    billing: "/month",
    features: [
      { name: "3000 credits" },
    ],
    crossOutFeatures: [
    ],
    meta: {
      get productName(): string {
        return ai_article_generator.productName;
      },
      exipire: 30,
      credits: 3000
    }
  },
  {
    title: "1000 Credits - Popular",
    price: 10,
    item: "price_1QWZMmCBn6LU6bJVhwzHN7Rf",
    billing: "/month",
    features: [
      { name: "1000 credits" },
    ],
    crossOutFeatures: [
    ],
    meta: {
      get productName(): string {
        return ai_article_generator.productName;
      },
      exipire: 10,
      credits: 1000
    }
  }
  ]
}

export const girlfriend_ai_chat = {
  originPath: "",
  link: "https://buy.stripe.com/",
  productName: "Girlfriend AI Chat",
  pricingType: "subscription",
  product: [{
    title: "Weekly Plan",
    price: 20,
    item: "eVag1y6Qg5wm79CeUW",
    billing: "/week",
    features: [
      { name: "100 chats" },
    ],
    crossOutFeatures: [
    ]
  },
  {
    title: "Monthly Plan - Popular",
    price: 30,
    item: "5kA4iQ0rS1g679C003",
    billing: "/month",
    features: [
      { name: "500 chats" },
    ],
    crossOutFeatures: [
    ]
  },
  {
    title: "Yearly Plan - Best Value",
    price: 100,
    item: "7sI4iQ5Mc1g60LeaEI",
    billing: "/year",
    features: [
      { name: "2000 chats" },
    ],
    crossOutFeatures: [
    ]
  }
  ] }