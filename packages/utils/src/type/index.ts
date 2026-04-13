/**
 * Type utility functions
 */

const toString = Object.prototype.toString

export function isType(value: unknown, type: string): boolean {
  return toString.call(value) === `[object ${type}]`
}

export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value)
}

export function isObject(value: unknown): value is Record<string, unknown> {
  return isType(value, 'Object')
}

export function isFunction(value: unknown): value is (...args: unknown[]) => unknown {
  return isType(value, 'Function')
}

export function isString(value: unknown): value is string {
  return isType(value, 'String')
}

export function isNumber(value: unknown): value is number {
  return isType(value, 'Number') && !isNaN(value as number)
}

export function isBoolean(value: unknown): value is boolean {
  return isType(value, 'Boolean')
}

export function isNull(value: unknown): value is null {
  return value === null
}

export function isUndefined(value: unknown): value is undefined {
  return value === undefined
}

export function isEmpty(value: unknown): boolean {
  if (isNull(value) || isUndefined(value)) return true
  if (isString(value)) return value.trim() === ''
  if (isArray(value)) return value.length === 0
  if (isObject(value)) return Object.keys(value).length === 0
  return false
}

export function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (!isObject(value)) return false
  const proto = Object.getPrototypeOf(value)
  return proto === null || proto === Object.prototype
}
