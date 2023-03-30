import { Spinner } from '@components/common/spinner';

export const LoadingWindow: React.FC = () => {
	return (
		<div className="py-8 px-3 text-center align-middle">
			<Spinner />
		</div>
	);
};
