"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { anniversaryContent } from "@/data/anniversary";
import SectionHeading from "@/components/ui/SectionHeading";
import { Calendar, ImageOff } from "lucide-react";

function TimelineImage({
  src,
  title,
}: {
  src: string;
  title: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="image-placeholder aspect-[4/3] w-full rounded-lg flex flex-col items-center justify-center gap-2">
        <ImageOff className="w-8 h-8 text-champagne/60" />
        <span className="font-handwritten text-sm text-deep-brown/40">
          A memory with you
        </span>
      </div>
    );
  }

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
      <Image
        src={src}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 320px"
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
      className="relative min-h-screen flex flex-col justify-center py-20 md:py-28 lg:py-32 bg-soft-white overflow-hidden"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Milestones"
          title="Our Journey Together"
        />

        <div className="relative mt-8">
          {/* Vertical center line — left on mobile, center on md+ */}
          <div
            aria-hidden="true"
            className="absolute left-4 sm:left-5 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-champagne/40"
          />

          <div className="relative space-y-12 md:space-y-16">
            {timeline.map((event, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                  className="relative"
                >
                  {/* Dot on the line */}
                  <div
                    aria-hidden="true"
                    className={cn(
                      "absolute left-4 sm:left-5 md:left-1/2 top-2 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-champagne transition-colors duration-300",
                      "bg-deep-wine"
                    )}
                  />

                  {/* Connector pulse ring */}
                  <div
                    aria-hidden="true"
                    className="absolute left-4 sm:left-5 md:left-1/2 top-2 z-[5] h-4 w-4 -translate-x-1/2 rounded-full bg-deep-wine/20 animate-ping"
                    style={{ animationDuration: "3s" }}
                  />

                  {/* Content container */}
                  <div
                    className={cn(
                      "ml-12 sm:ml-14 md:ml-0 md:w-[calc(50%-2rem)]",
                      isEven
                        ? "md:mr-auto md:pr-8 md:text-right"
                        : "md:ml-auto md:pl-8 md:text-left"
                    )}
                  >
                    <div
                      className={cn(
                        "rounded-2xl bg-ivory p-5 sm:p-6 shadow-sm border border-dusty-rose/15 transition-shadow duration-300 hover:shadow-md",
                        isEven ? "md:rounded-r-2xl" : "md:rounded-l-2xl"
                      )}
                    >
                      {/* Date badge */}
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full bg-champagne/15 px-3 py-1 text-xs font-body font-medium text-champagne",
                          isEven ? "md:ml-auto" : ""
                        )}
                      >
                        <Calendar className="h-3 w-3" />
                        {event.date}
                      </span>

                      {/* Title */}
                      <h3 className="mt-3 font-display text-lg sm:text-xl font-semibold text-deep-brown">
                        {event.title}
                      </h3>

                      {/* Description */}
                      <p className="mt-2 font-body text-sm sm:text-base leading-relaxed text-deep-brown/70">
                        {event.description}
                      </p>

                      {/* Optional photo */}
                      {event.image && (
                        <div className="mt-4">
                          <TimelineImage
                            src={event.image}
                            title={event.title}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* End cap for the timeline line */}
          <div
            aria-hidden="true"
            className="absolute left-4 sm:left-5 md:left-1/2 bottom-0 z-10 h-3 w-3 -translate-x-1/2 rounded-full bg-champagne/60"
          />
        </div>
      </div>
    </section>
  );
}
