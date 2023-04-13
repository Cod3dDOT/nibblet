interface ErrorWindowProps {
	message: string;
}

export const ErrorWindow: React.FC<ErrorWindowProps> = ({ message }) => {
	return (
		<div className="py-8 px-8 text-center align-middle">
			<p className="text-lg mb-4">Oops! We cra2h3d...</p>
			<p>{message}</p>
		</div>
	);
};
