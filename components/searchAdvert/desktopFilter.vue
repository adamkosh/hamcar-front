<template>
  <aside class="advertising__sidebar" v-if="loading">
    <h-skeletor width="100%" height="800px" />
  </aside>
  <aside class="advertising__sidebar" v-else>
    <div class="filter-group">
      <search-advert-filters-brands :brands="brands" />

      <search-advert-filters-models :models="models" />
      <search-advert-collapsible-card title="سال تولید" body-class="filter__body--scroll-disable"
        :is-open="startYear != '' || endYear != ''">
        <div class="filter__space">
          <div class="filter__right">
            <span>از</span>
            <span>تا</span>
          </div>
          <div class="filter__wrapper">
            <h-searchable-select name="startYear" placeholder="انتخاب کنید" v-model="startYear"
              :select-data="GenerateYear(1325, new Date().getFullYear() - 621)" />

            <h-searchable-select name="startYear" placeholder="انتخاب کنید" v-model="endYear"
              :select-data="endYearsData" />
          </div>
        </div>
      </search-advert-collapsible-card>
    </div>
    <search-advert-collapsible-card title="قیمت">
      <div class="flex">
        <div class="filter__selected-range">
          <span>از</span>
          <p>{{ splitNumber(price[0]) }}</p>
          <span>تومان</span>
        </div>
        <div class="filter__selected-range">
          <span>تا</span>
          <p>{{ splitNumber(price[1]) }}</p>
          <span>تومان</span>
        </div>
      </div>
      <div>
        <h-range-slider :step="1000" :min="0" :max="5000000000" v-model="price" style="width: 100%" @value-changed="
          advertFilter.changePrice(price[0].toString(), price[1].toString())
        " />
      </div>
      <div class="filter__item">
        <h-input name="ghesti" input-id="ghesti" type="checkbox" @change="changeJustGhesti" :checked="
          advertFilter.getFilterQueryParams().justGhesti?.toString() == 'true'
        ">
          <span class="filter__data p-0">اقساطی</span>
        </h-input>
      </div>
    </search-advert-collapsible-card>

    <search-advert-collapsible-card title="کارکرد">
      <div class="filter__tabs">
        <span @click="changeCarType(CarType.صفر)" :class="[
          'filter__tab-item',
          { 'filter__tab-item--active': carType == CarType.صفر },
        ]">صفر</span>
        <span @click="changeCarType(CarType.کارکرده)" :class="[
          'filter__tab-item',
          { 'filter__tab-item--active': carType == CarType.کارکرده },
        ]">کارکرده</span>
        <span @click="changeCarType(null)" :class="[
          'filter__tab-item',
          { 'filter__tab-item--active': carType == null },
        ]">همه</span>
      </div>
      <template v-if="carType == CarType.کارکرده">
        <div class="flex">
          <div class="filter__selected-range">
            <span>از</span>
            <p>{{ splitNumber(milage[0]) }}</p>
            <span>کیلومتر</span>
          </div>
          <div class="filter__selected-range">
            <span>تا</span>
            <p>{{ splitNumber(milage[1]) }}</p>
            <span>کیلومتر</span>
          </div>
        </div>
        <h-range-slider :min="0" :max="500000" :step="1" v-model="milage" @value-changed="
          advertFilter.changeMilage(
            milage[0].toString(),
            milage[1].toString()
          )
        " />
      </template>
    </search-advert-collapsible-card>

    <search-advert-filters-province />

    <search-advert-collapsible-card v-if="advertFilter.isCarFilter()" title="تعداد سیلندر"
      :is-open="advertFilter.getFilterQueryParams().cylinderCount != null">
      <div class="filter__item">
        <h-input type="checkbox" input-id="s3" name="sylandr" :value="CylinderCount.Three" @change="changeCylinderCount"
          :checked="
            advertFilter
              .getFilterQueryParams()
              .cylinderCount?.toString()
              .includes(CylinderCount.Three.toString())
          ">
          <span class="filter__data"> 3 سیلندر </span>
        </h-input>
      </div>
      <div class="filter__item">
        <h-input type="checkbox" input-id="s4" name="sylandr" :value="CylinderCount.Four" @change="changeCylinderCount"
          :checked="
            advertFilter
              .getFilterQueryParams()
              .cylinderCount?.toString()
              .includes(CylinderCount.Four.toString())
          ">
          <span class="filter__data"> 4 سیلندر </span>
        </h-input>
      </div>
      <div class="filter__item">
        <h-input type="checkbox" input-id="s5" name="sylandr" :value="CylinderCount.Five" @change="changeCylinderCount"
          :checked="
            advertFilter
              .getFilterQueryParams()
              .cylinderCount?.toString()
              .includes(CylinderCount.Five.toString())
          ">
          <span class="filter__data"> 5 سیلندر </span>
        </h-input>
      </div>
      <div class="filter__item">
        <h-input type="checkbox" input-id="s6" name="sylandr" :value="CylinderCount.Six" @change="changeCylinderCount"
          :checked="
            advertFilter
              .getFilterQueryParams()
              .cylinderCount?.toString()
              .includes(CylinderCount.Six.toString())
          ">
          <span class="filter__data"> 6 سیلندر </span>
        </h-input>
      </div>
      <div class="filter__item">
        <h-input type="checkbox" input-id="s8" name="sylandr" :value="CylinderCount.Eight" @change="changeCylinderCount"
          :checked="
            advertFilter
              .getFilterQueryParams()
              .cylinderCount?.toString()
              .includes(CylinderCount.Eight.toString())
          ">
          <span class="filter__data"> 8 سیلندر </span>
        </h-input>
      </div>
    </search-advert-collapsible-card>

    <div class="filter-group">
      <div class="filter">
        <label for="justHasImage" class="filter__header">
          <span class="filter__name">عکس دار</span>
          <h-input type="checkbox" name="justHasImage" input-id="justHasImage" @change="changeJustImage" :checked="
            advertFilter.getFilterQueryParams().haveImage?.toString() ==
            'true'
          " />
        </label>
      </div>
      <div class="filter">
        <label for="justPrice" class="filter__header">
          <span class="filter__name">قیمت دار</span>
          <h-input type="checkbox" name="justPrice" input-id="justPrice" @change="changeJustPrice" :checked="
            advertFilter.getFilterQueryParams().havePrice?.toString() ==
            'true'
          " />
        </label>
      </div>
    </div>
    <search-advert-collapsible-card title="رنگ">
      <template v-for="(item, index) in Object.values(Color)" :key="index">
        <div class="filter__item" v-if="typeof item == 'string'">
          <h-input type="checkbox" name="color" :input-Id="`co${index}`" :value="item" :checked="
            advertFilter.getFilterQueryParams().colors?.includes(item)
          " @change="colorChanged">
            <span class="filter__data">
              <span class="filter__text">
                <span class="filter__color" :style="{
                  'background-color': ConvertColorNameToHashColor(item),
                }"></span>
                {{ item.toString().replace("_", " ") }}
              </span>
            </span>
          </h-input>
        </div>
      </template>
    </search-advert-collapsible-card>
    <search-advert-collapsible-card title="شاسی" :is-open="advertFilter.getFilterQueryParams().modelType != null"
      v-if="advertFilter.isCarFilter()">
      <template v-for="(item, index) in Object.values(BodyType)" :key="index">
        <div class="filter__item" v-if="typeof item == 'string'">
          <h-input type="checkbox" :input-id="`c${item}`" name="bodyType" :value="item" @change="changeBodyType"
            :checked="
              advertFilter
                .getFilterQueryParams()
                .modelType?.toString()
                .includes(item.toString())
            ">
            <span class="filter__data">{{
            item.toString().replace("_", " ")
            }}</span>
          </h-input>
        </div>
      </template>
    </search-advert-collapsible-card>
    <search-advert-filters-gear-box />
    <search-advert-filters-country />
    <search-advert-filters-car-fuel />
    <search-advert-filters-engine-volume />
    <search-advert-filters-differential />
    <search-advert-filters-manufacture />
    <search-advert-filters-special-cases />
  </aside>
