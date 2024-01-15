import { IPodcast } from "@/common/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface IProps {
  podcast: IPodcast;
}

export default function ListItem({ podcast }: IProps) {
  return (
    <article className="podcast-wrapper">
      <Card className="h-[350px] mb-4">
        <CardHeader>
          <div className="flex">
            <img
              src={podcast.images.thumbnail}
              className="h-[200px] w-[200px]"
            />
            <div className="flex flex-col ml-4 h-[200px]">
              <CardTitle className="mb-4">{podcast.title}</CardTitle>
              <CardDescription className="line-clamp-6">
                {podcast.description}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between">
            <div className="flex flex-col space-y-1.5 text-sm text-muted-foreground">
              Publisher: {podcast.publisherName}
            </div>
            {podcast.hasFreeEpisodes && (
              <div className="flex flex-col space-y-1.5">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <AlertTriangle />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Has Free Episodes</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Badge>{podcast.categoryName}</Badge>
        </CardFooter>
      </Card>
    </article>
  );
}
