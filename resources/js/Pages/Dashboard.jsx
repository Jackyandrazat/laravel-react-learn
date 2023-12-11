import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Dashboard(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [isNotif, setisNotif] = useState(false);

    const handleSubmit = () => {
        const data = {
            title,
            description,
            category,
        };
        router.post("/news", data);
        setisNotif(true);
        setTitle("");
        setDescription("");
        setCategory("");
    };

    useEffect(() => {
        if (!props.myNews) {
            router.get("/news");
        }
       
        return;
    }, []);

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Berita Saya
                </h2>
            }
        >
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-6 bg-white border-b border-gray-400 ">
                        <div>
                            {isNotif && (
                                <div
                                    role="alert"
                                    className="alert alert-success"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="stroke-current shrink-0 h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    {props.flash.message}
                                </div>
                            )}
                        </div>
                        <input
                            type="text"
                            placeholder="Judul Berita"
                            className="m-1 input input-bordered w-full "
                            onChange={(title) => setTitle(title.target.value)}
                            value={title}
                        />
                        <input
                            type="text"
                            placeholder="Deskripsi"
                            className="m-1 input input-bordered w-full "
                            onChange={(description) =>
                                setDescription(description.target.value)
                            }
                            value={description}
                        />
                        <input
                            type="text"
                            placeholder="Kategori"
                            className="m-1 input input-bordered w-full "
                            onChange={(category) =>
                                setCategory(category.target.value)
                            }
                            value={category}
                        />
                        <button
                            className="btn btn-primary m-2 "
                            onClick={() => handleSubmit()}
                        >
                            SUBMIT
                        </button>
                    </div>
                </div>
                <div className="p-5">
                    {props.myNews && props.myNews.length > 0 ? (
                        props.myNews.map((news, i) => {
                            return (
                                <div
                                    key={i}
                                    className="card w-full lg:w-96 bg-base-100 shadow-xl m-2"
                                >
                                    <div className="card-body">
                                        <h2 className="card-title">
                                            {news.title}
                                            <div className="badge badge-secondary">
                                                NEW
                                            </div>
                                        </h2>
                                        <p>{news.description}</p>
                                        <div className="card-actions justify-end">
                                            <div className="badge badge-inline bg-slate-400">
                                                {news.category}
                                            </div>
                                            <div className="badge badge-outline">
                                                <Link
                                                    href={route("edit.news")}
                                                    as="button"
                                                    method="get"
                                                    data={{ id: news.id }}
                                                >
                                                    Edit
                                                </Link>
                                            </div>
                                            <div className="badge badge-outline">
                                                <Link
                                                    href={route("delete.news")}
                                                    as="button"
                                                    method="post"
                                                    data={{ id: news.id }}
                                                >
                                                Delete
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p>Belum ada Berita </p>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
