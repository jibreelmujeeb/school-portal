import React, { useCallback, useEffect, useState } from "react";
import {
  Megaphone,
  CalendarDays,
} from "lucide-react";
import { studentApi } from "../../api/client";
import { useAuth } from "../../auth/useAuth";

const StudentAnnouncements = () => {
  const { accessToken } = useAuth();
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadAnnouncements = useCallback(async () => {
    if (!accessToken) return;

    setIsLoading(true);
    setError("");

    try {
      const payload = await studentApi.announcements(accessToken);
      setAnnouncements(payload.announcements);
    } catch (err) {
      setError(err.message || "Unable to load announcements.");
    } finally {
      setIsLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    void loadAnnouncements();
  }, [loadAnnouncements]);

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-2xl font-semibold sm:text-3xl">Announcements</h1>
        <p className="mt-2 text-sm text-gray-600">Stay updated with school news and updates</p>
      </section>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <section className="space-y-4">
        {isLoading ? (
          <div className="text-sm text-gray-500">Loading announcements...</div>
        ) : announcements.length === 0 ? (
          <div className="text-sm text-gray-500">No announcements available.</div>
        ) : (
          announcements.map((item) => (
            <article key={item.id} className="rounded-lg border border-gray-200 bg-white p-5">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Megaphone className="h-5 w-5 text-blue-600" />
                  <h3 className="font-medium">{item.title}</h3>
                </div>
                <p className="text-sm text-gray-600">{item.message}</p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                  <span>{item.audience}</span>
                  <span className="flex items-center gap-1">
                    <CalendarDays className="h-4 w-4" />
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </article>
          ))
        )}
      </section>
    </div>
  );
};

export default StudentAnnouncements;
