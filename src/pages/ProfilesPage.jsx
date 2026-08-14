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
    <main className="flex min-h-screen items-center justify-center overflow-x-hidden bg-netflix-black px-4 py-20 text-white sm:px-6">
      <section className="w-full max-w-4xl text-center">
        {/* Heading */}
        <h1 className="text-3xl font-medium tracking-tight sm:text-4xl md:text-5xl">
          Who's watching?
        </h1>

        {/* Profiles */}
        <div className="mx-auto mt-10 grid max-w-xl grid-cols-2 justify-items-center gap-x-5 gap-y-8 sm:max-w-2xl sm:grid-cols-4 sm:gap-8">
          {profiles.map((profile) => (
            <button
              key={profile.id}
              type="button"
              onClick={selectProfile}
              className="group flex w-28 cursor-pointer flex-col items-center sm:w-32 md:w-36"
            >
              <div className="aspect-square w-full overflow-hidden rounded-md border-2 border-transparent transition-all duration-200 group-hover:scale-105 group-hover:border-white group-focus-visible:border-white group-focus-visible:outline-none">
                <img
                  src={profile.avatar}
                  alt={`${profile.name} profile`}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>

              <span className="mt-3 text-sm text-neutral-400 transition-colors group-hover:text-white sm:text-base">
                {profile.name}
              </span>
            </button>
          ))}
        </div>

        {/* Manage Profiles */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="mt-12 min-h-10 cursor-pointer rounded-md border border-neutral-600 px-6 py-2 text-sm font-medium text-neutral-300 transition-colors hover:border-white hover:text-white"
        >
          Manage Profiles
        </button>
      </section>
    </main>
  );
};

export default ProfilesPage;
