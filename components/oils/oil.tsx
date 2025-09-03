import { Suspense } from "react";
import { RiceSkeleton } from "../skeletons/skeletons";
import Oils from "./oilsAsync";

export default function OilsPage() {

    return (
          <section className=" py-5 px-5 md:px-[100px]">
              <h2 className="text-sm font-medium mb-3">Veg Oils</h2>
              <Suspense fallback={<RiceSkeleton />}>
                <Oils />
              </Suspense>
            </section>
    )
}