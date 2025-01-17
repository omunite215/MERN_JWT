import * as React from "react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
	icon?: IconName; // Type for the Lucide icon name
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, icon, ...props }, ref) => {
		return (
			<div className="relative h-10 w-full mb-4">
				{icon && <DynamicIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary z-10 size-5" name={icon} />}
				<input type={type} className="pl-10 pr-3 py-2 text-md w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" ref={ref} {...props} />
			</div>
		);
	},
);

Input.displayName = "Input";

export { Input };
