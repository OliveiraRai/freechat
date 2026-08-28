import { Outlet } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import { Hero } from "../components/Hero";

export function BaseLayout() {
  return (
    <main className="min-h-screen bg-primary flex justify-center">
      <div className="w-full max-w-2xl">
        <NavBar />
        <Hero />
        <div className="flex justify-center mt-10">
          <div className="w-full max-w-80 flex flex-col items-center gap-2">
            <Outlet />
          </div>
        </div>
      </div>
    </main>
  );
}
