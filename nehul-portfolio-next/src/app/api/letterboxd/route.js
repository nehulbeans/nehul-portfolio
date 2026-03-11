import { NextResponse } from "next/server";
import Parser from "rss-parser";

export async function GET() {
  const LETTERBOXD_RSS_URL = process.env.LETTERBOXD_RSS_URL;

  if (!LETTERBOXD_RSS_URL) {
    return NextResponse.json(
      { error: "Letterboxd URL not configured" },
      { status: 500 },
    );
  }

  try {
    const parser = new Parser({
      customFields: {
        item: [
          ["letterboxd:filmTitle", "filmTitle"],
          ["letterboxd:filmYear", "filmYear"],
          ["letterboxd:memberRating", "memberRating"],
        ],
      },
    });

    const feed = await parser.parseURL(LETTERBOXD_RSS_URL);

    const watchedFilms = feed.items
      .filter((item) => item.link.includes("/film/"))
      .slice(0, 2) // Get top 2 movies
      .map((item) => {
        const ratingNum = parseFloat(item.memberRating) || 0;
        const fullStars = Math.floor(ratingNum);
        const hasHalfStar = ratingNum % 1 !== 0;

        let starString = "★".repeat(fullStars);
        if (hasHalfStar) starString += "½";

        // Extract review text from the HTML description block
        // Letterboxd puts the review in <p> tags after the poster image
        let reviewText = "";
        if (item.contentSnippet) {
          // Removes "Watched on [Date]" and "Contains spoilers" text
          reviewText = item.contentSnippet
            .replace(/Watched on .*?\./, "")
            .replace(/This review may contain spoilers\./, "")
            .trim();
        }

        return {
          title: item.filmTitle || item.title.split(" - ")[0],
          year: item.filmYear || "",
          rating: starString,
          review: reviewText,
          link: item.link,
        };
      });

    return NextResponse.json(watchedFilms, {
      headers: { "Cache-Control": "s-maxage=14400, stale-while-revalidate" },
    });
  } catch (error) {
    console.error("Error fetching Letterboxd RSS:", error);
    return NextResponse.json([], { status: 500 });
  }
}
