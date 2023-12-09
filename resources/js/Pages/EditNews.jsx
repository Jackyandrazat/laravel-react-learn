import React, { useState } from "react";
import { Link, Head, router } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";

export default function EditNews(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");

    const handleSubmit = () => {
        const data = {
            id:props.myNews.id,
            title,
            description,
            category,
        };
        router.post("/news/update", data);
        // setisNotif(true);
        setTitle("");
        setDescription("");
        setCategory("");
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Head title={props.title} />
            <Navbar user={props.auth.user} />
            <div className="p-5">
                <h1 className="text-center text-2xl">Edit Berita</h1>
                <div className="p-6 bg-white border-b border-gray-400 ">
                    <input
                        type="text"
                        placeholder="Judul Berita"
                        className="m-1 input input-bordered w-full "
                        onChange={(title) => setTitle(title.target.value)}
                        defaultValue={props.myNews.title}
                    />
                    <input
                        type="text"
                        placeholder="Deskripsi"
                        className="m-1 input input-bordered w-full "
                        onChange={(description) =>
                            setDescription(description.target.value)
                        }
                        defaultValue={props.myNews.description}
                    />
                    <input
                        type="text"
                        placeholder="Kategori"
                        className="m-1 input input-bordered w-full "
                        onChange={(category) =>
                            setCategory(category.target.value)
                        }
                        defaultValue={props.myNews.category}
                    />
                    <button
                        className="btn btn-primary m-2 w-full "
                        onClick={() => handleSubmit()}
                    >
                        SUBMIT
                    </button>
                </div>
            </div>
        </div>
    );
}
