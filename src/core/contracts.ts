export interface OrbisSettings {
  visibleGrid: boolean
  backgroundColor: string
}

export interface PlanetParameters {
  radius: number
}

export const MIN_PLANET_RADIUS = 1

export const DEFAULT_ORBIS_SETTINGS: Readonly<OrbisSettings> = Object.freeze({
  visibleGrid: true,
  backgroundColor: '#000000'
})

export const DEFAULT_PLANET_PARAMETERS: Readonly<PlanetParameters> = Object.freeze({
  radius: 6000
})

export function isPlanetRadius(value: number): boolean {
  return Number.isFinite(value) && value >= MIN_PLANET_RADIUS
}
