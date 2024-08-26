import Productpage from '@/components/Productpage';
import { ProductType } from '@/interface';
import { notFound } from 'next/navigation';

interface Props {
    params: {
        id: string;
    };
}

async function ProductDetailedPage({ params: { id } }: Props) {
    try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!res.ok) {
            throw new Error('Product not found');
        }
        const product: ProductType = await res.json();

        return (
            <Productpage product={product}></Productpage>
        )
    } catch (error) {
        notFound()
    }
}


export default ProductDetailedPage 