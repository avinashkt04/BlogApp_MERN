import { useEffect } from "react";
import "./App.css";
import { Container, Footer, Header } from "./components";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCurrentUserAPI } from "./store/services/userAction";
import { getAllPostAPI } from "./store/services/postAction";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPostAPI());
    dispatch(getCurrentUserAPI());
  }, []);

  return (
    <>
      <div className="min-h-screen">
        <Container>
          <Header />
          <main className="bg-[#232944]">
            <Outlet />
          </main>
          <Footer />
        </Container>
      </div>
    </>
  );
}

export default App;
