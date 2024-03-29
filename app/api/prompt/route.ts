import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		await connectToDB();
		const data = await Prompt.find({}).populate("creator");

		return NextResponse.json(data, { status: 200 });
	} catch (error: any) {
		return NextResponse.json(
			{ error: "Faild to get the prompts" },
			{ status: 500 }
		);
	}
}
