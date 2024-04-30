"use client";

import { useMobileSidebarModal } from "@/hooks/use-mobile-sidebar";
import { MenuIcon } from "lucide-react";

const Navbar = () => {
  const { onOpen } = useMobileSidebarModal();

  return (
    <nav className=" z-50 bg-background fixed flex md:hidden lg:hidden items-center top-0 w-full p-6">
      <MenuIcon
        onClick={() => onOpen()}
        role="button"
        className="h-6 w-6 text-muted-foreground"
      />
    </nav>
  );
};

export default Navbar;
