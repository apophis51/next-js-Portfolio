"use server"

import PriceCard from '@/app/(main site)/Components/PriceCard'
import Container from '@mui/material/Container';
import Hero from '@/app/(main site)/Components/Hero'
import ContactForm from '@/app/(main site)/Components/ContactForm'
import * as products from '@/app/(main site)/PurchaseMenu/[products]/products'
import { getUserID } from "@/app/services/userServices"


export default async function PurchaseMenu({
  params,
}: {
  params: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const param = (await params).products
    const product = param!.replace(/-/g, '_')
    const priceCardJson = products[product]
    const priceCardData = priceCardJson.product
    const subscriptionType = priceCardJson.pricingType
    const originPath = priceCardJson.originPath
    const buyLink = priceCardJson.link
    const userID = await getUserID()
    return (
      <Container maxWidth="xl"  >
        {priceCardData[0].showHeroContent && <Hero contentNeeded={'WebDev Plans'} buttonLink='availablePlans'/>}
        <div className = ' bg-gradient-to-tr from-purple-600 to-blue-900 mt-5'>
                <PriceCard priceCardData={priceCardData} subscriptionMode={subscriptionType} userID={userID} originPath={originPath} link={buyLink} />
        </div>
        <ContactForm/>
        </Container>
    );
}

