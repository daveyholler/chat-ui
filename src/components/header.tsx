export const Header = () => {
  return (
    <div className="inline-flex space-x-6 items-center justify-start px-8 py-3.5 bg-gray-900 w-full">
      <div className="flex space-x-1 items-center justify-end w-20 h-10 pr-8 border-r border-gray-500">
        <img
          className="w-12 h-4"
          src="https://via.placeholder.com/50x16"
        />
      </div>
      <div className="flex space-x-3 items-center justify-start">
        <img
          className="w-8 h-8 rounded-lg"
          src="https://via.placeholder.com/32x32"
        />
        <p className="text-xl font-extrabold leading-loose text-blue-50">
          Acme Steel, Inc.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center w-10 h-10 p-2 bg-gray-600 rounded-full hidden">
        <p className="text-lg font-solid leading-normal text-white">sign-out</p>
      </div>
    </div>
  );
};
