"use client";

import { logout } from "@/app/actions/auth-actions";

const LogoutBtn = () => {
  const handleLogout = async () => {
    await logout(); 
  };

  return (
    <div>
      <span
        onClick={handleLogout}
        className="inline-block w-full cursor-pointer text-destructive"
      >
        Logout
      </span>
    </div>
  );
};

export default LogoutBtn;
