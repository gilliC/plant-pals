"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { UseMutationResult } from "@tanstack/react-query";

interface AuthFormProps {
  mutation: UseMutationResult<unknown, Error, { name: string; password: string }>;
  submitLabel: string;
}

export function AuthForm({ mutation, submitLabel }: AuthFormProps) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    mutation.mutate({ name, password });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-5 pb-2">
      <div className="flex flex-col gap-1.5">
        <Label className="text-[9px] uppercase tracking-[0.54px] text-muted">
          Name
        </Label>
        <Input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="h-[42px] rounded-[12px] border-primary-darker bg-background text-[13px] placeholder:text-muted"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label className="text-[9px] uppercase tracking-[0.54px] text-muted">
          Password
        </Label>
        <Input
          type="password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="h-[42px] rounded-[12px] border-primary-darker bg-background text-[13px] placeholder:text-muted"
        />
      </div>

      {mutation.error && (
        <p className="text-error text-[12px]">{mutation.error.message}</p>
      )}

      <Button
        type="submit"
        disabled={mutation.isPending}
        className="mt-2 h-[46px] w-full rounded-[16px] bg-badge-active text-[14px] font-semibold text-badge-active-foreground hover:brightness-110"
      >
        {mutation.isPending ? "Loading..." : submitLabel}
      </Button>
    </form>
  );
}
