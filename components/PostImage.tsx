import Image, { ImageProps } from "next/image";

interface PostImageProps extends ImageProps {
  label?: string;
}

const PostImage = ({ label, ...props }: PostImageProps) => (
  <div className="flex flex-col justify-center items-center">
    <Image
      quality={60}
      sizes="(max-width: 768px) 85vw, 50vw"
      src={props.src}
      alt={props.alt}
      width={props.width}
      height={props.height}
      className={label && "mb-0"}
    />
    {label && (
      <div className="text-sm text-center text-stone-500 dark:text-stone-200">
        {label}
      </div>
    )}
  </div>
);

export default PostImage;
