import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import PageLoader from "../Pageloader/Pageloader";
import { getOrderById } from "../api/products.api";
import { MainContent } from "../constants/maincontant";

const Invoice = () => {
  const invoiceRef = useRef(null);
  const { state } = useLocation();
  const navigate = useNavigate();
  const orderId = state?.orderId;

  const [invoiceData, setInvoiceData] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= Fetch Invoice ================= */
  useEffect(() => {
    if (!orderId) {
      navigate("/dashboard/myOrders");
      return;
    }

    const fetchInvoice = async () => {
      try {
        const res = await getOrderById(orderId);
        const data = res?.data?.data || res?.data || null;
        setInvoiceData(data);
      } catch (err) {
        console.error("Invoice fetch error", err);
        setInvoiceData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [orderId, navigate]);

  /* ================= Download PDF ================= */
  const handleDownload = async () => {
    if (!invoiceRef.current) return;

    const canvas = await html2canvas(invoiceRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = 210;
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Invoice-${invoiceData?._id ?? "order"}.pdf`);
  };

  /* ================= Print ================= */
  const handlePrint = () => window.print();

  if (loading) return <PageLoader />;
  if (!invoiceData) return null;

  const {
    _id,
    createdAt,
    items = [],
    user = {},
    totalAmount = 0,
  } = invoiceData;

  return (
    <div className="w-full bg-gray-100 py-6 px-2 sm:px-4">
      {/* ===== Buttons (Hidden in print) ===== */}
      

      {/* ================= Invoice ================= */}
      <div
        ref={invoiceRef}
        id="invoice-print"
        className="bg-white max-w-[210mm] mx-auto p-4 sm:p-6 text-[11px] sm:text-sm shadow"
      >
        {/* Header */}
        <div className="flex justify-between border-b pb-4 mb-4">
          <img
            src={MainContent?.logo || "https://via.placeholder.com/120"}
            alt="Logo"
            className="h-10 object-contain"
          />

          <div className="text-right">
            <h2 className="font-bold text-lg">Hetal Collection</h2>
            <p className="text-gray-600">Indore, India</p>
            <p className="text-gray-600">hetalsoapstory@gmail.com</p>
          </div>
        </div>

        {/* Info */}
        <div className="flex justify-between mb-4 bg-gray-50 p-3 rounded">
          <div>
            <p className="font-semibold">Billed To</p>
            <p>{user?.name ?? "Customer"}</p>
            <p>{user?.email ?? "-"}</p>
            <p>{user?.phone ?? "-"}</p>
          </div>

          <div className="text-right">
            <p>
              Invoice #:{" "}
              <span className="font-mono font-bold">
                {_id?.slice(-6)?.toUpperCase() ?? "-"}
              </span>
            </p>
            <p>
              Date:{" "}
              {createdAt
                ? new Date(createdAt).toLocaleDateString("en-IN")
                : "-"}
            </p>
          </div>
        </div>

        {/* Table */}
        <table className="w-full border-collapse border mb-4">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 text-left">#</th>
              <th className="border p-2 text-left">Item</th>
              <th className="border p-2 text-right">Price</th>
              <th className="border p-2 text-center">Qty</th>
              <th className="border p-2 text-right">Total</th>
            </tr>
          </thead>

          <tbody>
            {items.length > 0 ? (
              items.map((item, i) => {
                const product = item?.product ?? {};
                const price = Number(
                  product?.discounted_price ?? product?.price ?? 0
                );
                const qty = Number(item?.quantity ?? 0);
                const rowTotal = price * qty;

                return (
                  <tr key={item?._id ?? i}>
                    <td className="border p-2 text-center">{i + 1}</td>
                    <td className="border p-2">
                      {product?.name ?? "Product"}
                    </td>
                    <td className="border p-2 text-right">₹{price}</td>
                    <td className="border p-2 text-center">{qty}</td>
                    <td className="border p-2 text-right">₹{rowTotal}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className="border p-4 text-center text-gray-500">
                  No items found
                </td>
              </tr>
            )}
          </tbody>

          <tfoot>
            <tr className="font-bold bg-gray-50">
              <td colSpan="4" className="border p-2 text-right">
                Grand Total
              </td>
              <td className="border p-2 text-right">₹{totalAmount}</td>
            </tr>
          </tfoot>
        </table>

        <div className="flex justify-center gap-3 mb-4 print:hidden max-w-[210mm] mx-auto">
        {/* <button
          onClick={handleDownload}
          className="px-5 py-2 bg-blue-600 text-white rounded-md"
        >
          Download PDF
        </button> */}
        <button
          onClick={handlePrint}
          className="px-5 py-2 bg-gray-800 text-white rounded-md"
        >
          Print
        </button>
      </div>

        <p className="text-center text-gray-500 text-xs mt-6">
          This is a computer generated invoice.
        </p>
      </div>
    </div>
  );
};

export default Invoice;
