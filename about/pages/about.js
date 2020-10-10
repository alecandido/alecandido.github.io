import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle } from "../components/layout";

export default function About() {
  return (
    <Layout>
      <Head>
        <title>about - {siteTitle}</title>
      </Head>

      <div>About us</div>
      <div>
        Back to{" "}
        <Link href="/" as={process.env.BACKEND_URL + "/"}>
          <a>About</a>
        </Link>
      </div>
    </Layout>
  );
}
