"use client";

import MapWithCurrentPositionMark from "@/components/MapWithCurrentPositionMark";
import { useState } from "react";

export default function Home() {
  const [path, setPath] = useState("[]");
  return (
    <div>
      <MapWithCurrentPositionMark />
    </div>
  );
}
