<template>
  <div>
    <loadings-full-loading v-if="isLoading" />
    <div class="registration__main">
      <div class="selectbox__wrapper">
        <h-select-box placeholder="انتخاب برند" name="brand" :show-check-box="true" v-model="stepData.brandId"
          :data="brands" :disabled="brands.length == 0" />
        <h-select-box placeholder="انتخاب مدل" name="brand" :disabled="!stepData.brandId || models.length == 0"
          v-model="stepData.modelId" :show-check-box="true" :data="models" />
        <h-select-box placeholder="انتخاب سال" name="brand" :disabled="!stepData.modelId || years.length == 0"
          v-model="stepData.yearId" :show-check-box="true" :data="years" />
        <h-select-box placeholder="انتخاب تریم" name="brand" v-if="stepData.yearId && trims.length > 0"
          v-model="stepData.trimId" :show-check-box="true" :data="trims" />
      </div>
    </div>
    <div class="registration__footer" v-if="store.currentStep == 1">
      <span class="registration__accept-rules">
        فشردن این دکمه، به منزله پذیرش
        <nuxt-link to="/terms">شرایط و قوانین</nuxt-link>
        همکار است.
      </span>
      <h-button :disabled="
        !stepData.brandId ||
        !stepData.modelId ||
        !stepData.yearId ||
        (trims.length > 0 && !stepData.trimId) ||
        isLoading
      " @click="nextStep" class="btn btn-primary registration__submit">تایید و ادمه
      </h-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { advertStore } from "~~/stores/advert.store";
import { GetModels, GetTrims, GetYears } from "~~/services/brand.service";
import { Ref, ref } from "vue";
import { SelectData } from "~~/models/utilities/SelectData";
import { ProssesAsync } from "~~/utilities/ProssesAsync";
import { e } from "ohmyfetch/dist/error-f78c60df";
const store = advertStore();

const isLoading = ref(false);

const stepData = reactive(store.steps.one);

const brands: Ref<SelectData[]> = ref([]);
const models: Ref<SelectData[]> = ref([]);
const years: Ref<SelectData[]> = ref([]);
const trims: Ref<SelectData[]> = ref([]);

const props = defineProps({
  isMotor: {
    type: Boolean,
    default: false
  }
})
const nextStep = () => {
  store.changeStep(2);
  setTimeout(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, 100);
};
onMounted(async () => {
  isLoading.value = true;
  await store.setBrands();

  if (props.isMotor) {
    brands.value = store.getMotorBrands.map((brand) => {
      return {
        value: brand.id,
        label: brand.title,
      };
    });
  } else {
    brands.value = store.getCarBrands.map((brand) => {
      return {
        value: brand.id,
        label: brand.title,
      };
    });
  }

  isLoading.value = false;
});
watch(
  () => stepData.brandId,
  (brandId) => {
    if (brandId) {
      ProssesAsync(
        () =>
          GetModels(brandId).then((res) => {
            models.value =
              res.data?.map((model) => {
                return {
                  value: model.id,
                  label: model.title,
                };
              }) ?? [];
          }),
        isLoading
      );
      stepData.modelId = "";
      stepData.yearId = "";
      stepData.trimId = "";
    }
  }
);
watch(
  () => stepData.modelId,
  (modelId) => {
    if (modelId) {
      ProssesAsync(
        () =>
          GetYears(modelId).then((res) => {
            years.value =
              res.data?.map((model) => {
                return {
                  value: model.id,
                  label: model.yearTitle,
                };
              }) ?? [];
          }),
        isLoading
      );
      stepData.yearId = "";
      stepData.trimId = "";
    }
  }
);
watch(
  () => stepData.yearId,
  (yearId) => {
    if (yearId) {
      ProssesAsync(() => {
        return GetTrims(yearId).then((res) => {
          trims.value =
            res.data?.map((model) => {
              return {
                value: model.id,
                label: model.title,
              };
            }) ?? [];
        });
      }, isLoading);
      stepData.trimId = "";
    }
  }
);
</script>

<style>

</style>