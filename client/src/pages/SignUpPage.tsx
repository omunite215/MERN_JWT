import { SignUpSchema } from "@/lib/validationSchemas";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import type { z } from "zod";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { SignupFields } from "@/lib/formField";
import CustomInput from "@/components/CustomInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

const SignUpPage = () => {
	const { signup, error, isLoading } = useAuthStore();
	const navigate = useNavigate();
	const form = useForm<z.infer<typeof SignUpSchema>>({
		resolver: zodResolver(SignUpSchema),
		defaultValues: {
			email: "",
			password: "",
			confirmPassword: "",
			name: "",
		}
	});
	const onSubmit = async (values: z.infer<typeof SignUpSchema>) => {
		try {
			await signup(values.email, values.password, values.name);
			toast.success("Account Created Successfully");
			navigate("/verify-email");
		} catch (err) {
			toast.error(`${err}`);
		}
	};
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="flex items-center justify-center container"
		>
			<Card className="my-6 lg:w-1/3">
				<CardHeader>
					<CardTitle className="md:text-4xl text-2xl">
						Welcome to Auth
					</CardTitle>
					<CardDescription>Register your Account</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
							{SignupFields.map((item) => (
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
									<>Signup</>
								)}
							</Button>
						</form>
					</Form>
				</CardContent>
				<CardFooter className="flex items-center justify-center">
					{error && (
						<p className="text-destructive my-4 text-sm">Error: {error}</p>
					)}
					Already Have an Account ?&nbsp;
					<a href="/login">
						<Button type="button" variant="link">
							Login Here
						</Button>
					</a>
				</CardFooter>
			</Card>
		</motion.div>
	);
};

export default SignUpPage;
