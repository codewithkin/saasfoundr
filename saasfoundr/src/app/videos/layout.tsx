import { AppLayout } from "@/components/shared/AppLayout";

export default function VideosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
