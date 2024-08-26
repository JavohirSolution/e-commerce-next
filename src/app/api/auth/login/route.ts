import User from "@/database/user.model";
import { connectToDatabase } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import { compare } from "bcrypt";

export async function POST(req: Request) {
    try {
        await connectToDatabase()
        const { email, password } = await req.json();
        if (!email || !password) {
            return NextResponse.json({ success: false, message: "All inputs must be filled" });
        }
        const isExistUser = await User.findOne({ email });
        if (!isExistUser) {
            return NextResponse.json({ success: false, message: "The user does not exist" });
        }
        const isPasswordValid = await compare(password, isExistUser.password);
        if (!isPasswordValid) {
            return NextResponse.json({ success: false, message: "Invalid creditialions" });
        }
        return NextResponse.json({ success: true, user: isExistUser })
    } catch (error) {
        const result = error as Error
        return NextResponse.json({ error: result.message, status: 400 })
    }
}