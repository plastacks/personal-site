import { Button } from "@/components/ui/button";
import { DrawerOrDropdownResponsiveMenu } from "@/components/drawer-or-dropdown-responsive-menu";
import { navigate } from "astro:transitions/client";
import { languages, languagesIcon } from "@/i18n/ui";

export function LanguageSelector({
  currentLang,
  i18n,
}: {
  currentLang: keyof typeof languages;
  i18n?: {
    language: string;
    "change.the.language": string;
  };
}) {
  return (
    <DrawerOrDropdownResponsiveMenu
      menuTitle={i18n?.language || "Language"}
      menuDescription={i18n?.["change.the.language"] || "Change the language"}
      menuItems={Object.entries(languages).map(([lang, label]) => ({
        type: "check",
        label,
        icon: languagesIcon[lang as keyof typeof languages],
        checked: lang === currentLang,
        onCheckedChange: (checked) => checked && handleLangChange(lang),
      }))}
    >
      <Button variant="outline" size="icon" className="rounded-full">
        {languagesIcon[currentLang]}
        <span className="sr-only">Select language</span>
      </Button>
    </DrawerOrDropdownResponsiveMenu>
  );
}

const handleLangChange = (lang: string) => {
  const url = new URL(window.location.href);
  const segments = url.pathname.split("/").filter(Boolean);
  let langFound = false;

  for (let i = 0; i < segments.length; i++) {
    if (segments[i] in languages) {
      segments[i] = lang;
      langFound = true;
      break;
    }
  }

  if (!langFound) {
    segments.unshift(lang);
  }

  url.pathname = "/" + segments.join("/") + "/";
  navigate(url.toString());
};
