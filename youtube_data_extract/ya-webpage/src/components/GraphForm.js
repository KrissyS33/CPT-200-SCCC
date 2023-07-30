import React, {useState, useEffect} from 'react'
import Papa from 'papaparse'
import LineChart from "../components/LineChart"
import Chart from "chart.js/auto"

const GraphForm = () => {
    // Interacts with files
    var [headerFile, setHeaderFile] = useState("")
    var [linesFile, setLinesFile] = useState("")
    var [gData, setGData] = useState({
        labels: ['temp'],
        datasets: [
            {
                label: 'temp',
                data: [1]
            }
        ]
    })

    // Used to manage information
    var [dataNumbers, setDataNumbers] = useState([])
    var [days, setDays] = useState([])
    var [labels, setLabels] = useState([])
    var [loopBreaker, setLoopBreaker] = useState(false) // LoopBreaker is not ideal, but it is a stopgap solution used to stop useEffect from running infinitely

    // When detecting changes in any of the states/components above, this is run. When all criteria are met, we can generate a graph
    useEffect(() => {
        if((dataNumbers.length > 0) && (days.length > 0) && (labels.length > 0) && (loopBreaker)) {
            console.log(dataNumbers)
            console.log(days)
            console.log(labels)
            // Construct data for gData
            var constructedDataSet = []
            for (let i = 0; i < labels.length; i++) {
                constructedDataSet.push({
                    label: labels[i],
                    data: dataNumbers[i]
                }) 
            }
            
            console.log(constructedDataSet)

            // Load the data into gData
            setGData({
                labels: days,
                datasets: constructedDataSet
            })
            document.getElementById("graphHold").style.visibility = "visible"

            // Reset various states and content.
            setLoopBreaker(false)
            setDays([])
            setLabels([])
            setDataNumbers([])

            // Trying to reinput a file with the exact same name back to back will not work. Reset the input fields altogether to fix this issue.
            document.getElementById("formContent").reset()
        }
    })

    // Handle resizing the graph. Graph may overflow when there is major difference between height and width in window.
    const handleResize = (chart) => {
        chart.resize(chart.width, "100%");
    }

    // Event handling when a header is uploaded
    function handleHeaderChange(event) {
        const content = event.target.files[0]
        setHeaderFile(content)
        console.log(content)
    }

    // Event handling when a lines file is uploaded
    function handleLinesChange(event) {
        const content = event.target.files[0]
        setLinesFile(content)
        console.log(content)
    }

    // Activates upon pressing submit button. USE ONLY WHEN FILES ARE ALREADY UPLOADED FOR INTENDED RESULTS
    function handleSubmit(event) {
        // Get some basic variables to hold intermediate data, as well as turn on loopBreaker.
        setLoopBreaker(true)
        event.preventDefault()
        var xdataNumbers = []
        var xdays = []
        var xlabels = []

        // Parse header file, then use the data after its parsed
        Papa.parse(headerFile, {
            skipEmptyLines: true,
            complete: function(results) {
                console.log(results.data)

                // Insert obtained data into a list
                for (let i = 1; i < results.data[0].length; i++) {
                    xlabels.push(results.data[0][i])
                }
                console.log(xlabels)
                setLabels(xlabels)
            }
        })

        // Parse lines file, then use the data after its parsed
        Papa.parse(linesFile, {
            skipEmptyLines: true,
            complete: function(results) {
                console.log(results.data)

                // Set up information in a way thats easier to utilize
                // Firstly, pre-create lists equal to number of entries.
                for (let i = 1; i < results.data[0].length; i++) {
                    xdataNumbers.push([])
                }
                

                // Get days and labels
                for (let i = 0; i < results.data.length; i++) {
                    for (let j = 0; j < results.data[i].length; j++) {
                        if (j == 0) {
                            xdays.push(results.data[i][j])
                        }
                        else {
                            xdataNumbers[j-1].push(parseInt(results.data[i][j]))
                        }
                    }
                }
                console.log(xdays)
                console.log(dataNumbers)
                setDays(xdays)
                setDataNumbers(xdataNumbers)
            }
        }) 
    }
    
    return (
        <div className="min-w-[80px] mt-[-96px] mb-[10%] min-h-[60%] max-w-[70vw] max-h-full mx-auto justify-center text-center p-8 border-t border-gray-900/40 pb-15">
            <form id="formContent" onSubmit={handleSubmit}>
                <h1 className="p-9 text-3xl font-medium">Graph Your Data</h1>
                <h2 className="text-base font-semibold leading-7 text-gray-900">Upload Header and Lines files (In that order)</h2>

                <input className="mx-[20px] w-[18rem] items-center rounded-md border border-transparent bg-red-600 px-8 py-3 
                text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2" 
                type="file" id="headerFile" onChange={handleHeaderChange}></input>
                <input className="mx-[20px] w-[18rem] items-center rounded-md border border-transparent bg-red-600 px-8 py-3 
                text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                type="file" id="linesFile" onChange={handleLinesChange}></input>
                <button className="m-[20px] w-[18rem] items-center rounded-md border border-transparent bg-red-600 px-8 py-3 
                text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                type="submit" onSubmit={handleSubmit}>Submit</button>
            </form>
            <div id="graphHold" className="relative p-5 w-[65vw] h-[48vh] m-auto" style={{visibility: "hidden"}}>
                <LineChart 
                    className="relative"
                    chartData={gData}
                    options= {{
                        onResize: handleResize,
                        maintainAspectRatio: false,
                        responsive: true,
                        title:{
                            display:true,
                            text:'Your Data',
                            fontSize:20
                        },
                        legend:{
                            display:true,
                            position:'right'
                        },
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }}
                />
            </div>
        </div>
    )
}

export default GraphForm