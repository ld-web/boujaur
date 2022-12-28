import Image from "next/image";
import Link from "next/link";
import { PostMetadata } from "../lib/posts";

interface PostListItemProps {
  data: PostMetadata;
  locale: string;
}

const PostListItem = ({ data, locale }: PostListItemProps) => {
  const formattedDate = new Date(data.date);
  return (
    <article
      key={data.title}
      className="grid grid-cols-1 gap-4 md:grid-cols-3 py-6 md:py-10"
    >
      <div className="col-span-2">
        <Link href={data.slug} locale={locale}>
          <Image
            src={`/images/${data.cover}`}
            alt={data.title}
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
          <Link href={data.slug} locale={locale} className="no-underline">
            {data.title}
          </Link>
        </h3>
      </div>
    </article>
  );
};

export default PostListItem;
