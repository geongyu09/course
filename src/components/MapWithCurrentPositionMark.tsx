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
  // map.setMapTypeId(naver.maps.MapTypeId.SATELLITE);

  return (
    <div className="h-screen w-screen overflow-hidden">
      <div>
        <textarea className="w-72 h-full" value={JSON.stringify(path)} />
        <button
          className="bg-blue-500 text-white p-2 rounded"
          onClick={() => {
            const newPath = [...path];
            newPath.pop();
            setPath(newPath);
          }}
        >
          뒤로 가기
        </button>

        <button
          className="bg-blue-500 text-white p-2 rounded"
          onClick={() => {
            if (!map) return;
            if (map.getMapTypeId() !== naver.maps.MapTypeId.SATELLITE) {
              map.setMapTypeId(naver.maps.MapTypeId.SATELLITE);
              console.log("지도 타입을 위성으로 변경");
            }
          }}
        >
          위성 지도
        </button>
        <button
          className="bg-blue-500 text-white p-2 rounded"
          onClick={() => {
            if (!map) return;
            if (map.getMapTypeId() !== naver.maps.MapTypeId.NORMAL) {
              map.setMapTypeId(naver.maps.MapTypeId.NORMAL);
              console.log("지도 타입을 일반으로 변경");
            }
          }}
        >
          일반 지도
        </button>
      </div>
      <div id={mapId} className="h-full w-full" />
    </div>
  );
}
