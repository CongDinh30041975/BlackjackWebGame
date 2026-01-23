function Button({
    children,
    variant = "primary",
    size = "md",
    disabled = false,
    onClick,
    type = "button",
    }) {
    return (
        <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        className={`btn btn-${variant} btn-${size}`}
        >
        {children}
        </button>
    );
}

export default Button;