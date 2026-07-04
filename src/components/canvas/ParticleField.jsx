/* eslint-disable react/no-unknown-property -- R3F/Three.js primitives */
/* eslint-disable react/prop-types -- internal scene props */
import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * A quiet, flowing dune of ~12k GPU particles rendered in a single draw call.
 * Simplex noise displaces the grid in the vertex shader; colors drift between
 * deep violet and pale lavender by elevation. The whole field tilts gently
 * toward the pointer. Designed as a horizon line under the hero typography.
 */

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uPixelRatio;
  uniform vec2 uMouse;

  attribute float aRandom;

  varying float vElevation;
  varying float vDistance;
  varying float vRandom;

  // Ashima 3D simplex noise
  vec4 permute(vec4 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 1.0/7.0;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vec3 pos = position;

    float t = uTime * 0.14;
    // Two octaves of drifting noise, nudged by the pointer
    float n1 = snoise(vec3(pos.x * 0.16 + t, pos.z * 0.16, t * 0.6));
    float n2 = snoise(vec3(pos.x * 0.45 - t * 0.7, pos.z * 0.45 + uMouse.x * 0.4, t));
    float elevation = n1 * 1.15 + n2 * 0.32;

    pos.y += elevation * (1.0 + uMouse.y * 0.25);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    vElevation = elevation;
    vDistance = length(pos.xz) / 14.0;
    vRandom = aRandom;

    float size = (1.4 + aRandom * 1.6) * uPixelRatio;
    // Slight sparkle on crests
    size *= 1.0 + smoothstep(0.6, 1.4, elevation) * 0.8;
    gl_PointSize = size * (8.0 / -mvPosition.z);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;

  varying float vElevation;
  varying float vDistance;
  varying float vRandom;

  void main() {
    // Round soft particle
    float d = length(gl_PointCoord - 0.5);
    float alpha = smoothstep(0.5, 0.12, d);

    // Fade the field edges into the page background
    alpha *= smoothstep(1.0, 0.45, vDistance);

    // Gentle twinkle
    alpha *= 0.55 + 0.45 * sin(uTime * (0.6 + vRandom) + vRandom * 40.0);

    vec3 deep   = vec3(0.18, 0.12, 0.38);
    vec3 violet = vec3(0.53, 0.34, 1.0);
    vec3 pale   = vec3(0.86, 0.82, 1.0);

    float m = smoothstep(-1.2, 1.4, vElevation);
    vec3 color = mix(deep, violet, m);
    color = mix(color, pale, smoothstep(0.75, 1.35, vElevation));

    gl_FragColor = vec4(color, alpha * 0.9);
  }
`;

function Field({ reducedMotion, density }) {
  const materialRef = useRef(null);
  const groupRef = useRef(null);
  const mouseTarget = useRef(new THREE.Vector2(0, 0));

  const { positions, randoms } = useMemo(() => {
    const cols = Math.floor(150 * density);
    const rows = Math.floor(95 * density);
    const width = 26;
    const depth = 17;
    const count = cols * rows;
    const pos = new Float32Array(count * 3);
    const rnd = new Float32Array(count);
    let i = 0;
    for (let x = 0; x < cols; x++) {
      for (let z = 0; z < rows; z++) {
        pos[i * 3] = (x / (cols - 1) - 0.5) * width;
        pos[i * 3 + 1] = 0;
        pos[i * 3 + 2] = (z / (rows - 1) - 0.5) * depth;
        rnd[i] = Math.random();
        i++;
      }
    }
    return { positions: pos, randoms: rnd };
  }, [density]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: {
        value: Math.min(window.devicePixelRatio, 1.75),
      },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }),
    [],
  );

  useEffect(() => {
    const onMove = (e) => {
      mouseTarget.current.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1,
      );
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state, delta) => {
    const mat = materialRef.current;
    if (!mat) return;
    if (!reducedMotion) {
      mat.uniforms.uTime.value += Math.min(delta, 0.05);
    }
    // Ease the pointer uniform + tilt the whole field a touch
    mat.uniforms.uMouse.value.lerp(mouseTarget.current, 0.04);
    if (groupRef.current && !reducedMotion) {
      const m = mat.uniforms.uMouse.value;
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        m.x * 0.05,
        0.05,
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -m.y * 0.03,
        0.05,
      );
    }
  });

  return (
    <group ref={groupRef} position={[0, -1.4, 0]} rotation={[-0.12, 0, 0]}>
      <points frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-aRandom"
            count={randoms.length}
            array={randoms}
            itemSize={1}
          />
        </bufferGeometry>
        <shaderMaterial
          ref={materialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

const ParticleFieldCanvas = ({ className = "" }) => {
  const wrapperRef = useRef(null);
  const [inView, setInView] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768,
  );

  // Pause rendering entirely when scrolled past the hero
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "80px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(rm.matches);
    update();
    rm.addEventListener("change", update);
    return () => rm.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div ref={wrapperRef} className={className} aria-hidden="true">
      <Canvas
        frameloop={inView ? "always" : "never"}
        dpr={[1, 1.75]}
        camera={{ position: [0, 1.1, 7.5], fov: 50, near: 0.1, far: 60 }}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <Field reducedMotion={reducedMotion} density={isMobile ? 0.55 : 1} />
      </Canvas>
    </div>
  );
};

export default ParticleFieldCanvas;
