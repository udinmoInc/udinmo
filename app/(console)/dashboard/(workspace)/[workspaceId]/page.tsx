
import { createClient } from "@/lib/supabase/server";
import UserGreeting from "@/components/workspace/use-greeting";

const WorkspacePage = async () => {

  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  const user = {
    name: data.user?.user_metadata.full_name || "Unknown User",
    email: data.user?.email ?? "",
  };

  return (
    <div className="p-8 space-y-6">
      
      <UserGreeting user={user} />

      
    </div>
  );
};

export default WorkspacePage;
