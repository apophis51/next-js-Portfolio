

import PriceCard from './PriceCard'
import Container from '@mui/material/Container';
import ContactForm from '@/app/(main site)/Components/ContactForm'

let priceCardData = [{
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
        {/* <Hero contentNeeded={'WebDev Plans'} buttonLink='availablePlans'/> */}
        <div className = ' bg-gradient-to-tr from-purple-600 to-blue-900 mt-5'>
              
                <PriceCard priceCardData={priceCardData}/>
        </div>
        <ContactForm/>
        </Container>
    );
}

