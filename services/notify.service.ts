import {
  FilterParams,
  FilterResult,
  IApiResponse,
} from "~~/models/IApiResponse";
import { CreateNotifyCommand } from "~~/models/notify/Notify.Commands";
import {
  NotifyAdvertisementFilterData,
  NotifyAdvertisementFilterParams,
  NotifyFilterData,
} from "~~/models/notify/Notify.Models";
import { FetchApi } from "~~/utilities/customFetchApi";

export const GetNotifies = (
  filterParams: FilterParams
): Promise<IApiResponse<FilterResult<NotifyFilterData>>> => {
  return FetchApi("/notify", {
    params: filterParams,
  });
};

export const CreateNotify = (
  command: CreateNotifyCommand
): Promise<IApiResponse<undefined>> => {
  return FetchApi("/notify", {
    method: "POST",
    body: command,
  });
};

export const GetNotifyAdvertisements = (
  filterParams: NotifyAdvertisementFilterParams
): Promise<IApiResponse<FilterResult<NotifyAdvertisementFilterData>>> => {
  return FetchApi("/notify/advertisements", {
    params: filterParams,
  });
};

export const VisitNotifyAdvertisement = (
  advertId: string,
  notifyId: string
): Promise<IApiResponse<undefined>> => {
  return FetchApi(`/notify/advertisements`, {
    method: "POST",
    params: {
      advertisementId: advertId,
      notifyId: notifyId,
    },
  });
};

export const DeleteNotify = (notifyId: string) => {
  return FetchApi(`/notify/${notifyId}`, {
    method: "DELETE",
  });
};
