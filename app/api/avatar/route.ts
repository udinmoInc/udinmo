import { NextResponse } from 'next/server';

const AVATAR_API_URL = 'https://cdn.udinmo.net.in/avatar/generate_avatar.php';
const BASE_URL = 'https://cdn.udinmo.net.in'; 

const handleAvatarFetch = async (url: string, expectSVG: boolean = true) => {
    try {
  
        const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;

        const response = await fetch(fullUrl, { redirect: 'manual' });

        if (response.status === 302) {
            const location = response.headers.get('Location');
            return NextResponse.redirect(location!, 302);
        }

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Avatar API error: ${response.status} ${response.statusText}`, errorText);
            return new NextResponse(JSON.stringify({ error: 'Failed to fetch avatar' }), {
                status: response.status,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const contentType = response.headers.get('Content-Type') || (expectSVG ? 'image/svg+xml' : 'application/json');
        const body = expectSVG ? await response.text() : await response.blob();

        return new NextResponse(body, {
            status: 200,
            headers: { 'Content-Type': contentType },
        });
    } catch (error: any) {
        console.error('Error fetching avatar:', error);
        return new NextResponse(JSON.stringify({ error: 'Internal error: ' + error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const initial = searchParams.get('initial');
    const color = searchParams.get('color');
    const userid = searchParams.get('userid');
    const apiKey = process.env.API_KEY;
    const clientKey = process.env.CLIENT_KEY;

    if (!apiKey || !clientKey) {
        return new NextResponse(JSON.stringify({ error: 'API key or client key is missing.' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    if (userid) {
        const url = `${AVATAR_API_URL}?userid=${userid}&api_key=${apiKey}&client_key=${clientKey}`;
        return await handleAvatarFetch(url, false);
    } else if (initial && color) {
        const url = `${AVATAR_API_URL}?initial=${initial}&color=${color}&api_key=${apiKey}&client_key=${clientKey}`;
        return await handleAvatarFetch(url, true);
    } else {
        return new NextResponse(JSON.stringify({ error: 'Missing parameters: use "userid" or both "initial" and "color".' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function POST(request: Request) {
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const apiKey = process.env.API_KEY;
    const clientKey = process.env.CLIENT_KEY;

    if (!apiKey || !clientKey) {
        return new NextResponse(JSON.stringify({ error: 'API key or client key is missing.' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    if (!name || !email) {
        return new NextResponse(JSON.stringify({ error: 'Name and email are required.' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const response = await fetch(AVATAR_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                name,
                email,
                api_key: apiKey,
                client_key: clientKey,
            }).toString(),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Avatar API (POST) error: ${response.status} ${response.statusText}`, errorText);
            return new NextResponse(JSON.stringify({ error: 'Failed to generate avatar.' }), {
                status: response.status,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const responseData = await response.json();
        return NextResponse.json(responseData);
    } catch (error: any) {
        console.error('Error during avatar POST:', error);
        return new NextResponse(JSON.stringify({ error: 'Error posting avatar: ' + error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
