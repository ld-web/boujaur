import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPostsMetadata, PostMetadata } from "../lib/posts";

interface HomeProps {
  postsData: PostMetadata[];
  locale: string;
}

export default function Home({ postsData, locale }: HomeProps) {
  return (
    <section className="prose place-content-center prose-xl prose-zinc">
      <h1 className="text-center my-20">BOUJAUR</h1>

      <p>
        Les articles ci-dessous présentent certains moments choisis, issus de
        mon séjour à Taïwan entre Novembre 2022 et Février 2023.
      </p>

      <p>
        Ce voyage n&apos;a pas pour seul but la découverte des paysages de
        Taïwan, mais aussi l&apos;étude du chinois traditionnel, 3 mois durant,
        à l&apos;université NKNU de Kaohsiung.
      </p>

      <p>
        Les photos seront souvent de bien piètre qualité, alternant téléphone et
        appareil et, avouons-le, n&apos;ayant pas vraiment le sens de la
        composition 😊
      </p>

      <h2>Articles</h2>

      {postsData.map((postData) => {
        const formattedDate = new Date(postData.date);
        return (
          <article
            key={postData.title}
            className="grid grid-cols-1 gap-4 md:grid-cols-3 py-6 md:py-10"
          >
            <div className="col-span-2">
              <Link href={postData.slug} locale={locale}>
                <Image
                  src={`/images/${postData.cover}`}
                  alt={postData.title}
                  width="520"
                  height="300"
                  className="m-0"
                />
              </Link>
            </div>
            <div>
              <p className="my-0 text-base">
                {formattedDate.toLocaleDateString(locale)}
              </p>
              <h3 className="mt-0">
                <Link href={postData.slug} locale={locale}>
                  {postData.title}
                </Link>
              </h3>
            </div>
          </article>
        );
      })}
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
