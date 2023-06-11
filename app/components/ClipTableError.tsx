import { useAsyncError } from "@remix-run/react";

type ClipTableErrorProps = {
	broadcasterName: string;
};

const ClipTableError = ({ broadcasterName }: ClipTableErrorProps) => {
	const error = useAsyncError() as object;
	return (
		<div className="flex flex-1 justify-center items-center my-4 rounded-md bg-slate-50 border-slate-300 border h-full w-full">
			<p>
				Error loading clips for {broadcasterName}: {error.message}
			</p>
		</div>
	);
};
export default ClipTableError;
