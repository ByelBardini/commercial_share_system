function Loading({ aparecer }) {
  return (
    <div
      className={`
        fixed top-0 left-0 w-full h-full z-[9999] 
        bg-gradient-to-br from-blue-200/50 via-blue-100/40 to-blue-50/60 
        backdrop-blur-sm bg-black/60
        flex flex-col items-center justify-center
        ${aparecer}
      `}
    >
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin shadow-xl" />
        <span className="absolute inset-0 flex items-center justify-center">
          <svg className="w-7 h-7 text-blue-400 opacity-70" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
          </svg>
        </span>
      </div>
      <div className="mt-4 text-blue-800 font-semibold text-xl drop-shadow select-none">
        Carregando...
      </div>
    </div>
  );
}
export default Loading;
