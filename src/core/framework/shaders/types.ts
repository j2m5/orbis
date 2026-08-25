export interface IShader {
  name?: string
  vertexShader: string
  fragmentShader: string
  uniforms?: Record<string, { value: unknown }>
  defines?: Record<string, unknown>
}
