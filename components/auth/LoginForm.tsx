"use client";

import { z } from "zod";
import React, { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { login } from "@/app/actions/auth-actions";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address!" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters!" }),
});

const LoginForm = ({ className }: { className?: string }) => {

  const [loading, setLoading] = useState(false);   
  const toastId = useId();                          
  const Router = useRouter();                      

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    toast.loading('Logging in...', { id: toastId });
    setLoading(true);

    const formData = new FormData();
    formData.append('email', values.email);
    formData.append('password', values.password);

    const { success, error } = await login(formData);

    if (!success) {
      toast.error(String(error), { id: toastId });
    } else {
      toast.success("Logged in successfully!", { id: toastId });
      Router.push("/dashboard");
    }

    setLoading(false);
  }

  return (
    <motion.div
      className={cn("w-full max-w-md p-8 rounded-lg bg-transparent", className)}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black text-left w-full">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="example@domain.com"
                    className="bg-white border-gray-300 text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black text-left w-full">Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="bg-white border-gray-300 text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Button
              type="submit"
              className="w-full bg-white border border-gray-300 hover:bg-gray-100 text-gray-900 font-semibold shadow-md transition-transform transform hover:scale-105 active:scale-95"
              disabled={loading}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Log In
            </Button>
          </motion.div>
        </form>
      </Form>
    </motion.div>
  );
};

export default LoginForm;
