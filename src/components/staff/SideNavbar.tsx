"use client"

import React, { useState } from 'react';
import { Nav } from '@/components/ui/nav';
import { useWindowWidth } from '@react-hook/window-size';
import { LayoutDashboard, UsersRound, Settings, MessageSquareWarning, Users2Icon, BusFrontIcon, AlertCircleIcon, AlertTriangle } from 'lucide-react';


type Props = {};

export default function SideNavbar({}: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDriverBSelected, setIsDriverBSelected] = useState(true); // State to track the selected driver icon

  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  function toggleDriverIcon() {
    setIsDriverBSelected(!isDriverBSelected);
  }

  return (
    <div className="relative min-w-[80px] border-r px-3 pb-10 pt-20 pr-15">
      {!mobileWidth && (
        <div className="absolute top-7">
          <div className="flex items-center pl-5">
            <button className="mr-4" onClick={toggleSidebar}>
              <MenuIcon className="h-6 w-6 text-black-600 dark:text-gray-400" />
            </button>
            {!isCollapsed && <h1>Menu</h1>}
          </div>
        </div>
      )}
      <Nav
        isCollapsed={mobileWidth ? true : isCollapsed}
        links={[
          {
            title: 'Dashboard',
            href: '/Application/Staff',
            icon: LayoutDashboard,
            variant: 'default',
          },
          {
            title: 'Students',
            href: '/Application/Staff/Student',
            icon: UsersRound,
            variant: 'ghost',
          },
          {
            title: 'Drivers',
            href: '/Application/Staff/Drivers',
            icon: Users2Icon,// Render the selected driver icon based on state
            variant: 'ghost',
          },
          {
            title: 'Reports',
            href: '/Application/Staff/Reports',
            icon: MessageSquareWarning,
            variant: 'ghost',
          },
          {
            title: 'Bus',
            href: '/Application/Staff/Bus',
            icon: BusFrontIcon,
            variant: 'ghost',
          },
          {
            title: 'Issues',
            href: '/Issues',
            icon: AlertTriangle,
            variant: 'ghost',
          },
          {
            title: 'Settings',
            href: '/settings',
            icon: Settings,
            variant: 'ghost',
          },
      
        ]}
      />
     
    </div>
  );
}

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
