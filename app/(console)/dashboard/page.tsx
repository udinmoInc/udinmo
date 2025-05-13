

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

const DashboardPage = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return <div>Not logged in</div>;

  // Get user session token for authorization (optional depending on GraphQL server)
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const token = session?.access_token;

  const graphqlQuery = {
    query: `
      query GetUserWorkspace($ownerId: String!) {
        getWorkspaces {
          id
          workspaceOwner
        }
      }
    `,
    variables: {
      ownerId: user.id,
    },
  };

  const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/dev/v2/connect/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }), // Optional if you need secure access
    },
    body: JSON.stringify(graphqlQuery),
  });

  const result = await response.json();

  if (!result.data || !result.data.getWorkspaces) {
    return <div>Error fetching workspace</div>;
  }

  const workspace = result.data.getWorkspaces.find(
    (ws: any) => ws.workspaceOwner === user.id
  );

  if (!workspace) redirect("/onboarding");

  redirect(`/dashboard/${workspace.id}`);
};

export default DashboardPage;
