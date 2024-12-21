

import PriceCard from '@/app/(main site)/Components/PriceCard'
import Container from '@mui/material/Container';
import Hero from '@/app/(main site)/Components/Hero'
import ContactForm from '@/app/(main site)/Components/ContactForm'

let productName = "WebDev Plans"
let priceCardData = [{
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
    productName: productName,
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
    productName: productName,
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
    productName: productName,
    exipire: 365,
    credits: 2240
}
}
]

export default function PurchaseMenu() {
  // const handleCheckout = async () => {
  //   try {
  //     // Make a POST request using fetch
  //     const response = await fetch('/PurchaseMenu/checkoutroute', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json', // Specify the content type
  //       },
  //       // You can include any data you need to send in the body
  //       // body: JSON.stringify({ /* your data here */ }),
  //     });

  //     // Handle the response as needed
  //     if (response.ok) {
  //       // Redirect or perform any action upon successful response
  //       console.log('Checkout successful');
  //     } else {
  //       // Handle error cases
  //       console.error('Checkout failed');
  //     }
  //   } catch (error) {
  //     // Handle network errors or other issues
  //     console.error('Error:', error);
  //   }
  // };
    return (
      <Container maxWidth="xl"  >
        <Hero contentNeeded={'WebDev Plans'} buttonLink='availablePlans'/>
        <div className = ' bg-gradient-to-tr from-purple-600 to-blue-900 mt-5'>
              
                <PriceCard priceCardData={priceCardData}/>
        </div>
        <ContactForm/>
        </Container>
    );
}

