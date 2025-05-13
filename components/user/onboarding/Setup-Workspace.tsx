'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import EmojiPicker from '../emojiPicker/emojipicker';

import { AuthUser } from '@supabase/supabase-js';
import { useForm } from 'react-hook-form';

interface SetupWorkspaceProps {
    user?: AuthUser;
}

type FormData = {
    workspaceName: string;
    logo: FileList;
};

const SetupWorkspace: React.FC<SetupWorkspaceProps> = ({ user }) => {
    const [loading, setLoading] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState('💼');
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>({
        mode: 'onChange',
        defaultValues: {
            workspaceName: '',
            logo: undefined,
        },
    });const handleCreateWorkspace = async (data: FormData) => {
        setLoading(true);
    
        const workspaceData = {
            title: data.workspaceName,
            iconId: selectedEmoji,
            workspaceOwner: user?.id, 
            ownerId: user?.id,        
            logo: "https://cdn.example.com/default-logo.png", 
            inTrash: false,
            bannerUrl: '',
            data: '',
        };
    
        try {
            const response = await fetch('/api/dev/v2/connect/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `
                        mutation CreateWorkspace($input: CreateWorkspaceInput!) {
                            CreateWorkspace(input: $input) {
                                id
                                title
                                logo
                                iconId
                                workspaceOwner
                                inTrash
                                bannerUrl
                            }
                        }
                    `,
                    variables: { input: workspaceData },
                }),
            });
    
            const result = await response.json();
    
            if (response.ok && result?.data?.CreateWorkspace) {
                console.log('Workspace Created:', result.data.CreateWorkspace);
                reset();
                router.push(`/dashboard/${result.data.CreateWorkspace.id}`);
            } else {
                console.error('Workspace creation failed:', result.errors || 'Unknown error');
            }
        } catch (error) {
            console.error('Error creating workspace:', error);
        } finally {
            setLoading(false);
        }
    };
    
    
    return (
        <motion.div
            className="w-full max-w-md p-8 rounded-lg bg-transparent"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            <Card className="w-full sm:max-w-md h-auto flex items-center justify-center">
                <CardContent className="flex flex-col justify-center p-6 space-y-6">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-semibold tracking-tight">
                            Create a Workspace
                        </CardTitle>
                        <CardDescription className="text-sm text-muted-foreground mt-2">
                            Set up a digital environment for your team to collaborate and streamline workflows.
                        </CardDescription>
                    </CardHeader>
                    <hr className="my-4 border-gray-300" />
                    <form onSubmit={handleSubmit(handleCreateWorkspace)} className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <label htmlFor="workspaceName" className="block text-sm font-medium text-gray-700">
                                Workspace Name
                            </label>
                            <Input
                                id="workspaceName"
                                type="text"
                                placeholder="Enter workspace name"
                                {...register('workspaceName', { required: 'Workspace name is required' })}
                                className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md bg-white text-black"
                            />
                            {errors?.workspaceName && (
                                <small className="text-red-600">
                                    {errors.workspaceName.message?.toString()}
                                </small>
                            )}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <label htmlFor="logo" className="block text-sm font-medium text-gray-700">
                                Workspace Logo (Optional)
                            </label>
                            <Input
                                id="logo"
                                type="file"
                                {...register('logo')}
                                className="mt-1 block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md bg-white"
                            />
                            <p className="mt-1 text-gray-500 text-sm">Optional: Upload a logo for your workspace.</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <label htmlFor="emoji" className="block text-sm font-medium text-gray-700">
                                Workspace Icon
                            </label>
                            <div className="relative">
                                <EmojiPicker getValue={setSelectedEmoji}>
                                    <span style={{ fontSize: '2.5rem' }}>{selectedEmoji}</span>
                                </EmojiPicker>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Button
                                type="submit"
                                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-md transition-transform transform hover:scale-105 active:scale-95"
                                disabled={loading}
                            >
                                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {loading ? 'Creating Workspace...' : 'Create Workspace'}
                            </Button>
                        </motion.div>
                    </form>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default SetupWorkspace;
