// Sample array of log items
const centralLogItems = [
  {
    title: "Milestone Reached",
    date: "11/22/2024",
    description: "Shot list submitted",
  },
  {
    title: "Project Started",
    date: "10/15/2024",
    description: "Kick-off meeting held",
  },
  {
    title: "First Draft Submitted",
    date: "11/01/2024",
    description: "Initial draft of the screenplay submitted",
  },
  {
    title: "Casting Completed",
    date: "11/10/2024",
    description: "Main cast members finalized",
  },
  {
    title: "Location Scouting",
    date: "11/05/2024",
    description: "Potential filming locations reviewed",
  },
  {
    title: "Equipment Secured",
    date: "11/12/2024",
    description: "All necessary filming equipment rented",
  },
  {
    title: "Rehearsals Started",
    date: "11/15/2024",
    description: "Actors began scene rehearsals",
  },
  {
    title: "Costume Design Approved",
    date: "11/18/2024",
    description: "Final costume designs signed off",
  },
  {
    title: "Storyboard Completed",
    date: "11/20/2024",
    description: "Storyboard finalized and distributed",
  },
  {
    title: "Sound Design Meeting",
    date: "11/22/2024",
    description: "Sound design strategies discussed",
  },
  {
    title: "Production Schedule Finalized",
    date: "11/25/2024",
    description: "Detailed production schedule completed",
  },
  {
    title: "Props Delivered",
    date: "11/28/2024",
    description: "All props received and organized",
  },
  {
    title: "Lighting Test Conducted",
    date: "11/30/2024",
    description: "Initial lighting tests completed on location",
  },
];

let centralCrew = [
  {
    name: "Amelia Thompson",
    title: "Director",
    email: "email@example.com",
    finishedTasks: [
      {
        task: "Screenplay submitted",
        date: "11/22/2024",
      },
    ],
    unfinishedTasks: [
      {
        task: "Storyboard",
        dueDate: "12/01/2024",
      },
      {
        task: "Shot list",
        dueDate: "12/15/2024",
      },
    ],
  },
  {
    name: "Katie Walker",
    title: "Cinematographer",
    email: "ethan.walker@example.com",
    finishedTasks: [
      {
        task: "Camera tests completed",
        date: "11/20/2023",
      },
    ],
    unfinishedTasks: [
      {
        task: "Lighting plan",
        dueDate: "12/03/2023",
      },
    ],
  },
  {
    name: "Sophia Brown",
    title: "Production Designer",
    email: "sophia.brown@example.com",
    finishedTasks: [
      {
        task: "Initial sketches submitted",
        date: "11/15/2023",
      },
    ],
    unfinishedTasks: [
      {
        task: "Prop acquisition",
        dueDate: "12/05/2023",
      },
      {
        task: "Set design finalization",
        dueDate: "12/10/2023",
      },
    ],
  },
  {
    name: "Mannie Edwards",
    title: "Sound Engineer",
    email: "james.carter@example.com",
    finishedTasks: [
      {
        task: "Audio equipment list finalized",
        date: "11/18/2023",
      },
    ],
    unfinishedTasks: [
      {
        task: "Microphone placement plan",
        dueDate: "12/02/2023",
      },
    ],
  },
  {
    name: "Lily Martinez",
    title: "Editor",
    email: "lily.martinez@example.com",
    finishedTasks: [
      {
        task: "Rough cut reviewed",
        date: "11/22/2023",
      },
    ],
    unfinishedTasks: [
      {
        task: "Final cut assembly",
        dueDate: "12/20/2023",
      },
    ],
  },
  {
    name: "Michael Johnson",
    title: "Production Assistant",
    email: "michael.johnson@example.com",
    finishedTasks: [
      {
        task: "Call sheet distribution",
        date: "11/21/2023",
      },
    ],
    unfinishedTasks: [
      {
        task: "Schedule confirmation with crew",
        dueDate: "11/30/2023",
      },
      {
        task: "Location scouting",
        dueDate: "12/07/2024",
      },
    ],
  },
];

let userIs = {
  name: "Lily Martinez",
  title: "Editor",
  email: "lily.martinez@example.com",
  finishedTasks: [
    {
      task: "Rough cut reviewed",
      date: "11/22/2023",
    },
  ],
  unfinishedTasks: [
    {
      task: "Final cut assembly",
      dueDate: "12/20/2023",
    },
  ],
};

let chatHistory = [
  {
    user: "Amelia Thompson",
    message: "Hello team! Let's get started on the shot list.",
    timestamp: "11/22/2024 10:00 AM",
  },
];

// Set session storage

function setPlaceholderData() {
  localStorage.setItem("crew", JSON.stringify(centralCrew));
  localStorage.setItem("logItems", JSON.stringify(centralLogItems));
  localStorage.setItem("userIs", JSON.stringify(userIs));
  localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
}
