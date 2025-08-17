"use client";

import { useNaverMap } from "@/hooks/useNavermap";
import { useDrawPolyline } from "@/hooks/useDrawPolyline";
import { useState } from "react";

const defaultPosition = { latitude: 35.122769, longitude: 126.996822 };

const defaultPathText = `[
  [126.95589685, 35.13408406],
  [126.95744761, 35.13354734],
  [126.95768452, 35.13345813],
  [126.9577291, 35.13344179]
]`;

const Page = () => {
  const [pathText, setPathText] = useState(defaultPathText);
  const [path, setPath] = useState<[number, number][]>([]);
  const [error, setError] = useState<string>("");

  const { mapId, map } = useNaverMap(defaultPosition);
  
  useDrawPolyline({ map, path });

  const handlePathSubmit = () => {
    try {
      setError("");
      const parsedPath = JSON.parse(pathText);
      
      if (!Array.isArray(parsedPath)) {
        throw new Error("배열 형태가 아닙니다.");
      }
      
      const validPath = parsedPath.map((coord, index) => {
        if (!Array.isArray(coord) || coord.length !== 2) {
          throw new Error(`${index + 1}번째 좌표가 올바르지 않습니다. [경도, 위도] 형태여야 합니다.`);
        }
        
        const [lng, lat] = coord;
        if (typeof lng !== 'number' || typeof lat !== 'number') {
          throw new Error(`${index + 1}번째 좌표의 값이 숫자가 아닙니다.`);
        }
        
        if (lng < -180 || lng > 180 || lat < -90 || lat > 90) {
          throw new Error(`${index + 1}번째 좌표가 유효한 범위를 벗어났습니다.`);
        }
        
        return [lng, lat] as [number, number];
      });
      
      if (validPath.length < 2) {
        throw new Error("경로를 그리려면 최소 2개의 좌표가 필요합니다.");
      }
      
      setPath(validPath);
    } catch (e) {
      setError(e instanceof Error ? e.message : "알 수 없는 오류가 발생했습니다.");
    }
  };

  const handleClear = () => {
    setPath([]);
    setError("");
  };

  return (
    <div className="h-screen flex">
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">경로 표시</h1>
          <p className="text-sm text-gray-600 mt-1">
            좌표 배열을 입력하여 지도에 경로를 표시합니다
          </p>
        </div>
        
        <div className="flex-1 p-4 flex flex-col">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            좌표 배열 (JSON 형태)
          </label>
          <textarea
            value={pathText}
            onChange={(e) => setPathText(e.target.value)}
            className="flex-1 p-3 border border-gray-300 rounded-md text-sm font-mono resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="[[경도, 위도], [경도, 위도], ...]"
          />
          
          {error && (
            <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-600">
              {error}
            </div>
          )}
          
          <div className="mt-4 space-y-2">
            <button
              onClick={handlePathSubmit}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              경로 그리기
            </button>
            <button
              onClick={handleClear}
              className="w-full bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
            >
              지우기
            </button>
          </div>
          
          {path.length > 0 && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
              <p className="text-sm text-green-700">
                ✓ {path.length}개의 좌표로 경로가 표시되었습니다.
              </p>
            </div>
          )}
        </div>
        
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <h3 className="text-sm font-medium text-gray-700 mb-2">사용 예시:</h3>
          <code className="text-xs text-gray-600 bg-gray-100 p-2 rounded block">
            {`[
  [126.956, 35.134],
  [126.957, 35.133]
]`}
          </code>
        </div>
      </div>
      
      <div className="flex-1 relative">
        <div id={mapId} className="h-full w-full" />
      </div>
    </div>
  );
};

export default Page;
