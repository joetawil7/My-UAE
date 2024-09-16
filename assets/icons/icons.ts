export type IconsId =
  | "3-dots-horizontal"
  | "add-post"
  | "birthday-cake"
  | "block"
  | "blocked"
  | "bookmark-empty"
  | "bookmark-filled"
  | "camera"
  | "chat-filled"
  | "chat"
  | "check-mark"
  | "checkbox-checked"
  | "checkbox"
  | "chevron-down"
  | "chevron-left"
  | "chevron-right"
  | "comment"
  | "create-post"
  | "envelope-border"
  | "envelope"
  | "eye"
  | "flow"
  | "gallery"
  | "hamburger"
  | "history"
  | "home"
  | "information"
  | "like"
  | "location"
  | "lock"
  | "media"
  | "notification-add"
  | "notification-filled"
  | "notification"
  | "notifications-off"
  | "plus-circle"
  | "plus"
  | "post-item"
  | "posts"
  | "progress"
  | "report"
  | "restart"
  | "search"
  | "settings"
  | "share"
  | "star-empty"
  | "star-filled"
  | "star-half"
  | "tag_people"
  | "trash"
  | "user-block"
  | "user-dismiss"
  | "user-followed"
  | "user-subscribe"
  | "user-subscribed"
  | "user"
  | "verified"
  | "x";

export type IconsKey =
  | "i3DotsHorizontal"
  | "AddPost"
  | "BirthdayCake"
  | "Block"
  | "Blocked"
  | "BookmarkEmpty"
  | "BookmarkFilled"
  | "Camera"
  | "ChatFilled"
  | "Chat"
  | "CheckMark"
  | "CheckboxChecked"
  | "Checkbox"
  | "ChevronDown"
  | "ChevronLeft"
  | "ChevronRight"
  | "Comment"
  | "CreatePost"
  | "EnvelopeBorder"
  | "Envelope"
  | "Eye"
  | "Flow"
  | "Gallery"
  | "Hamburger"
  | "History"
  | "Home"
  | "Information"
  | "Like"
  | "Location"
  | "Lock"
  | "Media"
  | "NotificationAdd"
  | "NotificationFilled"
  | "Notification"
  | "NotificationsOff"
  | "PlusCircle"
  | "Plus"
  | "PostItem"
  | "Posts"
  | "Progress"
  | "Report"
  | "Restart"
  | "Search"
  | "Settings"
  | "Share"
  | "StarEmpty"
  | "StarFilled"
  | "StarHalf"
  | "TagPeople"
  | "Trash"
  | "UserBlock"
  | "UserDismiss"
  | "UserFollowed"
  | "UserSubscribe"
  | "UserSubscribed"
  | "User"
  | "Verified"
  | "X";

export enum Icons {
  i3DotsHorizontal = "3-dots-horizontal",
  AddPost = "add-post",
  BirthdayCake = "birthday-cake",
  Block = "block",
  Blocked = "blocked",
  BookmarkEmpty = "bookmark-empty",
  BookmarkFilled = "bookmark-filled",
  Camera = "camera",
  ChatFilled = "chat-filled",
  Chat = "chat",
  CheckMark = "check-mark",
  CheckboxChecked = "checkbox-checked",
  Checkbox = "checkbox",
  ChevronDown = "chevron-down",
  ChevronLeft = "chevron-left",
  ChevronRight = "chevron-right",
  Comment = "comment",
  CreatePost = "create-post",
  EnvelopeBorder = "envelope-border",
  Envelope = "envelope",
  Eye = "eye",
  Flow = "flow",
  Gallery = "gallery",
  Hamburger = "hamburger",
  History = "history",
  Home = "home",
  Information = "information",
  Like = "like",
  Location = "location",
  Lock = "lock",
  Media = "media",
  NotificationAdd = "notification-add",
  NotificationFilled = "notification-filled",
  Notification = "notification",
  NotificationsOff = "notifications-off",
  PlusCircle = "plus-circle",
  Plus = "plus",
  PostItem = "post-item",
  Posts = "posts",
  Progress = "progress",
  Report = "report",
  Restart = "restart",
  Search = "search",
  Settings = "settings",
  Share = "share",
  StarEmpty = "star-empty",
  StarFilled = "star-filled",
  StarHalf = "star-half",
  TagPeople = "tag_people",
  Trash = "trash",
  UserBlock = "user-block",
  UserDismiss = "user-dismiss",
  UserFollowed = "user-followed",
  UserSubscribe = "user-subscribe",
  UserSubscribed = "user-subscribed",
  User = "user",
  Verified = "verified",
  X = "x",
}

export const ICONS_CODEPOINTS: { [key in Icons]: string } = {
  [Icons.i3DotsHorizontal]: "61697",
  [Icons.AddPost]: "61698",
  [Icons.BirthdayCake]: "61699",
  [Icons.Block]: "61700",
  [Icons.Blocked]: "61701",
  [Icons.BookmarkEmpty]: "61702",
  [Icons.BookmarkFilled]: "61703",
  [Icons.Camera]: "61704",
  [Icons.ChatFilled]: "61705",
  [Icons.Chat]: "61706",
  [Icons.CheckMark]: "61707",
  [Icons.CheckboxChecked]: "61708",
  [Icons.Checkbox]: "61709",
  [Icons.ChevronDown]: "61710",
  [Icons.ChevronLeft]: "61711",
  [Icons.ChevronRight]: "61712",
  [Icons.Comment]: "61713",
  [Icons.CreatePost]: "61714",
  [Icons.EnvelopeBorder]: "61715",
  [Icons.Envelope]: "61716",
  [Icons.Eye]: "61717",
  [Icons.Flow]: "61718",
  [Icons.Gallery]: "61719",
  [Icons.Hamburger]: "61720",
  [Icons.History]: "61721",
  [Icons.Home]: "61722",
  [Icons.Information]: "61723",
  [Icons.Like]: "61724",
  [Icons.Location]: "61725",
  [Icons.Lock]: "61726",
  [Icons.Media]: "61727",
  [Icons.NotificationAdd]: "61728",
  [Icons.NotificationFilled]: "61729",
  [Icons.Notification]: "61730",
  [Icons.NotificationsOff]: "61731",
  [Icons.PlusCircle]: "61732",
  [Icons.Plus]: "61733",
  [Icons.PostItem]: "61734",
  [Icons.Posts]: "61735",
  [Icons.Progress]: "61736",
  [Icons.Report]: "61737",
  [Icons.Restart]: "61738",
  [Icons.Search]: "61739",
  [Icons.Settings]: "61740",
  [Icons.Share]: "61741",
  [Icons.StarEmpty]: "61742",
  [Icons.StarFilled]: "61743",
  [Icons.StarHalf]: "61744",
  [Icons.TagPeople]: "61745",
  [Icons.Trash]: "61746",
  [Icons.UserBlock]: "61747",
  [Icons.UserDismiss]: "61748",
  [Icons.UserFollowed]: "61749",
  [Icons.UserSubscribe]: "61750",
  [Icons.UserSubscribed]: "61751",
  [Icons.User]: "61752",
  [Icons.Verified]: "61753",
  [Icons.X]: "61754",
};
