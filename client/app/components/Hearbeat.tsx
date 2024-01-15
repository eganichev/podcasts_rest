"use client";
import React, { useState, useEffect } from "react";
import { heartbeat } from "@/services/heartbeat";
import { useToast } from "@/components/ui/use-toast";

const HeartbeatChecker: React.FC = () => {
  const { toast } = useToast();

  useEffect(() => {
    const checkHeartbeat = async () => {
      try {
        const data = await heartbeat();
        console.log(data.status);
      } catch (error) {
        toast({
          title: "Error checking heartbeat",
          description: "Seams like server is not alive",
        });
        console.error("Error checking heartbeat:", (error as Error).message);
      }
    };

    checkHeartbeat();

    const intervalId = setInterval(checkHeartbeat, 20 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  return null;
};

export default HeartbeatChecker;
