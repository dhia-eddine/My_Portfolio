import{j as n}from"./index-D5Vc0nSa.js";import{r as o}from"./vendor-motion-9SPLGOEH.js";import{C as b,V as z,u as M,A as R,M as g}from"./vendor-three-bx8QSKtG.js";const E=`
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
`,j=`
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
`;function C({reducedMotion:c,density:s}){const v=o.useRef(null),i=o.useRef(null),l=o.useRef(new z(0,0)),{positions:u,randoms:x}=o.useMemo(()=>{const e=Math.floor(150*s),t=Math.floor(95*s),r=26,d=17,y=e*t,m=new Float32Array(y*3),w=new Float32Array(y);let a=0;for(let f=0;f<e;f++)for(let h=0;h<t;h++)m[a*3]=(f/(e-1)-.5)*r,m[a*3+1]=0,m[a*3+2]=(h/(t-1)-.5)*d,w[a]=Math.random(),a++;return{positions:m,randoms:w}},[s]),p=o.useMemo(()=>({uTime:{value:0},uPixelRatio:{value:Math.min(window.devicePixelRatio,1.75)},uMouse:{value:new z(0,0)}}),[]);return o.useEffect(()=>{const e=t=>{l.current.set(t.clientX/window.innerWidth*2-1,-(t.clientY/window.innerHeight)*2+1)};return window.addEventListener("pointermove",e,{passive:!0}),()=>window.removeEventListener("pointermove",e)},[]),M((e,t)=>{const r=v.current;if(r&&(c||(r.uniforms.uTime.value+=Math.min(t,.05)),r.uniforms.uMouse.value.lerp(l.current,.04),i.current&&!c)){const d=r.uniforms.uMouse.value;i.current.rotation.z=g.lerp(i.current.rotation.z,d.x*.05,.05),i.current.rotation.x=g.lerp(i.current.rotation.x,-d.y*.03,.05)}}),n.jsx("group",{ref:i,position:[0,-1.4,0],rotation:[-.12,0,0],children:n.jsxs("points",{frustumCulled:!1,children:[n.jsxs("bufferGeometry",{children:[n.jsx("bufferAttribute",{attach:"attributes-position",count:u.length/3,array:u,itemSize:3}),n.jsx("bufferAttribute",{attach:"attributes-aRandom",count:x.length,array:x,itemSize:1})]}),n.jsx("shaderMaterial",{ref:v,vertexShader:E,fragmentShader:j,uniforms:p,transparent:!0,depthWrite:!1,blending:R})]})})}const D=({className:c=""})=>{const s=o.useRef(null),[v,i]=o.useState(!0),[l,u]=o.useState(!1),[x,p]=o.useState(()=>typeof window<"u"&&window.innerWidth<768);return o.useEffect(()=>{const e=s.current;if(!e)return;const t=new IntersectionObserver(([r])=>i(r.isIntersecting),{rootMargin:"80px"});return t.observe(e),()=>t.disconnect()},[]),o.useEffect(()=>{const e=window.matchMedia("(prefers-reduced-motion: reduce)"),t=()=>u(e.matches);return t(),e.addEventListener("change",t),()=>e.removeEventListener("change",t)},[]),o.useEffect(()=>{const e=()=>p(window.innerWidth<768);return window.addEventListener("resize",e),()=>window.removeEventListener("resize",e)},[]),n.jsx("div",{ref:s,className:c,"aria-hidden":"true",children:n.jsx(b,{frameloop:v?"always":"never",dpr:[1,1.75],camera:{position:[0,1.1,7.5],fov:50,near:.1,far:60},gl:{antialias:!1,alpha:!0,powerPreference:"high-performance"},style:{background:"transparent"},children:n.jsx(C,{reducedMotion:l,density:x?.55:1})})})};export{D as default};
