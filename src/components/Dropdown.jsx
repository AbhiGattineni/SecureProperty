import React from 'react'

const Dropdown = (props) => {
    return (
        <div>
            <select onChange={props.onChange}>
                <option defaultValue="" className={props.styles}></option>
                {props.array.map((arrays) => (
                    <option>
                        {arrays.opt}
                    </option>
                ))}
            </select>
        </div>
    )
}

Dropdown.defaultProps = {
    styles : 'rounded-lg',
    array : [{
        opt : "1st element",
    },
    {
        opt : "2st element",
    },
    {
        opt : "3st element",
    },
]
}

export default Dropdown