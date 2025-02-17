import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function EntryPoint() {
  // Check if the user is logged in
  const session = await auth();

  // Get the user from the session
  const user = session?.user;

  // If the user is not logged in...
  if(!user) {
    // Redirect to the sign in page
    return redirect("/auth/signin");
  }

  // Otherwise...redirect to the home page
  return redirect("/home");
}