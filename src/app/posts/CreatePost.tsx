/** Client Component
 * useState와 같은 Hooks나 onClick 이벤트 등을 사용하려면
 * Client Component를 사용합니다.
 */

"use client";

import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation"; //next/router랑 구분해서 사용해야 함

const CreatePost = () => {
  const [title, setTitle] = useState("");

  const router = useRouter();

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      await fetch("http://127.0.0.1:8090/api/collections/posts/records/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
        }),
      });

      setTitle("");
      // refresh()를 호츌하면 현재 경로가 서버에서 업데이트된 할 일 목록을 새로고침 하고 가져옵니다.
      router.refresh();
    },
    [router, title]
  );

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button type="submit">Create Post</button>
    </form>
  );
};

export default CreatePost;
