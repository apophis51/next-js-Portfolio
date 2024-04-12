
'use client'

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
        <div>
                <div className="text-4xl text-center border-solid border-2 border-indigo-600 m-[150px] bg-white">
                    <br />
                    <br />
                    <p className="">My Services Will Soon Be available for Purchase Via a Stripe Integration, Check back soon</p>
                    {/* <form action="/api/checkout_sessions" method="POST"> */}
                    <form action="/PurchaseMenu/checkoutroute" method="POST">

      <section>
        <button type="submit" role="link" className='btn'>
          Checkout
        </button>
      </section>
     
    </form>
                    <br />
                    <br />
                   
                </div>
        </div>
    );
}

