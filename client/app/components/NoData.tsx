import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function NoData() {
  return (
    <div className="flex justify-center">
      <Alert className="w-[400px] bg-blue-300 flex items-center">
        <span>
          <AlertCircle className="h-12 w-12" />
        </span>
        <div className="ml-4">
          <AlertTitle>No data found</AlertTitle>
          <AlertDescription>Try to change your query</AlertDescription>
        </div>
      </Alert>
    </div>
  );
}
