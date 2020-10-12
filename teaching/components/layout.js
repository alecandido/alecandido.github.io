import Head from "next/head";
import Link from "next/link";
import Navbar from "./navbar";
import styles from "./layout.module.scss";
import utilStyles from "../styles/utils.module.css";

const name = "Alessandro Candido";
export const siteTitle = "teaching - " + name;

export default function Layout({ children, home }) {
  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <Head>
          <meta charset="utf-8" />

          <link
            rel="icon"
            type="image/png"
            href="https://alecandido.github.io/favicon.png"
          />
          <meta
            name="description"
            content="Personal Homepage of Alessandro Candido"
          />

          <meta
            property="og:image"
            content={`https://alecandido.github.io/favicon.png`}
          />
          <meta name="og:title" content={siteTitle} />
          <meta name="twitter:card" content="summary_large_image" />

          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <script
            defer
            src="https://use.fontawesome.com/releases/v5.3.1/js/all.js"
          ></script>
        </Head>
        <header className={styles.header}>
          {home ? (
            <>
              <h1>Teaching</h1>
              <div className={styles.backToHomeHeader}>
                <a href="/">← Back to home</a>
              </div>
            </>
          ) : (
            <></>
          )}
        </header>
        <main>{children}</main>
        {home ? (
          <div className={styles.backToHome}>
            <a href="/">← Back to home</a>
          </div>
        ) : (
          <div className={styles.backToHome}>
            <Link href="/" as={process.env.BACKEND_URL + "/"}>
              <a>← Back to teaching</a>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
