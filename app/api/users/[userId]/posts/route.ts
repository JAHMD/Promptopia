import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	request: NextRequest,
	{ params: { userId } }: { params: { userId: string } }
) {
	try {
		await connectToDB();
		const data = await Prompt.find({ creator: userId }).populate("creator");

		return NextResponse.json(data, { status: 200 });
	} catch (error: any) {
		return NextResponse.json(
			{ error: "Faild to get the prompts" },
			{ status: 500 }
		);
	}
}
