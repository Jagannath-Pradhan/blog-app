import Email from "@/lib/models/email";
import { NextResponse } from "next/server";

const connectDB = require("@/lib/config/db");

const loadDB = async () => {
    await connectDB();
}
loadDB()

export async function POST(request) {
    try {
        const formData = await request.formData();
        const emailData = {
            email: formData.get('email')
        };
        await Email.create(emailData);
        return NextResponse.json({
            success: true,
            message: 'Email subscribed.'
        }, { status: 201 });
    } catch (error) {
        console.error("Error while adding email:", error)
        return NextResponse.json(
            { success: false, message: "Internal Server Error", error: error.message },
            { status: 500 }
        )
    }
}

export async function GET() {
    try {
        const emails = await Email.find({});
        return NextResponse.json({
            success: true,
            message: "Emails fetched successfully",
            emails
        }, { status: 200 });
    } catch (error) {
        console.error("Error while fetching emails:", error)
        return NextResponse.json(
            { success: false, message: "Internal Server Error", error: error.message },
            { status: 500 }
        )
    }
}

export async function DELETE(request) {
    try {
        const emailId = request.nextUrl.searchParams.get('id');
        if (!emailId) {
            return NextResponse.json({
                success: false,
                message: 'Email ID is required for deletion.'
            }, { status: 400 });
        }
        const deletedEmail = await Email.findByIdAndDelete(emailId);
        if (!deletedEmail) {
            return NextResponse.json({
                success: false,
                message: 'Email not found.'
            }, { status: 404 });
        }
        return NextResponse.json({
            success: true,
            message: 'Email deleted successfully.'
        }, { status: 200 });
    } catch (error) {
        console.error("Error while deleting email:", error)
        return NextResponse.json(
            { success: false, message: "Internal Server Error", error: error.message },
            { status: 500 }
        )
    }
}