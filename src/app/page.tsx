"use client";

import React, { useState } from "react";
import Desktop from "@/components/os/Desktop";
import LoginScreen from "@/components/os/LoginScreen";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginComplete = () => {
    setIsLoggedIn(true);
  };

  return (
    <main>
      {!isLoggedIn ? (
        <LoginScreen onLoginComplete={handleLoginComplete} />
      ) : (
        <Desktop />
      )}
    </main>
  );
}
