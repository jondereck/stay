
import bcrypt from 'bcrypt';
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server'


export async function POST(
  request: Request
) {
  const body = await request.json();
  const {
    email,
    name,
    password
  } = body;


  if (!email || !name || !password) {
    return NextResponse.json({
      error: ' Please provide all required fields',
      status: 400
    })
  }

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      { error: 'Invalid email address' },
      { status: 400 }
    )
  }

  if (name.length < 3) {
    return NextResponse.json(
      { error: 'Name must be longer than 3 characters' },
      { status: 400 }
    )
  }


  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()-_=+]{8,}$/;
  if (!passwordRegex.test(password)) {
    return NextResponse.json(
      { error: 'Password must be at least 8 characters long and contain at least one uppercase letter' },
      { status: 400 },)
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email
    }
  })

  if (existingUser) {
    return NextResponse.json(
      { error: 'Email already registed' },
      { status: 409 }
    )
  }
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      }
    });

    return NextResponse.json(user);
  }