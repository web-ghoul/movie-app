import { LinksFunction, MetaFunction } from "@remix-run/node";
import { Links, Meta, Outlet, Scripts } from "@remix-run/react";
import { Provider } from "react-redux";
import 'swiper/css';
import logo from "./assets/images/logo.png";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import { AppProvider } from "./contexts/AppContext";
import { store } from "./store/store";
import stylesheet from "./tailwind.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  { rel: "icon", href: logo },
];

export const meta: MetaFunction = () => {
  return [
    { title: "Movies App" },
    {
      name: "description",
      content: "An movies platform built with Remix, Vite, and Tailwind CSS.",
    },
  ];
};

// export async function loader() {
//   const [moviesRes, genresRes] = await Promise.all([
//     axios.get("https://api.themoviedb.org/3/trending/movie/day", {
//       headers: { Authorization: `Bearer ${process.env.TOKEN}` },
//     }),
//     axios.get("https://api.themoviedb.org/3/genre/movie/list", {
//       headers: { Authorization: `Bearer ${process.env.TOKEN}` },
//     }),
//   ]);

//   const movies: {
//     page: number;
//     results: MovieTypes[];
//     total_pages: number;
//     total_results: number;
//   } = await moviesRes.data;

//   const genres: GenreTypes[] = await genresRes.data.genres;

//   return json({
//     movies,
//     genres,
//   });
// }

export default function App() {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <Meta />
        <Links />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`min-h-screen w-screen max-w-screen overflow-x-hidden bg-primary_bg`}
      >
        <main className={`grid justify-stretch items-center gap-6`}>
          <Provider store={store}>
            <AppProvider>
              <Header />
              <Sidebar />
              <Outlet />
              <Footer />
            </AppProvider>
          </Provider>
        </main>
        <Scripts />
      </body>
    </html>
  );
}