</template>

<script setup lang="ts">
import { Ref } from "vue";
import { CarType } from "~~/models/advertisements/enums/CarType";
import { splitNumber } from "~~/utilities/numberUtils";
import { ref } from "#imports";
import { UseUtilStore } from "~~/stores/util.store";
import { ProssesAsync } from "~~/utilities/ProssesAsync";
import { Brand } from "~~/models/utilities/Brand";
import { AlertType } from "~~/models/utilities/AlertType";
import { Model } from "~~/models/utilities/Model";
import { GenerateYear } from "~~/utilities/selectDataGenerator";
import { toPersianDate } from "~~/utilities/dateUtil";
import { CylinderCount } from "~~/models/advertisements/enums/CylinderCount";
import { BodyType } from "~~/models/advertisements/enums/BodyType";
import { Color } from "~~/models/advertisements/enums/Color";
import { ConvertColorNameToHashColor } from "~~/utilities/colorUtils";
import { GearBox } from "~~/models/advertisements/enums/GearBox";

const emit = defineEmits(["loading"]);
const loading = ref(true);

const advertFilter = useAdverFilter();

const startYear = ref(advertFilter.getFilterQueryParams().startYear ?? "0");
const endYear = ref(advertFilter.getFilterQueryParams().endYear ?? "0");
const endYearsData = ref(
  GenerateYear(
    startYear.value != "" ? Number(startYear.value) : 1325,
    new Date().getFullYear() - 621
  )
);

