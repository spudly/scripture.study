import React, { FC } from "react";
import Link from "next/link";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import classnames from "classnames";

const Pagination: FC<{
  type: "prev" | "next";
  href: string;
}> = ({ type, href }) => (
  <Link href="/[volume]/[book]/[chapter]" as={href}>
    <a
      className={classnames(
        "fixed flex flex-col justify-center items-center top-0 bottom-0 w-20 text-center text-6xl text-gray-500 hover:text-gray-900 cursor-pointer hover:bg-gray-200 duration-300",
        {
          "left-0": type === "prev",
          "right-0": type === "next"
        }
      )}
    >
      {type === "prev" ? <MdNavigateBefore /> : <MdNavigateNext />}
    </a>
  </Link>
);

export default Pagination;
