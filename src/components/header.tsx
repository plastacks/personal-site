import * as React from "react";
import { cn } from "@/lib/utils";

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  subtitle?: React.ReactNode;
}

const Header = React.forwardRef<HTMLElement, HeaderProps>(
  ({ className, children, subtitle, ...props }, ref) => {
    return (
      <header
        ref={ref}
        className={cn(
          "text-left sm:text-center",
          "prose dark:prose-invert",
          "w-full box-content",
          "prose-headings:text-primary dark:prose-headings:text-muted-foreground",
          className
        )}
        {...props}
      >
        <hgroup>
          <h1 className="mt-4 md:mt-6 mb-1">{children}</h1>
          {subtitle && <p className="my-0">{subtitle}</p>}
        </hgroup>
      </header>
    );
  }
);
Header.displayName = "Header";

export { Header };
