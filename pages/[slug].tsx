import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { serialize } from "next-mdx-remote/serialize";
import { getPostData, getPostsSlugs, PostData } from "../lib/posts";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import Zh from "../components/Zh";
import PostImage from "../components/PostImage";
import Head from "next/head";
import ToggleTheme from "../components/ToggleTheme";

interface PostProps {
  data: PostData;
  source: MDXRemoteSerializeResult;
}

const components = { PostImage, Zh };

export default function Post({ data, source }: PostProps) {
  const router = useRouter();
  const formattedDate = new Date(data.date);

  return (
    <>
      <Head>
        <title>{`BOUJAUR - ${data.title}`}</title>
      </Head>
      <div className="mt-10 ml-4 flex justify-between">
        <Link href="/" locale={router.locale} className="inline-block">
          <Image
            src="/images/arrow-left.svg"
            alt="Retour"
            width="35"
            height="35"
            className="dark:invert"
          />
        </Link>
        <ToggleTheme />
      </div>
      <div className="mb-6">
        <Image
          sizes="80vw"
          quality={50}
          src={`/images/${data.cover}`}
          alt={data.title}
          width="1080"
          height="800"
          className="m-0 mt-6"
          placeholder="blur"
          blurDataURL={data.coverPlaceholder}
        />
      </div>
      <div className="flex justify-center">
        <section className="prose place-content-center prose-xl prose-zinc dark:prose-invert">
          <div className="text-center">
            <span className="text-white text-base px-3 py-1 rounded-full bg-sky-800">
              {formattedDate.toLocaleDateString(router.locale)}
            </span>
          </div>
          <h1 className="text-center my-10">{data.title}</h1>
          <div className="mb-20">
            <MDXRemote {...source} components={components} />
          </div>
        </section>
      </div>
      <div className="my-4 mb-12 flex justify-center">
        <Link href="/" locale={router.locale} className="inline-block">
          <Image
            src="/images/arrow-left.svg"
            alt="Retour"
            width="35"
            height="35"
            className="dark:invert"
          />
        </Link>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
  const postData = await getPostData(params!.slug as string, locale!);

  const mdxSource = await serialize(postData.content);

  return {
    props: {
      data: postData,
      source: mdxSource,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const slugs = await getPostsSlugs();
  const output: { params: { slug: string; locale: string }; locale: string }[] =
    [];

  locales!.forEach((locale) => {
    slugs.forEach((slug) => {
      output.push({
        params: { slug, locale },
        locale,
      });
    });
  });

  return {
    paths: output,
    fallback: false,
  };
};
