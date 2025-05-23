import { AppLayout } from "@/components/shared/AppLayout";

export default function HubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
