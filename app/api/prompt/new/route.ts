import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
	const { userId, prompt, tag } = await req.json();
	try {
		await connectToDB();
		const newPrompt = new Prompt({ creator: userId, prompt, tag });
		await newPrompt.save();

		return NextResponse.json(
			{ message: "Prompt created successfuly" },
			{ status: 201 }
		);
	} catch (error) {
		return NextResponse.json(
			{ error: "Faild to create new prompt" },
			{ status: 500 }
		);
	}
};
