/**
 *
 * @param {*} initVal
 * @param {*} service 请求函数 promise
 */
const useRequest = (initValue, { service, params } = { params: {} }) => {
  const [data, setData] = useState(initValue)

  useEffect(() => {
    const fetchData = async () => {
      const res = await service(params)
      setData(res)
    }
    fetchData()
  }, [])

  return [data, setData]
}
