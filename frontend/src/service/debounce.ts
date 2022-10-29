export const debounce = (callback: any, delay = 1000) => {
  let timeout: NodeJS.Timeout

  return (...args: any) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      callback(...args)
    }, delay)
  }
}
