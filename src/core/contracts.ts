export interface OrbisSettings {
  backgroundColor: string
  visibleGrid: boolean
  gridSize: number
  gridDivisions: number
  gridColor: string
  gridCenterColor: string
  gridOpacity: number
  visibleAxes: boolean
  visibleLightMarker: boolean
  renderScale: number
}

export interface PlanetParameters {
  radius: number
}

export const PLANET_TEXTURE_SLOTS = ['diffuse', 'night'] as const

export type PlanetTextureSlot = (typeof PLANET_TEXTURE_SLOTS)[number]

export interface AstroControlsSettings {
  enabled: boolean
  autoForward: boolean
  movementSpeed: number
  rollSpeed: number
  mouseRotationSpeed: number
}

export const MIN_PLANET_RADIUS = 1
export const MIN_ORBIS_GRID_SIZE = 1
export const MIN_ORBIS_GRID_DIVISIONS = 2
export const MAX_ORBIS_GRID_DIVISIONS = 2000
export const MIN_ORBIS_GRID_OPACITY = 0
export const MAX_ORBIS_GRID_OPACITY = 1
export const MIN_ORBIS_RENDER_SCALE = 0.25
export const MAX_ORBIS_RENDER_SCALE = 2
export const MIN_ASTRO_CONTROLS_MOVEMENT_SPEED = 0.001
export const MIN_ASTRO_CONTROLS_ROLL_SPEED = 0.0001
export const MIN_ASTRO_CONTROLS_MOUSE_ROTATION_SPEED = 0.01

export const DEFAULT_ORBIS_SETTINGS: Readonly<OrbisSettings> = Object.freeze({
  backgroundColor: '#000000',
  visibleGrid: true,
  gridSize: 1500000,
  gridDivisions: 100,
  gridColor: '#888888',
  gridCenterColor: '#444444',
  gridOpacity: 1,
  visibleAxes: false,
  visibleLightMarker: true,
  renderScale: 1
})

export const DEFAULT_PLANET_PARAMETERS: Readonly<PlanetParameters> = Object.freeze({
  radius: 6000
})

export const DEFAULT_ASTRO_CONTROLS_SETTINGS: Readonly<AstroControlsSettings> = Object.freeze({
  enabled: true,
  autoForward: false,
  movementSpeed: 0.1,
  rollSpeed: 0.005,
  mouseRotationSpeed: 1
})

export function isPlanetRadius(value: number): boolean {
  return Number.isFinite(value) && value >= MIN_PLANET_RADIUS
}

export function isOrbisGridSize(value: number): boolean {
  return Number.isFinite(value) && value >= MIN_ORBIS_GRID_SIZE
}

export function isOrbisGridDivisions(value: number): boolean {
  return (
    Number.isInteger(value) && value >= MIN_ORBIS_GRID_DIVISIONS && value <= MAX_ORBIS_GRID_DIVISIONS && value % 2 === 0
  )
}

export function isOrbisGridOpacity(value: number): boolean {
  return Number.isFinite(value) && value >= MIN_ORBIS_GRID_OPACITY && value <= MAX_ORBIS_GRID_OPACITY
}

export function isOrbisRenderScale(value: number): boolean {
  return Number.isFinite(value) && value >= MIN_ORBIS_RENDER_SCALE && value <= MAX_ORBIS_RENDER_SCALE
}

export function isAstroControlsMovementSpeed(value: number): boolean {
  return Number.isFinite(value) && value >= MIN_ASTRO_CONTROLS_MOVEMENT_SPEED
}

export function isAstroControlsRollSpeed(value: number): boolean {
  return Number.isFinite(value) && value >= MIN_ASTRO_CONTROLS_ROLL_SPEED
}

export function isAstroControlsMouseRotationSpeed(value: number): boolean {
  return Number.isFinite(value) && value >= MIN_ASTRO_CONTROLS_MOUSE_ROTATION_SPEED
}
