import React from 'react';
import PropTypes from 'prop-types';
import AvatarWithHoverCard from './AvatarWithHoverCard';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components//ui/hover-card';

const TableRow = ({ report, formatDate, formatTime }) => {
  const isLongComment = report.comment ?(report.comment.length > 40) : false;



  return (
    <tr className="border-b border-gray-200 dark:border-gray-700 group">
      <td className="px-4 py-3">{formatDate(report.createdAt)}</td>
      <td className="px-4 py-3">{formatTime(report.createdAt)}</td>
      <td className="px-4 py-3">{report.reason}</td>
      <td className={`px-4 py-3 ${isLongComment ? 'pl-0' : ''}`}>
        {isLongComment ? (
          <HoverCard>
            <HoverCardTrigger asChild>
              <div className="pr-4 py-3 hover:underline cursor-pointer">
                {`${report.comment.substring(0, 30)}...`}
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="max-w-[100] p-4">
              <div className="max-w-xs">{report.comment}</div>
            </HoverCardContent>
          </HoverCard>
        ) : (
          <div>{report.comment}</div>
        )}
      </td>
      <td className="px-4 py-3 hover:underline cursor-pointer">
        <AvatarWithHoverCard user={report.reporter} />
      </td>
      <td className="px-4 py-3 hover:underline cursor-pointer">
        <AvatarWithHoverCard user={report.reportedUser} />
      </td>
    </tr>
  );
};

TableRow.propTypes = {
  report: PropTypes.object.isRequired,
  formatDate: PropTypes.func.isRequired,
  formatTime: PropTypes.func.isRequired,
};

export default TableRow;
