import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable, json, defer } from "@remix-run/node";
import { RemixServer, Link, useNavigate, useLocation, useParams, Meta, Links, Outlet, Scripts, useSearchParams, useLoaderData, useRouteError, isRouteErrorResponse, Form, useNavigation } from "@remix-run/react";
import * as isbotModule from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import * as React from "react";
import { createContext, useReducer, useContext, useEffect, useState, useRef } from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import { AiOutlineHome } from "react-icons/ai";
import { GoArrowLeft, GoClockFill, GoChevronDown } from "react-icons/go";
import { IoSearch, IoPlay } from "react-icons/io5";
import { MdOutlineClose, MdOutlineLogout } from "react-icons/md";
import { createSlice, configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import { CiCalendar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { IoMdAdd, IoMdEye, IoMdEyeOff, IoMdInformationCircleOutline } from "react-icons/io";
import { RxDownload } from "react-icons/rx";
import { PiShootingStarFill } from "react-icons/pi";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { ChevronRight, Check, Circle } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Scrollbar, Navigation } from "swiper/modules";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  let prohibitOutOfOrderStreaming = isBotRequest(request.headers.get("user-agent")) || remixContext.isSpaMode;
  return prohibitOutOfOrderStreaming ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function isBotRequest(userAgent) {
  if (!userAgent) {
    return false;
  }
  if ("isbot" in isbotModule && typeof isbotModule.isbot === "function") {
    return isbotModule.isbot(userAgent);
  }
  if ("default" in isbotModule && typeof isbotModule.default === "function") {
    return isbotModule.default(userAgent);
  }
  return false;
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error2) {
          reject(error2);
        },
        onError(error2) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error2);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error2) {
          reject(error2);
        },
        onError(error2) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error2);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
