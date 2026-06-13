import { X } from "lucide-react";

export default function AdaptiveExitModal({
  open,
  title,
  description,
  confirmText,
  cancelText,
  loading = false,
  onConfirm,
  onCancel,
}) {
  /*
  ==================================================
  SAFETY
  ==================================================
  */

  if (!open) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        px-6
      "
    >
      {/* Backdrop */}
      <div
        onClick={() => {
          if (!loading) {
            onCancel();
          }
        }}
        className="
          absolute
          inset-0
          bg-black/70
          backdrop-blur-sm
          transition-opacity
          duration-300
        "
      />

      {/* Modal */}
      <div
        className="
          relative
          z-10
          w-full
          max-w-lg
          rounded-[32px]
          border
          border-white/[0.06]
          bg-[#0F1012]
          p-8
          md:p-10
        "
      >
        {/* Close */}
        <button
          onClick={() => {
            if (!loading) {
              onCancel();
            }
          }}
          disabled={loading}
          className="
            cursor-pointer
            absolute
            right-6
            top-6
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            text-[#8A8F98]
            transition-all
            duration-300
            hover:bg-white/[0.04]
            hover:text-white
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          <X size={18} />
        </button>

        {/* Badge */}
        <div
          className="
            inline-flex
            rounded-full
            bg-violet-500/[0.06]
            px-4
            py-2
            text-sm
            font-medium
            text-violet-400
          "
        >
          Adaptive Session
        </div>

        {/* Title */}
        <h2
          className="
            mt-8
            pr-10
            text-4xl
            font-bold
            tracking-tight
            leading-tight
          "
        >
          {title}
        </h2>

        {/* Description */}
        <p
          className="
            mt-5
            max-w-md
            leading-relaxed
            text-[#8A8F98]
          "
        >
          {description}
        </p>

        {/* Actions */}        <div
          className="
            mt-12
            flex
            flex-col-reverse
            gap-4
            sm:flex-row
            sm:justify-end
          "
        >
          {/* Cancel */}
          <button
            onClick={onCancel}
            disabled={loading}
            className="
              cursor-pointer
              rounded-full
              border
              border-white/[0.08]
              px-6
              py-3.5
              text-sm
              font-medium
              text-[#D6D8DC]
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-white/[0.15]
              hover:bg-white/[0.03]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {cancelText}
          </button>

          {/* Confirm */}
          <button
            onClick={onConfirm}
            disabled={loading}
            className="
              cursor-pointer
              rounded-full
              bg-white
              px-7
              py-3.5
              text-sm
              font-semibold
              text-black
              transition-all
              duration-300
              hover:-translate-y-1
              hover:bg-white/90
              disabled:cursor-not-allowed
              disabled:opacity-70
            "
          >
            {loading ? (
              <span
                className="
                  flex
                  items-center
                  justify-center
                  gap-3
                "
              >
                <span
                  className="
                    h-4
                    w-4
                    animate-spin
                    rounded-full
                    border-2
                    border-black/30
                    border-t-black
                  "
                />

                Processing...
              </span>
            ) : (
              confirmText
            )}
          </button>
        </div>

        {/* Footer Note */}
        <p
          className="
            mt-8
            text-center
            text-sm
            leading-relaxed
            text-[#8A8F98]
          "
        >
          Your progress is important. Eventra helps
          you continue learning without losing your work.
        </p>
      </div>
    </div>
  );
}