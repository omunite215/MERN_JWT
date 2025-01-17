import type { IconName } from "lucide-react/dynamic";

type FormFields = {
    name: string;
    label: string;
    placeholder: string;
    icon: IconName
}[] 

export const SignupFields: FormFields = [
    {
        name: "name",
        label: "Name",
        placeholder: "Enter your name",
        icon: 'user-round',
    },
    {
        name: "email",
        label: "Email",
        placeholder: "example@email.com",
        icon: "mail"
    },
    {
        name: "password",
        label: "Password",
        placeholder: "XXXXXXXX",
        icon: "lock"
    },
    {
        name: "confirmPassword",
        label: "Comfirm Password",
        placeholder: "XXXXXXXX",
        icon: "lock"
    },
]
export const LoginFields:FormFields = [
    {
        name: "email",
        label: "Email",
        placeholder: "Enter your email",
        icon: "mail"
    },
    {
        name: "loginPassword",
        label: "Password",
        placeholder: "XXXXXXXX",
        icon: "lock"
    },
];
export const ForgotPasswordFields:FormFields = [
    {
        name: "email",
        label: "Email",
        placeholder: "Enter your email",
        icon: "mail"
    },
];

export const ResetPasswordFields:FormFields = [
    {
        name: "password",
        label: "Password",
        placeholder: "XXXXXXXX",
        icon: "lock"
    },
    {
        name: "confirmPassword",
        label: "Comfirm Password",
        placeholder: "XXXXXXXX",
        icon: "lock"
    },
]