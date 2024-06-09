import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link'; // Import Link from Next.js
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';

const AvatarWithHoverCard = ({ user }) => {
  const statusColor = user.status === 'active' ? 'bg-green-500' : 'bg-red-500';

  // Function to generate the appropriate user page URL based on their role and ID
const getUserPageURL = () => {
  let url = '';
  let id=user.id_User;
  if (user.role === 'driver') {
    url = '/drivers';
  } else if (user.role === 'student') {
    url = '/Student';
  } else {
    url = '/report';
  }
  // Append the user ID to the URL
  return `${url}?id=${id}`;
};


  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Link href={getUserPageURL()}> {/* Wrap the avatar in a Next.js Link component */}
          <a className="flex items-center gap-2">
            <Avatar className="w-8 h-8">
              <AvatarImage alt={user.full_name} src={user.image ?? '/placeholder-user.jpg'} style={{ width: '50px', height: '50px' }} />
              <AvatarFallback>{user.full_name[0]}</AvatarFallback>
            </Avatar>
            <span>{user.full_name}</span>
          </a>
        </Link>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex items-center">
          <div className="relative mr-4">
            <Avatar>
              <AvatarImage alt={user.full_name} src={user.image ?? '/placeholder-user.jpg'} style={{ width: '50px', height: '50px' }} />
              <AvatarFallback>{user.full_name[0]}</AvatarFallback>
            </Avatar>
            <div className={`absolute right-0 transform translate-x-1/2 top-0.4 h-2 w-2 rounded-full shadow-md ${statusColor}`} />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{user.full_name}</h4>
            <p className="text-sm">{user.email}</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

AvatarWithHoverCard.propTypes = {
  user: PropTypes.object.isRequired,
};

export default AvatarWithHoverCard;
