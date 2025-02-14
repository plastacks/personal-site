import { Check, Copy, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";

import toast from "react-hot-toast";
import { DrawerOrDropdownResponsiveMenu } from "@/components/drawer-or-dropdown-responsive-menu";

export function ContactButton({
  i18n,
}: {
  i18n?: {
    "contact.contact.me": string;
    "contact.send.me.an.email": string;
    "contact.copied": string;
  };
}) {
  return (
    <DrawerOrDropdownResponsiveMenu
      menuTitle={i18n?.["contact.contact.me"] || "Contact me"}
      menuDescription={
        i18n?.["contact.send.me.an.email"] || "Send me an email!"
      }
      menuItems={[
        {
          type: "button",
          onClick: () => {
            navigator.clipboard.writeText("davide.plastini.dev.info@gmail.com");
            toast(i18n?.["contact.copied"] || "Copied to clipboard", {
              icon: <Check className="h-4 w-4 text-primary" />,
              className: "!bg-background !text-foreground border border-px",
            });
          },
          label: "davide.plastini.dev.info@gmail.com",
          icon: <Copy className="h-4 w-4" />,
        },
      ]}
    >
      <Button variant="outline" size="sm" className="hidden md:flex">
        <Mail />
        <span className="hidden md:block">
          {i18n?.["contact.contact.me"] || "Contact me"}
        </span>
      </Button>
      <Button variant="outline" size="icon" className="rounded-full md:hidden">
        <Mail />
        <span className="hidden md:block">
          {i18n?.["contact.contact.me"] || "Contact me"}
        </span>
      </Button>
    </DrawerOrDropdownResponsiveMenu>
  );
}
