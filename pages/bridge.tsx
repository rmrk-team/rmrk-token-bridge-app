import type { NextPage } from "next";
import Head from "next/head";
import { PageBridge } from "components/page-bridge/page-bridge";

const Bridge: NextPage = () => {
  return (
    <>
      <Head>
        <title>RMRK Token Manager</title>
        <meta
          content="Token migrator helps you to migrate your xcRMRK into new RMRK tokens"
          name="RMRK Token Manager"
        />
      </Head>
      <PageBridge />
    </>
  );
};

export default Bridge;
