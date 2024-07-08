import ClassCard from "./ClassCard";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import ClassForm from "./ClassForm";
import { ClassData } from "@/lib/ClassData";
import { useEffect, useState } from "react";
import { useClassStore } from "@/stores/classStore";

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
    const { datas } = useClassStore();
    const { fetchDatas, isLoading, postClass, putClass, delClass } = useClassStore();

    useEffect(() => {
        fetchDatas();
    }, []);

    const createClass = (data: ClassData) => {
        postClass(data);
        setIsCreateFormOpen(false);
    };

    const updateClass = (id: string, data: ClassData) => {
        putClass(id, data);
    };

    const deleteClass = (id: string) => {
        delClass(id);
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
                <SheetTrigger className="heading6 bg-secondary text-text-light-primary py-2 px-6 rounded-full mt-4">
                    Tambah Kelas
                </SheetTrigger>
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
            {!isLoading && datas.length == 0 && (
                <p className="heading5 text-text-dark-secondary mt-6">
                    Nampaknya Belum ada kelas yang tersedia
                </p>
            )}
            {isLoading && (
                <p className="heading5 text-text-dark-secondary mt-6">
                    Loading...
                </p>
            )}
            <div className="mt-8 mb-16 gap-[24px] grid max-lg:grid-cols-1 max-xl:grid-cols-2 max-2xl:grid-cols-3 grid-cols-4 max-md:gap-[20px]">
                {datas.map((item) => (
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
