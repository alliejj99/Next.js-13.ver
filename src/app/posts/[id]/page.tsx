async function getPost(postId: string) {
  const res = await fetch(
    `http://127.0.0.1:8090/api/collections/posts/records/${postId}`,
    { next: { revalidate: 10 } } // 캐시된 데이터를 일정 시간 간격으로 재검증 하려면 fetch에서 next.revalidate 옵션을 사용할 수 있습니다. 기본 단위는 "초"입니다.
  );

  const data = res.json();
  return data;
}

const PostDetailPage = async ({ params }: any) => {
  const post = await getPost(params.id);

  return (
    <div>
      <h1>posts/{post.id}</h1>
      <div>
        <h3>{post.title}</h3>
        <p>{post.created}</p>
      </div>
    </div>
  );
};

export default PostDetailPage;
