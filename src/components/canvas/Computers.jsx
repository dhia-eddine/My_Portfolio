/* eslint-disable react/prop-types -- isMobile/onLoaded from parent */
/* eslint-disable react/no-unknown-property -- R3F/Three.js primitives */
import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

// BASE_URL is '/' in dev (public at root) and '/My_Portfolio/' in prod build
function getGltfUrl() {
  const base = (import.meta.env.BASE_URL || "/").replace(/\/$/, "") || "";
  const p = `${base}/desktop_pc/scene.gltf`;
  return typeof window !== "undefined" ? `${window.location.origin}${p}` : p;
}

const gltfUrl = getGltfUrl();
if (typeof window !== "undefined" && gltfUrl.startsWith("http")) {
  useGLTF.preload(gltfUrl);
}

const Computers = ({ isMobile, onLoaded }) => {
  const computer = useGLTF(gltfUrl);

  useEffect(() => {
    onLoaded?.();
  }, [computer, onLoaded]);

  return (
    <group>
      <ambientLight intensity={0.08} />
      <hemisphereLight intensity={0.28} groundColor="black" />
      <directionalLight position={[4, 6, 5]} intensity={0.62} />
      <spotLight
        position={[-8, 10, 6]}
        angle={0.24}
        penumbra={0.9}
        intensity={0.62}
        distance={70}
        decay={1.6}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight
        position={[7, 1.4, 2.2]}
        intensity={0.05}
        color="#7a5cff"
      />
      <pointLight
        position={[5.4, 1, 2.1]}
        intensity={0.5}
        distance={8}
        decay={2}
        color="#915eff"
      />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.75 : 0.8}
        position={isMobile ? [0, -1.92, 0] : [0.8, -3.35, 0]}
        rotation={[-0.01, Math.PI, -0.1]}
      />
    </group>
  );
};

const ComputersCanvas = ({ onLoaded }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width:650px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 1.5]}
      shadows={false}
      performance={{ min: 0.5 }}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          target={[0, 0, 0]}
        />
        <Computers isMobile={isMobile} onLoaded={onLoaded} />
      </Suspense>
    </Canvas>
  );
};

export default ComputersCanvas;
