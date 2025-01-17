import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { VerifySchema } from "@/lib/validationSchemas";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useAuthStore } from "@/store/authStore";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export function VerifyPage() {
	const navigate = useNavigate();
	const { verifyEmail, isLoading, error } = useAuthStore();
	const form = useForm<z.infer<typeof VerifySchema>>({
		resolver: zodResolver(VerifySchema),
		defaultValues: {
			code: "",
		},
	});

	const onSubmit = async (data: z.infer<typeof VerifySchema>) => {
		try {
			await verifyEmail(data.code);
			toast.success("Account Verified Successfully!!");
			navigate("/")

		} catch (error) {
			console.error(error);
		}
	};

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="flex items-center justify-center container h-screen"
		>
			<Card className="my-auto">
				<CardHeader>
					<CardTitle>OTP Verification</CardTitle>
					<CardDescription>
						Enter 6 Digit Verification Code sent to your email
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="w-2/3 space-y-6"
						>
							<FormField
								control={form.control}
								name="code"
								render={({ field }) => (
									<FormItem>
										<FormLabel>One-Time Password</FormLabel>
										<FormControl>
											<InputOTP maxLength={6} {...field}>
												<InputOTPGroup>
													<InputOTPSlot index={0} />
													<InputOTPSlot index={1} />
													<InputOTPSlot index={2} />
													<InputOTPSlot index={3} />
													<InputOTPSlot index={4} />
													<InputOTPSlot index={5} />
												</InputOTPGroup>
											</InputOTP>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							{error && (
								<p className="text-destructive my-4 text-sm">Error: {error}</p>
							)}
							<Button
								type="submit"
								className="w-full"
								disabled={isLoading || form.formState.isSubmitting}
							>
								{isLoading || form.formState.isSubmitting ? (
									<>
										<Loader2 className="animate-spin" />
										&nbsp;Please Wait...
									</>
								) : (
									<>Verify</>
								)}
							</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</motion.div>
	);
}
