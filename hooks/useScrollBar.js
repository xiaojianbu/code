/**
 * 获取滚动条宽度
 */
const useScrollBar = () => {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const getScrollBarWidth = () => {
      const el = document.createElement('p')
      el.style.cssText =
        'width: 100px;height: 100px;overflow-y: scroll;opacity: 0;position: absolute;z-index: -1;'
      // 将元素加到 body 里面
      document.body.appendChild(el)
      const delWidth = el.offsetWidth - el.clientWidth
      // 将添加的元素删除
      document.body.removeChild(el)
      return delWidth
    }
    setWidth(getScrollBarWidth() || 0)
  }, [])

  return [width]
}
