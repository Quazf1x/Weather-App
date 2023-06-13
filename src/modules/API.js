import { toggleErrorMsg } from "./UI";

export async function makeApiRequest(location) {
  const webAdress = `https://api.weatherapi.com/v1/forecast.json?key=ae751ff030e747b09c952501230506&days=14&q=${location}`;
  try {
    const request = await fetch(webAdress, { mode: "cors" });
    if (!request.ok) throw new Error("City not found.");

    const data = await request.json();
    return data;
  } catch (err) {
    toggleErrorMsg();
  }
}
