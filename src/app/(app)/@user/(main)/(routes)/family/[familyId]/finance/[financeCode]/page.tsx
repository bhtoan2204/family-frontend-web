import { auth } from "@/auth";
import FinanceHeader from "@/components/user/finance/finance-header";
import GuidelineHeader from "@/components/user/guideline/guideline-header";
import GuidelineStepCard from "@/components/user/guideline/guideline-step-card";
import { redirect } from "next/navigation";

const TV = [
  {
    id: "sfdgfdfg",
    title: "Open the back cover",
    description: "Use a screwdriver to open the back cover of the TV.",
    image:
      "https://imgs.search.brave.com/l4angjbQ6roWDe4SHWFqwsMNfLK6_s5LMSvVhkpsb-I/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pLnJl/ZGQuaXQveDByeDNi/N2tzOHhjMS5qcGVn",
  },
  {
    id: "fgd454dg",
    title: "Remove the power board",
    description: "Use a screwdriver to remove the power board.",
    image:
      "https://imgs.search.brave.com/q8NKPk-KdFRoKaq8GK3tX6tu-1HXvNanHLKUC40InhM/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pLnJl/ZGQuaXQvNGh6aWJy/ejJva3hjMS5qcGVn",
  },
  {
    id: "dfgdfg",
    title: "Replace the power board",
    description: "Use a screwdriver to replace the power board.",
    image:
      "https://imgs.search.brave.com/0YXa-Vxyhq9-laqcbWRzcWIdNchucngLNPqYDAGCwBU/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9yZW1v/dmVhbmRyZXBsYWNl/LmNvbS93cC1jb250/ZW50L3VwbG9hZHMv/MjAxNy8wNS9TYW1z/dW5nLVRWLVJlcGFp/ci1NYWluLUJvYXJk/LmpwZw",
  },
  {
    id: "dfgvsdvv",
    title: "Close the back cover",
    description: "Use a screwdriver to close the back cover of the TV.",
    image:
      "https://imgs.search.brave.com/tV8npN_HDFkYRgTTpWN0j-GUDEGTODhZzMVP4fysNBc/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pLnJl/ZGQuaXQvbnludzk3/OHF6NHhjMS5qcGVn",
  },
];

const Refrigerator = [
  {
    id: "sfdgfdfg",
    title: "Open the back cover",
    description:
      "Use a screwdriver to open the back cover of the Refrigerator.",
    image:
      "https://imgs.search.brave.com/BaTLmILSaCo-y4YrIdC7l0AWbG8t4XyW7K-zWsYvYi4/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/ZmFtaWx5aGFuZHlt/YW4uY29tL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDE4LzExL0ZI/MTNKVU5fNTM5XzA2/XzAwNC5qcGc_Zml0/PTY0MCw2NDA",
  },
  {
    id: "fgd454dg",
    title: "Remove the power board",
    description: "Use a screwdriver to remove the power board.",
    image:
      "https://imgs.search.brave.com/yvgZi6Y9zFMHvtk9nOHNR32qGI7bU38Piu2gr3-FA3Q/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/ZmFtaWx5aGFuZHlt/YW4uY29tL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDE4LzA0L0ZI/MDlKVU5fNDk5XzU5/XzAwMS5qcGc_Zml0/PTY0MCw2NDA",
  },
  {
    id: "dfgdfg",
    title: "Replace the power board",
    description: "Use a screwdriver to replace the power board.",
    image:
      "https://imgs.search.brave.com/6h8ZIulEpAfz3dP6kC0kVHcdF_GHDXTZRJG86wWKEGk/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/dGhlc3BydWNlLmNv/bS90aG1iLzZ6RG5i/a1QxZ3JPeTZKRDA3/X2dOa0N1cEZkcz0v/MzE1eDIwOC9maWx0/ZXJzOm5vX3Vwc2Nh/bGUoKTptYXhfYnl0/ZXMoMTUwMDAwKTpz/dHJpcF9pY2MoKS9o/b3ctdG8taW5zdGFs/bC1hLWRpc2h3YXNo/ZXItMjcxODY2Ny0w/MS1jMWI5YzJlYmJk/Yjk0MjYyOWY2ZTg3/MmYzZWVjZjQxMi5q/cGc",
  },
  {
    id: "dfgvsdvv",
    title: "Close the back cover",
    description:
      "Use a screwdriver to close the back cover of the Refrigerator.",
    image:
      "https://imgs.search.brave.com/KdSL8Ew9kbTFPylVr9ZNvrbIpd0izq0bn73bHUgxQoE/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/ZmFtaWx5aGFuZHlt/YW4uY29tL3dwLWNv/bnRlbnQvdXBsb2Fk/cy8yMDE4LzExL0ZI/MDROT1ZfMDM0Nzhf/MDEwLWljZW1ha2Vy/LmpwZz9maXQ9NjQw/LDY0MA",
  },
];

interface FinancePageProps {
  params: {
    familyId: string;
    financeCode: string;
    itemId: string;
  };
}

const GuidelinePage = async ({ params }: FinancePageProps) => {
  const session = await auth();

  if (!session?.accessToken) {
    return redirect("/login");
  }
  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <FinanceHeader familyId={params.familyId} />

      <div className="container space-y-3 mt-5">
        {params.financeCode === "1" &&
          TV.map((step, index) => (
            <GuidelineStepCard
              step={index + 1}
              title={step.title}
              description={step.description}
              image={step.image}
              key={step.id}
            />
          ))}
        {params.financeCode === "2" &&
          Refrigerator.map((step, index) => (
            <GuidelineStepCard
              step={index + 1}
              title={step.title}
              description={step.description}
              image={step.image}
              key={step.id}
            />
          ))}
      </div>
    </div>
  );
};

export default GuidelinePage;
