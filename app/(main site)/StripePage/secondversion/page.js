'use client'
import React, { useState } from 'react';

function CheckoutButton() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = () => {
    setLoading(true);
    fetch('/api/checkout_sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // Add any additional headers if required
      },
      body: JSON.stringify({
        // Add any data you want to send in the request body
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Handle successful response here, if needed
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
      // Handle error here
    })
    .finally(() => {
      setLoading(false);
    });
  };

  return (
    <div className='bg-white'> <button onClick={handleCheckout} disabled={loading}>
      {loading ? 'Processing...' : 'Checkout'}
    </button></div>
   
  );
}

export default CheckoutButton;