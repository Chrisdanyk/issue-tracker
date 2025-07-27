import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";
import { IssueSchema } from "../../validationSchemas";


export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const validation = IssueSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(validation.error.format(), { status: 400 });
        }

        const { title, description } = validation.data;

        const newIssue = await prisma.issue.create({
            data: {
                title,
                description,
            },
        });

        return NextResponse.json(newIssue, { status: 201 });
    } catch (error) {
        console.error('Error creating issue:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
