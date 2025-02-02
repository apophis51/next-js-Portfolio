export async function fetchCryptoData({
    // API facing function
    coinId = 'bitcoin',
    vsCurrency = 'usd',
    days = 'max',
    interval = 'daily',
    precision = 2,
  } = {}) {
    // for now, use the free API
    console.log('Fetching crypto data...');
    //const apiKey = "CG-SuWepRdcg5an1ayAiSKSCXFz";
    const baseUrl = "https://api.coingecko.com/api/v3";
    const endpoint = `/coins/${coinId}/market_chart`;
    // const fullUrl = `${baseUrl}${endpoint}?vs_currency=${vsCurrency}&days=${days}&interval=${interval}&precision=${precision}`; // &x_cg_demo_api_key=${apiKey}
    const fullUrl = `${baseUrl}${endpoint}?vs_currency=${vsCurrency}&days=${days}&interval=${interval}`; // &x_cg_demo_api_key=${apiKey}
  
    console.log(fullUrl)
    try {
      const response = (await fetch(fullUrl));
      const data = await response.json()
      // // const times = priceArray.map(item => new Date(item[0]).toISOString()); // Convert UNIX timestamps to ISO strings
      // const times = priceArray.map(item => item[0]); // Convert UNIX timestamps to ISO strings
      // const prices = priceArray.map(item => item[1]); // Extract prices
  
      // console.log(priceArray)
      if (!response.ok) {
        console.log('here')
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
      const priceArray = data.prices;
      console.log(priceArray)
      return {priceArray};
    } catch (error) {
      console.log('here')
      throw new Error(`Failed to fetch data: ${error.message}`);
    }
  }
  