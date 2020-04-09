import React, { FC, useRef, RefObject, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import classnames from "classnames";
import useSwipe, { Direction } from "../utils/useOnSwipe";

const PaginationLink: FC<{
  type: "prev" | "next";
  href: string;
}> = ({ type, href }) => (
  <Link href="/[volume]/[book]/[chapter]" as={href}>
    <a
      className={classnames(
        "fixed hidden sm:flex flex-col justify-center items-center top-0 bottom-0 w-32 text-center text-6xl bg-gray-500 text-black cursor-pointer opacity-0 hover:opacity-25 duration-300",
        {
          "left-0": type === "prev",
          "right-0": type === "next",
        }
      )}
    >
      {type === "prev" ? <MdNavigateBefore /> : <MdNavigateNext />}
    </a>
  </Link>
);

declare global {
  interface CSSStyleDeclaration {
    overscrollBehaviorX?: string;
  }
}

const Pagination: FC<{
  prevHref?: string | null;
  nextHref?: string | null;
}> = ({ prevHref, nextHref }) => {
  const windowRef: RefObject<Window> = useRef<Window | null>(
    typeof window !== "undefined" ? window : /* SSR: */ null
  );

  useEffect(() => {
    document.body.style.overscrollBehaviorX = "none";
  }, []);

  const router = useRouter();
  useSwipe(windowRef, ({ direction }) => {
    if (prevHref && direction === Direction.RIGHT) {
      router.push(prevHref);
    } else if (nextHref && direction === Direction.LEFT) {
      router.push(nextHref);
    }
  });

  return (
    <>
      {prevHref && <PaginationLink type="prev" href={prevHref} />}
      {nextHref && <PaginationLink type="next" href={nextHref} />}
    </>
  );
};

export default Pagination;
