import Image, { ImageProps } from "next/image";

interface PostImageProps extends ImageProps {
  label?: string;
}

const PostImage = ({ label, ...props }: PostImageProps) => (
  <div className="flex flex-col justify-center items-center">
    <Image
      src={props.src}
      alt={props.alt}
      width={props.width}
      height={props.height}
      className={label && "mb-0"}
    />
    {label && <div className="text-sm text-center text-stone-500">{label}</div>}
  </div>
);

export default PostImage;
