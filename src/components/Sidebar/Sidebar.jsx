import styles from "./Sidebar.module.css";

import AppNav from "../AppNav/AppNav";
import Logo from "../Logo/Logo";

import { Outlet } from "react-router-dom";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      {/* This is where we want to show the nested routes! */}
      {/* outlet similar to children prop */}
      <Outlet />
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()} by WorldWise Inc.
        </p>
      </footer>
    </div>
  );
}
export default Sidebar;
