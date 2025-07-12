import { Button } from "@/components/ui/button";
import { useGetOrderQuery, useGetCheckoutSessionStatusQuery } from "@/lib/api";
import { Link, useSearchParams, Navigate } from "react-router";
import { useState, useEffect } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL;

function CompletePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const { data, isLoading, isError } =
    useGetCheckoutSessionStatusQuery(sessionId);

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-[40vh] text-lg">Loading...</div>;
  }

  if (isError) {
    return <div className="flex justify-center items-center min-h-[40vh] text-red-600 font-semibold">Error</div>;
  }

  if (data?.status === "open") {
    return <Navigate to="/checkout" />;
  }

  if (data?.status === "complete") {
    return (
      <section className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50 py-12 px-2">
        <div className="max-w-2xl w-full mx-auto p-8 bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col items-center">
          {/* Celebratory Icon */}
          <div className="mb-4 animate-bounce">
            <svg className="w-16 h-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2l4-4m7 2a9 9 0 11-18 0a9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold mb-2 text-green-600 text-center">Order Completed Successfully!</h2>
          <p className="mb-4 text-center text-gray-700">
            We appreciate your business! A confirmation email will be sent to <span className="font-semibold text-primary">{data.customer_email}</span>.
          </p>
          <div className="w-full mt-6 border-t pt-4">
            <h3 className="text-lg font-semibold mb-2">Order Details:</h3>
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mb-2">
              <span className="mb-1 sm:mb-0">Order ID: <span className="font-medium">{data.orderId}</span></span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm border ${data.orderStatus === 'Delivered' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-blue-100 text-blue-700 border-blue-200'} ml-0 sm:ml-2`}>{data.orderStatus}</span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm border ${data.paymentStatus === 'Paid' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-yellow-100 text-yellow-700 border-yellow-200'} ml-0 sm:ml-2`}>{data.paymentStatus}</span>
            </div>
          </div>
          <div className="mt-6 w-full flex flex-col items-center">
            <p className="text-gray-700 text-center">
              If you have any questions, please email
              <a href="mailto:orders@example.com" className="ml-1 text-blue-600 font-semibold hover:underline inline-flex items-center">
                <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12H8m8 0a4 4 0 11-8 0a4 4 0 018 0zm2 0a6 6 0 11-12 0a6 6 0 0112 0z" /></svg>
                orders@example.com
              </a>
            </p>
          </div>
          <Button asChild className="mt-8 w-full max-w-xs text-lg font-semibold py-3">
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </section>
    );
  }

  return null;
}

export default CompletePage;