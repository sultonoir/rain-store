export const APP_TITLE = "Rizal Store";
export const DATABASE_PREFIX = "acme";
export const TEST_DB_PREFIX = "test_acme";
export const EMAIL_SENDER = '"Rizal Store" <noreply@acme.com>';

export enum Paths {
  Home = "/",
  Login = "/login",
  Signup = "/signup",
  Dashboard = "/dashboard",
  VerifyEmail = "/verify-email",
  ResetPassword = "/reset-password",
}

export const AdminMenulist = [
  {
    title: "Dashboard",
    path: "/dashboard",
    keybind: "⇧⌘P",
  },
  {
    title: "Chats",
    path: "/dashboard/chats",
    keybind: "⇧⌘C",
  },
  {
    title: "Products",
    path: "/dashboard/products",
    keybind: "⌘J",
  },
  {
    title: "Settings",
    path: "/dashboard/products",
    keybind: "⇧⌘S",
  },
];

export const UserMenulist = [
  {
    title: "Profile",
    path: "/profile",
    keybind: "⇧⌘P",
  },
  {
    title: "Chats",
    path: "/profile/chat",
    keybind: "⇧⌘C",
  },
  {
    title: "History",
    path: "/profile/history",
    keybind: "⌘J",
  },
  {
    title: "Wishlist",
    path: "/profile/wishlist",
    keybind: "⌘K",
  },
  {
    title: "Settings",
    path: "/profile/setting",
    keybind: "⇧⌘S",
  },
];
