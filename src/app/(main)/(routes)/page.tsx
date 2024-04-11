import MaxWidthWarrper from "@/components/max-width-wrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { BookOpen, CalendarDays, WalletMinimal } from "lucide-react";
import Link from "next/link";

const perks = [
  {
    name: "Revenue management",
    Icon: WalletMinimal,
    description: "Convient in checking and managing your revenue",
  },
  {
    name: "Study progress tracking",
    Icon: BookOpen,
    description: "Track your study progress with our study tracker",
  },
  {
    name: "Family Calendar",
    Icon: CalendarDays,
    description: "Manage your family activities with our calendar",
  },
];

const Home = () => {
  return (
    <>
      <MaxWidthWarrper className="">
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Your website to manage{" "}
            <span className="text-blue-600">family activities</span>.
          </h1>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            Welcome to FamFund. Every function on our platform is verified by
            our team to ensure our highest quatity standards
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link href="/features" className={buttonVariants()}>
              Features
            </Link>
            <Button variant="ghost">Our quality promise &rarr;</Button>
          </div>
        </div>
        {/* List features */}
      </MaxWidthWarrper>
      <section className="border-t border-gray-200 bg-gray-50">
        <MaxWidthWarrper className="py-20">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
            {perks.map((perk) => (
              <div
                key={perk.name}
                className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
              >
                <div className="md:flex-shrink-0 flex justify-center">
                  <div className="h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-900">
                    {<perk.Icon className="w-1/3 h-1/3" />}
                  </div>
                </div>
                <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                  <h3 className="text-base font-medium text-gray-900">
                    {perk.name}
                  </h3>
                  <p className="mt-3 text-sm text-foreground">
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </MaxWidthWarrper>
      </section>
    </>
  );
};

export default Home;
