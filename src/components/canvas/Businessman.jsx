/* eslint-disable react/prop-types -- isMobile/onLoaded from parent */
/* eslint-disable react/no-unknown-property -- R3F/Three.js primitives */
import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";

function getModelUrl() {
  const base = (import.meta.env.BASE_URL || "/").replace(/\/$/, "") || "";
  const p = `${base}/businessman.glb`;
  return typeof window !== "undefined" ? `${window.location.origin}${p}` : p;
}

const modelUrl = getModelUrl();
if (typeof window !== "undefined" && modelUrl.startsWith("http")) {
  useGLTF.preload(modelUrl);
}

const Businessman = ({ isMobile, onLoaded }) => {
  const model = useGLTF(modelUrl);
  useEffect(() => {
    onLoaded?.();
  }, [model, onLoaded]);

  return (
    <group>
      <ambientLight intensity={0.5} />
      <hemisphereLight intensity={0.4} groundColor="#1a0a3b" />
      <directionalLight position={[-4, 4, 2]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-1, 3, 0]} intensity={0.8} color="#915eff" />
      <pointLight position={[-2, -1, -3]} intensity={0.4} color="#2563eb" />
      <primitive
        object={model.scene}
        scale={isMobile ? 3 : 2.5}
        position={isMobile ? [0, 0.2, 0] : [0, -0.5, 0]}
        rotation={[0, -Math.PI / 2, 0]}
      />
    </group>
  );
};

const BusinessmanCanvas = ({ onLoaded }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width:650px)");
    setIsMobile(mediaQuery.matches);
    const handleMediaQueryChange = (event) => setIsMobile(event.matches);
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () =>
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
  }, []);

  return (
    <Canvas
      frameloop="always"
      shadows
      camera={{ position: [0, 0, 6], fov: 35 }}
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
        <Businessman isMobile={isMobile} onLoaded={onLoaded} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default BusinessmanCanvas;
