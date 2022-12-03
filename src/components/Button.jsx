const Button = (props) => {
  return <button className={props.styles}>{props.name}</button>;
};

Button.defaultProps = {
  name: "Button",
  styles:
    "w-20 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg py-2.5",
};

export default Button;
