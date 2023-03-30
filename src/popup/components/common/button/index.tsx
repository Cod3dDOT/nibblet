export type ButtonProps = React.DetailedHTMLProps<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	HTMLButtonElement
>;

export const Button: React.FC<ButtonProps> = ({ className = '', ...rest }) => {
	return (
		<button
			className={`leading-none text-md transition-colors rounded-md flex flex-col items-center justify-center ${className}`}
			{...rest}
		>
			{rest.children}
		</button>
	);
};
