import LoginRegisterCard from "@/components/LoginRegisterCard";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import google from "@/assets/google.svg";

import { Form } from "@/components/ui/form";
import console from "console";
import TextField from "@/components/TextField";
import DButton from "@/components/DButton";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
    email: z.string(),
    password: z.string().min(4),
});

const Login = () => {
    const navigate = useNavigate();
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    }

    return (
        <LoginRegisterCard>
            <div className="flex flex-col items-center gap-[10px]">
                <h3 className="heading3 text-text-dark-primary max-sm:heading4">
                    Masuk ke Akun
                </h3>
                <p className="bodyMediumRegular text-text-dark-secondary max-sm:bodySmallRegular">
                    Yuk, lanjutin belajar di videobelajar.
                </p>
            </div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full flex flex-col gap-4 max-sm:gap-3"
                >
                    <TextField
                        control={form.control}
                        name="email"
                        label="E-mail"
                        type="email"
                        required
                    />
                    <TextField
                        control={form.control}
                        name="password"
                        label="Kata Sandi"
                        type="password"
                        required
                    />
                    <p className="mb-2 max-sm:mb-3 cursor-pointer ml-auto text-[#4A505C] bodyMediumMedium bodySmallMedium">
                        Lupa Password
                    </p>
                    <DButton
                        title="Masuk"
                        style="primary"
                        type="submit"
                        otherClasses="max-sm:mb-1"
                    />
                    <DButton
                        title="Daftar"
                        style="secondary"
                        onClick={() => navigate("/register")}
                    />
                    <div className="relative h-[22px] my-2">
                        <div className="absolute my-auto inset-0 h-[2px] bg-[#F1F1F1] z-0"></div>
                        <p className="absolute px-2 my-auto inset-x-0 bg-other-background-primary mx-auto max-w-fit text-[#4A505C] bodyMediumRegular">
                            atau
                        </p>
                    </div>
                    <DButton
                        title="Masuk dengan Google"
                        style="ghost"
                        imageSrc={google}
                    />
                </form>
            </Form>
        </LoginRegisterCard>
    );
};

export default Login;
