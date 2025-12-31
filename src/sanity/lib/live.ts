import { client } from "./client";

// 1. defineLive는 구버전 라이브러리에 없으므로 사용하지 않습니다.

// 2. 대신 일반적인 fetch 함수를 'sanityFetch'라는 이름으로 직접 만듭니다.
// (이렇게 하면 다른 페이지에서 코드를 수정할 필요가 없습니다)
export async function sanityFetch({
  query,
  params = {},
}: {
  query: string;
  params?: any;
}) {
  return client.fetch(query, params, {
    // 데이터를 캐싱하지 않고 매번 새로 가져오게 설정 (실시간과 비슷하게)
    // 필요하면 { next: { revalidate: 60 } } 등으로 변경 가능
    cache: "no-store",
  });
}

// 3. SanityLive 컴포넌트는 빈 껍데기로 만들어 에러를 방지합니다.
export function SanityLive() {
  return null;
}
