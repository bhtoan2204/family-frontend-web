import HeroSlide from "@/components/user/crawler/hero-slide";
import { News } from "@/types/news";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface NewsHeroProps {
  news: News[];
}

const NewsHero = ({ news }: NewsHeroProps) => {
  return (
    <section className="pt-5">
      <div className="container" data-aos="fade-in">
        <div className="row-auto">
          <div className="col-auto">
            <Swiper
              slidesPerView={"auto"}
              speed={500}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{
                el: ".swiper-pagination",
                type: "bullets",
                clickable: true,
              }}
              navigation={{
                nextEl: ".custom-swiper-button-next",
                prevEl: ".custom-swiper-button-prev",
              }}
              modules={[Autoplay, Pagination, Navigation]}
              loop={true}
              className="rounded-sm"
            >
              {news.map((news) => (
                <SwiperSlide key={news.guid}>
                  <HeroSlide
                    title={news.title}
                    content={news.contentSnippet}
                    image={news.enclosure?.url}
                    link={news.link}
                  />
                </SwiperSlide>
              ))}
              <div className="custom-swiper-button-next absolute top-1/2 translate-y-1/2 z-9 md:hidden right-10">
                <span className="text-xl text-white/70 transition ease-in hover:text-white/100 focus:text-white/100">
                  <ChevronRight className="cursor-pointer" />
                </span>
              </div>
              <div className="custom-swiper-button-prev absolute top-1/2 translate-y-1/2 z-9 md:hidden left-10">
                <span className="text-xl text-white/70 transition ease-in hover:text-white/100 focus:text-white/100">
                  <ChevronLeft className="cursor-pointer" />
                </span>
              </div>
              <div className="swiper-pagination bg-transparent" />
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsHero;
