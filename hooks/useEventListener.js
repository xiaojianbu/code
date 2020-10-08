/**
 * 添加事件监听
 */
const useEventListener = (eventName, element, callback) => {
  if (typeof callback === 'undefined' && typeof element === 'function') {
    callback = element
    element = window
  }

  const fn = useCallback((e) => {
    callback(e)
  }, [])

  useEffect(() => {
    if (element) {
      element.addEventListener(eventName, fn, false)
      return () => {
        element.removeEventListener(eventName, fn, false)
      }
    }
  }, [])

  return []
}
