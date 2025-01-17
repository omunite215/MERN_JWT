import { ForgotPasswordSchema } from "@/lib/validationSchemas";
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
import { ForgotPasswordFields } from "@/lib/formField";
import CustomInput from "@/components/CustomInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useAuthStore } from "@/store/authStore";
import { CheckCircle, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const ForgotPasswordPage = () => {
	const { forgotPassword, error, isLoading } = useAuthStore();
	const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
		resolver: zodResolver(ForgotPasswordSchema),
		defaultValues: {
			email: "",
		},
	});
	const onSubmit = async (values: z.infer<typeof ForgotPasswordSchema>) => {
		await forgotPassword(values.email);
		toast.success("Email Sent Successfully");
	};
	return form.formState.isSubmitted ? (
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
						Request Recieved!!
					</CardTitle>
					<CardDescription>
						We will shortly send you a password reset link at&nbsp;
						{form.getValues("email")}
					</CardDescription>
				</CardHeader>
				<CardContent className="flex justify-center items-center gap-6">
					<a href="/verify-email">
						<Button>Resend Link</Button>
					</a>
					<a href="/login">
						<Button>Go back to Login Page</Button>
					</a>
				</CardContent>
				<CardFooter>
					{error && <p className=" text-destructive text-sm ">{error}</p>}
				</CardFooter>
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
					<CardTitle className="md:text-4xl text-2xl">
						Forgot Password ?
					</CardTitle>
					<CardDescription>
						Please enter your e-mail to get a password reset link.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
							{ForgotPasswordFields.map((item) => (
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
			</Card>
		</motion.div>
	);
};

export default ForgotPasswordPage;
