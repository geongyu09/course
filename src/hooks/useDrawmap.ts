import { useEffect, useRef } from "react";

type LatLongPath = [number, number][];

// 경로 표시 : [위도, 경도] 의 배열
export const useDrawPath = (map: any, path: LatLongPath) => {
  const polylineRef = useRef<any>(null);

  useEffect(() => {
    if (!map) return;

    // 기존 폴리라인 제거
    if (polylineRef.current) {
      polylineRef.current.setMap(null);
      polylineRef.current = null;
    }

    // 새 폴리라인 생성
    if (path && path.length > 0) {
      polylineRef.current = new naver.maps.Polyline({
        map,
        path,
        strokeWeight: 5,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeStyle: "solid",
        strokeLineCap: "round",
        strokeLineJoin: "round",
      });
    }

    // 컴포넌트 언마운트 시 폴리라인 제거
    return () => {
      if (polylineRef.current) {
        polylineRef.current.setMap(null);
      }
    };
  }, [map, path]);
};
