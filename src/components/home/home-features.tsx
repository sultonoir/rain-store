import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CircleDashed, Leaf, Sparkles } from "lucide-react";
import { type ReactNode } from "react";

export default function HomeFeatures() {
  const features = [
    {
      title: "Sustainable Materials",
      desc: "We source only the finest eco-friendly fabrics and materials that are kind to the planet and luxurious to wear.",
      icon: Leaf,
    },
    {
      title: "Timeless Design",
      desc: "Our designs balance contemporary trends with enduring elegance for pieces that remain stylish year after year.",
      icon: CircleDashed,
    },
    {
      title: "Exclusive Collections",
      desc: "Limited edition pieces and collaborations with renowned designers create truly unique additions to your wardrobe.",
      icon: Sparkles,
    },
  ];
  return (
    <section className="bg-zinc-50 py-16 dark:bg-transparent">
      <div className="@container mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h2 className="text-4xl font-semibold text-balance lg:text-5xl">
            Crafted with Excellence
          </h2>
          <p className="mt-4">
            Every piece in our collection embodies our commitment to quality,
            sustainability, and timeless style that transcends seasons.
          </p>
        </div>
        <div className="mx-auto mt-8 grid max-w-sm gap-6 *:text-center md:mt-16 @min-4xl:max-w-full @min-4xl:grid-cols-3">
          {features.map((feat) => (
            <Card className="group shadow-zinc-950/5" key={feat.title}>
              <CardHeader className="pb-3">
                <CardDecorator>
                  <feat.icon className="size-6" aria-hidden />
                </CardDecorator>

                <h3 className="mt-6 font-medium">{feat.title}</h3>
              </CardHeader>

              <CardContent>
                <p className="text-sm">{feat.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
  <div className="relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:bg-white/5 dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
    <div
      aria-hidden
      className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px]"
    />
    <div
      aria-hidden
      className="to-card absolute inset-0 bg-radial from-transparent to-75%"
    />
    <div className="bg-card absolute inset-0 m-auto flex size-12 items-center justify-center border-t border-l">
      {children}
    </div>
  </div>
);
