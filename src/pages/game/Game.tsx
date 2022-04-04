import React, { useEffect, useRef } from "react";

import Layout from "Components/Layout";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "Constants/game";
import { renderBoard, renderGrid } from "./utils";

export default function Game() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = ref.current?.getContext('2d');
    if (ctx) {
      renderBoard(ctx);
      renderGrid(ctx);
    }
  }, []);

  return (
    <Layout title={'Игра'}>
      <canvas ref={ref} width={CANVAS_WIDTH} height={CANVAS_HEIGHT}/>
    </Layout>
  );
}
