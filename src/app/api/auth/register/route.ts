import User from "@/database/user.model";
import { connectToDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    try {
        await connectToDatabase();
        const { name, email, password } = await req.json();
        if (!name || !email || !password) {
            return NextResponse.json({ success: false, message: "All inputs must be filled" });
        }
        const isExistUser = await User.findOne({ email });
        if (isExistUser) {
            return NextResponse.json({ success: false, message: `Username already exists with email ${email}` });
        }
        const hashedPassword = await hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });
        return NextResponse.json({ success: true, user });
    } catch (error) {
        const result = error as Error;
        return NextResponse.json({ error: result.message }, { status: 400 });
    }
}   