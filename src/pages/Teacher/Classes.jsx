import React, { useCallback, useEffect, useState } from "react";
import {
  Users,
  BookOpen,
  ArrowRight,
  School,
} from "lucide-react";
import { teacherApi } from "../../api/client";
import { useAuth } from "../../auth/useAuth";

const TeacherClasses = () => {
  const { accessToken } = useAuth();
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadClasses = useCallback(async () => {
    if (!accessToken) return;

    setIsLoading(true);
    setError("");

    try {
      const payload = await teacherApi.classes(accessToken);
      setClasses(payload.classes);
    } catch (err) {
      setError(err.message || "Unable to load assigned classes.");
    } finally {
      setIsLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    void loadClasses();
  }, [loadClasses]);

  return (
    <div className="space-y-10">
      <section>
        <h1 className="text-2xl sm:text-3xl font-semibold">
          My Classes
        </h1>
        <p className="text-sm text-gray-600 mt-2">
          Manage and access your assigned classes
        </p>
      </section>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <div className="text-sm text-gray-500">Loading assigned classes...</div>
        ) : classes.length === 0 ? (
          <div className="text-sm text-gray-500">No classes assigned.</div>
        ) : (
          classes.map((schoolClass) => (
            <article
              key={schoolClass.id}
              className="flex flex-col justify-between rounded-lg border border-gray-200 bg-white p-5"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <School className="h-5 w-5 text-blue-600" />
                  <h3 className="font-medium">{schoolClass.name}</h3>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="h-4 w-4" />
                  {schoolClass.studentCount} Students
                </div>

                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <BookOpen className="mt-1 h-4 w-4" />
                  <div className="flex flex-wrap gap-1">
                    {schoolClass.subjects.map((subject) => (
                      <span
                        key={subject.assignmentId}
                        className="rounded-full border border-gray-300 px-2 py-1 text-xs"
                        title={subject.academicSession}
                      >
                        {subject.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button className="mt-5 flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm transition hover:bg-gray-50">
                View Class <ArrowRight className="h-4 w-4" />
              </button>
            </article>
          ))
        )}
      </section>
    </div>
  );
};

export default TeacherClasses;
