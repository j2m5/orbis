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
    varying vec3 vNormal;
    varying vec3 vPosition;

    void main() {
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vec4 worldPosition = modelMatrix * vec4(position, 1.0);

      gl_Position = projectionMatrix * mvPosition;

      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vPosition = worldPosition.xyz;
    }
  `,
  fragmentShader: `
    precision highp float;

    ${ShaderChunk['common']}
    ${ShaderChunk['logdepthbuf_pars_fragment']}

    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;

    uniform sampler2D diffuseMap;
    uniform sampler2D nightMap;
    uniform vec3 lightPosition;

    void main() {
      ${ShaderChunk['logdepthbuf_fragment']}

      vec4 dayColor = texture2D(diffuseMap, vUv);
      vec4 nightColor = texture2D(nightMap, vUv);

      vec3 lightDir = normalize(lightPosition - vPosition);
      float intensity = dot(vNormal, lightDir);
      float mixFactor = clamp(intensity * 0.5 + 0.5, 0.0, 1.0);

      vec4 finalColor = mix(nightColor, dayColor, mixFactor);

      gl_FragColor = finalColor;
    }
  `
}
