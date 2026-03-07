export const vertexShader = /* glsl */ `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

export const fragmentShader = /* glsl */ `
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;

varying vec2 vUv;

// --- Simplex 2D Noise (Ashima Arts) ---
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                     -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
    dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;
  for (int i = 0; i < 5; i++) {
    value += amplitude * snoise(p * frequency);
    amplitude *= 0.5;
    frequency *= 2.0;
  }
  return value;
}

// --- Curve definitions ---
// Each curve returns Y position for a given X
// Curves sweep from upper-left to lower-right through the center
float curve1(float x, float t) {
  float base = 0.95 - x * 0.50;
  float wave = 0.06 * sin(x * 2.0 + t * 0.10);
  float noise = 0.025 * snoise(vec2(x * 1.2 + t * 0.04, 0.0));
  return base + wave + noise;
}

float curve2(float x, float t) {
  float base = 0.88 - x * 0.48;
  float wave = 0.07 * sin(x * 1.8 + t * 0.08 + 0.8);
  float noise = 0.02 * snoise(vec2(x * 1.4 + t * 0.03, 5.0));
  return base + wave + noise;
}

float curve3(float x, float t) {
  float base = 0.80 - x * 0.52;
  float wave = 0.08 * sin(x * 1.5 + t * 0.07 + 2.0);
  float noise = 0.03 * snoise(vec2(x * 1.0 + t * 0.05, 10.0));
  return base + wave + noise;
}

float curve4(float x, float t) {
  float base = 1.02 - x * 0.55;
  float wave = 0.05 * sin(x * 2.4 + t * 0.12 + 1.5);
  float noise = 0.02 * snoise(vec2(x * 1.6 + t * 0.03, 15.0));
  return base + wave + noise;
}

// --- Tube rendering ---
struct TubeResult {
  float mask;
  float shade;
  float highlight;
};

TubeResult renderTube(vec2 uv, float curveY, float width, float sharpness) {
  TubeResult result;
  float dist = uv.y - curveY;
  float normalizedDist = clamp(dist / width, -1.0, 1.0);

  // Smooth tube cross-section (semicircle profile)
  float profile = sqrt(max(0.0, 1.0 - normalizedDist * normalizedDist));

  // Edge mask with controllable sharpness
  result.mask = 1.0 - smoothstep(1.0 - sharpness, 1.0, abs(normalizedDist));

  // Diffuse-like shading (light from upper-left)
  float lightAngle = 0.3;
  result.shade = profile * (0.55 + 0.45 * (normalizedDist * sin(lightAngle) + profile * cos(lightAngle)));

  // Specular highlight along the tube
  float specPos = -0.25; // highlight offset from center
  float specWidth = 0.22;
  result.highlight = exp(-pow((normalizedDist - specPos) / specWidth, 2.0)) * profile;

  return result;
}

