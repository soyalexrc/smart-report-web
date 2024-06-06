import {NextResponse} from "next/server";
import {prisma} from "@/lib/db";

export async function GET() {
    try {
        const tickets = await prisma.ticket.findMany();
        return NextResponse.json(tickets);
    } catch (e) {
        return NextResponse.json(e);
    }
}
