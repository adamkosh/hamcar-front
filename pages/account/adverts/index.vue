<template>
  <div class="profile__content">
    <client-only>
      <account-top-bar />
      <account-page-title title="آگهی های من" :loading="loading" :sub-title="
        filterResult == null || filterResult.entityCount == 0
          ? '(آگهی منتشر نشده)'
          : `( ${filterResult.entityCount} آگهی منتشر شده)`
      " button-text="ثبت آگهی رایگان">
        <nuxt-link to="/sell/car" class="grow-1 btn btn-primary w-50">
          <div class="row align-items-center">
            <account-icons-mini-car class="d-mobile-none" />
            <account-icons-mini-car class="d-mobile-block" :width="30" :height="13" />
            درج آگهی خودرو
          </div>
        </nuxt-link>
        <nuxt-link to="/sell/motorcycle" class="grow-1 btn btn-primary w-50">
          <div class="row align-items-center">
            <icons-motor class="d-mobile-none" />
            <icons-motor class="d-mobile-block" :width="26" :height="14" />
            <span>
              درج آگهی موتور <span class="d-mobile-none"> سیکلت </span></span>
          </div>
        </nuxt-link>
      </account-page-title>
      <div class="content">
        <div class="profile__not-Found" v-if="(filterResult?.entityCount ?? 0) <= 0 && loading == false">
          <p class="font-2 color_gray_600">
            شما هنوز اولین آگهی خودتان را ثبت نکرده اید!
          </p>
        </div>
        <skeleton-loading-search-advert :show-type="1" style="width: 100%; overflow: hidden" v-if="loading" />
        <div class="advertising__row advertising__row--wide-item" v-else-if="filterResult?.entityCount ?? 0 >= 1">
          <account-advert-card v-for="item in filterResult?.data" :key="item.id" :advert="item" class="mobile-card"
            :show-price="true" @useNardebanClicked="openNardebanModal">
            <template #actions>
              <h-button class="btn-sm nardeban" @click="openNardebanModal(item)">نردبان</h-button>
              <div class="row d-mobile-none desk__actions">
                <template v-if="item.status!='draft'">
                  <p>
                    <nuxt-link :to="`/account/adverts/${item.id}`" class="
                      color-blue
                      row
                      align-items-center
                      gap-0_5
                      font-5
                      cursor-pointer
                      d-mobile-none
                    ">
                      <icons-eye />
                      مشاهده
                    </nuxt-link>
                  </p>
                  <p class="d-mobile-none">
                    <nuxt-link class="
                      color-blue
                      row
                      align-items-center
                      gap-0_5
                      font-5
                      cursor-pointer
                    " :to="`/account/adverts/edit?id=${item.id}`">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M11.1577 8.18182L12.9195 6.33429C13.3244 5.90978 14.0046 5.88646 14.4388 6.2822L17.658 9.21592C18.0923 9.61167 18.1161 10.2766 17.7113 10.7011L15.8182 12.6864M11.1577 8.18182L6.28868 13.2877C6.08633 13.4999 5.98271 13.7844 6.00236 14.0738L6.20234 17.0187C6.23993 17.5724 6.71141 18.0021 7.27903 18L10.2983 17.9888C10.595 17.9877 10.8781 17.8667 11.0805 17.6545L15.8182 12.6864M11.1577 8.18182L15.8182 12.6864"
                          stroke="#007AFF" stroke-width="1.6" stroke-linejoin="round" />
                      </svg>

                      ویرایش
                    </nuxt-link>
                  </p>
                  <p class="
                    color-error
                    row
                    align-items-center
                    gap-0_5
                    font-5
                    cursor-pointer
                    d-mobile-none
                  " @click="openDeletePopup(item)">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M0.75 3.75H6M17.25 3.75H12M2.25 3.75L3.32985 14.5485C3.48321 16.0821 4.77371 17.25 6.31497 17.25H11.685C13.2263 17.25 14.5168 16.0821 14.6701 14.5485L15.75 3.75M9 8.25V12.75M12.375 8.25L12 12.75M5.625 8.25L6 12.75M12 3.75H9H6M12 3.75H6M12 3.75V2.25C12 1.42157 11.3284 0.75 10.5 0.75H7.5C6.67157 0.75 6 1.42157 6 2.25V3.75"
                        stroke="#EF3838" stroke-width="1.5" stroke-linecap="round" />
                    </svg>
                    حذف
                  </p>
                </template>
                <template v-else>
                  <p>
                    <nuxt-link :to="`/sell/selectPlan`" class="
                      color-blue
                      row
                      align-items-center
                      gap-0_5
                      font-5
                      cursor-pointer
                      d-mobile-none
                    ">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M11.1577 8.18182L12.9195 6.33429C13.3244 5.90978 14.0046 5.88646 14.4388 6.2822L17.658 9.21592C18.0923 9.61167 18.1161 10.2766 17.7113 10.7011L15.8182 12.6864M11.1577 8.18182L6.28868 13.2877C6.08633 13.4999 5.98271 13.7844 6.00236 14.0738L6.20234 17.0187C6.23993 17.5724 6.71141 18.0021 7.27903 18L10.2983 17.9888C10.595 17.9877 10.8781 17.8667 11.0805 17.6545L15.8182 12.6864M11.1577 8.18182L15.8182 12.6864"
                          stroke="#007AFF" stroke-width="1.6" stroke-linejoin="round" />
                      </svg>
                      انتخاب پلن
                    </nuxt-link>
                  </p>
                </template>
              </div>
            </template>
          </account-advert-card>
        </div>
      </div>
      <h-modal :show-header="false" v-model="isOpenDeleteModal">
        <account-advert-move-to-tash @cancelOperation="isOpenDeleteModal = false" :isExhibition="false"
          v-model="selectedAdvert" @deleted="deleteAdvert" />
      </h-modal>
      <h-modal v-model="isOpenNardebanModal" :show-header="false">
        <account-advert-use-nardeban-content showTitle :description="null" v-model="selectedAdvert"
          @closed="() => (isOpenNardebanModal = false)" :exhibition="false" />
      </h-modal>
    </client-only>
  </div>