void main() {
  vec2 uv = vUv;
  float aspect = uResolution.x / uResolution.y;
  vec2 aspUv = vec2(uv.x * aspect, uv.y);
  float t = uTime;

  // === BACKGROUND ===
  // Deep teal base gradient
  vec3 bgDark = vec3(0.035, 0.10, 0.065);
  vec3 bgMid = vec3(0.055, 0.19, 0.12);
  vec3 bgLight = vec3(0.07, 0.25, 0.16);

  // Vertical gradient with slight noise variation
  float gradientT = uv.y * 0.6 + 0.2;
  gradientT += fbm(aspUv * 1.5 + t * 0.02) * 0.08;
  vec3 bg = mix(bgDark, bgMid, smoothstep(0.0, 0.5, gradientT));
  bg = mix(bg, bgLight, smoothstep(0.5, 1.0, gradientT));

  // Subtle noise texture on background
  bg += vec3(0.01, 0.02, 0.015) * snoise(aspUv * 8.0 + t * 0.01);

  vec3 color = bg;

  // === LIGHT SPOTS (behind ribbons) ===
  // Main light spot - lower right area (prominent green glow)
  vec2 light1Pos = vec2(aspect * 0.70, 0.20);
  float light1 = exp(-length(aspUv - light1Pos) * 2.0);
  color += vec3(0.05, 0.15, 0.08) * light1;

  // Secondary light spot - center
  vec2 light2Pos = vec2(aspect * 0.45, 0.45);
  float light2 = exp(-length(aspUv - light2Pos) * 2.5);
  color += vec3(0.03, 0.10, 0.06) * light2 * 0.6;

  // Upper area subtle warmth
  vec2 light3Pos = vec2(aspect * 0.20, 0.82);
  float light3 = exp(-length(aspUv - light3Pos) * 1.8);
  color += vec3(0.05, 0.04, 0.015) * light3 * 0.5;

  // === RIBBONS / TUBES ===
  // Tube colors
  vec3 amberBase = vec3(0.62, 0.46, 0.20);
  vec3 amberHighlight = vec3(0.85, 0.72, 0.45);
  vec3 amberDark = vec3(0.35, 0.25, 0.10);
  vec3 greenReflect = vec3(0.15, 0.30, 0.18);

  // Use full aspect-corrected x for curve sampling
  float cx = uv.x * aspect;

  // Curve 4 (background, thin, subtle)
  float c4y = curve4(cx * 0.62, t);
  TubeResult tube4 = renderTube(uv, c4y, 0.015, 0.35);
  vec3 tube4Color = mix(amberDark, greenReflect, 0.4) * tube4.shade;
  tube4Color += amberHighlight * tube4.highlight * 0.2;
  color = mix(color, tube4Color, tube4.mask * 0.4);

  // Curve 3 (mid-ground, medium, prominent)
  float c3y = curve3(cx * 0.58, t);
  TubeResult tube3 = renderTube(uv, c3y, 0.028, 0.5);
  vec3 tube3Color = mix(amberBase, greenReflect, 0.2) * tube3.shade;
  tube3Color += amberHighlight * tube3.highlight * 0.4;
  color = mix(color, tube3Color, tube3.mask * 0.6);

  // Curve 2 (foreground, prominent)
  float c2y = curve2(cx * 0.55, t);
  TubeResult tube2 = renderTube(uv, c2y, 0.035, 0.55);
  vec3 tube2Color = mix(amberBase, amberDark, 0.1) * tube2.shade * 1.05;
  tube2Color += amberHighlight * tube2.highlight * 0.55;
  tube2Color = mix(tube2Color, greenReflect * 0.5, (1.0 - tube2.shade) * 0.25);
  color = mix(color, tube2Color, tube2.mask * 0.8);

  // Curve 1 (main foreground curve, most visible)
  float c1y = curve1(cx * 0.55, t);
  TubeResult tube1 = renderTube(uv, c1y, 0.042, 0.6);
  vec3 tube1Color = amberBase * tube1.shade * 1.15;
  tube1Color += amberHighlight * tube1.highlight * 0.7;
  tube1Color = mix(tube1Color, greenReflect * 0.4, (1.0 - tube1.shade) * 0.2);
  color = mix(color, tube1Color, tube1.mask * 0.9);

  // === LIGHT SPOTS (in front of ribbons) ===
  // Bright spot lower-right (prominent green glow from screenshot)
  vec2 glowPos = vec2(aspect * 0.75, 0.18);
  float glow = exp(-length(aspUv - glowPos) * 2.5);
  color += vec3(0.08, 0.20, 0.12) * glow;

  // Subtle warm glow near curves
  vec2 warmPos = vec2(aspect * 0.55, 0.55);
  float warm = exp(-length(aspUv - warmPos) * 2.0);
  color += vec3(0.02, 0.04, 0.02) * warm * 0.4;

  // === POST-PROCESSING ===
  // Subtle vignette
  float vignette = 1.0 - dot(vUv - 0.5, vUv - 0.5) * 0.5;
  color *= vignette;

  // Very subtle film grain
  float grain = snoise(vUv * uResolution * 0.5 + t * 10.0) * 0.015;
  color += grain;

  // Tone mapping (soft clamp)
  color = color / (color + 0.8) * 1.1;

  gl_FragColor = vec4(color, 1.0);
}
`
