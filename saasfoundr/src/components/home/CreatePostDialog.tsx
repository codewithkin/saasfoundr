'use client';

import { Button } from "@/components/ui/button";
import EmojiPicker, { Theme } from 'emoji-picker-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { PenSquare, Smile } from "lucide-react";
import { useRef, useState } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useQueryClient } from "@tanstack/react-query";
import { createPost } from "@/app/actions/post";
import { getAllUsers } from "@/app/actions/user";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function CreatePostDialog() {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const queryClient = useQueryClient();
  const MAX_CHARS = 500;

  // Fetch all users
  const { data: allUsers = [] } = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers
  });

  useClickOutside(emojiPickerRef, () => setShowEmojiPicker(false));
  useClickOutside(suggestionsRef, () => setShowSuggestions(false));

  const handleUserSelect = (username: string) => {
    const beforeCursor = content.slice(0, cursorPosition);
    const afterCursor = content.slice(cursorPosition);
    const lastAtSymbol = beforeCursor.lastIndexOf('@');
    const newContent = beforeCursor.slice(0, lastAtSymbol) + '@' + username + ' ' + afterCursor;
    
    if (newContent.length <= MAX_CHARS) {
      setContent(newContent);
      setCharCount(newContent.length);
    }
    setShowSuggestions(false);
  };

  const handleContentChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length <= MAX_CHARS) {
      setContent(text);
      setCharCount(text.length);
      setCursorPosition(e.target.selectionStart);

      // Check for @ symbol
      const beforeCursor = text.slice(0, e.target.selectionStart);
      const lastAtSymbol = beforeCursor.lastIndexOf('@');
      const lastSpaceBeforeAt = beforeCursor.lastIndexOf(' ', lastAtSymbol);
      const query = beforeCursor.slice(lastAtSymbol + 1).toLowerCase();

      if (lastAtSymbol !== -1 && // Has @
          (lastSpaceBeforeAt === -1 || lastSpaceBeforeAt < lastAtSymbol) // @ is at start or after space
      ) {
        if (query.length === 0) {
          // Show all users when @ is just typed
          setFilteredUsers(allUsers);
          setShowSuggestions(true);
        } else if (!query.includes(' ')) { // No spaces in query
          // Filter users based on query
          const filtered = allUsers.filter(user => 
            user.username.toLowerCase().includes(query) || 
            user.name.toLowerCase().includes(query)
          );
          setFilteredUsers(filtered);
          setShowSuggestions(filtered.length > 0);
        } else {
          setShowSuggestions(false);
        }
      } else {
        setShowSuggestions(false);
      }
    }
  };

  const handleSubmit = async () => {
    if (!content.trim()) return;

    try {
      setLoading(true);
      const newPost = await createPost({ content });
      
      // Update posts list
      queryClient.setQueryData(['posts'], (oldData: any) => {
        return [newPost, ...(oldData || [])];
      });

      // Clear form and close dialog
      setContent("");
      setCharCount(0);
      setOpen(false);
      toast.success('Post created successfully');
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          size="lg" 
          className="fixed bottom-6 right-6 shadow-lg rounded-full h-10 w-14 p-0 md:h-auto md:w-auto md:p-6 md:rounded-lg"
        >
          <PenSquare className="h-6 w-6 md:mr-2" />
          <span className="hidden md:inline">Create Post</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[512px]">
        <DialogHeader>
          <DialogTitle>Create a New Post</DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <div className="space-y-2">
            <div className="relative">
              <Textarea
                ref={textareaRef}
                placeholder="What's on your mind? Use @ to mention users and # for hashtags"
                value={content}
                onChange={handleContentChange}
                className="min-h-[120px] resize-none"
              />
              {showSuggestions && (
                <div 
                  ref={suggestionsRef}
                  className="absolute top-full left-0 mt-1 w-64 max-h-48 overflow-y-auto bg-background border rounded-md shadow-lg"
                >
                  {filteredUsers.map((user) => (
                    <button
                      key={user.id}
                      className="w-full px-4 py-2 text-left hover:bg-muted flex items-center space-x-2"
                      onClick={() => handleUserSelect(user.username)}
                    >
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={user.image || undefined} />
                        <AvatarFallback>{user.name?.[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 truncate">
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">@{user.username}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
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
                      const newContent = content + emojiData.emoji;
                      if (newContent.length <= MAX_CHARS) {
                        setContent(newContent);
                        setCharCount(newContent.length);
                      }
                    }}
                    width={300}
                    height={400}
                  />
                </div>
              )}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                {charCount}/{MAX_CHARS} characters
              </span>
              <div className="flex items-center gap-2">
                <Button
                  onClick={handleSubmit}
                  disabled={loading || !content.trim() || charCount > MAX_CHARS}
                >
                  {loading ? 'Creating...' : 'Create Post'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
