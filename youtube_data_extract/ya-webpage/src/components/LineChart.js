import { Line } from "react-chartjs-2"
import { React, useState, useEffect } from "react"

function LineChart({ chartData, options }) {
    const [state, setState] = useState(
        chartData
    )

    useEffect(() => {
        setState(chartData)
    }, [chartData])

    return (
        <div>
            <Line
                data={state}
                options={options}
            />
        </div>
    )
}

export default LineChart