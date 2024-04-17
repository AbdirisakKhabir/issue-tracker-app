import authOptions from "@/app/auth/authOptions";
import { patchIssueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    // GET THE SESSION
    const session = await getServerSession(authOptions);

    // IF THERE IS NO SESSION RETURN AUTHORIZED STATUS OF 401
    if (!session)
        return NextResponse.json({}, { status: 401 })

    const body = await request.json();

    // VALIDATE USING ISSUE SCHEMA
    const validation = patchIssueSchema.safeParse(body);

    if (!validation.success)
        return NextResponse.json(validation.error.format(), { status: 400 })

    // DESTRUCTURE THE BODY REQUEST AFTER CHECKING IF IT EXISTS
    const { assignedToUserId, title, description } = body || {};

    // CHECK IF THE USER EXISTS
    if (assignedToUserId) {
        const user = await prisma.user.findUnique({ where: { id: assignedToUserId } });

        // IF THE USER DOES NOT EXIST
        if (!user)
            return NextResponse.json({ error: "Invalid User." }, { status: 400 });
    }

    // OTHERWISE, IF THE ISSUE IS VALID, WE FIND THE ISSUE WITH THE GIVEN ID
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    });

    // IF THE ISSUE DOES NOT EXIST RETURN
    if (!issue)
        return NextResponse.json({ error: "Invalid Issue" }, { status: 404 });

    // OTHERWISE UPDATE THE ISSUE
    const updatedIssue = await prisma.issue.update({
        where: { id: issue.id },
        data: {
            title,
            description,
            assignedToUserId
        }
    });

    return NextResponse.json(updatedIssue);
}



 export async function DELETE(request: NextRequest, {params} : {params: {id: string}}){

      // GET THE SESSION
      const session = await getServerSession(authOptions);

      // IF THERE IS NO SESSION RETURN AUTHORIZED STATUS OF 401
      if(!session)
          return NextResponse.json({}, {status: 401})
        
    // OTHERIWSE If the issue is Valid we find the issue with the given ID
    const issue = await prisma.issue.findUnique({
        where: {id: parseInt(params.id)}
    });

    // IF THE ISSUE DOESNOT EXIST RETURN 
    if(!issue)
    return NextResponse.json({error: "Invalid Issue"}, {status: 404})


    // OTHERWISE UPDATE THE ISSUE
await prisma.issue.delete({
        where: { id: issue.id},
      
    });
    return NextResponse.json({});

 }