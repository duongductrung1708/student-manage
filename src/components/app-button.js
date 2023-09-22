export const AppButton = ({ color, className, children, ...otherProps }) => {
    let buttonClassName = 
    "px-4 py-2 text-sm rounded-full cursor-pointer"
    if (color === "black") {
        buttonClassName += " bg-black text-white ";
    } else if (color === "white") {
        buttonClassName += " bg-white text-black";
    } else if (color === "gray") {
        buttonClassName += " bg-gray-500 text-black";
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