import {supabase} from "@/lib/client";

type BoopSize = {
  id: number;
  name: string;
  value: number;
}

const boopSizeSelect = 'id, name, value'

const getBoopSizeByName = async (name: string): Promise<BoopSize> => {
  const {data, error} = await supabase
    .from('boop_sizes')
    .select(boopSizeSelect)
    .eq('name', name)
    .overrideTypes<BoopSize[], { merge: false }>()
  if (error) throw error;
  return data[0];
}
const getBoopSizeById = async (boopSizeId: number): Promise<BoopSize> => {
  const {data, error} = await supabase
    .from('boop_sizes')
    .select(boopSizeSelect)
    .eq('id', boopSizeId)
    .overrideTypes<BoopSize[], { merge: false }>()
  if (error) throw error;
  return data[0];
}

const getAllBoopSizes = async (): Promise<BoopSize[]> => {
  const {data, error} = await supabase
    .from('boop_sizes')
    .select(boopSizeSelect)
    .overrideTypes<BoopSize[], { merge: false }>()
  if (error) throw error;
  return data
}

export {
  type BoopSize,
  boopSizeSelect,
  getBoopSizeById,
  getBoopSizeByName,
  getAllBoopSizes,
}