import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const registerSchema = z.object({
	firstName: z.string().min(1, "First name is required"),
	lastName: z.string().min(1, "Last name is required"),
	email: z.string().email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
	});

	const onSubmit: SubmitHandler<RegisterFormData> = (data) => {
		console.log(data);
		// Perform registration logic here
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-12 space-y-4">
			<div className="w-full max-w-sm space-y-4">
				<div className="space-y-2 text-center">
					<div />
					<h1 className="text-3xl font-bold">Register</h1>
				</div>
				<form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-2">
							<Input
								label="First name"
								id="firstName"
								placeholder="John"
								{...register("firstName")}
								error={errors.firstName?.message}
							/>

						</div>
						<div className="space-y-2">
							<Input
								label="Last name"
								id="lastName"
								placeholder="Doe"
								{...register("lastName")}
								error={errors.lastName?.message}
							/>
						</div>
					</div>
					<div className="space-y-2">
						<Input
							label="Email"
							id="email"
							placeholder="johndoe@example.com"
							type="email"
							{...register("email")}
							error={errors.email?.message}
						/>
					</div>
					<div className="space-y-2">
						<Input
							label="Password"
							id="password"
							type="password"
							{...register("password")}
							error={errors.password?.message}
						/>
					</div>
					<Button className="w-full" type="submit">
						Register
					</Button>
				</form>
				<div className="flex items-center justify-between space-x-2">
					<Link className="text-sm underline" to="/login">
						Already have an account? Login
					</Link>
				</div>
			</div>
		</div>
	);
}