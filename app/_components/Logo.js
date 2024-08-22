import logo from "@/public/logo.png";
import Image from "next/image";

function Logo() {
  return (
    <Image
      src={logo}
      width="45"
      height="45"
      quality={100}
      alt="logo"
      //   className="w-10 h-10 rounded-full"
      //   referrerPolicy="no-referrer"
    />
  );
}

export default Logo;
