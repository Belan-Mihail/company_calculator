import React from 'react'

interface ConfirmLogoutModulProps {
    onConfirm: () => void
    onCancel: () => void
}

const ConfirmLogoutModal: React.FC<ConfirmLogoutModulProps> = ({onConfirm, onCancel}) => {
   
  return (
    <div className='fixed z-50 main'>
        <div className='rounded shadow-xl'>
            <h2 className='text-xl mb-2'>Are you sure you want to exit?</h2>
            <div className='flex gap-4'>
                <button className='main-button' onClick={onConfirm}>Confirm</button>
                <button className='main-button' onClick={onCancel}>Cancel</button>
            </div>
        </div>
    </div>
  )
}

export default ConfirmLogoutModal