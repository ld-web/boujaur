import pinyin from "pinyin";
import localFont from "next/font/local";

const zhFont = localFont({
  src: "../public/fonts/edukai-4.0_subset.ttf",
});

interface ZhProps {
  children: string;
  displayPinyin: boolean;
  title: boolean;
}

const Zh = ({
  children: zhInput,
  displayPinyin = false,
  title = false,
}: ZhProps) => {
  const pinyinOutput = pinyin(zhInput).join(" ");

  return (
    <>
      <span
        className={`${zhFont.className} chinese ${title ? "" : "text-[23px]"}`}
      >
        {zhInput}
      </span>
      {displayPinyin && <span className="pl-1">({pinyinOutput})</span>}
    </>
  );
};

export default Zh;
