"use client";

import Link from "next/link";
import { LoginModal } from "./loginModal/LoginModal";
import { useUser } from "@/lib/userContext";
import { Chip } from "./ui/chip";
import { Button } from "./ui/button";

export function Navbar() {
  const { user, logout } = useUser();

  return (
    <div className="p-6 flex items-center justify-between border-b border-border">
      <h1 className="text-primary">🌱 Plant Pals</h1>
      <div className="bg-primary-dark flex items-center rounded-lg px-6">
        <Link href="/" className="px-4 py-2">
          <p className="text-primary">Browse</p>
        </Link>
        <Link href="/myRequests" className="px-4 py-2">
          <p className="text-primary">My Requests</p>
        </Link>
      </div>

      <div className="flex items-center rounded-lg">
        {user ? (
          <div className="flex items-center gap-4">
            <Chip text={`${user.name} 🌻`} variant="success" />
            <Button
              onClick={logout}
              variant='destructive'
            >
              Log Out
            </Button>
          </div>
        ) : (
          <LoginModal>
            <p className="text-primary">Sign In</p>
          </LoginModal>
        )}
      </div>
    </div>
  );
}
