function PictureEmpty() {
  return (
    <div className="flex flex-col items-center justify-center h-52">
      <h2 className="text-2xl font-bold text-gray-700">
        No Pictures Available
      </h2>
      <p className="mt-2 text-gray-500">Please upload some pictures.</p>
    </div>
  );
}

export default PictureEmpty;
