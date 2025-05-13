import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AvatarComponentProps {
    initial: string;
}

const AvatarComponent: React.FC<AvatarComponentProps> = ({ initial }) => {
    const [avatarUrl, setAvatarUrl] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAvatar = async () => { // Changed function name to fetchAvatar
            setLoading(true);
            setError(null);
            try {
                // 1. Call your Next.js API route (/api/avatar), passing the initial.
                const response = await fetch(`/api/avatar?initial=${initial}`);
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || `Failed to fetch avatar: ${response.status}`);
                }
                // 2. The API route returns the SVG data as text.
                const avatarSvg = await response.text();
                setAvatarUrl(`data:image/svg+xml,${encodeURIComponent(avatarSvg)}`); //set data
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchAvatar();
    }, [initial]);

    return (
        <div className="flex items-center justify-center">
            {loading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="animate-pulse text-gray-500"
                >
                    Loading Avatar...
                </motion.div>
            )}
            {error && <div className="text-red-500">Error: {error}</div>}
            {!loading && !error && avatarUrl && (
                <motion.img
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    src={avatarUrl}
                    alt={`Avatar for ${initial}`}
                    className="rounded-full w-20 h-20 border-2 border-gray-300"
                />
            )}
        </div>
    );
};

const MyComponent: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-semibold mb-4">Your Avatar</h1>
            <AvatarComponent initial="JD" />
        </div>
    );
};

export default MyComponent;