import type { IShader } from '@/core/framework/shaders/types'
import { ShaderChunk, Uniform, Vector3 } from 'three'

export const StandardPlanetShader: IShader = {
  uniforms: {
    diffuseMap: new Uniform(null),
    nightMap: new Uniform(null),
    lightPosition: new Uniform(new Vector3())
  },
  vertexShader: `
    precision highp float;

    ${ShaderChunk['common']}
    ${ShaderChunk['logdepthbuf_pars_vertex']}

    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;
    varying vec3 vViewLightDirection;

    uniform vec3 lightPosition;

    void main() {
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vec4 viewLightDirection = viewMatrix * vec4(lightPosition, 1.0);

      gl_Position = projectionMatrix * mvPosition;

      vUv = uv;
      vPosition = position;
      vNormal = normalize(normalMatrix * normal);
      vViewLightDirection = normalize(viewLightDirection.xyz - mvPosition.xyz);

      ${ShaderChunk['logdepthbuf_vertex']}
    }
  `,
  fragmentShader: `
    precision highp float;

    ${ShaderChunk['common']}
    ${ShaderChunk['logdepthbuf_pars_fragment']}

    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;
    varying vec3 vViewLightDirection;

    uniform sampler2D diffuseMap;
    uniform sampler2D nightMap;
    uniform vec3 lightPosition;

    void main() {
      ${ShaderChunk['logdepthbuf_fragment']}

      vec4 dayColor = texture2D(diffuseMap, vUv);
      vec4 nightColor = texture2D(nightMap, vUv);

      float intensity = max(dot(normalize(vNormal), normalize(vViewLightDirection)), 0.0);

      vec4 finalColor = mix(nightColor, dayColor, intensity);

      gl_FragColor = finalColor;

      ${ShaderChunk['colorspace_fragment']}
    }
  `
}
