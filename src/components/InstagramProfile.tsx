import Image from "next/image";

interface Post {
  imageUrl: string;
  caption: string;
  engagement: {
    likes: number;
    comments: number;
  };
  timestamp: string;
}

interface ProfileProps {
  profile: {
    username: string;
    fullName: string;
    bio: string;
    isVerified: boolean;
    followerCount: number;
    followingCount: number;
    postCount: number;
    recentPosts: Post[];
  };
}

export default function InstagramProfile({ profile }: ProfileProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4 mb-4">
          <h2 className="text-2xl font-bold">
            {profile.username}
            {profile.isVerified && (
              <span className="ml-2 text-blue-500">✓</span>
            )}
          </h2>
        </div>
        <p className="text-lg font-semibold">{profile.fullName}</p>
        <p className="mt-2 whitespace-pre-wrap">{profile.bio}</p>

        <div className="flex gap-8 mt-4">
          <div>
            <span className="font-bold">{profile.postCount}</span> posts
          </div>
          <div>
            <span className="font-bold">{profile.followerCount}</span> followers
          </div>
          <div>
            <span className="font-bold">{profile.followingCount}</span>{" "}
            following
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold mb-4">Recent Posts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {profile.recentPosts.map((post, index) => (
            <div
              key={index}
              className="border rounded-lg overflow-hidden dark:border-gray-700"
            >
              <div className="relative aspect-square">
                <Image
                  src={post.imageUrl}
                  alt={post.caption || "Instagram post"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-4">
                <p className="text-sm line-clamp-2">{post.caption}</p>
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  <span>{post.engagement.likes} likes</span>
                  <span className="ml-4">
                    {post.engagement.comments} comments
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
