import * as React from "react";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DrawerOrDropdownResponsiveMenu } from "@/components/drawer-or-dropdown-responsive-menu";

export function ModeSelector({
  i18n,
}: {
  i18n?: {
    light: string;
    dark: string;
    system: string;
    theme: string;
  };
}) {
  const [theme, setThemeState] = React.useState<
    "theme-light" | "dark" | "system"
  >("theme-light");

  React.useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setThemeState(isDarkMode ? "dark" : "theme-light");
  }, []);

  React.useEffect(() => {
    const isDark =
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList[isDark ? "add" : "remove"]("dark");
  }, [theme]);

  return (
    <DrawerOrDropdownResponsiveMenu
      menuTitle={i18n?.theme || "Theme"}
      menuItems={[
        {
          label: i18n?.light || "Light",
          icon: <Sun className="h-4 w-4" />,
          type: "check",
          checked: theme === "theme-light",
          onCheckedChange: () => setThemeState("theme-light"),
        },
        {
          label: i18n?.dark || "Dark",
          icon: <Moon className="h-4 w-4" />,
          type: "check",
          checked: theme === "dark",
          onCheckedChange: () => setThemeState("dark"),
        },
        {
          label: i18n?.system || "System",
          type: "check",
          checked: theme === "system",
          onCheckedChange: () => setThemeState("system"),
        },
      ]}
    >
      <Button variant="outline" size="icon" className="rounded-full">
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Theme selector</span>
      </Button>
    </DrawerOrDropdownResponsiveMenu>
  );
}
