import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';


const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_ANON_KEY as string
);


export async function POST(req: Request) {
  try {

    const { workspace_owner, title, icon_id, data, in_trash, logo, banner_url } = await req.json();

  
    const { data: workspaceData, error } = await supabase
      .from('workspaces')
      .insert([
        {
          workspace_owner,
          title,
          icon_id,
          data,
          in_trash,
          logo, 
          banner_url,
        },
      ])
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }


    return NextResponse.json(workspaceData, { status: 200 });
  } catch (error) {

    return NextResponse.json({ error: 'Failed to create workspace' }, { status: 500 });
  }
}


export async function GET() {
  try {
    const { data: workspaces, error } = await supabase
      .from('workspaces')
      .select('*');

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(workspaces, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to retrieve workspaces' }, { status: 500 });
  }
}
