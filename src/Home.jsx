import moviebg from "./assets/moviebg.png";
import Button from "./components/Button";
import info from "./assets/info.svg";
import silence from "./assets/silence.svg";
import arrowLeft from "./assets/arrow-left.svg";
import arrowRight from "./assets/arrow-right.svg";
import LandscapeCard from "./components/LandscapeCard";
import resume1 from "./assets/movies/resume1.png";
import resume2 from "./assets/movies/resume2.png";
import resume3 from "./assets/movies/resume3.png";
import resume4 from "./assets/movies/resume4.png";
import today1 from "./assets/movies/today1.png";
import today2 from "./assets/movies/today2.png";
import today3 from "./assets/movies/today3.png";
import today4 from "./assets/movies/today4.png";
import today5 from "./assets/movies/today5.png";
import trending1 from "./assets/movies/trending1.png";
import trending2 from "./assets/movies/trending2.png";
import trending3 from "./assets/movies/trending3.png";
import trending4 from "./assets/movies/trending4.png";
import trending5 from "./assets/movies/trending5.png";
import new1 from "./assets/movies/new1.png";
import new2 from "./assets/movies/new2.png";
import new3 from "./assets/movies/new3.png";
import new4 from "./assets/movies/new4.png";
import new5 from "./assets/movies/new5.png";
import PortraitCard from "./components/PortraitCard";

