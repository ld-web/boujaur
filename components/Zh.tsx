import pinyin from "pinyin";

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
      <span className={`chinese ${title ? "" : "text-[23px]"}`}>{zhInput}</span>
      {displayPinyin && <span className="pl-1">({pinyinOutput})</span>}
    </>
  );
};

export default Zh;
