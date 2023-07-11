import React, { Component } from 'react'

class Form extends Component {
    render(){
        return(
            <div>
                <h3 className="text-4xl text-center my-16">Channel Statistics</h3>
                <form class="w-full max-w-xl mx-auto">
                <div class="flex items-center border-b border-red-800 py-2">
                <input class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" 
                type="text" placeholder="Enter Channel URL" aria-label="Full name"/>
                </div>
                </form>
            </div>

        )
    }
}

export default Form