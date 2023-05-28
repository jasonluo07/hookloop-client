import instance from "../instance";

export const addList = (data: Pick<IList, "name" | "kanbanId">) => {
  return instance.post("lists", data);
};

export const renameList = (data: Pick<IList, "name" | "_id">) => {
  return instance.patch(`lists/${data._id}/name`, data);
};