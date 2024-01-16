"use client";
import React, { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@apollo/client";
import { GET_HEARTBEAT } from "@/app/graph/queries/index";

const HeartbeatChecker: React.FC = () => {
  const { toast } = useToast();

  const { error } = useQuery(GET_HEARTBEAT, { pollInterval: 20 * 1000 });

  useEffect(() => {
    if (error) {
      toast({
        title: "Error checking heartbeat",
        description: "Seams like server is not alive",
      });
      console.error("Error checking heartbeat:", (error as Error).message);
    }
  }, [error]);

  return null;
};

export default HeartbeatChecker;
