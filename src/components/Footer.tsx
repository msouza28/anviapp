import { HashLink } from "react-router-hash-link";

export default function Footer() {
  return (
    <HashLink
    to="/criadores#top">
    <div className="w-full bottom-0 left-0 items-center justify-center text-white text-sm  text-center py-4 bg-bgCustom">
      AnVigilants © 2024 by Isaac Santos, Matheus Emiliano, Rafael Budoya,
      Vinicius Piovesan Attribution 4.0 International
    </div>
    </HashLink>
  )
}
