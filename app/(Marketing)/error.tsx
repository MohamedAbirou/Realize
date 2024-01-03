"use client";
import { Error } from "@/components/error";
import { useEffect } from "react";

interface ErrorStateProps {
  error: Error;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <Error label="Uh Oh! Something went wrong!" />;
};

export default ErrorState;
