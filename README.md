### Next.JS 13버전으로 만드는 게시판
  This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


#### Open Source
  - [Pocket Base](https://pocketbase.io/docs)
    1. Download v0.14.0 for Windows (~14MB zip)을 다운,
    2. pocketbase파일 현재 프로젝트 루트로 복사
    3. 터미널에서 ./pocketbase serve 실행
    4. Admin UI 클릭
    5. 로그인
    6. New Collection -> Name은 프로젝트명 -> New Field -> title 필드만 생성
    7. 상단의 톱니바퀴 아이콘(설정) 클릭
    8. API Rules 클릭
    7. 잠금 해제 아이콘을 전부 잠금으로 변경 후 save change 클릭  
  
    - Data Create
      1. New Record
      2. id는 설정X Title에만 데이터 작성후 Create 클릭  
      
    - Server started at http://127.0.0.1:8090
    
---
#### Next.js 13버전
- **Component**  
  next.js 컴포넌트는 기본적으로 Server Component입니다.  
  React.js 18버전 이전에는 React를 사용하여 애플리케이션을 렌더링하는 기본적인 방법은 전적으로 클라이언트에서 하였습니다. 18버전 부터는 컴포넌트 사용이 가능해졌습니다.  
    
  Next.js는 HTML을 생성하고 React에 의해 rehydrate가 되도록 클라이언트에 전송함으로써 애플리케이션을 대화식으로 만들기 위해 클라이언트에 추가 Javascript가 필요 했습니다. -> **서버에서 미리 렌더링하기 위해 사용했던 SSR도 문제가 있었습니다.**
    
  이제 서버 및 클라이언트 Component를 사용하여 React는 클라이언트와 서버에서 렌더링할 수 있으므로 구성 요소 수준에서 렌더링 환경을 선택할 수 있습니다. 기본적으로 App 디렉토리는 서버 구성 요소를 사용하므로 서버에서 구성 요소를 쉽게 렌더링하고 클라이언트에 전송되는 JavaScript의 양을 줄일 수 있습니다. 그러나 App 내에서 클라이언트 구성 요소를 사용하고 클라이언트에서 렌더링 할 수 있는 옵션이 있습니다. -> **Server Component, Client Component 같이 사용**  

 ![image](https://user-images.githubusercontent.com/118407356/228813198-c6bd6368-84c8-4f82-8e15-b5246248a641.png)


- **Data Fetching**  
  [data-fetching DOCS](https://nextjs.org/docs/basic-features/data-fetching/get-static-props)  
  - getPost  

- **Error 처리**
  ```javascript
  async function getPost(postId: string) {
    const res = await fetch(
      `http://127.0.0.1:8090/api/collections/posts/records/${postId}`,
      { next: { revalidate: 10 } } // 캐시된 데이터를 일정 시간 간격으로 재검증 하려면 fetch에서 next.revalidate 옵션을 사용할 수 있습니다. 기본 단위는 "초"입니다.
    );

    if (!res.ok) {
      // 가장 가까이에 있는 error.js 페이지가 활성화 됩니다.
      throw new Error("Failed to Fetch Data");
    }

    const data = res.json();
    return data;
  }
  ```

- **수동으로 업데이트 해야하는 부분 수정**
  ```typescript
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
  ```