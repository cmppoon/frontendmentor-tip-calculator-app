import React from "react";
import Image from "next/image";
import personIcon from "./assets/icon-person.svg";

export default function PersonIcon() {
  return <Image src={personIcon} alt="person icon" />;
}
