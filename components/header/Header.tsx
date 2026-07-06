import React from "react";
import Link from "next/link";

import DarkSwitch from "./DarkSwitcher";
import LightDexNav from "./LightDexNav";
import WalletConnectButton from "../wallet-connect-button";

const Header = async () => {
  return (
    <nav className="swap__navbar flex header-default">
      <div className="header-wrapper mx-auto w-full px-4">
        <div className="flex flex-wrap justify-between items-center gap-3 py-2">
          <div className="swap__navbar-logo">
            <Link href="/" className="text-xl font-extrabold tracking-tight">
              <span className="text-[#00d4ff]">⚡</span>{" "}
              <span className="text-white">LightDex</span>
            </Link>
          </div>
          <nav className="mainmenu-nav d-none d-lg-block d-md-to-xl-block ms-md-to-xl-0">
            <LightDexNav />
          </nav>
          <div className="swap__navbar-right flex items-center">
            <DarkSwitch />
            <WalletConnectButton className="ml-4" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
