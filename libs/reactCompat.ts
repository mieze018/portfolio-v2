import ReactRuntime from 'react'

type EffectCleanup = () => void
type EffectCallback = () => undefined | EffectCleanup
type DependencyList = readonly unknown[]
type StateUpdater<T> = T | ((prevState: T) => T)
type SetState<T> = (nextState: StateUpdater<T>) => void

export type RefObjectLike<T> = {
  current: T
}

const hooks = ReactRuntime as unknown as {
  useCallback: <T extends (...args: never[]) => unknown>(callback: T, deps: DependencyList) => T
  useEffect: (effect: EffectCallback, deps?: DependencyList) => void
  useRef: <T>(initialValue: T) => RefObjectLike<T>
  useState: <T>(initialState: T | (() => T)) => [T, SetState<T>]
}

export const useCallback = hooks.useCallback
export const useEffect = hooks.useEffect
export const useRef = hooks.useRef
export const useState = hooks.useState
