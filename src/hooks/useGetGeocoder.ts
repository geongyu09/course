import { useEffect, useState } from "react";

export const useGetGeocoder = (
  map: naver.maps.Map,
  setPath: React.Dispatch<React.SetStateAction<[number, number][]>>
) => {
  const [latLong, setLatLong] = useState<[number, number] | null>(null);
  useEffect(() => {
    if (!map) return;
    map.addListener("click", (e: naver.maps.MapMouseEvent) => {
      const latlng = e.coord
        .toString()
        .replace("(lat:", "")
        .replace("lng:", "")
        .replace(")", "")
        .split(",");
      setLatLong([parseFloat(latlng[1]), parseFloat(latlng[0])]);
    });
  }, [map]);

  useEffect(() => {
    if (latLong) {
      setPath((prevPath) => [...prevPath, latLong]);
    }
  }, [latLong, setPath]);

  return latLong;
};
