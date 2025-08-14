function UserChatInformation({
  profile,
  information,
  isActive,
}: {
  profile: string;
  information: { name: string; lastConvo?: string };
  isActive?: boolean;
}) {
  return (
    <>
      <div className="hover:bg-gray-100 p-2 rounded-lg flex flex-row items-center gap-x-2 h-fit cursor-pointer">
        <img src={profile} className="size-14 rounded-full border-2" />
        <div className="font-sans">
          <p className="text-base font-normal">{information.name}</p>
          {information.lastConvo != "" ? (
            <p className="text-xs text-gray-500">{information.lastConvo}</p>
          ) : (
            <p className="text-xs text-gray-500">
              {isActive ? "Active now" : "Active 5 hours ago"}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default UserChatInformation;
