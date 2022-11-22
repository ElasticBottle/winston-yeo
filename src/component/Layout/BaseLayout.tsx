import { Grid } from "@mantine/core";
import { Albert_Sans } from "@next/font/google";
import React from "react";

const font = Albert_Sans({
  subsets: ["latin"],
  variable: "--font-albert-sans",
});

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Grid grow className={`${font.className}`} columns={5}>
      <Grid.Col xs={0} md={1} />
      <Grid.Col xs={5} md={4}>
        {children}
      </Grid.Col>
    </Grid>
  );
}
