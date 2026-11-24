"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { anniversaryContent } from "@/data/anniversary";
import SectionHeading from "@/components/ui/SectionHeading";
import { Calendar, ImageOff } from "lucide-react";

function TimelineImage({ src, title }: { src: string; title: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="image-placeholder aspect-[4/3] w-full rounded-lg flex flex-col items-center justify-center gap-2 border border-gold/30">
        <ImageOff className="w-8 h-8 text-gold/70" />
        <span className="font-handwritten text-sm text-cream/60">A cherished memory</span>
      </div>
    );
  }

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-gold/30 bg-wine/20">
      <Image
        src={src}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 360px"
        className="object-cover"
        onError={() => setFailed(true)}
      />
    </div>
  );
}

export default function TimelineSection() {
  const { timeline } = anniversaryContent;

  return (
    <section
      id="timeline"
      className="relative min-h-screen w-full flex flex-col items-center justify-center py-28 sm:py-36 md:py-44 lg:py-52 bg-cream overflow-hidden text-center"
      aria-label="Our Milestones"
    >
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col items-center justify-center">
        <SectionHeading
          eyebrow="Milestones"
          title="Our Journey Together"
          subtitle="Every step, every adventure, and every memory that brought us here."
          light={false}
        />

        <div className="relative mt-10 md:mt-14 pb-10 md:pb-16 w-full">
          {/* Vertical center line */}
          <div
            aria-hidden="true"
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gold/50"
          />

          <div className="relative space-y-12 md:space-y-16 w-full">
            {timeline.map((event, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                  className="relative w-full"
                >
                  {/* Dot on line */}
                  <div
                    aria-hidden="true"
                    className="absolute left-6 md:left-1/2 top-4 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-gold bg-wine transition-colors duration-300"
                  />

                  {/* Connector pulse */}
                  <div
                    aria-hidden="true"
                    className="absolute left-6 md:left-1/2 top-4 z-[5] h-4 w-4 -translate-x-1/2 rounded-full bg-gold/30 animate-ping"
                    style={{ animationDuration: "3.5s" }}
                  />

                  {/* Card Content container */}
                  <div
                    className={cn(
                      "ml-14 md:ml-0 md:w-[calc(50%-2rem)] text-left",
                      isEven
                        ? "md:mr-auto md:pr-8 md:text-right"
                        : "md:ml-auto md:pl-8 md:text-left"
                    )}
                  >
                    <div className="rounded-xl bg-off-white p-6 shadow-xl shadow-wine/10 border border-gold/40 transition-shadow duration-300 hover:shadow-2xl">
                      {/* Date badge */}
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-body font-medium text-wine tracking-wider uppercase",
                          isEven ? "md:ml-auto" : ""
                        )}
                      >
                        <Calendar className="h-3 w-3 text-gold" />
                        {event.date}
                      </span>

                      {/* Title */}
                      <h3 className="mt-3 font-display text-2xl font-normal text-wine">
                        {event.title}
                      </h3>

                      {/* Description */}
                      <p className="mt-2 font-body text-sm sm:text-base leading-relaxed text-ink/75">
                        {event.description}
                      </p>

                      {/* Optional photo */}
                      {event.image && (
                        <div className="mt-4">
                          <TimelineImage src={event.image} title={event.title} />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* End cap for line */}
          <div
            aria-hidden="true"
            className="absolute left-6 md:left-1/2 bottom-0 z-10 h-3 w-3 -translate-x-1/2 rounded-full bg-gold"
          />
        </div>
      </div>
    </section>
  );
}
