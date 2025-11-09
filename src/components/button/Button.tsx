import "../../index.css";
import "./Button.css";
import { Link } from "react-router-dom";


const STYLES = ["btn--primary", "btn--outline", "gBtn--primary", "gBtn--outline"];
const SIZES = ["btn--medium", "btn--large"];

export const Button = ({
    children,
    type,
    btnType,
    btnStyle,
    onClick,
    btnSize,
    path,
}) => {
    
    const checkButtonStyle = STYLES.includes(btnStyle)? btnStyle: STYLES[0];
    const checkButtonSize = SIZES.includes(btnSize)? btnSize: SIZES[0];

    return(
        <Link to={path}>
            <button 
            className={`${btnType} ${checkButtonStyle} ${checkButtonSize}`}
            onClick={onClick}
            type={type}
            >
                {children}
            </button>
        </Link>
    )
}