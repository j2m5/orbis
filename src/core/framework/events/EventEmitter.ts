type EventMap = Record<string, unknown>

interface Observer<M extends EventMap, K extends keyof M & string = keyof M & string> {
  update(event: K, data?: M[K]): void
}

class EventEmitter<M extends EventMap> {
  private readonly observers: Map<string, Observer<M>[]> = new Map()

  public constructor() {
    this.observers.set('*', [])
  }

  public attach<K extends keyof M & string>(observer: Observer<M, K>, event: K): void
  public attach(observer: Observer<M>, event?: '*'): void
  public attach(observer: Observer<M>, event: string = '*'): void {
    const group = this.observers.get(event) || []

    group.push(observer)

    this.observers.set(event, group)
  }

  public detach(observer: Observer<M>, event: (keyof M & string) | '*'): void {
    const group = this.observers.get(event)

    if (!group) return

    this.observers.set(event, group.filter(o => o !== observer))
  }

  public emit<K extends keyof M & string>(event: K, data?: M[K]): void {
    const group = this.observers.get(event) || []
    const all = this.observers.get('*') || []

    for (const observer of [...group, ...all]) {
      observer.update(event, data)
    }
  }
}

export type { EventMap, Observer }
export { EventEmitter }

