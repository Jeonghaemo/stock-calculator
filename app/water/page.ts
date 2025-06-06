// app/average/page.ts
import { metadata } from "./metadata";
import type { Metadata } from "next";

// ✅ 메타데이터 수동 연결
export const generateMetadata = async (): Promise<Metadata> => {
  return metadata;
};

// ✅ 클라이언트 컴포넌트 가져오기
export { default } from "./page.client";
