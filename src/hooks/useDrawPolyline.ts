import { useEffect, useRef } from "react";

interface UseDrawPolylineProps {
  map: naver.maps.Map | null;
  path: [number, number][];
}

export const useDrawPolyline = ({ map, path }: UseDrawPolylineProps) => {
  const polylineRef = useRef<naver.maps.Polyline | null>(null);

  useEffect(() => {
    if (!map || !path || path.length < 2) {
      if (polylineRef.current) {
        polylineRef.current.setMap(null);
        polylineRef.current = null;
      }
      return;
    }

    if (polylineRef.current) {
      polylineRef.current.setMap(null);
    }

    const naverPath = path.map(([lng, lat]) => new naver.maps.LatLng(lat, lng));

    polylineRef.current = new naver.maps.Polyline({
      map,
      path: naverPath,
      strokeColor: "#FF0000",
      strokeWeight: 3,
      strokeOpacity: 0.8,
    });

    if (naverPath.length > 0) {
      const bounds = new naver.maps.LatLngBounds();
      naverPath.forEach(point => bounds.extend(point));
      map.fitBounds(bounds, { padding: 50 });
    }
  }, [map, path]);

  useEffect(() => {
    return () => {
      if (polylineRef.current) {
        polylineRef.current.setMap(null);
      }
    };
  }, []);

  return polylineRef.current;
};