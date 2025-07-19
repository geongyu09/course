import { useEffect } from "react";

type LatLongPath = [number, number][];

// 경로 표시 : [위도, 경도] 의 배열
export const useDrawPath = (map: any, path: LatLongPath) => {
  useEffect(() => {
    (async () => {
      const pathway = new naver.maps.Polyline({
        map,
        path,
        strokeWeight: 5,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeStyle: "solid",
        strokeLineCap: "round",
        strokeLineJoin: "round",
      });
      console.log(pathway);
    })();
  }, [map, path]);
};
