import pinyin from "pinyin";

interface ZhProps {
  children: string;
  displayPinyin: boolean;
}

const Zh = ({ children: zhInput, displayPinyin = false }: ZhProps) => {
  const pinyinOutput = pinyin(zhInput).join(" ");

  return (
    <>
      <span className="chinese text-[23px]">{zhInput}</span>
      {displayPinyin && <span className="pl-1">({pinyinOutput})</span>}
    </>
  );
};

export default Zh;
