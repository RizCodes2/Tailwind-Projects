import React from "react"
import { useState, useEffect } from "react"


function Navbar() {

    const [msg, setmsg] = useState("");


    localStorage.setItem("myName", "Rizwan Ali");


    function showvalue() {

        const savedinfo = localStorage.getItem("myName");
        if (savedinfo) {
            console.log("value is " + savedinfo);

        }
        else {
            console.log("There is nothing in the localStorage");
        }

    }
    return (
        <nav className="flex items-center justify-between p-2 bg-amber-300">
            <h1 className="text-black text-[24px] font-bold">Expense Tracker</h1>
            <button onClick={showvalue} className="px-3 py-2 text-white bg-black rounded-lg">+Add</button>
           
        </nav>
    )
}

export default Navbar