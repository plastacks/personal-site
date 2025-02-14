import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface ProjectCardProps extends React.HTMLAttributes<HTMLDivElement> {
  avatar?: string;
  avatarFallback?: React.ReactNode;
  name: string;
  description: React.ReactNode;
  githubLink: string | null;
  maxContentHeight?: string;
  i18n?: {
    "view-on-github"?: string;
    "coming-soon"?: string;
  };
}

export const ProjectCard = React.forwardRef<HTMLDivElement, ProjectCardProps>(
  (
    {
      avatar,
      avatarFallback,
      name,
      description,
      githubLink,
      i18n,
      maxContentHeight,
      ...props
    }: ProjectCardProps,
    ref
  ) => {
    return (
      <Card
        {...props}
        ref={ref}
        className={cn(
          "prose dark:prose-invert max-w-none prose-sm",
          props.className
        )}
      >
        <CardHeader className="flex flex-row items-center justify-between space-x-4 prose-lg">
          <div>
            {(avatar || avatarFallback) && (
              <Avatar>
                {avatar && <AvatarImage src={avatar} alt={name} />}
                {avatarFallback && (
                  <AvatarFallback>{avatarFallback}</AvatarFallback>
                )}
              </Avatar>
            )}
            <CardTitle>
              <h3 className="not-prose">{name}</h3>
            </CardTitle>
          </div>
          {githubLink ? (
            <Button asChild variant="link" className="!m-0 !p-0 not-prose">
              <a href={githubLink} target="_blank" rel="noopener noreferrer">
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <title>GitHub</title>
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
                </svg>
                <span>{i18n?.["view-on-github"] || "View on GitHub"}</span>
              </a>
            </Button>
          ) : (
            <div className="text-muted-foreground text-sm pointer-events-none select-none touch-none">
              {i18n?.["coming-soon"] || "Coming soon"}
            </div>
          )}
        </CardHeader>
        <Separator />
        <CardContent>
          <ScrollArea
            style={{
              height: maxContentHeight,
            }}
          >
            {description}
          </ScrollArea>
        </CardContent>
      </Card>
    );
  }
);
ProjectCard.displayName = "ProjectCard";
