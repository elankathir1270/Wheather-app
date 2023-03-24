import { wheatherApi } from "../services/wheatherAPI";

export const wheatherCall = (location) => {
  const isPosition = typeof location === "object";

  return wheatherApi
    .get("/current.json", {
      params: {
        q: isPosition
          ? `${location.coords.latitude},${location.coords.longitude}`
          : location,
      },
    })
    .then((res) => {
      const d = res.data;
      return {
        temp_c: d?.current?.temp_c,
        location_name: d?.location?.name,
        last_updated: d?.current?.last_updated,
        wind_kph: d?.current?.wind_kph,
        humidity: d?.current?.humidity,
        cloud: d?.current?.cloud,
        condition: d?.current?.condition?.text,
      };
    })
    .catch((e) => {
      console.log("e", e.message);
      return null;
    });
};
