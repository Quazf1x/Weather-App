export async function makeApiRequest(location) {
  const request = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=ae751ff030e747b09c952501230506&days=14&q=${location}`,{
    mode: 'cors'
  });
  let data = await request.json();
   console.log(data);
  return data; 
}