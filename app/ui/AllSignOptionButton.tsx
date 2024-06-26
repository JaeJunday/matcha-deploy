import { ButtonType } from '../redux/types';
import { DirectionSVG } from '../svg';
import BlueHyperLink from './BlueHyperLink';

function AllSignOptionButton({ onClick }: ButtonType) {
  return (
    <div className="absolute flex top-1 left-1 w-4 h-4">
      <div className="flex items-start">
        <div className="mt-1 mr-1 text-blue-700">
          <DirectionSVG direction="left" size="3" />
        </div>
        <div className="text-light text-sm whitespace-nowrap size-0">
          <BlueHyperLink onClick={onClick} text="all sign option" />
        </div>
      </div>
    </div>
  );
}

export default AllSignOptionButton;
