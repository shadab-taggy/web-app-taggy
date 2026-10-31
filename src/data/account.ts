// Account menu mirrored from the mobile Profile screen (labels, order, descriptions).
export const accountLinks = [
  { href: "/profile/listings", label: "My Listings", desc: "Manage your active listings", icon: "bag" },
  { href: "/profile/boost", label: "Boost Item(s) or Feature wardrobe", desc: "Manage your boosts and featured wardrobes", icon: "megaphone" },
  { href: "/profile/listing-service", label: "Manage Listing Service", desc: "Manage your listing service", icon: "list" },
  { href: "/profile/sold", label: "Sold Items", desc: "View and manage your sold items", icon: "tag" },
  { href: "/profile/purchases", label: "My Purchases", desc: "View and manage your purchases", icon: "card" },
  { href: "/profile/tagged-issue", label: "Tagged Issue", desc: "View and manage your tagged issues", icon: "info" },
  { href: "/profile/liked", label: "My Liked Items", desc: "See your saved and liked items", icon: "heart" },
  { href: "/profile/tags", label: "Manage Tags", desc: "Add, edit and manage your tags", icon: "tags" },
  { href: "/profile/settings", label: "Settings", desc: "Manage your account settings", icon: "gear" },
] as const;

export const settingsLinks = [
  { href: "/profile/edit", label: "My profile", desc: "Manage your profile here." },
  { href: "/profile/bank", label: "Bank Details", desc: "Your bank details will be listed here." },
  { href: "/profile/addresses", label: "Address Book", desc: "Your saved address will be listed here" },
  { href: "/profile/password", label: "Change Password", desc: "Change your password here" },
  { href: "/profile/holidays", label: "Holiday Mode", desc: "Add and view your holidays here." },
  { href: "/notifications", label: "Notification Settings", desc: "Manage your alerts and notifications" },
] as const;

export const defaultAddress = {
  label: "Home",
  city: "Dubai, United Arab Emirates",
  line: "123 Al Fahidi Street, Bur Dubai, Dubai, UAE",
};
