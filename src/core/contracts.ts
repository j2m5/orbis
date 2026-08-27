export interface OrbisSettings {
  visibleGrid: boolean
  backgroundColor: string
}

export interface PlanetParameters {
  radius: number
}

export interface AstroControlsSettings {
  enabled: boolean
  autoForward: boolean
  movementSpeed: number
  rollSpeed: number
  mouseRotationSpeed: number
}

export const MIN_PLANET_RADIUS = 1
export const MIN_ASTRO_CONTROLS_MOVEMENT_SPEED = 0.001
export const MIN_ASTRO_CONTROLS_ROLL_SPEED = 0.0001
export const MIN_ASTRO_CONTROLS_MOUSE_ROTATION_SPEED = 0.01

export const DEFAULT_ORBIS_SETTINGS: Readonly<OrbisSettings> = Object.freeze({
  visibleGrid: true,
  backgroundColor: '#000000'
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

export function isAstroControlsMovementSpeed(value: number): boolean {
  return Number.isFinite(value) && value >= MIN_ASTRO_CONTROLS_MOVEMENT_SPEED
}

export function isAstroControlsRollSpeed(value: number): boolean {
  return Number.isFinite(value) && value >= MIN_ASTRO_CONTROLS_ROLL_SPEED
}

export function isAstroControlsMouseRotationSpeed(value: number): boolean {
  return Number.isFinite(value) && value >= MIN_ASTRO_CONTROLS_MOUSE_ROTATION_SPEED
}
