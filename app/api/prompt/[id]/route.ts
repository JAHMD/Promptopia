import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
	request: NextRequest,
	{ params: { id } }: { params: { id: string } }
) {
	try {
		await connectToDB();
		const prompt = await Prompt.findById(id).populate("creator");

		if (!prompt) {
			return NextResponse.json(
				{ message: "Prompt not found" },
				{ status: 404 }
			);
		}
		return NextResponse.json(prompt, { status: 200 });
	} catch (error: any) {
		return NextResponse.json(
			{ error: "Faild to get the prompt" },
			{ status: 500 }
		);
	}
}

export async function PATCH(
	request: NextRequest,
	{ params: { id } }: { params: { id: string } }
) {
	const { prompt, tag } = await request.json();
	try {
		await connectToDB();
		const existingPrompt = await Prompt.findById(id);

		if (!existingPrompt) {
			return NextResponse.json(
				{ message: "Prompt not found" },
				{ status: 404 }
			);
		}
		existingPrompt.prompt = prompt;
		existingPrompt.tag = tag;

		await existingPrompt.save();

		return NextResponse.json(existingPrompt, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ error: "Faild to get the prompt" },
			{ status: 500 }
		);
	}
}

export async function DELETE(
	request: NextRequest,
	{ params: { id } }: { params: { id: string } }
) {
	try {
		await connectToDB();
		await Prompt.findByIdAndDelete(id);

		return NextResponse.json({ message: "Success to delete" }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ error: "Faild to delete the prompt" },
			{ status: 500 }
		);
	}
}
