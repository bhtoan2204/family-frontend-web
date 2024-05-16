interface HeroSlideProps {
  title: string;
  content: string;
  image: string;
  link: string;
}

const HeroSlide = ({ title, content, image, link }: HeroSlideProps) => {
  return (
    <a
      className="h-125 md:h-100 bg-cover bg-no-repeat relative bg-center flex items-end before:absolute before:content-none before:bg-black before:bg-gradient-to-l from-black/10 to-black/100 before:opacity-[0.5] before:bottom-0 before:left-0 before:right-0 before:top-0 before:z-1 md:pl-7.5 md:pr-7.5 md:mb-12.5"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className="relative rounded-none md:rounded-sm w-full md:w-full bg-zinc-500/50 z-2 max-w-[700px] pl-25 pr-25 mb-12.5 md:pl-7.5 md:pr-7.5 md:mb-12.5">
        <h2 className="text-white md:text-4xl text-2xl">{title}</h2>
        <p className="text-white">{content}</p>
      </div>
    </a>
  );
};

export default HeroSlide;
