import { APP_ENTRYPOINT } from "../config";

export function getOutletNearby(lat,log) {
  return fetch(`${APP_ENTRYPOINT}/api/getOutletNearby/${log}/${lat}
`)
    .then(data => data.json())
}