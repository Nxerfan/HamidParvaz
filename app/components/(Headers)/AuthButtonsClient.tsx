"use client";

import { useAuth } from "../../lib/AuthContext";
import Link from "next/link";
import Image from "next/image";

export default function AuthButtonsClient() {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="AuthButtons">
        <div
          style={{
            width: 80,
            height: 36,
            borderRadius: 8,
            background: "rgba(0,0,0,0.05)",
          }}
        />
      </div>
    );
  }

  if (isAuthenticated && user) {
    const initial = (user.name || user.email || "U").charAt(0).toUpperCase();
    return (
      <div className="AuthButtons">
        <Link href="/userpanel" style={{ textDecoration: "none" }}>
          <div className="ProfileAvatar" title={user.name || user.email}>
            {initial}
          </div>
        </Link>
      </div>
    );
  }

  return (
    <div className="AuthButtons">
      <Link href="/auth">
        <button className="Btn BtnPrimary">
          <Image
            src="/person-ثبت نام.svg"
            alt=""
            width={20}
            height={20}
            role="presentation"
          />{" "}
          ورود
        </button>
      </Link>
    </div>
  );
}