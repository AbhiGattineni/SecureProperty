import { useState } from "react";
import './styles.css';

const Index = (props) => {
    const [focused, setFocused] = useState(false);
    const { errorMessage, onChange, id, ...inputProps } = props;

    const handleFocused = (e) => {
        setFocused(true);
    };
    return (
        <div className="mx-5">
            <input {...inputProps} onChange={onChange} onBlur={handleFocused} onFocus={() => inputProps.name === "repassword" && setFocused(true)} focused={focused.toString()} className="w-full px-2 py-2 border-2 border-gray-500 rounded-lg" />
            <span className="text-red-500">{errorMessage}</span>
        </div>
    )
}

Index.defaultProps = {
    type: 'text',
    label: 'text',
}

export default Index;
