// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import elasticTypeMark from "./images/elasticTypeMark.png";
export const Header = () => {
  return (
    <div className="inline-flex space-x-6 items-center justify-start px-8 py-3.5 bg-dark-ink w-full">
      <div className="flex space-x-1 items-center justify-end pr-8 border-r border-ink">
        <img width={82} height={28} src={elasticTypeMark} />
      </div>
      <div className="flex space-x-3 items-center justify-start">
        <img
          className="w-8 h-8 rounded-lg"
          src="https://via.placeholder.com/32x32"
        />
        <p className="text-xl font-extrabold leading-loose text-light-fog">
          Acme Steel, Inc.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center w-10 h-10 p-2 bg-ink rounded-full hidden">
        <p className="text-lg font-solid leading-normal text-white">sign-out</p>
      </div>
    </div>
  );
};
