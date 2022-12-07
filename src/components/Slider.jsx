export default function Slider() {
  return (
    <div className="w-full select-none">
      <img src="../../public/Images/lib6.jpg" alt="" />

      <div className="absolute top-1/2 transform -translate-y-1/2 px-3 flex justify-between items-center">
        <button>Previous</button>
        <button>Next</button>
      </div>
    </div>
  );
}