function Home() {
  const watchedMovie = [
    {
      title: "Don't Look Up",
      rating: "4.5/5",
      isNew: false,
      img: resume1,
    },
    {
      title: "The Batman",
      rating: "4.2/5",
      isNew: false,
      img: resume2,
    },
    {
      title: "Blue Lock",
      rating: "4.6/5",
      isNew: true,
      img: resume3,
    },
    {
      title: "A Man Called Otto",
      rating: "4.4/5",
      isNew: false,
      img: resume4,
    },
  ];
  const movieSection = [
    {
      section: "Top Rating Film dan Series Hari ini",
      movies: [
        {
          isNew: true,
          top: null,
          img: today1,
        },
        {
          isNew: false,
          top: null,
          img: today2,
        },
        {
          isNew: false,
          top: null,
          img: today3,
        },
        {
          isNew: true,
          top: null,
          img: today4,
        },
        {
          isNew: false,
          top: 10,
          img: today5,
        },
      ],
    },
    {
      section: "Film Trending",
      movies: [
        {
          isNew: false,
          top: 10,
          img: trending1,
        },
        {
          isNew: false,
          top: 10,
          img: trending2,
        },
        {
          isNew: false,
          top: 10,
          img: trending3,
        },
        {
          isNew: false,
          top: 10,
          img: trending4,
        },
        {
          isNew: false,
          top: 10,
          img: trending5,
        },
      ],
    },
    {
      section: "Rilis Baru",
      movies: [
        {
          isNew: false,
          top: 10,
          img: new1,
        },
        {
          isNew: true,
          top: null,
          img: new2,
        },
        {
          isNew: false,
          top: 10,
          img: new3,
        },
        {
          isNew: true,
          top: null,
          img: new4,
        },
        {
          isNew: false,
          top: null,
          img: new5,
        },
      ],
    },
  ];
  return (
    <>
      <div className="w-screen flex flex-col mb-[80px] max-sm:mb-[10px]">
        <div className="relative">
          <div className="absolute bottom-[80px] left-[80px] right-[80px] max-sm:bottom-[40px] max-sm:left-[22px] max-sm:right-[22px] flex flex-col gap-[20px] z-10 max-sm:gap-[12px]">
            <h1 className="h1-bold text-text-light-primary max-sm:h4-bold">
              Duty After School
            </h1>
            <p className="body-large-medium text-text-light-primary max-sm:caption1-medium max-sm:h-[40px]  max-sm:line-clamp-2">
              Sebuah benda tak dikenal mengambil alih dunia. Dalam keputusasaan,
              Departemen Pertahanan mulai merekrut lebih banyak tentara,
              termasuk siswa sekolah menengah. Mereka pun segera menjadi pejuang
              garis depan dalam perang.
            </p>
            <div className="flex flex-row justify-between">
              <div className="flex flex-row gap-[10px] items-center">
                <Button
                  title="Mulai"
                  customClassName="bg-primary-300 button-fit"
                />
                <Button
                  title="Selengkapnya"
                  customClassName="bg-background-paper button-fit"
                  icon={info}
                />
                <p className="h-[45px] content-center body-large-regular text-text-light-secondary px-[10px] rounded-full border border-1 border-text-light-secondary max-sm:caption1-bold max-sm:px-[4px] max-sm:h-[25px]">
                  18+
                </p>
              </div>
              <div className="border border-1 border-text-light-secondary rounded-full">
                <img
                  className="s-[18px] p-[13px] max-sm:s-[12px] max-sm:p-[6px]"
                  src={silence}
                />
              </div>
            </div>
          </div>
          <div className="absolute inset-0 background-gradient"></div>
          <img
            className="w-screen h-[578px] object-cover max-sm:h-[225px]"
            src={moviebg}
          />
        </div>
        <div className="flex flex-col my-[40px] gap-[32px] max-sm:mt-[20px] max-sm:gap-[20px] max-sm:mb-[30px]">
          <h3 className="h3-bold mx-[80px] text-text-light-primary max-sm:mx-[20px] max-sm:h5-bold">
            Melanjutkan Tonton Film
          </h3>
          <div className="relative">
            <div className="absolute top-1/2 p-[10px] left-[58px] z-40 rounded-full bg-background-body border border-1 border-border-outline cursor-pointer transform -translate-y-1/2 max-sm:hidden">
              <img className="s-[24px]" src={arrowLeft} />
            </div>
            <div className="absolute top-1/2 p-[10px] right-[58px] z-40 rounded-full bg-background-body border border-1 border-border-outline cursor-pointer transform -translate-y-1/2 max-sm:hidden">
              <img className="s-[24px]" src={arrowRight} />
            </div>
            <div className="h-fit no-scrollbar flex flex-row flex-nowrap overflow-y-clip overflow-x-auto gap-[24px] px-[80px] scroll-smooth focus:scroll-auto max-sm:px-[20px] max-sm:gap-[16px]">
              {watchedMovie.map((movie) => (
                <LandscapeCard
                  img={movie.img}
                  title={movie.title}
                  isNew={movie.isNew}
                  rating={movie.rating}
                />
              ))}
            </div>
          </div>
        </div>
        {movieSection.map((section) => (
          <>
            <div className="flex flex-col my-[40px] gap-[32px] max-sm:my-[10px] max-sm:gap-[20px]">
              <h3 className="h3-bold mx-[80px] text-text-light-primary max-sm:mx-[20px] max-sm:h5-bold">
                {section.section}
              </h3>
              <div className="relative">
                <div className="absolute top-1/2 p-[10px] left-[58px] z-40 rounded-full bg-background-body border border-1 border-border-outline cursor-pointer transform -translate-y-1/2 max-sm:hidden">
                  <img className="s-[24px]" src={arrowLeft} />
                </div>
                <div className="absolute top-1/2 p-[10px] right-[58px] z-40 rounded-full bg-background-body border border-1 border-border-outline cursor-pointer transform -translate-y-1/2 max-sm:hidden">
                  <img className="s-[24px]" src={arrowRight} />
                </div>
                <div className="h-fit no-scrollbar flex flex-row flex-nowrap overflow-y-clip overflow-x-auto gap-[24px] px-[80px] scroll-smooth focus:scroll-auto max-sm:px-[20px] max-sm:gap-[16px]">
                  {section.movies.map((movie) => (
                    <PortraitCard
                      img={movie.img}
                      isNew={movie.isNew}
                      top={movie.top}
                    />
                  ))}
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
}

export default Home;
