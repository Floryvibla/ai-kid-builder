import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {

  try {
    return Response.json({
      response: 'ok!'
    })

  } catch (error) {
    console.log("Error: ", error);
  }

}