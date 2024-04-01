import PuffLoader from 'react-spinners/PuffLoader';
import { LoaderSizeProps } from 'react-spinners/helpers/props';

export default function QuerySpinner(props: LoaderSizeProps) {
  return (
    <div className="w-full flex justify-center">
      <PuffLoader {...props} />
    </div>
  );
}
