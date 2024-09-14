import logo from "@/public/logo.png";
import Image from "next/image";

function Logo() {
  return (
    <Image
      src={logo}
      width="45"
      height="45"
      quality={100}
      alt="ChemSolver logo"
    />
  );
}

export default Logo;
