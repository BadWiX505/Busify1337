import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';

const EntityWithHoverCard = ({ entity, isBus = false }) => {
  if (!entity) return null; // Ensure the entity object is not null or undefined

  const statusColor = entity.status === 'active' ? 'bg-green-500' : 'bg-red-500';

  // Function to generate the appropriate page URL based on the role and ID
  const getEntityPageURL = () => {
    return isBus ? `/Bus` : `/drivers`;
  };

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="flex items-center gap-2 cursor-pointer">
          <Link href={getEntityPageURL()} legacyBehavior>
            <a className="flex items-center gap-2">
              <Avatar className="w-8 h-8">
                <AvatarImage alt={entity.full_name || entity.bus_Name} src={entity.image ?? '/placeholder-user.jpg'} />
                <AvatarFallback>{(entity.full_name || entity.bus_Name) ? (entity.full_name || entity.bus_Name)[0] : ''}</AvatarFallback>
              </Avatar>
              <span>{entity.full_name || entity.bus_Name || 'Unknown Entity'}</span>
            </a>
          </Link>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex items-center">
          <div className="relative mr-4">
            <Avatar className="w-16 h-16">
              <AvatarImage alt={entity.full_name || entity.bus_Name} src={entity.image ?? '/placeholder-user.jpg'} />
              <AvatarFallback>{(entity.full_name || entity.bus_Name) ? (entity.full_name || entity.bus_Name)[0] : ''}</AvatarFallback>
            </Avatar>
            {!isBus && (
              <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 h-3 w-3 rounded-full shadow-md ${statusColor}`} />
            )}
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{entity.full_name || entity.bus_Name || 'Unknown Entity'}</h4>
            <p className="text-sm">{entity.email || entity.bus_Status}</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

EntityWithHoverCard.propTypes = {
  entity: PropTypes.object.isRequired,
  isBus: PropTypes.bool,
};

export default EntityWithHoverCard;
