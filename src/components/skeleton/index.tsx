import { CSSProperties, Fragment } from 'react';

interface SkeletonProps {
	className?: string;
	count?: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
	className = '',
	count = 1
}) => {
	const els = [];
	for (let i = 0; i < count; i++) {
		const delay = 20 * i;
		els.push(
			<span
				key={`skeleton-${i}`}
				className={`bg-dark-primary relative block leading-none
                            after:bg-gradient-to-r after:from-dark-primary after:via-dark-primary-light
                            overflow-hidden [z-index:1]
                            after:absolute after:block
                            after:h-full after:inset-x-0 after:top-0
                            after:animate-skeleton after:bg-no-repeat
                             ${className}`}
				style={{ '--animationDelay': `${delay}ms` } as CSSProperties}
			/>
		);
	}
	return <Fragment>{els}</Fragment>;
};
