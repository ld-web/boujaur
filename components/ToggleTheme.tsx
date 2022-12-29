import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

const iconPath = (filename: string): string => `/images/${filename}.svg`;

const ToggleTheme = () => {
  const { theme, setTheme } = useTheme();
  const [themeIcon, setThemeIcon] = useState(iconPath("moon"));

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  useEffect(() => {
    setThemeIcon(() =>
      theme === "light" ? iconPath("moon") : iconPath("sun")
    );
  }, [theme]);

  return (
    <button type="button" onClick={toggleTheme}>
      <Image
        src={themeIcon}
        alt="Retour"
        width="27"
        height="27"
        className="m-0 dark:invert"
      />
    </button>
  );
};

export default ToggleTheme;
