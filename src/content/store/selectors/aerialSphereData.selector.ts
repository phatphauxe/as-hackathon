import { State } from "../../../assets/models/store.model";

export const selectAerialSphere = (state:State) => state?.aerialSphereData?.AS ?? null;