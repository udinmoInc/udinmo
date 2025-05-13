"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';  
import LoginForm from './LoginForm';
import { Button } from '../ui/button';
import SignUPForm from './SignUpForm';
import ResetForm from './ResetPassword';
import Image from 'next/image';

const AuthForm = () => {
    const [mode, setMode] = useState('login');

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-full max-w-sm bg-white p-2">

                <motion.div
                    className="flex justify-center mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <Image
                        src="/logo-ico.png" 
                        width={32}
                        height={32}
                        alt="Company Logo" 
                        className="object-contain"
                        style={{ filter: 'brightness(0) sepia(100%) saturate(1000%) hue-rotate(180deg)' }} 
                    />
                </motion.div>

                <motion.h2 
                    className="text-2xl text-center font-semibold text-gray-800 mb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    {mode === "reset" ? "Reset Password" : mode === "login" ? "Welcome back!" : "Sign Up"}
                </motion.h2>

                <motion.p
                    className="text-gray-600 text-center text-sm mb-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    {mode === "reset" ? "Enter your registered email address to receive instructions for resetting your account password."
                        : mode === "login" ? "Please provide your username and password to securely log in and access your account."
                        : "Fill in your details to create a new account and begin using our platform today."}
                </motion.p>

                <div className="mt-4">
                    {mode === "login" && (
                        <>
                            <LoginForm />
                            <motion.div 
                                className="flex flex-col items-center mt-4 space-y-2"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                            >
                                <Button
                                    variant="link"
                                    className="p-0 h-auto text-xs font-normal"
                                    onClick={() => setMode("signup")}
                                >
                          Don&apos;t have an account?
                                </Button>
                                <Button
                                    variant="link"
                                    className="p-0 h-auto text-xs font-normal"
                                    onClick={() => setMode("reset")}
                                >
                                    Forgot Password
                                </Button>
                            </motion.div>
                        </>
                    )}
                   {mode === "signup" && (
                        <>
                            <SignUPForm/>
                            <motion.div 
                                className="flex flex-col items-center mt-4 space-y-2"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                            >
                                <Button
                                    variant="link"
                                    className="p-0 h-auto text-xs font-normal"
                                    onClick={() => setMode("login")}
                                >
                                   Already have an account?
                                </Button>
                           
                            </motion.div>
                        </>
                    )}
                    {mode === "reset" && (
                        <>
                            <ResetForm/>
                            <motion.div 
                                className="flex flex-col items-center mt-4 space-y-2"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                            >
                                <Button
                                    variant="link"
                                    className="p-0 h-auto text-xs font-normal"
                                    onClick={() => setMode("login")}
                                >
                                  Back to login
                                </Button>
                           
                            </motion.div>
                        </>
                    )}
                </div>

            </div>
        </div>
    );
};

export default AuthForm;
