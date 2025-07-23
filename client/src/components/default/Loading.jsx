function Loading({aparecer}) {
  return (
    <div className={`fixed top-0 left-0 w-full h-full bg-black/80 z-999 flex flex-col items-center justify-center ${aparecer}`}>
      <div className="w-16 h-16 border-4 border-white border-t-blue-500 rounded-full animate-spin" />
    </div>
  );
}
export default Loading;