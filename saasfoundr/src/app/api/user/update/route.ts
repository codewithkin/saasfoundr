import { prisma } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, name, username, role, field, lookingFor, connections } = await request.json();

  try {
    const updatedUser = await prisma.user.update({
      where: { email },
      data: {
        name,
        username,
        role,
        field,
        lookingFor,
        connections,
      },
    });
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.log("An error occured while updating user: ", error);
    return NextResponse.json({ error: 'Failed to update user data' }, { status: 500 });
  }
}
