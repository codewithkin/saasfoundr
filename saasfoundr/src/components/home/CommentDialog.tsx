'use client';

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircleIcon, SendIcon, Smile } from "lucide-react";
import { useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { addComment, getComments } from "@/app/actions/comment";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import EmojiPicker, { Theme } from 'emoji-picker-react';
import { useClickOutside } from "@/hooks/useClickOutside";

interface CommentDialogProps {
  postId: string;
  commentCount: number;
}

export function CommentDialog({ postId, commentCount }: CommentDialogProps) {
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [replyTo, setReplyTo] = useState<{ id: string; name: string } | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  useClickOutside(emojiPickerRef, () => setShowEmojiPicker(false));

  const loadComments = async () => {
    try {
      const fetchedComments = await getComments(postId);
      setComments(fetchedComments);
    } catch (error) {
      console.error('Error loading comments:', error);
      toast.error('Failed to load comments');
    }
  };

  const handleSubmit = async () => {
    if (!newComment.trim()) return;

    try {
      setLoading(true);
      const comment = await addComment(postId, newComment, replyTo?.id);
      
      // Update comments list
      if (replyTo) {
        setComments(comments.map(c => 
          c.id === replyTo.id 
            ? { ...c, replies: [...c.replies, comment] }
            : c
        ));
      } else {
        setComments([comment, ...comments]);
      }

      // Clear form
      setNewComment("");
      setReplyTo(null);

      // Update post comment count
      queryClient.setQueryData(['posts'], (oldData: any) => {
        return oldData.map((post: any) => {
          if (post.post_id === postId) {
            return {
              ...post,
              _count: {
                ...post._count,
                comments: (post._count.comments || 0) + 1
              }
            };
          }
          return post;
        });
      });

      toast.success('Comment added successfully');
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen);
      if (isOpen) loadComments();
    }}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="space-x-2">
          <MessageCircleIcon className="h-4 w-4" />
          <span>Comment</span>
          {commentCount > 0 && (
            <span className="ml-1 text-sm text-muted-foreground">({commentCount})</span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[512px]">
        <DialogHeader>
          <DialogTitle>Comments</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          {/* Comment Input */}
          <div className="space-y-2">
            <div className="relative">
              <Textarea
                placeholder={replyTo ? `Reply to ${replyTo.name}...` : "Add a comment..."}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[80px]"
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute bottom-2 right-2 h-8 w-8 p-0"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                <Smile className="h-5 w-5" />
              </Button>
              {showEmojiPicker && (
                <div ref={emojiPickerRef} className="absolute bottom-12 right-0 z-50">
                  <EmojiPicker
                    theme={Theme.AUTO}
                    onEmojiClick={(emojiData) => {
                      setNewComment(newComment + emojiData.emoji);
                      setShowEmojiPicker(false);
                    }}
                    width={300}
                    height={400}
                  />
                </div>
              )}
            </div>
            <div className="flex justify-between items-center">
              {replyTo && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setReplyTo(null)}
                >
                  Cancel Reply
                </Button>
              )}
              <Button
                className="ml-auto"
                size="sm"
                onClick={handleSubmit}
                disabled={loading || !newComment.trim()}
              >
                <SendIcon className="h-4 w-4 mr-2" />
                {loading ? 'Sending...' : 'Send'}
              </Button>
            </div>
          </div>

          {/* Comments List */}
          <div className="space-y-4 max-h-[400px] overflow-y-auto">
            {comments.map((comment) => (
              <div key={comment.id} className="space-y-2">
                {/* Main Comment */}
                <div className="flex space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={comment.user.image || undefined} />
                    <AvatarFallback>{comment.user.name?.[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="bg-muted p-2 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm">{comment.user.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                        </span>
                      </div>
                      <p className="text-sm mt-1">{comment.content}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs mt-1"
                      onClick={() => setReplyTo({ id: comment.id, name: comment.user.name })}
                    >
                      Reply
                    </Button>
                  </div>
                </div>

                {/* Replies */}
                {comment.replies?.length > 0 && (
                  <div className="ml-10 space-y-2">
                    {comment.replies.map((reply: any) => (
                      <div key={reply.id} className="flex space-x-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={reply.user.image || undefined} />
                          <AvatarFallback>{reply.user.name?.[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="bg-muted p-2 rounded-lg">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-sm">{reply.user.name}</span>
                              <span className="text-xs text-muted-foreground">
                                {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}
                              </span>
                            </div>
                            <p className="text-sm mt-1">{reply.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
