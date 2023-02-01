import { RotatingLines } from 'react-loader-spinner'

const Loader = () => {
  return (
    <RotatingLines
      strokeColor="#1876d1"
      strokeWidth="5"
      animationDuration="0.75"
      width="60"
      visible={true}
    />
  )
}

export default Loader