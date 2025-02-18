export default function ErrorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h1>Error</h1>
      {children}
    </div>
  );
}
