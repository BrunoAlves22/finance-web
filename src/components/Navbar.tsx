"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { dark } from "@clerk/themes";
import { useToggleStore } from "@/stores/toggle-store";

const Navbar = () => {
  const { isToggled } = useToggleStore();
  const pathname = usePathname();
  return (
    <nav className="flex justify-between border-b border-solid border-zinc-200 px-8 py-4 dark:border-zinc-800">
      {/* ESQUERDA */}
      <div className="flex items-center gap-10">
        {/* <Image src="/logo.svg" width={173} height={39} alt="Finance AI" /> */}
        <h1 className="text-xl font-bold text-black dark:text-white">
          Finance Web
        </h1>
        <Link
          href="/"
          className={
            pathname === "/"
              ? "font-bold text-primary"
              : "rounded-md px-2 py-1 text-black text-muted-foreground transition-colors duration-200 hover:bg-zinc-300 hover:text-black dark:hover:bg-zinc-700 dark:hover:text-white"
          }
        >
          Dashboard
        </Link>
        <Link
          href="/transactions"
          className={
            pathname === "/transactions"
              ? "font-bold text-primary"
              : "rounded-md px-2 py-1 text-black text-muted-foreground transition-colors duration-200 hover:bg-zinc-300 hover:text-black dark:hover:bg-zinc-700 dark:hover:text-white"
          }
        >
          Transações
        </Link>
        <Link
          href="/subscription"
          className={
            pathname === "/subscription"
              ? "font-bold text-primary"
              : "rounded-md px-2 py-1 text-black text-muted-foreground transition-colors duration-200 hover:bg-zinc-300 hover:text-black dark:hover:bg-zinc-700 dark:hover:text-white"
          }
        >
          Assinatura
        </Link>
      </div>
      {/* DIREITA */}

      <UserButton
        showName
        appearance={{
          baseTheme: isToggled ? dark : undefined,
        }}
      />
    </nav>
  );
};

export default Navbar;
