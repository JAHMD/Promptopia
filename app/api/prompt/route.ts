import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
	const data = await req.json();

	console.log(data);
	return NextResponse.json(JSON.stringify({}), { status: 200 });
};
