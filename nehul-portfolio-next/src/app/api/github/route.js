import { NextResponse } from "next/server";

const USERNAME = "nehulbeans";

export async function GET() {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) throw new Error(`Upstream responded ${res.status}`);
    const data = await res.json();

    return NextResponse.json({
      total: data.total?.lastYear ?? 0,
      contributions: data.contributions ?? [], // [{ date, count, level 0-4 }]
    });
  } catch (err) {
    console.error("GitHub contributions error:", err);
    return NextResponse.json(
      { total: 0, contributions: [] },
      { status: 500 },
    );
  }
}
