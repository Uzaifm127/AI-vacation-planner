import { generateVacation } from "@/lib/agent";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { destination, endDate, reason, startDate } = await req.json();

    const response = await generateVacation(
      destination,
      startDate.toString().split("T")[0],
      endDate.toString().split("T")[0],
      reason
    );

    return NextResponse.json(
      {
        plan: response,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 404 }
    );
  }
};
