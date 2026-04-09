/**
 * DOM utility functions
 */

export function hasClass(el: Element, className: string): boolean {
  return el.classList.contains(className)
}

export function addClass(el: Element, className: string): void {
  el.classList.add(className)
}

export function removeClass(el: Element, className: string): void {
  el.classList.remove(className)
}

export function getStyle(el: Element, prop: string): string {
  return getComputedStyle(el)[prop as any] || ''
}

export function setStyle(el: HTMLElement, styles: Record<string, string>): void {
  Object.assign(el.style, styles)
}

export function scrollTo(top: number, behavior: 'smooth' | 'auto' = 'smooth'): void {
  window.scrollTo({ top, behavior })
}

export function scrollToTop(): void {
  scrollTo(0)
}
