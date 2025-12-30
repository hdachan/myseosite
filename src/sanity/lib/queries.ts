// queries.ts
import { groq } from "next-sanity";

export const blogListQuery = groq`
  *[_type == "post"] | order(date desc){
    _id,
    title,
    "slug": slug.current,
    description,
    category,
    readTime,
    "publishedAt": date,
    featured,
    image{
      asset->{
        _id,
        url
      }
    },
    author
  }
`;

export const blogDetailQuery = groq`
  *[_type == "post" && slug.current == $slug][0]{
    title,
    description,
    content,
    category,
    tags,
    readTime,
    "publishedAt": date,
    featured,
    image{
      asset->{
        _id,
        url
      }
    },
    author
  }
`;
