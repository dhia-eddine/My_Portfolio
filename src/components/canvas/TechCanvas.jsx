/* eslint-disable react/prop-types */
import { Canvas } from "@react-three/fiber";
import { Preload, Suspense } from "react";
import { Ball } from "./Ball";
import CanvasLoader from "../Loader";

const COLS = 5;
const SPACING = 2.4;
const BALL_SCALE = 0.32;

function TechBallsScene({ technologies }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 10]} intensity={0.8} />
      {technologies.map((tech, i) => {
        const col = i % COLS;
        const row = Math.floor(i / COLS);
        const x = col * SPACING - (COLS - 1) * (SPACING / 2);
        const y = -row * SPACING + (Math.ceil(technologies.length / COLS) - 1) * (SPACING / 2);
        const iconUrl = tech.icon && typeof tech.icon === "string" ? tech.icon : null;
        if (!iconUrl) return null;
        return (
          <group key={tech.name} position={[x, y, 0]} scale={[BALL_SCALE, BALL_SCALE, BALL_SCALE]}>
            <Ball imgUrl={iconUrl} />
          </group>
        );
      })}
    </>
  );
}

function TechCanvas({ technologies }) {
  return (
    <Canvas
      frameloop="always"
      gl={{ preserveDrawingBuffer: true, alpha: true }}
      camera={{ position: [0, 0, 12], fov: 45 }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <TechBallsScene technologies={technologies} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
}

export default TechCanvas;
