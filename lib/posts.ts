import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { getBase64Placeholder } from "./image";

export interface PostMetadata {
  cover: string;
  coverPlaceholder: string;
  title: string;
  slug: string;
  date: number;
}

export interface PostData extends PostMetadata {
  content: string;
}

const POSTS_DIRECTORY = path.join(process.cwd(), "posts");
const IMAGES_DIRECTORY = path.join(process.cwd(), "public/images");

export async function getPostsMetadata(
  locale: string
): Promise<PostMetadata[]> {
  const postsMetadata: PostMetadata[] = [];
  const directoryName = path.join(POSTS_DIRECTORY, locale);
  const fileNames = fs.readdirSync(directoryName);

  for (const fileName of fileNames) {
    const fullPath = path.join(directoryName, `${fileName}`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    const coverPlaceholder = await getBase64Placeholder(
      path.join(IMAGES_DIRECTORY, matterResult.data.cover)
    );

    const data: PostMetadata = {
      coverPlaceholder,
      cover: matterResult.data.cover as string,
      title: matterResult.data.title as string,
      slug: fileName.replace(/\.mdx$/, ""),
      date: Math.floor((matterResult.data.date as Date).getTime()),
    };

    postsMetadata.push(data);
  }

  return postsMetadata;
}

export async function getPostsSlugs(): Promise<string[]> {
  const slugs: string[] = [];
  const directoryName = path.join(POSTS_DIRECTORY, "fr");
  const fileNames = fs.readdirSync(directoryName);

  fileNames.forEach((fileName) => {
    slugs.push(fileName.replace(/\.mdx$/, ""));
  });

  return slugs;
}

export async function getPostData(
  slug: string,
  locale: string
): Promise<PostData> {
  const fullPath = path.join(POSTS_DIRECTORY, locale, slug + ".mdx");
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);
  const coverPlaceholder = await getBase64Placeholder(
    path.join(IMAGES_DIRECTORY, matterResult.data.cover)
  );

  const data: PostData = {
    coverPlaceholder,
    cover: matterResult.data.cover as string,
    title: matterResult.data.title as string,
    date: Math.floor((matterResult.data.date as Date).getTime()),
    slug,
    content: matterResult.content,
  };
  return data;
}
