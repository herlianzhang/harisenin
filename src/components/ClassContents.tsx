import ClassCard from "./ClassCard";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import ClassForm from "./ClassForm";
import { ClassData } from "@/lib/ClassData";
import { useEffect, useState } from "react";

const ClassContents = () => {
    const [isCreateFormOpen, setIsCreateFormOpen] = useState(false);
    const categories = [
        "Semua Kelas",
        "Pemasaran",
        "Desain",
        "Pengembangan Diri",
        "Bisnis",
    ];
    const selected = categories[0];
    const [allClasses, setAllClasses] = useState<ClassData[]>(
        JSON.parse(localStorage.getItem("classes") || "[]")
    );

    useEffect(() => {
        localStorage.setItem("classes", JSON.stringify(allClasses));
    }, [allClasses]);

    const createClass = (data: ClassData) => {
        setAllClasses([...allClasses, data]);
        setIsCreateFormOpen(false);
    };

    const updateClass = (id: string, data: ClassData) => {
        setAllClasses(
            allClasses.map((item) => {
                if (item.id === id) {
                    return data;
                }
                return item;
            })
        );
    };

    const deleteClass = (id: string) => {
        setAllClasses(allClasses.filter((item) => item.id !== id));
    };

    return (
        <>
            <h3 className="heading3 mt-16  max-md:heading4 max-md:mt-6">
                Koleksi Video Pembelajaran Unggulan
            </h3>
            <p className="bodyMediumMedium max-md:bodySmallMedium text-text-dark-secondary mt-[10px]">
                Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!
            </p>

            <Sheet
                open={isCreateFormOpen}
                onOpenChange={(newValue) => setIsCreateFormOpen(newValue)}
            >
                <SheetTrigger className="heading6 bg-secondary text-text-light-primary py-2 px-6 rounded-full mt-4">Tambah Kelas</SheetTrigger>
                <ClassForm onCreate={createClass} />
            </Sheet>
            <div className="flex gap-9 mt-8 max-md:mt-6 overflow-x-scroll scrollbar-hide">
                {categories.map((category) => (
                    <div key={category} className="flex flex-col">
                        <p
                            className={`${
                                selected === category
                                    ? "text-tertiary"
                                    : "text-text-dark-secondary"
                            } bodyMediumMedium max-md:bodySmallMedium py-3 text-nowrap`}
                        >
                            {category}
                        </p>
                        <div
                            className={`h-[6px] w-[52px] ${
                                selected === category
                                    ? "bg-tertiary"
                                    : "bg-transparent"
                            } rounded-[10px]`}
                        />
                    </div>
                ))}
            </div>
            {allClasses.length == 0 && (
                <p className="heading5 text-text-dark-secondary mt-6">
                    Nampaknya Belum ada kelas yang tersedia
                </p>
            )}
            <div className="mt-8 mb-16 gap-[24px] grid max-lg:grid-cols-1 max-xl:grid-cols-2 max-2xl:grid-cols-3 grid-cols-4 max-md:gap-[20px]">
                {allClasses.map((item) => (
                    <ClassCard
                        key={item.id}
                        item={item}
                        onUpdate={updateClass}
                        onDelete={deleteClass}
                    />
                ))}
            </div>
            
        </>
    );
};

export default ClassContents;
