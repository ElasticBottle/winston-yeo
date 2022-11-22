import type { ColorScheme } from "@mantine/core";
import { ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { trpc } from "@utils/trpc";
import { setCookie } from "cookies-next";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppType } from "next/app";
import { useState } from "react";
import BaseLayout from "src/component/Layout/BaseLayout";

import "../styles/globals.css";

const MyApp: AppType<{ session: Session | null; colorScheme: ColorScheme }> = ({
  Component,
  pageProps: { session, colorScheme: colorSchemeProp, ...pageProps },
}) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>(colorSchemeProp);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme =
      value || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(nextColorScheme);
    setCookie("mantine-color-scheme", nextColorScheme, {
      maxAge: 60 * 60 * 24 * 30,
    });
  };

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <SessionProvider session={session}>
          <BaseLayout>
            <Component {...pageProps} />
          </BaseLayout>
        </SessionProvider>{" "}
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default trpc.withTRPC(MyApp);
