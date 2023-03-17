import React from 'react'

export default function ColorBox({
    color,
    text
}) {
    return (
        <span style={
            {
                margin: '10px',
                display: 'flex',
                flexDirection: 'column',
            }
        }>
      
            <span style={{
                fontWeight: 'bold',
            }}>
                {text}
            </span>
            <span style={{
                backgroundColor: color,
                width: '50px',
                height: '50px',
                display: 'flex',
            }} />
        </span>
    )
}