</template>
  
<script setup lang="ts">
import { ref } from "#imports";
import { Ref } from "vue";
import {
  AdvertisementFilterData,
  AdvertisementFilterResult,
} from "~~/models/advertisements/Advertisement.Models";
import {
  GetByFilter,
  MoveToTrash,
  UseNardeban,
} from "~~/services/advertisement.service";
import { GetUserAdvertisements } from "~~/services/account.service";
import { ProssesAsync } from "~~/utilities/ProssesAsync";
import { AdvertisementFilterOrderBy } from "~~/models/advertisements/enums/AdvertisementFilterOrderBy";
import { FilterResult, IApiResponse } from "~~/models/IApiResponse";
import { useAccountStore } from "~~/stores/account.store";
import { AdvertisementCard } from "~~/models/advertisements/AdvertisementCard";
import { CreateTransaction } from "~~/services/transaction.service";
import { TransactionOrderType } from "~~/models/transactions/CreateTransactionCommand";
import { CurrentDomainUrl } from "~~/utilities/api.config";

definePageMeta({
  layout: "account-layout",
  title: "آگهی های من",
});
const toast = useToast();
const accountStore = useAccountStore();

const filterResult: Ref<FilterResult<AdvertisementFilterData> | null> =
  ref(null);

const loading = ref(false);
const pageId = ref(1);
const isOpenDeleteModal = ref(false);
const isOpenNardebanModal = ref(false);
const reasoneType = ref(1);
const selectedAdvert: Ref<AdvertisementFilterData | AdvertisementCard | null> =
  ref(null);

const openNardebanModal = (advert: any) => {
  selectedAdvert.value = advert;
  isOpenNardebanModal.value = true;
};
const openDeletePopup = (advert: any) => {
  selectedAdvert.value = advert;
  isOpenDeleteModal.value = true;
};

const deleteAdvert = async () => {
  filterResult.value!.data = filterResult.value?.data?.filter(
    (f) => f.id != selectedAdvert.value?.id
  );
  selectedAdvert.value = null;
  isOpenDeleteModal.value = false;
};
onMounted(async () => {
  await loadAdverts();
});
const loadAdverts = async () => {
  var res = await ProssesAsync<
    Promise<IApiResponse<FilterResult<AdvertisementFilterData>>>
  >(
    () =>
      GetUserAdvertisements(
        pageId.value,
        50,
        AdvertisementFilterOrderBy.latest
      ),
    loading
  );
  filterResult.value = res.data ?? null;
};
</script>
  
<style scoped>
.color_black_200 {
  color: var(--color-black-200) !important;
}

.nardeban {
  width: 64px !important;
  height: 32px !important;
  border-radius: 8px !important;
  font-family: var(--t6-font-family);
  font-size: var(--t6-font-size);
  display: none;
}

.nardebans__footer {
  display: flex;
  gap: 1rem;
}

.actions {
  display: flex;
  gap: 1rem;
}

@media screen and (max-width: 768px) {
  .card {
    margin-top: 40px;
  }

  .nardebans__footer {
    flex-direction: column;
    align-items: flex-start;
  }

  .actions {
    display: block !important;
    width: 100%;
  }

  .price {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .price .font-4 {
    font-weight: 800;
    margin: 0;
  }

  .nardeban {
    display: flex !important;
  }
}

.desk__actions {
  gap: 0;
}

.desk__actions p {
  border-left: 1px solid var(--color-gray-400);
  padding: 0 1rem;
  font-family: var(--t5-font-family);
  font-size: var(--t5-font-size);
}

.desk__actions p:last-child {
  border: none;
}
</style>