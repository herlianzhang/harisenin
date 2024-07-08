import { z } from "zod";
import { useForm } from "react-hook-form";
import content1 from "@/assets/contents/background/content1.png";
import content2 from "@/assets/contents/background/content2.jpeg";
import content3 from "@/assets/contents/background/content3.jpeg";
import content4 from "@/assets/contents/background/content4.jpeg";
import content5 from "@/assets/contents/background/content5.jpeg";
import content6 from "@/assets/contents/background/content6.jpeg";
import content7 from "@/assets/contents/background/content7.jpeg";
import content8 from "@/assets/contents/background/content8.jpeg";
import content9 from "@/assets/contents/background/content9.jpeg";
import avatar1 from "@/assets/contents/avatar/avatar1.png";
import avatar2 from "@/assets/contents/avatar/avatar2.png";
import avatar3 from "@/assets/contents/avatar/avatar3.png";
import avatar4 from "@/assets/contents/avatar/avatar4.png";
import avatar5 from "@/assets/contents/avatar/avatar5.png";
import avatar6 from "@/assets/contents/avatar/avatar6.png";
import avatar7 from "@/assets/contents/avatar/avatar7.png";
import avatar8 from "@/assets/contents/avatar/avatar8.png";
import avatar9 from "@/assets/contents/avatar/avatar9.png";

import { Form } from "@/components/ui/form";
import { ClassData } from "@/lib/ClassData";
import { zodResolver } from "@hookform/resolvers/zod";
import DButton from "./DButton";
import TextField from "./TextField";
import { getRandomInt } from "@/lib/utils";
import {
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "./ui/sheet";
import { useEffect } from "react";

const formSchema = z.object({
    title: z.string().min(4),
    description: z.string().min(4),
    instructorName: z.string().min(4),
    instructorJob: z.string().min(4),
    instructorCompany: z.string().min(4),
    price: z.coerce.number().min(0),
});

interface Props {
    previousData?: ClassData;
    onUpdate?: (id: string, data: ClassData) => void;
    onCreate?: (data: ClassData) => void;
}

const ClassForm = ({ previousData, onUpdate, onCreate }: Props) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            instructorName: "",
            instructorJob: "",
            instructorCompany: "",
            price: 0,
        },
    });

    useEffect(() => {
        if (previousData) {
            form.reset({
                title: previousData.title,
                description: previousData.description,
                instructorName: previousData.instructor.name,
                instructorJob: previousData.instructor.job,
                instructorCompany: previousData.instructor.company,
                price: previousData.price,
            });
        }
    }, [previousData]);

    function onSubmit(values: z.infer<typeof formSchema>) {
        form.reset();
        if (onCreate) {
            const avatars = [
                avatar1,
                avatar2,
                avatar3,
                avatar4,
                avatar5,
                avatar6,
                avatar7,
                avatar8,
                avatar9,
            ];
            const backgrounds = [
                content1,
                content2,
                content3,
                content4,
                content5,
                content6,
                content7,
                content8,
                content9,
            ];
            const result: ClassData = {
                background:
                    backgrounds[getRandomInt(0, backgrounds.length - 1)],
                title: values.title,
                description: values.description,
                instructor: {
                    name: values.instructorName,
                    job: values.instructorJob,
                    company: values.instructorCompany,
                    avatar: avatars[getRandomInt(0, avatars.length - 1)],
                },
                rating: {
                    value: getRandomInt(1, 5),
                    from: getRandomInt(0, 100),
                },
                price: values.price,
            };
            onCreate(result);
        } else if (onUpdate && previousData?.id) {
            onUpdate(previousData.id, {
                background: previousData.background,
                title: values.title,
                description: values.description,
                instructor: {
                    name: values.instructorName,
                    job: values.instructorJob,
                    company: values.instructorCompany,
                    avatar: previousData.instructor.avatar,
                },
                rating: {
                    value: previousData.rating.value,
                    from: previousData.rating.from,
                },
                price: values.price,
            });
        }
    }

    return (
        <SheetContent
            side="bottom"
            className="bg-other-background-primary text-text-dark-primary"
        >
            <SheetHeader>
                <SheetTitle>{`Yuk ${
                    onCreate ? "Tambahin" : "Perbaharuin"
                } Kelas nya?`}</SheetTitle>
                <SheetDescription>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="w-full flex flex-col gap-4 max-md:gap-3"
                        >
                            <TextField
                                control={form.control}
                                name="title"
                                label="Judul Kelas"
                                type="text"
                            />
                            <TextField
                                control={form.control}
                                name="description"
                                label="Deskripsi Kelas"
                                type="text"
                            />
                            <TextField
                                control={form.control}
                                name="instructorName"
                                label="Nama Pengajar"
                                type="text"
                            />
                            <TextField
                                control={form.control}
                                name="instructorJob"
                                label="Pekerjaan Pengajar"
                                type="text"
                            />
                            <TextField
                                control={form.control}
                                name="instructorCompany"
                                label="Kantor Pengajar"
                                type="text"
                            />
                            <TextField
                                control={form.control}
                                name="price"
                                label="Harga Kelas"
                                type="number"
                            />
                            <DButton
                                title={`${
                                    onCreate ? "Buat" : "Perbaharui"
                                } Kelas`}
                                style="primary"
                                type="submit"
                            />
                        </form>
                    </Form>
                </SheetDescription>
            </SheetHeader>
        </SheetContent>
    );
};

export default ClassForm;
