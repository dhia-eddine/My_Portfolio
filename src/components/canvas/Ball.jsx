import {
  Decal,
  Float,
  OrbitControls,
  Preload,
  useTexture,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import CanvasLoader from "../Loader";
import { AmbientLight } from "three";

const Ball = (props) => {
  const [decal] = useTexture([props.imgUrl]);
  return (
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 3]} />
        <meshStandardMaterial color={"#fff8eb"}></meshStandardMaterial>
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          map={decal}
        />
        {/*front*/}
        <Decal
          position={[0, 0, -1.1]}
          rotation={[0, 3, 6.25]}
          map={decal}
        />{" "}
        {/*back*/}
        <Decal position={[0, 1, 0]} rotation={[1.5, 3, 3]} map={decal} />
        {/*top*/}
        <Decal position={[0, -1, 0]} rotation={[5, 3, 3]} map={decal} />{" "}
        {/*bottom*/}
        <Decal position={[0.6, 0, 0]} rotation={[0, 1, 6.25]} map={decal} />
        {/*right*/}
        <Decal
          position={[-0.6, 0, 0]}
          rotation={[0, 5, 6.25]}
          map={decal}
        />{" "}
        {/*left*/}
      </mesh>
    </Float>
  );
};

const BallCanvas = ({ icon }) => {
  return (
    <Canvas frameloop="demand" gl={{ preserveDrawingBuffer: true }}>
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls enableZoom={false} />
        <Ball imgUrl={icon} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};
export default BallCanvas;
