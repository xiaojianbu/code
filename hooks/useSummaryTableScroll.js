
let sign
/**
 * 添加合计行滚动事件监听
 * @param {Object} tableRef 主体表格ref
 * @param {Object} footerTableRef 表尾ref
 * @param {Array} dataSource 表格数据
 */
const useSummaryTableScroll = (tableRef, footerTableRef, dataSource) => {
  const getRef = (tableRef) => {
    return ReactDOM.findDOMNode(tableRef.current).getElementsByClassName('ant-table-body')[0]
  }

  const syncScrollFooter = (e, tableRef) => {
    const ref = getRef(tableRef)
    ref.scrollLeft = e.target.scrollLeft
  }

  useEffect(() => {
    if (footerTableRef.current) {
      const ref = getRef(footerTableRef)
      ref.addEventListener('mouseenter', (e) => {
        sign = tableRef
      })
      ref.addEventListener('scroll', (e) => syncScrollFooter(e, tableRef))
    }
    return () => {
      if (footerTableRef.current) {
        const ref = getRef(footerTableRef)
        ref.removeEventListener('mouseenter', (e) => {
          sign = tableRef
        })
        ref.removeEventListener('scroll', (e) => syncScrollFooter(e, tableRef))
      }
    }
  }, [dataSource])

  return []
}
