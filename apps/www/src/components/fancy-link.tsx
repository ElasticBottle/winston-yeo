import { cn } from "@rectangular-labs/ui/utils/cn";
import { Link, type LinkComponent } from "@tanstack/react-router";

export const FancyLinkVariant = () =>
  "relative h-full transform-gpu py-5 text-xl transition-colors will-change-transform before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-full before:origin-left before:scale-x-0 before:transform before:bg-current before:transition-transform before:duration-300 before:will-change-transform hover:before:scale-x-100 data-[active=true]:bg-sidebar data-[active=true]:font-bold";

export function FancyLink(
  args: Parameters<LinkComponent<"a">>[0] & { children: React.ReactNode },
) {
  const { className, ...rest } = args;
  return <Link className={cn(FancyLinkVariant(), className)} {...rest} />;
}
