import type { IconName } from "lucide-react/dynamic";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import PasswordStrengthBar from "react-password-strength-bar";
import { buttonVariants } from "./ui/button";

type CustomInputProps = {
	// biome-ignore lint/suspicious/noExplicitAny: FORM CONTROL
	control: any;
	name: string;
	label: string;
	placeholder: string;
	icon?: IconName;
};

const CustomInput = ({
	control,
	name,
	label,
	placeholder,
	icon,
}: CustomInputProps) => {
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem>
					{name === "loginPassword" ? (
						<FormLabel className="flex justify-between items-center">
							<span>{label}</span>
							<a
								href="/forgot-password"
								className={buttonVariants({ variant: "link" })}
							>
								Forgot Password ?
							</a>
						</FormLabel>
					) : (
						<FormLabel>{label}</FormLabel>
					)}
					<FormControl>
						<div>
							<Input placeholder={placeholder} icon={icon} {...field} />

							{(name === "password" || name === "confirmPassword") && (
								<div className="my-1.5">
									<PasswordStrengthBar minLength={8} password={field.value} />
								</div>
							)}
						</div>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default CustomInput;
