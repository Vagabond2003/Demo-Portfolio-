/** A steel binder clip holding a photo to the sheet, seen from the front with its wire handle folded up. */
export function BinderClip({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 120 66" className={`drop-shadow-[0_2px_2px_rgb(0_0_0/0.3)] ${className}`}>
      <path
        d="M38 32C36 14 44 6 52 6H68C76 6 84 14 82 32"
        fill="none"
        stroke="#a7adb6"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path d="M40 32C39 18 46 11 52 11" fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M31 30H89L97 61H23Z" fill="#1b2030" />
      <path d="M33 34H87" stroke="#fff" strokeOpacity=".2" strokeWidth="1.5" />
      <path d="M24 59H96" stroke="#000" strokeOpacity=".35" strokeWidth="2" />
    </svg>
  );
}
