"use client";
import { useEffect, useState } from "react";

type UserGreetingProps = {
  user: {
    name: string;
  };
};

const UserGreeting = ({ user }: UserGreetingProps) => {
  const [greeting, setGreeting] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [dateTime, setDateTime] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
  
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        
        const timeZone = data.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone;
        setCountry(data.country_name || "your country");

        const now = new Date().toLocaleString("en-US", { timeZone });
        const hour = new Date(now).getHours();

        if (hour < 12) {
          setGreeting("Good Morning");
        } else if (hour < 18) {
          setGreeting("Good Afternoon");
        } else {
          setGreeting("Good Evening");
        }

        const interval = setInterval(() => {
          const currentTime = new Date().toLocaleString("en-US", {
            timeZone,
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit", 
          });
          setDateTime(currentTime);
        }, 1000); 

        
        return () => clearInterval(interval);
      } catch (error) {
        console.error("Failed to fetch location/time:", error);
        setGreeting("Hello");
        setDateTime(new Date().toLocaleString());
      }
    };

    fetchData();
  }, []);

  const gradientClass =
    "bg-gradient-to-r from-indigo-400 via-sky-400 to-teal-400 dark:from-purple-300 dark:via-indigo-400 dark:to-cyan-300 text-transparent bg-clip-text";

  return (
    <div className="p-4 space-y-2">
      <div className="text-3xl font-semibold text-gray-800 dark:text-gray-100 cursor-default">
        {greeting},{" "}
        <span
          className={`${gradientClass} transition-transform duration-300 hover:scale-[1.10] inline-block`}
        >
          {user.name || "Guest"}
        </span>{" "}
        from {" "}
        <span
          className={`${gradientClass} transition-transform duration-300 hover:scale-[1.10] inline-block`}
        >
          {country}
        </span>!
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-400">
        {dateTime} 
      </div>
    </div>
  );
};

export default UserGreeting;
