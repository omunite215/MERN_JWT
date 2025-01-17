import { ResetPasswordSchema } from "@/lib/validationSchemas";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ResetPasswordFields } from "@/lib/formField";
import CustomInput from "@/components/CustomInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useAuthStore } from "@/store/authStore";
import { CheckCircle, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import { useState } from "react";

const ResetPasswordPage = () => {
	const { token } = useParams();
	const navigate = useNavigate();
	if (!token) {
		toast.error("Invalid Token or Token not Found");
		return;
	}
	const [success, setSuccess] = useState(false);
	const { resetPassword, error, isLoading, message } = useAuthStore();
	const form = useForm<z.infer<typeof ResetPasswordSchema>>({
		resolver: zodResolver(ResetPasswordSchema),
		defaultValues: {
			password: "",
			confirmPassword: ""
		}
	});
	const onSubmit = async (values: z.infer<typeof ResetPasswordSchema>) => {
		try {
			await resetPassword(token, values.password);
			setSuccess(true);
			toast.success("Password Reset Successful");
			setTimeout(() => navigate("/login"), 5000);
		} catch (error) {
			toast.error((error as Error).message);
		}
	};
	return success ? (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="flex items-center justify-center container"
		>
			<Card className="my-6 lg:w-2/3">
				<CardHeader>
					<CardTitle className="md:text-4xl text-2xl">
						<CheckCircle className=" text-green-500" size={32} /> Password Reset
						Request Successful
					</CardTitle>
					<CardDescription>
						You have Successfully reset your password. Redirecting to Login Page
						in 5 seconds.
					</CardDescription>
				</CardHeader>
				<CardContent className="flex justify-center items-center">
					<a href="/login">
						<Button>Go back to Login Page</Button>
					</a>
				</CardContent>
			</Card>
		</motion.div>
	) : (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="flex items-center justify-center container"
		>
			<Card className="my-6 lg:w-1/3">
				<CardHeader>
					<CardTitle className="md:text-4xl text-2xl">Password Reset</CardTitle>
					<CardDescription>Please enter your new password.</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
							{ResetPasswordFields.map((item) => (
								<CustomInput key={item.name} control={form.control} {...item} />
							))}
							<Button
								type="submit"
								size="lg"
								className="w-full"
								disabled={isLoading || form.formState.isSubmitting}
							>
								{isLoading || form.formState.isSubmitting ? (
									<>
										<Loader2 className="animate-spin" />
										&nbsp;Please Wait...
									</>
								) : (
									<>Send Password Reset Link</>
								)}
							</Button>
						</form>
					</Form>
				</CardContent>
				<CardFooter className="space-y-4">
					{error && <p className=" text-destructive text-sm ">{error}</p>}
					{message && <p className=" text-destructive text-sm ">{message}</p>}
				</CardFooter>
			</Card>
		</motion.div>
	);
};

export default ResetPasswordPage;
