"use client";

import { useDrawPath } from "@/hooks/useDrawmap";
import { useNaverMap } from "@/hooks/useNavermap";
import { useGetGeocoder } from "@/hooks/useGetGeocoder";
import { useEffect, useState } from "react";

const defaultPosition = { latitude: 35.122769, longitude: 126.996822 };

export default function MapWithCurrentPositionMark() {
  const [path, setPath] = useState<[number, number][]>([]);

  console.log(path);

  const { mapId, map } = useNaverMap(defaultPosition);
  useDrawPath(map, path as [number, number][]);

  const latlon = useGetGeocoder(map, setPath);

  return (
    <div>
      <textarea className="w-72 h-full" value={JSON.stringify(path)} />
      <div id={mapId} className="h-screen w-screen" />;
    </div>
  );
}
