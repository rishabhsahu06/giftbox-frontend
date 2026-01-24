import React from "react";
import image from "../assets/bulk-gifting.png"
function BulkGifting() {
    return (
        <section className="container  px-4 sm:px- lg:px-8">
            <div className=" w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-19 items-center">
                    {/* Image Section */}
                    <div className="flex justify-center lg:justify-start order-2 lg:order-1">
                        <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl">
                            <img
                                src={image}
                                alt="Corporate bulk gifting items including bags, tech accessories, mugs, and promotional materials"
                                className="w-full h-auto object-cover  "
                                loading="lazy"
                            />
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="text-center lg:text-left space-y-6 order-1 lg:order-2">
                        {/* Subtitle */}
                        <p className="text-gray-500 text-sm md:text-base font-medium tracking-wide uppercase">
                            Joining Kits, Event Giveaways & More
                        </p>

                        {/* Main Heading */}
                        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                            Corporate Bulk Gifting
                        </h1>

                        {/* Contact Information */}
                        <div className="space-y-2">
                            <p className="text-base md:text-lg text-gray-600">
                                Email at{" "}
                                <a
                                    href="mailto:Dummy@gmail.com"
                                    className="text-red-500 hover:text-red-600 font-semibold transition-colors duration-200 underline decoration-red-500/30 hover:decoration-red-500"
                                >
                                    hetalsoapstory@gmail.com
                                </a>{" "}
                                for any B2B gifting requirements!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BulkGifting;
