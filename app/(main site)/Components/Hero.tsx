// This Module was inspired by https://daisyui.com/components/hero/




async function getData2() {
  const res = await fetch(`https://malcmind-strapi-cms-production.up.railway.app/api/landing-pages?populate=*`)
  // const res = await fetch(`https://malcmind-strapi-cms-production.up.railway.app/api/landing-pages?pagination[page]=1&pagination[pageSize]=60`)
  console.log(res)
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}


//The props.contentNeeded is the title of the blog post thats on strappi

export default async function Hero({ contentNeeded, buttonLink }: { contentNeeded: string, buttonLink?: string }) {
  const HeaderContent = await getData2()
  const MainText = HeaderContent.data.filter((item: any) => item.attributes.Title == contentNeeded)[0].attributes.headerContent
  console.log(MainText)
  let Image = ''
  try {
    Image = HeaderContent.data.filter((item: any) => item.attributes.Title == contentNeeded)[0].attributes.LandingPageImage.data.attributes.formats.large.url
    console.log(Image)
  }
  catch {
    Image = HeaderContent.data.filter((item: any) => item.attributes.Title == contentNeeded)[0].attributes.LandingPageImage.data.attributes.url
    console.log(Image)
  }
  const buttonText = HeaderContent.data.filter((item: any) => item.attributes.Title == contentNeeded)[0].attributes.ButtonText
  return (
    <div className="hero min-h-screen shadow-[0px_0px_10px_3px_rgba(255,255,255,0.5)] mt-4" style={{ backgroundImage: `url(${Image})` }}>
      <div className="hero-overlay bg-opacity-90"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-4xl md:text-5xl font-bold animate_text_div">{contentNeeded}</h1>
          <p className="mb-5">{MainText} </p>
          <a href={`#${buttonLink}`}><button className="btn btn-primary">{buttonText}</button></a>
        </div>
      </div>
    </div>
  )
}
