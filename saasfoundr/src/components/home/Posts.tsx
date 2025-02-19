'use client';

import { useQuery } from '@tanstack/react-query';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { BookmarkIcon, HeartIcon, MessageCircleIcon, ShareIcon } from 'lucide-react';
import { getPosts } from '@/app/actions/post';
import { formatDistanceToNow } from 'date-fns';
import { UserSkeletonList } from '../skeletons/UserSkeleton';

export function Posts() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts
  });

  if (isLoading) {
    return <UserSkeletonList />;
  }

  return (
    <div className="space-y-4 scroll-effect">
      {posts?.map((post) => (
        <article key={post.id} className="py-6 border-y">
          {/* User Profile Section */}
          <div className="flex items-center space-x-3 mb-4">
            <Avatar>
              <AvatarImage src={post.author.image || undefined} />
              <AvatarFallback>{post.author.name?.[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{post.author.name}</h3>
              <p className="text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
              </p>
            </div>
          </div>

          {/* Post Content */}
          <div className="space-y-4 mb-4">
            <p className="text-base">{post.content}</p>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="space-x-2">
              <HeartIcon className="h-4 w-4" />
              <span>Like</span>
            </Button>
            <Button variant="ghost" size="sm" className="space-x-2">
              <MessageCircleIcon className="h-4 w-4" />
              <span>Comment</span>
            </Button>
            <Button variant="ghost" size="sm" className="space-x-2">
              <BookmarkIcon className="h-4 w-4" />
              <span>Save</span>
            </Button>
            <Button variant="ghost" size="sm" className="space-x-2">
              <ShareIcon className="h-4 w-4" />
              <span>Share</span>
            </Button>
          </div>
        </article>
      ))}
    </div>
  );
}
