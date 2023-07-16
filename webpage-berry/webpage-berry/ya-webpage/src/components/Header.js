import React, {useState} from 'react'
import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai'

function Header(){
    const[nav, setNav] = useState(false)

    const handleNav = () => {
        setNav(!nav)
    }


    return(
        <header className="flex justify-between items-center h-24 mx-auto px-4 bg-red-800">
            <h1 className="w-full text-4xl font-bold text-[#ffffff]">YouAnalytics</h1>
            <ul className='hidden md:flex'>
                <li className='p-4 text-white'>Home</li>
                <li className='p-4 text-white'>Resources</li>
                <li className='p-4 text-white'>About</li>
                <li className='p-4 text-white'>Contact</li>
            </ul>
            <div onClick={handleNav} className='block md:hidden'>
                {nav ? <AiOutlineClose size={30}/> : <AiOutlineMenu size={30} />}
            </div>
            <div className={nav ? 'fixed left-0 top-0 w-[60%] h-full border-r-red-800 bg-red-800 ease-in-out duration-500' : 'fixed left-[-100%]'}>
                <h1 className="w-full text-4xl font-bold m-4 text-[#ffffff]">YouAnalytics</h1>
                <ul className='uppercase'>
                    <li className='p-4 border-b text-white'>Home</li>
                    <li className='p-4 border-b text-white'>Resources</li>
                    <li className='p-4 border-b text-white'>About</li>
                    <li className='p-4 text-white'>Contact</li>
                </ul>
            </div>
        </header>
    )
}

export default Header