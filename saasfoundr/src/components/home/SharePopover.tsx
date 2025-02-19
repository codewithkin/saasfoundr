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
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
} from 'react-share';

interface SharePopoverProps {
  postId: string;
  content: string;
}

export function SharePopover({ postId, content }: SharePopoverProps) {
  const [copied, setCopied] = useState(false);
  const url = `${window.location.origin}/posts/${postId}`;

  const handleCopyLink = async () => {
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
      <PopoverContent className="w-64">
        <div className="space-y-4">
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

          <div className="border-t pt-2">
            <p className="text-sm text-muted-foreground mb-2">Share on social media</p>
            <div className="flex items-center justify-between gap-2">
              <LinkedinShareButton 
                url={url} 
                title="Check out this post on SaaSFoundr!"
                summary={content}
                className="hover:opacity-80 transition-opacity"
              >
                <LinkedinIcon size={32} round />
              </LinkedinShareButton>

              <FacebookShareButton 
                url={url} 
                quote={`${content}\n\nCheck out this post on SaaSFoundr!`}
                hashtag="#saasfoundr"
                className="hover:opacity-80 transition-opacity"
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>

              <TwitterShareButton 
                url={url} 
                title={`${content.slice(0, 180)}...\n\nCheck out this post on SaaSFoundr!`}
                hashtags={["saasfoundr", "saas", "startup"]}
                className="hover:opacity-80 transition-opacity"
              >
                <TwitterIcon size={32} round />
              </TwitterShareButton>

              <WhatsappShareButton 
                url={url} 
                title={`${content}\n\nCheck out this post on SaaSFoundr!`}
                separator="\n\n"
                className="hover:opacity-80 transition-opacity"
              >
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
