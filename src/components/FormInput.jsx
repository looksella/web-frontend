import { Mail, Lock, User } from "lucide-react";

// eslint-disable-next-line no-unused-vars
const FormInput = ({ icon: Icon, error, ...props }) => {
  const baseClass = "w-full pl-11 pr-4 py-3.5 rounded-2xl border text-sm outline-none transition";
  const errorClass = error
    ? "border-red-300 bg-red-50 focus:border-red-600 focus:ring-2 focus:ring-red-200"
    : "border-gray-300 bg-gray-50 focus:border-[#2E5749] focus:ring-2 focus:ring-[#ABC8CA]/60";

  return (
    <div>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          <Icon className="w-5 h-5" />
        </span>
        <input className={`${baseClass} ${errorClass}`} {...props} />
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
};

export { FormInput, Mail, Lock, User };
