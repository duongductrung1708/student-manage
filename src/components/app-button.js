export const AppButton = ({ color, className, children, ...otherProps }) => {
    let buttonClassName = 
    "text-white px-4 py-2 text-sm rounded-full cursor-pointer"
    if (color === "black") {
        buttonClassName += " bg-black";
    } else if (color === "white") {
        buttonClassName += " bg-white text-black";
    }
    if (className) {
        buttonClassName += " " + className;
    }
    return (
    <button className={buttonClassName} {...otherProps}>
        {children}
    </button>
    );
};