import localFont from "next/font/local";

export const hangameFont = localFont({
  src: [
    {
      path: "../../public/font/HangamePoker-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/font/HangamePoker-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/font/HangamePoker-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/font/HangamePoker-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-hangame",
});
