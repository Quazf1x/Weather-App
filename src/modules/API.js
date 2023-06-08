
export async function makeApiRequest() {
  const request = await fetch('https://api.weatherapi.com/v1/forecast.json?key=ae751ff030e747b09c952501230506&days=14&q=Omsk',{
    mode: 'cors'
  });
  let data = await request.json();
  console.log(data)
  return data; 
}