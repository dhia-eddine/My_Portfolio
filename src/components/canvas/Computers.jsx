/* eslint-disable react/prop-types -- isMobile/onLoaded from parent */
/* eslint-disable react/no-unknown-property -- R3F/Three.js primitives */
import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

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
      <hemisphereLight intensity={0.15} groundColor="black" />
      <pointLight intensity={1} />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.68 : 0.8}
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
      frameloop="always"
      shadows
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          target={[0, 0, 0]}
        />
        <Computers isMobile={isMobile} onLoaded={onLoaded} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
