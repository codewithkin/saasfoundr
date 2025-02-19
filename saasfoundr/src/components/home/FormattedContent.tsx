'use client';

interface FormattedContentProps {
  content: string;
}

export function FormattedContent({ content }: FormattedContentProps) {
  const formatContent = (text: string) => {
    // Split content into parts based on @mentions and #hashtags
    const parts = text.split(/(@\w+|#\w+)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('@')) {
        return (
          <span key={index} className="text-blue-500 hover:underline cursor-pointer">
            {part}
          </span>
        );
      }
      if (part.startsWith('#')) {
        return (
          <span key={index} className="text-indigo-500 hover:underline cursor-pointer">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return <div>{formatContent(content)}</div>;
}
