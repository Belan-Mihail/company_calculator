import React from 'react'
interface ResetButtonProps {
  onReset: () => void,
}

const ResetButton:React.FC<ResetButtonProps> = ({onReset}) => {
  return (
    <div className='bg-red-500' onClick={onReset}>
      Reset
    </div>
  )
}

export default ResetButton