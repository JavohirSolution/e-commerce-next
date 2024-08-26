"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation"
import { ProductType } from "@/interface";
import { Dialog } from "@headlessui/react";
import ProductImage from "@/components/ProductImage";
import ReactStars from 'react-stars'
import { Bounce, toast } from "react-toastify";

const ProductDetailed = () => {
    const [product, setProduct] = useState<ProductType>();
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(true);
    const { id } = useParams();
    const router = useRouter()

    const handleClick = () => {
        const storedCarts = localStorage.getItem("carts");
        const products: ProductType[] = storedCarts ? JSON.parse(storedCarts) : [];

        const isExistProduct = products.find(c => c.id === product?.id)
        if (isExistProduct) {
            const updatedData = products.map(c => {
                if (c.id === product?.id) {
                    return {
                        ...c,
                        quantity: c.quantity + 1
                    }
                }
                return c
            })
            localStorage.setItem("carts", JSON.stringify(updatedData))
        } else {
            const data = [...products, { ...product, quantity: 1 }];
            localStorage.setItem("carts", JSON.stringify(data))
        }
        toast.success("Product added to bag!!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        })

    }

    useEffect(() => {
        async function getData() {
            setLoading(true)
            const response = await fetch(`https://fakestoreapi.com/products/${id}`);
            const data = await response.json();
            setProduct(data);
            setLoading(false)
        }
        getData()
    }, [id])

    return (
        <Dialog
            open={isOpen}
            onClose={() => {
                setIsOpen(false);
                router.back();
            }}
            className='relative z-50'
        >
            <div className='fixed inset-0 bg-black/30' aria-hidden='true' />

            <div className='fixed inset-0 overflow-y-auto'>
                <div className='flex min-h-full items-center justify-center p-4'>
                    <Dialog.Panel
                        className={'mx-auto max-w-3xl rounded bg-white p-10'}
                    >
                        {loading ? (
                            <div className='h-8 w-8 rounded-full border-2 border-dotted border-blue-600 animate-spin' />
                        ) : (
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 md:h-96 h-auto'>

                                {product?.image && (
                                    <div className='relative w-72 h-80 mb-5 mx-auto text-center md:inline '>
                                        <ProductImage product={product} fill />
                                    </div>
                                )}

                                <div className='flex-1 flex flex-col'>
                                    <div className='flex-1'>
                                        <h4 className='font-semibold md:text-left text-center'>
                                            {product?.title}
                                        </h4>
                                        <p className='font-medium text-sm'>
                                            ${product?.price}
                                        </p>

                                        <div className='flex items-center text-sm my-4'>
                                            <p>{product?.rating.rate}</p>
                                            {product?.rating.rate && (
                                                <div className='flex items-center ml-2 mr-6'>
                                                    {/* {Array.from(
                                                        {
                                                            length: Math.floor(product.rating.rate),
                                                        },
                                                        (_, i) => (
                                                            <StarIcon
                                                                key={i}
                                                                className='h-4 w-4 text-yellow-500'
                                                            />
                                                        )
                                                    )}
                                                    {Array.from(
                                                        {
                                                            length:
                                                                5 - Math.floor(product.rating.rate),
                                                        },
                                                        (_, i) => (
                                                            <StarIconOutline
                                                                key={i}
                                                                className='h-4 w-4 text-yellow-500'
                                                            />
                                                        )
                                                    )} */}
                                                    <ReactStars
                                                        value={product.rating.rate}
                                                        edit={false}
                                                    />
                                                </div>
                                            )}
                                            <p className='text-blue-600 hover:underline cursor-pointer text-xs'>
                                                See all {product?.rating.count} reviews
                                            </p>
                                        </div>
                                        <p className='line-clamp-5 text-sm'>
                                            {product?.description}
                                        </p>
                                    </div>

                                    <div className='space-y-3 text-sm'>
                                        <button
                                            className='bg-sky-600 text-white px-10 py-3 rounded hover:bg-transparent hover:text-black border hover:border-sky-500 transition duration-200 ease w-full'
                                            onClick={handleClick}
                                        >
                                            Add to bag
                                        </button>
                                        <button
                                            onClick={() => window.location.reload()}
                                            className='bg-transparent px-10 py-3 rounded hover:bg-sky-600 text-black border hover:text-white border-sky-500 transition duration-200 ease w-full'
                                        >
                                            View full details
                                        </button>
                                    </div>
                                </div>

                            </div>
                        )}
                    </Dialog.Panel>
                </div>
            </div>
        </Dialog>
    )
}

export default ProductDetailed