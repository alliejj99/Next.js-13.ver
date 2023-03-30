import Link from "next/link";
import React from "react";

async function getPosts() {
  const res = await fetch(
    "http://127.0.0.1:8090/api/collections/posts/records"
  );
  const data = await res.json();

  // data가 존재하면 items를 리턴하고 타입은 any로 설정
  return data?.items as any[];
}

const PostsPage = async () => {
  const posts = await getPosts();

  return (
    <div>
      <h1>Posts</h1>
      {posts?.map((post) => {
        return <PostItem key={post.id} post={post} />;
      })}
    </div>
  );
};

export default PostsPage;

const PostItem = ({ post }: any) => {
  const { id, title, created } = post || {};
  return (
    <Link href={`/posts/${id}`}>
      <div>
        <h3>{title}</h3>
        <p>{created}</p>
      </div>
    </Link>
  );
};
