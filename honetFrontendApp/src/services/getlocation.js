export function getlocation(address) {
  return fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYW5hbmR1OTciLCJhIjoiY2twdGczMzNmMGZ4bTJvbzExMnFmend0ayJ9.mEx20P53nwN-mihZjlm_bg
`)
    .then(data => data.json())
}