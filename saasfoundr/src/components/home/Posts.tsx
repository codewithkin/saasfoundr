'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bookmark, BookmarkCheck, HeartIcon } from 'lucide-react';
import { SharePopover } from './SharePopover';
import { getPosts } from '@/app/actions/post';
import { toggleLike } from '@/app/actions/like';
import { toggleSave } from '@/app/actions/save';
import { formatDistanceToNow } from 'date-fns';
import { UserSkeletonList } from '../skeletons/UserSkeleton';
import { cn } from '@/lib/utils';
import { CommentDialog } from './CommentDialog';
import { CreatePostDialog } from './CreatePostDialog';
import { FormattedContent } from './FormattedContent';

export function Posts() {
  const queryClient = useQueryClient();
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const result = await getPosts();
      return result;
    }
  });

  const handleLike = async (postId: string) => {
    try {
      // Optimistically update the UI
      queryClient.setQueryData(['posts'], (oldData: any) => {
        return oldData.map((post: any) => {
          if (post.post_id === postId) {
            return {
              ...post,
              isLiked: !post.isLiked,
              likeCount: post.isLiked ? post.likeCount - 1 : post.likeCount + 1
            };
          }
          return post;
        });
      });

      // Make the API call
      await toggleLike(postId);
    } catch (error) {
      // If the API call fails, revert the optimistic update
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      console.error('Error toggling like:', error);
    }
  };

  const handleSave = async (postId: string) => {
    try {
      // Optimistically update the UI
      queryClient.setQueryData(['posts'], (oldData: any) => {
        return oldData.map((post: any) => {
          if (post.post_id === postId) {
            return {
              ...post,
              isSaved: !post.isSaved,
              saveCount: post.isSaved ? post.saveCount - 1 : post.saveCount + 1
            };
          }
          return post;
        });
      });

      // Make the API call
      await toggleSave(postId);
    } catch (error) {
      // If the API call fails, revert the optimistic update
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      console.error('Error toggling save:', error);
    }
  };

  if (isLoading) {
    return (
      <>
        <UserSkeletonList />
        <CreatePostDialog />
      </>
    );
  }

  if (error) {
    return <div>Error loading posts</div>;
  }

  return (
    <div className="space-y-4 scroll-effect">
      <CreatePostDialog />
      {posts?.map((post) => (
        <article key={post.post_id} className="py-6 border-y">
          {/* User Profile Section */}
          <div className="flex items-center space-x-3 mb-4">
            <Avatar>
              <AvatarImage src={post.author.image || undefined} />
              <AvatarFallback>{post.author.name?.[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{post.author.name}</h3>
              <p className="text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
              </p>
            </div>
          </div>

          {/* Post Content */}
          <div className="space-y-4 mb-4">
            <FormattedContent content={post.content} />
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className={cn("space-x-2", post.isLiked && "text-red-500")} 
              onClick={() => handleLike(post.post_id)}
            >
              <HeartIcon className={cn("h-4 w-4", post.isLiked && "fill-current")} />
              <span>Like</span>
              {post.likeCount > 0 && (
                <span className="ml-1 text-sm text-muted-foreground">({post.likeCount})</span>
              )}
            </Button>
            <CommentDialog postId={post.post_id} commentCount={post._count.comments} />
            <Button 
              variant="ghost" 
              size="sm" 
              className={cn("space-x-2", post.isSaved && "text-blue-500")} 
              onClick={() => handleSave(post.post_id)}
            >
              {post.isSaved ? (
                <BookmarkCheck className="h-4 w-4 fill-current" />
              ) : (
                <Bookmark className="h-4 w-4" />
              )}
              <span>Save</span>
              {post.saveCount > 0 && (
                <span className="ml-1 text-sm text-muted-foreground">({post.saveCount})</span>
              )}
            </Button>
            <SharePopover postId={post.post_id} content={post.content} />
          </div>
        </article>
      ))}
    </div>
  );
}
