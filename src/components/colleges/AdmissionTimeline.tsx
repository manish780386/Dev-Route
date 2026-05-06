import { Calendar, AlertCircle, Info } from "lucide-react";

interface AdmissionEvent {
  event:     string;
  date:      string;
  important: boolean;
}

interface AdmissionTimelineProps {
  events:          AdmissionEvent[];
  admissionProcess: string;
}

// Map months to approximate order for display
const MONTH_ORDER: Record<string, number> = {
  "Jan": 1, "Jan/Apr": 1, "Jan-Feb": 1,
  "Feb": 2,
  "Mar": 3,
  "Apr": 4, "Apr/May": 4, "Apr-May": 4,
  "May": 5, "May-Jun": 5,
  "Jun": 6, "Jun-Jul": 6,
  "Jul": 7, "Jun-Aug": 7, "Jul-Aug": 7,
  "Aug": 8,
  "Sep": 9,
  "Oct": 10,
  "Nov": 11, "Nov, Jan, Apr": 11,
  "Dec": 12,
};

const MONTH_COLORS: Record<number, string> = {
  1:  "bg-blue-500",
  2:  "bg-blue-400",
  3:  "bg-cyan-500",
  4:  "bg-teal-500",
  5:  "bg-emerald-500",
  6:  "bg-green-500",
  7:  "bg-amber-500",
  8:  "bg-orange-500",
  9:  "bg-red-500",
  10: "bg-rose-500",
  11: "bg-purple-500",
  12: "bg-indigo-500",
};

export default function AdmissionTimeline({
  events,
  admissionProcess,
}: AdmissionTimelineProps) {
  const sorted = [...events].sort(
    (a, b) => (MONTH_ORDER[a.date] ?? 13) - (MONTH_ORDER[b.date] ?? 13)
  );

  return (
    <div className="space-y-5">
      {/* Process summary */}
      <div className="flex items-start gap-3 p-4 bg-brand-50 dark:bg-brand-950 border border-brand-100 dark:border-brand-900 rounded-xl">
        <Info size={16} className="text-brand-600 mt-0.5 shrink-0" />
        <div>
          <p className="text-xs font-semibold text-brand-700 dark:text-brand-400 mb-0.5">Admission Process</p>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{admissionProcess}</p>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Connecting line */}
        <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-gray-100 dark:bg-gray-800" />

        <div className="space-y-4">
          {sorted.map((event, i) => {
            const order = MONTH_ORDER[event.date] ?? 0;
            const dotColor = MONTH_COLORS[order] ?? "bg-gray-400";

            return (
              <div key={i} className="relative flex items-start gap-4">
                {/* Dot */}
                <div className={`w-10 h-10 rounded-full ${event.important ? dotColor : "bg-gray-200 dark:bg-gray-700"} flex items-center justify-center shrink-0 z-10 shadow-sm`}>
                  {event.important
                    ? <AlertCircle size={16} className="text-white" />
                    : <Calendar  size={14} className="text-gray-500 dark:text-gray-400" />
                  }
                </div>

                {/* Content */}
                <div className={`flex-1 pb-4 ${i < sorted.length - 1 ? "border-b border-gray-50 dark:border-gray-800" : ""}`}>
                  <div className="flex items-center justify-between gap-2">
                    <p className={`text-sm font-semibold leading-snug ${event.important ? "text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400"}`}>
                      {event.event}
                    </p>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full shrink-0 ${
                      event.important
                        ? "bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                    }`}>
                      {event.date}
                    </span>
                  </div>
                  {event.important && (
                    <p className="text-xs text-amber-600 dark:text-amber-500 mt-1 font-medium">
                      ⚠️ Important deadline
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* General tips */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
        <p className="text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2">💡 Quick Tips</p>
        <ul className="space-y-1.5 text-xs text-gray-500 dark:text-gray-400">
          <li>• Register on JoSAA/MP DTE portal early — before deadlines</li>
          <li>• Keep all documents scanned: 10th/12th marksheet, Aadhar, category cert</li>
          <li>• Track seat allotment rounds — multiple rounds happen</li>
          <li>• Freeze seat within deadline to avoid cancellation</li>
        </ul>
      </div>
    </div>
  );
}