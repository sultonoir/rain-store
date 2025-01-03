import { type ProductPage } from "@/types";
import React from "react";
import ImagesProduct from "./images-product";
import PriceProduct from "./price-product";
import CouponProduct from "./coupon-product";
import AboutProduct from "./about-product";
import SizesProduct from "./sizes-product";
import PaymentProduct from "./payment-product";
import TitleProduct from "./title-product";
import TotalRating from "../rating/total-rating";
import BenefitProduct from "./benefit-product";
import QtyProduct from "./qty-product";
import RecomendInfinite from "../recommend/recommend-infinite";
import ProductRating from "../rating/product-rating";

interface Props {
  data: ProductPage;
}

const PageProduct = ({ data }: Props) => {
  return (
    <div className="container relative z-0 my-10 min-h-screen space-y-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:gap-10">
        <div className="relative lg:w-[55%]">
          <ImagesProduct images={data.productImage} />
        </div>
        <div className="space-y-4 lg:w-[45%]">
          <TitleProduct title={data.name} rating={data.rating} />
          <TotalRating rating={0} size={20} />
          <PriceProduct
            discount={data.discount}
            price={data.price}
            priceClassName="~text-lg/4xl"
            discountClassName="~text-sm/2xl"
          />
          {data.coupon.length > 0 && (
            <CouponProduct
              coupon={data.coupon[0]!}
              amount={data.coupon.length}
              type="multiple"
            />
          )}
          <SizesProduct sizes={data.stockandsize} />
          <QtyProduct />
          <PaymentProduct data={data} />
          <AboutProduct about={data.desc} />
          <BenefitProduct />
        </div>
      </div>
      <ProductRating />
      <div className="min-h-[300px]">
        <RecomendInfinite slug={data.slug} category={data.category} />
      </div>
    </div>
  );
};

export default PageProduct;
