import type { FunctionalComponent } from "preact";
import { useStore } from "@nanostores/preact";
import { user as u } from "../store/user";

const UserImage: FunctionalComponent = () => {
  const user = import.meta.env.SSR ? undefined : useStore(u);

  return (
    <img
      src={user?.images[0].url}
      class="h-12 rounded-xl shadow-lg hidden sm:block"
    />
  );
};

export default UserImage;
