import { useTheme } from "next-themes";
import Image from "next/image";

const ToggleTheme = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <button type="button" onClick={toggleTheme}>
      <Image
        src={theme === "light" ? "/images/moon.svg" : "/images/sun.svg"}
        alt="Retour"
        width="27"
        height="27"
        className="m-0 dark:invert"
      />
    </button>
  );
};

export default ToggleTheme;
