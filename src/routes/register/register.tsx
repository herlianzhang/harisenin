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
    name: z.string().min(2),
    email: z.string(),
    phoneNumber: z.string().min(10),
    password: z.string().min(4),
    confirmPassword: z.string().min(4),
});

const Register = () => {
    const navigate = useNavigate();
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phoneNumber: "",
            password: "",
            confirmPassword: "",
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    }

    return (
        <LoginRegisterCard
            title="Pendaftaran Akun"
            subtitle="Yuk, daftarkan akunmu sekarang juga!"
        >
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full flex flex-col gap-4 max-sm:gap-3"
                >
                    <TextField
                        control={form.control}
                        name="name"
                        label="Nama Lengkap"
                        type="text"
                        required
                    />
                    <TextField
                        control={form.control}
                        name="email"
                        label="E-Mail"
                        type="email"
                        required
                    />
                    <TextField
                        control={form.control}
                        name="phoneNumber"
                        label="No. Hp"
                        type="tel"
                        required
                    />
                    <TextField
                        control={form.control}
                        name="password"
                        label="Kata Sandi"
                        type="password"
                        required
                    />
                    <TextField
                        control={form.control}
                        name="confirmPassword"
                        label="Konfirmasi Kata Sandi"
                        type="password"
                        required
                    />
                    <p className="mb-2 max-sm:mb-3 cursor-pointer ml-auto text-[#4A505C] bodyMediumMedium max-sm:bodySmallMedium">
                        Lupa Password?
                    </p>
                    <DButton
                        title="Daftar"
                        style="primary"
                        type="submit"
                        otherClasses="max-sm:mb-1"
                    />
                    <DButton
                        title="Masuk"
                        style="secondary"
                        onClick={() => navigate("/login")}
                    />
                    <div className="relative h-[22px] my-2">
                        <div className="absolute my-auto inset-0 h-[2px] bg-[#F1F1F1] z-0"></div>
                        <p className="absolute px-2 my-auto inset-x-0 bg-other-background-primary mx-auto max-w-fit text-[#4A505C] bodyMediumRegular">
                            atau
                        </p>
                    </div>
                    <DButton
                        title="Daftar dengan Google"
                        style="ghost"
                        imageSrc={google}
                    />
                </form>
            </Form>
        </LoginRegisterCard>
    );
};

export default Register;
