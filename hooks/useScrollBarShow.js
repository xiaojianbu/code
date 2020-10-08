/**
 * 判断滚动条是否显示
 * @param  {Object} containerRef 固定窗口容器
 * @param  {Object} childRef 滚动容器
 */
const useScrollBarShow = (containerRef = document, childRef = document.body) => {
  const [visible, setVisible] = useState(false)

  const judge = useCallback(() => {
    if (!containerRef || !containerRef.current) {
      setVisible(visible)
    } else {
      setVisible(containerRef.current.offsetHeight < childRef.current.offsetHeight)
    }
  }, [])

  const reset = () => {
    judge()
  }
  const onResize = debounce(reset, 300)
  useEventListener('resize', onResize)

  useEffect(() => {
    judge()
  })

  return [visible]
}
