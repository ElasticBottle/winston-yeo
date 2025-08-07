import { useTheme } from "@rectangular-labs/ui/components/theme-provider";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  const { theme } = useTheme();
  return (
    <div
      className="prose sm:prose-lg md:prose-xl data-[theme=dark]:prose-invert mx-auto max-w-4xl px-8 py-16"
      data-theme={theme}
    >
      <h1>About</h1>
      <p>
        In this section, I explain why I am indeed perhaps one of the best if
        not the best creator on the planet. For starters, this text that you are
        reading right now is in fact not written by a human, it is generated
        using an advanced AI known as GPT-3. Are you shocked? Don't be, because
        I was simply lying to you. The true purpose of the text is to fill up
        the page to look as if there is something worth saying here, when in
        reality, the is not.
      </p>

      <p>
        Around the age of 0 years old, I was born onto this planet. For many
        people around me, this seems to be a fairly common occurrence. However,
        what was not common was what followed this. There is no doubt in my mind
        that when you read what I am about to say, you will question your own
        greatness. Are you ready? I invested my life savings into Terra. Fear,
        my existence.
      </p>
    </div>
  );
}
