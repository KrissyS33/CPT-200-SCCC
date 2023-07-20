import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Papa from 'papaparse'
import LineChart from "../components/LineChart"
import Chart from "chart.js/auto"


const GraphForm = () => {
    const [headerFile, setHeaderFile] = useState("")
    const [linesFile, setLinesFile] = useState("")
    var [headContent, setHeadContent] = useState([])
    var [linesContent, setLinesContent] = useState([])
    var [gData, setGData] = useState({
        labels: ['temp'],
        datasets: [
            {
                label: 'temp',
                data: [1]
            }
        ]
    })
    var [dataNumbers, setDataNumbers] = useState([])
    var [days, setDays] = useState([])
    var [labels, setLabels] = useState([])
    var [loopBreaker, setLoopBreaker] = useState(false)


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
            setLoopBreaker(false)
        }
    })

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
                // setHeadContent(results.data)
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
                // setLinesContent(results.data)
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
        <div>
            <form id="formContent" onSubmit={handleSubmit}>
                <h1>Upload Header and Lines files</h1>

                <input type="file" id="headerFile" onChange={handleHeaderChange}></input>
                <input type="file" id="linesFile" onChange={handleLinesChange}></input>
                <button type="submit" onSubmit={handleSubmit}>Submit</button>
            </form>
            <div id="graphHold" style={{visibility: "hidden"}}>
                <LineChart 
                    chartData={gData}
                    options= {{
                        title:{
                            display:true,
                            text:'Your Data',
                            fontSize:20
                        },
                        legend:{
                            display:true,
                            position:'right'
                        }
                    }}
                />
            </div>
        </div>
    )
}

export default GraphForm