"use client";
import { z } from "zod";
import React, { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { signup } from "@/app/actions/auth-actions";
import { useRouter } from "next/navigation";



const passwordValidationRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?]).{8,}$"
);

const formSchema = z
  .object({
    full_name: z.string().min(5, { message: "Full name must be at least 5 characters long." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z.string({ required_error: "Password is required." })
      .min(8, { message: "Password must be at least 8 characters long." })
      .regex(passwordValidationRegex, {
        message: "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.",
      }),
    confirmPassword: z.string({ required_error: 'Confirm password is required.' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match!",
  });

const SignUpForm = ({ className }: { className?: string }) => {

  const [loading, setLoading] = useState(false)
  const toastId = useId();
  const Router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
    },
  });

 async  function onSubmit(values: z.infer<typeof formSchema>) {
    toast.loading('Creating Account...',{id: toastId})
    setLoading(true)
    const formData = new FormData()
    formData.append('full_name', values.full_name)
    formData.append('email', values.email)
    formData.append('password', values.password)
    const {success, error} = await signup(formData)
    if(!success){
      toast.error(String(error),{id: toastId})
    }else {
      toast.success("Account created successfully!", {id: toastId})
      Router.push("/v2/login")
    }
    setLoading(false)
    
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
            name="full_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Doe"
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">Email</FormLabel>
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
                <FormLabel className="text-black">Password</FormLabel>
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
          
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-black">Confirm Password</FormLabel>
                <FormControl>
                  <Input
                  
                    placeholder="••••••••"
                    className="bg-white border-gray-300 text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
          

          <div className="text-sm text-gray-600">
            By creating an account, you agree to our{" "}
            <a href="/terms" className="text-blue-500 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-blue-500 hover:underline">
              Privacy Policy
            </a>.
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Button
              type="submit"
              className="w-full bg-white border border-gray-300 hover:bg-gray-100 text-gray-900 font-semibold shadow-md transition-transform transform hover:scale-105 active:scale-95"
            disabled={loading} >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
              Create Account
            </Button>
          </motion.div>
        </form>
      </Form>
    </motion.div>
  );
};

export default SignUpForm;