var filters = advertFilter.getFilterQueryParams();
const price: Ref<string[]> = ref([
  filters.startPrice ?? "0",
  filters.endPrice ?? "5000000000",
]);
const milage: Ref<string[]> = ref([
  filters.startMileage ?? "0",
  filters.endMileage ?? "500000",
]);
const carType: Ref<CarType | null> = ref(CarType.کارکرده);
const brands: Ref<Brand[]> = ref([]);
const models: Ref<Model[]> = ref([]);
const router = useRouter();
const utilStore = UseUtilStore();

const props = defineProps<{
  brand: string[];
  model: string[];
}>();
const changeCarType = (type: CarType | null) => {
  carType.value = type;
  if (type == null || type == CarType.کارکرده) {
    milage.value = ["0", "500000"];
    advertFilter.changeMilage("0", "500000");
  }
  if (type == CarType.صفر) {
    advertFilter.changeMilage("0", "0");
  }
};
watch(startYear, (val) => {
  advertFilter.changeYear(val, endYear.value);
});
watch(
  () => router.currentRoute.value.query.brands,
  async (val) => {
    var brands = val;
    if (typeof brands == "string") {
      brands = [brands];
    }
    models.value = await advertFilter.GetModels("", brands as string[]);
  }
);
watch(endYear, (val) => {
  advertFilter.changeYear(startYear.value, val);
});
watch(
  () => router.currentRoute.value.query,
  (val) => {
    price.value[0] = val.startPrice?.toString() ?? "0";
    price.value[1] = val.endPrice?.toString() ?? "5000000000";

    milage.value[0] = val.startMileage?.toString() ?? "0";
    milage.value[1] = val.endMileage?.toString() ?? "500000";

    startYear.value = val.startYear?.toString() ?? "";
    endYear.value = val.endYear?.toString() ?? "";
  }
);
watch(loading, (val) => {
  emit("loading", val);
});
watch(startYear, (val) => {
  endYearsData.value = GenerateYear(
    Number(val),
    new Date().getFullYear() - 621
  );
});

onMounted(async () => {
  brands.value = await advertFilter.getBrands(advertFilter.isCarFilter(), "");
  //arraymove();
  models.value = await ProssesAsync(() => advertFilter.GetModels(), loading);
  //ModelArraymove();
});

function arraymove() {
  if (props.brand) {
    var fromIndex = brands.value.findIndex((f) => f.slug == props.brand[0]);
    if (fromIndex) {
      var element = brands.value[fromIndex];
      brands.value.splice(fromIndex, 1);
      brands.value.splice(0, 0, element);
    }
  }
}
function ModelArraymove() {
  if (props.model) {
    var fromIndex = models.value.findIndex((f) => f.slug == props.model[0]);
    if (fromIndex) {
      var element = models.value[fromIndex];
      models.value.splice(fromIndex, 1);
      models.value.splice(0, 0, element);
    }
  }
}

function changeJustGhesti() {
  const checked = document.querySelector("#ghesti:checked") !== null;
  advertFilter.justGhesti(checked);
}

function changeJustImage() {
  const checked = document.querySelector("#justHasImage:checked") !== null;
  advertFilter.justHaveImage(checked);
}
function changeJustPrice() {
  const checked = document.querySelector("#justPrice:checked") !== null;
  advertFilter.justHavePrice(checked);
}

function changeCylinderCount() {
  var values: any[] = [];
  const checked = document.querySelectorAll("input[name=sylandr]:checked");
  checked.forEach((checkbox) => {
    //@ts-ignore
    values.push(checkbox.value);
  });
  advertFilter.changeQueryParams(values, "cylinderCount");
}
function changeBodyType() {
  var values: any[] = [];
  const checked = document.querySelectorAll("input[name=bodyType]:checked");
  checked.forEach((checkbox) => {
    //@ts-ignore
    values.push(checkbox.value);
  });
  advertFilter.changeQueryParams(values, "modelType");
}
function colorChanged() {
  var values: any[] = [];
  const checked = document.querySelectorAll("input[name=color]:checked");
  checked.forEach((checkbox) => {
    //@ts-ignore
    values.push(checkbox.value);
  });
  advertFilter.changeQueryParams(values, "colors");
}
</script>

<style>

</style>