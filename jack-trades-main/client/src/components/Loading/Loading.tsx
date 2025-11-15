import CircularProgress from '@mui/material/CircularProgress';
import { ILoadingProps } from '../../interfaces';

const Loading = ({ className } : ILoadingProps) => (
  <div className={className}>
    <CircularProgress />
  </div>
);

export default Loading;
