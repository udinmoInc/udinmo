import SetupWorkspace from "@/components/user/onboarding/Setup-Workspace";
import { createClient } from "@/lib/supabase/server";
import React from "react";

const OnboadingPage = async () => {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return <div>Not logged in</div>;

  return (
    <div className="flex justify-center items-center h-screen ">
      <SetupWorkspace user={user} />
    </div>
  );
};

export default OnboadingPage;
