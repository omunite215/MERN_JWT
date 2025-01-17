import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import { router } from "./lib/routes.tsx";
import { RouterProvider } from "react-router";
import { Toaster } from "react-hot-toast";
// biome-ignore lint/style/noNonNullAssertion: ROOT
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Toaster />
		<RouterProvider router={router} />
	</StrictMode>,
);
