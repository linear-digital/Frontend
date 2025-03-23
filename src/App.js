import "./App.css";
import "animate.css";
import {
  Outlet,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ThemeProvider } from "./Context/ThemeContext/ThemeContext";
import { HelmetProvider } from "react-helmet-async";
import Background from "./Pages/Shared/Theme/Background/Background";
import Home from "./Pages/Home/Home";
import Navbar from "./Pages/Shared/Navbar/Navbar";
import Blog from "./Pages/Blog/Blog";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";
import Footer from "./Pages/Shared/Footer/Footer";
// import Particle from "./Particle/Particle";
import AnimatedCursor from "react-animated-cursor";
import NotFound from "./Pages/NotFound/NotFound";
import { useEffect, useState } from "react";
import Loader from "./Pages/Shared/Loader/Loader";
import Dashboard from "./Pages/Dashboard/Dashboard";
import ScrollToTop from "react-scroll-to-top";
import Login from "./Pages/Auth/Login";
import SignUp from "./Pages/Auth/SignUp";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./Pages/Auth/firebase.init";
import Achivement from "./Pages/Achivement/Achivement";
import Licenseing from "./Pages/licenseing/Licenseing";
import "animate.css";
import Experience from "./Pages/Experience/Experience";
import PrivacyPolicy from "./Pages/Privacy-Policy/PrivacyPolicy";
import Company from "./Pages/Company/Company";
import Video from "./Pages/Video/Video";
import Audio from "./Pages/Shared/Audio/Audio";
import AllBlog from "./Pages/Blog/AllBlog";
import Photos from "./Pages/Shared/Photos/Photos";
import Recommendation from "./Pages/Recommendation/Recommendation";
import Documentation from "./Pages/Documentation/Documentation";
import Map from "./Pages/Map/Map";
import BlogForm from "./Pages/Blog/BlogForm";
import MessengerChatBot from "./Pages/Home/MessengerChatBot";

function App() {
  const Layout = () => {
    const [loading,
      setLoading] = useState(true);

    const [change, setChange] = useState(false);
    useEffect(() => {
      setTimeout(() => {
        setChange(true);
        setTimeout(() => {
          setLoading(false);
        }, 2500);
      }, 1000);
    }, []);
    if (loading) {
      return <Loader loading={loading} change={change} />;
    }
    return (
      <div>
        <ThemeProvider>
          <HelmetProvider>

            {/* Cursor  */}
            {/* <AnimatedCursor innerSize={12} outerSize={10} color="67, 56, 202" /> */}
            {/* Jiki miki  */}
            {/* <Particle />  */}
            <ScrollToTop smooth color="white" style={{ backgroundColor: "#6366F1", bottom: '130px' }} />
            <MessengerChatBot />
            <Navbar />
            <Background>
              <Outlet />
            </Background>
            <Footer />
          </HelmetProvider>
        </ThemeProvider>

      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "blog",
          element: <Blog />,
        },
        {
          path: 'all-blog',
          element: <AllBlog />
        },
        {
          path: "blog-post",
          element: <BlogForm />
        },
        {
          path: "feedback",
          element: (
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          ),
        },
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "contact",
          element: <Contact />,
        },
        {
          path: "achivement",
          element: <Achivement />,
        },
        {
          path: "experience",
          element: <Experience />,
        },
        {
          path: "company",
          element: <Company />,
        },
        {
          path: "video",
          element: <Video />,
        },
        {
          path: "audio",
          element: <Audio />,
        },
        {
          path: "photos",
          element: <Photos />,
        },
        {
          path: "recommendations",
          element: <Recommendation />,
        },
        {
          path: "documentations",
          element: <Documentation />,
        },
        {
          path: "maps",
          element: <Map />,
        },
        {
          path: "privacy-policy",
          element: <PrivacyPolicy />,
        },
        {
          path: "licenseing",
          element: <Licenseing />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "signup",
          element: <SignUp />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

const ProtectedRoute = ({ children }) => {
  const [user] = useAuthState(auth);
  if (user) {
    return children;
  } else {
    return <Login />;
  }
};
