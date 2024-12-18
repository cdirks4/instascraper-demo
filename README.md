# Instagram Scraper Demo

A simple demo showing how to use [@cdirks4/insta-scraper](https://www.npmjs.com/package/@cdirks4/insta-scraper) to fetch Instagram profiles and posts.

## Installation

```bash
npm install @cdirks4/insta-scraper

# Install Chrome for Puppeteer
npx puppeteer browsers install chrome
```

## Basic Usage

```typescript
import { InstagramScraper } from '@cdirks4/insta-scraper'

// Initialize scraper
const scraper = new InstagramScraper()

try {
  // Fetch profile with options
  const profile = await scraper.scrapeProfile('username', {
    maxScrolls: 2, // How many times to scroll for more posts
    maxPosts: 12, // Maximum number of posts to fetch
    headless: true // Run browser in headless mode
  })

  // Access profile data
  console.log({
    username: profile.username,
    fullName: profile.fullName,
    bio: profile.bio,
    isVerified: profile.isVerified,
    followerCount: profile.followerCount,
    followingCount: profile.followingCount,
    postCount: profile.postCount
  })

  // Access posts
  profile.posts.forEach(post => {
    console.log({
      imageUrl: post.imageUrl,
      caption: post.caption,
      likeCount: post.likeCount,
      commentCount: post.commentCount,
      timestamp: post.timestamp
    })
  })
} catch (error) {
  console.error('Failed to scrape profile:', error)
}
```

## Error Handling

The scraper may throw errors for various reasons:

- Profile not found
- Private profiles
- Rate limiting
- Network issues

Always wrap scraping calls in try/catch blocks and implement appropriate error handling for your use case.

## Notes

- This package operates within Instagram's public access limitations
- Some profiles may not be accessible if they are private
- Consider implementing rate limiting in production use
- Image URLs may expire after some time
- Requires Puppeteer ≥ 22.8.2 for optimal compatibility

## Troubleshooting

If you see warnings about deprecated Puppeteer versions, update your dependencies:

```bash
npm install @cdirks4/insta-scraper@latest
```
