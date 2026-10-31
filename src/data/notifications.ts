export type NoticeType = "badge" | "saved" | "offer" | "message" | "order";

export interface Notice {
  id: string;
  type: NoticeType;
  title: string;
  text: string;
  time: string;
  group: "Today" | "Earlier";
  read: boolean;
  href: string;
}

// Mock notifications. The first two mirror the Figma sample; the rest show the
// other event types a desktop inbox needs. Replace with API data later.
export const initialNotices: Notice[] = [
  { id: "n1", type: "badge", title: "New badge unlocked", text: "You just leveled up! Tap here to see your shiny new profile flex.", time: "2h", group: "Today", read: false, href: "/profile" },
  { id: "n2", type: "saved", title: "You saved an item", text: "You saved an item from Mariya’s featured wardrobe.", time: "5h", group: "Today", read: false, href: "/profile/liked" },
  { id: "n3", type: "message", title: "New message from Christina", text: "What styles of overcoats do you have in your collection?", time: "6h", group: "Today", read: true, href: "/inbox" },
  { id: "n4", type: "offer", title: "Offer received", text: "Alex offered Ð 180.00 on your Zimmermann dress.", time: "1d", group: "Earlier", read: true, href: "/inbox" },
  { id: "n5", type: "order", title: "Item ready for collection", text: "Your Polo Ralph Lauren dress sold. Get it ready for pickup.", time: "2d", group: "Earlier", read: true, href: "/profile/sold" },
];

export const noticeFilters = ["all", "unread", "read"] as const;
export type NoticeFilter = (typeof noticeFilters)[number];
