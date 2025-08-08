import {browserClient as supabase} from "@/lib/client";

type Tag = {
  id: number;
  name: string;
}

const tagsSelect = 'id, name'

const addTag = async (tagName: string): Promise<Tag> => {
  if (await getTagByName(tagName) !== undefined) {
    throw new Error(`Tag '${tagName}' already exists`);
  }
  const {data, error} = await supabase
    .from("tags")
    .insert({tagName})
    .select(tagsSelect)
    .overrideTypes<Tag[], { merge: false }>()
  if (error) throw error;
  return data[0];
}

const getTagById = async (tagId: number): Promise<Tag> => {
  const {data, error} = await supabase
    .from("tags")
    .select(tagsSelect)
    .eq('id', tagId)
    .overrideTypes<Tag[], { merge: false }>()
  if (error) throw error;
  if (data[0] === undefined) {
    throw new Error(`Tag '${tagId}' not found`);
  }
  return data[0]
}

const getTagByName = async (name: string): Promise<Tag> => {
  const {data, error} = await supabase
    .from("tags")
    .select(tagsSelect)
    .eq('name', name)
    .overrideTypes<Tag[], { merge: false }>()
  if (error) throw error;
  if (data[0] === undefined) {
    throw new Error(`No Tag matching the name '${name}' was found.`);
  }
  return data[0]
}

const getAllTags = async (): Promise<Tag[]> => {
  const {data, error} = await supabase
    .from("tags")
    .select(tagsSelect)
    .overrideTypes<Tag[], { merge: false }>()
  if (error) throw error;
  return data
}

const deleteTagByName = async (tagName: string): Promise<Tag> => {
  if (await getTagByName(tagName) === undefined) {
    throw new Error(`Tag '${tagName}' does not exist`);
  }
  const {data, error} = await supabase
    .from("tags")
    .delete()
    .eq('name', tagName)
    .select(tagsSelect)
    .overrideTypes<Tag[], { merge: false }>()
  if (error) throw error;
  return data[0]
}

const deleteTagById = async (tagId: number): Promise<Tag> => {
  if (await getTagById(tagId) === undefined) {
    throw new Error(`Tag with ID '${tagId}' does not exist`);
  }
  const {data, error} = await supabase
    .from("tags")
    .delete()
    .eq('id', tagId)
    .select(tagsSelect)
    .overrideTypes<Tag[], { merge: false }>()
  if (error) throw error;
  return data[0]
}

export const parseTagIdsFromString = (tagString: string) => {
  if (!tagString) {
    return []
  }
  return tagString.split(',')
}

export {
  type Tag,
  tagsSelect,
  addTag,
  getTagById,
  getTagByName,
  getAllTags,
  deleteTagByName,
  deleteTagById,
}