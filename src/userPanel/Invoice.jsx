import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import html2pdf from "html2pdf.js";
import html2canvas from "html2canvas";
import { getOrderById } from "../api/products.api";
import { MainContent } from "../constants/maincontant";
import PageLoader from "../Pageloader/Pageloader";

const Invoice = () => {
  const invoiceRef = useRef();
  const location = useLocation();
  const { orderId } = location.state || {};
  const [invoiceData, setInvoiceData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!orderId) return;
    const fetchInvoice = async () => {
      setLoading(true);
      try {
        const res = await getOrderById(orderId);
        if (res.success) {
          setInvoiceData(res.order);
        } else {
          console.error("Error fetching order:", res.message);
        }
      } catch (err) {
        console.error("Error fetching invoice:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoice();
  }, [orderId]);

  if (loading) return <PageLoader loading={loading} />;
  if (!invoiceData) return <div className="text-center py-10">Loading...</div>;

  const { razorpayOrderId: orderNo, createdAt, items = [], user = {}, address = {} } = invoiceData;

  const totalQuantity = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalAmounts = items.reduce((sum, i) => sum + i.subtotal, 0);
  const totalGstAmount = items.reduce(
    (sum, i) => sum + (i.subtotal * (i?.product?.gst || 0)) / 100,
    0
  );

  // ✅ Download as PDF
  const handleDownload = () => {
    const element = invoiceRef.current;
    const images = element.querySelectorAll("img");

    const loadImages = Array.from(images).map(
      (img) =>
        new Promise((resolve) => {
          if (img.complete) resolve();
          else img.onload = img.onerror = resolve;
        })
    );

    Promise.all(loadImages).then(() => {
      const opt = {
        margin: 0.5,
        filename: `Invoice-${invoiceData._id || orderId}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, allowTaint: true },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      };
      html2pdf().from(element).set(opt).save();
    });
  };

  // ✅ Print invoice
  const handlePrint = () => {
    html2canvas(invoiceRef.current, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
    }).then((canvas) => {
      const dataUrl = canvas.toDataURL("image/png", 1.0);
      const printWindow = window.open("", "_blank", "width=800,height=600");
      printWindow.document.write(`
        <html>
          <head>
            <title>Invoice</title>
            <style>
              body { margin: 0; padding: 0; }
              img { width: 100%; }
            </style>
          </head>
          <body onload="window.print();window.close();">
            <img src="${dataUrl}" style="width:100%;" />
          </body>
        </html>
      `);
      printWindow.document.close();
    });
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex justify-center py-6 px-2 sm:px-4 md:px-8">
      <div
        ref={invoiceRef}
        className="w-full max-w-4xl bg-white md:p-6 p-4 rounded-lg shadow-sm text-gray-800 text-[10px] sm:text-xs md:text-sm"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-6 border-b pb-4">
          <img
            src={MainContent.logo}
            className="h-10 sm:h-14 object-contain"
            alt="Logo"
            crossOrigin="anonymous"
          />
          <div className="text-right text-[10px] sm:text-sm">
            <h4 className="font-bold text-base sm:text-lg">Hetal Collection</h4>
            <p>88/2/2/4 Singhal Compound Dewas Naka</p>
            <p>Lasudiya Mori, Indore, India - 452010</p>
            <p>(+91) 896 496 9960 | info@pvt.com</p>
          </div>
        </div>

        {/* Billing & Shipping */}
        <div className="flex flex-col sm:flex-row justify-between gap-6 my-4">
          <div>
            <h4 className="font-bold mb-1">Billing Details</h4>
            <p>FCID: {user?._id}</p>
            <p>Name: {user?.name}</p>
            <p>Email: {user?.email}</p>
            <p>Mobile: {user?.phone}</p>
          </div>
          <div>
            <h4 className="font-bold mb-1">Shipping Address</h4>
            <p>Name: {user?.name}</p>
            <p>Mobile: {address?.phone}</p>
            <p>
              {address?.addressLine1}
              {address?.addressLine2 && `, ${address.addressLine2}`},{" "}
              {address?.city}, {address?.state} - {address?.pincode}
            </p>
          </div>
          <div className="text-right">
            <p>
              INVOICE:{" "}
              <span className="font-semibold">{orderNo || invoiceData._id}</span>
            </p>
            <p>Order Date: {new Date(createdAt).toLocaleDateString("en-IN")}</p>
          </div>
        </div>

        {/* Items Table */}
        <div className="overflow-x-auto">
          <table className="w-full border mt-4 text-[10px] sm:text-xs md:text-sm">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="border p-2">#</th>
                <th className="border p-2">Product</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Qty</th>
                <th className="border p-2">GST</th>
                <th className="border p-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={i}>
                  <td className="border p-2">{i + 1}</td>
                  <td className="p-2 flex items-center gap-1 sm:gap-2">
                    <img
                      src={
                        item?.product?.images?.[0]?.image ||
                        "https://via.placeholder.com/50"
                      }
                      className="h-6 w-6 sm:h-8 sm:w-8 object-cover"
                      alt={item?.product?.name || "Product"}
                      crossOrigin="anonymous"
                    />
                    <span className="truncate max-w-[140px] sm:max-w-[200px]">
                      {item?.product?.name}
                    </span>
                  </td>
                  <td className="border p-2">
                    {(item.subtotal / item.quantity).toFixed(2)}
                  </td>
                  <td className="border p-2">{item.quantity}</td>
                  <td className="border p-2">{item?.product?.gst || 0}%</td>
                  <td className="border p-2">
                    {(
                      item.subtotal +
                      (item.subtotal * (item?.product?.gst || 0)) / 100
                    ).toFixed(2)}
                  </td>
                </tr>
              ))}
              <tr className="bg-yellow-100 font-semibold">
                <td colSpan="3" className="border p-2 text-right">
                  Total
                </td>
                <td className="border p-2">{totalQuantity}</td>
                <td className="border p-2"></td>
                <td className="border p-2">
                  {(totalAmounts + totalGstAmount).toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-wrap gap-4 justify-center">
          <button
            onClick={handleDownload}
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-2 rounded-full font-medium text-xs sm:text-sm"
          >
            Download
          </button>
          <button
            onClick={handlePrint}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 rounded-full font-medium text-xs sm:text-sm"
          >
            Print
          </button>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
