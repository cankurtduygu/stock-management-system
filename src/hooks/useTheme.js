import { useDispatch } from "react-redux";
import { setTheme } from "@/features/themeSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";

//bu useTheme hooku neden olustulrdu. biz burdaki useEffekti slice icinde calistiramaiyz cunku useEffet browsera ait bir yapi. Bu nedenle useTheme hooku olusturarak useEffect'i burada kullanabiliriz. Bu hook, theme bilgisini store'dan alarak sayfa yüklendiğinde veya theme değiştiğinde sayfanın temasını günceller. Ayrıca setTheme fonksiyonunu da döndürerek componentlerde theme'i değiştirmemize olanak tanır. Ornegin, bir component'te const { theme, setTheme } = useTheme(); seklinde kullanarak theme bilgisini alabilir ve setTheme fonksiyonunu kullanarak theme'i değiştirebiliriz. Boylece sayfanın temasını dinamik olarak değiştirebiliriz.

export function useTheme() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  return { theme, setTheme: (newTheme) => dispatch(setTheme(newTheme)) };
}
