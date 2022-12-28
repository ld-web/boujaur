import { GetStaticProps } from "next";
import PostListItem from "../components/PostListItem";
import ToggleTheme from "../components/ToggleTheme";
import { getPostsMetadata, PostMetadata } from "../lib/posts";

interface HomeProps {
  postsData: PostMetadata[];
  locale: string;
}

export default function Home({ postsData, locale }: HomeProps) {
  return (
    <section className="prose place-content-center prose-xl prose-zinc dark:prose-invert">
      <div className="mt-6 text-center">
        <ToggleTheme />
      </div>
      <h1 className="text-center my-20 mt-12">BOUJAUR</h1>

      <p>
        Moments choisis, issus de mon séjour à Taïwan entre Novembre 2022 et
        Février 2023.
      </p>

      <p>
        Ce voyage n&apos;a pas pour seul but la découverte de Taïwan, sa
        culture, sa nourriture, ses paysages...mais aussi l&apos;étude du
        chinois traditionnel, 3 mois durant, à l&apos;université NKNU de
        Kaohsiung.
      </p>

      <p>
        Les photos seront souvent de bien piètre qualité, alternant téléphone et
        appareil, et puis, simplement, j&apos;y connais rien en photo 😊
      </p>

      <h2>Articles</h2>

      {postsData.map((postData) => (
        <PostListItem data={postData} locale={locale} key={postData.slug} />
      ))}
    </section>
  );
}

export const getStaticProps: GetStaticProps = async ({
  locale,
  defaultLocale,
}) => {
  const data = await getPostsMetadata(locale ?? defaultLocale!);
  data.sort((a, b) => {
    if (a.date < b.date) return -1;
    if (a.date > b.date) return 1;

    return 0;
  });

  return {
    props: {
      postsData: JSON.parse(JSON.stringify(data.reverse())),
      locale: locale ?? defaultLocale!,
    },
  };
};
