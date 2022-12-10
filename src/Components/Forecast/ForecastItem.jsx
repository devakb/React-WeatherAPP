import React from 'react'

export default function ForecastItem({className="", active = false, title = "", icon ="", max= 0, min = 0, tempUnit = "F"}) {
  return (
    
        <div className={`px-1 ${className}`}>            
            <div className={`flex shadow-md flex-col items-center text-center py-2 rounded-lg ${active && "bg-sky-700 text-white"}`}>
                <p className="mb-2 text-sm">{title}</p>
                <img className="mb-2" src={icon} />
                <p className="mb-2 text-sm">Temp</p>
                <p className="text-base">{max} / {min} <sup>°{tempUnit}</sup></p>
            </div>
        </div>

  )
}
