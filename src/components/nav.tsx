import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { createContext, useContext } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type BreakpointType = "sm" | "md" | "lg" | "xl" | "2xl";

interface NavProps {
  className?: string;
  compact?: boolean | BreakpointType;
  children?: React.ReactNode;
}

interface NavLinkProps {
  href: string;
  icon?: React.ReactNode;
  label?: string;
  external?: boolean;
  className?: string;
  variant?: "primary" | "foreground" | "secondary";
  selected?: boolean;
  compact?: boolean;
}

type CompactContextType = boolean | BreakpointType | undefined;
const CompactContext = createContext<CompactContextType>(undefined);

function useCompact() {
  const context = useContext(CompactContext);
  return context ?? "md";
}

function NavLink({
  href,
  icon,
  label,
  external,
  className,
  variant = "primary",
  selected,
  compact: compactFromProps,
}: NavLinkProps) {
  const compactFromContext = useCompact();

  const compact =
    compactFromProps !== undefined ? compactFromProps : compactFromContext;
  const breakpoint = typeof compact === "string" ? compact : "";
  const alwaysCompact = typeof compact === "boolean" && compact;

  const linkContent = (
    <Button
      asChild
      variant="link"
      className={cn(
        "group relative px-2",
        {
          "text-foreground": variant === "foreground",
          "text-secondary": variant === "secondary",
        },
        {
          underline: selected,
        },
        className
      )}
    >
      <a
        href={href}
        {...(external && {
          target: "_blank",
          rel: "noopener noreferrer",
        })}
      >
        {icon}
        {label && (
          <span
            className={cn({
              hidden: alwaysCompact,
              "hidden sm:block": breakpoint === "sm",
              "hidden md:block": breakpoint === "md",
              "hidden lg:block": breakpoint === "lg",
              "hidden 2xl:block": breakpoint === "2xl",
            })}
          >
            {label}
          </span>
        )}
        <span
          className={cn(
            "absolute bottom-1 left-1/2 w-0 h-px transition-all group-hover:w-1/2 -translate-x-1/2",
            {
              "w-1/2": selected,
            },
            {
              "bg-primary": variant == "primary",
              "bg-foreground": variant == "foreground",
              "bg-secondary": variant == "secondary",
            },
            {
              block: alwaysCompact,
              "sm:hidden": breakpoint === "sm",
              "md:hidden": breakpoint === "md",
              "lg:hidden": breakpoint === "lg",
              "2xl:hidden": breakpoint === "2xl",
            }
          )}
        />
      </a>
    </Button>
  );

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
        <TooltipContent
          className={cn({
            block: alwaysCompact,
            "sm:hidden": breakpoint === "sm",
            "md:hidden": breakpoint === "md",
            "lg:hidden": breakpoint === "lg",
            "2xl:hidden": breakpoint === "2xl",
          })}
        >
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export function PrimaryNavLink(props: Omit<NavLinkProps, "variant">) {
  return <NavLink {...props} variant="primary" />;
}

export function ForegroundNavLink(props: Omit<NavLinkProps, "variant">) {
  return <NavLink {...props} variant="foreground" />;
}

export function SecondaryNavLink(props: Omit<NavLinkProps, "variant">) {
  return <NavLink {...props} variant="secondary" />;
}

export function Nav({ className, compact = "md", children }: NavProps) {
  const breakpoint = typeof compact === "string" ? compact : "";
  const alwaysCompact = typeof compact === "boolean" && compact;

  return (
    <CompactContext.Provider value={compact}>
      <nav
        className={cn(
          "bg-background/80 backdrop-blur-sm z-10",
          "rounded-full px-2 py-2",
          "border-border border shadow-md",
          "flex gap-2 items-center",
          "w-full",
          className
        )}
      >
        {children}
      </nav>
    </CompactContext.Provider>
  );
}
