import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogFooter,
	DialogClose,
} from "@/components/ui/dialog";
import { useAuthStore } from "@/store/authStore";
import { LogOutIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";

const LogoutDialog = () => {
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();
	const { logout, error } = useAuthStore();
	const handleLogout = async () => {
		toast.promise(logout(), {
			loading: "Logging Out",
			success: <b>logout successful</b>,
			error: <b>{error}</b>,
		});
		setOpen(false);
		navigate("/login");
	};

	return (
		<Dialog>
			<DialogTrigger className="flex items-center gap-2">
				<LogOutIcon className="text-destructive" size={18} />
				Logout
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Are you absolutely sure?</DialogTitle>
					<DialogDescription>This action cannot be undone.</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogClose>Cancel</DialogClose>
					<Button variant="destructive" type="button" onClick={handleLogout}>
						Continue
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default LogoutDialog;
