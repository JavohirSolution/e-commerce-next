import Cta from "@/components/cta";
import Feature from "@/components/features";
import { ProductType } from "@/interface";
import Image from "next/image";
import Link from "next/link";

const ProductPage = async () => {
    const response = await fetch("https://fakestoreapi.com/products?limit=12");
    const products: ProductType[] = await response.json();

    try {
        return (
            <>
                <div className="bg-white">
                    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                        <Feature />
                        <h2 className="sr-only">Products</h2>

                        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                            {products.map((product) => (
                                <Link key={product.id} href={`/product/${product.id}`} className="group">
                                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 relative border">
                                        <Image
                                            width={1000}
                                            height={100}
                                            alt={product.title}
                                            src={product.image}
                                            className="flex items-center object-cover object-center group-hover:opacity-75 h-96"
                                        />
                                    </div>
                                    <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
                                    <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
                                </Link>
                            ))}
                        </div>
                        <Cta />
                    </div>
                </div>
            </>

        )
    } catch (error) {
        console.log(error)
    }
}

export default ProductPage