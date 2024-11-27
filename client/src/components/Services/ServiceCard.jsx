const ServiceCard = ({ icon, title, details }) => {
  return (
    <>
      <div className="w-full px-4 md:w-1/2 lg:w-1/3">
        <div className="mb-9 rounded-[20px] bg-white p-10 shadow-lg  dark:bg-dark-2 md:px-7 xl:px-10 flex flex-col gap-3">
          <div className="flex gap-5  items-center">
            {icon}

            <h4 className="mb-[14px] text-2xl font-semibold text-dark dark:text-white">
              {title}
            </h4>
          </div>
          <p className="text-body-color dark:text-dark-6">{details}</p>
        </div>
      </div>
    </>
  );
};
export default ServiceCard;
