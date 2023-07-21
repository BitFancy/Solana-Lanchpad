import React, { useState } from "react";
import Layout from "../Components/Layout";
import { Button } from "primereact/button";
import Link from "next/link";

export default function NotSubscribe() {
  const [loading, setLoading] = useState(false);
  const load = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  return (
    <Layout>
      <div className="no-subscribe buy-back-image">
        <div className="mt-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="95"
            height="93"
            viewBox="0 0 95 93"
            fill="none"
          >
            <path
              d="M8.98295 43.6867C9.51139 34.1804 12.7503 25.8191 18.5097 19.6986C24.7886 13.02 34.342 8.71875 47.4965 8.71875C60.6481 8.71875 70.2016 13.02 76.4834 19.6986C82.8039 26.4149 86.0873 35.8283 86.0873 46.4942C86.0873 57.163 82.8039 66.5764 76.4834 73.2956C70.2016 79.9742 60.6511 84.2754 47.4965 84.2754C34.345 84.2754 24.7915 79.9742 18.5097 73.2956C18.2698 73.0408 18.0343 72.7821 17.8031 72.5197C16.3575 73.9585 14.508 74.9448 12.489 75.3532C13.0175 75.9984 13.5667 76.6233 14.1397 77.2336C21.71 85.281 32.9378 90.0879 47.4965 90.0879C62.0553 90.0879 73.2831 85.281 80.8505 77.2336C88.3822 69.2269 92.0248 58.2994 92.0248 46.4971C92.0248 34.6948 88.3822 23.7673 80.8505 15.7606C73.2801 7.71319 62.0553 2.90625 47.4995 2.90625C32.9378 2.90625 21.71 7.71319 14.1397 15.7606C6.60795 23.7673 2.96826 34.6948 2.96826 46.4971V46.6482C4.58169 45.0342 6.69763 43.9943 8.98295 43.6867Z"
              fill="black"
            />
            <path
              d="M17.5454 67.3262C17.1101 68.8571 16.1753 70.2066 14.8835 71.169C13.5917 72.1313 12.0139 72.6536 10.3907 72.6563C8.42226 72.6563 6.53448 71.8908 5.14261 70.5283C3.75073 69.1657 2.96879 67.3176 2.96879 65.3907V53.7657C2.94072 52.7943 3.11193 51.8272 3.47229 50.9217C3.83265 50.0161 4.37484 49.1905 5.0668 48.4937C5.75876 47.7969 6.58643 47.243 7.50087 46.8647C8.41531 46.4865 9.39795 46.2916 10.3907 46.2916C11.3834 46.2916 12.366 46.4865 13.2805 46.8647C14.1949 47.243 15.0226 47.7969 15.7145 48.4937C16.4065 49.1905 16.9487 50.0161 17.309 50.9217C17.6694 51.8272 17.8406 52.7943 17.8125 53.7657V65.3907C17.8125 66.0591 17.7205 66.7101 17.5454 67.3262ZM32.6771 18.6466L32.6682 18.696L32.6177 18.9139C32.2805 20.1645 31.7021 21.3404 30.9136 22.3782C29.4975 24.2236 26.9563 26.1563 22.2657 26.1563C21.872 26.1563 21.4944 26.3094 21.2161 26.5819C20.9377 26.8544 20.7813 27.224 20.7813 27.6094C20.7813 27.9948 20.9377 28.3644 21.2161 28.6369C21.4944 28.9095 21.872 29.0626 22.2657 29.0626C27.9657 29.0626 31.3589 26.6358 33.2886 24.1219C34.3144 22.7737 35.0644 21.2441 35.4974 19.6172C35.5255 19.5054 35.5512 19.393 35.5746 19.2801L35.5954 19.1813L35.6013 19.1493V19.1377L35.6043 19.1319C35.67 18.7519 35.5789 18.3619 35.3509 18.0477C35.1229 17.7335 34.7767 17.5208 34.3886 17.4564C34.0004 17.3921 33.602 17.4813 33.281 17.7045C32.9601 17.9277 32.7428 18.2666 32.6771 18.6466ZM62.3319 18.696L62.323 18.6495C62.2499 18.2769 62.0308 17.9472 61.7127 17.7306C61.3945 17.5141 61.0025 17.4279 60.6203 17.4905C60.2381 17.5531 59.8961 17.7596 59.6673 18.0657C59.4385 18.3719 59.3411 18.7535 59.3958 19.129C59.2711 18.696 59.3958 19.1319 59.3958 19.1319V19.1377L59.3988 19.1493L59.4047 19.1784L59.4107 19.2191L59.4255 19.2801C59.4433 19.3644 59.4671 19.4777 59.5027 19.6172C59.9357 21.2441 60.6857 22.7737 61.7114 24.1219C63.6411 26.6358 67.0344 29.0626 72.7344 29.0626C73.1281 29.0626 73.5057 28.9095 73.784 28.6369C74.0624 28.3644 74.2188 27.9948 74.2188 27.6094C74.2188 27.224 74.0624 26.8544 73.784 26.5819C73.5057 26.3094 73.1281 26.1563 72.7344 26.1563C68.0438 26.1563 65.4996 24.2236 64.0864 22.3782C63.298 21.3404 62.7196 20.1645 62.3824 18.9139C62.3639 18.8416 62.3471 18.769 62.3319 18.696ZM41.5625 43.5938C41.5625 44.7388 41.3322 45.8725 40.8846 46.9303C40.437 47.9881 39.781 48.9493 38.954 49.7589C38.1269 50.5685 37.1451 51.2107 36.0646 51.6489C34.984 52.087 33.8259 52.3126 32.6563 52.3126C31.4867 52.3126 30.3286 52.087 29.248 51.6489C28.1675 51.2107 27.1856 50.5685 26.3586 49.7589C25.5316 48.9493 24.8756 47.9881 24.428 46.9303C23.9804 45.8725 23.75 44.7388 23.75 43.5938C23.75 41.2815 24.6884 39.0638 26.3586 37.4287C28.0289 35.7936 30.2942 34.8751 32.6563 34.8751C35.0184 34.8751 37.2837 35.7936 38.954 37.4287C40.6242 39.0638 41.5625 41.2815 41.5625 43.5938ZM62.3438 52.3126C64.7059 52.3126 66.9712 51.394 68.6415 49.7589C70.3117 48.1238 71.25 45.9062 71.25 43.5938C71.25 41.2815 70.3117 39.0638 68.6415 37.4287C66.9712 35.7936 64.7059 34.8751 62.3438 34.8751C59.9817 34.8751 57.7164 35.7936 56.0461 37.4287C54.3759 39.0638 53.4375 41.2815 53.4375 43.5938C53.4375 45.9062 54.3759 48.1238 56.0461 49.7589C57.7164 51.394 59.9817 52.3126 62.3438 52.3126ZM36.4949 68.8985C35.9383 68.3535 35.6257 67.6144 35.6257 66.8438C35.6257 66.0732 35.9383 65.3341 36.4949 64.7891L36.4979 64.7833L36.5038 64.7804L36.5127 64.7717L36.5364 64.7484L36.5958 64.6903L36.7769 64.5304C36.9688 64.3683 37.1669 64.2131 37.3707 64.0654C37.8664 63.6992 38.573 63.2401 39.4933 62.7896C41.3399 61.8887 44.0177 61.0313 47.5 61.0313C50.9824 61.0313 53.6602 61.8857 55.5068 62.7896C56.4271 63.2401 57.1336 63.6992 57.6324 64.0654C57.9 64.2612 58.1576 64.4697 58.4043 64.6903L58.4636 64.7484L58.4874 64.7717L58.4963 64.7804L58.5022 64.7833L58.5052 64.7891C59.0513 65.3332 59.357 66.0657 59.3563 66.8285C59.3556 67.5913 59.0487 68.3232 58.5016 68.8664C57.9545 69.4096 57.2112 69.7204 56.4321 69.7319C55.653 69.7433 54.9005 69.4544 54.3371 68.9276L54.3133 68.9072C53.8618 68.5511 53.372 68.2442 52.8527 67.9918C51.7305 67.4367 49.9552 66.8438 47.5 66.8438C45.0449 66.8438 43.2696 67.4425 42.1474 67.9889C41.6279 68.2422 41.1381 68.5501 40.6868 68.9072L40.663 68.9276C40.1036 69.4597 39.3528 69.755 38.5729 69.7496C37.7929 69.7441 37.0464 69.4384 36.4949 68.8985Z"
              fill="black"
            />
          </svg>
        </div>
        <div className="font-bold mt-3">You Have not Subscribed Yet</div>
        <div className="font-bold">Take the Next Step</div>
        <Link href="/buySubscription">
          <div className="mt-5">
            <Button loading={loading} onClick={load} label="Buy Subscriptions"></Button>
          </div>
        </Link>
      </div>
    </Layout>
  );
}
