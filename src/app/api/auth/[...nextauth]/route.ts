import { authoption } from "@/lib/auth-options";
import nextAuth from "next-auth";

const handler = nextAuth(authoption);

export { handler as GET, handler as POST }