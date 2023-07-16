import React from 'react'
import CalenderRange from './CalenderRange'

const Thing = () => {
  return (
   <div className ='w-full h-screen mx-auto text-center flex flex-col justify-center'>
        
      <form action = "/api">
        <h1 className ='p-20 font-bold text-center md:text-5xl sm:text-4xl text-2xl md-py-6 '>Select The Date Range</h1>
                        <div className='mx-auto'>
                            <CalenderRange />
                        </div>

                        <div className='p-20'>
                            <button className='bg-red-800 text-white text-xl w-[200px] rounded-full font-medium my-6 mx-auto py-3'>SUBMIT</button>
                        </div>
      </form>

    </div>
  )
}

export default Thing
