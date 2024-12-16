

import PriceCard from '@/app/(main site)/Components/PriceCard'
import Container from '@mui/material/Container';
import ContactForm from '@/app/(main site)/Components/ContactForm'

let priceCardData = [{
  title: "2000 Credits",
  price: 20,
  item: "price_1QWZNcCBn6LU6bJVtjqRDpvd",
  billing: "/month",
  features: [
    { name: "2000 credits" },
  ],
  crossOutFeatures: [
  ]
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
  ]
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
  ]
}
]

export default function PurchaseMenu() {
    return (
      <Container maxWidth="xl"  >
        <div className = ' bg-gradient-to-tr from-purple-600 to-blue-900 mt-5'>          
                <PriceCard priceCardData={priceCardData} subscriptionMode={'payment'}/>
        </div>
        <ContactForm/>
        </Container>
    );
}

