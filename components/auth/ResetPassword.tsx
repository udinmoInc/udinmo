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
import { Loader2 } from "lucide-react";
import { resetPassword } from "@/app/actions/auth-actions"; // <-- connect real action here

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address!",
  }),
});

const ResetForm = ({ className }: { className?: string }) => {
  const [loading, setLoading] = useState(false);
  const toastId = useId();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    toast.loading('Sending reset link...', { id: toastId });
    setLoading(true);

    const formData = new FormData();
    formData.append('email', values.email);

    try {
      const response = await resetPassword(formData); // <-- real API call

      if (!response.success) {
        toast.error(response.error || "Something went wrong!", { id: toastId });
      } else {
        toast.success("Reset link sent successfully!", { id: toastId });
        form.reset();
        router.push("/") 
      }
    } catch (err) {
      toast.error("An unexpected error occurred!", { id: toastId });
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
              Reset Password
            </Button>
          </motion.div>
        </form>
      </Form>
    </motion.div>
  );
};

export default ResetForm;
