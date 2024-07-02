import { Input } from "./ui/input";
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "./ui/form";

import eye from "@/assets/eye.png";
import eyeOff from "@/assets/eye-off.png";
import { useState } from "react";

interface Props {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    control: any;
    name: string;
    label: string;
    type: string;
    required?: boolean;
}

const TextField = ({ control, name, label, type, required = false }: Props) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="space-y-1">
                    <FormLabel className="bodyMediumRegular text-[#4A505C] max-sm:bodySmallRegular">
                        {label}{" "}
                        {required && <span className="text-[#D32E1F]">*</span>}
                    </FormLabel>
                    <FormControl>
                        <div className="border-[1px] rounded-[6px] border-[#F1F1F1] flex items-center h-[48px] px-[10px]">
                            <Input
                                type={
                                    type === "password" && showPassword
                                        ? "text"
                                        : type
                                }
                                className="bodyMediumRegular max-sm:bodySmallRegular border-none focus-visible:border-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 !important p-0"
                                {...field}
                            />
                            {type === "password" && (
                                <img
                                    src={showPassword ? eye : eyeOff}
                                    className="h-[24px] w-[24px] cursor-pointer"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                />
                            )}
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default TextField;
