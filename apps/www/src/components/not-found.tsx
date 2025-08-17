import {
  Button,
  buttonVariants,
} from "@rectangular-labs/ui/components/ui/button";
import { Link } from "@tanstack/react-router";

export function NotFound({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center space-y-2 p-2">
      <div className="text-muted-foreground">
        {children || <p>The page you are looking for does not exist.</p>}
      </div>
      <p className="flex flex-wrap items-center gap-2">
        <Button
          onClick={() => window.history.back()}
          type="button"
          variant="outline"
        >
          Go back
        </Button>
        <Link className={buttonVariants({ variant: "secondary" })} to="/">
          Start Over
        </Link>
      </p>
    </div>
  );
}
