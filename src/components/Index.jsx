const Index = (props) => {
    return (
        <input type={props.type} placeholder={props.Label} className={props.styles}></input>
    )
}

Index.defaultProps = {
    type : 'text',
    Label : 'text',
}

export default Index;
