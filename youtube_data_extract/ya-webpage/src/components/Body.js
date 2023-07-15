import React from 'react'
import CalenderRange from './CalenderRange'


const Body = () => {
        return (
            <div className='text-black'>
                <div className ='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
                    
                    <form action = "/api">
                    <h1 className ='font-bold text-center md:text-5xl sm:text-4xl text-2xl md-py-6 '>Select What You Want to Track</h1>
                    <div className='items-center pl-4 pt-10'>
                        <input type="checkbox" id="req1" name="request1" value="views" className='w-6 h-6'/>
                        <label htmlFor='view-checkbox' className='ml-2 text-xl font-medium'>VIEWS </label>

                        <input type="checkbox" id="req2" name="request2" value="comments" className='w-6 h-6'/>
                        <label htmlFor='view-checkbox' className='ml-2 text-xl font-medium'>COMMENTS </label>

                        <input type="checkbox" id="req3" name="request3" value="likes" className='w-6 h-6'/>
                        <label htmlFor='view-checkbox' className='ml-2 text-xl font-medium'>LIKES </label>

                        <input type="checkbox" id="req4" name="request4" value="dislikes" className='w-6 h-6'/>
                        <label htmlFor='view-checkbox' className='ml-2 text-xl font-medium'>DISLIKES </label>

                        <input type="checkbox" id="req5" name="request5" value="estimatedMinutesWatched" className='w-6 h-6'/>
                        <label htmlFor='view-checkbox' className='ml-2 text-xl font-medium'>ESTIMATED MINUTES WATCHED </label>

                        <input type="checkbox" id="req6" name="request6" value="averageViewDuration" className='w-6 h-6'/>
                        <label htmlFor='view-checkbox' className='ml-2 text-xl font-medium'>AVERAGE VIEW DURATION </label>

                        <input type="checkbox" id="req7" name="request7" value="subscribersGained" className='w-6 h-6'/>
                        <label htmlFor='view-checkbox' className='ml-2 text-xl font-medium'>SUBSCRIBERS GAINED </label>

                        <input type="checkbox" id="req8" name="request8" value="subscribersLost" className='w-6 h-6'/>
                        <label htmlFor='view-checkbox' className='ml-2 text-xl font-medium'>SUBSCRIBERS LOST </label>

                        <input type="checkbox" id="req9" name="request9" value="shares" className='w-6 h-6'/>
                        <label htmlFor='view-checkbox' className='ml-2 text-xl font-medium'>SHARES </label>

                        <input type="checkbox" id="req10" name="request10" value="annotationClickThroughRate" className='w-6 h-6'/>
                        <label htmlFor='view-checkbox' className='ml-2 text-xl font-medium'>ANNOTATION CLICK THROUGH RATE </label>

                        <input type="checkbox" id="req11" name="request11" value="annotationCloseRate" className='w-6 h-6'/>
                        <label htmlFor='view-checkbox' className='ml-2 text-xl font-medium'>ANNOTATION CLOSE RATE </label>
                    </div>

                    </form>
                
                </div>
            </div>
        )
    }

export default Body
