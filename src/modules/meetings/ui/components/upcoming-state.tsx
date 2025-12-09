import Link from "next/link";
import { VideoIcon } from "lucide-react";

import { EmptyState } from "@/components/custom/empty-state";
import { Button } from "@/components/ui/button";

export const UpcomingState = ({ meetingId }: { meetingId: string }) => {
  return (
    <div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
      <EmptyState
        image="/upcoming.svg"
        title="Meeting not started yet"
        description="Once you start this meeting, a summary will appear hear"
      />
      <div className="flex flex-col-reverse lg:flex-row lg:justify-center items-center gap-2">
        <Button asChild className="w-full lg:w-auto">
          <Link href={`/call/${meetingId}`}>
            <VideoIcon />
            Start meeting
          </Link>
        </Button>
      </div>
    </div>
  );
};
