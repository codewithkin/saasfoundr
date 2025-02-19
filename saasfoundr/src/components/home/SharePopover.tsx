'use client';

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ShareIcon, Link2Icon, CheckIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface SharePopoverProps {
  postId: string;
}

export function SharePopover({ postId }: SharePopoverProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    const url = `${window.location.origin}/posts/${postId}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="space-x-2">
          <ShareIcon className="h-4 w-4" />
          <span>Share</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48">
        <div className="space-y-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full justify-start space-x-2" 
            onClick={handleCopyLink}
          >
            {copied ? (
              <>
                <CheckIcon className="h-4 w-4 text-green-500" />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Link2Icon className="h-4 w-4" />
                <span>Copy link</span>
              </>
            )}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
