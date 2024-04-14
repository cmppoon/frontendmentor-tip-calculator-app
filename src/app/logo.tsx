import React from "react";
import Image from "next/image";
import logo from "./assets/logo.svg";

export default function Logo() {
  return <Image src={logo} alt="logo"></Image>;
}
