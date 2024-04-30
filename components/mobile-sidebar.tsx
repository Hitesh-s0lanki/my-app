"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useMobileSidebarModal } from "@/hooks/use-mobile-sidebar";
import { cn } from "@/lib/utils";
import {
  CassetteTape,
  Code,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  ShoppingCartIcon,
} from "lucide-react";
import { League_Spartan, Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const montserrat = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

const routes = [
  {
    label: "Categories",
    icon: LayoutDashboard,
    href: "/",
    color: "text-sky-500",
  },
  {
    label: "Sub Categories",
    icon: CassetteTape,
    href: "/sub",
    color: "text-violet-500",
  },
  {
    label: "Product Table",
    icon: ShoppingCartIcon,
    href: "/product",
    color: "text-pink-700",
  },
];

const MobileSidebar = () => {
  const { isOpen, onClose } = useMobileSidebarModal();

  const pathname = usePathname();
  return (
    <Sheet open={isOpen} onOpenChange={() => onClose()}>
      <SheetContent
        side="left"
        className="space-y-4 py-4 w-60 flex flex-col h-full bg-[#111827] text-white"
      >
        <SheetHeader>
          <SheetTitle className=" text-white">Tables</SheetTitle>
        </SheetHeader>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathname === route.href
                  ? "text-white bg-white/10"
                  : "text-zinc-400"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
