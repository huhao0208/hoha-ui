/**
 * useCounter - A composable counter function
 */

export interface UseCounterOptions {
  /** Initial value for the counter */
  initialValue?: number
  /** Minimum value for the counter */
  min?: number
  /** Maximum value for the counter */
  max?: number
}

export interface UseCounterReturn {
  /** Current count value */
  count: number
  /** Increment the counter by 1 (or a specified value) */
  increment: (delta?: number) => void
  /** Decrement the counter by 1 (or a specified value) */
  decrement: (delta?: number) => void
  /** Reset the counter to initial value */
  reset: () => void
  /** Set the counter to a specific value */
  set: (value: number) => void
}

/**
 * A composable counter function that provides reactive counter functionality
 * 
 * @param options - Configuration options for the counter
 * @returns An object containing the count and control methods
 * 
 * @example
 * ```ts
 * const counter = useCounter({ initialValue: 5, min: 0, max: 10 })
 * counter.increment()  // count becomes 6
 * counter.decrement(2) // count becomes 4
 * counter.reset()      // count returns to 5
 * ```
 */
export function useCounter(options: UseCounterOptions = {}): UseCounterReturn {
  const { initialValue = 0, min, max } = options

  let count = initialValue

  const clamp = (value: number): number => {
    if (typeof min === 'number' && value < min) return min
    if (typeof max === 'number' && value > max) return max
    return value
  }

  const increment = (delta: number = 1): void => {
    count = clamp(count + delta)
  }

  const decrement = (delta: number = 1): void => {
    count = clamp(count - delta)
  }

  const reset = (): void => {
    count = clamp(initialValue)
  }

  const set = (value: number): void => {
    count = clamp(value)
  }

  return {
    get count() {
      return count
    },
    increment,
    decrement,
    reset,
    set
  }
}
