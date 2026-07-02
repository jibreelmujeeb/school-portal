import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Wallet,
  CheckCircle,
  AlertCircle,
  Receipt,
} from "lucide-react";
import { studentApi } from "../../api/client";
import { useAuth } from "../../auth/useAuth";

const currency = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

const StudentFees = () => {
  const { accessToken } = useAuth();
  const [fees, setFees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const summary = useMemo(() => (
    fees.reduce((totals, fee) => ({
      amount: totals.amount + Number(fee.amount),
      paid: totals.paid + Number(fee.amountPaid),
      balance: totals.balance + Number(fee.balance),
    }), { amount: 0, paid: 0, balance: 0 })
  ), [fees]);

  const loadFees = useCallback(async () => {
    if (!accessToken) return;

    setIsLoading(true);
    setError("");

    try {
      const payload = await studentApi.fees(accessToken);
      setFees(payload.fees);
    } catch (err) {
      setError(err.message || "Unable to load fees.");
    } finally {
      setIsLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    void loadFees();
  }, [loadFees]);

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-2xl font-semibold sm:text-3xl">Fees & Payments</h1>
        <p className="mt-2 text-sm text-gray-600">Track your school fee records</p>
      </section>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <section className="grid gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-5">
          <Wallet className="h-5 w-5 text-blue-600" />
          <div>
            <p className="text-sm text-gray-500">Total Fees</p>
            <h2 className="text-lg font-semibold">{currency.format(summary.amount)}</h2>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-5">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <div>
            <p className="text-sm text-gray-500">Paid</p>
            <h2 className="text-lg font-semibold">{currency.format(summary.paid)}</h2>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-5">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <div>
            <p className="text-sm text-gray-500">Balance</p>
            <h2 className="text-lg font-semibold">{currency.format(summary.balance)}</h2>
          </div>
        </div>
      </section>

      <section className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        {isLoading ? (
          <div className="p-6 text-sm text-gray-500">Loading fee records...</div>
        ) : fees.length === 0 ? (
          <div className="p-6 text-sm text-gray-500">No fee records found.</div>
        ) : (
          fees.map((fee) => (
            <div key={fee.id} className="grid gap-2 border-b border-gray-100 p-4 text-sm last:border-b-0 sm:grid-cols-4 sm:items-center">
              <div className="flex items-center gap-2 text-gray-700">
                <Receipt className="h-4 w-4" />
                {fee.title}
              </div>
              <span>{currency.format(fee.amount)}</span>
              <span>{currency.format(fee.amountPaid)} paid</span>
              <span className={fee.status === "PAID" ? "text-green-600" : "text-orange-600"}>
                {fee.status}
              </span>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default StudentFees;
