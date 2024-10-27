import Autoplay from "embla-carousel-autoplay";
import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "../ui/button";

export function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full border-none"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        <CarouselItem>
          <div className="">
            <Card className="relative border-none">
              <CardContent className="flex items-center justify-center p-0">
                <img src="./banner_drawing_1.jpg" alt="carousel one" />
              </CardContent>
              <div className="container absolute top-1/4 md:top-1/3 left-0 space-y-3 max-w-2xl text-left">
                <h2 className="capitalize text-sm md:text-xl lg:text-3xl md:font-semibold ">
                  Best Collection for <br /> Home Decoration
                </h2>
                <p className="hidden md:block text-sm font-normal">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Veritatis, corrupti!lorem5 Lorem ipsum dolor sit amet.
                </p>
                <Button className="h-6 px-2 md:h-10 md:px-4 md:py-2 text-xs font-light">
                  Shop Now
                </Button>
              </div>
            </Card>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="">
            <Card className="relative border-none">
              <CardContent className="flex items-center justify-center p-0">
                <img src="./banner_drawing_2.jpg" alt="carousel one" />
              </CardContent>
              <div className="container absolute top-1/4 md:top-1/3 left-0 space-y-3 max-w-2xl text-left">
                <h2 className="capitalize text-sm md:text-xl lg:text-3xl md:font-semibold ">
                  Best Collection for <br /> Home Decoration
                </h2>
                <p className="hidden md:block text-sm font-normal">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Veritatis, corrupti!lorem5 Lorem ipsum dolor sit amet.
                </p>
                <Button className="h-6 px-2 md:h-10 md:px-4 md:py-2 text-xs font-light">
                  Shop Now
                </Button>
              </div>
            </Card>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div className="">
            <Card className="relative border-none">
              <CardContent className="flex items-center justify-center p-0">
                <img src="./banner_drawing_3.jpg" alt="carousel one" />
              </CardContent>
              <div className="container absolute top-1/4 md:top-1/3 left-0 space-y-3 max-w-2xl text-left">
                <h2 className="capitalize text-sm md:text-xl lg:text-3xl md:font-semibold ">
                  Best Collection for <br /> Home Decoration
                </h2>
                <p className="hidden md:block text-sm font-normal">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Veritatis, corrupti!lorem5 Lorem ipsum dolor sit amet.
                </p>
                <Button className="h-6 px-2 md:h-10 md:px-4 md:py-2 text-xs font-light">
                  Shop Now
                </Button>
              </div>
            </Card>
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}
