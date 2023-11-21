"use client";
import React from "react";
import { useRouter } from "next/navigation";

export const Hero = () => {
  const router = useRouter();
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Hello there</h1>
          <p className="py-6">
            To do list app is a simple app that allows you to create a list of
            tasks that you need to complete. All todos are stored in the cloud,
            so you can access them from anywhere.
          </p>
          <button
            onClick={() => {
              router.push("/login");
            }}
            className="btn btn-primary"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};
