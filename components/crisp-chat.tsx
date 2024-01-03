"use client";

import { Crisp } from "crisp-sdk-web";
import { useEffect } from "react";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("246dcbfc-fc00-4bf4-bb3c-a96511a21c23");
  }, []);

  return null;
};
