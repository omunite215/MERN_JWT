import { LoginSchema } from "@/lib/validationSchemas";
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
import { LoginFields } from "@/lib/formField";
import CustomInput from "@/components/CustomInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const LoginPage = () => {
	const navigate = useNavigate();
	const { login, isLoading, error } = useAuthStore();
	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			loginPassword: "",
		},
	});
	const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
		try {
			await login(values.email, values.loginPassword);
			toast.success("You have Logged In Successfully!!");
			navigate("/");
		} catch (error) {
			toast.error((error as Error).message);
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
					<CardTitle className="md:text-4xl text-2xl">Welcome Back!!</CardTitle>
					<CardDescription>Login to your account.</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
							{LoginFields.map((item) => (
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
									<>Login</>
								)}
							</Button>
						</form>
					</Form>
				</CardContent>
				<CardFooter className="flex items-center justify-center">
					Dont&apos;t Have an Account ?&nbsp;
					<a href="/signup">
						<Button type="button" variant="link">
							Register Here
						</Button>
					</a>
				</CardFooter>
			</Card>
		</motion.div>
	);
};

export default LoginPage;
