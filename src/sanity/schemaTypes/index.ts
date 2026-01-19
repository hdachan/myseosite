import { type SchemaTypeDefinition } from "sanity";
import { post } from "./post";
import tour from "./tour"; // 👈 1. tour 파일을 불러옵니다 (import)

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, tour], // 👈 2. 목록에 tour를 추가합니다.
};
