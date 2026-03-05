// Centralized command registry for easy extension.
const COMMANDS = {
  help: {
    description: "Display available commands",
    output: [
      "Available commands:",
      "  help      -> display available commands",
      "  about     -> show info about me",
      "  projects  -> list portfolio projects",
      "  skills    -> show technical skills",
      "  resume    -> display resume link",
      "  github    -> open GitHub profile",
      "  linkedin  -> open LinkedIn profile",
      "  contact   -> show email and social links",
      "  clear     -> clear terminal screen",
      "  hack      -> run easter egg animation"
    ]
  },
  ls: {
    description: "Display available commands",
    output: [
      "Available commands:",
      "  help      -> display available commands",
      "  about     -> show info about me",
      "  projects  -> list portfolio projects",
      "  skills    -> show technical skills",
      "  resume    -> display resume link",
      "  github    -> open GitHub profile",
      "  linkedin  -> open LinkedIn profile",
      "  contact   -> show email and social links",
      "  clear     -> clear terminal screen",
      "  hack      -> run easter egg animation"
    ]
  },
  about: {
    description: "Show information about me",
    output: [
      "Name: Kasen Moore",
      "Title: Senior IT/Cybersecurity Student",
      "School: Utah Tech University",
      "Focus: Defensive security, networking, Linux, and practical automation."
    ]
  },
  projects: {
    description: "List projects",
    output: [
      "Projects:",
      "  1. Roommate Hub - Collaborative app for roommate coordination.",
      "  2. Watch Story Shop - E-commerce storefront and product storytelling site.",
      "  3. Cybersecurity Labs - Hands-on labs for threat analysis and system hardening."
    ]
  },
  skills: {
    description: "Show technical skills",
    output: [
      "Technical Skills:",
      "  - Networking",
      "  - Linux",
      "  - Cybersecurity",
      "  - Programming (JavaScript, Python, Bash)"
    ]
  },
  resume: {
    description: "Display resume download link",
    output: ["Resume: <a class=\"link\" href=\"#\" target=\"_blank\" rel=\"noopener noreferrer\">Download Resume (PDF)</a>"]
  },
  github: {
    description: "Open GitHub profile",
    action: () => window.open("https://github.com/FunkyKasen", "_blank", "noopener"),
    output: ["Opening GitHub profile..."]
  },
  linkedin: {
    description: "Open LinkedIn profile",
    action: () => window.open("https://www.linkedin.com/in/kasen-moore-b628332b3/", "_blank", "noopener"),
    output: ["Opening LinkedIn profile..."]
  },
  contact: {
    description: "Show contact details",
    output: [
      "Contact:",
      "  Email: kasenrayce@gmail.com",
      "  GitHub: https://github.com/FunkyKasen",
      "  LinkedIn: https://www.linkedin.com/in/kasen-moore-b628332b3/"
    ]
  },
  clear: {
    description: "Clear the terminal output",
    clear: true
  },
  hack: {
    description: "Run fake hacking easter egg",
    hack: true
  }
};

const COMMAND_LIST = Object.keys(COMMANDS);

const BANNER = [
  "██╗  ██╗ █████╗ ███████╗███████╗███╗   ██╗",
  "██║ ██╔╝██╔══██╗██╔════╝██╔════╝████╗  ██║",
  "█████╔╝ ███████║███████╗█████╗  ██╔██╗ ██║",
  "██╔═██╗ ██╔══██║╚════██║██╔══╝  ██║╚██╗██║",
  "██║  ██╗██║  ██║███████║███████╗██║ ╚████║",
  "╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═══╝",
  "",
  "Kasen Moore | IT & Cybersecurity Portfolio",
  "Type 'help' to view available commands."
];

const MOBILE_BANNER = [
  " _  __    _    ____  _____ _   _ ",
  "| |/ /   / \\  / ___|| ____| \\ | |",
  "| ' /   / _ \\ \\___ \\|  _| |  \\| |",
  "| . \\  / ___ \\ ___) | |___| |\\  |",
  "|_|\\_\\/_/   \\_\\____/|_____|_| \\_|",
  "",
  "Kasen Moore | IT & Cybersecurity Portfolio",
  "Type 'help' to view available commands."
];

const BOOT_SEQUENCE = [
  "[BOOT] Initializing secure shell...",
  "[BOOT] Loading kernel modules...",
  "[BOOT] Encrypting session...",
  "[BOOT] Establishing remote uplink...",
  "[BOOT] Access granted.",
  ""
];
