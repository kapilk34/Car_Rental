import React from 'react'

const Title = ({ title, subTitle }) => {
  return (
    <div className='flex flex-col'>
      <h1 className='font-bold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-text-primary via-text-primary to-accent'>
        {title}
      </h1>
      <div className='mt-3 h-px w-16 bg-gradient-to-r from-transparent via-accent/50 to-transparent' />
      <p className='text-sm md:text-base text-text-secondary mt-3 max-w-2xl'>{subTitle}</p>
    </div>
  )
}

export default Title