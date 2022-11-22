import { RiSettings4Fill } from 'react-icons/ri';

import { Button } from '~components';

interface WrapperProps {
	children?: React.ReactNode;
}

export const Wrapper: React.FC<WrapperProps> = ({ children }) => {
	return (
		<div className="w-[30rem] bg-dark-primary-dark p-6">
			<div className="w-full flex justify-between mb-4">
				<h1 className="text-xl font-semibold">ExploitUtils DEV</h1>
				<Button>
					<RiSettings4Fill className="text-xl" />
				</Button>
			</div>
			<div className="bg-dark-primary rounded-md w-full">{children}</div>
		</div>
	);
};
