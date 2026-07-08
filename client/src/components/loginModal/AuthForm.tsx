"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { UseMutationResult } from "@tanstack/react-query";

interface AuthFormProps {
  mutation: UseMutationResult<unknown, Error, { name: string; password: string }>;
  submitLabel: string;
}

interface FormValues {
  name: string;
  password: string;
}

export function AuthForm({ mutation, submitLabel }: AuthFormProps) {
  const { register, handleSubmit } = useForm<FormValues>();

  return (
    <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="flex flex-col gap-4 pt-5 pb-2">
      <div className="flex flex-col gap-1.5">
        <Label className="text-[9px] uppercase tracking-[0.54px] text-muted">
          Name
        </Label>
        <Input
          type="text"
          placeholder="Your name"
          {...register("name", { required: true })}
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
          {...register("password", { required: true })}
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
