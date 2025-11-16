import { useSearchParams } from "react-router-dom";
import { type ChangeEvent } from "react";

import Select from "./Select";

type SortByProps = {
    options: {
        value: string;
        label: string;
    }[];
};

export default function SortBy({ options }: SortByProps) {
    const [searchParams, setSearchParams] = useSearchParams();

    const sortBy = searchParams.get("sortBy") || "";

    function handleChange(event: ChangeEvent<HTMLSelectElement>) {
        searchParams.set("sortBy", event.target.value);
        setSearchParams(searchParams);
    }

    return <Select options={options} value={sortBy} onChange={handleChange} />;
}
