import { FolderX } from "lucide-react";

export function NoPokemon() {
  return (
    <div className="flex flex-col items-center justify-center h-[50vh] text-center">
      <FolderX className="h-16 w-16 text-gray-400 mb-4" />
      <h2 className="text-2xl font-bold mb-2">No Pokemon Found</h2>
      <p className="text-gray-500 mb-4">
        We couldn't find any Pokemon matching your search criteria.
      </p>
    </div>
  );
}
