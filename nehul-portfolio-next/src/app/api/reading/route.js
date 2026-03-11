import { NextResponse } from "next/server";

export async function GET() {
  const FABLE_API_URL = process.env.FABLE_API_URL;

  if (!FABLE_API_URL) {
    return NextResponse.json(
      { error: "Fable API URL not configured" },
      { status: 500 },
    );
  }

  try {
    const response = await fetch(FABLE_API_URL, {
      next: { revalidate: 43200 },
      headers: {
        Accept: "application/json",
        "User-Agent": "Portfolio-Scraper/1.0",
      },
    });

    if (!response.ok)
      throw new Error(`Fable API responded with ${response.status}`);

    const data = await response.json();

    // Map over the first 3 books
    const books = (data.results || []).slice(0, 3).map((item) => {
      const b = item.book;
      const author =
        b.authors && b.authors.length > 0
          ? b.authors[0].name
          : "Unknown Author";
      return {
        title: b.title,
        author: author,
        cover: b.cover_image_resize,
        link: b.url || "https://fable.co/fabler/nehul-962688577407",
      };
    });

    return NextResponse.json(books);
  } catch (error) {
    console.error("Error fetching from Fable:", error);
    return NextResponse.json([], { status: 500 });
  }
}
