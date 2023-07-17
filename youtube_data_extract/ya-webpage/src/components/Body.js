import React from 'react'

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

                    <div>
                        <div>
                            <label>Insert header file</label>
                            <input type="file" id="fileGraphHeader" name="fileGraphHeader"/>
                        </div>
                        <div>
                            <label>Insert lines file</label>
                            <input type="file" id="fileGraphLines" name="fileGraphLines"/>
                        </div>
                        <div className='p-20'>
                                <button type="button" id="runButton">SUBMIT</button>
                         </div>
                    </div>
                    <div 
                        dangerouslySetInnerHTML={{__html:
                        `
                        <py-script>
                        import os
                        import pandas as pd
                        import plotly.express as px
                        from js import document, FileReader
                        from pyodide.ffi import create_proxy
                        import asyncio
                        
                        # Global Scope, ready to hold csv
                        dataContent, metrics  = None, None
                  
                        # Create Python Proxy's
                        def main():
                            function_proxy = create_proxy(runGraph)
                            header_proxy = create_proxy(grabHeader)
                            lines_proxy = create_proxy(grabLines)
                    
                            e = document.getElementById("runButton")
                            e.addEventListener("click", function_proxy)
                            b = document.getElementById("fileGraphHeader")
                            b.addEventListener("change", header_proxy)
                            c = document.getElementById("fileGraphLines")
                            c.addEventListener("change", lines_proxy)
                        
                        # Grab header content
                        async def grabHeader(event):
                            fileList = event.target.files
                            metrics = fileList[0]
                        
                        # Grab lines content
                        async def grabLines(event):
                            fileList = event.target.files
                            dataContent = fileList[0]
                  
                        # Creates graph
                        def runGraph(event):
                            # Convert the 'day' column to datetime format
                            dataContent['day'] = pd.to_datetime(data['day'])
                        
                            # Set 'day' as the DataFrame index
                            dataContent.set_index('day', inplace=True)
                    
                            for i in range(len(metrics)):
                                if i != 0:
                                    metric = metrics[i]
                                    fig = px.line(dataContent, x=dataContent.index, y=metric, title=metric, labels={'x': 'Day', 'y': 'Count'}, color_discrete_sequence=[colors[i]])
                                    fig.update_traces(mode='markers+lines', marker=dict(size=8))
                                    fig.update_layout(xaxis_tickformat='%b %d, %Y', hovermode='x')
                                    chartNum = f"chart{i+1}"
                                    js.plot(fig.to_json(), chartNum)
                  
                        main()
                        </py-script>
                        `
                        }}
                        />
                    <div>
                        <div id="chart1"></div>
                        <div id="chart2"></div>
                        <div id="chart3"></div>
                        <div id="chart4"></div>
                        <div id="chart5"></div>
                        <div id="chart6"></div>
                        <div id="chart7"></div>
                        <div id="chart8"></div>
                        <div id="chart9"></div>
                        <div id="chart10"></div>
                        <div id="chart11"></div>
                    </div>
                </div>
            </div>
        )
    }

export default Body
