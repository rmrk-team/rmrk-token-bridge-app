import type { NextPage } from "next";
import Head from "next/head";
import { PageHome } from "components/page-home/page-home";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>RMRK Token Manager</title>
        <meta
          content="Token migrator helps you to migrate your xcRMRK into new RMRK tokens"
          name="RMRK Token Manager"
        />
      </Head>
      <PageHome />
    </>
  );
};

export default Home;
