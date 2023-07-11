import React from 'react'
import CalenderRange from './CalenderRange'


const Body = () => {
        return (
            <div className='text-black'>
                <div className ='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
                    
                    <h1 className ='font-bold text-center md:text-5xl sm:text-4xl text-2xl md-py-6 '>Select What You Want to Track</h1>
                    <div className='items-center pl-4 pt-10'>
                        <input id='view-checkbox' type='checkbox' value='' name='view-checkbox' className='w-6 h-6'/>
                        <label htmlFor='view-checkbox' className='ml-2 text-xl font-medium'>VIEWS </label>

                        <input id='view-checkbox' type='checkbox' value='' name='view-checkbox' className='w-6 h-6'/>
                        <label htmlFor='view-checkbox' className='ml-2 text-xl font-medium'>COMMENTS </label>

                        <input id='view-checkbox' type='checkbox' value='' name='view-checkbox' className='w-6 h-6'/>
                        <label htmlFor='view-checkbox' className='ml-2 text-xl font-medium'>LIKES </label>

                        <input id='view-checkbox' type='checkbox' value='' name='view-checkbox' className='w-6 h-6'/>
                        <label htmlFor='view-checkbox' className='ml-2 text-xl font-medium'>MINUTES WATCHED </label>

                        <input id='view-checkbox' type='checkbox' value='' name='view-checkbox' className='w-6 h-6'/>
                        <label htmlFor='view-checkbox' className='ml-2 text-xl font-medium'>VIEW DURATION </label>
                    </div>

                    <h1 className ='p-20 font-bold text-center md:text-5xl sm:text-4xl text-2xl md-py-6 '>Select The Date Range</h1>
                    <div className='mx-auto'>
                        <CalenderRange />
                    </div>

                    <div className='p-6'>
                        <button className='bg-red-800 text-white text-xl w-[200px] rounded-full font-medium my-6 mx-auto py-3'>SUBMIT</button>
                    </div>
                
                </div>
            </div>
        )
    }

export default Body