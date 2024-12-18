import { NextResponse } from "next/server";
import { InstagramScraper } from "@cdirks4/insta-scraper";

export async function POST(request: Request) {
  try {
    const { username } = await request.json();

    if (!username) {
      return NextResponse.json(
        { error: "Username is required" },
        { status: 400 }
      );
    }

    console.log(`[Instagram API] Starting scrape for user: ${username}`);

    const scraper = new InstagramScraper();
    const profile = await scraper.scrapeProfile(username, {
      maxScrolls: 2,
      maxPosts: 12,
      headless: true,
    });

    if (!profile) {
      return NextResponse.json(
        { error: "Failed to fetch Instagram profile" },
        { status: 404 }
      );
    }

    const profileData = {
      username: profile.username,
      fullName: profile.fullName,
      bio: profile.bio,
      isVerified: profile.isVerified,
      followerCount: profile.followerCount,
      followingCount: profile.followingCount,
      postCount: profile.postCount,
      recentPosts: profile.posts.map((post) => ({
        imageUrl: post.imageUrl,
        caption: post.caption,
        engagement: {
          likes: post.likeCount,
          comments: post.commentCount,
        },
        timestamp: post.timestamp,
      })),
    };

    console.log(`[Instagram API] Successfully scraped profile for ${username}`);
    return NextResponse.json({ profile: profileData });
  } catch (error) {
    console.error("[Instagram API] Error:", error);
    return NextResponse.json(
      { error: "Failed to scrape Instagram profile" },
      { status: 500 }
    );
  }
}
