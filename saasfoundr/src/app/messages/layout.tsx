import { AppLayout } from "@/components/shared/AppLayout";

export default function MessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
