import star from "@/assets/star.svg";
import unfilledstar from "@/assets/unfilledstar.svg";
import halfstar from "@/assets/halfstar.svg";
import { ClassData } from "@/lib/ClassData";
import { formatIDR } from "@/lib/utils";
import edit from "@/assets/edit.png";
import del from "@/assets/delete.png";
import ClassForm from "./ClassForm";
import { Sheet, SheetTrigger } from "./ui/sheet";
import { useState } from "react";
import * as uuid from "uuid";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Props {
    item: ClassData;
    onUpdate: (id: string, data: ClassData) => void;
    onDelete: (id: string) => void;
}

const ClassCard = ({ item, onUpdate, onDelete }: Props) => {
    const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);
    const getStars = () => {
        const stars: string[] = [];
        let curr = item.rating.value;
        for (let i = 0; i < 5; i++) {
            if (curr >= 1) {
                stars.push(star);
            } else if (curr < 1 && curr > 0) {
                stars.push(halfstar);
            } else {
                stars.push(unfilledstar);
            }
            curr -= 1;
        }

        return stars;
    };

    return (
        <div className="flex flex-col p-[20px] border border-other-border rounded-[10px] bg-other-background-primary gap-4 max-lg:gap-2 max-lg:p-4">
            <div className="flex flex-col gap-4 max-lg:flex-row max-lg:items-center max-lg:gap-3">
                <img
                    src={item.background}
                    className="inset-0 h-[193px] object-cover rounded-[10px] max-lg:w-[82px] max-lg:h-[82px]"
                />
                <div className="flex gap-1 grow">
                    <div className="grow">
                        <h6 className="heading6 max-lg:bodyMediumBold text-text-dark-primary">
                            {item.title}
                        </h6>
                        <p className="bodyMediumMedium text-text-dark-secondary line-clamp-2 mt-2 max-lg:hidden">
                            {item.description}
                        </p>
                        <div className="flex gap-[10px] items-center mt-4 max-lg:mt-2">
                            <img
                                src={item.instructor.avatar}
                                className="w-10 h-10 rounded-[10px]"
                            />
                            <div>
                                <p className="line-clamp-1 bodyMediumMedium max-lg:bodySmallMedium text-text-dark-primary">
                                    {item.instructor.name}
                                </p>
                                <p className="line-clamp-1 bodySmallRegular  text-text-dark-secondary">
                                    {item.instructor.job}{" "}
                                    <span className="max-lg:hidden">
                                        di{" "}
                                        <span className="bodySmallBold">
                                            {item.instructor.company}
                                        </span>
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <Sheet
                        open={isUpdateFormOpen}
                        onOpenChange={(newValue) =>
                            setIsUpdateFormOpen(newValue)
                        }
                    >
                        <div className="flex flex-col gap-1 shrink-0">
                            <SheetTrigger className="bg-green-400 p-2 rounded-full cursor-pointer">
                                <img src={edit} className="w-4 h-4" />
                            </SheetTrigger>
                            <ClassForm
                                previousData={item}
                                onUpdate={(id: string, data: ClassData) => {
                                    onUpdate(id, data);
                                    setIsUpdateFormOpen(false);
                                }}
                            />
                            <AlertDialog>
                                <AlertDialogTrigger className="bg-error p-2 rounded-full cursor-pointer">
                                    <img src={del} className="w-4 h-4" />
                                </AlertDialogTrigger>
                                <AlertDialogContent className="bg-other-background-primary">
                                    <AlertDialogHeader>
                                        <AlertDialogTitle className="heading4">
                                            Yakin ingin menghapus kelas ini?
                                        </AlertDialogTitle>
                                        <AlertDialogDescription className="bodyMediumRegular text-text-dark-secondary">
                                            Kelas yang sudah dihapus tidak dapat
                                            dikembalikan lagi.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel className="bodyMediumBold text-text-dark-secondary">
                                            Tidak
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                            className="bodyMediumBold text-text-light-primary"
                                            onClick={async () => {
                                                if (!item.id) return;
                                                onDelete(item.id);
                                            }}
                                        >
                                            Yakin
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </Sheet>
                </div>
            </div>

            <div className="flex justify-between gap-[10px] items-center">
                <div className="flex gap-2">
                    <div className="flex">
                        {getStars().map((starImg) => (
                            <img
                                key={uuid.v4()}
                                src={starImg}
                                width={18}
                                height={18}
                            />
                        ))}
                    </div>
                    <p className="text-text-dark-secondary bodySmallMedium underline">
                        {item.rating.value} ({item.rating.from})
                    </p>
                </div>
                <h4 className="heading4 max-lg:heading5 text-primary">
                    {formatIDR(item.price)}
                </h4>
            </div>
        </div>
    );
};

export default ClassCard;
