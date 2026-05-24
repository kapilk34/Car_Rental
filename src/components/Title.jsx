import React from 'react'

const Title = ({ title, subtitle, align }) => {
  return (
    <div className={`flex flex-col justify-center items-center text-center ${align === 'left' && 'md:items-start md:text-left'}`}>
      <h1 className='font-bold text-4xl md:text-[40px] text-transparent bg-clip-text bg-gradient-to-r from-text-primary via-text-primary to-accent'>
        {title}
      </h1>
      <div className={`mt-3 h-px w-20 bg-gradient-to-r from-transparent via-accent/50 to-transparent ${align === 'left' ? 'md:ml-0' : ''}`} />
      <p className='text-sm md:text-base text-text-secondary mt-3 max-w-2xl'>{subtitle}</p>
    </div>
  )
}

export default Title