import React from "react";
import NextHead from "next/head";

export type Props = {
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
};

export const Head = ({ ogTitle, ogDescription, ogImage }: Props) => {
  const title = ogTitle || "RMRK Token Manager";
  const description =
    ogDescription ||
    "Swap old xcRMRK tokens and transfer new RMRK tokens cross chain";
  const ogSitename =
    ogDescription || "RMRK Token Manager: unlock your RMRK tokens cross chain";
  const image =
    ogImage ||
    "https://bridge.rmrk.app/static/images/RMRK-Token-Manager-OG.png";

  return (
    <NextHead>
      <link
        rel="shortcut icon"
        href={"https://bridge.rmrk.app/static/images/favicon.png"}
      />
      <meta property="og:site_name" content={ogSitename} key="ogsitename" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1"
      />
      <title>{title}</title>
      <meta property="twitter:title" content={title} key="twittertitle" />
      <meta property="og:title" content={title} key="ogtitle" />
      <meta content={description} name="description" />
      <meta property="og:description" content={description} key="ogdesc" />
      <meta
        property="twitter:description"
        content={description}
        key="twitterdesc"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@RmrkApp" />
      <meta property="og:image" content={image} key="ogimage" />
      <meta name="twitter:image" content={image} key="twitterimage" />
    </NextHead>
  );
};
