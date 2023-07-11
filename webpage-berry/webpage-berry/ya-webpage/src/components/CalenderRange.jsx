import {useEffect, useRef, useState} from 'react'
import { DateRange } from 'react-date-range'
import format from 'date-fns/format'
import { addDays } from 'date-fns'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'



const CalenderRange = () => {
    
    const [range, setRange] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: 'selection'            
        }
    ])

    //open and clost the calendar
    const [open, setOpen] = useState(false)
    
    const refOne = useRef(null)

    //save current date on refresh
    useEffect(() =>{
        
        document.addEventListener('keydown', hideOnEscape, true)
        document.addEventListener('keydown', hideOnClickOutside, true)
    }, [])

    //hide calendar on ESC keypress
    const hideOnEscape = (e) => {
        if( e.key === 'Escape') {setOpen(false)}
    }

    //hide calendar on clicking outside of area
    const hideOnClickOutside = (e) => {
        if(refOne.current && ! refOne.current.contains(e.target)){setOpen(false)}
    }

    return (
    <div className='calendarWrap'>
        <input
            value={`${format(range[0].startDate, 'MM/dd/yyy')} to ${format(range[0].endDate, 'MM/dd/yyyy')}`}
            readOnly
            className='inputBox'
            onClick={ () => setOpen(open => !open)}
        />

        <div ref={refOne}>
            {open &&
                <DateRange
                    onChange={item => setRange([item.selection])}
                    editableDateInputs={true}
                    moveRangeOnFirstSelection={false}
                    ranges={range}
                    months={2}
                    direction='horizontal' 
                    className='calendarElement'
                />
        }
        </div>
        
    </div>
  )
}

export default CalenderRange