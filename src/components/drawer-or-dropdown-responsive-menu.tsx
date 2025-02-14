import * as React from "react";

import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

type MenuItems = ({
  icon?: React.ReactNode;
  label: string;
} & (
  | {
      type: "check";
      checked?: boolean;
      onCheckedChange?: (checked: boolean) => void;
    }
  | {
      type: "button";
      onClick: (e: React.MouseEvent<HTMLElement>) => void;
    }
))[];

export interface DrawerDialogDemoProps
  extends React.HTMLAttributes<HTMLDivElement> {
  menuTitle: React.ReactNode;
  menuDescription?: React.ReactNode;
  menuItems?: MenuItems;
}

const DrawerOrDropdownResponsiveMenu = React.forwardRef<
  HTMLDivElement,
  DrawerDialogDemoProps
>(({ children, menuItems, menuDescription, menuTitle, ...props }, ref) => {
  const [open, setOpen] = React.useState(false);
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <div ref={ref} {...props}>
            {children}
          </div>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>{menuTitle}</DrawerTitle>
            <DrawerDescription>{menuDescription}</DrawerDescription>
          </DrawerHeader>
          <div className="pb-8 px-4 flex flex-col gap-1">
            {menuItems?.map((item, index) =>
              item.type === "check" ? (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className={cn({
                    "bg-accent text-accent-foreground": item.checked,
                  })}
                  onClick={() => {
                    item.onCheckedChange?.(!item.checked);
                    setOpen(false);
                  }}
                >
                  {item.icon}
                  {item.label}
                </Button>
              ) : (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    item.onClick(e);
                    setOpen(false);
                  }}
                >
                  {item.icon}
                  {item.label}
                </Button>
              )
            )}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <div ref={ref} {...props}>
          {children}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{menuTitle}</DropdownMenuLabel>
        {menuDescription && (
          <p className="text-sm text-muted-foreground px-2 pb-2">
            {menuDescription}
          </p>
        )}
        <DropdownMenuGroup>
          {menuItems?.map((item, index) =>
            item.type === "button" ? (
              <DropdownMenuItem
                key={index}
                className="cursor-pointer"
                onClick={item.onClick}
              >
                {item.icon}
                {item.label}
              </DropdownMenuItem>
            ) : (
              <DropdownMenuCheckboxItem
                key={index}
                className="cursor-pointer"
                checked={item.checked}
                onCheckedChange={(checked) =>
                  checked && item.onCheckedChange?.(checked)
                }
              >
                <div className="flex justify-between items-center w-full">
                  {item.label}
                  {item.icon}
                </div>
              </DropdownMenuCheckboxItem>
            )
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});
DrawerOrDropdownResponsiveMenu.displayName = "DrawerOrDropdownResponsiveMenu";

export { DrawerOrDropdownResponsiveMenu };
