import React from 'react'

interface ConfirmModulProps {
    onConfirm: () => void
    onCancel: () => void
}

const ConfirmModal: React.FC<ConfirmModulProps> = ({onConfirm, onCancel}) => {
   
  return (
    <div className='fixed main z-50 w-80 h-80 left-1/2 transform -translate-x-1/2 top-16 p-4 flex justify-center items-center'>
        <div className='round flex flex-col justify-center items-center gap-4'>
            <h2 className='text-xl mb-2'>Are you sure you want to exit?</h2>
            <div className='flex gap-4'>
                <button className='main-button' onClick={onConfirm}>Confirm</button>
                <button className='main-button' onClick={onCancel}>Cancel</button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmModal