import {
  Atom,
  BookOpen,
  Building,
  CarFront,
  ClipboardCheck,
  Coins,
  Cone,
  Earth,
  FerrisWheel,
  Heart,
  Hospital,
  Layers3,
  Mailbox,
  Navigation,
  Newspaper,
  QrCode,
  Scale,
  Star,
  Trophy,
  Tv,
} from "lucide-react";

const NewsCategories = [
  {
    title: "Most Viewed",
    url: "/mostviewed",
    icon: <Star className="h-5 w-5 mr-2" />,
  },
  {
    title: "Newest",
    url: "/newest",
    icon: <Mailbox className="h-5 w-5 mr-2" />,
  },
  {
    title: "Health",
    url: "/health",
    icon: <Hospital className="h-5 w-5 mr-2" />,
  },
  {
    title: "World",
    url: "/world",
    icon: <Earth className="h-5 w-5 mr-2" />,
  },
  {
    title: "Life",
    url: "/life",
    icon: <Heart className="h-5 w-5 mr-2" />,
  },
  {
    title: "News",
    url: "/news",
    icon: <Newspaper className="h-5 w-5 mr-2" />,
  },
  {
    title: "Business",
    url: "/business",
    icon: <Building className="h-5 w-5 mr-2" />,
  },
  {
    title: "Startup",
    url: "/startup",
    icon: <Coins className="h-5 w-5 mr-2" />,
  },
  {
    title: "Entertainment",
    url: "/entertainment",
    icon: <Tv className="h-5 w-5 mr-2" />,
  },
  {
    title: "Sports",
    url: "/sports",
    icon: <Trophy className="h-5 w-5 mr-2" />,
  },
  {
    title: "Law",
    url: "/law",
    icon: <Scale className="h-5 w-5 mr-2" />,
  },
  {
    title: "Education",
    url: "/education",
    icon: <BookOpen className="h-5 w-5 mr-2" />,
  },

  {
    title: "Featured",
    url: "/featured",
    icon: <Layers3 className="h-5 w-5 mr-2" />,
  },
  {
    title: "Travel",
    url: "/travel",
    icon: <Navigation className="h-5 w-5 mr-2" />,
  },
  {
    title: "Science",
    url: "/science",
    icon: <Atom className="h-5 w-5 mr-2" />,
  },
  {
    title: "Digital",
    url: "/digital",
    icon: <QrCode className="h-5 w-5 mr-2" />,
  },
  {
    title: "Car",
    url: "/car",
    icon: <CarFront className="h-5 w-5 mr-2" />,
  },
  {
    title: "Opinion",
    url: "/opinion",
    icon: <ClipboardCheck className="h-5 w-5 mr-2" />,
  },
  {
    title: "Confide",
    url: "/confide",
    icon: <Cone className="h-5 w-5 mr-2" />,
  },
  {
    title: "Funny",
    url: "/funny",
    icon: <FerrisWheel className="h-5 w-5 mr-2" />,
  },
];

export { NewsCategories };
