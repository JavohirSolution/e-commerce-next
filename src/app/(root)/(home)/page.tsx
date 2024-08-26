import Hero from "@/components/Hero";
import Product from "@/components/Product";
import { ProductType } from "@/interface";

export default async function HomePage() {
    const response = await fetch("https://fakestoreapi.com/products?limit=12");
    const products: ProductType[] = await response.json();

    return (
        <>
            <main className="min-h-screen max-w-7xl mx-auto px-8 xl:px-0 mt-16">
                <Hero />
                <section className="flex flex-col space-y-12">
                    <h1 className="text-5xl text-center leading-3">Online Shop</h1>
                    <div className="grid grid-cols-1 gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        {products.map((product) => (
                            <Product key={product.id} product={product} />
                        ))}
                    </div>
                </section>
            </main>
        </>
    );
}
