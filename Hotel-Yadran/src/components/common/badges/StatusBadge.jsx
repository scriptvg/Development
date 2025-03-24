import { Badge } from 'react-bootstrap';
import { statusList } from '../../../config/constants/constants';

export const StatusBadge = ({ status }) => {
  const statusConfig = statusList.find(s => s.value === status) || {};
  return (
    <Badge 
      bg={statusConfig.variant || 'secondary'}
      className="px-3 py-2 rounded-pill text-uppercase"
    >
      {statusConfig.label || 'N/A'}
    </Badge>
  );
};