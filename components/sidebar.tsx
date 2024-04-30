"use client";

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

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <div className="hidden space-y-4 py-4 w-60 md:flex md:flex-col lg:flex lg:flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <h1 className={cn("text-2xl font-bold", montserrat.className)}>
            Tables
          </h1>
        </Link>
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
      </div>
    </div>
  );
};

export default Sidebar;
