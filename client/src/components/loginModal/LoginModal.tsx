"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AuthForm } from "./AuthForm";
import { useAuth } from "./useAuth";
import { useState } from "react";

export function LoginModal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const { login, register } = useAuth(() => setOpen(false));

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<button className="px-4 py-2 cursor-pointer" />}>
        {children}
      </DialogTrigger>

      <DialogContent
        className="w-[460px] max-w-[460px] gap-0 rounded-[28px] border-primary-darker bg-card p-0 shadow-[0px_8px_32px_-4px_rgba(0,0,0,0.5)]"
        showCloseButton={false}
      >
        <div className="h-[4px] w-full rounded-t-[28px] bg-primary" />

        <DialogHeader className="px-8 pt-7 pb-4">
          <DialogTitle className="text-[22px] font-bold text-foreground">
            Log In
          </DialogTitle>
        </DialogHeader>

        <div className="mx-8 h-px bg-primary-darker" />

        <div className="px-8 pt-4 pb-8">
          <Tabs defaultValue="sign-in">
            <TabsList variant="line" className="w-full">
              <TabsTrigger value="sign-in">Sign In</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="sign-in">
              <AuthForm mutation={login} submitLabel="Log In" />
            </TabsContent>

            <TabsContent value="register">
              <AuthForm mutation={register} submitLabel="Create Account" />
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
