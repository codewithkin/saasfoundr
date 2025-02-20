import { AppLayout } from "@/components/shared/AppLayout";

export default function DiscoverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
