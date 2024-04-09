
'use client'

export default function PurchaseMenu() {

    async function handleClick() {
        console.log('Button clicked');

        const response = await fetch('/api/checkout_sessions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
          console.log(response)
    }

    return (
        <div>
                <div className="text-4xl text-center border-solid border-2 border-indigo-600 m-[150px] bg-white">
                    <br />
                    <br />
                    <p className="">My Services Will Soon Be available for Purchase Via a Stripe Integration, Check back soon</p>
                    <form action="/api/checkout_sessions" method="POST">
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

