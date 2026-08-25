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

    void main() {
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_Position = projectionMatrix * mvPosition;

      vUv = uv;
      vNormal = normal;
    }
  `,
  fragmentShader: `
    precision highp float;

    ${ShaderChunk['common']}
    ${ShaderChunk['logdepthbuf_pars_fragment']}

    varying vec2 vUv;
    varying vec3 vNormal;

    uniform sampler2D diffuseMap;
    uniform sampler2D nightMap;
    uniform vec3 lightPosition;

    void main() {
      ${ShaderChunk['logdepthbuf_fragment']}

      vec3 normal = normalize(vNormal);
      vec3 diffuseSample = texture2D(diffuseMap, vUv).rgb;
      vec3 nightSample = texture2D(nightMap, vUv).rgb;

      vec3 finalColor = mix(diffuseSample, nightSample, 0.5);

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
}
