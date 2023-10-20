import Head from "next/head";
import AppTopbar from "../layout/AppTopbar";
import AppFooterDashboard from "../layout/AppFooterDashbord";

const LayoutDashbord = ({ children, title, description }) => {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/primeicons@6.0.1/primeicons.css"
        ></link>
        <link rel="shortcut icon" href="/dark.svg" width="60" height="60" />
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <AppTopbar />
      {children}
      <AppFooterDashboard />
    </>
  );
};

export default LayoutDashbord;
