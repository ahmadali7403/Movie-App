import { useNavigate } from "react-router-dom";

const profiles = [
  {
    id: 1,
    name: "Ahmad",
    avatar: "https://i.pravatar.cc/300?img=12",
  },
  {
    id: 2,
    name: "Hammad",
    avatar: "https://i.pravatar.cc/300?img=13",
  },
  {
    id: 3,
    name: "Awais",
    avatar: "https://i.pravatar.cc/300?img=14",
  },
  {
    id: 4,
    name: "Nadeem",
    avatar: "https://i.pravatar.cc/300?img=15",
  },
];

const ProfilesPage = () => {
  const navigate = useNavigate();

  const selectProfile = () => {
    navigate("/");
  };

  return (
    <main className="flex min-h-[calc(100vh-12rem)] items-center justify-center bg-netflix-black px-4 py-16 text-white">
      <section className="w-full max-w-4xl text-center">
        <h1 className="text-3xl font-medium sm:text-4xl md:text-5xl">
          Who's watching?
        </h1>

        <div className="mt-10 grid grid-cols-2 justify-items-center gap-6 sm:grid-cols-4 sm:gap-8">
          {profiles.map((profile) => (
            <button
              key={profile.id}
              type="button"
              onClick={selectProfile}
              className="group flex w-28 flex-col items-center sm:w-32"
            >
              <div className="aspect-square w-full overflow-hidden rounded-md border-2 border-transparent transition-all duration-200 group-hover:scale-105 group-hover:border-white">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <span className="mt-3 text-sm text-neutral-400 transition-colors group-hover:text-white sm:text-base">
                {profile.name}
              </span>
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => navigate("/")}
          className="mt-12 rounded-md border border-neutral-600 px-6 py-2 text-sm font-medium text-neutral-300 transition-colors hover:border-white hover:text-white"
        >
          Manage Profiles
        </button>
      </section>
    </main>
  );
};

export default ProfilesPage;