const logo = "/assets/logo-CTDiTwMq.png";
const Footer = () => {
  return /* @__PURE__ */ jsxs("footer", { className: "grid justify-stretch items-center gap-3 text-white contain contain_y md:gap-2", children: [
    /* @__PURE__ */ jsx("h6", { className: "font-[600]", children: "webGhoul" }),
    /* @__PURE__ */ jsx("span", { className: "text-gray-400 subtitle_1", children: "This site does not store any files on our server, we only linked to the media which is hosted on 3rd party services." }),
    /* @__PURE__ */ jsx("span", { className: "subtitle_2 text-gray-400", children: "contact@webGhoul.app" })
  ] });
};
const AppContext = createContext(void 0);
const initialState$9 = {
  sidebar: false,
  trendyTab: "movies",
  ratedTab: "movies"
};
function AppReducer(state, action) {
  switch (action.type) {
    case "sidebar":
      return { ...state, sidebar: action.payload };
    case "trendyTab":
      return { ...state, trendyTab: action.payload };
    case "ratedTab":
      return { ...state, ratedTab: action.payload };
    default:
      return state;
  }
}
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState$9);
  return /* @__PURE__ */ jsx(AppContext.Provider, { value: { state, dispatch }, children });
};
const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within a ModalsProvider");
  }
  return context;
};
const IconButton = ({
  onClick,
  children,
  className
}) => {
  return /* @__PURE__ */ jsxs(
    "button",
    {
      onClick,
      type: "button",
      className: `text-xl p-2 rounded-md flex justify-center bg-transparent items-center gap-3 border-none outline-none transition-all hover:glassy font-[600] ${className}`,
      children: [
        children,
        /* @__PURE__ */ jsx("span", { className: "hidden", children: "." })
      ]
    }
  );
};
const Logo = () => {
  return /* @__PURE__ */ jsxs(
    Link,
    {
      to: "/",
      className: `flex justify-start items-center gap-3 text-white sm:!gap-2`,
      children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: logo,
            alt: "logo",
            className: `w-[50px] md:w-[45px] sm:!w-[40px]`
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "grid justify-stretch items-center gap-0", children: [
          /* @__PURE__ */ jsx("h5", { className: "!font-[700]", children: "webGhoul" }),
          /* @__PURE__ */ jsx("span", { className: "body_2 text-primary leading-[2px] font-[600]", children: "Movies & Series" })
        ] })
      ]
    }
  );
};
const Header = () => {
  const navigate = useNavigate();
  const { dispatch: dispatchApp } = useApp();
  const { pathname } = useLocation();
  const { id } = useParams();
  const movieRoute = pathname === `/movie/${id}`;
  return /* @__PURE__ */ jsx(
    "header",
    {
      className: `z-[100] top-0 contain h-[100px] flex justify-between items-center gap-10 w-screen ${pathname === "/" || movieRoute ? "absolute" : "relative"}`,
      children: movieRoute ? /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
        Link,
        {
          to: "/",
          className: "text-4xl p-2 text-white transition-all hover:scale-125 !font-[600] group",
          children: /* @__PURE__ */ jsx(GoArrowLeft, {})
        }
      ) }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Logo, {}),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-center items-center gap-4", children: [
          /* @__PURE__ */ jsxs(
            IconButton,
            {
              onClick: () => navigate("/"),
              className: `text-white text-xl py-1 hover:text-primary`,
              children: [
                /* @__PURE__ */ jsx(AiOutlineHome, {}),
                /* @__PURE__ */ jsx("span", { className: "subtitle_1", children: "Home" })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            IconButton,
            {
              onClick: () => navigate("/search"),
              className: `text-white text-2xl hover:text-primary`,
              children: /* @__PURE__ */ jsx(IoSearch, {})
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              onClick: () => dispatchApp({ type: "sidebar", payload: true }),
              className: "w-[40px] h-[40px] bg-no-repeat bg-center bg-cover border-[1px] border-transparent border-solid transition-all hover:cursor-pointer hover:border-primary rounded-full",
              style: { backgroundImage: `url('${logo}')` }
            }
          )
        ] })
      ] })
    }
  );
};
const Button$1 = ({
  children,
  variant,
  onClick
}) => {
  return /* @__PURE__ */ jsx(
    "button",
    {
      type: "button",
      onClick,
      className: `outline-none border-[1px] transition-all border-solid border-white rounded-xl px-5 py-2 flex justify-center items-center gap-3 font-[600] button hover:scale-110 hover:font-[700] md:px-4 sm:py-[6px] ${variant === "primary" ? "bg-white text-black " : variant === "glassy" ? "glassy bg-white" : variant === "logout" ? "bg-primary text-white !border-primary hover:shadow-md hover:shadow-primary !scale-100" : variant === "icon" && "glassy bg-white !p-0 h-[45px] w-[45px] md:h-[40px] md:w-[40px] sm:!w-[37.5px] sm:!h-[37.5px]  !rounded-full"}`,
      children
    }
  );
};
const Sidebar = () => {
  const { state, dispatch: dispatchApp } = useApp();
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `fixed w-full h-full transition-all duration-500 top-0 ${state.sidebar ? "z-[1000] glassy_black" : "bg-transparent z-[-1]"}`,
      children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: `fixed top-0 right-0 h-full glassy_dark text-white grid justify-stretch items-start border-[1px] border-solid !border-neutral-800 min-w-[20vw] md:min-w-[60vw] sm:!min-w-full transition-all ${state.sidebar ? "translate-x-[0%]" : "translate-x-[100%]"}`,
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center gap-10 p-6 border-b-[1px] border-b-neutral-800 border-b-solid", children: [
              /* @__PURE__ */ jsx("h5", { children: "My Account" }),
              /* @__PURE__ */ jsx(
                IconButton,
                {
                  onClick: () => dispatchApp({ type: "sidebar", payload: false }),
                  children: /* @__PURE__ */ jsx(MdOutlineClose, {})
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid justify-stretch items-center gap-10 content-between self-stretch p-6", children: [
              /* @__PURE__ */ jsx("div", { className: "grid" }),
              /* @__PURE__ */ jsxs("div", { className: "grid justify-stretch items-center gap-4", children: [
                /* @__PURE__ */ jsx("hr", { className: "border-neutral-800" }),
                /* @__PURE__ */ jsxs(Button$1, { variant: "logout", children: [
                  /* @__PURE__ */ jsx(MdOutlineLogout, {}),
                  "Logout"
                ] })
              ] })
            ] })
          ]
        }
      )
    }
  );
};
const initialState$8 = {
  movie: void 0,
  videos: [],
  loading: true,
  error: false
};
const movieSlice = createSlice({
  name: "movie",
  initialState: initialState$8,
  reducers: {
    movieLoading: (state) => {
      state.loading = true;
      state.error = false;
    },
    getMovie: (state, action) => {
      state.loading = false;
      state.error = false;
      state.movie = action.payload.movie;
      state.videos = action.payload.videos;
    },
    movieError: (state) => {
      state.loading = false;
      state.error = true;
    }
  }
});
const { getMovie, movieError, movieLoading } = movieSlice.actions;
const movieReducer = movieSlice.reducer;
const initialState$7 = {
  genres: [],
  loading: true,
  error: false
};
const genresSlice = createSlice({
  name: "genres",
  initialState: initialState$7,
  reducers: {
    genresLoading: (state) => {
      state.loading = true;
      state.error = false;
    },
    getGenres: (state, action) => {
      state.loading = false;
      state.genres = action.payload;
    },
    genresError: (state) => {
      state.loading = false;
      state.error = true;
    }
  }
});
const { getGenres, genresLoading, genresError } = genresSlice.actions;
const genresReducer = genresSlice.reducer;
const initialState$6 = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
  loading: true,
  error: false
};
const topRatedMoviesSlice = createSlice({
  name: "topRatedMovies",
  initialState: initialState$6,
  reducers: {
    topRatedMoviesLoading: (state) => {
      state.loading = true;
      state.error = false;
    },
    getTopRatedMovies: (state, action) => {
      state.loading = false;
      state.error = false;
      state.page = action.payload.page;
      state.results = action.payload.results;
      state.total_pages = action.payload.total_pages;
      state.total_pages = action.payload.total_pages;
    },
    topRatedMoviesError: (state) => {
      state.loading = false;
      state.error = true;
    }
  }
});
const { getTopRatedMovies, topRatedMoviesLoading, topRatedMoviesError } = topRatedMoviesSlice.actions;
const topMoviesReducer = topRatedMoviesSlice.reducer;
const initialState$5 = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
  loading: true,
  error: false
};
const topRatedTVSlice = createSlice({
  name: "topRatedTV",
  initialState: initialState$5,
  reducers: {
    topRatedTVLoading: (state) => {
      state.loading = true;
      state.error = false;
    },
    getTopRatedTV: (state, action) => {
      state.loading = false;
      state.error = false;
      state.page = action.payload.page;
      state.results = action.payload.results;
      state.total_pages = action.payload.total_pages;
      state.total_pages = action.payload.total_pages;
    },
    topRatedTVError: (state) => {
      state.loading = false;
      state.error = true;
    }
  }
});
const { getTopRatedTV, topRatedTVError, topRatedTVLoading } = topRatedTVSlice.actions;
const topTVReducer = topRatedTVSlice.reducer;
const initialState$4 = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
  loading: true,
  error: false
};
const trendyMoviesSlice = createSlice({
  name: "trendyMovies",
  initialState: initialState$4,
  reducers: {
    trendyMoviesLoading: (state) => {
      state.loading = true;
      state.error = false;
    },
    getTrendyMovies: (state, action) => {
      state.loading = false;
      state.error = false;
      state.page = action.payload.page;
      state.results = action.payload.results;
      state.total_pages = action.payload.total_pages;
      state.total_pages = action.payload.total_pages;
    },
    trendyMoviesError: (state) => {
      state.loading = false;
      state.error = true;
    }
  }
});
const { getTrendyMovies, trendyMoviesLoading, trendyMoviesError } = trendyMoviesSlice.actions;
const trendyMoviesReducer = trendyMoviesSlice.reducer;
const initialState$3 = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
  loading: true,
  error: false
};
const trendyTVSlice = createSlice({
  name: "trendyTV",
  initialState: initialState$3,
  reducers: {
    trendyTVLoading: (state) => {
      state.loading = true;
      state.error = false;
    },
    getTrendyTV: (state, action) => {
      state.loading = false;
      state.error = false;
      state.page = action.payload.page;
      state.results = action.payload.results;
      state.total_pages = action.payload.total_pages;
      state.total_pages = action.payload.total_pages;
    },
    trendyTVError: (state) => {
      state.loading = false;
      state.error = true;
    }
  }
});
const { getTrendyTV, trendyTVError, trendyTVLoading } = trendyTVSlice.actions;
const trendyTVReducer = trendyTVSlice.reducer;
const initialState$2 = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
  loading: true,
  error: false
};
const upcomingMoviesSlice = createSlice({
  name: "upcomingMovies",
  initialState: initialState$2,
  reducers: {
    upcomingMoviesLoading: (state) => {
      state.loading = true;
      state.error = false;
    },
    getUpcomingMovies: (state, action) => {
      state.loading = false;
      state.error = false;
      state.page = action.payload.page;
      state.results = action.payload.results;
      state.total_pages = action.payload.total_pages;
      state.total_pages = action.payload.total_pages;
    },
    upcomingMoviesError: (state) => {
      state.loading = false;
      state.error = true;
    }
  }
});
const { getUpcomingMovies, upcomingMoviesError, upcomingMoviesLoading } = upcomingMoviesSlice.actions;
const upcomingMoviesReducer = upcomingMoviesSlice.reducer;
const initialState$1 = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
  loading: true,
  error: false
};
const similarMoviesSlice = createSlice({
  name: "similarMovies",
  initialState: initialState$1,
  reducers: {
    similarMoviesLoading: (state) => {
      state.loading = true;
      state.error = false;
    },
    getSimilarMovies: (state, action) => {
      state.loading = false;
      state.error = false;
      state.page = action.payload.page;
      state.results = action.payload.results;
      state.total_pages = action.payload.total_pages;
      state.total_pages = action.payload.total_pages;
    },
    similarMoviesError: (state) => {
      state.loading = false;
      state.error = true;
    }
  }
});
const { getSimilarMovies, similarMoviesLoading, similarMoviesError } = similarMoviesSlice.actions;
const similarMoviesReducer = similarMoviesSlice.reducer;
const initialState = {
  cast: [],
  loading: true,
  error: false
};
const castSlice = createSlice({
  name: "cast",
  initialState,
  reducers: {
    castLoading: (state) => {
      state.loading = true;
      state.error = false;
    },
    getCast: (state, action) => {
      state.loading = false;
      state.error = false;
      state.cast = action.payload;
    },
    castError: (state) => {
      state.loading = false;
      state.error = true;
    }
  }
});
const { getCast, castError, castLoading } = castSlice.actions;
const castReducer = castSlice.reducer;
const store = configureStore({
  reducer: {
    trendyTV: trendyTVReducer,
    trendyMovies: trendyMoviesReducer,
    topRatedTV: topTVReducer,
    topRatedMovies: topMoviesReducer,
    upcomingMovies: upcomingMoviesReducer,
    similarMovies: similarMoviesReducer,
    genres: genresReducer,
    movie: movieReducer,
    cast: castReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
});
const stylesheet = "/assets/tailwind-C6SYZYsu.css";
const links = () => [
  { rel: "stylesheet", href: stylesheet },
  { rel: "icon", href: logo }
];
const meta = () => {
  return [
    { title: "Movies App" },
    {
      name: "description",
      content: "An movies platform built with Remix, Vite, and Tailwind CSS."
    }
  ];
};
function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return /* @__PURE__ */ jsxs("html", { children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {}),
      /* @__PURE__ */ jsx("link", { rel: "preconnect", href: "https://fonts.googleapis.com" }),
      /* @__PURE__ */ jsx(
        "link",
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossOrigin: ""
        }
      ),
      /* @__PURE__ */ jsx(
        "link",
        {
          href: "https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap",
          rel: "stylesheet"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(
      "body",
      {
        className: `min-h-screen w-screen max-w-screen overflow-x-hidden bg-primary_bg`,
        children: [
          /* @__PURE__ */ jsx(Provider, { store, children: /* @__PURE__ */ jsx(AppProvider, { children: /* @__PURE__ */ jsxs(
            "main",
            {
              className: `grid justify-stretch items-center gap-6 content-between self-stretch min-h-screen md:gap-5 sm:!gap-4`,
              children: [
                /* @__PURE__ */ jsx(Header, {}),
                /* @__PURE__ */ jsx(Sidebar, {}),
                /* @__PURE__ */ jsx(Outlet, {}),
                /* @__PURE__ */ jsx(Footer, {})
              ]
            }
          ) }) }),
          /* @__PURE__ */ jsx(Scripts, {})
        ]
      }
    )
  ] });
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: App,
  links,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const ActorCard = ({ actor }) => {
  return /* @__PURE__ */ jsxs("article", { className: "pt-4 px-4 bg-neutral-900 border-[1px] border-neutral-700 border-solid rounded-xl grid justify-stretch items-start gap-3 grid-cols-[auto,1fr] transition-all duration-500 group hover:border-primary md:pt-3 md:px-3", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        style: {
          backgroundImage: `url('https://image.tmdb.org/t/p/w500${actor.profile_path}')`
        },
        className: "bg-no-repeat bg-cover bg-center rounded-lg rounded-b-none h-[90px] w-[90px] md:h-[80px] md:w-[80px] sm:!h-[70px] sm:!w-[70px]"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "grid justify-stretch items-center gap-1 text-white", children: [
      /* @__PURE__ */ jsx("h6", { className: "font-[600] group-hover:text-primary transition-all duration-500", children: actor.name }),
      /* @__PURE__ */ jsx("h6", { className: "text-neutral-400", children: actor.character })
    ] })
  ] });
};
const Title = ({ text }) => {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `flex justify-start items-center gap-2 text-white font-[700]`,
      children: [
        /* @__PURE__ */ jsx("div", { className: "bg-primary rounded-xl w-[7px] h-full text-primary", children: "." }),
        /* @__PURE__ */ jsx("h3", { children: text })
      ]
    }
  );
};
const ActorsSection = () => {
  const { cast } = useSelector((state) => state.cast);
  return /* @__PURE__ */ jsxs(
    "section",
    {
      className: `grid justify-stretch items-center gap-8 contain contain_y md:gap-6 sm:!gap-4`,
      children: [
        /* @__PURE__ */ jsx(Title, { text: "Actors" }),
        /* @__PURE__ */ jsx("div", { className: "grid justify-stretch items-center gap-6 grid-cols-3 md:grid-cols-2 sm:!grid-cols-1 lg:gap-5  md:gap-4 sm:!gap-3", children: cast.slice(0, 15).map((actor, i) => /* @__PURE__ */ jsx(ActorCard, { actor }, i)) })
      ]
    }
  );
};
const MovieInfo = ({
  children,
  variant
}) => {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `px-3 py-1 subtitle_1 flex justify-center items-center gap-2 text-white rounded-full !font-[600] ${variant === "basic" ? "" : "border-[1px] border-gray-100 glassy"}`,
      children
    }
  );
};
const Overlay = ({ className }) => {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: `absolute bottom-0 w-full h-full left-0 bg-overlay transition-all ${className}`
    }
  );
};
const MovieSection = () => {
  const [show, setShow] = useState(true);
  const timerRef = useRef(null);
  const { movie, videos } = useSelector((state) => state.movie);
  const { genres } = useSelector((state) => state.genres);
  const video = videos.find((video2) => video2.type === "Trailer") || videos[0];
  const minutesToHours = (mins) => {
    const hours = Math.floor(mins / 60);
    const minutes = mins % 60;
    return `${hours}h ${minutes}m`;
  };
  const startHideTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setShow(false);
    }, 5e3);
  };
  const handleMouseEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setShow(true);
  };
  const handleMouseLeave = () => {
    startHideTimer();
  };
  useEffect(() => {
    startHideTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);
  return movie && genres.length > 0 && /* @__PURE__ */ jsxs(
    "section",
    {
      style: !videos || videos.length === 0 ? {
        backgroundImage: `url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`
      } : {},
      className: "min-h-screen h-full bg-no-repeat bg-center bg-cover grid justify-start items-end contain contain_y relative w-full",
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      children: [
        videos && videos.length > 0 && /* @__PURE__ */ jsx(
          "iframe",
          {
            className: "absolute top-0 left-0 w-full h-full",
            src: `https://www.youtube.com/embed/${video.key}?autoplay=1&mute=1&controls=0&loop=1&playlist=${video.key}`,
            title: video.name,
            frameBorder: "0",
            allow: "autoplay; fullscreen"
          }
        ),
        /* @__PURE__ */ jsx(Overlay, {}),
        /* @__PURE__ */ jsxs("div", { className: "grid justify-stretch items-center gap-6 w-[35vw] xl:w-[75vw] lg:!w-full text-white z-[10] relative bottom-[20%] xl:bottom-[10%] md:!bottom-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid justify-stretch items-center gap-4 md:gap-3 sm:!gap-2", children: [
            /* @__PURE__ */ jsx("h1", { className: "!font-[700] line-clamp-2", children: movie.original_title }),
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: `grid justify-stretch items-center gap-3 transition-all duration-500  ${show ? "flex" : "hidden"}`,
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex justify-start items-center gap-2 flex-wrap", children: [
                    /* @__PURE__ */ jsxs(MovieInfo, { variant: "basic", children: [
                      /* @__PURE__ */ jsx(CiCalendar, {}),
                      movie.release_date.split("-")[0]
                    ] }),
                    /* @__PURE__ */ jsxs(MovieInfo, { variant: "basic", children: [
                      /* @__PURE__ */ jsx(GoClockFill, {}),
                      minutesToHours(movie.runtime)
                    ] }),
                    /* @__PURE__ */ jsxs(MovieInfo, { variant: "basic", children: [
                      /* @__PURE__ */ jsx(FaStar, { className: "text-yellow-500" }),
                      movie.vote_average.toFixed(1),
                      "/10"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "flex justify-start items-center gap-3 flex-wrap", children: movie.genres.map((genre, i) => {
                    var _a;
                    return /* @__PURE__ */ jsx(MovieInfo, { children: (_a = genres == null ? void 0 : genres.find((g) => g.id === genre.id)) == null ? void 0 : _a.name }, i);
                  }) })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            "h6",
            {
              className: `line-clamp-3 transition-all duration-500 ${show ? "flex" : "hidden"}`,
              children: movie.overview
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-stretch item-center gap-6 md:gap-5 sm:!gap-4", children: [
            /* @__PURE__ */ jsxs(Button$1, { variant: "primary", children: [
              /* @__PURE__ */ jsx(IoPlay, {}),
              "Play"
            ] }),
            /* @__PURE__ */ jsx(Button$1, { variant: "icon", children: /* @__PURE__ */ jsx(IoMdAdd, {}) }),
            /* @__PURE__ */ jsx(Button$1, { variant: "icon", children: /* @__PURE__ */ jsx(RxDownload, {}) }),
            /* @__PURE__ */ jsx("a", { href: "#similar", children: /* @__PURE__ */ jsx(Button$1, { variant: "glassy", children: "Similars" }) })
          ] })
        ] })
      ]
    }
  );
};
const LoadingMovieCard = () => {
  return /* @__PURE__ */ jsx("div", { className: "glassy_dark w-full h-[300px] relative animate-pulse" });
};
const MovieCard = ({ movie }) => {
  var _a;
  const [searchParams] = useSearchParams();
  console.log(movie);
  return /* @__PURE__ */ jsx(Link, { to: `/movie/${movie.id}`, children: /* @__PURE__ */ jsxs(
    "article",
    {
      className: `w-full h-[300px] lg:h-[280px] sm:!h-[260px] relative transition-all group overflow-hidden flex justify-center items-end group`,
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            style: {
              backgroundImage: `url('https://image.tmdb.org/t/p/original${movie.poster_path}')`
            },
            className: `bg-no-repeat bg-cover bg-center absolute h-full w-full transition-all duration-500 group-hover:scale-110 glassy_dark`
          }
        ),
        /* @__PURE__ */ jsx(Overlay, { className: `opacity-0 group-hover:opacity-100 z-[5]` }),
        /* @__PURE__ */ jsxs("div", { className: "grid justify-stretch items-center gap-4 text-white translate-y-[100%] transition-all duration-500 group-hover:translate-y-0 z-[10] px-2 py-4 w-full", children: [
          /* @__PURE__ */ jsx("h6", { className: "font-[600] line-clamp-2", children: movie.title }),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center gap-4 text-neutral-400 md:gap-3 sm:!gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "subtitle_1", children: movie.media_type ? movie.media_type === "tv" ? "Tv Show" : "Movie" : searchParams.get("type") === "tv" ? "TV Show" : "Movie" }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-center items-center gap-2", children: [
              /* @__PURE__ */ jsx(
                FaStar,
                {
                  className: `text-primary text-xl md:text-lg sm:!text-md`
                }
              ),
              /* @__PURE__ */ jsxs("span", { className: "subtitle_1", children: [
                (_a = movie.vote_average) == null ? void 0 : _a.toFixed(1),
                "/10"
              ] })
            ] })
          ] })
        ] })
      ]
    }
  ) });
};
const NoResultsFound = () => {
  const [searchParams] = useSearchParams();
  return /* @__PURE__ */ jsxs("article", { className: "border-[1px] border-solid border-neutral-700 bg-neutral-900 w-[25vw] h-fit grid justify-center items-center gap-4 p-6 pb-12 rounded-xl text-white text-center m-auto", children: [
    /* @__PURE__ */ jsx("h2", { children: "🔍" }),
    /* @__PURE__ */ jsxs("div", { className: "grid justify-stretch items-center gap-3", children: [
      /* @__PURE__ */ jsx("h4", { className: "!font-[600]", children: "No results found" }),
      /* @__PURE__ */ jsx(
        "h6",
        {
          className: `text-neutral-500`,
          children: `We couldn't find any results for "${searchParams.get(
            "search"
          )}". Try adjusting your search or browse our trending content.`
        }
      )
    ] })
  ] });
};
const MoviesSection = ({
  title,
  movies,
  id,
  loading
}) => {
  return /* @__PURE__ */ jsxs(
    "section",
    {
      id,
      className: "grid justify-stretch items-center gap-8 contain contain_y",
      children: [
        /* @__PURE__ */ jsxs("div", { className: "grid justify-stretch items-center gap-1", children: [
          /* @__PURE__ */ jsx(Title, { text: title }),
          /* @__PURE__ */ jsxs("h6", { className: "text-neutral-500", children: [
            movies.length,
            " results found"
          ] })
        ] }),
        movies.length > 0 ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-6 justify-stretch items-center gap-4 3xl:grid-cols-5 md:!grid-cols-3 xs:!grid-cols-2", children: movies.map((movie, i) => /* @__PURE__ */ jsx(MovieCard, { movie }, i)) }) : loading ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-6 justify-stretch items-center gap-4", children: Array.from({ length: 20 }).map((_, i) => /* @__PURE__ */ jsx(LoadingMovieCard, {})) }) : /* @__PURE__ */ jsx(NoResultsFound, {})
      ]
    }
  );
};
async function loader$2({ params }) {
  const { id } = params;
  if (!id) {
    throw new Response("Movie ID is required", { status: 400 });
  }
  try {
    const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
      headers: { Authorization: `Bearer ${process.env.TOKEN}` }
    });
    const videosRes = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/videos`,
      {
        headers: { Authorization: `Bearer ${process.env.TOKEN}` }
      }
    );
    const genresRes = await axios.get(
      "https://api.themoviedb.org/3/genre/movie/list",
      {
        headers: { Authorization: `Bearer ${process.env.TOKEN}` }
      }
    );
    const castRes = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/credits`,
      {
        headers: { Authorization: `Bearer ${process.env.TOKEN}` }
      }
    );
    const similarMoviesRes = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/similar`,
      {
        headers: { Authorization: `Bearer ${process.env.TOKEN}` }
      }
    );
    return json({
      movie: res.data,
      videos: videosRes.data.results,
      genres: genresRes.data.genres,
      similarMovies: similarMoviesRes.data,
      cast: castRes.data.cast
    });
  } catch (error2) {
    console.error(error2);
    throw new Response("Movie not found", { status: 404 });
  }
}
function MoviePage() {
  const { movie, videos, genres, similarMovies, cast } = useLoaderData();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMovie({ movie, videos }));
    dispatch(getGenres(genres));
    dispatch(getCast(cast));
    dispatch(getSimilarMovies(similarMovies));
  }, [dispatch, movie, videos, genres, similarMovies, cast]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(MovieSection, {}),
    /* @__PURE__ */ jsx(ActorsSection, {}),
    /* @__PURE__ */ jsx(
      MoviesSection,
      {
        title: "You may like",
        movies: similarMovies.results,
        id: "similar"
      }
    )
  ] });
}
function ErrorBoundary() {
  const error2 = useRouteError();
  if (isRouteErrorResponse(error2)) {
    return /* @__PURE__ */ jsx("section", { className: "text-white text-center", children: /* @__PURE__ */ jsxs("h2", { children: [
      error2.status,
      " – ",
      error2.data
    ] }) });
  }
  return /* @__PURE__ */ jsx("h2", { className: "text-red-500", children: "Something went wrong." });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  default: MoviePage,
  loader: loader$2
}, Symbol.toStringTag, { value: "Module" }));
const NotFound = () => {
  return /* @__PURE__ */ jsx("div", { children: "not-found" });
};
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: NotFound
}, Symbol.toStringTag, { value: "Module" }));
const watchlist = () => {
  return /* @__PURE__ */ jsx("div", { children: "watchlist" });
};
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: watchlist
}, Symbol.toStringTag, { value: "Module" }));
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-colors active:border-primary focus:border-primary !outline-none hover:border-primary disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-neutral-900 border-[1px] border-neutral-700 text-white",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";
const DropdownMenu = DropdownMenuPrimitive.Root;
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
const DropdownMenuSubTrigger = React.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.SubTrigger,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(ChevronRight, { className: "ml-auto" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;
const DropdownMenuSubContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.SubContent,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;
const DropdownMenuContent = React.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsx(DropdownMenuPrimitive.Portal, { children: /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Content,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border border-neutral-700 bg-black p-1 text-white shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;
const DropdownMenuItem = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-6 py-2 text-sm outline-none transition-colors focus:bg-neutral-800  focus:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;
const DropdownMenuCheckboxItem = React.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.CheckboxItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-2 pl-8 pr-6 text-sm outline-none transition-colors focus:bg-neutral-800 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName;
const DropdownMenuRadioItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  DropdownMenuPrimitive.RadioItem,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(DropdownMenuPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Circle, { className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;
const DropdownMenuLabel = React.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Label,
  {
    ref,
    className: cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;
const DropdownMenuSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  DropdownMenuPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;
const DropDown = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [status, setStatus] = useState(0);
  const [currentStatus, setCurrentStatus] = useState("Movies & TV Shows");
  useEffect(() => {
    const type = searchParams.get("type");
    if (type) {
      if (type === "all") {
        setCurrentStatus("Movies & TV Shows");
      } else if (type === "tv") {
        setCurrentStatus("TV Shows");
      } else if (type === "movie") {
        setCurrentStatus("Movies");
      }
    }
  }, []);
  return /* @__PURE__ */ jsxs(DropdownMenu, { children: [
    /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { children: [
      currentStatus,
      /* @__PURE__ */ jsx(GoChevronDown, {})
    ] }) }),
    /* @__PURE__ */ jsxs(DropdownMenuContent, { align: "start", children: [
      /* @__PURE__ */ jsx(
        DropdownMenuCheckboxItem,
        {
          checked: status === 0,
          onCheckedChange: () => {
            setStatus(0);
            setCurrentStatus("Movies & TV Shows");
            setSearchParams((prev) => {
              const newParams = new URLSearchParams(prev);
              newParams.set("type", "all");
              return newParams;
            });
          },
          children: "Movies & TV Shows"
        }
      ),
      /* @__PURE__ */ jsx(
        DropdownMenuCheckboxItem,
        {
          checked: status === 1,
          onCheckedChange: () => {
            setStatus(1);
            setCurrentStatus("Movies");
            setSearchParams((prev) => {
              const newParams = new URLSearchParams(prev);
              newParams.set("type", "movie");
              return newParams;
            });
          },
          children: "Movies"
        }
      ),
      /* @__PURE__ */ jsx(
        DropdownMenuCheckboxItem,
        {
          checked: status === 2,
          onCheckedChange: () => {
            setStatus(2);
            setCurrentStatus("TV Shows");
            setSearchParams((prev) => {
              const newParams = new URLSearchParams(prev);
              newParams.set("type", "tv");
              return newParams;
            });
          },
          children: "TV Shows"
        }
      )
    ] })
  ] });
};
const Input = ({
  name,
  placeholder,
  type,
  label,
  variant = "default",
  icon,
  onChange,
  value
}) => {
  const [show, setShow] = useState(false);
  const [focus, setFocus] = useState(false);
  return /* @__PURE__ */ jsxs("div", { className: `grid justify-stretch items-center gap-1`, children: [
    label && /* @__PURE__ */ jsx("label", { htmlFor: name, className: "subtitle_1", children: label }),
    /* @__PURE__ */ jsxs(
      "div",
      {
        onFocus: () => setFocus(true),
        onBlur: () => setFocus(false),
        className: `border-[1px] border-solid border-neutral-700 rounded-lg overflow-hidden bg-neutral-900 flex justify-stretch items-center gap-4 h-10 px-4 [&>svg]:text-neutral-600 [&>svg]:text-xl ${focus && "!border-primary"}`,
        children: [
          icon,
          /* @__PURE__ */ jsx(
            "input",
            {
              type: type === "password" ? show ? "text" : type : type || "text",
              name,
              id: name,
              defaultValue: value,
              placeholder,
              className: `outline-none border-none subtitle_1 w-full py-2 !bg-neutral-900 text-white`,
              onChange
            }
          ),
          type === "password" && (show ? /* @__PURE__ */ jsx(
            IoMdEye,
            {
              className: "cursor-pointer text-xl",
              onClick: () => setShow(!show)
            }
          ) : /* @__PURE__ */ jsx(
            IoMdEyeOff,
            {
              className: "cursor-pointer text-xl",
              onClick: () => setShow(!show)
            }
          ))
        ]
      }
    )
  ] });
};
const SearchSection = () => {
  const [searchParams] = useSearchParams();
  return /* @__PURE__ */ jsxs(
    "section",
    {
      className: `grid justify-center items-center gap-10 text-center contain contain_y md:gap-8 sm:!gap-6`,
      children: [
        /* @__PURE__ */ jsxs("div", { className: "grid justify-center items-center gap-1 text-center", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-[1fr,auto,1fr] just fy-center items-center gap-4 w-fit m-auto text-white", children: [
            /* @__PURE__ */ jsx(PiShootingStarFill, { className: "text-primary text-3xl rotate-[-90deg]" }),
            /* @__PURE__ */ jsx("h2", { className: "font-[700]", children: "Discover Your Next Favorite" }),
            /* @__PURE__ */ jsx(PiShootingStarFill, { className: "text-primary text-3xl" })
          ] }),
          /* @__PURE__ */ jsx("h6", { className: "text-neutral-300", children: "Search through thousands of movies, TV shows, and anime series" })
        ] }),
        /* @__PURE__ */ jsxs(
          Form,
          {
            method: "get",
            action: "/search",
            className: "grid grid-cols-[auto,1fr] justify-stretch items-center gap-2 p-4 bg-neutral-900 border-[1px] border-neutral-700 rounded-xl w-[50vw] 3xl:w-[55vw] 2xl:w-[65vw] lg:w-[80vw] md:!w-full md:p-3 md:grid-cols-1",
            children: [
              /* @__PURE__ */ jsx(DropDown, {}),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "hidden",
                  name: "type",
                  value: searchParams.get("type") || "all"
                }
              ),
              /* @__PURE__ */ jsx(
                Input,
                {
                  name: "search",
                  type: "search",
                  placeholder: "Type here to search...",
                  icon: /* @__PURE__ */ jsx(IoSearch, {}),
                  value: searchParams.get("search") || "",
                  onChange: (e) => {
                    var _a;
                    (_a = e.currentTarget.form) == null ? void 0 : _a.requestSubmit();
                  }
                }
              )
            ]
          }
        )
      ]
    }
  );
};
async function loader$1({ request }) {
  const url = new URL(request.url);
  const query = url.searchParams.get("search");
  const type = url.searchParams.get("type");
  if (query) {
    const url2 = type === "all" ? "https://api.themoviedb.org/3/search/multi" : type === "movie" ? "https://api.themoviedb.org/3/search/movie" : type === "tv" ? "https://api.themoviedb.org/3/search/tv" : "https://api.themoviedb.org/3/search/multi";
    const res = await axios.get(`${url2}?query=${query}`, {
      headers: { Authorization: `Bearer ${process.env.TOKEN}` }
    });
    const searchResults = res.data;
    return json({
      searchResults,
      query,
      trendyMovies: {
        page: 0,
        results: [],
        total_pages: 0,
        total_results: 0
      }
    });
  }
  const [trendyMoviesRes] = await Promise.all([
    axios.get("https://api.themoviedb.org/3/trending/movie/day", {
      headers: { Authorization: `Bearer ${process.env.TOKEN}` }
    })
  ]);
  const trendyMovies = trendyMoviesRes.data;
  return json({
    trendyMovies,
    query: "",
    searchResults: {
      page: 0,
      results: [],
      total_pages: 0,
      total_results: 0
    }
  });
}
const search = () => {
  const { results, loading } = useSelector(
    (state) => state.trendyMovies
  );
  const { trendyMovies, searchResults, query } = useLoaderData();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTrendyMovies(trendyMovies));
  }, [dispatch, trendyMovies, searchResults, query]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(SearchSection, {}),
    query ? /* @__PURE__ */ jsx(
      MoviesSection,
      {
        title: `Search Results for "${query}"`,
        movies: searchResults.results
      }
    ) : /* @__PURE__ */ jsx(
      MoviesSection,
      {
        title: "Trending Today",
        movies: results,
        loading
      }
    )
  ] });
};
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: search,
  loader: loader$1
}, Symbol.toStringTag, { value: "Module" }));
const HeroSection = () => {
  const { results } = useSelector((state) => state.trendyMovies);
  const { genres } = useSelector((state) => state.genres);
  const navigate = useNavigate();
  return /* @__PURE__ */ jsx("section", { className: "w-screen min-h-screen h-screen", children: results.length > 0 ? /* @__PURE__ */ jsx(
    Swiper,
    {
      modules: [Autoplay],
      autoplay: {
        delay: 5e3,
        disableOnInteraction: false
      },
      spaceBetween: 0,
      slidesPerView: 1,
      scrollbar: { draggable: true },
      children: results.map((movie, i) => /* @__PURE__ */ jsx(SwiperSlide, { children: /* @__PURE__ */ jsxs(
        "div",
        {
          style: {
            backgroundImage: `url('https://image.tmdb.org/t/p/original${movie.backdrop_path}')`
          },
          className: "min-h-screen h-full bg-no-repeat bg-center bg-cover grid justify-start items-end contain contain_y relative",
          children: [
            /* @__PURE__ */ jsx(Overlay, {}),
            /* @__PURE__ */ jsxs("div", { className: "grid justify-stretch items-center gap-6 w-1/2 2xl:w-[60vw] text-white z-[10] relative bottom-[20%] 2xl:bottom-[10%]", children: [
              /* @__PURE__ */ jsxs("div", { className: "grid justify-stretch items-center gap-3", children: [
                /* @__PURE__ */ jsx("h1", { className: "!font-[700] line-clamp-2", children: movie.original_title }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-start items-center gap-2 flex-wrap", children: [
                  /* @__PURE__ */ jsxs(MovieInfo, { children: [
                    /* @__PURE__ */ jsx(FaStar, { className: "text-yellow-500" }),
                    movie.vote_average.toFixed(1),
                    "/10"
                  ] }),
                  /* @__PURE__ */ jsxs(MovieInfo, { children: [
                    /* @__PURE__ */ jsx(CiCalendar, {}),
                    movie.release_date.split("-")[0]
                  ] }),
                  movie.genre_ids.map((genre, i2) => {
                    var _a;
                    return /* @__PURE__ */ jsx(MovieInfo, { children: (_a = genres == null ? void 0 : genres.find((g) => g.id === genre)) == null ? void 0 : _a.name }, i2);
                  })
                ] })
              ] }),
              /* @__PURE__ */ jsx("h6", { className: "line-clamp-3", children: movie.overview }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-stretch item-center gap-6", children: [
                /* @__PURE__ */ jsxs(Button$1, { variant: "primary", children: [
                  /* @__PURE__ */ jsx(IoPlay, {}),
                  "Play"
                ] }),
                /* @__PURE__ */ jsxs(
                  Button$1,
                  {
                    variant: "glassy",
                    onClick: () => navigate(`movie/${movie.id}`),
                    children: [
                      /* @__PURE__ */ jsx(IoMdInformationCircleOutline, {}),
                      "See More"
                    ]
                  }
                )
              ] })
            ] })
          ]
        }
      ) }, i))
    }
  ) : /* @__PURE__ */ jsx("div", { className: "glassy_dark w-full h-full relative animate-pulse" }) });
};
const CategoriesTabs = ({
  cats,
  variant
}) => {
  const { dispatch: dispatchApp } = useApp();
  const [active, setActive] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0
  });
  const tabsRef = useRef(null);
  useEffect(() => {
    if (tabsRef.current) {
      const currentTab = tabsRef.current.children[active];
      if (currentTab) {
        setIndicatorStyle({
          left: currentTab.offsetLeft,
          width: currentTab.offsetWidth
        });
      }
    }
  }, [active]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: tabsRef,
      className: "flex justify-center items-center gap-6 text-white relative border-b border-gray-600",
      children: [
        cats.map((label, index) => /* @__PURE__ */ jsx(
          "span",
          {
            onClick: () => {
              dispatchApp({
                type: `${variant}Tab`,
                payload: label.toLowerCase()
              });
              setActive(index);
            },
            className: `py-2 cursor-pointer subtitle_1 font-[600] transition-colors ${active === index ? "text-primary" : "text-white"}`,
            children: label
          },
          index
        )),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: "absolute bottom-[-2px] h-[2px] bg-primary shadow-t-xl shadow-t-primary transition-all duration-300 rounded-full",
            style: {
              left: indicatorStyle.left,
              width: indicatorStyle.width
            }
          }
        )
      ]
    }
  );
};
const MoviesListSection = ({
  title,
  variant,
  cats
}) => {
  const { state: stateApp } = useApp();
  const { results: trendyMovies } = useSelector(
    (state) => state.trendyMovies
  );
  const { results: trendyTV } = useSelector(
    (state) => state.trendyTV
  );
  const { results: topRatedMovies, loading: topRatedMoviesLoading2 } = useSelector((state) => state.topRatedMovies);
  const { results: topRatedTV } = useSelector(
    (state) => state.topRatedTV
  );
  const { results: upcomingMovies } = useSelector(
    (state) => state.upcomingMovies
  );
  const movies = variant === "trendy" ? stateApp.trendyTab === "movies" ? trendyMovies : trendyTV : variant === "rated" ? stateApp.ratedTab === "movies" ? topRatedMovies : topRatedTV : variant === "upcomming" ? upcomingMovies : [];
  return /* @__PURE__ */ jsxs("section", { className: "grid justify-stretch items-center gap-6 contain contain_y", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center gap-4", children: [
      /* @__PURE__ */ jsx(Title, { text: title }),
      cats && /* @__PURE__ */ jsx(CategoriesTabs, { variant, cats })
    ] }),
    /* @__PURE__ */ jsx(
      Swiper,
      {
        modules: [Scrollbar, Navigation],
        spaceBetween: 10,
        slidesPerView: "auto",
        scrollbar: { draggable: true },
        className: `w-full`,
        children: !topRatedMoviesLoading2 && movies.length > 0 ? movies.map((movie, i) => /* @__PURE__ */ jsx(SwiperSlide, { className: "!w-[200px] !h-[300px]", children: /* @__PURE__ */ jsx(MovieCard, { movie }) }, i)) : Array.from({ length: 20 }).map((_, i) => /* @__PURE__ */ jsx(SwiperSlide, { className: "!w-[200px] !h-[300px]", children: /* @__PURE__ */ jsx(LoadingMovieCard, {}) }, i))
      }
    )
  ] });
};
async function loader() {
  const [
    trendyMoviesRes,
    trendyTVRes,
    upcomingMoviesRes,
    genresRes,
    topMoviesRes,
    topTVRes
  ] = await Promise.all([
    axios.get("https://api.themoviedb.org/3/trending/movie/day", {
      headers: { Authorization: `Bearer ${process.env.TOKEN}` }
    }),
    axios.get("https://api.themoviedb.org/3/trending/tv/day", {
      headers: { Authorization: `Bearer ${process.env.TOKEN}` }
    }),
    axios.get("https://api.themoviedb.org/3/movie/upcoming", {
      headers: { Authorization: `Bearer ${process.env.TOKEN}` }
    }),
    axios.get("https://api.themoviedb.org/3/genre/movie/list", {
      headers: { Authorization: `Bearer ${process.env.TOKEN}` }
    }),
    axios.get("https://api.themoviedb.org/3/movie/top_rated", {
      headers: { Authorization: `Bearer ${process.env.TOKEN}` }
    }),
    axios.get("https://api.themoviedb.org/3/tv/top_rated", {
      headers: { Authorization: `Bearer ${process.env.TOKEN}` }
    })
  ]);
  const trendyMovies = await trendyMoviesRes.data;
  const trendyTV = await trendyTVRes.data;
  const topMovies = await topMoviesRes.data;
  const topTV = await topTVRes.data;
  const upcomingMovies = await upcomingMoviesRes.data;
  const genres = await genresRes.data.genres;
  return defer({
    trendyMovies,
    trendyTV,
    topMovies,
    topTV,
    upcomingMovies,
    genres
  });
}
const _index = () => {
  const { trendyMovies, trendyTV, topMovies, topTV, upcomingMovies, genres } = useLoaderData();
  const dispatch = useDispatch();
  const navigate = useNavigation();
  useEffect(() => {
    if (navigate.state === "loading") {
      dispatch(topRatedMoviesLoading());
    }
    dispatch(getTrendyMovies(trendyMovies));
    dispatch(getTrendyTV(trendyTV));
    dispatch(getTopRatedMovies(topMovies));
    dispatch(getTopRatedTV(topTV));
    dispatch(getUpcomingMovies(upcomingMovies));
    dispatch(getGenres(genres));
  }, [
    dispatch,
    navigate.state,
    trendyMovies,
    trendyTV,
    topMovies,
    topTV,
    genres,
    upcomingMovies
  ]);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(HeroSection, {}),
    /* @__PURE__ */ jsx(
      MoviesListSection,
      {
        title: "Trending Today",
        variant: "trendy",
        cats: ["Movies", "Series"]
      }
    ),
    /* @__PURE__ */ jsx(MoviesListSection, { title: "Upcomming", variant: "upcomming" }),
    /* @__PURE__ */ jsx(
      MoviesListSection,
      {
        title: "Top rated",
        variant: "rated",
        cats: ["Movies", "Series"]
      }
    )
  ] });
};
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _index,
  loader
}, Symbol.toStringTag, { value: "Module" }));
const error = () => {
  return /* @__PURE__ */ jsx("div", { children: "error" });
};
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: error
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-FUizr8dg.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/components-NcCHKtgq.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-DBzYsvQ4.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/components-NcCHKtgq.js", "/assets/redux-toolkit.modern-CsDXfffr.js", "/assets/upcomingMoviesSlice-Ct5gM67-.js", "/assets/index-COYMQpSn.js", "/assets/genresSlice-DvKGOpfu.js", "/assets/castSlice-DBv7S65m.js", "/assets/trendyMoviesSlice-CT9M4MvV.js"], "css": ["/assets/upcomingMoviesSlice-DV8PrLMj.css"] }, "routes/movie.$id": { "id": "routes/movie.$id", "parentId": "root", "path": "movie/:id", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/movie._id-C56ODk5O.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/components-NcCHKtgq.js", "/assets/redux-toolkit.modern-CsDXfffr.js", "/assets/MovieCard-DexUxlxb.js", "/assets/MovieInfo-CXCCnYL3.js", "/assets/index-COYMQpSn.js", "/assets/genresSlice-DvKGOpfu.js", "/assets/MoviesSection-CmNdrenj.js", "/assets/castSlice-DBv7S65m.js"], "css": [] }, "routes/not-found": { "id": "routes/not-found", "parentId": "root", "path": "not-found", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/not-found--pOqC8Kf.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js"], "css": [] }, "routes/watchlist": { "id": "routes/watchlist", "parentId": "root", "path": "watchlist", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/watchlist-Clj0yXIy.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js"], "css": [] }, "routes/search": { "id": "routes/search", "parentId": "root", "path": "search", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/search-BcyRAtll.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/components-NcCHKtgq.js", "/assets/redux-toolkit.modern-CsDXfffr.js", "/assets/MoviesSection-CmNdrenj.js", "/assets/index-COYMQpSn.js", "/assets/MovieCard-DexUxlxb.js", "/assets/trendyMoviesSlice-CT9M4MvV.js"], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-BNTGlv9q.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/components-NcCHKtgq.js", "/assets/redux-toolkit.modern-CsDXfffr.js", "/assets/MovieInfo-CXCCnYL3.js", "/assets/MovieCard-DexUxlxb.js", "/assets/genresSlice-DvKGOpfu.js", "/assets/upcomingMoviesSlice-Ct5gM67-.js", "/assets/trendyMoviesSlice-CT9M4MvV.js"], "css": ["/assets/_index-BEgelY-H.css", "/assets/upcomingMoviesSlice-DV8PrLMj.css"] }, "routes/error": { "id": "routes/error", "parentId": "root", "path": "error", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/error-BBNaBWfX.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js"], "css": [] } }, "url": "/assets/manifest-09c7d88f.js", "version": "09c7d88f" };
const mode = "production";
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "v3_fetcherPersist": false, "v3_relativeSplatPath": false, "v3_throwAbortReason": false, "v3_routeConfig": false, "v3_singleFetch": false, "v3_lazyRouteDiscovery": false, "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/movie.$id": {
    id: "routes/movie.$id",
    parentId: "root",
    path: "movie/:id",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/not-found": {
    id: "routes/not-found",
    parentId: "root",
    path: "not-found",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/watchlist": {
    id: "routes/watchlist",
    parentId: "root",
    path: "watchlist",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/search": {
    id: "routes/search",
    parentId: "root",
    path: "search",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route5
  },
  "routes/error": {
    id: "routes/error",
    parentId: "root",
    path: "error",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
