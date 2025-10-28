'use client';

import useAuth from '@/hooks/useAuth';
import AdminSideBar from '@/ui/adminComponent/sideBar';
import { useEffect, useState } from 'react';

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  useAuth();
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      try {
        const parse = JSON.parse(userJson);
        setUserName(parse.name ?? null);
      } catch {
        setUserName(null);
      }
    }
  }, []);

  return (
    <>
      <div className="flex">
        <AdminSideBar />
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between w-full py-3 max-h-[60px] px-1 sm:px-12">
            <h2 className="text-[18px] sm:text-xl font-medium">
              Admin panel
            </h2>
            <div className="flex items-center flex-col">
              {/* <UserCircleIcon className="w-5 h-5" /> */}
              <p className="font-medium">{userName ? `Welcome, ${userName}` : 'Admin'}</p>
            </div>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
