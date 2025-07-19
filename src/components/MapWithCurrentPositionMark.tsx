"use client";

import { useDrawPath } from "@/hooks/useDrawmap";
import { useGetGeocoder } from "@/hooks/useGetGeocoder";
import { useNaverMap } from "@/hooks/useNavermap";
import { useState } from "react";

const defaultPosition = { latitude: 35.122769, longitude: 126.996822 };

export default function MapWithCurrentPositionMark() {
  const [path, setPath] = useState<[number, number][]>([]);

  console.log(path);

  const { mapId, map } = useNaverMap(defaultPosition);
  useDrawPath(map, path as [number, number][]);

  useGetGeocoder(map, setPath);

  return (
    <div>
      <div>
        <textarea className="w-72 h-full" value={JSON.stringify(path)} />
        <button
          onClick={() => {
            const newPath = [...path];
            newPath.pop();
            setPath(newPath);
          }}
        >
          뒤로 가기
        </button>
      </div>
      <div id={mapId} className="h-screen w-screen" />;
    </div>
  );
}
