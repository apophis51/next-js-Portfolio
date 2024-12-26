

export const web_dev_plans = [{
  productName: "WebDev Plans",
  showHeroContent: true,
  title: "Weekly Plan",
  price: 3_000,
  item: "price_1P5MU7CBn6LU6bJVwmNbGMDc",
  billing: "/week",
  features: [
    { name: "Includes Prisma, Next.js, TailwindCSS, TypeScript & Strapi CMS support" },
    { name: "40 Hours of Dev Time Per Week" },
    { name: "SEO Optimization and Strategy"}
  ],
  crossOutFeatures: [
    { name: "Save 20% on annual billing" },
    { name: "BYOS - Chose Your Stack" },
    { name: "Dedicated Developer Support" },
  ],
  meta: {
    productName: () => this.productName,
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
    { name: "SEO Optimization and Strategy"}

  ],
  crossOutFeatures: [
    { name: "Save 20% on annual billing" },
    { name: "BYOS - Chose Your Stack" },
  ],
  meta: {
    productName: () => this.productName,
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
    { name: "SEO Optimization and Strategy"},
    { name: "Save 20% on annual billing" },
    { name: "BYOS - Chose Your Stack" },
  ],
  crossOutFeatures: [
  ],
  meta: {
    productName: () => this.productName,
    exipire: 365,
    credits: 2240
}
}
]

