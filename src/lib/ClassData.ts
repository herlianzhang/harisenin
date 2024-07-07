export interface ClassData {
    id?: string;
    background: string;
    title: string;
    description: string;
    instructor: {
        name: string;
        job: string;
        company: string;
        avatar: string;
    };
    rating: {
        value: number;
        from: number;
    };
    price: number;
}