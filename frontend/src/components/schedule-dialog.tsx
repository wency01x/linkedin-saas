"use client";

import * as React from "react";
import { format } from "date-fns";
import { Icon } from "@iconify/react";
import { usePosts } from "@/hooks/usePosts";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export function ScheduleDialog({ postId, trigger }: { postId: string, trigger: React.ReactNode }) {
  const [date, setDate] = React.useState<Date>();
  const [time, setTime] = React.useState<string>("09:00");
  const [open, setOpen] = React.useState(false);
  const { schedulePost, isScheduling } = usePosts();

  const handleSchedule = async () => {
    if (!date) return;
    
    // Combine date and time
    const [hours, minutes] = time.split(":");
    const scheduledDate = new Date(date);
    scheduledDate.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);

    await schedulePost({
      id: postId,
      scheduled_at: scheduledDate.toISOString(),
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-background">
        <DialogHeader>
          <DialogTitle>Schedule Post</DialogTitle>
          <DialogDescription>
            Choose a date and time to automatically publish this post to LinkedIn.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-right text-sm font-medium">Date</label>
            <div className="col-span-3">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <Icon icon="solar:calendar-linear" className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-right text-sm font-medium">Time</label>
            <div className="col-span-3">
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full p-2 rounded-md border border-input bg-background text-sm focus:ring-2 focus:ring-ring outline-none"
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSchedule} disabled={!date || isScheduling}>
            {isScheduling ? "Scheduling..." : "Schedule"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
