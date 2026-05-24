import React from 'react'

const Loader = () => {
  return (
    <div className='flex justify-center items-center h-[80vh]' style={{ backgroundColor: "#0F0F0F" }}>
        <div className='animate-spin rounded-full h-14 w-14 border-4' style={{
          borderColor: "#2F2F2F",
          borderTopColor: "#E63946"
        }}></div>
    </div>
  )
}

export default Loader