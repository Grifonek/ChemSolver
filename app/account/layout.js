// Layout.js
import SideNavigation from "../_components/SideNavigation";

export default function Layout({ children }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[16rem_1fr] md:gap-12 px-2 md:px-8 max-lg:mb-14">
      <SideNavigation />
      <div>{children}</div>
    </div>
  );
}
