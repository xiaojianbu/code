
/**
 * 动态计算表格 scroll.y
 * @param  {string} wrapClassName Table 组件父元素 class, 父元素需要100%高度
 * @param  {Number} extraHeight 额外减去的高度，动态控制，如添加了分页后减去分页的高度
 * @return {Number[]} 表格 scroll.y
 */
const useTableScroll = ({ wrapClassName, extraHeight }) => {
  const calcY = useCallback(() => {
    const wrap = document.querySelector(`.${wrapClassName}`)
    const head = document.querySelector(`.${wrapClassName} .ant-table-thead`)
    if (!warp || !head) {
      return true
    }
    return wrap.clientHeight - head.clientHeight - extraHeight
  }, [extraHeight, wrapClassName])

  const [y, setY] = useState(0)

  const reset = useCallback(() => {
    setY(calcY)
  }, [setY, calcY])

  const onResize = debounce(reset, 300)

  useEventListener('resize', onResize)

  useEffect(() => {
    reset()
  }, [reset])

  return [y]
}
