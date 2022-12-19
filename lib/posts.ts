import fs from "fs";
import matter from "gray-matter";
import path from "path";

export interface PostMetadata {
  cover: string;
  title: string;
  slug: string;
  date: number;
}

export interface PostData extends PostMetadata {
  content: string;
}

const postsDirectory = path.join(process.cwd(), "posts");

export async function getPostsMetadata(
  locale: string
): Promise<PostMetadata[]> {
  const postsMetadata: PostMetadata[] = [];
  const directoryName = path.join(postsDirectory, locale);
  const fileNames = fs.readdirSync(directoryName);

  fileNames.forEach((fileName) => {
    const fullPath = path.join(directoryName, `${fileName}`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);
    const data: PostMetadata = {
      cover: matterResult.data.cover as string,
      title: matterResult.data.title as string,
      slug: fileName.replace(/\.mdx$/, ""),
      date: Math.floor((matterResult.data.date as Date).getTime()),
    };
    postsMetadata.push(data);
  });

  return postsMetadata;
}

export async function getPostsSlugs(): Promise<string[]> {
  const slugs: string[] = [];
  const directoryName = path.join(postsDirectory, "fr");
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
  const fullPath = path.join(postsDirectory, locale, slug + ".mdx");
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);
  const data: PostData = {
    cover: matterResult.data.cover as string,
    title: matterResult.data.title as string,
    date: Math.floor((matterResult.data.date as Date).getTime()),
    slug,
    content: matterResult.content,
  };
  return data;
}
