// Mock team members
export const teamMembers = [
  {
    id: 1,
    name: "Jerome Bell",
    avatar: "JB",
    online: true,
    lastMessage: "Hey, how are the designs coming along?",
    lastTime: "2 min ago",
    unread: 2,
  },
  {
    id: 2,
    name: "Kathryn Murphy",
    avatar: "KM",
    online: true,
    lastMessage: "The user research findings look great!",
    lastTime: "1 hour ago",
    unread: 0,
  },
  {
    id: 3,
    name: "Darrell Steward",
    avatar: "DS",
    online: false,
    lastMessage: "Can we schedule a call for tomorrow?",
    lastTime: "3 hours ago",
    unread: 1,
  },
  {
    id: 4,
    name: "Annette Brooks",
    avatar: "AB",
    online: true,
    lastMessage: "Thanks for the feedback on the mockups",
    lastTime: "1 day ago",
    unread: 0,
  },
];

export const currentUser = {
  id: 0,
  name: "You",
  avatar: "Y",
  online: true,
};

// Initial messages per member (simulate chat history)
export const initialMessages = {
  1: [
    {
      sender: 1,
      text: "Hey! How are the new dashboard designs coming along?",
      time: "10:30 AM",
    },
    {
      sender: 0,
      text: "Going well! I should have the first draft ready by end of day.",
      time: "10:32 AM",
    },
    {
      sender: 1,
      text: "Awesome! Looking forward to seeing them. The client is really excited about this project.",
      time: "10:35 AM",
    },
    {
      sender: 0,
      text: "Perfect! I'll send over the Figma link once it's ready.",
      time: "10:37 AM",
    },
  ],
  2: [
    {
      sender: 2,
      text: "The user research findings look great!",
      time: "09:00 AM",
    },
    {
      sender: 0,
      text: "Thanks Kathryn! I'll incorporate them into the next sprint.",
      time: "09:05 AM",
    },
  ],
  3: [
    {
      sender: 3,
      text: "Can we schedule a call for tomorrow?",
      time: "08:00 AM",
    },
    {
      sender: 0,
      text: "Sure, what time works for you?",
      time: "08:10 AM",
    },
  ],
  4: [
    {
      sender: 4,
      text: "Thanks for the feedback on the mockups",
      time: "Yesterday",
    },
    {
      sender: 0,
      text: "You're welcome! They look great.",
      time: "Yesterday",
    },
  ],
}; 